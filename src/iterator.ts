export class Iter<T> implements Iterator<T> {
    private _index = 0;
    private _array: T[];
    constructor(array: T[]) {
        this._array = array;
    }
    next(): IteratorResult<T> {
        const result = {
            done: this._index >= this._array.length,
            value: this._array[this._index++]
        };
        return result;
    }
}