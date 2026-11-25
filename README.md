# FITT Training App

FITT allows you to search for workout exercises by name and save them to your own training routine. User needs to create an account and log in to the app to be able to search exercises and add them to their routine. User can search exercises, read information about them and add them to their routine. The routine can be found from the My Routine tab, where exercises can also be removed. The same exercise can be added to the routine only once, and the app gives haptic feedback (vibration) when exercises are added or removed. Profile page shows the user's email address and a logout button. Firebase works as a database and app also uses Firebase Auth to authenticate user. Exercise data comes from the wger REST API.

## Features

- Create an account and log in with email and password
- Search exercises by name, results update while typing
- Exercise details: name, category and description
- Add exercises to your own routine (duplicates are prevented)
- My Routine list updates in real time and exercises can be removed from it
- Haptic feedback when adding, removing or trying to add a duplicate exercise
- Profile page with the logged-in user's email and logout

## Technologies

- [React Native](https://reactnative.dev/) and [Expo](https://expo.dev/) (SDK 58)
- [React Navigation](https://reactnavigation.org/): native stack and bottom tabs
- [Firebase Authentication](https://firebase.google.com/docs/auth): email and password login
- [Cloud Firestore](https://firebase.google.com/docs/firestore): stores each user's routine
- [wger REST API](https://wger.de/api/v2/): exercise data
- [expo-haptics](https://docs.expo.dev/versions/latest/sdk/haptics/): vibration feedback
- [@expo/vector-icons](https://icons.expo.fyi/): tab bar icons (Ionicons)

## Getting started

Requirements: [Node.js](https://nodejs.org/) and the Expo Go app on your phone, or an iOS simulator / Android emulator.

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go, or press `i` for the iOS simulator or `a` for the Android emulator.

## Project structure

```
FITT/
├── App.js                            # Navigation: stack + bottom tabs
└── src/
    ├── firebaseConfig.js             # Firebase app, Auth and Firestore
    └── screens/
        ├── LoginScreen.js            # Log in and create account
        ├── SearchScreen.js           # Fetch and search exercises (wger API)
        ├── ExerciseDetailsScreen.js  # Exercise info, add to routine
        ├── RoutineScreen.js          # User's routine, remove exercises
        └── ProfileScreen.js          # User email and logout
```

## Data model

Firestore collection `routines`, one document per saved exercise:

| Field      | Description                        |
|------------|------------------------------------|
| `userId`   | Firebase Auth uid of the owner     |
| `name`     | Exercise name                      |
| `category` | Exercise category (e.g. Chest)     |
