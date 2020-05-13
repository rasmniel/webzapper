import React from 'react';
import {postFeedback} from '../http/post';
import Badge from '../badge';

export default
class FeedbackForm extends React.Component {

    constructor() {
        super();
        this.state = {
            name: '',
            message: '',
            response: ''
        };
    }

    render() {
        return (
            <div
                className="feedback-form"
                onSubmit={this.onSubmit.bind(this)}
            >
                <input
                    className="name-input"
                    type="text"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.onNameChange.bind(this)}
                />
                <textarea
                    className="message-input"
                    placeholder="Please write a message. What did you think was good? What was bad? Did something break? Was anything confusing?"
                    rows={6}
                    value={this.state.message}
                    onChange={this.onMessageChange.bind(this)}
                />
                {this.renderSubmit()}
                {this.renderHint()}
            </div>
        );
    }

    renderSubmit() {
        if (this.state.response)
            return <p className="response">{this.state.response}</p>;
        else if (this.state.loading)
            return <button disabled>...</button>;
        else
            return <button onClick={this.onSubmit.bind(this)}>Send</button>;
    }

    onSubmit() {
        if (this.state.name && this.state.message) {
            this.setState({
                loading: true
            });
            postFeedback(this.state.name, this.state.message, (success) => {
                this.setState({
                    name: '',
                    message: '',
                    loading: false,
                    response: 'Thanks! Your feedback is appreciated! :-)'
                });
                Badge.flash('THX', '#555555');
            }, (error) => {
                this.setState({
                    loading: false,
                    response: 'Apologies, but something went wrong. Please try again later.'
                });
            }, (error) => {
                this.setState({
                    loading: false,
                    response: 'Network error: are you connected to the internet?'
                });
            });
        }
    }

    renderHint() {
        return (
            <div className="hint">
                <i className="material-icons">perm_device_info</i>
                <div className="content">
                    This extension requires
                    <div>
                        Webzapper
                    </div>
                    to be installed on your Android™ smartphone.
                    <div>
                        The app can be downloaded from the Android Play Store™.
                    </div>
                </div>
            </div>
        );
    }

    onNameChange(event) {
        event.preventDefault();
        this.setState({name: event.target.value});
    }

    onMessageChange(event) {
        event.preventDefault();
        this.setState({message: event.target.value});
    }
}