import React from 'react';
import {connect} from 'react-redux';
import {Platform, AppState, View} from 'react-native';
import KeepAwake from 'react-native-keep-awake';

import Tabs from './complex/tabs';
import ScrollKnob from './complex/scroll-knob';
import InputList from './complex/input-list';
import FeedbackForm from './complex/feedback-form';
import MirrorView from './complex/mirror-view';

import {ActionField, OptionBar, Touch, Message, Icon} from './common';
import {RemoteControlStyles as styles} from './styles';

import {initSocket, setConnected, startCountdown} from '../actions/socket-actions';

class RemoteControl extends React.Component {

    componentWillMount() {
        const mockSocket = Platform.OS === 'ios';
        if (!mockSocket) this.props.initSocket();
        AppState.addEventListener('change', (appState) => {
            if (appState === 'background')
                setConnected(false);
            else if (appState === 'active')
                setConnected(true);
        });
    }

    componentDidUpdate() {
        if (this.props.masterHasSlave)
            KeepAwake.activate();
        else
            KeepAwake.deactivate();
    }

    render() {
        // TODO return <MirrorView/>;
        return (
            <View style={styles.wrapper}>
                {this.tabs()}
                {this.controls()}
                {this.list()}
                {this.footer()}
                {this.options()}
            </View>
        );
    }

    tabs() {
        return (
            <Tabs
                disabled={!this.props.masterHasSlave || this.props.showModal}
                onBack={() => {
                    this.props.navigateTab(-1);
                }}
                onNext={() => {
                    this.props.navigateTab(1);
                }}
            />
        );
    }

    controls() {
        if (this.props.showModal) return this.modal();
        else {
            return (
                <View style={styles.inputWrapper}>
                    {this.actionField()}
                    <View style={styles.touchWrapper}>
                        {this.historyTouch('back')}
                        {this.scrollKnob()}
                        {this.historyTouch('forward')}
                    </View>
                </View>
            );
        }
    }

    modal() {
        // TODO Switch modal type here for more modal states.
        return (
            <View style={styles.modal}>
                <FeedbackForm/>
            </View>
        );
    }

    actionField() {
        const fontSize = 26, iconSize = 30;
        if (this.props.masterHasSlave) {
            return (
                <ActionField
                    value={this.props.url}
                    placeholder="http://"
                    fontSize={fontSize}
                    autoCapitalize="none"
                    onChangeText={this.props.setUrl}
                    onPress={() => this.props.navigateUrl(this.props.url)}
                >
                    <Icon name="send" size={iconSize}/>
                </ActionField>
            );
        }
        else {
            let iconName = this.props.slaveError ? 'phonelink-off' : 'phonelink';
            if (this.props.requestSlaveLoading)
                iconName = 'speaker-phone';
            return (
                <ActionField
                    value={this.props.slaveCode}
                    placeholder="####"
                    fontSize={fontSize}
                    autoCapitalize="characters"
                    keyboardType="numeric"
                    onChangeText={this.props.setSlaveCode}
                    onPress={() => {
                        this.props.requestSlave(this.props.slaveCode);
                        startCountdown(() => {
                            this.props.onSlaveError('The server did not respond, most likely because it is undergoing maintenance. Stay tuned, connection will return shortly...');
                        });
                    }}
                >
                    <Icon name={iconName} size={iconSize}/>
                </ActionField>
            );
        }
    }

    historyTouch(method) {
        return (
            <Touch
                style={styles.historyNavigation}
                onPress={() => this.props.navigateHistory(method)}
            >
                <Icon
                    name={'arrow-' + method}
                    size={30}
                />
            </Touch>
        );
    }

    scrollKnob() {
        return (
            <ScrollKnob
                startDelay={150}
                onScrollStartDelayed={this.props.smoothScroll}
                interval={1000}
                onScrollInterval={this.props.smoothScroll}
                onScrollEnd={this.props.endScroll}
            />
        );
    }

    list() {
        if (!this.props.masterHasSlave || this.props.showModal) return;
        return (
            <InputList
                style={styles.inputList}
                // Videos
                videos={this.props.videos}
                onPlaybackToggle={this.props.toggleVideoPlayback}
                onTimeChange={this.props.setVideoTime}
                onFullscreenToggle={this.props.toggleFullscreen}
                // Forms
                forms={this.props.forms}
                onInputChange={this.props.inputChanged}
                onFormSubmit={this.props.submitForm}
                // Anchors
                anchors={this.props.anchors}
                onAnchorPress={this.props.navigateAnchor}
                onAnchorSearch={(search) => {
                    this.props.anchorSearch(1, search);
                }}
            />
        );
    }

    footer() {
        const flexState = this.props.masterHasSlave || this.props.showModal ? 0 : 1;
        return (
            <View style={[styles.footer, {flex: flexState}]}>
                {this.message()}
            </View>
        );
    }

    message() {
        // If the user is busy using the app, don't display a message.
        if (this.props.masterHasSlave || this.props.requestSlaveLoading || this.props.showModal) return;
        let icon, title, content, link, linkText;
        if (this.props.slaveError) {
            icon = 'error-outline';
            title = 'Connection error';
            content = this.props.slaveError;
        } else {
            icon = 'extension';
            title = 'Extension';
            content = 'Using this app requires the Webzapper extension installed in your Google Chrome™ web browser.';
            link = 'https://chrome.google.com/webstore/detail/webzapper-browser-remote/lmmeplodmojecahcndjgnonnhcbcmpdk';
            linkText = 'Tap here to install the extension.';
        }
        return (
            <Message
                icon={icon}
                title={title}
                content={content}
                link={link}
                linkText={linkText}
            />
        );
    }

    options() {
        return (
            <View style={styles.navigation}>
                <View/>
                <View/>
                <Touch
                    onPress={() => {
                        if (this.props.showModal)
                            this.props.closeModal();
                        else {
                            this.props.openModal();
                            this.props.resetFeedbackResponse();
                        }
                    }}
                >
                    <Icon name="feedback" size={25}/>
                </Touch>
            </View>
        );
    }
}

const mapStateToProps = ({slave, input, modal}) => {
    return {...slave, ...input, ...modal};
};
import {Slave, Input, Modal, Feedback} from '../actions';
export default connect(mapStateToProps, {initSocket, ...Slave, ...Input, ...Modal, ...Feedback})(RemoteControl);