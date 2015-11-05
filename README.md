# Commander example

How to expose [the Surge CLI](https://github.com/sintaxi/surge) within your own command line tool, built with [Commander](https://github.com/tj/commander.js).

## Getting started

This example command line tool will show you how to build Surge into your own CLI, using Commander. [The code](bin/example) is commented, and shows some basic pre- and post-run hooks you can add between Surge’s steps.

## Hooks

Here are all the pre- and post-run hooks available:

- `hooks.preAuth`
- `hooks.postAuth`
- `hooks.preProject`
- `hooks.postProject`
- `hooks.preSize`
- `hooks.postSize`
- `hooks.preDomain`
- `hooks.postDomain`
- `hooks.prePublish`
- `hooks.postPublish`

## License

[The MIT License (MIT)](LICENSE.md)

Copyright © 2015 [Chloi Inc.](http://chloi.io)
