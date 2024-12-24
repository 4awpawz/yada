/**
 * Functional style array methods.
 */

// _filter(T[], ()) => T[]
export function _filter<T>(array: T[], cb: (item: T) => boolean) {
    return array.filter(cb);
}

// _forEach(T[], ()) => void
export function _forEach<T>(array: T[], cb: (item: T, index: number, array: T[]) => void) {
    array.forEach(cb);
}

// _find(T[], ()) => T | undefined
export function _find<T>(array: T[], cb: (item: T, index: number, array: T[]) => boolean) {
    return array.find(cb);
}

// _reduce(T[], ()TT, any)
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function _reduce<T, TT>(array: T[], cb: (previousValue: any, value: T, currentIndex?: number, array?: T[]) => TT,
    initialValue?: unknown) {
    return array.reduce(cb, initialValue) as TT;
}
