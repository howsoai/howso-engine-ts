# Migration notes

## 6.x

This major change refactors the client and types for all Howso Engine operations.

### Typing Changes

- Most of all the types are now autogenerated from the Engine API, and will have a different naming schema across
  the board. However, most of the type's properties should remain the same.
- `types/shims` have been added as a stop gap for types lost from this migration. These will be transitioned out as
  types improve in the Howso Engine API specification.
- The existing `Trainee` type has been renamed to `BaseTrainee` and no longer has a `features` property. Request
  features via the method `getFeatureAttributes` instead.

### Client Changes

- `BaseClient` has been renamed to `AbstractBaseClient`.
- `WasmClient` has been renamed to `HowsoWorkerClient`.
- `ProblemError` has been renamed to `HowsoError`.
- `ValidationError` has been renamed to `HowsoValidationError`.
- `ApiError`, `TimeoutError`, and `RetriableError` have been removed.
- The client's `ClientOptions.libDir` property has been removed.
- The client constructor now expects an instance of an `AbstractFileSystem` as its second parameter.
  A `BrowserFileSystem` and `NodeFileSystem` are provided for use in their respective environments.
- The `train` method no longer batches requests to the Amalgam worker service automatically. Use `batchTrain` instead.
- The `createTrainee` method no longer sets feature attributes. Call `setFeatureAttributes` manually instead
  (this also returns the updated object back).
- The `client/capabilities/*` interfaces have been removed.
- The return value of all Trainee operations has been changed to be an object with properties:
  `payload` (this matches the previous return value format) and `warnings` (a list of warning messages, if applicable).
- The `react` method now uses `context_values` instead of `context` and `action_values` instead of `actions`.
- `local_*` react features have been removed. Use their unqualified versions instead.

## 5.x

The `inferFeatureAttributes` function now requires a `sourceFormat` argument, and is strongly typed through a union.
Update your calls to include the appropriate argument:

Previous:

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
const featureAttributes = await inferFeatureAttributes(data);
```

Required:

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

## 4.x

Initial public version.

## 1.x - 3.x

Internal versions.
