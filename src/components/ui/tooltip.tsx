
import * as React from "react"
import { useTooltip, useTooltipTrigger } from "@react-aria/tooltip"
import { mergeProps } from "@react-aria/utils"
import { useOverlayPosition } from "@react-aria/overlays"
import { useTooltipTriggerState } from "@react-stately/tooltip"

import { cn } from "@/lib/utils"

interface TooltipProviderProps {
  children: React.ReactNode;
  delayDuration?: number;
}

const TooltipProvider: React.FC<TooltipProviderProps> = ({ 
  children,
  delayDuration = 700
}) => {
  return (
    <TooltipContext.Provider value={{ delayDuration }}>
      {children}
    </TooltipContext.Provider>
  );
};

type TooltipContextValue = {
  delayDuration: number;
};

const TooltipContext = React.createContext<TooltipContextValue>({ 
  delayDuration: 700 
});

const useTooltipContext = () => {
  return React.useContext(TooltipContext);
};

interface TooltipProps {
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ children }) => {
  return <>{children}</>;
};

interface TooltipTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

const TooltipTrigger = React.forwardRef<HTMLElement, TooltipTriggerProps>(
  ({ children, asChild = false }, forwardedRef) => {
    // We're not using ref here because we delegate that to the actual element
    return React.Children.only(children);
  }
);

TooltipTrigger.displayName = "TooltipTrigger";

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  sideOffset?: number;
  trigger: React.RefObject<HTMLElement>;
  // New prop for complete style override
  contentClassName?: string;
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, contentClassName, sideOffset = 4, trigger, children, ...props }, forwardedRef) => {
    const { delayDuration } = useTooltipContext();
    const state = useTooltipTriggerState({
      delay: delayDuration,
      trigger: 'focus' // Changed from 'focus hover' to just 'focus' to match expected type
    });
    
    const overlayRef = React.useRef<HTMLDivElement>(null);
    
    const { triggerProps, tooltipProps } = useTooltipTrigger(
      { delay: delayDuration, trigger: 'focus' }, // Changed from 'focus hover' to just 'focus'
      state,
      trigger
    );
    
    const { tooltipProps: ariaTooltipProps } = useTooltip(tooltipProps, state);
    
    const { overlayProps } = useOverlayPosition({
      targetRef: trigger,
      overlayRef,
      placement: 'top',
      offset: sideOffset,
      isOpen: state.isOpen
    });
    
    if (!state.isOpen) {
      return null;
    }
    
    return (
      <div 
        ref={overlayRef}
        className={contentClassName || cn(
          "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...mergeProps(ariaTooltipProps, overlayProps, props)}
      >
        {children}
      </div>
    );
  }
);

TooltipContent.displayName = "TooltipContent";

// This is our simplified wrapper for ease of use
function TooltipWrapper({
  children,
  content,
  className,
  delayDuration = 700,
  sideOffset = 4,
  contentClassName,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  contentClassName?: string;
  delayDuration?: number;
  sideOffset?: number;
}) {
  const triggerRef = React.useRef<HTMLElement>(null);
  const childElement = React.Children.only(children) as React.ReactElement;
  
  // Properly merge refs if the child element already has one
  const mergedRef = (node: any) => {
    triggerRef.current = node;
    
    const { ref } = childElement as any;
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
  };
  
  const clonedChild = React.cloneElement(childElement, {
    ref: mergedRef,
  });

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger>{clonedChild}</TooltipTrigger>
        <TooltipContent 
          trigger={triggerRef} 
          className={className} 
          contentClassName={contentClassName}
          sideOffset={sideOffset}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { 
  Tooltip, 
  TooltipTrigger, 
  TooltipContent, 
  TooltipProvider,
  TooltipWrapper
}
