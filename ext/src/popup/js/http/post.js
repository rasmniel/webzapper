const url = 'http://localhost:3000';

export function postFeedback(name, message, onSuccess, onError, onNetworkError) {
    const feedback = {
        name: name,
        message: message,
        type: 'ext'
    };
    fetch(url, {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(feedback)
    }).then((response) => {
        if (response.ok) {
            if (onSuccess) onSuccess(response);
        }
        else if (onError) onError(response);
    }).catch((error) => {
        onNetworkError(error);
    });
}