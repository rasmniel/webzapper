import {initBody} from '../../tools';
import AnchorFactory from '../../../../src/content/js/factory/anchor-factory';

describe('Content anchor declarations test suite', () => {

    let validAnchorCount, invalidAnchorCount;

    beforeAll(async () => {
        // Initialize document body.
        document.body.innerHTML = await initBody(async (mock) => {
            return [await mock.read('anchors')];
        });

        // Determine amount of valid and invalid anchors.
        validAnchorCount = document.body.querySelector('.valid-anchors').childElementCount;
        invalidAnchorCount = document.body.querySelector('.invalid-anchors').childElementCount;
    });

    test('rejects searchless query', () => {
        const noAnchors = AnchorFactory.find();
        expect(noAnchors).toEqual([]);
    });

    test('can find anchors', () => {
        const anchors = AnchorFactory.find({search: 'anchor'});
        expect(anchors.length).toBe(validAnchorCount);
    });

    test('can search for single anchor', () => {
        const selectorAnchor = AnchorFactory.find({search: 'selector'});
        expect(selectorAnchor.length).toBe(1);
    });

    test('can search for all anchors', () => {
        const allAnchors = AnchorFactory.find({search: 'anchor'});
        expect(allAnchors.length).toBe(validAnchorCount);
    });

    test('does not find duplicate anchors', () => {
        const singleAnchor = AnchorFactory.find({search: 'first'});
        expect(singleAnchor.length).toBe(1);
    });

    test('does not find non-existent anchor', () => {
        const noAnchors = AnchorFactory.find({search: 'void'});
        expect(noAnchors.length).toBe(0);
    });

    test('does not find existing invalid anchor', () => {
        const noAttributesAnchor = AnchorFactory.find({search: 'no attributes'});
        expect(noAttributesAnchor.length).toBe(0);
    });

    test('does not find invalid anchors out of a mixed set', () => {
        const aElements = document.querySelectorAll('a');
        const validAnchors = AnchorFactory.find({search: 'anchor'});
        expect(aElements.length - invalidAnchorCount).toBe(validAnchors.length)
    });
});