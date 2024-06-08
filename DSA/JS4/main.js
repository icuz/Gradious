function groupAnagrams(strs){
  const map=new Map();
  for (const str of strs){
    const key=str.split("").sort().join("");
    if(map.has(key)){
      map.get(key).push(str);
    }else{
      map.set(key,[str]);
    }
  }
  return Array.from(map.values());
}

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])); 
console.log(groupAnagrams(["listen", "silent", "hello", "world", "banana"])); 
console.log(groupAnagrams(["abcd", "dcba", "efgh", "ghfe", "ijkl", "lkji"])); 
console.log('---------------------------------------------------------------');
function findMaxLength(arr) {
  const countMap={ 0: -1 }; 
  let maxLength=0;
  let currentSum = 0;

  for (let i = 0; i < arr.length; i++) {
    currentSum += arr[i] === 1?1:-1;

    if (countMap.hasOwnProperty(currentSum)) {
      maxLength =Math.max(maxLength,i - countMap[currentSum]);
    } else {
      countMap[currentSum] = i;
    }
  }

  return maxLength;
}

console.log(findMaxLength([0, 1, 0, 1, 0, 0, 1, 1])); //8
console.log(findMaxLength([0, 1, 1, 0, 1, 1, 1, 0])); //4
console.log(findMaxLength([1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1])); //10
console.log('---------------------------------------------------------------');

function lengthOfLongestSubstring(s) {
  let longest = 0;
  let start = 0;
  const seen = {}; 

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (seen[char] !== undefined && seen[char] >= start) {
      start = Math.max(start, seen[char] + 1);
    }

    seen[char] = i;

    longest = Math.max(longest, i - start + 1);
  }

  return longest;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb")); // 1
console.log(lengthOfLongestSubstring("pwwkew")); // 3
console.log('---------------------------------------------------------------');

function subarraySum(nums, k) {
  const countMap = {0:1}; 
  let subarrayCount = 0;
  let currentSum = 0;

  for (const num of nums) {
    currentSum += num;

    if (countMap.hasOwnProperty(currentSum-k)) {
      subarrayCount += countMap[currentSum-k];
    }

    countMap[currentSum] = (countMap[currentSum] || 0)+1;
  }

  return subarrayCount;
}

console.log(subarraySum([1, 1, 1],2)); // 2
console.log(subarraySum([1, 2, 3],3)); // 2
console.log(subarraySum([-1, -1, 1],0)); //1
console.log('---------------------------------------------------------------');

function groupStrings(strings) {
  const groups = {};

  for (const str of strings) {
    const shift = (str.charCodeAt(0) - "a"+26) % 26;
    const key = str.split("").map((char) =>
        String.fromCharCode(((char.charCodeAt(0) - "a"+shift) % 26)+"a")
      ).join("");

    if (!groups[key]) {
      groups[key]=[];
    }
    groups[key].push(str);
  }

  return Object.values(groups);
}

console.log(groupStrings(["abc", "bcd", "acef", "xyz", "az", "ba", "a", "z"])); 
console.log(groupStrings(["aaa", "bbb", "ccc", "ddd"])); 
console.log(groupStrings(["abc", "def", "ghi", "jkl"])); 
console.log('---------------------------------------------------------------');
