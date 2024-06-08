function Card (cardNumber, cardHolderName) {
    // Constructor for the base Card class
      this.cardNumber = cardNumber;
      this.cardHolderName = cardHolderName;
}

Card.prototype.displayDetails = function() {
  // Select the HTML elements
  var cardNumberElement = document.getElementById('cardNumber');
  var cardHolderNameElement = document.getElementById('cardHolderName');
  var cardBalanceElement = document.getElementById('cardBalance');

  // Displays the card details
  cardNumberElement.innerHTML = `${this.cardNumber}`;
  cardHolderNameElement.innerHTML = `${this.cardHolderName}`;
  cardBalanceElement.innerHTML = `${this.balance !== null && this.balance !== undefined ? this.balance : this.creditLimit}`;
}

var selectedCard = null;

// Function to make payment and display the details
function makePaymentAndDisplayDetails() {
  if(selectedCard === null) {
      var paymentDetails = document.querySelector('.payment-details');
      paymentDetails.style.display = 'none';
      alert('Please select a card type');
      return;
  }
  event.preventDefault();
  var amount = parseFloat(document.getElementById('amount').value);
  selectedCard.makePayment(amount);
  selectedCard.displayDetails();
}

// Subclass: CreditCard
function CreditCard (cardNumber, cardHolderName, creditLimit) {
  Card.call(this, cardNumber, cardHolderName);
  this.creditLimit = creditLimit;
}

CreditCard.prototype = Object.create(Card.prototype);
CreditCard.prototype.constructor = CreditCard;

CreditCard.prototype.makePayment = function(amount) {
  if(this.creditLimit >= amount) {
      this.creditLimit -= amount;
      console.log(`Payment of ${amount} made. Remaining credit limit: ${this.creditLimit}`);
      alert(`Payment of ${amount} made. Remaining credit limit: ${this.creditLimit}`);
  } else {
      console.log(`Insufficient credit limit. Payment of ${amount} not made.`);
      alert(`Insufficient credit limit. Payment of ${amount} not made.`);
  }
};

// Subclass: DebitCard
function DebitCard(cardNumber, cardHolderName, balance) {
  Card.call(this, cardNumber, cardHolderName);
  this.balance = balance;
}

DebitCard.prototype = Object.create(Card.prototype);
DebitCard.prototype.constructor = DebitCard;

DebitCard.prototype.makePayment = function(amount) {
  if(this.balance >= amount) {
      this.balance -= amount;
      console.log(`Payment of ${amount} made. Remaining balance: ${this.balance}`);
      alert(`Payment of ${amount} made. Remaining balance: ${this.balance}`);
  } else {
      console.log(`Insufficient balance. Payment of ${amount} not made.`);
      alert(`Insufficient balance. Payment of ${amount} not made.`);
  }
};

// Function to change the payment details form based on the card type
function changePaymentDetails(type) {
  var formTitle = document.querySelector('#paymentForm h2');
  var cardNumberInput = document.getElementById('cardNumberInput');
  var amountInput = document.getElementById('amount');
  var pinInput = document.getElementById('pinInput');

  if(type === 'Credit') {
      selectCard('credit');
      formTitle.textContent = 'Payment Form - Credit';
      cardNumberInput.placeholder = 'Enter credit card number';
      amountInput.placeholder = 'Enter credit amount';
      pinInput.placeholder = 'Enter credit pin';
  } else if(type === 'Debit') {
      selectCard('debit');
      formTitle.textContent = 'Payment Form - Debit';
      cardNumberInput.placeholder = 'Enter debit card number';
      amountInput.placeholder = 'Enter debit amount';
      pinInput.placeholder = 'Enter debit pin';
  }
  var payButton = document.getElementById('showPayButton');
  payButton.style.display = 'block';
}

// Prototype Inheritance

const creditCard = new CreditCard("1234 5678 9012", "Michael jordan", 10000);
const debitCard = new DebitCard("9876 5432 1098", "Michael jordan", 20000);

// Function to select the card type
function selectCard(cardType) {
  if (cardType === 'credit') {
      selectedCard = creditCard;
  } else if (cardType === 'debit') {
      selectedCard = debitCard;
  }else{
      selectedCard = null;
      alert('Please select a card type');
  }
  selectedCard.displayDetails();
}

// Function to show the payment form
function showPaymentForm() {
  var paymentDetails = document.querySelector('.payment-details');
  paymentDetails.style.display = 'block';
}
//input validation
var cardNumberInput = document.getElementById('cardNumberInput');
var amountInput = document.getElementById('amount');
var pinInput = document.getElementById('pinInput');
var payButton = document.getElementById('payButton');
var debitButton = document.getElementById('debitButton');
var creditButton = document.getElementById('creditButton');
var pinField = document.getElementById('pinInput');

//credit and debit PIN cant be same
debitButton.addEventListener('click', function() {
  pinField.value='';
});
creditButton.addEventListener('click', function() {
  pinField.value='';
});

//check if all inputs are filled
function checkInputs() {
  if (cardNumberInput.value && amountInput.value && pinInput.value) {
      payButton.disabled = false;
  } else {
      payButton.disabled = true;
  }
}
cardNumberInput.addEventListener('input', checkInputs);
amountInput.addEventListener('input', checkInputs);
pinInput.addEventListener('input', checkInputs);