[![CI](https://github.com/Do-Good-Get-Good/do-good-get-good/actions/workflows/autotests.yml/badge.svg?branch=main)](https://github.com/Do-Good-Get-Good/do-good-get-good/actions/workflows/autotests.yml)
# Do Good Get Good #
## A time reporting app from Technogarden ##

## Building the project ##
The app is a cross platform application built in react native. Development focus on using as many built in components and existing libraries as possible. The instructions assumes you have some knowledge how operating systems works with environment variables and such.
### How to run ###
1. The source code is located in `./src`
2. You will need NodeJS from https://nodejs.org
3. After installing Node you need to install expo. `npm install -g expo`
4. You need Android Studio from https://developer.android.com/studio/
5. For **Windows** you need to add two environment variables 
   1. You need to add `ANDROID_HOME` with the value for Android SDK Location. You find it in Android Studio Settings, `Appearance & Behavior -> System SEttings -> Android SDK`
   ![Android sdk](doc/images/android_sdk.png)
   2. You also need to add `JAVA_HOME` with the value for Android studio JRE, default is `C:\Program Files\Android\Android Studio\jre`
   3. Lastly you need to create a `local.properties` file and write the file-path to Android Studio SDKs i.e. `sdk.dir = C:\\Users\\<username>\\AppData\\Local\\Android\\Sdk`
6. For **MacOS** and **Linux** you need to add two environment variables
   1. First is `ANDROID_SDK` that is the same as `ANDROID_HOME` under **Windows**
   2. Second one is to Update `PATH` with Android Studio SDK Platform tools. Usually found in `/Users/<username>/Library/Android/sdk/platform-tools`
   3. Third, create a `local.properties` file in the root of the Android folder and write Android Studio SDKs file-path i.e. `sdk.dir = /Users/<name>/Library/Android/sdk`
7. After that go to the source code in a command line tool like powershell or bash and do `npm install`.
8. If you are running MacOS you need to go to the `ios` folder and runt `pod install`
9. You might need to install firestore manually with `npm add @react-native-firebase/firestore`
10. Standing in the root for the source code run:
    
    **Android:** 
    
    Development build: `npx react-native run-android --variant=devDebug --appIdSuffix=dev`
    
    Production build: `npx react-native run-android --variant=prodDebug`
    
    **iOS:** 
    
    Development build: `npx react-native run-ios --scheme "srcDev"`
    
    Production build: `npx react-native run-ios`

#### **Note that you need to have an Android emulator running before you run the _Android_ start command** ####

# Bundling / Compiling the app for Release

## Android

### To get and AAB file

Go to `src/` and run `npm install`
Go to `src/Android`
Run `./gradlew bundleProd`
Output will be in `src\android\app\build\outputs\bundle\prodRelease`

Alternative way:
`react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/`

### To get an APK file

Go to `src/` and run `npm install`
Go to `src/Android`
Run `./gradlew assembleProd`
Output will be in `src\android\app\build\outputs\apk\prod\release`

### To

Firebase emulator
=====


#### Trouble shooting ####
* **Android** trouble, try
```
cd android
./gradlew build
cd ..
npx react-native run-android
```

We who have worked with the project
===================================
## Authors ##
- Mattias Ahlström (_Mobile application developer_)
- Alona Kirichenko (_Mobile application developer_)
- Jimmy Merilainen (_Mobile application developer_)
- Kristoffer Johnsson (_Software tester_)
- Rebecka Eldén (_User eXperience_)

### Mentors ###
- Niklas Asp (_Developers and Testers_)
- Hannah Sundqvist (_UX_)

### Product Owner ###
- Carina Grip (_Office Manager Technogarden Göteborg_)
