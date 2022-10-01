# <img src="https://playwright.dev/img/playwright-logo.svg" width="100" height="100"> Front-End Automation using Playwright
## Version
1.0 

## Introduction

The purpose of this project is to provide a template ready to start the Playwright Wizeline Testing Days Challenge to perform Front-End testing with TypeScript.

###### Coverage
This project covers the following scenarios and practices:

###### Automation
1. Login using a standard user credentials.
2. Login using a fake user credentials. 
3. Order products by ascending price.
4. Add the two cheapest products to the cart and check that everything is added correctly.
5. Complete a purchase.

## Tech Stack
- Playwright
- TypeScript

## Project Structure
```
│   ├── data                # Data provider files.
│   ├── pages               # Page Objects.
│   └── tests               # Front-End Tests are located here.
└── .gitignore
└── README.md
└── package-lock.json
└── package.json
└── playwright.config.ts
└── .env
```

## Pre-requisites

1. [Node.js](https://nodejs.org/en/download/) (latest version).
2. [VSCode](https://code.visualstudio.com/download) (highly recommended).
3. [Playwright Test for VSCode Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) (highly recommended).


## Project Setup

1. Clone this repository.
2. Navigate to the project folder using the terminal.
3. Run the ```npm install``` command.
4. Create a .env file at root level with the following variables:
```
USERNAME='standard_user'
PASSWORD='secret_sauce'
```


## Dependencies
- @playwright/test
- dotenv

