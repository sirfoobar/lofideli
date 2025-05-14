
import * as React from "react"
import { useTextField } from "@react-aria/textfield"
import { useObjectRef } from "@react-aria/utils"

import { cn } from "@/lib/utils"

export interface InputProps extends Omit<React.ComponentProps<"input">, "onChange"> {
  onChange?: (value: string) => void;
  rootClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, rootClassName, type, onChange, ...props }, forwardedRef) => {
    const ref = useObjectRef(forwardedRef);
    
    // Create filtered props to pass to React Aria
    const ariaProps = {...props} as any;
    
    // Fix autoCapitalize type issue
    if (ariaProps.autoCapitalize) {
      const validValues = ['none', 'off', 'on', 'sentences', 'words', 'characters'];
      if (!validValues.includes(ariaProps.autoCapitalize)) {
        ariaProps.autoCapitalize = 'none';
      }
    }
    
    // Create handler that converts React's ChangeEvent to just the string value
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
          onChange(e.target.value);
        }
      },
      [onChange]
    );
    
    const { inputProps } = useTextField(
      {
        ...ariaProps,
        type,
        onChange,
      },
      ref
    );
    
    return (
      <input
        type={type}
        className={rootClassName || cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-small file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...inputProps}
        onChange={handleChange}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
