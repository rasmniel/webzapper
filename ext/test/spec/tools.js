import MockReader from '../mock/mock-reader';

export const initBody = async (getBody) => {
    // Get body from test initialization.
    const body = await getBody(new MockReader());

    // getBody function must return an array.
    expect(Array.isArray(body)).toBe(true);
    // Expect document body to be initialized.
    expect(body.length).toBeGreaterThan(0);

    return body.join();
};

export const assertWithDispatch = (dispatch, payloadOnly = false) => {
    return function assertDispatch(type, method) {
        const message = {
            type: type,
            payload: 'mock-payload:' + type
        };
        dispatch(message);
        const actual = payloadOnly ? message.payload : message;
        expect(method).toHaveBeenCalledWith(actual);
        expect(method).toHaveBeenCalledTimes(1);
        method.mockClear();
    };
};
