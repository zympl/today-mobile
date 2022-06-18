import React from 'react';
import {useTheme} from 'styled-components/native';
import RemixIcon from 'react-native-remix-icon';
import dayjs from 'dayjs';

import {SafeAreaView, View, TouchableOpacity, Text} from '@views';

const Footer = ({
  date,
  handlePress,
  handleLongPress,
  setCopyButtonFocus,
  nextDay,
  previousDay,
}) => {
  const theme = useTheme();

  return (
    <SafeAreaView bg="white">
      <View
        height="xxl"
        width="100%"
        flexDirection="row"
        justifyContent="space-between">
        <TouchableOpacity
          height="xxl"
          width="xxl"
          justifyContent="center"
          onPress={previousDay}
          alignItems="center">
          <RemixIcon
            name="arrow-left-circle-line"
            size={24}
            color={theme.colors.textPlaceholder}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handlePress}
          onLongPress={handleLongPress}
          delayLongPress={1000}
          onPressIn={() => setCopyButtonFocus(true)}
          onPressOut={() => setCopyButtonFocus(false)}
          height="xxl"
          justifyContent="center"
          alignItems="center">
          <View flexDirection="row">
            <RemixIcon
              name={
                date.isSame(dayjs(), 'day')
                  ? 'file-copy-line'
                  : 'calendar-event-line'
              }
              size={16}
              color={theme.colors.textPlaceholder}
            />
            <Text ml="s" p2 color="textPlaceholder">
              {date.isSame(dayjs(), 'day')
                ? 'Copy remaining task from last day'
                : 'Today'}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          height="xxl"
          width="xxl"
          justifyContent="center"
          onPress={nextDay}
          disabled={date.isSame(dayjs(), 'day')}
          alignItems="center">
          <RemixIcon
            name="arrow-right-circle-line"
            size={24}
            color={theme.colors.textPlaceholder}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Footer;
