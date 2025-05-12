import styled from '@emotion/styled';
import { Popover as AriaPopover } from 'react-aria-components';

import { theme } from './theme';

export const Popover = styled(AriaPopover)`
  &[data-trigger='ComboBox'] {
    margin-top: ${theme.space.space8};
    min-width: 240px;
    /* compensate for border and padding in trigger since var(--trigger-width) does not include them */
    margin-left: -13px;
    width: calc(var(--trigger-width) + 26px);
  }

  &[data-trigger='Select'] {
    min-width: 240px;
    width: var(--trigger-width);
  }
`;
