import React from 'react';
import ConnectField from './connect/connect-field';
import FeedbackForm from './feedback/feedback-form';
import InfoView from './info/info-view';

export default
class Popup extends React.Component {

    constructor(props) {
        super(props);
        // Navigation state.
        this.state = {
            nav: 'connect'
        };
    }

    render() {
        return (
            <div className="content">
                <div className="navigation">
                    <a className="info" onClick={() => this.setState({nav: 'info'})}>Update</a>
                    {this.renderNavigation()}
                </div>
                {this.renderContent()}
            </div>
        );
    }

    renderContent() {
        switch (this.state.nav) {
            case 'info':
                return <InfoView/>;
            case 'connect':
                return <ConnectField/>;
            case'feedback':
                return <FeedbackForm/>;
        }
    }

    renderNavigation() {
        switch (this.state.nav) {
            case 'connect':
                return <a onClick={() => this.setState({nav: 'feedback'})}>Feedback</a>;
            case 'feedback':
            default:
                return <a onClick={() => this.setState({nav: 'connect'})}>Connect</a>;
        }
    }
}
