---
title: Executing TypeScript directly in Node.js
---

No ts-node, no esublid-register, just plain old Node and TypeScript.

**This implementation requires Node 20.6.0 or higher!** (Can that be avoided?)

* <https://nodejs.org/dist/latest-v20.x/docs/api/module.html#moduleregisterspecifier-parenturl-options>
* <https://nodejs.org/dist/latest-v20.x/docs/api/module.html#customization-hooks>
* <https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API>

This repo is itself an example. (Using w/ 11ty also needs `--config=` and
`.addExtension()`.)
