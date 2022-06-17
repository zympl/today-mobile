import React from 'react';
import {ThemeProvider} from 'styled-components/native';

import theme from '@constants/theme';

const Theme = props => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default Theme;
