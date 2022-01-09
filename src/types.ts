export interface CustomWindow extends Window {
  _: {
    identity: (val: string) => string;
    first: (array: any[], n: number) => any;
    last: (array: any[], n: number) => any;
    each: (
      collection: any[],
      iterator: (item: any, i: number, collection: any[]) => any
    ) => void;
    indexOf: (array: any[], target: any) => number;
    filter: (collection: any[], test: (item: any) => boolean) => any[];
    reject: (collection: any, test: (item: any) => boolean) => any[];
    uniq: (array: any[], isSorted: boolean, iterator: (index: number) => any) => any[];
    sortBy: (collection: any[]) => any[];
    map: (collection: any[], iterator: (item: any) => any) => any[];
    pluck: (collection: any[], key: string) => any[];
    reduce: (
      collection: any[],
      iterator: (accumlator: any, item: any) => any,
      accumulator: any
    ) => any;
    some: (collection: any[], iterator: (item: any) => boolean) => boolean;
    extend: (des: {}) => any;
    defaults: (obj: {}) => {};
    once: (func: Function) => Function;
    memoize: (func: Function) => any;
    delay: () => void;
    shuffle: (array: any[]) => any[];
    invoke: (collection: any[], functionOrKey: Function | string, ) => any;
    zip: (collection: any[]) => any[];
    flatten: (nestedArr: any[], result: any[]) => any[];
    intersection: () => any[];
    difference: (array: any[]) => any[];
    contains: (array: any[], item: any) => boolean;
    every: (collection: any[], iterator: (item: any) => boolean) => boolean;
    throttle: (func: Function, wait: number) => Function;
  };
}
