
import React, { useState } from 'react';
import { ThemeProvider } from '@/context/theme-provider';
import { WhiteboardProvider } from '@/context/WhiteboardContext';
import { Toaster } from '@/components/ui/toaster';
import { ComponentsProvider } from '@/context/ComponentsProvider';
import WhiteboardCanvas from '@/components/WhiteboardCanvas';

const App: React.FC = () => {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <ComponentsProvider>
        <WhiteboardProvider>
          <div className="h-screen w-screen flex flex-col">
            <WhiteboardCanvas 
              onSelectComponent={setSelectedComponentId} 
              selectedComponentId={selectedComponentId}
              showGrid={showGrid}
            />
            <Toaster />
          </div>
        </WhiteboardProvider>
      </ComponentsProvider>
    </ThemeProvider>
  );
};

export default App;
