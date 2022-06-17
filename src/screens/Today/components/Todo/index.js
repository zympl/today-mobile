import React from 'react';
import RemixIcon from 'react-native-remix-icon';

import {TextInput, TouchableOpacity, View} from '@views';
import {useTheme} from 'styled-components/native';

const Todo = ({item, onCheckedChange, onTextChange}) => {
  const theme = useTheme();

  return (
    <View flexDirection="row" alignItems="center" mb="s">
      <TouchableOpacity
        mr="s"
        onPress={() => onCheckedChange(item, !item.checked)}>
        {item.checked ? (
          <RemixIcon
            name="checkbox-blank-circle-fill"
            color={theme.colors.textPlaceholder}
            size={24}
          />
        ) : (
          <RemixIcon
            name="checkbox-blank-circle-line"
            color={theme.colors.textPrimary}
            size={24}
          />
        )}
      </TouchableOpacity>
      <TextInput
        flex={1}
        onChangeText={text => onTextChange(item, text)}
        p="s"
        fontSize="p1"
        value={item.title}
        color={item.checked ? 'textPlaceholder' : 'textPrimary'}
      />
    </View>
  );
};

export default Todo;
