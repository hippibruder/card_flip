
export default class Game {
    constructor(numCards) {
        this.numCards = numCards;
        this.init()
    }

    init() {
        this.cards = [];
        for (let index = 0; index < this.numCards; index++) {
            let flipped = Boolean(Math.floor(Math.random() * 2));
            this.cards.push(new Card(flipped));
        }
    }

    reset() {
        this.cards.forEach(card => {
            card.reset();
        });
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

    getSubGames() {
        let games = [];
        let game = [];
        this.cards.forEach((c, i) => {
            if (c.removed) {
                if (game.length > 0) {
                    games.push(game);
                    game = []
                }
            } else {
                c.index = i;
                game.push(c);
            }
        });
        if (game.length > 0) {
            games.push(game);
        }
        return games;
    }

    static getSolveOrderForGame(game) {
        let order = [];
        let nextCardHigher = false;
        game.forEach(c => {
            if (nextCardHigher) {
                order.push(c.index);
            } else {
                order.unshift(c.index);
            }
            nextCardHigher ^= c.flipped;
        });
        if (nextCardHigher) {
            return order;
        }
        return [];
    }

    getSolveOrder() {
        let solvable = true;
        let subGames = this.getSubGames();
        let order = [];
        for (const game of subGames) {
            let subOrder = Game.getSolveOrderForGame(game);
            if (subOrder.length === 0) {
                solvable = false;
                break;
            }
            order.push(...subOrder);
        }
        if (!solvable) {
            return []
        }
        return order;
    }

    getNextMove() {
        let order = this.getSolveOrder();
        if (order.length === 0) {
            return -1;
        }
        return order[0];
    }

    get solvable() {
        return this.getSolveOrder().length > 0;
    }
}

class Card {
    constructor(flipped) {
        this.flippedOriginal = flipped;
        this.flipped = flipped;
        this.removed = false;
    }

    reset() {
        this.flipped = this.flippedOriginal;
        this.removed = false;
    }
}
