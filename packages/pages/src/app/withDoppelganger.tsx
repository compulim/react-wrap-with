import { Extract, Spy, wrapWith } from 'react-wrap-with';
import React, { type CSSProperties, type PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  containerClassName?: string;
  containerStyle?: CSSProperties;
  doppelgangerClassName?: string;
  doppelgangerStyle?: CSSProperties;
  prefix?: string;
  suffix?: string;
  value?: string;
}>;

const DoppelgangerWrapper = ({ children, containerClassName, doppelgangerClassName, prefix, suffix, value }: Props) => (
  <div className={containerClassName}>
    <div className={doppelgangerClassName}>
      {prefix}
      {value}
      {suffix}
    </div>
    {children}
  </div>
);

const withDoppelganger = wrapWith(DoppelgangerWrapper, {
  containerClassName: Extract,
  doppelgangerClassName: Extract,
  prefix: Extract,
  suffix: Extract,
  value: Spy
});

export default withDoppelganger;