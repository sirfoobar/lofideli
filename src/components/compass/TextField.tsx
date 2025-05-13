
import styled from '@emotion/styled';
import { TextField as AriaTextField } from 'react-aria-components';

import { theme } from './theme';

export const TextField = styled(AriaTextField)`
  display: flex;
  flex-direction: column;
  gap: ${theme.space.space8};
`;
