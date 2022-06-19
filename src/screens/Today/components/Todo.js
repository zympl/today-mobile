import React, {useEffect, useRef, useState} from 'react';
import RemixIcon from 'react-native-remix-icon';

import {TextInput, TouchableOpacity, View} from '@views';
import {useTheme} from 'styled-components/native';

const Todo = ({
  item,
  onCheckedChange,
  onSave,
  onDelete,
  newTask,
  editing,
  setEditing,
}) => {
  const theme = useTheme();
  const [focus, setFocus] = useState(false);
  const inputRef = useRef(null);
  const [text, setText] = useState(item.title);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  useEffect(() => {
    if (focus) {
      setText(item.title);
    }
  }, [focus, item]);

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
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
          if (item.title !== text) {
            onSave(item, text);
          }
        }}
        onChangeText={text => {
          setText(text);
        }}
        scrollEnabled={false}
        p="s"
        fontSize="p1"
        value={focus ? text : item.title}
        multiline
        color={
          focus ? 'primary' : item.checked ? 'textPlaceholder' : 'textPrimary'
        }
        onKeyPress={({nativeEvent}) => {
          console.log('Pressed:', nativeEvent.key);
          if (nativeEvent.key === 'Backspace' && !text) {
            onDelete(item);
          }

          if (nativeEvent.key === 'Enter') {
            setText(text.substring(0, text.length - 1));
            newTask(item);
          }
        }}
      />
    </View>
  );
};

export default Todo;
