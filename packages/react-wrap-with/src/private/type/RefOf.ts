import { type RefAttributes } from 'react';

export type RefOf<T> = T extends RefAttributes<infer R> ? R : never;
