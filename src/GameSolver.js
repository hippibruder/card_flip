import { Game } from "./Game";

export default class GameSolver {
    constructor(game) {
        this.game = game === undefined ? new Game() : game;
        this.order = [];
        this.updateOrder();
        this.game.registerOnChange(() => this.updateOrder());
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

    getSubGames() {
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
            let subOrder = GameSolver.getSolveOrderForGame(game);
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
