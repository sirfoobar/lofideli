
import * as React from "react"
import { useObjectRef } from "@react-aria/utils"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

// Define props with customization options
export interface CollapsibleProps extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root> {
  rootClassName?: string;
}

const Collapsible = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  CollapsibleProps
>(({ className, rootClassName, ...props }, forwardedRef) => {
  const ref = useObjectRef(forwardedRef);
  
  return (
    <CollapsiblePrimitive.Root
      ref={ref}
      className={rootClassName || className}
      {...props}
    />
  );
});

Collapsible.displayName = "Collapsible"

// Enhanced trigger with customization
export interface CollapsibleTriggerProps extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger> {
  triggerClassName?: string;
}

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  CollapsibleTriggerProps
>(({ className, triggerClassName, ...props }, forwardedRef) => {
  const ref = useObjectRef(forwardedRef);
  
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      ref={ref}
      className={triggerClassName || className}
      {...props}
    />
  );
});

CollapsibleTrigger.displayName = "CollapsibleTrigger"

// Enhanced content with customization
export interface CollapsibleContentProps extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent> {
  contentClassName?: string;
}

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  CollapsibleContentProps
>(({ className, contentClassName, ...props }, forwardedRef) => {
  const ref = useObjectRef(forwardedRef);
  
  return (
    <CollapsiblePrimitive.CollapsibleContent
      ref={ref}
      className={contentClassName || className}
      {...props}
    />
  );
});

CollapsibleContent.displayName = "CollapsibleContent"

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
