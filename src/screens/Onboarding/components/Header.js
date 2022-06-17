import {SafeAreaView, View} from '@views';
import React from 'react';

import TodayLogo from '@assets/images/TodayLogo';
import theme from '@constants/theme';

const Header = props => {
  return (
    <SafeAreaView bg="white" style={theme.shadow}>
      <View
        width="100%"
        height="headerHeight"
        justifyContent="center"
        alignItems="center">
        <TodayLogo />
      </View>
    </SafeAreaView>
  );
};

export default Header;
