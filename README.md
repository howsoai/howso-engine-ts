# Introduction

An interface surrounding `@howso/amalgam-lang` WASM to create a simplified client.

## Getting Started

### Install dependencies

```bash
npm install @howso/engine
```

### Inferring feature attributes

During trainee creation, you'll need to iterate on your data to describe its
[feature attributes](https://docs.howso.com/user_guide/basic_capabilities/feature_attributes.html).

This package supplied methods to assist with inference from data generically, or directly through dedicated classes.
The primary entry point is through `inferFeatureAttributes`:

```ts
import { inferFeatureAttributes, type ArrayData } from "@howso/engine";

const columns = ["id", "number", "date", "boolean"];
const data: ArrayData = {
  columns,
  data: [
    ["0", 1.2, yesterday.toISOString(), false],
    ["1", 2.4, now.toISOString(), true],
    ["3", 2.4, null, true],
    ["4", 5, now.toISOString(), true],
  ],
};
const featureAttributes = await inferFeatureAttributes(data, "array");
```

If your data's source is always the same, you may bypass the method, creating and calling a source handler directly.
For example, the data above could be used directly with the `InferFeatureAttributesFromArray` class:

```ts
const service = new InferFeatureAttributesFromArray(data);
const features = await service.infer();
```

### Using a client

#### Through a web Worker

```ts
import { AmalgamWasmService, initRuntime } from "@howso/amalgam-lang";
import wasmDataUri from "@howso/amalgam-lang/lib/amalgam-st.data?url";
import wasmUri from "@howso/amalgam-lang/lib/amalgam-st.wasm?url";

(async function () {
  const svc = new AmalgamWasmService((options) => {
    return initRuntime(options, {
      locateFile: (path: string) => {
        // Override file paths so we can use hashed version in build
        if (path.endsWith("amalgam-st.wasm")) {
          return wasmUri;
        } else if (path.endsWith("amalgam-st.data")) {
          return wasmDataUri;
        }
        return self.location.href + path;
      },
    });
  });
  self.onmessage = async (ev) => {
    svc.dispatch(ev);
  };
  self.postMessage({ type: "event", event: "ready" });
})();
```

You can then create the worker client using a url import:

```ts
import howsoUrl from "@/data/engine/howso.caml?url";
import migrationsUrl from "@/data/engine/migrations.caml?url";
import { type ClientOptions, Trainee, WasmClient } from "@howso/engine";

const getClient = async (): Promise<WasmClient> => {
  const worker = new Worker(new URL("@/workers/AmalgamWorker", import.meta.url), { type: "module" });
  const client = new WasmClient(worker, {
    howsoUrl,
    migrationsUrl,
    ...options,
  });
  return client.setup();
};
```

## Publishing

Documentation changes do not require a version publishing.
For functional changes, follow [SemVer](https://semver.org/)
standards updating the `package.json` and `package-lock.json`
files in your pull request.

When you are ready to publish a new version, use the Github Release action.
