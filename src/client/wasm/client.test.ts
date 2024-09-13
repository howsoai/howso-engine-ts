import { beforeAll, describe, expect, test } from "@jest/globals";
import { WasmClient } from "./client";

const getClient = async (): Promise<WasmClient> => {
  const worker = new Worker(new URL("../workers/AmalgamWorker", import.meta.url), { type: "module" });
  const client = new WasmClient(worker, {});
  await client.setup();
  return client;
};

describe("client/wasm", () => {
  let client: WasmClient;

  beforeAll(async () => {
    client = await getClient();
  });

  test("getActiveSession", async () => {
    const session = await client.getActiveSession();
    expect(session).toBeFalsy();
  });

  // test("get concurrency type", async () => {
  //   // Test concurrency type is SingleThreaded
  //   const value = amlg.getConcurrencyType();
  //   expect(typeof value).toBe("string");
  //   expect(value).toMatch("SingleThreaded");
  // });

  // test("get max threads", async () => {
  //   // Test max threads is 1
  //   const value = amlg.getMaxNumThreads();
  //   expect(typeof value).toBe("number");
  //   expect(value).toEqual(1);
  // });
});
