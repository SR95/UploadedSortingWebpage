function insertionSort(inputArr, autoSort) {
  const len = inputArr.length;
  if (autoSort) {
    for (let i = 0; i < len; i++) {
      let el = inputArr[i];
      let j;

      for (j = i - 1; j >= 0 && inputArr[j] > el; j--) {
        inputArr[j + 1] = inputArr[j];
      }
      inputArr[j + 1] = el;
    }
    return inputArr;
  }
}

export default insertionSort;
