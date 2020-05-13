import {navigateUrl, navigateHistory} from '../../../../src/content/js/actions';

describe('Content window test suite', () => {

    test('can navigate url', () => {
        let href = 'http://no-href.com';
        Object.defineProperty(window.location, 'href', {
            get: () => href,
            set: (value) => {
                href = value;
            }
        });
        const mockHref = 'http://mock.com';
        navigateUrl(mockHref);
        expect(window.location.href).toBe(mockHref);
    });

    test('can navigate history', () => {
        window.history.forward = jest.fn();
        navigateHistory('forward');
        expect(window.history.forward).toHaveBeenCalled();

        window.history.back = jest.fn();
        navigateHistory('back');
        expect(window.history.back).toHaveBeenCalled();
    });
});
