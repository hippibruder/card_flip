
export {
    Game,
    GameSolver,
}

var events = require('events');

class Game {
    constructor(numCards, addUndoAction) {
        this.numCards = numCards;
        this.eventEmitter = new events.EventEmitter();
        this.addUndoAction = addUndoAction;
        this.#init()
    }

    #init() {
        this.cards = [];
        for (let index = 0; index < this.numCards; index++) {
            let flipped = Boolean(Math.floor(Math.random() * 2));
            this.cards.push(new Card(flipped, index));
        }
    }

    reset() {
        this.cards.forEach(card => {
            card.reset();
        });
        this.fireOnChange();
    }

    removeCard(index) {
        if (!this.cards[index].flipped) {
            return;
        }

        this.addUndoAction(() => this._removeCard(index, true));
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

class GameSolver {
    constructor(game) {
        this.game = game === undefined ? new Game() : game;
        this.game.registerOnChange(() => this.updateOrder());
        this.updateOrder()
    }

    get nextMove() {
        if (this.order.length === 0) {
            return undefined;
        }
        return this.order[0];
    }

    get solvable() {
        return this.order.length > 0;
    }

    updateOrder() {
        this.order = this.getSolveOrder();
    }

    #getSubGames() {
        let games = [];
        let subGame = [];
        this.game.cards.forEach(c => {
            if (c.removed) {
                if (subGame.length > 0) {
                    games.push(subGame);
                    subGame = []
                }
            } else {
                subGame.push(c);
            }
        });
        if (subGame.length > 0) {
            games.push(subGame);
        }
        return games;
    }

    static #getSolveOrderForGame(game) {
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
        let subGames = this.#getSubGames();
        let order = [];
        for (const game of subGames) {
            let subOrder = GameSolver.#getSolveOrderForGame(game);
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
}
