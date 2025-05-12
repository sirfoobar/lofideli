import styled from '@emotion/styled';
import {
  Button as AriaButton,
  Select as AriaSelect,
  SelectValue as AriaSelectValue,
} from 'react-aria-components';

import { theme } from './theme';

export const SelectValue = styled(AriaSelectValue)`
  min-width: 0;
`;

export const Select = styled(AriaSelect)`
  display: flex;
  flex-direction: column;
  gap: ${theme.space.space8};

  &[data-invalid] > button {
    border-color: ${theme.colors.red500};
  }
`;

export const SelectButton = styled(AriaButton)`
  display: flex;
  flex-direction: row;
  gap: ${theme.space.space4};
  background: ${theme.colors.white};
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 40px;
  border: ${theme.borderWidths.regular} solid ${theme.colors.n80};
  padding: ${theme.space.space12} ${theme.space.space16} ${theme.space.space12}
    ${theme.space.space12};
  min-width: 200px;
  max-width: 560px;
  border-radius: ${theme.radii.field};
  outline: none;
  color: ${theme.colors.n900};

  &[data-disabled] {
    opacity: ${theme.opacity.semiOpaque};
    cursor: not-allowed;
  }

  &[data-hovered] {
    background: ${theme.colors.n60};
    border: ${theme.borderWidths.regular} solid ${theme.colors.n90};
  }

  &[data-focus-visible] {
    outline: ${theme.borderWidths.thick} solid ${theme.colors.blue400};
    outline-offset: ${theme.space.space2};
  }
`;
