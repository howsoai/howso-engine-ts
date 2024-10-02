/**
 * @jest-environment node
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Worker } from "node:worker_threads";
import { inferFeatureAttributes } from "../../features";
import { HowsoWorkerClient } from "./HowsoWorkerClient";
import { NodeFileSystem } from "./filesystem";

global.structuredClone = (val) => JSON.parse(JSON.stringify(val));
describe("Node HowsoWorkerClient", () => {
  let worker: Worker;
  let client: HowsoWorkerClient;
  beforeAll(async () => {
    worker = new Worker(resolve(__dirname, "../../tests/assets/NodeWorker.js"));
    const fs = new NodeFileSystem(worker);
    client = new HowsoWorkerClient(worker, fs, {
      trace: false,
      howsoUrl: resolve(__dirname, "../../assets/howso.caml"),
    });
    await client.setup();
    const dataPath = resolve(__dirname, "../../tests/assets/iris.json");
    const data = JSON.parse(readFileSync(dataPath, { encoding: "utf8" }));
    const feature_attributes = await inferFeatureAttributes(data, "array", {});
    const trainee = await client.createTrainee({ name: "My Trainee" });
    await client.setFeatureAttributes(trainee.id, { feature_attributes });
  });
  afterAll(() => {
    worker?.terminate();
  });
  it("should queryTrainees", async () => {
    const trainees = await client.queryTrainees();
    expect(trainees.length).toBe(1);
    expect(trainees[0].name).toBe("My Trainee");
  });
});
