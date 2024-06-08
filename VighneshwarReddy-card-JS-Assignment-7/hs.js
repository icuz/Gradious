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
        } else {
            newNode.next = this.current.next;
            this.current.next = newNode;
            this.current = newNode;
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
}