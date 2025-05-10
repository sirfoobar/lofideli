
import * as React from "react"
import { useCheckbox } from "@react-aria/checkbox"
import { useToggleState } from "@react-stately/toggle"
import { useObjectRef } from "@react-aria/utils"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

export interface CheckboxProps extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "checked" | "defaultChecked" | "onCheckedChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  rootClassName?: string;
  indicatorClassName?: string;
  // Fix - ensure value is properly typed for React Aria
  value?: string;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, rootClassName, indicatorClassName, checked, defaultChecked, onCheckedChange, value, ...props }, forwardedRef) => {
  const ref = useObjectRef(forwardedRef);
  const state = useToggleState({
    isSelected: checked,
    defaultSelected: defaultChecked,
    onChange: onCheckedChange
  });
  
  // Fix: Correctly cast the props to match what useCheckbox expects
  const { inputProps } = useCheckbox(
    {
      ...props,
      isSelected: state.isSelected,
      value: value || '',
      // Remove onChange from props to avoid type conflict
    },
    state,
    ref
  );

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={rootClassName || cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className
      )}
      checked={state.isSelected}
      onCheckedChange={state.toggle}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={indicatorClassName || cn("flex items-center justify-center text-current")}
      >
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
