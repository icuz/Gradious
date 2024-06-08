#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> arr;
    int num;

    std::cout << "Enter numbers separated by spaces, end with a non-integer character: ";

    while (std::cin >> num) {
        arr.push_back(num);
    }

    std::reverse(arr.begin(), arr.end());

    for (int i = 0; i < arr.size(); i++) {
        std::cout << arr[i] << ' ';
    }

    return 0;
}