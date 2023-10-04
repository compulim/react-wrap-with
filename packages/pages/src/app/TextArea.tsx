import { useRefFrom } from 'use-ref-from';
import React, { FormEventHandler, useCallback } from 'react';

type Props = {
  className?: string;
  onInput?: (value: string) => void;
  value?: string;
};

const TextArea = ({ className, onInput, value }: Props) => {
  const onInputRef = useRefFrom(onInput);
  const handleInput = useCallback<FormEventHandler<HTMLTextAreaElement>>(
    ({ currentTarget: { value } }) => onInputRef.current?.(value),
    [onInputRef]
  );

  return <textarea className={className} onInput={handleInput} spellCheck={false} value={value || ''} />;
};

export default TextArea;
