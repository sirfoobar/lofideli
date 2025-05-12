
import React, { forwardRef } from 'react';
import { TextField as AriaTextField } from 'react-aria-components';
import type { TextFieldProps } from 'react-aria-components';

export const TextField = forwardRef<HTMLDivElement, TextFieldProps>(
  (props, ref) => (
    <AriaTextField
      {...props}
      ref={ref}
      className={`${props.className || ''}`}
    />
  )
);

TextField.displayName = 'TextField';
