// Dispatch is in charge of receiving and delegating requests from background script.
import Dispatch from './js/dispatch';
import {declare} from './js/actions';
import Marker from './js/marker';

// Dispatch all incoming messages as actions.
chrome.runtime.onMessage.addListener(Dispatch);

// Declare inputs on initial load.
declare(Dispatch);


// let currentElement = null;
// TODO Move to events.js
document.addEventListener('DOMContentLoaded', () => {
    const marker = new Marker();
    // currentElement = getInitialElement();
    // console.log(currentElement);
    // moveMarkerTo(currentElement);
    document.addEventListener('keydown', marker.onKeydown.bind(marker));


    // let target = document.body.querySelector('*:first-child');
    // target.className += ' zap-marker';
    // document.addEventListener('keydown', (event) => {
    //     if (target) {
    //         let newTarget = target;
    //         let timeout = 100;
    //         // TODO if no PROPER target is found, repeat the invoked function.
    //         switch (event.which) {
    //             case 40:
    //                 newTarget = newTarget.querySelector('*:first-child');
    //                 break;
    //             case 39:
    //                 do {
    //                     newTarget = newTarget.nextSibling;
    //                 } while (!hasBounds(newTarget) && timeout-- > 0);
    //                 break;
    //             case 38:
    //                 do {
    //                     newTarget = newTarget.parentNode;
    //                 } while (!hasBounds(newTarget) && timeout-- > 0);
    //                 break;
    //             case 37:
    //                 do {
    //                     newTarget = newTarget.previousSibling;
    //                 } while (!hasBounds(newTarget) && timeout-- > 0);
    //                 break;
    //             default:
    //                 return;
    //         }
    //         event.preventDefault();
    //         if (newTarget) {
    //             target.className = target.className.replace(/zap-marker/, '');
    //             target = newTarget;
    //             target.className += ' zap-marker';
    //         }
    //         else console.log('Cannot go deeper');
    //     }
    //     console.log(`${target.offsetWidth}, ${target.offsetHeight}`, target);
    // });
});

//
// const getInitialElement = () => {
//     return getFirstChild(document.body);
// };
//
// const getFirstChild = (element) => {
//     let firstChild = element.querySelector('*:first-child');
//     let next = null;
//     do {
//         next = firstChild.nextSibling;
//         if (next) firstChild = next;
//     } while (!hasBounds(firstChild) && next);
//     return firstChild;
// };
//
// const moveMarkerTo = (element) => {
//     if (!element)
//         throw new Error('Must move element to an existing element', element);
//
//     if (currentElement)
//         currentElement.className = currentElement.className.replace(/zap-marker/, '');
//
//     element.className += ' zap-marker';
// };
//
// const hasBounds = (target) => {
//     return target.offsetWidth && target.offsetHeight;
// };

