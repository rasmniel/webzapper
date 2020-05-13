import React from 'react';
import {Linking, View, Text} from 'react-native';
import PropTypes from 'prop-types';

import {Touch, Icon} from './';
import {MessageStyles as styles} from '../styles';

export class Message extends React.Component {

    render() {
        return (
            <View style={styles.wrapper}>
                <Icon name={this.props.icon} size={80}/>
                <Text style={styles.header}>
                    {this.props.title}
                </Text>
                <Text style={styles.text}>
                    {this.props.content}
                </Text>
                {this.renderLink()}
            </View>
        );
    }

    renderLink() {
        const link = this.props.link;
        const text = this.props.linkText;
        if (link && text) {
            return (
                <Touch onPress={() => {
                    Linking.canOpenURL(link).then((result) => {
                        if (result) Linking.openURL(link);
                    });
                }}>
                    <Text style={styles.link}>{text}</Text>
                </Touch>
            );
        }
    }
}

Message.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    link: PropTypes.string,
    linkText: PropTypes.string
};