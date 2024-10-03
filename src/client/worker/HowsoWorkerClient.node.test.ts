/**
 * @jest-environment node
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Worker } from "node:worker_threads";
import { inferFeatureAttributes } from "../../features";
import { Logger } from "../utilities/logger";
import { HowsoWorkerClient } from "./HowsoWorkerClient";
import { NodeFileSystem } from "./filesystem";

describe("Node HowsoWorkerClient", () => {
  let worker: Worker;
  let client: TestHowsoWorkerClient;

  beforeAll(async () => {
    worker = new Worker(resolve(__dirname, "../../tests/assets/NodeWorker.js"));
    const fs = new NodeFileSystem(worker);
    client = new TestHowsoWorkerClient(worker, fs, {
      trace: false,
      howsoUrl: resolve(__dirname, "../../assets/howso.caml"),
      logger,
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

  it("should call logging methods", async () => {
    const value = [Math.random(), Math.random()];
    client.callLogs(value);

    expect(error).toHaveBeenLastCalledWith(value);
    expect(warn).toHaveBeenLastCalledWith(value);
    expect(info).toHaveBeenLastCalledWith(value);
    expect(debug).toHaveBeenLastCalledWith(value);
  });
});

class TestHowsoWorkerClient extends HowsoWorkerClient {
  public callLogs(...args: any) {
    this.logger.error(...args);
    this.logger.warn(...args);
    this.logger.info(...args);
    this.logger.debug(...args);
  }
}

const error = jest.fn();
const warn = jest.fn();
const info = jest.fn();
const debug = jest.fn();
const logger: Logger = { error, warn, info, debug };
