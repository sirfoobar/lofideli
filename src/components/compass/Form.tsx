import styled from '@emotion/styled';
import {
  TextField as AriaTextField,
  Label as AriaLabel,
  FieldError as AriaFieldError,
  Text as AriaText,
  Form as AriaForm,
} from 'react-aria-components';

import { theme } from './theme';

export const Form = styled(AriaForm)`
  display: flex;
  flex-direction: column;
  gap: ${theme.space.space24};
`;

export const TextField = styled(AriaTextField)`
  display: flex;
  flex-direction: column;
  gap: ${theme.space.space8};
`;

export const Label = styled(AriaLabel)`
  color: ${theme.colors.n900};
  font-size: ${theme.fontSizes.fontsize16};
  font-weight: ${theme.fontWeights.medium};
  line-height: ${theme.lineHeights.lineheight24};
`;

export const FieldError = styled(AriaFieldError)`
  color: ${theme.colors.red500};
  font-size: ${theme.fontSizes.fontsize14};
  line-height: ${theme.lineHeights.lineheight20};
`;

export const HelperText = styled(AriaText)`
  color: ${theme.colors.n500};
  font-size: ${theme.fontSizes.fontsize14};
  line-height: ${theme.lineHeights.lineheight20};
`;
