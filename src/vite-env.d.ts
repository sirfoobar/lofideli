
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
