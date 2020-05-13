import {initBody} from '../../tools';
import VideoFactory from '../../../../src/content/js/factory/video-factory';

describe('Content video declarations test suite', () => {

    let videoCount;

    beforeAll(async () => {
        // Initialize document body.
        document.body.innerHTML = await initBody(async (mock) => {
            return [await mock.read('videos')];
        });
        videoCount = document.querySelectorAll('video').length;
    });

    test('can find video', () => {
        const videos = VideoFactory.find();
        expect(videos.length).toBeGreaterThan(0);
    });

    test('does not include videos without src', () => {
        const videos = VideoFactory.find();
        expect(videos.length).toBeLessThan(videoCount);
    })
});