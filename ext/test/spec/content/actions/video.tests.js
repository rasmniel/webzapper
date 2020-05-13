import {controlVideo} from '../../../../src/content/js/actions';
import {initBody} from '../../tools';

describe('Content video actions test suite', () => {

    let video;
    const videoSelector = 'video#mock-id.mock-class';

    beforeAll(async () => {
        // Initialize document body.
        document.body.innerHTML = await initBody(async (mock) => {
            return [await mock.read('videos')];
        });
        video = document.querySelector('video');
    });

    test('can play video', () => {
        // Assuming a newly created video does not have any truthy playback values.
        // i.e. paused, ended, and currentTime will all be initial values.
        video.play = jest.fn();
        controlVideo({
            selector: videoSelector,
            action: 'toggle'
        });
        expect(video.play).toHaveBeenCalled();
    });

    test('can pause video if playing', () => {
        video.pause = jest.fn();
        // Video is paused.
        Object.defineProperty(video, 'paused', {
            get: () => false,
        });
        // Video has ended.
        Object.defineProperty(video, 'ended', {
            get: () => false,
        });
        // Video has been playing for some time.
        video.currentTime = 500;
        controlVideo({
            selector: videoSelector,
            action: 'toggle'
        });
        expect(video.pause).toHaveBeenCalled();
    });

    test('can set video time', () => {
        const mockTime = .5;
        const duration = 4275;
        Object.defineProperty(video, 'duration', {
            get: jest.fn(() => duration)
        });
        controlVideo({
            selector: videoSelector,
            action: 'time',
            time: mockTime
        });
        const expectedTime = duration * mockTime;
        expect(video.currentTime).toBe(expectedTime);
    });
});
