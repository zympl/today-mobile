import React from 'react';

import {Text, View} from '@views';

const Header = ({title, subtitle}) => {
  return (
    <View>
      <Text h1 color="textPrimary">
        {title}
      </Text>
      {!!subtitle && (
        <Text mt="-12px" h3 color="textPlaceholder">
          {subtitle}
        </Text>
      )}
    </View>
  );
};

export default Header;
