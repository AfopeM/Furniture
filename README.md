## Furniture E-Commerce Website

Welcome to the documentation for the Furniture E-Commerce website, a platform dedicated to selling luxurious furniture. This README will provide an in-depth overview of the project, its features, and how I completed it.

**Live Site:** [Furniture](https://furniturex.netlify.app/)

## Introduction

The Furniture E-Commerce website was designed to offer an elegant and seamless shopping experience for customers looking to purchase high-end furniture. It leverages modern web development technologies and APIs to provide a smooth user interface.

## ScreenShot

![Home_Screenshot](/public/screenshot.png)

## Features

- **Complete Purchase**
  Customers can now complete their purchase by providing payment information and shipping details in the checkout process. We use the Stripe API to securely handle payments. Once the payment is successful, the order is confirmed, and the customer is re-directed to successful purchase page displaying the products they purchased and other relevant details.

- **Fetching Product Information**
  The website fetches product information from the [Stripe API](https://stripe.com/en-ca). This means that product details, images, prices, and availability are always up-to-date.

- **Local Storage with Zustand**
  To provide a persistent shopping cart experience, I use Zustand to manage the cart's state. This state management library stores the cart data in local storage, ensuring that the cart contents persist even when users close or refresh the browser.

- **Cart Functionality**
  Customers can add and remove products from their shopping cart. Allowing users to review their selections and proceed to checkout when they are ready to make a purchase.

- **Display Related Products**
  A products page related products are fetched from the Stripe API based on the category or characteristics of the currently viewed product.

- **Smooth Page-to-Page Transition with Next.js**
  I've implemented the website using Next.js, a React framework. This ensures fast and smooth page transitions because the routing is handled seamlessly, making navigation throughout the website feel natural.

## Techologies Used

- [Tailwind](https://tailwindcss.com/)
- [React](https://react.dev/)
- [Next.js](https://nextjs.org/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Stripe API](https://stripe.com/en-ca)
