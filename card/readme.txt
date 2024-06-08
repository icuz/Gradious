# Payment System

This project is a simple payment system implemented in JavaScript. It allows users to make payments using a credit/debit card.

## Classes

### Card

The base class for a card. It has the following properties:

- `cardNumber`: The card number.
- `cardHolderName`: The name of the card holder.

It also has a `displayDetails` method that displays the card details.

### CreditCard

A subclass of `Card` that represents a credit card. It has an additional `creditLimit` property.

## Functions

### makePaymentAndDisplayDetails

This function is used to make a payment and display the card details. It first checks if a card type has been selected. If not, it hides the payment details form and shows an alert. If a card type has been selected, it prevents the form submission, makes the payment, and displays the card details.

## Usage

To use this project, simply open the `index.html` file in your browser. Select a card type, and click the "Make Payment" button to make a payment and display the card details.