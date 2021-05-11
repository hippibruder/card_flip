import { Game } from "./Game";
import GameSolver from "./GameSolver";

test('Game can be solved', () => {
    let game = new Game(5);
    game.cards[0].flipped = false;
    game.cards[1].flipped = true;
    game.cards[2].flipped = true;
    game.cards[3].flipped = false;
    game.cards[4].flipped = true;

    let gameSolver = new GameSolver(game);
    expect(gameSolver.solvable).toBeTruthy();
    for (let index = 0; index < 100; index++) {
        game.removeCard(gameSolver.nextMove);
        if (game.win) {
            return;
        }
    }
    fail('Game not solved!');
});

test('Game cannot be solved', () => {
    let game = new Game(5);
    game.cards[0].flipped = false;
    game.cards[1].flipped = true;
    game.cards[2].flipped = true;
    game.cards[3].flipped = true;
    game.cards[4].flipped = true;

    let gameSolver = new GameSolver(game);
    expect(gameSolver.solvable).toBeFalsy();
    expect(gameSolver.nextMove).toBeUndefined();
    expect(gameSolver.order.length).toBe(0);
});

test('No game, no error', () => {
    let gameSolver = new GameSolver();
    expect(gameSolver.solvable).toBeFalsy();
    expect(gameSolver.nextMove).toBeUndefined();
    expect(gameSolver.order.length).toBe(0);
});
