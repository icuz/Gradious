function fourSumCount(A, B, C, D) {
  const map = new Map();
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < B.length; j++) {
      const sum = A[i] + B[j];
      map.set(sum, (map.get(sum) || 0) + 1);
    }
  }

  let count = 0;
  for (let k = 0; k < C.length; k++) {
    for (let l = 0; l < D.length; l++) {
      const target = -(C[k] + D[l]);
      if (map.has(target)) {
        count += map.get(target);
      }
    }
  }

  return count;
}
console.log(fourSumCount([1, 2], [-2, -1], [-1, 2], [0, 2])); // 2
console.log(fourSumCount([0, 0], [0, 0], [0, 0], [0, 0])); // 16
console.log(fourSumCount([-1, -1], [-1,1], [-1,1], [1, -1])); // 6
console.log('---------------------------------------------------------------');

function lengthOfLongestSubstringKDistinct(s, k) {
  let maxLength = 0;
  let left = 0;
  const map = new Map();

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    map.set(char, (map.get(char) || 0) + 1);

    while (map.size > k) {
      const leftChar = s[left];
      map.set(leftChar, map.get(leftChar) - 1);
      if (map.get(leftChar) === 0) {
        map.delete(leftChar);
      }
      left++;
    }

    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
console.log(lengthOfLongestSubstringKDistinct("eceba", 2)); // 3
console.log(lengthOfLongestSubstringKDistinct("aa", 1)); // 2
console.log(lengthOfLongestSubstringKDistinct("abaccc", 2)); // 4
console.log('---------------------------------------------------------------');

function minWindow(s, t) {
  let tFreq = {}; 
  for (let char of t) {
    tFreq[char] = (tFreq[char] || 0) + 1;
  }

  let left = 0;
  let minLen = Infinity;
  let minWindow = "";
  let count = 0;

  for (let right = 0; right < s.length; right++) {
    let char = s[right];
    if (char in tFreq) {
      tFreq[char]--;
      if (tFreq[char] >= 0) {
        count++;
      }
      while (count === t.length) {
        if (right - left + 1 < minLen) {
          minLen = right - left + 1;
          minWindow = s.substring(left, right + 1);
        }
        let leftChar = s[left];
        if (leftChar in tFreq) {
          tFreq[leftChar]++;
          if (tFreq[leftChar] > 0) {
            count--;
          }
        }
        left++;
      }
    }
  }
  return minWindow;
}

// Example usage:
console.log(minWindow("ADOBECODEBANC", "ABC")); //"BANC"
console.log(minWindow("a", "a")); //"a"
console.log(minWindow("aa", "aa")); //"aa"
console.log('---------------------------------------------------------------');
function topKFrequent(nums, k) {
    const freqMap = new Map();
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    const sortedNums = [...freqMap.keys()].sort((a, b) => freqMap.get(b) - freqMap.get(a));

    return sortedNums.slice(0, k);
}

// Example usage:
console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2)); //[1, 2]
console.log(topKFrequent([1], 1)); //[1]
console.log(topKFrequent([4, 1, -1, 2, -1, 2, 3], 2)); //[-1, 2]
console.log('---------------------------------------------------------------');
