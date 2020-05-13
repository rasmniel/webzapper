export default
class Marker {
    constructor() {
        this.element = document.body;
    }

    onKeydown() {
        document.addEventListener('keydown', (event) => {
            let nextElement = this.getNextElement(event);
            this.logElement(nextElement);

            if (!nextElement || this.element.innerHTML === nextElement.innerHTML)
                this.error();
            else this.moveTo(nextElement);
        });
    }

    getNextElement(event) {
        switch (event.which) {
            case 40: // down
                event.preventDefault();
                return this.getFirstChild(this.element);

            // case 39: // right
            //     do {
            //         nextElement = nextElement.nextSibling;
            //     } while (!hasBounds(nextElement) && timeout-- > 0);
            //     break;
            //
            case 38: // up
                return this.getParent(this.element);
                break;
            //
            // case 37: // left
            //     do {
            //         nextElement = nextElement.previousSibling;
            //     } while (!hasBounds(nextElement) && timeout-- > 0);
            //     break;

            default:
                return;
        }
    }

    moveTo(element) {
        if (!element)
            throw new Error('Must move to an existing element', element);

        element.className += ' zap-marker zap-active';
        setTimeout(() =>
            element.className = element.className.replace(/zap-active/, ''), 100);
        if (this.element) {
            this.element.className =
                this.element.className.replace(/zap-marker/, '');
        }
        this.element = element;
    }

    error() {
        this.element.className += ' zap-error';
    }

    getFirstChild(element) {
        if (element) {
            let next = element, timeout = 100;
            do {
                next = next.querySelector('*:first-child');
                if (this.hasBounds(next))
                    return next;
            } while (timeout-- > 0);
        }
        return null;
    }

    getParent(element) {
        if (element) {
            // ...
        }
    }

    hasNewBounds(element) {
        const a = this.getDimensions(this.element);
        const b = this.getDimensions(element);
        return this.hasBounds(element) && a && b &&
            !(a.width === b.width && a.height === b.height);
    }

    hasBounds(element) {
        const dim = this.getDimensions(element);
        return dim && dim.width && dim.height;
    }

    getDimensions(element) {
        if (!element) return null;
        return {
            width: element.offsetWidth,
            height: element.offsetHeight
        }
    }

    logElement(element) {
        console.log(element, this.getDimensions(element));
    }
}