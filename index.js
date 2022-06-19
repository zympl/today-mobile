import {Navigation} from 'react-native-navigation';
import React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {firebase} from '@react-native-firebase/auth';

import {Onboarding, Today} from '@screens';
import {Theme} from '@components';
import {homeRoot, loginRoot} from '@constants/navigation';

GoogleSignin.configure({
  webClientId:
    '541837397965-rbh0p6gpd6ed0qqc29dp243cuhig8sks.apps.googleusercontent.com',
});

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

Navigation.events().registerAppLaunchedListener(async () => {
  const isSignedIn =
    (await GoogleSignin.isSignedIn()) && firebase.auth().currentUser;
  Navigation.setRoot(isSignedIn ? homeRoot : loginRoot);
});
