import { useRefFrom } from 'use-ref-from';
import React, { FormEventHandler, useCallback } from 'react';

type Props = {
  className?: string;
  onInput?: (value: string) => void;
  value?: string;
};

const Input = ({ className, onInput, value }: Props) => {
  const onInputRef = useRefFrom(onInput);
  const handleInput = useCallback<FormEventHandler<HTMLInputElement>>(
    ({ currentTarget: { value } }) => onInputRef.current?.(value),
    [onInputRef]
  );

  return <input className={className} onInput={handleInput} spellCheck={false} type="text" value={value || ''} />;
};

export default Input;
