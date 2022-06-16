import {Navigation} from 'react-native-navigation';

import {Onboarding, screenOptions, Today} from '@screens';

Navigation.registerComponent('Onboarding', () => Onboarding);
Navigation.registerComponent('Today', () => Today);

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
