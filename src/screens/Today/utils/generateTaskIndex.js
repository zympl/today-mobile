export const generateTaskIndex = (task1, task2) => {
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
