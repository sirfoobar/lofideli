
import React, { createContext, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Toggle } from '@/components/ui/toggle';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { TooltipWrapper } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

// Define the component map interface
export interface ComponentsMap {
  // Basic UI Elements
  Button: typeof Button;
  Switch: typeof Switch;
  Toggle: typeof Toggle;
  Checkbox: typeof Checkbox;
  Input: typeof Input;
  Textarea: typeof Textarea;
  Label: typeof Label;
  
  // Layout Components
  Card: typeof Card;
  CardHeader: typeof CardHeader;
  CardTitle: typeof CardTitle;
  CardDescription: typeof CardDescription;
  CardContent: typeof CardContent;
  CardFooter: typeof CardFooter;
  Separator: typeof Separator;
  
  // Interactive Components
  RadioGroup: typeof RadioGroup;
  RadioGroupItem: typeof RadioGroupItem;
  Tabs: typeof Tabs;
  TabsList: typeof TabsList;
  TabsTrigger: typeof TabsTrigger;
  TabsContent: typeof TabsContent;
  Accordion: typeof Accordion;
  AccordionItem: typeof AccordionItem;
  AccordionTrigger: typeof AccordionTrigger;
  AccordionContent: typeof AccordionContent;
  
  // Visual & Feedback Components
  Avatar: typeof Avatar;
  AvatarImage: typeof AvatarImage;
  AvatarFallback: typeof AvatarFallback;
  Badge: typeof Badge;
  Progress: typeof Progress;
  Alert: typeof Alert;
  AlertTitle: typeof AlertTitle;
  AlertDescription: typeof AlertDescription;
  AspectRatio: typeof AspectRatio;
  
  // Utility Components
  TooltipWrapper: typeof TooltipWrapper;
}

// Create default components object
const defaultComponents: ComponentsMap = {
  // Basic UI Elements
  Button,
  Switch,
  Toggle,
  Checkbox,
  Input,
  Textarea,
  Label,
  
  // Layout Components
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Separator,
  
  // Interactive Components
  RadioGroup,
  RadioGroupItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  
  // Visual & Feedback Components
  Avatar,
  AvatarImage,
  AvatarFallback,
  Badge,
  Progress,
  Alert,
  AlertTitle,
  AlertDescription,
  AspectRatio,
  
  // Utility Components
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

// Export component types for cleaner imports
export type {
  Button,
  Switch,
  Toggle,
  Checkbox,
  Input,
  Textarea,
  Label,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Separator,
  RadioGroup,
  RadioGroupItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Badge,
  Progress,
  Alert,
  AlertTitle,
  AlertDescription,
  AspectRatio,
  TooltipWrapper
};
