// Related to https://github.com/import-js/eslint-plugin-import/issues/2872.
// eslint-disable-next-line import/consistent-type-specifier-style
export type { ConditionalKeys, Simplify } from 'type-fest';

export { default as Extract } from './Extract.ts';
export { default as Spy } from './Spy.ts';
export { default as withProps } from './withProps.ts';
export { default as wrapWith } from './wrapWith.ts';

// Due to [a TypeScript bug with monorepo](https://github.com/microsoft/TypeScript/issues/47663), we need to export types from dependencies.
export { type HowOf } from './HowOf.ts';
export { type PropsOf } from './PropsOf.ts';
export { type RefOf } from './RefOf.ts';
