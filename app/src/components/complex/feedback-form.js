import React from 'react';
import {connect} from 'react-redux';
import {View, Text, ActivityIndicator} from 'react-native';

import {TextField, Touch, Icon} from '../common/';

import {FeedbackFormStyles as styles} from '../styles/';
import {Colors} from '../styles/globals';

class FeedbackForm extends React.Component {

    render() {
        return (
            <View style={styles.wrapper}>
                <Text style={styles.header}>Feedback</Text>
                <View style={[styles.inputWrapper, styles.nameWrapper]}>
                    <TextField
                        style={styles.feedbackField}
                        value={this.props.alias}
                        onChangeText={this.props.setFeedbackAlias}
                        placeholder="Name"
                        fontSize={20}
                    />
                </View>
                <View style={[styles.inputWrapper, styles.messageWrapper]}>
                    <TextField
                        style={styles.feedbackField}
                        value={this.props.message}
                        onChangeText={this.props.setFeedbackMessage}
                        multiline={true}
                        placeholder="What did you think was good? What was bad? Did something break? Was anything confusing?"
                        fontSize={20}
                    />
                </View>
                {this.renderSubmit()}
            </View>
        );
    }

    renderSubmit() {
        if (this.props.response) {
            return (
                <Text style={styles.responseText}>{this.props.response}</Text>
            );
        }
        else if (this.props.submitFeedbackLoading) {
            return (
                <ActivityIndicator
                    size={55}
                    color={Colors.dark}
                    style={styles.spinner}
                />
            );
        }
        else {
            return (
                <Touch
                    style={[styles.submit, styles.feedbackField]}
                    onPress={this.sendFeedback.bind(this)}
                >
                    <View style={styles.submitWrapper}>
                        <Text style={styles.submitText}>Submit</Text>
                        <Icon style={styles.submitIcon} name="send" size={30}/>
                    </View>
                </Touch>
            );
        }
    }

    sendFeedback() {
        this.props.postFeedback(this.props.alias, this.props.message);
    }
}

const mapStateToProps = ({feedback}) => {
    return feedback;
};

import {Feedback} from '../../actions';
export default connect(mapStateToProps, Feedback)(FeedbackForm);