import { debounce } from './helpers'

test('Debounce allows only one call', () => {
    jest.useFakeTimers();
    let obj = { changed: false };
    let callback = jest.fn(o => o.changed = true);
    let debounced = debounce(callback);
    debounced(obj);
    debounced(obj);
    jest.runAllTimers();
    expect(callback).toBeCalledTimes(1);
    expect(obj.changed).toBeTruthy();
});
