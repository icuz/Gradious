// 1. Concatenate two arrays and return the combined array
function arrConcat(arr1, arr2) {
    const newArr = [];
    for (let i = 0; i < arr1.length; i++) {
        newArr.push(arr1[i]);
    }
    for (let i = 0; i < arr2.length; i++) {
        newArr.push(arr2[i]);
    }
    return newArr;
}
const numbers = [1, 2, 3, 4, 5];
const fruits = ["apple", "banana", "orange"];
const combined = arrConcat(numbers,fruits);
console.log('1.the combined output is ->');
console.log(combined)
console.log("============================================================");

// 2. Get the index of the first occurrence of the specified value. If not found, return -1
function arrIndexOf(arr, value) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            return i;
        }
    }
    return -1;
}
const animals = ["lion", "elephant", "giraffe","lion"];
const indexOfOrange = arrIndexOf(animals, "orange");
console.log('2.Index of "orange" in animals array ->');
console.log(indexOfOrange);
const indexOfLion = arrIndexOf(animals, "lion");
console.log('-> Index of "lion" in animals array ->');
console.log(indexOfLion);

console.log("============================================================");

// 3. Join all elements into a string and return that string
function arrJoin(arr) {
    let str = "";
    for (let i = 0; i < arr.length; i++) {
        str += arr[i];
        if (i < arr.length - 1) {
            str += " ";
        }
    }
    return str;
}
const joinedAnimalsString = arrJoin(animals);
console.log('3.Joined string of animals ->');
console.log(joinedAnimalsString);
console.log("============================================================");

// 4. Get the index of the specified value. If not found, return -1. If multiple occurrences, return the index of the last occurrence.
function arrLastIndexOf(arr, value) {
    let lastIndex = -1;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            lastIndex = i;
        }
    }
    return lastIndex;
}
const lastIndexOflion = arrLastIndexOf(animals, "lion");
console.log('4.Last index of "lion" in animals array ->');
console.log(lastIndexOflion);
console.log("============================================================");

// 5. Add the value to the end of the array and return the length of the array
function arrPush(arr, value) {
    arr[arr.length] = value;
    return arr.length;
}
const newLengthFruits = arrPush(fruits, "pear");
console.log('5.New length of fruits after pushing "pear" ->');
console.log(newLengthFruits);
console.log('Updated fruits array ->');
console.log(fruits);
console.log("============================================================");

// 6. Remove the last element from an array and return that element.
function arrPop(arr) {
    if (arr.length === 0) {
        return undefined;
    }
    const lastElement = arr[arr.length - 1];
    arr.length--;
    return lastElement;
}
const poppedAnimal = arrPop(animals);
console.log('6.Popped element from animals array ->');
console.log(poppedAnimal);
console.log('Updated animals array ->');
console.log(animals);
console.log("============================================================");

// 7. Remove the first element from an array and return that element.
function arrShift(arr) {
    if (arr.length === 0) {
        return undefined;
    }
    const firstElement = arr[0];
    for (let i = 1; i < arr.length; i++) {
        arr[i - 1] = arr[i];
    }
    arr.length--;
    return firstElement;
}
const shiftedFruit = arrShift(fruits);
console.log('7.Shifted element from fruits array ->');
console.log(shiftedFruit);
console.log('Updated fruits array ->');
console.log(fruits);
console.log("============================================================");

// 8. Adds the value to the front of an array and returns the array's new length.
function arrUnshift(arr, value) {
    for (let i = arr.length - 1; i >= 0; i--) {
        arr[i + 1] = arr[i];
    }
    arr[0] = value;
    return arr.length;
}
const newLengthAfterUnshiftNumbers = arrUnshift(numbers, 0);
console.log('8.New length of numbers after unshifting 0 ->');
console.log(newLengthAfterUnshiftNumbers);
console.log('Updated numbers array ->');
console.log(numbers);
console.log("============================================================");

// 9. Sort the elements of an array in place and return the array.
function arrSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
const values =[0,4,6,3,5,2,9,8,1,7]
const sortedValues = arrSort(values);
console.log('9.Sorted values array ->');
console.log(sortedValues);
