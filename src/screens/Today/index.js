import React, {useEffect, useState} from 'react';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import dayjs from 'dayjs';

import {View, Text, SafeAreaView} from '@views';

import Todo from './components/Todo';
import {FlatList} from 'react-native';
import Header from './components/Header';
import Footer from './components/Footer';
import {useTasks} from './hooks';

const Today = () => {
  const [date, setDate] = useState(dayjs());
  const [copyButtonFocus, setCopyButtonFocus] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const user = firebase.auth().currentUser;
  const [{todos, title, subtitle, remainingTasks}, {create, remove, update}] =
    useTasks(user.uid, date);

  const onCheckedChange = (item, checked) => {
    update(item, {checked});
  };

  const nextDay = () => {
    setDate(date.add(1, 'day'));
  };

  const previousDay = () => {
    setDate(date.subtract(1, 'day'));
  };

  const handleLongPress = () => {
    if (date.isSame(dayjs(), 'day')) {
      const batch = firestore().batch();
      remainingTasks.forEach((task, i) => {
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
      onSave={(item, text) => {
        update(item, {title: text});
      }}
      onDelete={task => {
        const arrayIndex = todos.indexOf(task);
        if (arrayIndex > 0) {
          setEditingTaskId(todos[arrayIndex - 1].id);
        } else {
          setEditingTaskId(todos[arrayIndex + 1].id);
        }
        remove(task);
      }}
      editing={item.id === editingTaskId}
      setEditing={setEditingTaskId}
      newTask={async task => {
        const id = await create(task);
        // setEditingTaskId(id);
      }}
    />
  );

  return (
    <View bg="bgGrey" width="100%" height="100%">
      <SafeAreaView flex={1}>
        <View flex={1} p="m">
          <Header title={title} subtitle={subtitle} />
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
                {!!remainingTasks.length && (
                  <FlatList
                    data={remainingTasks}
                    keyExtractor={item => item.id}
                    renderItem={renderTask}
                  />
                )}

                <Text textAlign="center" p2 color="primary">
                  {remainingTasks.length ? 'Hold to copy' : 'No tasks to copy'}
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
