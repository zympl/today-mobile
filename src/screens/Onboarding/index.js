import {Text, TouchableHighlight, View} from '@views';
import React from 'react';
import {Navigation} from 'react-native-navigation';

import {screenOptions} from '@screens';

import Header from './components/Header';
import GoogleLogo from '@assets/images/GoogleLogo';
import AppleLogo from '@assets/images/AppleLogo';
import theme from '@constants/theme';
import SocialButton from './components/SocialButton';

const Onboarding = props => {
  const login = () => {
    Navigation.push(props.componentId, {
      component: {
        name: 'Today',
        options: screenOptions,
      },
    });
  };

  return (
    <View flex={1} bg="bgGrey">
      <Header />
      <View
        flexDirection="row"
        flex={1}
        justifyContent="center"
        color="textPrimary"
        alignItems="center">
        <Text h2>Continue with</Text>
        <SocialButton mx="m" onPress={login}>
          <GoogleLogo />
        </SocialButton>
        <SocialButton onPress={login}>
          <AppleLogo />
        </SocialButton>
      </View>
      <View height="headerHeight" />
    </View>
  );
};

export default Onboarding;
