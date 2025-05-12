
import React from 'react';
import {
  TextField,
  Label,
  FieldError,
  Text,
  Form as AriaForm,
} from 'react-aria-components';

export const Form: React.FC<React.ComponentProps<typeof AriaForm>> = (props) => {
  return <AriaForm {...props} className={`flex flex-col gap-6 ${props.className || ''}`} />;
};

export const FormTextField: React.FC<React.ComponentProps<typeof TextField>> = (props) => {
  return <TextField {...props} className={`flex flex-col gap-2 ${props.className || ''}`} />;
};

export const FormLabel: React.FC<React.ComponentProps<typeof Label>> = (props) => {
  return <Label {...props} className={`text-neutral-900 text-base font-medium ${props.className || ''}`} />;
};

export const FormFieldError: React.FC<React.ComponentProps<typeof FieldError>> = (props) => {
  return <FieldError {...props} className={`text-red-500 text-sm ${props.className || ''}`} />;
};

export const HelperText: React.FC<React.ComponentProps<typeof Text>> = (props) => {
  return <Text {...props} className={`text-neutral-500 text-sm ${props.className || ''}`} />;
};

export { Label, FieldError };
