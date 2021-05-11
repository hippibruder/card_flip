import { Game } from "./Game";

test('Game has cards', () => {
    const len = 5;
    let game = new Game(len);
    expect(game.cards.length).toBe(len);
    game.cards.forEach((card, i) => {
        expect(card.index).toBe(i);
        expect(card.flipped).toBe(card.flippedOriginal);
        expect(card.removed).toBeFalsy();;
    });
});

test('Card can be removed', () => {
    let game = new Game(3);
    game.cards[1].flipped = true;
    game.removeCard(1);
    expect(game.cards[1].removed).toBeTruthy();
    expect(game.cards[0].removed).toBeFalsy();
    expect(game.cards[0].flipped).toBe(!game.cards[0].flippedOriginal);
    expect(game.cards[2].removed).toBeFalsy();
    expect(game.cards[2].flipped).toBe(!game.cards[2].flippedOriginal);
});

test('Not-flipped card cannot be removed', () => {
    let game = new Game(3);
    game.cards[1].flipped = false;
    game.removeCard(1);
    expect(game.cards[1].removed).toBeFalsy();
    expect(game.cards[1].flipped).toBeFalsy();
    expect(game.cards[0].removed).toBeFalsy();
    expect(game.cards[0].flipped).toBe(game.cards[0].flippedOriginal);
    expect(game.cards[2].removed).toBeFalsy();
    expect(game.cards[2].flipped).toBe(game.cards[2].flippedOriginal);
});

test('Removed card cannot be removed', () => {
    let game = new Game(3);
    game.cards[1].flipped = true;
    game.cards[1].removed = true;
    game.removeCard(1);
    expect(game.cards[1].removed).toBeTruthy();
    expect(game.cards[0].removed).toBeFalsy();
    expect(game.cards[0].flipped).toBe(game.cards[0].flippedOriginal);
    expect(game.cards[2].removed).toBeFalsy();
    expect(game.cards[2].flipped).toBe(game.cards[2].flippedOriginal);
});

test('Game can be won', () => {
    let game = new Game(2);
    game.cards[0].flipped = true;
    game.cards[1].flipped = false;
    game.removeCard(0);
    game.removeCard(1);
    expect(game.leftovers.length).toBe(0);
    expect(game.win).toBeTruthy();
    expect(game.lose).toBeFalsy();
});

test('No cards, no game', () => {
    let game = new Game(0);
    expect(game.leftovers.length).toBe(0);
    expect(game.win).toBeFalsy();
    expect(game.lose).toBeFalsy();
});

test('Game can be lost', () => {
    let game = new Game(2);
    game.cards[0].flipped = true;
    game.cards[1].flipped = true;
    game.removeCard(0);
    expect(game.leftovers.length).toBe(1);
    expect(game.flipped.length).toBe(0);
    expect(game.win).toBeFalsy();
    expect(game.lose).toBeTruthy();
});

test('Game is lost, when no flipped', () => {
    let game = new Game(2);
    game.cards[0].flipped = false;
    game.cards[1].flipped = false;
    expect(game.leftovers.length).toBe(2);
    expect(game.flipped.length).toBe(0);
    expect(game.win).toBeFalsy();
    expect(game.lose).toBeTruthy();
});

test('Game can be reset', () => {
    let game = new Game(3);
    game.cards[1].flipped = true;
    game.removeCard(1);
    game.reset();
    game.cards.forEach(card => {
        expect(card.removed).toBeFalsy();
        expect(card.flipped).toBe(card.flippedOriginal);
    });
});
