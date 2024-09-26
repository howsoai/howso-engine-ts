# Migration notes

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
