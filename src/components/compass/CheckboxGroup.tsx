
import React from 'react';
import {
  Checkbox,
  CheckboxGroup as AriaCheckboxGroup,
  CheckboxProps
} from 'react-aria-components';

export const StyledCheckbox: React.FC<CheckboxProps> = (props) => {
  return <Checkbox {...props} className={`flex items-center gap-3 text-base ${props.className || ''}`} />;
};

export const CheckboxGroup: React.FC<React.ComponentProps<typeof AriaCheckboxGroup>> = (props) => {
  return (
    <AriaCheckboxGroup
      {...props}
      className={`flex flex-col gap-2 ${props.orientation === 'horizontal' ? 'flex-row items-center' : ''} ${props.className || ''}`}
    />
  );
};

export { Checkbox };
