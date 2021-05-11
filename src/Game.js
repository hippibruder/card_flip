
export {
    Game
}

var events = require('events');

class Game {
    constructor(numCards, addUndoAction) {
        this.numCards = numCards;
        this.eventEmitter = new events.EventEmitter();
        this.addUndoAction = addUndoAction;
        this.init()
    }

    init() {
        let cards = [];
        for (let index = 0; index < this.numCards; index++) {
            let flipped = Boolean(Math.floor(Math.random() * 2));
            cards.push(new Card(flipped, index));
        }
        this.cards = cards;
    }

    reset() {
        this.cards.forEach(card => {
            card.reset();
        });
        this.fireOnChange();
    }

    removeCard(index) {
        let card = this.cards[index]
        if (!card.flipped || card.removed) {
            return;
        }

        if (this.addUndoAction) {
            this.addUndoAction(() => this._removeCard(index, true));
        }
        this._removeCard(index, false);
    }

    _removeCard(index, undo) {
        this.cards[index].removed = !undo;
        let flips = [];
        const left = index - 1;
        if (left >= 0) {
            flips.push(left);
        }
        const right = index + 1;
        if (right < this.cards.length) {
            flips.push(right);
        }
        flips.forEach((i) => {
            const card = this.cards[i];
            card.flipped = !card.flipped;
        });
        this.fireOnChange();
    }

    get leftovers() {
        return this.cards.filter(c => !c.removed);
    }

    get flipped() {
        return this.leftovers.filter(c => c.flipped);
    }

    get win() {
        if (this.numCards === 0) {
            return false;
        }

        return this.leftovers.length === 0;
    }

    get lose() {
        if (this.numCards === 0 || this.win) {
            return false;
        }

        return this.flipped.length === 0;
    }

    registerOnChange(callback) {
        this.eventEmitter.on('change', callback);
    }

    fireOnChange() {
        this.eventEmitter.emit('change');
    }
}

class Card {
    constructor(flipped, index) {
        this.flippedOriginal = flipped;
        this.flipped = flipped;
        this.removed = false;
        this.index = index;
    }

    reset() {
        this.flipped = this.flippedOriginal;
        this.removed = false;
    }
}
