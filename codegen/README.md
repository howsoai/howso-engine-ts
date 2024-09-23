# Introduction

This sub project is a utility used for introspecting the current Howso Engine
API documentation and generating types and client code automatically for each
exposed label (method).

## Getting Started

Note that by running this utility, files will be added/updated/deleted in the
`src` directory. Once generated, files should then be committed back to the
repository.

Ensure that the Howso Engine caml file located at `src/engine/howso.caml` is
up to date before generation.

### Generating the code

```bash
npm run generate
```

### Development Guide

This sub project uses [nunjucks](https://mozilla.github.io/nunjucks/) for
templating, which is very similar to jinja2.
