import React from 'react';
import {View, Text, SectionList, Slider} from 'react-native';
import PropTypes from 'prop-types';

import {Touch, ActionField, TextField, Icon} from '../common';

import {InputListStyles as styles} from '../styles';
import {Colors} from '../styles/globals';

export default
class InputList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showVideos: true,
            showForms: true,
            anchorSearch: ''
        };
    }

    render() {
        if (this.props.disabled) return null;
        return (
            <View style={[this.props.style, styles.wrapper]}>
                <SectionList
                    style={[styles.inputList, this.props.style]}
                    keyExtractor={(item, index) => index}
                    sections={this.getSections()}
                    renderSectionHeader={this.renderSectionHeader.bind(this)}
                    renderSectionFooter={this.renderSectionFooter.bind(this)}
                />
            </View>
        );
    }

    getSections() {
        const sections = [];

        const videos = this.props.videos;
        if (videos.length) {
            sections.push({
                data: this.state.showVideos ? videos : [],
                title: 'videos',
                renderItem: this.renderVideo.bind(this)
            });
        }

        const forms = this.props.forms;
        if (forms.length) {
            sections.push({
                data: this.state.showForms ? forms : [],
                title: 'forms',
                renderItem: this.renderForm.bind(this)
            });
        }

        // Always show anchor header.
        sections.push({
            data: this.props.anchors,
            title: 'anchors',
            renderItem: this.renderAnchor.bind(this)
        });

        return sections;
    }

    renderSectionHeader({section}) {
        const title = section.title;
        switch (title) {

            case 'videos':
                const onVideosToggle = () => this.setState({showVideos: !this.state.showVideos});
                return this.renderToggleableSectionHeader(title, 'live-tv', onVideosToggle, this.state.showVideos, false);

            case 'forms':
                const showTopBorderForms = !!this.props.videos.length;
                const onFormsToggle = () => this.setState({showForms: !this.state.showForms});
                return this.renderToggleableSectionHeader(title, 'text-format', onFormsToggle, this.state.showForms, showTopBorderForms);

            case 'anchors':
                const showTopBorderAnchors = !!this.props.videos.length || !!this.props.forms.length;
                const onChangeText = (text) => this.setState({anchorSearch: text});
                const onSearch = () => {
                    const searchWord = this.state.anchorSearch;
                    if (searchWord.length > 2)
                        this.props.onAnchorSearch(searchWord);
                };
                return this.renderSearchableSectionHeader(title, 'link', onChangeText, onSearch, showTopBorderAnchors, 'Search links');

            default:
                console.warn('Attempted to render section header with unknown title', JSON.stringify(section, null, 4));
                return null;
        }
    };

    renderToggleableSectionHeader(title, icon, onToggle, showSection, showTopBorder) {
        // Prepare styles for the section header.
        let headerStyles = [styles.sectionHeader];
        // Base header state on whether to show section.
        let toggle = showSection ? 'keyboard-arrow-up' : 'keyboard-arrow-down';
        if (!showSection)
            headerStyles.push(styles.closedSection);
        // Determine whether to show a top border.
        if (showTopBorder)
            headerStyles.push(styles.sectionBorder);

        return (
            <View style={headerStyles}>
                <Text style={styles.sectionIcon}>
                    <Icon name={icon} size={40}/>
                </Text>
                <Text style={styles.sectionTitle}>
                    {this.capitalize(title)}
                </Text>
                <View style={styles.sectionToggleWrapper}>
                    <Touch
                        style={styles.sectionToggle}
                        onPressIn={onToggle}
                    >
                        <Icon name={toggle} size={35}/>
                    </Touch>
                </View>
            </View>
        );
    }

    renderSearchableSectionHeader(title, icon, onChangeText, onSearch, showTopBorder, placeholder = '') {
        const headerStyles = [styles.sectionHeader];
        if (showTopBorder)
            headerStyles.push(styles.sectionBorder);
        placeholder = placeholder || this.capitalize(title);
        return (
            <View style={headerStyles}>
                <Text style={styles.sectionIcon}>
                    <Icon name={icon} size={40}/>
                </Text>
                <ActionField
                    style={styles.anchorSearch}
                    fontSize={15}
                    onChangeText={onChangeText}
                    onPress={onSearch}
                    placeholder={placeholder}
                >
                    <Icon name="search" size={16}/>
                </ActionField>
            </View>
        );
    }

    renderSectionFooter({section}) {
        switch (section.title) {
            // If the section is switched off, do not show footer
            case 'videos':
                if (!this.state.showVideos)
                    return null;
                break;
            case 'forms':
                if (!this.state.showForms)
                    return null;
                break;
        }
        return <View style={styles.sectionFooter}/>;
    }

    renderVideo({item}) {
        return (
            <View style={styles.listItem}>
                <Text style={styles.itemTitle}>
                    {item.selector}
                </Text>
                <View style={styles.videoControlBar}>
                    <Slider
                        style={styles.slider}
                        maximumTrackTintColor={Colors.gray}
                        minimumTrackTintColor={Colors.dark}
                        thumbTintColor={Colors.dark}
                        onSlidingComplete={(value) => this.props.onTimeChange(item.selector, value)}
                    />
                    <Touch
                        style={styles.videoControl}
                        onPressIn={() => this.props.onFullscreenToggle(item.selector)}
                    >
                        <Icon name="fullscreen" size={35}/>
                    </Touch>
                    <Touch
                        style={styles.videoControl}
                        onPressIn={() => this.props.onPlaybackToggle(item.selector)}
                    >
                        <View style={styles.togglePlaybackButton}>
                            <Icon style={styles.toggleIcon} name="play-arrow" size={22}/>
                            <Icon style={styles.toggleIcon} name="pause" size={22}/>
                        </View>
                    </Touch>
                </View>
            </View>
        );
    }

    renderForm({item}) {
        return (
            <View style={styles.listItem}>
                <Text style={styles.itemTitle}>
                    {item.action}
                </Text>
                <Text style={styles.itemNote}>
                    {item.selector}
                </Text>
                {this.renderFormFields(item)}
            </View>
        );
    };

    renderFormFields(form) {
        const formFields = form.inputs;
        const fields = [];
        let hasSubmit = false, hasTextInput = false;
        let submitSelector = '';

        const appendSubmit = (key, input) => {
            if (!hasSubmit) {
                hasSubmit = true;
                submitSelector = input ? input.selector : false;
                fields.push(
                    <View
                        key={key}
                        style={styles.formSubmitWrapper}
                    >
                        <Text style={styles.submitText}>Submit</Text>
                        <Touch
                            style={styles.submitButton}
                            onPress={() => this.props.onFormSubmit(form, submitSelector)}
                        >
                            <Icon name="done" size={40}/>
                        </Touch>
                    </View>
                );
            }
        };

        for (let i = 0; i < formFields.length; i++) {
            const field = formFields[i];
            switch (field.type) {

                case 'text':
                case 'search':
                    fields.push(
                        <TextField
                            key={i}
                            style={styles.textInput}
                            onChangeText={(text) => this.props.onInputChange(field.selector, text)}
                            placeholder={field.placeholder}
                        />
                    );
                    hasTextInput = true;
                    break;

                case 'submit':
                case 'image':
                    appendSubmit(i, field);
                    break;
            }
        }
        appendSubmit('submit');

        // If there's now a text field and a submit field, convert the result into an action field instead.
        if (fields.length === 2 && hasTextInput && hasSubmit) {
            // TODO Determine nature of form, ie. search, subscription, etc. for proper icon and placeholder use.
            const textFieldIndex = formFields[0].type === 'text' ? 0 : 1;
            const textField = formFields[textFieldIndex];
            return (
                <ActionField
                    style={styles.formInput}
                    placeholder={textField.placeholder}
                    fontSize={20}
                    onChangeText={(text) => this.props.onInputChange(textField.selector, text)}
                    onPress={() => this.props.onFormSubmit(form, submitSelector)}
                >
                    <Icon name="search" size={20}/>
                </ActionField>
            );
        }

        return fields;
    };

    renderAnchor({item}) {
        return (
            <Touch
                style={[styles.listItem, styles.anchorItem]}
                onPress={() => this.props.onAnchorPress(item, item.selector)}
            >
                <View>
                    <Text style={styles.itemTitle}>
                        {item.textContent}
                    </Text>
                    <Text style={styles.itemNote}>
                        {item.selector}
                    </Text>
                    <Text style={styles.itemNote}>
                        {item.href}
                    </Text>
                </View>
            </Touch>
        );
    };

    capitalize(s) {
        return s[0].toUpperCase().concat(
            s.substring(1, s.length).toLowerCase()
        );
    }
};

InputList.propTypes = {
    style: PropTypes.any,
    disabled: PropTypes.bool,

    videos: PropTypes.array.isRequired,
    forms: PropTypes.array.isRequired,
    anchors: PropTypes.array.isRequired,

    onPlaybackToggle: PropTypes.func.isRequired,
    onTimeChange: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    onAnchorSearch: PropTypes.func.isRequired
};