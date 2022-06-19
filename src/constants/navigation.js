export const screenOptions = {
  topBar: {
    visible: false,
  },
};

export const loginRoot = {
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

export const homeRoot = {
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
