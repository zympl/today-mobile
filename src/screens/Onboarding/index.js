import {SafeAreaView, Text, View} from '@views';
import React from 'react';
import {Navigation} from 'react-native-navigation';

import {screenOptions} from '@screens';

import Header from './components/Header';

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
      <View bg="white" flex={1} justifyContent="center" alignItems="center">
        <Text>Continue with</Text>
      </View>
    </View>
  );
};

export default Onboarding;
