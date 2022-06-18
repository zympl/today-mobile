import {Navigation} from 'react-native-navigation';
import React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '541837397965-rbh0p6gpd6ed0qqc29dp243cuhig8sks.apps.googleusercontent.com',
});

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

const loginRoot = {
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
};

const homeRoot = {
  root: {
    stack: {
      children: [
        {
          component: {
            name: 'Today',
            options: screenOptions,
          },
        },
      ],
    },
  },
};

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot((await GoogleSignin.isSignedIn()) ? homeRoot : loginRoot);
});
