import { type PropsWithChildren, type RefAttributes } from 'react';

export type EffectProps = PropsWithChildren<{ effect: 'blink'; emphasis?: boolean } & RefAttributes<HTMLSpanElement>>;
