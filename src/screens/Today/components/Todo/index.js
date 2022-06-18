import React, {useEffect, useRef, useState} from 'react';
import RemixIcon from 'react-native-remix-icon';

import {TextInput, TouchableOpacity, View} from '@views';
import {useTheme} from 'styled-components/native';

const Todo = ({
  item,
  onCheckedChange,
  onTextChange,
  onDelete,
  newTask,
  focused,
}) => {
  const theme = useTheme();
  const [focus, setFocus] = useState(false);
  const stopPropagation = useRef(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (focused) {
      inputRef.current.focus();
    }
  }, [focused]);

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
        ref={inputRef}
        flex={1}
        placeholder="Add a task"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        scrollEnabled={false}
        onChangeText={text => {
          if (!stopPropagation.current) {
            onTextChange(item, text);
          }
        }}
        p="s"
        fontSize="p1"
        value={item.title}
        multiline
        color={
          focus ? 'primary' : item.checked ? 'textPlaceholder' : 'textPrimary'
        }
        onKeyPress={({nativeEvent}) => {
          stopPropagation.current = false;
          if (nativeEvent.key === 'Backspace' && !item.title) {
            onDelete(item);
          }

          if (nativeEvent.key === 'Enter') {
            stopPropagation.current = true;
            newTask(item);
          }
        }}
      />
    </View>
  );
};

export default Todo;
