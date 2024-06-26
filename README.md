# Welcome to your Leaderboard app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Overview

This Leaderboard project is a mobile application built using React Native and Expo that displays a ranked list of users based on the number of bananas they have. Users can search for a specific username to see their ranking and compare it with others. The application is designed with a user-friendly interface, offering various sorting and searching options to enhance user experience.

## Features

- **Top 10 List:** Renders a list of the top 10 users with the most bananas.
- **User Highlighting:** Highlights the searched user in the list if they are within the top 10.
- **Error Handling:** Displays an error message if the searched user does not exist.
- **Dynamic Ranking:** If the searched user is not in the top 10 but has enough bananas to appear, they are included, replacing the last rank in the top 10 list.
- **Sorting Options:** Allows sorting the list by name or rank.
- **Lowest Ranked Users:** Provides an option to view the lowest-ranked users, with ties broken alphabetically.
- **Fuzzy Search:** Implements a fuzzy search feature, allowing users to search by partial names and showing matching usernames sorted by highest to lowest rank.

## Get started

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install dependencies

   ```bash
   yarn
   ```

4. Start the app

   ```bash
    yarn start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Testing

The app uses Jest as its testing framework. To run the tests, you can run `yarn test` in your terminal. You can also run `yarn test --watchAll` to run the tests in watch mode.

## Linting

The app uses ESLint as its linter. To lint the codebase, you can run `yarn lint` in your terminal. You can also run `yarn lint-fix` to automatically fix any linting errors.

## Pre-Commit Hooks

The app uses Husky and lint-staged to run pre-commit hooks. This ensures that code is properly formatted and linted before it is committed to the repository.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
