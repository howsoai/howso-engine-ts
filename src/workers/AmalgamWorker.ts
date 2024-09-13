import { AmalgamWasmService, initRuntime } from "@howso/amalgam-lang";
// @ts-expect-error Type not provided
import wasmDataUri from "@howso/amalgam-lang/lib/amalgam-st.data?url";
// @ts-expect-error Type not provided
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
