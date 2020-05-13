import * as Types from '../types/modal-types';

export const openModal = () => {
    return {
        type: Types.OPEN_MODAL,
    };
};

export const closeModal = () => {
    return {
        type: Types.CLOSE_MODAL,
    };
};
