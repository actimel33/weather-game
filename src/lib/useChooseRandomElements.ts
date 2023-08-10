const chooseRandomElements = <T>(arr: T[], numElements: number = 5): T[] => {
  if (numElements > arr.length) {
    throw new Error('Number of elements to choose is greater than array length.');
  }

  const randomElements: T[] = [];
  const arrCopy = [...arr]; // Создаем копию массива, чтобы не изменять исходный

  while (randomElements.length < numElements) {
    const randomIndex = Math.floor(Math.random() * arrCopy.length);
    randomElements.push(arrCopy.splice(randomIndex, 1)[0]);
  }

  return randomElements;
};

export default chooseRandomElements;
