import dotenv from "dotenv";
dotenv.config();

export const URLS = {
  BASE_URL: "https://www.saucedemo.com/",
  INVENTORY_URL: "https://www.saucedemo.com/inventory.html",
  CART_URL: "https://www.saucedemo.com/cart.html",
  CHECKOUT_ONE_URL: "https://www.saucedemo.com/checkout-step-one.html",
  CHECKOUT_TWO_URL: "https://www.saucedemo.com/checkout-step-two.html",
  CHECKOUT_COMPLETE_URL: "https://www.saucedemo.com/checkout-complete.html",
};
export const CREDENTIALS = {
  STANDARD_USER: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
};
