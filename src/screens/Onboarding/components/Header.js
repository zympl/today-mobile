import {SafeAreaView, View} from '@views';
import React from 'react';
import {StyleSheet} from 'react-native';

import TodayLogo from '@assets/images/TodayLogo';

const style = StyleSheet.create({
  header: {
    shadowColor: '#494949',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    zIndex: 999,
    elevation: 5,
  },
});

const Header = props => {
  return (
    <SafeAreaView bg="white" style={style.header}>
      <View
        width="100%"
        height="56px"
        justifyContent="center"
        alignItems="center">
        <TodayLogo />
      </View>
    </SafeAreaView>
  );
};

export default Header;
