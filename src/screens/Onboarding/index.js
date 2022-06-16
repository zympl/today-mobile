import {View, Button} from 'react-native';
import React from 'react';
import {Navigation} from 'react-native-navigation';

import {screenOptions} from '@screens';

const Onboarding = props => {
  return (
    <View style={{justifyContent: 'center', alignContent: 'center', flex: 1}}>
      <Button
        title="Login"
        onPress={() => {
          Navigation.push(props.componentId, {
            component: {
              name: 'Today',
              options: screenOptions,
            },
          });
        }}
      />
    </View>
  );
};

export default Onboarding;
