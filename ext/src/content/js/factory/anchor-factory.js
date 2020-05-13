import InputFactory from './input-factory';
import {Anchor} from './elements';
import {DECLARE_ANCHORS} from '../../../types';

import escapeRegExp from 'escape-string-regexp';

const ANCHOR_LIMIT = 10;

class AnchorFactory extends InputFactory {
    constructor() {
        super(DECLARE_ANCHORS);
    }

    find(query = {}) {
        if (!query.search) return [];
        // Find all anchor elements.
        const anchors = [];
        for (let a of document.querySelectorAll('a')) {
            if (!a.href && !a.className && !a.id) continue;
            const textAnchor = this.createAnchor(a);
            if (textAnchor) {
                // Search for relevant anchors using the specified string.
                const regex = new RegExp(escapeRegExp(query.search), 'i');
                if (!textAnchor.textContent.match(regex))
                    continue;
                // Do not add duplicate elements to the anchor array.
                let exists = false;
                for (let anchor of anchors) {
                    // Filter duplicates by href AND textContent.
                    if (anchor.href === textAnchor.href &&
                        anchor.textContent === textAnchor.textContent)
                        exists = true;
                }
                if (!exists) {
                    anchors.push(textAnchor);
                }
            }
        }
        // Slice the anchor array to limit data sent.
        return anchors.slice(0, ANCHOR_LIMIT);
    }

    createAnchor(element) {
        const text = element.textContent.replace(/\s+/g, ' ').trim();
        if (text) {
            return new Anchor(
                element.id,
                element.className,
                element.href,
                text
            );
        }
    }
}

export default (new AnchorFactory());