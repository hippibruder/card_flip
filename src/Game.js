
export default class Game {
    constructor(numCards) {
        this.numCards = numCards;
        this.restart()
    }

    restart() {
        this.cards = [];
        for (let index = 0; index < this.numCards; index++) {
            let flipped = Boolean(Math.floor(Math.random() * 2));
            this.cards.push({ flipped: flipped, removed: false });
        }
    }

    removeCard(index) {
        if (!this.cards[index].flipped) {
            return;
        }
        this.cards[index].removed = true;
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
    }

    get leftovers() {
        return this.cards.filter((c) => !c.removed);
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

        const notFlipped = this.leftovers.filter((c) => !c.flipped);
        return this.leftovers.length === notFlipped.length;
    }
}