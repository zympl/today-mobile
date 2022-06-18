import React from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Platform} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {Navigation} from 'react-native-navigation';

import GoogleLogo from '@assets/images/GoogleLogo';
import AppleLogo from '@assets/images/AppleLogo';
import {Text, View} from '@views';
import {screenOptions} from '@screens';

import Header from './components/Header';
import SocialButton from './components/SocialButton';

const Onboarding = props => {
  const loginWithGoogle = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);

      Navigation.push(props.componentId, {
        component: {
          name: 'Today',
          options: screenOptions,
        },
      });
    } catch (error) {
      console.error(error);
      Snackbar.show({
        text: 'Error while signing in with Google!',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  const loginWithApple = () => {};

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
        <SocialButton mx="m" onPress={loginWithGoogle}>
          <GoogleLogo />
        </SocialButton>
        {Platform.OS === 'ios' && (
          <SocialButton onPress={loginWithApple}>
            <AppleLogo />
          </SocialButton>
        )}
      </View>
      <View height="headerHeight" />
    </View>
  );
};

export default Onboarding;
