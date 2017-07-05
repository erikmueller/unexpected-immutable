# Contributing

## Git commit message format

The subject (first line) of every git commit message is used for automated changelog generation. The format of a full commit message is

```
{+|!|=|~|%}{modules} {message} {(#issue)}

More detailed explanations.
```

satisfying the following rules:

* `{+|!|=|~|%}` is one of the allowed commit types (see [here](#types))
* `{modules}` is an optional comma separated (no spaces) list of touched modules
* `{message}` is written in imperative form
* `{(#issue)}`, if present, is the corresponding GitHub issue number
* The detailed explanation, if present, is written in full sentences and describes what, why and/or how

### Examples

```
+ Add some new feature (#123)
! Remove some field from user model (#124)
=mod1 Cleanup route namings
~ Fix http verbs (#126)
%mod2,mod3 Change some lines in readme (#125)
```

### Types

Depending on the type of change a commit introduces, it subject has to be prefixed with one of the following characters:

* `+` New feature
* `!` Breaking change
* `=` Refactoring
* `~` Fix
* `%` Miscellaneous
