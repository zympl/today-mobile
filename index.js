import {Navigation} from 'react-native-navigation';
import React from 'react';

import {Onboarding, screenOptions, Today} from '@screens';
import {Theme} from '@components';

Navigation.registerComponent('Onboarding', () => props => (
  <Theme>
    <Onboarding {...props} />
  </Theme>
));
Navigation.registerComponent('Today', () => props => (
  <Theme>
    <Today {...props} />
  </Theme>
));

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Onboarding',
              options: screenOptions,
            },
          },
        ],
      },
    },
  });
});
