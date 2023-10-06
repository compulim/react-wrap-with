import { type ComponentType } from 'react';

export type PropsOf<T> = T extends ComponentType<infer P> ? P : never;
