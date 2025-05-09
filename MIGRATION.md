# Migration notes

## 6.x

This major change refactors the client and types for all Howso Engine operations.

### Typing changes

- Most of all the types are now autogenerated from the Engine API, and will have a different naming schema across
  the board. However, most of the type's properties should remain the same.
- The existing `Trainee` type has been renamed to `BaseTrainee` and no longer has a `features` property. Request
  features via the method `getFeatureAttributes` instead.

### Client changes

- `BaseClient` has been renamed to `AbstractBaseClient`.
- `WasmClient` has been renamed to `HowsoWorkerClient`.
- `ProblemError` has been renamed to `HowsoError`.
- `ValidationError` has been renamed to `HowsoValidationError`.
- `ApiError`, `TimeoutError`, and `RetriableError` have been removed.
- The client's `ClientOptions.libDir` property has been removed.
- The client constructor now expects an instance of an `AbstractFileSystem` as its second parameter.
  A `BrowserFileSystem` and `NodeFileSystem` are provided for use in their respective environments.
- The `createTrainee` method no longer sets feature attributes. Call `setFeatureAttributes` manually instead
  (this also returns the updated object back).
- The `Trainee` object returned from the client now provides all Trainee operation methods directly. Such as train, react, etc.
- The `client/capabilities/*` interfaces have been removed.
- The return value of all Trainee operations has been changed to be an object with properties:
  `payload` (this matches the previous return value format) and `warnings` (a list of warning messages, if applicable).
- The `train` method no longer batches requests to the Amalgam worker service automatically. Use `Trainee.batchTrain` instead.
- The `react` method now uses `context_values` instead of `context` and `action_values` instead of `actions`.
- `local_*` react features have been removed. Use their unqualified versions instead.

### Utilities changes

- The options of `inferFeatureAttributes`'s `service.infer`'s `InferFeatureAttributesOptions` have been updated to
  a subset of standard [engine options](https://docs.howso.com/en/release-latest/api_reference/_autosummary/howso.utilities.html#howso.utilities.infer_feature_attributes). Please remap to the following:

```ts
type InferFeatureAttributesOptions = {
  dependent_features?: Record<string, string[]>;
  features?: FeatureAttributesIndex;
  include_sample?: boolean;
  infer_bounds?: boolean;
  mode_bound_features?: string[];
  ordinal_feature_values?: Record<string, string[]>;
  tight_bounds?: boolean;
};
```

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
