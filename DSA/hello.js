function maximumRobots(chargeTimes, runningCosts, budget) {
  let n = chargeTimes.length;
  let maxConsecutive = 0;
  let sumRunningCosts = 0;
  let queue = []; // queue to keep track of maximum charging time

  let j = 0; // start of the sliding window
  for (let i = 0; i < n; i++) {
    // add the current robot's running cost to the total
    sumRunningCosts += runningCosts[i];

    while (queue.length && chargeTimes[i] > chargeTimes[queue[queue.length - 1]]) {
      queue.pop();
    }
    if (chargeTimes[i] + sumRunningCosts <= budget) {
      queue.push(i);
    }

    // if the total cost exceeds the budget, move the start of the sliding window
    while (chargeTimes[queue[0]] + (i - j + 1) * sumRunningCosts > budget) {
      sumRunningCosts -= runningCosts[j];
      if (queue[0] === j) queue.shift();
      j++;
    }

    // update the maximum number of consecutive robots
    if (chargeTimes[queue[0]] + (i - j + 1) * sumRunningCosts <= budget) {
      maxConsecutive = Math.max(maxConsecutive, i - j + 1);
    }
  }

  return maxConsecutive;
}

// Test case
const chargeTimes = [3, 6, 1, 3, 4];
const runningCosts = [2, 1, 3, 4, 5];
const budget = 25;

const chargeTimes1 = [3, 5, 2, 4];
const runningCosts1 = [4, 3, 2, 1];
const budget1 = 5;

const chargeTimes2 = [9, 2, 3, 4, 5];
const runningCosts2 = [5, 4, 3, 2, 1];
const budget2 = 307;

const result1 = maximumRobots(chargeTimes1, runningCosts1, budget1);
console.log(result1); // Output: 0
const result = maximumRobots(chargeTimes, runningCosts, budget);
console.log(result); // Output: 3
const result2 = maximumRobots(chargeTimes2, runningCosts2, budget2);
console.log(result2); // Output: 5