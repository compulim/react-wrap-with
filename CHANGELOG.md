# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Extracts props during render and pass to the wrapper component, by [@compulim](https://github.com/compulim), in PR [#4](https://github.com/compulim/react-wrap-with/pull/4) and [#5](https://github.com/compulim/react-wrap-with/pull/5)
- Forwards ref to the inner component, by [@compulim](https://github.com/compulim), in PR [#8](https://github.com/compulim/react-wrap-with/pull/8)

### Fixed

- Fixes [#9](https://github.com/compulim/react-wrap-with/issues/9), props should be extracted even if container is falsy, by [@compulim](https://github.com/compulim), in PR [#11](https://github.com/compulim/react-wrap-with/pull/11)

### Changed

- Terminology changed from "wrapper"/"wrapped" to "container"/"content", by [@compulim](https://github.com/compulim), in PR [#10](https://github.com/compulim/react-wrap-with/pull/10)
- Will no longer publish `*.spec.*` and `*.test.*` to NPM, by [@compulim](https://github.com/compulim), in PR [#6](https://github.com/compulim/react-wrap-with/pull/6) and PR [#7](https://github.com/compulim/react-wrap-with/pull/7)
- Bump dependencies, by [@compulim](https://github.com/compulim), in PR [#3](https://github.com/compulim/react-wrap-with/pull/3)
   -  Production dependencies
      -  [`@babel/runtime-corejs3@7.21.0`](https://npmjs.com/package/@babel/runtime-corejs3)
   -  Development dependencies
      -  [`@babel/cli@7.21.0`](https://npmjs.com/package/@babel/cli)
      -  [`@babel/core@7.21.0`](https://npmjs.com/package/@babel/core)
      -  [`@babel/plugin-transform-runtime@7.21.0`](https://npmjs.com/package/@babel/plugin-transform-runtime)
      -  [`@babel/preset-typescript@7.21.0`](https://npmjs.com/package/@babel/preset-typescript)
      -  [`@types/node@18.14.0`](https://npmjs.com/package/@types/node)
      -  [`@types/react@17.0.53`](https://npmjs.com/package/@types/react)
      -  [`@typescript-eslint/eslint-plugin@5.53.0`](https://npmjs.com/package/@typescript-eslint/eslint-plugin)
      -  [`@typescript-eslint/parser@5.53.0`](https://npmjs.com/package/@typescript-eslint/parser)
      -  [`esbuild@0.17.10`](https://npmjs.com/package/esbuild)
      -  [`eslint-plugin-react@7.32.2`](https://npmjs.com/package/eslint-plugin-react)
      -  [`eslint@8.34.0`](https://npmjs.com/package/eslint)
      -  [`jest-environment-jsdom@29.4.3`](https://npmjs.com/package/jest-environment-jsdom)
      -  [`jest@29.4.3`](https://npmjs.com/package/jest)
      -  [`prettier@2.8.4`](https://npmjs.com/package/prettier)
      -  [`typescript@4.9.5`](https://npmjs.com/package/typescript)

## [0.0.1] - 2023-02-12

### Added

- First public release
