import * as Types from '../types/input-types';

const INITIAL_STATE = {
    url: '',
    forms: [],
    anchors: [],
    videos: [],
};

export default (state = INITIAL_STATE, {type, payload}) => {
    switch (type) {

        case Types.SET_URL:
            return {...state, url: payload};

        case Types.DECLARE_FORMS:
            return {...state, forms: payload};

        case Types.DECLARE_ANCHORS:
            return {...state, anchors: payload};

        case Types.DECLARE_VIDEOS:
            return {...state, videos: payload};

        default:
            return state;
    }
};
