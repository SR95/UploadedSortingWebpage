function bubbleSort(inputArr, index, autoSort) {
  let len = inputArr.length;
  let swapped = false;

  // if autosort is enabled
  if (autoSort) {
    do {
      swapped = false;
      for (let i = 0; i < len; i++) {
        if (inputArr[i] > inputArr[i + 1]) {
          let tmp = inputArr[i];
          inputArr[i] = inputArr[i + 1];
          inputArr[i + 1] = tmp;
          swapped = true;
        }
      }
    } while (swapped);
  } else {
    if (inputArr[index] > inputArr[index + 1]) {
      let tmp = inputArr[index];
      inputArr[index] = inputArr[index + 1];
      inputArr[index + 1] = tmp;
      swapped = true;
    }
  }
  return {
    newArray: inputArr,
    done: !swapped
  };
}

export default bubbleSort;
