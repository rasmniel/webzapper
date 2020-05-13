const browserAction = chrome.browserAction;

class Badge {
    set(text, color) {
        browserAction.setBadgeText({text: text});
        browserAction.setBadgeBackgroundColor({color: color});
    }

    reset() {
        this.set('', '');
    }

    flash(text, color, seconds = 3) {
        browserAction.getBadgeText({}, (currentText) => {
            browserAction.getBadgeBackgroundColor({}, (currentColor) => {
                this.set(text, color);
                setTimeout(() => this.set(currentText, currentColor), seconds * 1000);
            });
        });
    }
}

export default (new Badge());