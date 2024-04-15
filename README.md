# Introduction

An interface around the caml files produced by the `howso-client` releases.

## Getting Started

### Install dependencies

```bash
npm install
```

## Updating caml files

All python commands must be run in `engine` directory.

Install requirements:

```bash
pip install -r requirements.in
```

To update the engine camls from the installed python howso-engine:

```bash
python -m generator update
```

## Adding new scenario

Create a module in `trainee_gen.scenarios` and import it in `__init__.py`.
In your new module import the generator module and register a function as your scenario generator.

```python
    @generator.register("scenario-name")
    def generate():
        ...

```

## Build and Test

TODO: Describe and show how to build your code and run the tests.

## Publishing

An action is available on GitHub to release.
