# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Breaking changes

- Removed named exports, please import the defaults instead
   - Use `import { Extract, Spy, wrapWith } from 'react-wrap-with'` instead
- Moved build tools from Babel to tsup/esbuild

### Changed

- Bumped dependencies, by [@compulim](https://github.com/compulim), in PR [#58](https://github.com/compulim/react-wrap-with/pull/58) and [#65](https://github.com/compulim/react-wrap-with/pull/65)
   - Production dependencies
      - [`@babel/runtime-corejs3@7.24.6`](https://npmjs.com/package/@babel/runtime-corejs3)
      - [`type-fest@4.18.2`](https://npmjs.com/package/type-fest/v/4.18.2)
   - Development dependencies
      - [`@babel/cli@7.24.6`](https://npmjs.com/package/@babel/cli)
      - [`@babel/core@7.24.6`](https://npmjs.com/package/@babel/core)
      - [`@babel/plugin-transform-runtime@7.24.6`](https://npmjs.com/package/@babel/plugin-transform-runtime)
      - [`@babel/preset-env@7.24.6`](https://npmjs.com/package/@babel/preset-env)
      - [`@babel/preset-react@7.24.6`](https://npmjs.com/package/@babel/preset-react)
      - [`@babel/preset-typescript@7.24.6`](https://npmjs.com/package/@babel/preset-typescript)
      - [`@testing-library/react@15.0.7`](https://npmjs.com/package/@testing-library/react)
      - [`@tsconfig/recommended@1.0.6`](https://npmjs.com/package/@tsconfig/recommended)
      - [`@types/node@20.12.12`](https://npmjs.com/package/@types/node/v/20.12.12)
      - [`@types/react-dom@18.3.0`](https://npmjs.com/package/@types/react-dom)
      - [`@types/react@18.3.3`](https://npmjs.com/package/@types/react)
      - [`@typescript-eslint/eslint-plugin@7.4.0`](https://npmjs.com/package/@typescript-eslint/eslint-plugin/v/7.4.0)
      - [`@typescript-eslint/parser@7.4.0`](https://npmjs.com/package/@typescript-eslint/parser/v/7.4.0)
      - [`esbuild@0.21.3`](https://npmjs.com/package/esbuild/v/0.21.3)
      - [`eslint-plugin-react@7.34.1`](https://npmjs.com/package/eslint-plugin-react/v/7.34.1)
      - [`react-dom@18.3.1`](https://npmjs.com/package/react-dom)
      - [`react-test-renderer@18.3.1`](https://npmjs.com/package/react-test-renderer)
      - [`react@18.3.1`](https://npmjs.com/package/react)
      - [`typescript@5.4.5`](https://npmjs.com/package/typescript)

## [0.1.0] - 2024-04-01

### Changed

- Relaxed peer dependencies requirements to `react@>=16.8.0`, by [@compulim](https://github.com/compulim) in PR [#55](https://github.com/compulim/react-wrap-with/pull/55)
- Bumped dependencies, by [@compulim](https://github.com/compulim), in PR [#50](https://github.com/compulim/react-wrap-with/pull/50), [#52](https://github.com/compulim/react-wrap-with/pull/52), [#54](https://github.com/compulim/react-wrap-with/pull/54), and [#55](https://github.com/compulim/react-wrap-with/pull/55)
   - Production dependencies
      - [`@babel/runtime-corejs3@7.24.1`](https://npmjs.com/package/@babel/runtime-corejs3)
      - [`type-fest@4.14.0`](https://npmjs.com/package/type-fest)
   - Development dependencies
      - [`@babel/cli@7.24.1`](https://npmjs.com/package/@babel/cli)
      - [`@babel/core@7.24.3`](https://npmjs.com/package/@babel/core)
      - [`@babel/plugin-transform-runtime@7.24.3`](https://npmjs.com/package/@babel/plugin-transform-runtime)
      - [`@babel/preset-env@7.24.3`](https://npmjs.com/package/@babel/preset-env)
      - [`@babel/preset-react@7.24.1`](https://npmjs.com/package/@babel/preset-react)
      - [`@babel/preset-typescript@7.24.1`](https://npmjs.com/package/@babel/preset-typescript)
      - [`@testing-library/react@14.2.2`](https://npmjs.com/package/@testing-library/react)
      - [`@tsconfig/recommended@1.0.5`](https://npmjs.com/package/@tsconfig/recommended)
      - [`@tsconfig/strictest@2.0.5`](https://npmjs.com/package/@tsconfig/strictest)
      - [`@types/jest@29.5.12`](https://npmjs.com/package/@types/jest)
      - [`@types/node@20.12.2`](https://npmjs.com/package/@types/node)
      - [`@types/react-dom@18.2.23`](https://npmjs.com/package/@types/react-dom)
      - [`@types/react@18.2.73`](https://npmjs.com/package/@types/react)
      - [`@typescript-eslint/eslint-plugin@7.4.0`](https://npmjs.com/package/@typescript-eslint/eslint-plugin)
      - [`@typescript-eslint/parser@7.4.0`](https://npmjs.com/package/@typescript-eslint/parser)
      - [`esbuild@0.20.2`](https://npmjs.com/package/esbuild)
      - [`eslint-plugin-prettier@5.1.3`](https://npmjs.com/package/eslint-plugin-prettier)
      - [`eslint-plugin-react@7.34.1`](https://npmjs.com/package/eslint-plugin-react)
      - [`eslint@8.57.0`](https://npmjs.com/package/eslint)
      - [`jest-environment-jsdom@29.7.0`](https://npmjs.com/package/jest-environment-jsdom)
      - [`jest@29.7.0`](https://npmjs.com/package/jest)
      - [`prettier@3.2.5`](https://npmjs.com/package/prettier)
      - [`typescript@5.4.3`](https://npmjs.com/package/typescript)
      - [`use-ref-from@0.1.0`](https://npmjs.com/package/use-ref-from)
- Updated pull request validation to test against various React versions, in PR [#53](https://github.com/compulim/react-wrap-with/pull/53)
   - Moved from JSX Runtime to JSX Classic to support testing against React 16

## [0.0.4] - 2023-10-09

### Changed

- Exported some types from `type-fest` to workaround [a TypeScript bug with monorepo](https://github.com/microsoft/TypeScript/issues/47663), by [@compulim](https://github.com/compulim), in PR [#42](https://github.com/compulim/react-wrap-with/pull/42)

## [0.0.3] - 2023-10-09

### Added

- Added option to spy props of content component and pass it to container component, by [@compulim](https://github.com/compulim), in PR [#30](https://github.com/compulim/react-wrap-with/pull/30), PR [#31](https://github.com/compulim/react-wrap-with/pull/31) and PR [#34](https://github.com/compulim/react-wrap-with/pull/34)
- Added `withProps` higher-order component to replace initial props, by [@compulim](https://github.com/compulim), in PR [#35](https://github.com/compulim/react-wrap-with/pull/35)

### Changed

- Added type-checking for test, by [@compulim](https://github.com/compulim), in PR [#20](https://github.com/compulim/react-wrap-with/pull/20)
- Updated `tsconfig.json` to extend from [`@tsconfig/strictest`](https://npmjs.com/package/@tsconfig/strictest), by [@compulim](https://github.com/compulim), in PR [#20](https://github.com/compulim/react-wrap-with/pull/20)
- Cleaned up types, by [@compulim](https://github.com/compulim), in PR [#37](https://github.com/compulim/react-wrap-with/pull/37)
- Converged type outputs folder to `/lib/commonjs/` and `/lib/esmodules/`, by [@compulim](https://github.com/compulim), in PR [#38](https://github.com/compulim/react-wrap-with/pull/38)
- Bump dependencies, by [@compulim](https://github.com/compulim), in PR [#20](https://github.com/compulim/react-wrap-with/pull/20), PR [#22](https://github.com/compulim/react-wrap-with/pull/22), and PR [#23](https://github.com/compulim/react-wrap-with/pull/23)
  - Production dependencies
    - [`@babel/runtime-corejs3@7.22.15`](https://npmjs.com/package/@babel/runtime-corejs3)
  - Development dependencies
    - [`@babel/cli@7.22.15`](https://npmjs.com/package/@babel/cli)
    - [`@babel/core@7.22.17`](https://npmjs.com/package/@babel/core)
    - [`@babel/plugin-transform-runtime@7.22.15`](https://npmjs.com/package/@babel/plugin-transform-runtime)
    - [`@babel/preset-env@7.22.15`](https://npmjs.com/package/@babel/preset-env)
    - [`@babel/preset-react@7.22.15`](https://npmjs.com/package/@babel/preset-react)
    - [`@babel/preset-typescript@7.22.15`](https://npmjs.com/package/@babel/preset-typescript)
    - [`@testing-library/react@14.0.0`](https://npmjs.com/package/@testing-library/react)
    - [`@types/jest@29.5.4`](https://npmjs.com/package/@types/jest)
    - [`@types/node@20.6.0`](https://npmjs.com/package/@types/node)
    - [`@types/react-dom@18.2.7`](https://npmjs.com/package/@types/react-dom)
    - [`@types/react@18.2.21`](https://npmjs.com/package/@types/react)
    - [`@typescript-eslint/eslint-plugin@6.6.0`](https://npmjs.com/package/@typescript-eslint/eslint-plugin)
    - [`@typescript-eslint/parser@6.6.0`](https://npmjs.com/package/@typescript-eslint/parser)
    - [`esbuild@0.19.2`](https://npmjs.com/package/esbuild)
    - [`eslint-plugin-prettier@5.0.0`](https://npmjs.com/package/eslint-plugin-prettier)
    - [`eslint-plugin-react@7.33.2`](https://npmjs.com/package/eslint-plugin-react)
    - [`eslint@8.49.0`](https://npmjs.com/package/eslint)
    - [`jest-environment-jsdom@29.6.4`](https://npmjs.com/package/jest-environment-jsdom)
    - [`jest@29.6.4`](https://npmjs.com/package/jest)
    - [`prettier@3.0.3`](https://npmjs.com/package/prettier)
    - [`react-dom@18.2.0`](https://npmjs.com/package/react-dom)
    - [`react-test-renderer@18.2.0`](https://npmjs.com/package/react-test-renderer)
    - [`react@18.2.0`](https://npmjs.com/package/react)
    - [`typescript@5.2.2`](https://npmjs.com/package/typescript)

### Removed

- Extract props signature changed, by [@compulim](https://github.com/compulim), in PR [#30](https://github.com/compulim/react-wrap-with/pull/30)
  - Was: `wrapWith(Container, {}, 'effect')`
  - Now: `wrapWith(Container, { effect: Extract })`
- Initial props is removed and replaced by `withProps` HOC, by [@compulim](https://github.com/compulim), in PR [#35](https://github.com/compulim/react-wrap-with/pull/35)
  - Was: `wrapWith(Container, { effect: 'blink', emphasis: Spy })`
  - Now: `wrapWith(withProps(Container, { effect: 'blink' }), { emphasis: Spy })`
- No longer accept falsy component type, if falsy is expected, coalesce to `<Fragment>` instead, by [@compulim](https://github.com/compulim), in PR [#36](https://github.com/compulim/react-wrap-with/pull/36)
  - Was: `wrapWith(undefined)`
  - Now: `wrapWith(undefined || Fragment)`

### Fixed

- Fixed portable type, by [@compulim](https://github.com/compulim), in PR [#34](https://github.com/compulim/react-wrap-with/pull/34)
- Updated `exports` field to workaround [TypeScript resolution bug](https://github.com/microsoft/TypeScript/issues/50762), by [@compulim](https://github.com/compulim), in PR [#20](https://github.com/compulim/react-wrap-with/pull/20)

## [0.0.2] - 2023-03-21

### Added

- Extracts props during render and pass to the wrapper component, by [@compulim](https://github.com/compulim), in PR [#4](https://github.com/compulim/react-wrap-with/pull/4) and [#5](https://github.com/compulim/react-wrap-with/pull/5)
- Forwards ref to the inner component, by [@compulim](https://github.com/compulim), in PR [#8](https://github.com/compulim/react-wrap-with/pull/8)

### Changed

- Terminology changed from "wrapper"/"wrapped" to "container"/"content", by [@compulim](https://github.com/compulim), in PR [#10](https://github.com/compulim/react-wrap-with/pull/10)
- Will no longer publish `*.spec.*` and `*.test.*` to NPM, by [@compulim](https://github.com/compulim), in PR [#6](https://github.com/compulim/react-wrap-with/pull/6) and PR [#7](https://github.com/compulim/react-wrap-with/pull/7)
- Bump dependencies, by [@compulim](https://github.com/compulim), in PR [#3](https://github.com/compulim/react-wrap-with/pull/3)
  - Production dependencies
    - [`@babel/runtime-corejs3@7.21.0`](https://npmjs.com/package/@babel/runtime-corejs3)
  - Development dependencies
    - [`@babel/cli@7.21.0`](https://npmjs.com/package/@babel/cli)
    - [`@babel/core@7.21.0`](https://npmjs.com/package/@babel/core)
    - [`@babel/plugin-transform-runtime@7.21.0`](https://npmjs.com/package/@babel/plugin-transform-runtime)
    - [`@babel/preset-typescript@7.21.0`](https://npmjs.com/package/@babel/preset-typescript)
    - [`@types/node@18.14.0`](https://npmjs.com/package/@types/node)
    - [`@types/react@17.0.53`](https://npmjs.com/package/@types/react)
    - [`@typescript-eslint/eslint-plugin@5.53.0`](https://npmjs.com/package/@typescript-eslint/eslint-plugin)
    - [`@typescript-eslint/parser@5.53.0`](https://npmjs.com/package/@typescript-eslint/parser)
    - [`esbuild@0.17.10`](https://npmjs.com/package/esbuild)
    - [`eslint-plugin-react@7.32.2`](https://npmjs.com/package/eslint-plugin-react)
    - [`eslint@8.34.0`](https://npmjs.com/package/eslint)
    - [`jest-environment-jsdom@29.4.3`](https://npmjs.com/package/jest-environment-jsdom)
    - [`jest@29.4.3`](https://npmjs.com/package/jest)
    - [`prettier@2.8.4`](https://npmjs.com/package/prettier)
    - [`typescript@4.9.5`](https://npmjs.com/package/typescript)

### Fixed

- Fixes [#9](https://github.com/compulim/react-wrap-with/issues/9), props should be extracted even if container is falsy, by [@compulim](https://github.com/compulim), in PR [#11](https://github.com/compulim/react-wrap-with/pull/11)
- Fixes [#12](https://github.com/compulim/react-wrap-with/issues/12), exports typings through conditional exports, by [@compulim](https://github.com/compulim), in PR [#13](https://github.com/compulim/react-wrap-with/pull/13)

## [0.0.1] - 2023-02-12

### Added

- First public release

[0.1.0]: https://github.com/compulim/react-wrap-with/compare/v0.0.4...v0.1.0
[0.0.4]: https://github.com/compulim/react-wrap-with/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/compulim/react-wrap-with/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/compulim/react-wrap-with/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/compulim/react-wrap-with/releases/tag/v0.0.1
