
import React, { createContext, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Toggle } from '@/components/ui/toggle';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TooltipWrapper } from '@/components/ui/tooltip';

// Define the component map interface
export interface ComponentsMap {
  Button: typeof Button;
  Switch: typeof Switch;
  Toggle: typeof Toggle;
  Checkbox: typeof Checkbox;
  Input: typeof Input;
  Label: typeof Label;
  TooltipWrapper: typeof TooltipWrapper;
}

// Create default components object
const defaultComponents: ComponentsMap = {
  Button,
  Switch,
  Toggle,
  Checkbox,
  Input,
  Label,
  TooltipWrapper
};

// Create the context with default components
const ComponentsContext = createContext<ComponentsMap>(defaultComponents);

// Provider component
interface ComponentsProviderProps {
  components?: Partial<ComponentsMap>;
  children: React.ReactNode;
}

export const ComponentsProvider: React.FC<ComponentsProviderProps> = ({
  components = {},
  children
}) => {
  // Merge provided components with defaults
  const value = React.useMemo(
    () => ({ ...defaultComponents, ...components }),
    [components]
  );

  return (
    <ComponentsContext.Provider value={value}>
      {children}
    </ComponentsContext.Provider>
  );
};

// Hook to use components
export const useComponents = () => useContext(ComponentsContext);
