/// <reference types="vite/client" />

// Add type declarations for missing modules
declare module '@emotion/styled' {
  import styled from '@emotion/styled';
  export default styled;
  export * from '@emotion/styled';
}

declare module 'react-aria-components' {
  export * from 'react-aria-components';
}

declare module '@emotion/react' {
  export * from '@emotion/react';
}

// Declare type for whiteboard components
interface ComponentProperties {
  flowType?: string;
}
