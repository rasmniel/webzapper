import React from 'react';
import {WebView} from 'react-native';
import PropTypes from 'prop-types';

// import {MirrorStyles} from '../styles';

export default
class MirrorView extends React.Component {

    state = {
        html: ''
    };

    constructor(props) {
        super(props);
        fetch('http://youtube.com')
            .then((response) => (response.ok ? response.text() : void(0)))
            .then((html) => this.setState({html: html}))
    }

    render() {
        return (
            <WebView
                style={[this.props.style]}
                source={{
                    // html: this.state.html
                    uri: "http://google.com",
                }}
                injectedJavaScript={this.inject(this.jsfn)}
                onMessage={this.result}
                javaScriptEnabled={true}
                startInLoadingState={true}
                scalesPageToFit={true}
                mixedContentMode="always"
                userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"
            />
        );
    }

    inject(fn) {
        return '(' + fn.toString() + ')()';
    }


    result(event) {
        console.warn(JSON.stringify(event.nativeEvent.data, null, 4))
    }

    jsfn() {
        window.postMessage(document.querySelectorAll('*')[0].className);
        document.addEventListener('DOMContentLoaded', function () {
            document.body.innerHTML = '<p>Hello World!</p>';
        });
    }

};

MirrorView.propTypes = {
    style: PropTypes.any,
};