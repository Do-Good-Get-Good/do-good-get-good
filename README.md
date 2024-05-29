[![Unit tests](https://github.com/Do-Good-Get-Good/do-good-get-good/actions/workflows/autotests_branch.yml/badge.svg)](https://github.com/Do-Good-Get-Good/do-good-get-good/actions/workflows/autotests_branch.yml)

# Do Good Get Good

## A time reporting app from Technogarden

This app is a cross platform application built in React Native. Development focus on using as many built in components and existing libraries as possible. The instructions assumes you have some knowledge on how operating systems works with environment variables and such.

## Setting up the project

1. The source code is located in `./src`
2. You will need NodeJS from https://nodejs.org
3. You need Android Studio from https://developer.android.com/studio/
4. For **Windows** you need to add two environment variables
   1. You need to add `ANDROID_HOME` with the value for Android SDK Location. You find it in Android Studio Settings, `Appearance & Behavior -> System SEttings -> Android SDK`
      ![Android sdk](doc/images/android_sdk.png)
   2. You also need to add `JAVA_HOME` with the value for Android studio JRE, default is `C:\Program Files\Android\Android Studio\jre`
   3. Lastly you need to create a `local.properties` file and write the file-path to Android Studio SDKs i.e. `sdk.dir = C:\\Users\\<username>\\AppData\\Local\\Android\\Sdk`
5. For **MacOS** and **Linux** you need to add two environment variables
   1. First is `ANDROID_SDK` that is the same as `ANDROID_HOME` under **Windows**
   2. Second one is to Update `PATH` with Android Studio SDK Platform tools. Usually found in `/Users/<username>/Library/Android/sdk/platform-tools`
   3. Third, create a `local.properties` file in the root of the Android folder and write Android Studio SDKs file-path i.e. `sdk.dir = /Users/<name>/Library/Android/sdk`
6. After that go to the source code in a command line tool like powershell or bash and do `npm install`.
7. If you are running MacOS you also need to do the following for iOS to work:
   1. `cd ios`
   2. `bundle install`
   3. `bundle exec pod install`

### How to run the app

Stand in the root of the source code (`/src`).

First start the bundle server:
`npm run start`

Now open a new terminal or tab and run one of the following commands:

**Android:**

to run Dev
`react-native run-android --mode=devDebug --appIdSuffix=dev`or try this`npx react-native run-android --mode=devDebug --appIdSuffix=dev`
to run Prod `react-native run-android --mode=prodDebug` or try this`npx react-native run-android --mode=prodDebug`

Production build: `npx react-native run-android --variant=prodDebug`

**iOS:**

Development build: 
- `cd src`
- run `npx react-native start`
- select ios by pressing "i"
- open a new terminal and run `npx react-native run-ios --scheme DoGoodGetGoodDev` 

Production build: `npx react-native run-ios`

#### **Note that you need to have an Android emulator running before you run the _Android_ start command**

# Bundling / Compiling the app for Release

## Android

### To get an AAB file

Go to [GitHub Actions](https://github.com/Do-Good-Get-Good/do-good-get-good/actions/workflows/build_android_apk_test.yml) and start the `Build Android AAB` workflow.
When it's finished you'll be able to find the AAB on that workflow page under `Artifacts`.

### To get an APK file

Go to `src/` and run `npm install`
Go to `src/Android`
Run `./gradlew assembleProd`
Output will be in `src\android\app\build\outputs\apk\prod\release`


## Trouble shooting

### Android trouble

Try
```
cd android
./gradlew clean
./gradlew build
cd ..
to run Dev
`react-native run-android --mode=devDebug --appIdSuffix=dev` or try `npx react-native run-android --mode=devDebug --appIdSuffix=dev`to run Prod`react-native run-android --mode=prodDebug` 
or try `npx react-native run-android --mode=prodDebug`
```

### iOS trouble

Try
- `bundle install` This command installs all the required Ruby gems specified in the project's Gemfile. It ensures that your development environment has the necessary dependencies to run the project successfully. BUT first is good to run `gem update bundler` to ensure that your Bundler is up to date.
- sometimes help with `gem update --system`
- if it stay "Successfully launched the app on the simulator" but after that it's like it don't have connection to the simulator anymore, then probably it run Release mode. You can open Xcode Check in `Product -> Scheme -> Edit Scheme -> change to Debug mode`.
- sometimes it helps to open Xcode and build by pressing Command+B

# We who have worked with the project

## Authors

- Mattias Ahlström (_Mobile application developer_)
- Alona Kirichenko (_Mobile application developer_)
- Jimmy Merilainen (_Mobile application developer_)
- Kristoffer Johnsson (_Software tester_)
- Rebecka Eldén (_User eXperience_)

### Mentors

- Niklas Asp (_Developers and Testers_)
- Hannah Sundqvist (_UX_)

### Product Owner

- Carina Grip (_Office Manager Technogarden Göteborg_)

### Test

- `npm run test` to run all tests
- `npm run test` + test file name (Example: `npm run test SearchBarComponent.test.js`)
