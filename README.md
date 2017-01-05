# unexpected-immutable

[![CircleCI](https://circleci.com/gh/erikmueller/unexpected-immutable.svg?style=svg)](https://circleci.com/gh/erikmueller/unexpected-immutable)

![unexpected-immutable](http://vitiy.info/wp-content/uploads/2015/06/immutability.png)

This plugin lets you compare [Immutable](https://facebook.github.io/immutable-js/) data structures, and makes your test diffs as pretty as you're used to.

## API

### Data types

`Immutable` is the general `Iterable` data type, serving as a base for the others.

`ImmutableKeyed` represents 'object-like' Immutable types, such as `Map`.

`ImmutableIndexed` covers 'array-like' types, such as `List`.

### Assertions

This library provides `to satisfy` assertions to the above data types, ensuring that they check against each other correctly, and can be checked against comparable JavaScript objects (i.e. `{}` or `[]`).

Indexed types also have most of the assertions of unexpected's `array-like` data type (in particular `to have items satisfying`), while keyed types will have most of the `object-like` assertions.
