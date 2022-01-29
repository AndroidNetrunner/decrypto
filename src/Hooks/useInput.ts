import React, { useState } from 'react';

type EventHandler = React.ChangeEventHandler<HTMLInputElement>;

const useInput = (initialValue?: string): [string, EventHandler] => {
  const [value, setValue] = useState(initialValue ?? '');
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };

  return [value, onChange];
};

export default useInput;
