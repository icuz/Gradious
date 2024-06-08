# Payment System

This project is a simple payment system implemented in JavaScript. It allows users to make payments using a credit/debit card.

## Classes

### Card

The base class for a card. It has the following properties:

- `cardNumber`: The card number.
- `cardHolderName`: The name of the card holder.

It also has a `displayDetails` method that displays the card details.
the displayDetails method is invoked when pressed the credit or debit button.

### CreditCard

A subclass of `Card` that represents a credit card. It has an additional `creditLimit` property.

## Functions

### makePaymentAndDisplayDetails

This function is used to make a payment and display the card details.
If a card type has been selected, it enables the form submission, makes the payment, and displays the card details.

## Usage

To use this project, simply open the `index.html` file in your browser. Select a card type, and click the "Make Payment" button to make a payment and display the card details.
* the PIN for transfer can be anthing except null. there is no PIN validation. same for the account number.

* the amount is deducted via showing a simple alert in browser.