
import * as React from "react"
import { useToggleState } from "@react-stately/toggle"
import { useSwitch } from "@react-aria/switch"
import { useObjectRef } from "@react-aria/utils"
import { VisuallyHidden } from "@react-aria/focus"

import { cn } from "@/lib/utils"

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "checked" | "defaultChecked"> {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  className?: string
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, defaultChecked, onCheckedChange, ...props }, forwardedRef) => {
    const ref = useObjectRef(forwardedRef)
    const inputRef = React.useRef<HTMLInputElement>(null)
    
    const state = useToggleState({
      isSelected: checked,
      defaultSelected: defaultChecked,
      onChange: onCheckedChange
    })
    
    const { inputProps } = useSwitch(props, state, inputRef)
    
    return (
      <div 
        className={cn(
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          state.isSelected ? "bg-primary" : "bg-input",
          className
        )}
        onClick={() => state.toggle()}
      >
        <VisuallyHidden>
          <input ref={inputRef} {...inputProps} />
        </VisuallyHidden>
        <div
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
            state.isSelected ? "translate-x-5" : "translate-x-0"
          )}
        />
      </div>
    )
  }
)

Switch.displayName = "Switch"

export { Switch }
