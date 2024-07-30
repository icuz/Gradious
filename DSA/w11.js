function maxActivities(activities) {
    // Sort activities by end time
    activities.sort((a, b) => a[1] - b[1]);

    let lastEndTime = -1;
    let count = 0;

    for (let i = 0; i < activities.length; i++) {
        // If the start time of the current activity is greater than the end time of the last selected activity
        if (activities[i][0] >= lastEndTime) {
            lastEndTime = activities[i][1]; // Update the end time
            count++; // Increase the count of selected activities
        }
    }
    return count;
}
const activities =  [[1, 4], [3, 5], [0, 6], [5, 7], [8, 9]];
console.log(maxActivities(activities)); // Output: 3
