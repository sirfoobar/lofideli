
import React from 'react';
import { X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useComponents } from '@/context/ComponentsProvider';

// Component icons
import { 
  Square, 
  Type, 
  Heading, 
  Paragraph, 
  CircleDot, 
  CreditCard, 
  SeparatorHorizontal, 
  FormInput, 
  CheckSquare, 
  ChevronDown, 
  Image
} from 'lucide-react';

interface UiComponentsSidebarProps {
  open: boolean;
  onClose: () => void;
}

const COMPONENT_CATEGORIES = [
  {
    name: 'Basic Elements',
    items: [
      { name: 'Button', icon: Square },
      { name: 'Text', icon: Type },
      { name: 'Heading', icon: Heading },
      { name: 'Paragraph', icon: Paragraph },
      { name: 'Input', icon: FormInput },
      { name: 'Checkbox', icon: CheckSquare },
      { name: 'Radio', icon: CircleDot },
      { name: 'Dropdown', icon: ChevronDown },
      { name: 'Image', icon: Image }
    ]
  },
  {
    name: 'Layout',
    items: [
      { name: 'Card', icon: CreditCard },
      { name: 'Divider', icon: SeparatorHorizontal }
    ]
  },
  {
    name: 'Advanced',
    items: [
      { name: 'Accordion', componentName: 'Accordion' },
      { name: 'Tabs', componentName: 'Tabs' },
      { name: 'Progress', componentName: 'Progress' },
      { name: 'Avatar', componentName: 'Avatar' },
      { name: 'Badge', componentName: 'Badge' },
      { name: 'Alert', componentName: 'Alert' }
    ]
  }
];

const UiComponentsSidebar: React.FC<UiComponentsSidebarProps> = ({ open, onClose }) => {
  const components = useComponents();

  if (!open) return null;

  // Helper function to render component examples
  const renderComponentExample = (name: string) => {
    switch (name) {
      case 'Button':
        return <components.Button>Button</components.Button>;
      case 'Text':
        return <span className="text-sm">Text component</span>;
      case 'Heading':
        return <h3 className="text-lg font-bold">Heading</h3>;
      case 'Paragraph':
        return <p className="text-sm">This is a paragraph of text that can wrap to multiple lines.</p>;
      case 'Input':
        return <components.Input placeholder="Input field" />;
      case 'Checkbox':
        return (
          <div className="flex items-center gap-2">
            <components.Checkbox id="checkbox" />
            <components.Label htmlFor="checkbox">Checkbox</components.Label>
          </div>
        );
      case 'Radio':
        return (
          <components.RadioGroup defaultValue="option-1">
            <div className="flex items-center space-x-2">
              <components.RadioGroupItem value="option-1" id="option-1" />
              <components.Label htmlFor="option-1">Radio</components.Label>
            </div>
          </components.RadioGroup>
        );
      case 'Dropdown':
        return (
          <select className="w-full rounded-md border border-input bg-background p-2">
            <option>Select an option</option>
          </select>
        );
      case 'Card':
        return (
          <components.Card className="w-full">
            <components.CardHeader>
              <components.CardTitle>Card Title</components.CardTitle>
              <components.CardDescription>Card description</components.CardDescription>
            </components.CardHeader>
            <components.CardContent>
              <p className="text-sm">Card content goes here</p>
            </components.CardContent>
          </components.Card>
        );
      case 'Divider':
        return <components.Separator className="my-2" />;
      case 'Accordion':
        return (
          <components.Accordion type="single" collapsible className="w-full">
            <components.AccordionItem value="item-1">
              <components.AccordionTrigger>Accordion</components.AccordionTrigger>
              <components.AccordionContent>Content here</components.AccordionContent>
            </components.AccordionItem>
          </components.Accordion>
        );
      case 'Tabs':
        return (
          <components.Tabs defaultValue="tab1" className="w-full">
            <components.TabsList className="grid w-full grid-cols-2">
              <components.TabsTrigger value="tab1">Tab 1</components.TabsTrigger>
              <components.TabsTrigger value="tab2">Tab 2</components.TabsTrigger>
            </components.TabsList>
          </components.Tabs>
        );
      case 'Progress':
        return <components.Progress value={66} className="w-full" />;
      case 'Avatar':
        return (
          <components.Avatar>
            <components.AvatarFallback>UI</components.AvatarFallback>
          </components.Avatar>
        );
      case 'Badge':
        return <components.Badge>Badge</components.Badge>;
      case 'Alert':
        return (
          <components.Alert>
            <components.AlertTitle>Alert</components.AlertTitle>
            <components.AlertDescription>Alert description here</components.AlertDescription>
          </components.Alert>
        );
      case 'Image':
        return (
          <div className="border border-border bg-muted h-20 w-full flex items-center justify-center rounded-md">
            <Image className="h-6 w-6 text-muted-foreground" />
          </div>
        );
      default:
        return <div>Component: {name}</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="absolute right-0 top-0 h-full w-80 bg-background shadow-lg flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-medium">UI Components</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-4">
            <Accordion type="multiple" className="w-full">
              {COMPONENT_CATEGORIES.map((category) => (
                <AccordionItem key={category.name} value={category.name}>
                  <AccordionTrigger>{category.name}</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 gap-4 p-1">
                      {category.items.map((item) => (
                        <div
                          key={item.name}
                          className="border rounded-lg p-3 cursor-pointer hover:bg-accent transition-colors"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {item.icon && <item.icon className="h-4 w-4" />}
                            <span className="font-medium text-sm">{item.name}</span>
                          </div>
                          <div className="mt-2">{renderComponentExample(item.name)}</div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default UiComponentsSidebar;
