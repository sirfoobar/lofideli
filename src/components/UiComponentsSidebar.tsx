
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// Import example components from UI folder
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandInput, CommandList, CommandGroup, CommandItem } from "@/components/ui/command";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";

interface UiComponentsSidebarProps {
  open: boolean;
  onClose: () => void;
}

const UiComponentsSidebar: React.FC<UiComponentsSidebarProps> = ({ open, onClose }) => {
  return (
    <Drawer open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DrawerContent className="h-[90vh] max-h-[90vh]">
        <div className="mx-auto w-full max-w-4xl">
          <DrawerHeader>
            <DrawerTitle className="font-pacifico text-xl">LofiDeli UI Components</DrawerTitle>
            <DrawerDescription>Browse all available UI components</DrawerDescription>
            <DrawerClose className="absolute right-4 top-4" onClick={onClose}>
              <X className="h-4 w-4" />
            </DrawerClose>
          </DrawerHeader>
          <ScrollArea className="h-[70vh] px-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="buttons">
                <AccordionTrigger>Buttons</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-4">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="inputs">
                <AccordionTrigger>Inputs</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="Email" className="mt-1" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms">Accept terms</Label>
                    </div>
                    <RadioGroup defaultValue="option-one">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Label htmlFor="option-one">Option One</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label htmlFor="option-two">Option Two</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="cards">
                <AccordionTrigger>Cards</AccordionTrigger>
                <AccordionContent>
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle>Card Title</CardTitle>
                      <CardDescription>Card description</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Card content</p>
                    </CardContent>
                    <CardFooter>
                      <Button>Action</Button>
                    </CardFooter>
                  </Card>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="avatars">
                <AccordionTrigger>Avatars</AccordionTrigger>
                <AccordionContent>
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>LD</AvatarFallback>
                    </Avatar>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="badges">
                <AccordionTrigger>Badges</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-4">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="alerts">
                <AccordionTrigger>Alerts</AccordionTrigger>
                <AccordionContent>
                  <Alert>
                    <AlertTitle>Information</AlertTitle>
                    <AlertDescription>
                      This is a basic alert component that can be used to show messages.
                    </AlertDescription>
                  </Alert>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="calendar">
                <AccordionTrigger>Calendar</AccordionTrigger>
                <AccordionContent>
                  <Calendar mode="single" className="rounded-md border" />
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="sliders">
                <AccordionTrigger>Sliders</AccordionTrigger>
                <AccordionContent>
                  <div className="py-4">
                    <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="toggles">
                <AccordionTrigger>Toggles</AccordionTrigger>
                <AccordionContent>
                  <div className="flex gap-4">
                    <Toggle>Toggle</Toggle>
                    <Toggle pressed>Pressed</Toggle>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ScrollArea>
          <DrawerFooter>
            <Button variant="outline" onClick={onClose}>Close Sidebar</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default UiComponentsSidebar;
