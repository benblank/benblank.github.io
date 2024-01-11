---
title: Alternatives to `__dirname` and `__filename` for ES Modules
---

* <https://github.com/nodejs/node/pull/48740>
* `node:fs` works with `file:` URLs (TODO: am I remembering correctly that it
  also works on `http:` URLs?)
* `node:path/posix` works with URL paths
* `URL` is a global, so no imports are needed
* relative URLs can actually be more convenient than paths, as filenames are
  implicitly stripped off

  ``` javascript
  // Given the path to a file, read a file in a subdirectory.
  fs.readFile(path.join(path.dirname(somePath)), "subdir", "file.txt");

  // Given a URL for a file, read a file in a subdirectory.
  fs.readFile(new URL("subdir/file.txt", someUrl));
  ```

  This works when traversing directories upwards as well, using `../`.

* URLs always use forward slashes, even on Windows
* `import.meta.dirname` and `import.meta.filename` are an inconsistent API,
  because they only apply to `file:` URLs

  * using URLs directly works with `file:`, `http:`, and `https:`

    * doesn't work with `data:` URLs, but neither does anything else, so if you
      need to know, you'll have to check it regardless

## A practical example

Let's back up that claim of improved ergonomics with an example: a package which
contains a binary that wants to know what version of the package is being used.

First a few disclaimers, so that we're all on the same page:

* Yes, it *is* a bit of a contrieved example; your own package may well use a
  build system which can embed the package version directly into the binary.
  However, it's also something I've actually had to do more than once.
* I'm going to be pendantic about directory separators (`/` vs `\\`), even
  though it's often safe to use forward slashes on Windows, as it shows off one
  of the strengths of the URL approach.
* A package's binaries can be located anywhere you like, but it's both
  illustrative and pretty common for them to be inside a `…/bin/` or `…/dist/`
  directory.
* I'll be storing a lot of intermediate values in variables. Most of the
  examples below could be one-liners (outside of any `import` statements), but
  it helps show how many steps are being taken.

With that out of the way (finally!), let's look at how this might be done in a
CommonJS file.

``` javascript
// bin/cli.cjs

const path = require("node:path");

const packageRoot = path.dirname(__dirname);
const packageJsonPath = path.join(packageRoot, "package.json");
const version = JSON.parse(await readFile(packageJsonPath, "utf-8")).version;
```

That isn't *too* bad, especially if you need the package root for other things,
but it still needs a couple rounds of path manipulation. Now, we'll look at how
that translates into an ES module which supports Node versions before 20.11.0.

``` javascript
// bin/cli.mjs

import * as path from "node:path";
import { fileURLToPath } from "node:url";

const modulePath = fileURLToPath(import.meta.url);
const packageRoot = path.dirname(path.dirname(modulePath));
const packageJsonPath = path.join(packageRoot, "package.json");
const version = JSON.parse(await readFile(packageJsonPath, "utf-8")).version;
```

Well, that isn't an improvement. Because ES modules only track the location of
the file and not also the directory it's in, an extra call to `dirname` is
needed. And that's only after translating the URL into a filesystem path, which
even needs an additional import.

Fortunately, Node 20.11.0 improves things, both reintroducing a reference to the
module's directory and eliminating the URL translation step.

``` javascript
// bin/cli.mjs

import * as path from "node:path";

const packageRoot = path.dirname(import.meta.dirname);
const packageJsonPath = path.join(packageRoot, "package.json");
const version = JSON.parse(await readFile(packageJsonPath, "utf-8")).version;
```

Unsurprisingly, that looks almost exactly the same as the CommonJS version. All
that changed was where the directory name comes from and the import style.

But this can still be improved — by a fair amount — if we ditch filesystem paths
altogether. In the last example, we'll do just that.

``` javascript
// bin/cli.mjs

const packageJsonUrl = new URL("../package.json", import.meta.url);
const version = JSON.parse(await readFile(packageJsonUrl, "utf-8")).version;
```

Isn't that nicer? No path manipulation, not even any imports. Just relative and
base URLs.

TODO: infobox or similar for below?

Did that last line suprise you? Not only does Node's `fs` module work perfectly
well with `file:` URLs, it doesn't even require that they be serialzied back
into strings first.
