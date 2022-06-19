import {useCallback, useEffect, useMemo, useState} from 'react';
import Snackbar from 'react-native-snackbar';
import firestore from '@react-native-firebase/firestore';
import dayjs from 'dayjs';
import {generateTaskIndex} from '../utils/generateTaskIndex';

const useTasks = (userId, date) => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [remainingTasks, setRemainingTasks] = useState([]);

  const [todayCollection, lastDayCollection] = useMemo(() => {
    const tasksDoc = firestore().collection(userId).doc('tasks');
    return [
      tasksDoc.collection(date.format('DD-MM-YYYY')),
      tasksDoc.collection(date.subtract(1, 'day').format('DD-MM-YYYY')),
    ];
  }, [userId, date]);

  const getTasks = useCallback(async () => {
    if (!date && !userId) {
      return;
    }

    try {
      const tasksSnapshot = await todayCollection.orderBy('index').get();

      const tasks = [];
      tasksSnapshot.forEach(doc => {
        tasks.push({...doc.data(), id: doc.id});
      });
      setTodos(tasks);
    } catch (error) {
      console.error('Error while fetching tasks:', error);
      Snackbar.show({
        text: 'Error fetching tasks!',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }, [todayCollection]);

  useEffect(() => {
    // Change header & subtitle
    setSubtitle(date.format('MMMM DD, YYYY'));
    if (date.isSame(dayjs(), 'day')) {
      setTitle('Today');
      setSubtitle(date.format('dddd - MMMM DD, YYYY'));
    } else if (date.isSame(dayjs().subtract(1, 'day'), 'day')) {
      setTitle('Yesterday');
      setSubtitle(date.format('dddd - MMMM DD, YYYY'));
    } else if (date.isSame(dayjs().add(1, 'day'), 'day')) {
      setTitle('Tomorrow');
      setSubtitle(date.format('dddd - MMMM DD, YYYY'));
    } else if (date.isSame(dayjs(), 'week')) {
      setTitle(date.format('dddd'));
    } else {
      setTitle(date.format('MMMM DD, YYYY'));

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

    getTasks();
  }, [date, getTasks]);

  useEffect(() => {
    getRemainingTasks();
  }, [todos]);

  const create = useCallback(
    async task => {
      try {
        const index = generateTaskIndex(
          task,
          task && todos[todos.indexOf(task) + 1],
        );
        const created = await todayCollection.add({
          title: '',
          checked: false,
          index,
        });

        setTodos(todos =>
          [...todos, {...task, id: created.id}].sort(
            (a, b) => a.index - b.index,
          ),
        );

        return created.id;
      } catch (error) {
        console.error('Error while creating task', error);
        Snackbar.show({
          text: 'Error creating task!',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    },
    [todayCollection, todos],
  );

  const update = useCallback(
    async (task, object) => {
      try {
        await todayCollection.doc(task.id).update(object);
        setTodos(todos => {
          const newTodos = [...todos];
          const index = newTodos.indexOf(task);
          newTodos[index] = {...newTodos[index], ...object};
          return newTodos;
        });
      } catch (error) {
        console.error('Error while updating task:', error);
        Snackbar.show({
          text: 'Error updating task!',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    },
    [todayCollection],
  );

  const remove = useCallback(
    async task => {
      if (todos.length === 1) {
        return;
      }
      try {
        const arrayIndex = todos.indexOf(task);
        await todayCollection.doc(task.id).delete();
        setTodos(todos => {
          const newTodos = [...todos];
          newTodos.splice(arrayIndex, 1);
          return newTodos;
        });
      } catch (error) {
        console.error('Error while delete task', error);
        Snackbar.show({
          text: 'Error deleting task!',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    },
    [todayCollection, todos],
  );

  const getRemainingTasks = useCallback(async () => {
    try {
      const remainingTasksSnapshot = await lastDayCollection
        .orderBy('index')
        .get();

      const remainingTasksArray = [];
      remainingTasksSnapshot.forEach(doc => {
        const data = doc.data();
        if (
          !data.checked &&
          data.title.trim() &&
          !todos.find(t => t.id === doc.id)
        ) {
          remainingTasksArray.push({...doc.data(), id: doc.id});
        }
      });
      setRemainingTasks(remainingTasksArray);
    } catch (error) {
      console.log('Error while fetching remaining tasks:', error);
      Snackbar.show({
        text: 'Error fetching remaining tasks!',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }, [lastDayCollection, todos]);

  return [
    {todos, title, subtitle, remainingTasks},
    {create, remove, update},
  ];
};

export default useTasks;
