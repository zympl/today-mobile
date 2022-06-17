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
    <View flex={1}>
      <Header />
      <View
        flexDirection="row"
        bg="white"
        flex={1}
        justifyContent="center"
        alignItems="center">
        <Text h2>Continue with</Text>
        <SocialButton mx="m" onPress={login}>
          <GoogleLogo />
        </SocialButton>
        <SocialButton onPress={login}>
          <AppleLogo />
        </SocialButton>
      </View>
      <View height="headerHeight" bg="white" />
    </View>
  );
};

export default Onboarding;
