import React from 'react';

import theme from '@constants/theme';
import {TouchableHighlight} from '@views';

const SocialButton = ({children, ...props}) => {
  return (
    <TouchableHighlight
      height="xxl"
      style={theme.shadow}
      width="xxl"
      bg="white"
      justifyContent="center"
      alignItems="center"
      borderRadius="m"
      {...props}>
      {children}
    </TouchableHighlight>
  );
};

export default SocialButton;
