import { type RefAttributes } from 'react';

export type HelloProps = { emphasis?: boolean; text: string } & RefAttributes<HTMLHeadingElement>;
