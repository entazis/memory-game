# Memory Game

A Memory Game in React that allows users to match pairs of cards. The game has a timer and settings form and supports various optional features such as animations and restricted bad guesses.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Learn More](#learn-more)

## Installation

To install the project dependencies, run the following command:

```bash
npm ci
```

## Usage

To start the development server, run the following command:

```bash
npm start
```

Open http://localhost:3000 to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

To run the tests, run the following command:

```bash
npm test
```

To build the project, run the following command:

```bash
npm run build
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open http://localhost:3000 to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the build folder.\

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Project Structure
The project structure is as follows:


memory-game/\
├── public/\
│   ├── index.html\
│   └── ...\
├── src/\
│   ├── assets/\
│   ├── game/\
│   │   ├── card\
│   │   │   └── Card.tsx\
│   │   └── Cards.tsx\
│   ├── header\
│   │   ├── components\
│   │   │   ├── settings\
│   │   │   │   └── SettingsModal.tsx\
│   │   │   ├── Ended.tsx\
│   │   │   ├── Logo.tsx\
│   │   │   ├── Menu.tsx\
│   │   │   └── ScoreDisplay.tsx\
│   │   └── Header.tsx\
│   ├── store\
│   │   ├── hooks.tsx\
│   │   └── store.tsx\
│   ├── App.tsx\
│   ├── index.tsx\
│   └── ...\
├── package.json\
├── README.md\
└── tsconfig.json

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).
