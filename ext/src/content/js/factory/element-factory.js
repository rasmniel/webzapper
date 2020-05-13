import FormFactory from './form-factory';
import AnchorFactory from './anchor-factory';
import VideoFactory from './video-factory';

export default
class ElementFactory {

    static declareForms(query) {
        FormFactory.declare(query);
    }

    static declareAnchors(query) {
        AnchorFactory.declare(query);
    }

    static declareVideos(query) {
        VideoFactory.declare(query);
    }
}