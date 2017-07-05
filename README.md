# unexpected-immutable

[![CircleCI](https://circleci.com/gh/erikmueller/unexpected-immutable.svg?style=svg)](https://circleci.com/gh/erikmueller/unexpected-immutable)

![unexpected-immutable](http://vitiy.info/wp-content/uploads/2015/06/immutability.png)

This plugin lets you compare [Immutable](https://facebook.github.io/immutable-js/) data structures, and makes the diff as pretty as all the others are.

## API

### Data types

`Immutable` is the general `Iterable` data type, serving as a base for the others.

`ImmutableKeyed` represents 'object-like' Immutable types, such as `Map`.

`ImmutableIndexed` covers 'array-like' types, such as `List`.

### Assertions

This library provides `to satisfy` assertions for the above data types. It ensures that they can be compared against each other as well as against comparable JavaScript objects (i.e. `{}` or `[]`).

Indexed types also have most of the assertions of `unexpected`s `array-like` data type (in particular `to have items satisfying`), while keyed types will have most of the `object-like` assertions.

**New assertions**

The `to have value at <path>` assertion follows the given path (given either as an array of identifier strings, or as a period- or slash-separated string) to verify its presence. Another argument may be added to provide a value to check equality against. Examples:

```js
// Checks that there is a key at this location
expect(collection, 'to have value at', ['start', 'user', 'ident']);
// Checks same location, verifies that value is 'myUser'
expect(collection, 'to have value at', 'start/user/ident', 'myUser');
```

The `value at <path>` intermediate assertion will attempt to follow the given path into an Immutable collection, allowing further assertions on the value. If it does not exist, the assertion fails. Examples:

```js
expect(collection, 'value at', ['start', 'user', 'ident'], 'to be ok');
expect(collection, 'value at', 'start/user/ident', 'to match', /User$/);
expect(collection, 'value at', 'start.user', 'to satisfy', { ident: 'myUser' });
```
