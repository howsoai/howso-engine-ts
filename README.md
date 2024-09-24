# Introduction

An interface surrounding `@howso/amalgam-lang` WASM to create a simplified client.

## Getting Started

### Install dependencies

```bash
npm install @howso/engine
```

### Create a client using a Worker

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
import { type ClientOptions, HowsoWorkerClient } from "@howso/engine";

const getClient = async (options?: ClientOptions): Promise<HowsoWorkerClient> => {
  const worker = new Worker(new URL("@/workers/AmalgamWorker", import.meta.url), { type: "module" });
  const client = new HowsoWorkerClient(worker, {
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
