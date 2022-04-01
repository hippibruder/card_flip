import { render, fireEvent } from '@testing-library/vue'
global.ResizeObserver = undefined
import CardList from './CardList.vue'

test('Displays cards', async () => {
    const wrapper = render(CardList, {
        props: {
            cards: [{ index: 0 }, { index: 1 }, { index: 2 }]
        }
    });
    wrapper.getByText('0')
    wrapper.getByText('1')
    wrapper.getByText('2')
});

test('Emits card-clicked', async () => {
    const wrapper = render(CardList, {
        props: {
            cards: [{ index: 0, flipped: false }, { index: 1, flipped: true }, { index: 2 }]
        }
    });
    await fireEvent.click(wrapper.getByText('0'))
    await fireEvent.click(wrapper.getByText('1'))
    expect(wrapper.emitted()['card-clicked']).toBeTruthy()
    expect(wrapper.emitted()['card-clicked'].length).toBe(2)
    expect(wrapper.emitted()['card-clicked'][0]).toEqual([0, false])
    expect(wrapper.emitted()['card-clicked'][1]).toEqual([1, true])
});
