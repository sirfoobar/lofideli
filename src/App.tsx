
import React from 'react';
import { ThemeProvider } from '@/context/theme-provider';
import { WhiteboardProvider } from '@/context/WhiteboardContext';
import { Toaster } from '@/components/ui/toaster';
import { ComponentsProvider } from '@/context/ComponentsProvider';
import WhiteboardCanvas from '@/components/WhiteboardCanvas';

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <ComponentsProvider>
        <WhiteboardProvider>
          <WhiteboardCanvas />
          <Toaster />
        </WhiteboardProvider>
      </ComponentsProvider>
    </ThemeProvider>
  );
};

export default App;
