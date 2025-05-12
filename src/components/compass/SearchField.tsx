import styled from '@emotion/styled';
import { SearchField as AriaSearchField } from 'react-aria-components';

import { theme } from '../theme';

import { InputGroup } from './Forms/Inputs';

export const SearchGroup = styled(InputGroup)`
  border-radius: ${theme.radii.circle};
  padding-left: ${theme.space.space16};
  width: 320px;
`;

export const SearchField = styled(AriaSearchField)`
  display: flex;
  flex-direction: column;
  gap: ${theme.space.space8};
`;

export const InlineSearchField = styled(AriaSearchField)`
  flex-grow: 1;
`;
