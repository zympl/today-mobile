import React, {useEffect, useState} from 'react';
import RemixIcon from 'react-native-remix-icon';
import {useTheme} from 'styled-components/native';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import dayjs from 'dayjs';
import {Snackbar} from 'react-native-snackbar';

import {View, Text, SafeAreaView, TouchableOpacity} from '@views';

import Todo from './components/Todo';

const Today = () => {
  const theme = useTheme();
  const [date, setDate] = useState(dayjs());
  const [todos, setTodos] = useState([]);
  const [header, setHeader] = useState('Today');
  const [subtitle, setSubtitle] = useState(date.format('MMMM DD, YYYY'));
  const [copyButtonFocus, setCopyButtonFocus] = useState(false);

  const user = firebase.auth().currentUser;

  const createTask = async () => {
    try {
      firestore()
        .collection(user.uid)
        .doc('tasks')
        .collection(date.format('DD-MM-YYYY'))
        .add({title: '', checked: false});
    } catch (error) {
      console.error(error);
      Snackbar.show({
        text: 'Error creating task!',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  const updateTask = async (task, object) => {
    try {
      firestore()
        .collection(user.uid)
        .doc('tasks')
        .collection(date.format('DD-MM-YYYY'))
        .doc(task.id)
        .update(object);
    } catch (error) {
      console.error(error);
      Snackbar.show({
        text: 'Error updating task!',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  const deleteTask = async task => {
    if (todos.length === 1) {
      return;
    }
    try {
      firestore()
        .collection(user.uid)
        .doc('tasks')
        .collection(date.format('DD-MM-YYYY'))
        .doc(task.id)
        .delete();
    } catch (error) {
      console.error(error);
      Snackbar.show({
        text: 'Error deleting task!',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  useEffect(() => {
    // Change header & subtitle
    setSubtitle(date.format('MMMM DD, YYYY'));
    if (date.isSame(dayjs(), 'day')) {
      setHeader('Today');
    } else if (date.isSame(dayjs().subtract(1, 'day'), 'day')) {
      setHeader('Yesterday');
    } else if (date.isSame(dayjs(), 'week')) {
      setHeader(date.format('dddd'));
    } else {
      setHeader(date.format('MMMM DD, YYYY'));

      if (date.isSame(dayjs().subtract(1, 'week'), 'week')) {
        setSubtitle('Last week');
      } else if (date.isSame(dayjs(), 'month')) {
        setSubtitle('This month');
      } else if (date.isSame(dayjs().subtract(1, 'month'), 'month')) {
        setSubtitle('Last month');
      } else if (date.isSame(dayjs(), 'year')) {
        setSubtitle('This year');
      } else if (date.isSame(dayjs().subtract(1, 'year'), 'year')) {
        setSubtitle('Last year');
      } else {
        setSubtitle('');
      }
    }

    // Get data
    const subscriber = firestore()
      .collection(user.uid)
      .doc('tasks')
      .collection(date.format('DD-MM-YYYY'))
      .onSnapshot(snapshot => {
        if (snapshot.size === 0) {
          createTask();
        }

        const tasks = [];
        snapshot.forEach(doc => {
          tasks.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setTodos(tasks);
      });

    return subscriber;
  }, [date]);

  const onCheckedChange = (item, checked) => {
    updateTask(item, {checked});
  };

  const onTextChange = (item, text) => {
    updateTask(item, {title: text});
  };

  const nextDay = () => {
    if (date.isSame(dayjs(), 'day')) {
      return;
    }
    setDate(date.add(1, 'day'));
  };

  const previousDay = () => {
    setDate(date.subtract(1, 'day'));
  };

  const handleLongPress = () => {
    if (date.isSame(dayjs(), 'day')) {
      // Handle copy
    }
    setCopyButtonFocus(false);
  };

  const handlePress = () => {
    if (date.isSame(dayjs(), 'day')) {
      // Handle copy
    } else {
      setDate(dayjs());
    }
  };

  return (
    <View bg="bgGrey" width="100%" height="100%">
      <SafeAreaView flex={1}>
        <View flex={1} p="m">
          <View>
            <Text h1 color="textPrimary">
              {header}
            </Text>
            {!!subtitle && (
              <Text mt="-12px" h3 color="textPlaceholder">
                {subtitle}
              </Text>
            )}
          </View>
          <View flex={1} mt="l">
            {todos.map(item => (
              <Todo
                key={item.id}
                item={item}
                onCheckedChange={onCheckedChange}
                onTextChange={onTextChange}
                onDelete={deleteTask}
                newTask={createTask}
              />
            ))}

            {copyButtonFocus && date.isSame(dayjs(), 'day') && (
              <View
                p="s"
                mt="l"
                borderWidth="1px"
                borderColor="primary"
                borderStyle="dashed">
                {todos.map(item => (
                  <Todo key={item.id} item={item} />
                ))}

                <Text textAlign="center" p2 color="primary">
                  Hold to copy
                </Text>
              </View>
            )}
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
            delayLongPress={500}
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
    </View>
  );
};

export default Today;
