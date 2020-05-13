import InputFactory from './input-factory';
import {Video} from './elements';
import {DECLARE_VIDEOS} from '../../../types';

class VideoFactory extends InputFactory {
    constructor() {
        super(DECLARE_VIDEOS);
    }

    find() {
        const videos = [];
        for (let video of document.querySelectorAll('video')) {
            const videoElement = this.createVideo(video);
            if (videoElement)
                videos.push(videoElement);
        }
        return videos;
    }

    createVideo(element) {
        if (element.src) {
            return new Video(
                element.id,
                element.className
            );
        }
    }
}

export default (new VideoFactory());