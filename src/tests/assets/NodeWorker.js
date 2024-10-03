import { AmalgamWasmService, initRuntime } from "@howso/amalgam-lang";
import { createRequire } from "node:module";
import { parentPort } from "node:worker_threads";
const require = createRequire(import.meta.url);
const wasmDataUri = require.resolve("@howso/amalgam-lang/lib/amalgam-st.data");
const wasmUri = require.resolve("@howso/amalgam-lang/lib/amalgam-st.wasm");

(async function () {
  const svc = new AmalgamWasmService((options) => {
    return initRuntime(options, {
      locateFile: (path) => {
        if (path.endsWith("amalgam-st.wasm")) {
          return wasmUri;
        } else if (path.endsWith("amalgam-st.data")) {
          return wasmDataUri;
        }
        return globalThis.location.href + path;
      },
    });
  });
  parentPort.onmessage = async (ev) => {
    svc.dispatch(ev);
  };
  parentPort.postMessage({ type: "event", event: "ready" });
})();
