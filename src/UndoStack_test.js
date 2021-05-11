import { Game } from "./Game";
import UndoStack from "./UndoStack";

test('Action can be undone', () => {
    let undoStack = new UndoStack();
    let game = new Game(5, undo => undoStack.addAction(undo));
    game.cards[1].flipped = true;
    game.removeCard(1);
    expect(undoStack.hasActions).toBeTruthy();
    expect(game.cards[1].removed).toBeTruthy();
    expect(game.cards[0].flipped).toBe(!game.cards[0].flippedOriginal);
    expect(game.cards[2].flipped).toBe(!game.cards[2].flippedOriginal);
    undoStack.undoAction();
    expect(game.cards[1].removed).toBeFalsy();
    expect(game.cards[1].flipped).toBeTruthy();
    expect(game.cards[0].flipped).toBe(game.cards[0].flippedOriginal);
    expect(game.cards[2].flipped).toBe(game.cards[2].flippedOriginal);
    expect(game.cards[3].flipped).toBe(game.cards[3].flippedOriginal);
    expect(game.cards[4].flipped).toBe(game.cards[4].flippedOriginal);
});

test('Multiple actions can be undone', () => {
    let undoStack = new UndoStack();
    let game = new Game(5, undo => undoStack.addAction(undo));
    game.cards[1].flipped = true;
    game.cards[2].flipped = false;
    game.removeCard(1);
    game.removeCard(2);
    expect(undoStack.hasActions).toBeTruthy();
    expect(game.cards[1].removed).toBeTruthy();
    expect(game.cards[2].removed).toBeTruthy();
    expect(game.cards[0].flipped).toBe(!game.cards[0].flippedOriginal);
    expect(game.cards[3].flipped).toBe(!game.cards[3].flippedOriginal);
    undoStack.undoAction();
    undoStack.undoAction();
    expect(game.cards[1].removed).toBeFalsy();
    expect(game.cards[2].removed).toBeFalsy();
    expect(game.cards[1].flipped).toBeTruthy();
    expect(game.cards[2].flipped).toBeFalsy();
    expect(game.cards[0].flipped).toBe(game.cards[0].flippedOriginal);
    expect(game.cards[3].flipped).toBe(game.cards[3].flippedOriginal);
    expect(game.cards[4].flipped).toBe(game.cards[4].flippedOriginal);
});

test('UndoStack can be reset', () => {
    let undoStack = new UndoStack();
    let game = new Game(5, undo => undoStack.addAction(undo));
    game.cards[1].flipped = true;
    game.removeCard(1);
    expect(game.cards[1].removed).toBeTruthy();
    expect(game.cards[0].flipped).toBe(!game.cards[0].flippedOriginal);
    expect(game.cards[2].flipped).toBe(!game.cards[2].flippedOriginal);

    expect(undoStack.hasActions).toBeTruthy();
    undoStack.reset();
    expect(undoStack.hasActions).toBeFalsy();
    undoStack.undoAction();    
    expect(game.cards[1].removed).toBeTruthy();
    expect(game.cards[0].flipped).toBe(!game.cards[0].flippedOriginal);
    expect(game.cards[2].flipped).toBe(!game.cards[2].flippedOriginal);
});
