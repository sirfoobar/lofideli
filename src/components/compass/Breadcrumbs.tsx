import styled from '@emotion/styled';
import {
  Breadcrumbs as AriaBreadcrumbs,
  Breadcrumb as AriaBreadcrumb,
} from 'react-aria-components';

import { theme } from './theme';

export const Breadcrumbs = styled(AriaBreadcrumbs)`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: ${theme.fontSizes.small};
  color: var(--text-color);
`;

export const Breadcrumb = styled(AriaBreadcrumb)`
  :not(:last-child)::after {
    content: '/';
    content: '/' / '';
    alt: ' ';
    padding: 0 5px;
  }
`;
