import React, {useEffect, useState} from 'react';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import dayjs from 'dayjs';
import Snackbar from 'react-native-snackbar';

import {View, Text, SafeAreaView} from '@views';

import Todo from './components/Todo';
import {FlatList} from 'react-native';
import Header from './components/Header';
import Footer from './components/Footer';

const Today = () => {
  const [date, setDate] = useState(dayjs());
  const [todos, setTodos] = useState([]);
  const [header, setHeader] = useState('Today');
  const [subtitle, setSubtitle] = useState(date.format('MMMM DD, YYYY'));
  const [copyButtonFocus, setCopyButtonFocus] = useState(false);
  const [focusedTaskId, setFocusedTaskId] = useState(null);
  const [lastDaysIncompleteTasks, setLastDaysIncompleteTasks] = useState([]);

  const user = firebase.auth().currentUser;

  const generateTaskIndex = (task1, task2) => {
    if (!task1 && !task2) {
      return 0.1;
    }
    if (task1 && !task2) {
      return task1.index + 0.1;
    }
    if (task1 && task2) {
      return Math.random() * (task2.index - task1.index) + task1.index;
    }
  };

  const createTask = async task => {
    try {
      const index = generateTaskIndex(
        task,
        task && todos[todos.indexOf(task) + 1],
      );
      const created = await firestore()
        .collection(user.uid)
        .doc('tasks')
        .collection(date.format('DD-MM-YYYY'))
        .add({
          title: '',
          checked: false,
          index,
        });
      return created.id;
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
      await firestore()
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
      const arrayIndex = todos.indexOf(task);

      if (arrayIndex > 0) {
        setFocusedTaskId(todos[arrayIndex - 1].id);
      } else {
        setFocusedTaskId(todos[arrayIndex + 1].id);
      }

      await firestore()
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

  const fetchRemainingTasks = async () => {
    try {
      const remainingTasksSnapshot = await firestore()
        .collection(user.uid)
        .doc('tasks')
        .collection(date.subtract(1, 'day').format('DD-MM-YYYY'))
        .orderBy('index')
        .get();

      const remainingTasks = [];
      remainingTasksSnapshot.forEach(doc => {
        const data = doc.data();
        if (
          !data.checked &&
          data.title.trim() &&
          !todos.find(t => t.id === doc.id)
        ) {
          remainingTasks.push({...doc.data(), id: doc.id});
        }
      });
      setLastDaysIncompleteTasks(remainingTasks);
    } catch (error) {
      console.log('error:::', error);
      Snackbar.show({
        text: 'Error fetching remaining tasks!',
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
      .orderBy('index')
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

  useEffect(() => {
    // Get previous day incomplete tasks
    if (todos.length && date.isSame(dayjs(), 'day')) {
      fetchRemainingTasks();
    }
  }, [todos]);

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
      const batch = firestore().batch();
      lastDaysIncompleteTasks.forEach((task, i) => {
        batch.set(
          firestore()
            .collection(user.uid)
            .doc('tasks')
            .collection(date.format('DD-MM-YYYY'))
            .doc(task.id),
          {
            title: task.title,
            index: todos[todos.length - 1].index + i * 0.1,
            checked: false,
          },
        );
      });
      batch.commit();
    }
    setCopyButtonFocus(false);
  };

  const handlePress = () => {
    if (!date.isSame(dayjs(), 'day')) {
      setDate(dayjs());
    }
  };

  const renderTask = ({item}) => (
    <Todo
      key={item.id}
      item={item}
      onCheckedChange={onCheckedChange}
      onTextChange={onTextChange}
      onDelete={deleteTask}
      focused={item.id === focusedTaskId}
      newTask={async task => {
        const id = await createTask(task);
        setFocusedTaskId(id);
      }}
    />
  );

  return (
    <View bg="bgGrey" width="100%" height="100%">
      <SafeAreaView flex={1}>
        <View flex={1} p="m">
          <Header header={header} subtitle={subtitle} />
          <View flex={1} mt="l">
            <FlatList
              data={todos}
              keyExtractor={item => item.id}
              renderItem={renderTask}
            />

            {copyButtonFocus && date.isSame(dayjs(), 'day') && (
              <View
                p="s"
                mt="l"
                borderWidth="1px"
                borderColor="primary"
                borderStyle="dashed">
                {!!lastDaysIncompleteTasks.length && (
                  <FlatList
                    data={lastDaysIncompleteTasks}
                    keyExtractor={item => item.id}
                    renderItem={renderTask}
                  />
                )}

                <Text textAlign="center" p2 color="primary">
                  {lastDaysIncompleteTasks.length
                    ? 'Hold to copy'
                    : 'No tasks to copy'}
                </Text>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
      <Footer
        date={date}
        handlePress={handlePress}
        handleLongPress={handleLongPress}
        setCopyButtonFocus={setCopyButtonFocus}
        nextDay={nextDay}
        previousDay={previousDay}
      />
    </View>
  );
};

export default Today;
