import {View, Button} from 'react-native';
import React from 'react';
import {Navigation} from 'react-native-navigation';

const Onborading = props => {
  return (
    <View>
      <Button
        title="Login"
        onPress={() => {
          Navigation.push(props.componentId, {
            component: {
              name: 'Today',
            },
          });
        }}
      />
    </View>
  );
};

export default Onborading;
