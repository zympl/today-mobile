import React from 'react';
import RemixIcon from 'react-native-remix-icon';
import {useTheme} from 'styled-components/native';

import {View, Text, SafeAreaView, TouchableOpacity} from '@views';

import Todo from './components/Todo';

const Today = () => {
  const theme = useTheme();
  const [todos, setTodos] = React.useState([
    {
      id: 1,
      title: 'Buy milk',
      checked: false,
    },
    {
      id: 2,
      title: 'Buy eggs',
      checked: false,
    },
    {
      id: 3,
      title: 'Buy bread',
      checked: false,
    },
    {
      id: 4,
      title: 'Buy milk',
      checked: false,
    },
  ]);

  const onCheckedChange = (item, checked) => {
    setTodos(todos.map(t => (t.id === item.id ? {...t, checked} : t)));
  };

  const onTextChange = (item, text) => {
    setTodos(
      todos.map(todo => (todo.id === item.id ? {...todo, title: text} : todo)),
    );
  };

  return (
    <View bg="bgGrey" width="100%" height="100%">
      <SafeAreaView flex={1}>
        <View flex={1} p="m">
          <View>
            <Text h1 color="textPrimary">
              Today
            </Text>
            <Text mt="-12px" h3 color="textPlaceholder">
              Jun 18, 2022
            </Text>
          </View>
          <View flex={1} mt="l">
            {todos.map(item => (
              <Todo
                key={item.id}
                item={item}
                onCheckedChange={onCheckedChange}
                onTextChange={onTextChange}
              />
            ))}
          </View>
        </View>
      </SafeAreaView>
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
            alignItems="center">
            <RemixIcon
              name="arrow-left-circle-line"
              size={24}
              color={theme.colors.textPlaceholder}
            />
          </TouchableOpacity>

          <TouchableOpacity
            height="xxl"
            justifyContent="center"
            alignItems="center">
            <View flexDirection="row">
              <RemixIcon
                name="file-copy-line"
                size={16}
                color={theme.colors.textPlaceholder}
              />
              <Text ml="s" p2 color="textPlaceholder">
                Copy remaining task from last day
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            height="xxl"
            width="xxl"
            justifyContent="center"
            alignItems="center">
            <RemixIcon
              name="arrow-right-circle-line"
              size={24}
              color={theme.colors.textPlaceholder}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Today;
