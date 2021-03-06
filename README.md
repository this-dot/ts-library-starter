# ioo - Immutable Object Operators
[![NPM version](https://img.shields.io/npm/v/ioo.svg)](https://www.npmjs.com/package/ioo)
[![Build Status](https://travis-ci.org/this-dot/ioo.svg?branch=master)](https://travis-ci.org/this-dot/ioo)
[![Coverage Status](https://coveralls.io/repos/github/this-dot/ioo/badge.svg?branch=master)](https://coveralls.io/github/this-dot/ioo?branch=master)
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)

# Installation

```sh
npm install --save ioo
```

# Operators

## set(path: Array<string | number>, value: any, data: Array | {}): Array | {}

`set` operator will create a new object with value replaced at given path. It uses lenses from [Ramda.js](http://ramdajs.com/docs/#set) to ensure that all objects that are parents to the object that received the value become new objects as well. This is particularly helpful in frameworks like React and Glimmer.js that compare state by reference. The path can mix objects and arrays. Use integer for array keys and strings for object keys.

```ts
set([ 'a', 0, 'b' ], 'e', { a: [ { b: 'c' }, { b: 'd' } ]});
//=> { a: [ { b: 'e' } , { b: 'd' } ] }
```

For more code examples, checkout [src/set.test.ts](src/set.test.ts)

## get(path: Array<string | number>, data: Array | {}): any

`get` counterpart to `set`. It accepts a path array of strings or integers and returns value found that path. 

```ts
get([ 'a', 0, 'b' ], { a: [ { b: 'c' }, { b: 'd' } ]});
//=> c
```

For more code examples, checkout [src/get.test.ts](src/get.test.ts)

## reduce(path: Array<string | number>, (accumulator: any, value: any, index: string | number), initialValue: any, data: {}): {} | Array 

`reduce` operator invokes a reduce function on very item of an object or an array found at given path. The result operation will be a new value that'll replace the value at path. All parents will be new.

```ts
reduce([ 'a', 'b' ], (accumulator, value, index) => {
  return `${accumulator}${value}`;
}, '', { a: { b: [ 'a', 'b', 'c' ]}});
//=> { a: { b: 'abc' } } 
```

For more code examples, checkout [src/reduce.test.ts](src/reduce.test.ts)

## filter(path: Array<string | number>, (value: any, index: string | number) => boolean, data: {} | Array)

`filter` operator invokes a callback on every item of an object or an array found at given path. If the callback returns a truth value then the item will be included in the object at the given path.

```ts
filter([ 'a', 'b' ], ( value, index ) => index % 2 === 0, { a: { b: [ 'c', 'd', 'e', 'f' ]}}]);
//=> { a: { b: [ 'c', 'e' ] } }
```

For more code examples, checkout [src/filter.test.ts](src/filter.test.ts)

## map(path: Array<string | number>, (value: any, index: string | number) => boolean, data: {} | Array)

`map` operator invokes a callback on every item of an object or an array found at given path. The result of the callback is used to replace the value at that index. 

```ts
filter([ 'a', 'b' ], value => value.toUpperCase(), { a: { b: [ 'c', 'd', 'e', 'f' ]}}]);
//=> { a: { b: [ 'C', 'D', 'E', 'F' ] } }
```

## push(path: Array<string | number>, item: any, data: Array | {}): Array | {}

`push` operator pushes an item into the array at the specified path. Returns new objects at every level of the path.

```ts
push([ 'a', 'b' ], 'c', { a: { b: [] } });
//=> { a: { b: [ 'c' ] } }
```

For more code examples, checkout [src/push.test.ts](src/push.test.ts)

## mapObject(object, ( value: any, key: string ) => any): {}

Iterate over keys of the object and invoke the callback for every key, passing the key and value on that key. The callback signature is meant to be similar to `Array.prototype.map`. Value returned from the callback will become the new value on that key.

```ts
mapObject({ firstName: 'peter', lastName: 'griffin' }, ( value, key ) => value.toUpperCase() )
// => { firstName: 'Peter', lastName: 'Griffin' }
```

For more code examples, checkout [src/mapObject.test.ts](src/mapObject.test.ts)

## reduceObject(object, ( result: any, value: any, key: string ) => any, initial: any ): any

Reduce the object to a single value. The result can be another object. The callback signature is meant to be similar to `Array.prototype.reduce`. This operator will invoke the callback for each property. The callback will receive the result of previous operation or initial value, the key and value at that property. 

```ts
reduceObject({ firstName: 'peter', lastName: 'griffin' }, ( result, value, key ) => {
  if (result) {
    return `${result} ${value}`;
  } else {
    return value;
  }
}, null);
// => peter griffin

reduceObject({ firstName: 'peter', lastName: 'griffin' }, ( result, value, key ) => {
  return {
    ...result,
    [key.toLowerCase()]: value
  };
}, {});
// =>  { firstname: 'peter', lastname: 'griffin' }
```

For more code examples, checkout [src/reduceObject.test.ts](src/reduceObject.test.ts)

## filterObject(object, ( key: string, value: any ) => {} ): {}

Iterate the keys of the object and invoke the callback for each key and value pair. If the callback returns a truthy value then the key will be included in the output object. The callback signature is meant to be similar to `Array.prototype.filter`.

```ts
filterObject({ firstName: 'peter', lastName: 'griffin', age: 62 }, ( value, key ) => {
  return typeof value === 'string';
});
// => { firstName: 'peter', lastName: 'griffin' }
```

For more code examples, checkout [src/filterObject.test.ts](src/filterObject.test.ts)

# Credit

Big thanks to [Charles Lowell](http://github.com/cowboyd) who wrote the map/reduceObject functions and showed me how to use lenses.
