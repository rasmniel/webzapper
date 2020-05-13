// The timeout value to be the absolute minimum requirement for local server response times.
const TIMEOUT = 100;

// Length of interval. Should be as low as possible.
const INTERVAL = 10;

// Check an expression in an interval until it's true or times out.
export default function Until(callback) {
    return new Promise((resolve, reject) => {
        let i = 0;
        setInterval(() => {
            if (callback())
                resolve(true);
            else if (i++ > TIMEOUT)
                resolve(false);
        }, INTERVAL);
    });
}