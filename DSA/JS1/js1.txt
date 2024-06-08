class LinkedSeq {
    constructor() {
        this.head = null;
        this.current = null;
        this.size = 0; // Number of elements in the sequence
    }

    start() {
        this.current = this.head;
    }

    isCurrent() {
        return this.current !== null;
    }

    advance() {
        if (!this.isCurrent()) {
            throw new Error("No current element to advance");
        }
        this.current = this.current.next;
    }

    removeCurrent() {
        if (!this.isCurrent()) {
            throw new Error("No current element to remove");
        }
        if (this.current === this.head) {
            this.head = this.current.next;
        } else {
            let prev = this.head;
            while (prev.next !== this.current) {
                prev = prev.next;
            }
            prev.next = this.current.next;
        }
        this.size--;
        this.current = this.current.next; // Move to the next element
    }

    addAfter(element) {
        const newNode = { data: element, next: null };
        if (this.head === null) {
            this.head = newNode;
            this.current = this.head;
        } else if (this.current) { // Ensure this.current is not null
            newNode.next = this.current.next;
            this.current.next = newNode;
            this.current = newNode;
        } else {
            throw new Error("No current element to add after");
        }
        this.size++;
    }

    addBefore(element) {
        const newNode = { data: element, next: null };
        if (this.head === null || this.current === this.head) {
            newNode.next = this.head;
            this.head = newNode;
            this.current = this.head;
        } else {
            let prev = this.head;
            while (prev.next !== this.current) {
                prev = prev.next;
            }
            newNode.next = this.current;
            prev.next = newNode;
        }
        this.size++;
    }

    getCurrent() {
        if (!this.isCurrent()) {
            throw new Error("No current element");
        }
        return this.current.data;
    }

    // Remove an element
    remove(value) {
        if (this.head === null) {
            return;
        }
        if (this.head.data === value) {
            this.head = this.head.next;
            this.size--;
            return;
        }
        let current = this.head;
        while (current.next !== null) {
            if (current.next.data === value) {
                current.next = current.next.next;
                this.size--;
                return;
            }
            current = current.next;
        }
    }

    // Print all items in the bag
    print() {
        let current = this.head;
        while (current !== null) {
            console.log(current.data);
            current = current.next;
        }
    }

    // Return the number of items in the bag
    getSize() {
        return this.size;
    }

    // Check if the linked list contains a value
    contains(value) {
        let current = this.head;
        while (current !== null) {
            if (current.data === value) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    // Search for an item based on its position in the bag
    searchByPosition(position) {
        if (position < 0 || position >= this.size) {
            throw new Error("Position out of range");
        }
        let current = this.head;
        for (let i = 0; i < position; i++) {
            current = current.next;
        }
        return current.data;
    }

    // Search for an item based on its data
    searchByData(value) {
        let current = this.head;
        while (current !== null) {
            if (current.data === value) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    // Return the number of times a value has repeated
    countOccurrences(value) {
        let count = 0;
        let current = this.head;
        while (current !== null) {
            if (current.data === value) {
                count++;
            }
            current = current.next;
        }
        return count;
    }

    // Return a random value from linked list
    grab() {
        if (this.size === 0) {
            throw new Error("No elements in the sequence");
        }
        let index = Math.floor(Math.random() * this.size);
        return this.searchByPosition(index);
    }

    // Remove the head node and copy its data to the node with the given value
    removeAndCopyHead(value) {
        if (this.head === null) {
            throw new Error("No elements in the sequence");
        }
        let headData = this.head.data;
        this.remove(value);
        this.start();
        this.addAfter(headData);
        return headData;
    }
}

// Example usage:
let seq = new LinkedSeq();
seq.addAfter(1);
seq.addAfter(2);
seq.addAfter(3);
seq.addAfter(2);

console.log("LinkedSeq contents:");
seq.start();
while (seq.isCurrent()) {
    console.log(seq.getCurrent());
    seq.advance();
}

console.log("LinkedSeq size:", seq.getSize());

console.log("Removing item 2");
seq.remove(2);

console.log("LinkedSeq contents after removal:");
seq.start();
while (seq.isCurrent()) {
    console.log(seq.getCurrent());
    seq.advance();
}

console.log("LinkedSeq size after removal:", seq.getSize());

console.log("Does LinkedSeq contain 2?", seq.contains(2));

console.log("Searching for item at position 2:", seq.searchByPosition(2));

console.log("Searching for item with data 2:", seq.searchByData(2));

console.log("Count of occurrences of '2':", seq.countOccurrences(2));

console.log("Grabbing a random item from the LinkedSeq:", seq.grab());

seq = new LinkedSeq();
seq.addAfter(1);
seq.addAfter(2);
seq.addAfter(3);

console.log("Before:");
seq.start();
while (seq.isCurrent()) {
    console.log(seq.getCurrent());
    seq.advance();
}

const removedValue = seq.removeAndCopyHead(3);
console.log("Removed value:", removedValue);

console.log("After:");
seq.start();
while (seq.isCurrent()) {
    console.log(seq.getCurrent());
    seq.advance();
}