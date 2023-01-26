# Assessment

## Pre-requisites

1. [Node v19.4.0](https://nodejs.org/en/)
2. [Ruby 2.7.6](https://www.ruby-lang.org/en/)
3. [React Native](https://reactnative.dev/docs/environment-setup)
4. [Android Studio](https://developer.android.com/studio)
5. [Xcode](https://developer.apple.com/xcode/)

## Summary

Run the mobile application by following the guide below. User is able to

1. Search for GitHub profiles
2. Scroll through a user's audience (followers/following)

Functionalties covered are:

1. GitHub profile with Avatar, Username, Name, Description, Follower and Following Count.
2. A screen which displays the audience (followers/following)
3. The ability to navigate back
4. Skeleton Structure (Bonus)
5. Pull to refresh (Bonus)

Total time taken: 1 day, 8 hours, 56 minutes

Detailed estimation is provided in the `Timesheet.pdf` attached

## Installation

1. Clone the repository on your local machine

```shell
git clone https://github.com/mrarslanark/st-assessment
```

2. Navigate to the project directory

```shell
cd st-assessment
```

3. Install dependencies

```shell
npm install
```

4. Install Cocoapods dependencies (For Mac OS X users). For Apple Silicon Chip, kindly refer to the [React Native Environment Setup Documentation](https://reactnative.dev/docs/environment-setup#creating-a-new-application)

```shell
npx pod-install
```

5. Run the application

### Android

```shell
npm run android // Android
```

### iOS

```shell
npm run ios // iOS
```

### Both the platforms at once

```shell
npm run mobile // For both the platforms iOS & Android
```
