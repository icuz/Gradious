class Stack {
    constructor() {
      this.items = [];
    }
  
    // Push
    push(element) {
      this.items.push(element);
    }
  
    // Pop
    pop() {
      if (this.isEmpty()) {
        return "Underflow";
      }
      return this.items.pop();
    }
  
    // Peek
    peek() {
      return this.items[this.items.length - 1];
    }
  
    // Check if the stack is empty
    isEmpty() {
      return this.items.length === 0;
    }
  
    // Get the size of the stack
    size() {
      return this.items.length;
    }
  
    // Clear the stack
    clear() {
      this.items = [];
    }
  
    // Print the stack elements
    printStack() {
      let str = "";
      for (let i = 0; i < this.items.length; i++) {
        str += this.items[i] + " ";
      }
      return str.trim(); // Remove trailing space
    }
  
    // Check if parentheses, braces, and brackets are balanced
    isBalanced(expression) {
      const openingSymbols = "([{";
      const closingSymbols = ")]}";
      const stack = new Stack();
  
      for (let i = 0; i < expression.length; i++) {
        let char = expression[i];
        if (openingSymbols.includes(char)) {
          stack.push(char);
        } else if (closingSymbols.includes(char)) {
          if (stack.isEmpty()) {
            return false;
          }
          let top = stack.pop();
          if (closingSymbols.indexOf(char) !== openingSymbols.indexOf(top)) {
            return false; // Mismatched symbols
          }
        }
      }
  
      return stack.isEmpty(); // All symbols matched if stack is empty
    }
    // Convert an infix expression to postfix using a stack
    convertInfixToPostfix(expression) {
      const operators = "+-*/";
      const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };
      const stack = new Stack();
      let postfix = "";

      for (let char of expression) {
        if (char === "(") {
          stack.push(char);
        } else if (char === ")") {
          while (stack.peek() !== "(") {
            postfix += stack.pop();
          }
          stack.pop(); // Remove the "("
        } else if (operators.includes(char)) {
          while (!stack.isEmpty() && precedence[char] <= precedence[stack.peek()]) {
            postfix += stack.pop();
          }
          stack.push(char);
        } else {
          postfix += char;
        }
      }

      while (!stack.isEmpty()) {
        postfix += stack.pop();
      }

      return postfix;
    }
  }
  
// Create a new stack instance
const stack = new Stack();

// Test stack operations
console.log(stack.isEmpty());      // true
stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.printStack());  // 10 20 30
console.log(stack.peek());        // 30
console.log(stack.size());        // 3
console.log(stack.pop());         // 30
console.log(stack.printStack());  // 10 20

// Test balanced expression check
console.log(stack.isBalanced("{[(])}"));   // false
console.log(stack.isBalanced("{[()]}"));   // true

// Test postfix expression evaluation and conversion back to postfix

const input2 = "2+3*4";
const postfix2 = stack.convertInfixToPostfix(input2);
console.log(`${input2} is converted to ${postfix2}`); //234*+
console.log(" ");
const input3 = "3+5*2";
const postfix3 = stack.convertInfixToPostfix(input3);
console.log(`${input3} is converted to ${postfix3}`); //352*+
console.log(" ");
const input4 = "3*(4+5)";
const postfix4 = stack.convertInfixToPostfix(input4);
console.log(`${input4} is converted to ${postfix4}`); //345+* 
