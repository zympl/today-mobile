import React from 'react';

import {TextInput, TouchableOpacity, View} from '@views';
import Checked from './Checked';
import Unchecked from './Unchecked';

const Todo = ({item, onCheckedChange, onTextChange}) => {
  return (
    <View flexDirection="row" alignItems="center" mb="s">
      <TouchableOpacity
        mr="m"
        onPress={() => onCheckedChange(item, !item.checked)}>
        {item.checked ? <Checked /> : <Unchecked />}
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
