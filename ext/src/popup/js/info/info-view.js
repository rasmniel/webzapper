import React from 'react';

export default
class InfoView extends React.Component {
    render() {
        return (
            <div className="info-view">
                <strong>Dear user</strong>
                <p>Due to branding of the Remote Control system, you have become familiar with, the name has changed to
                    Webzapper. Everything else stays the same!</p>
                <p>It is highly recommended that you install the new Webzapper app to continue receiving updates for the
                    system, as the old version is no longer supported.</p>
                <p>The app can be downloaded here: <a href="http://localhost:3000" onClick={this.openLink}>Webzapper download</a></p>
                <p>Read more on the website: <a href="http://localhost:3000" onClick={this.openLink}>http://localhost:3000</a></p>
            </div>
        );
    }

    openLink() {
        chrome.tabs.create({url: 'http://localhost:3000'});
    }
}