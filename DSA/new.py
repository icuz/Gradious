def reverse_array(arr):
    return arr[::-1]

arr = list(map(int, input("Enter numbers separated by spaces: ").split()))



#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    vector<int> arr;
    int num;


    while (cin >> num) {
        arr.push_back(num);
    }

    reverse(arr.begin(), arr.end());

    for (int i = 0; i < arr.size(); i++) {
        cout << arr[i] << ' ';
    }

    return 0;
}