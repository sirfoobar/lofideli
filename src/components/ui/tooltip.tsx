
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
    // Fix: Ensure we're only returning a valid React element
    // Instead of using React.Children.only which throws if not exactly one child
    const child = React.isValidElement(children) ? children : <span>{children}</span>;
    return child;
  }
);

TooltipTrigger.displayName = "TooltipTrigger";

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  sideOffset?: number;
  trigger: React.RefObject<HTMLElement>;
  // New prop for complete style override
  contentClassName?: string;
  // Make these optional to avoid type errors
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  hidden?: boolean;
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, contentClassName, sideOffset = 4, trigger, side = 'top', align = 'center', hidden = false, children, ...props }, forwardedRef) => {
    const { delayDuration } = useTooltipContext();
    const state = useTooltipTriggerState({
      delay: delayDuration,
      // Fix: Use the correct type 'focus' instead of 'focus hover'
      trigger: 'focus'
    });
    
    const overlayRef = React.useRef<HTMLDivElement>(null);
    
    const { triggerProps, tooltipProps } = useTooltipTrigger(
      { delay: delayDuration, trigger: 'focus' },
      state,
      trigger
    );
    
    const { tooltipProps: ariaTooltipProps } = useTooltip(tooltipProps, state);
    
    const { overlayProps } = useOverlayPosition({
      targetRef: trigger,
      overlayRef,
      placement: side,
      offset: sideOffset,
      isOpen: state.isOpen && !hidden
    });
    
    if (!state.isOpen || hidden) {
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
  
  // Fix: Ensure we're handling children correctly
  // We need to make sure we're passing a valid React element to TooltipTrigger
  const childElement = React.isValidElement(children) 
    ? children 
    : <span>{children}</span>;
  
  // Properly merge refs if the child element already has one
  const mergedRef = (node: any) => {
    triggerRef.current = node;
    
    const childRef = (childElement as any).ref;
    if (childRef) {
      if (typeof childRef === 'function') {
        childRef(node);
      } else if (childRef && 'current' in childRef) {
        childRef.current = node;
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
