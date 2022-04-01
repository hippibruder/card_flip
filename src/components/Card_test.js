import { render, fireEvent } from '@testing-library/vue'
import Card from './Card.vue'

test('Displays index', async () => {
    const wrapper = render(Card, {
        props: {
            card: { index: 42 }
        }
    });
    wrapper.getByText('42')
});

test('Has classes flipped, visible', async () => {
    const wrapper = render(Card, {
        props: {
            card: { flipped: true, removed: false }
        }
    });
    let card = wrapper.getByTestId('card')
    expect(card).toHaveClass('flipped')
    expect(card).toHaveClass('visible')
});

test('Not has classes flipped, visible', async () => {
    const wrapper = render(Card, {
        props: {
            card: { flipped: false, removed: true }
        }
    });
    let card = wrapper.getByTestId('card')
    expect(card).not.toHaveClass('flipped')
    expect(card).not.toHaveClass('visible')
});

test('Show hint if next', async () => {
    const wrapper = render(Card, {
        props: {
            card: { index: 2 },
            showHints: true,
            nextMove: 2
        }
    });
    let card = wrapper.getByTestId('card')
    expect(card).toHaveClass('hint')
});

test('Do not show hint if not next', async () => {
    const wrapper = render(Card, {
        props: {
            card: { index: 2 },
            showHints: true,
            nextMove: 5
        }
    });
    let card = wrapper.getByTestId('card')
    expect(card).not.toHaveClass('hint')
});

test('Do not show hint if not allowed', async () => {
    const wrapper = render(Card, {
        props: {
            card: { index: 2 },
            showHints: false,
            nextMove: 2
        }
    });
    let card = wrapper.getByTestId('card')
    expect(card).not.toHaveClass('hint')
    expect(card).not.toHaveFocus()
});

test('Emits card-clicked', async () => {
    const wrapper = render(Card, {
        props: {
            card: { flipped: false, index: 42 }
        }
    });
    let cardWrapper = wrapper.getByTestId('card-wrapper')
    await fireEvent.click(cardWrapper)
    await wrapper.rerender({ card: { flipped: true, index: 24 } })
    await fireEvent.click(cardWrapper)
    expect(wrapper.emitted()['card-clicked']).toBeTruthy()
    expect(wrapper.emitted()['card-clicked'].length).toBe(2)
    expect(wrapper.emitted()['card-clicked'][0]).toEqual([42, false])
    expect(wrapper.emitted()['card-clicked'][1]).toEqual([24, true])
});

