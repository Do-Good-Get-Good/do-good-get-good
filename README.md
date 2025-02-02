[![Unit tests](https://github.com/Do-Good-Get-Good/do-good-get-good/actions/workflows/autotests_branch.yml/badge.svg)](https://github.com/Do-Good-Get-Good/do-good-get-good/actions/workflows/autotests_branch.yml)

# Do Good Get Good

## A time reporting app from Technogarden

This app is a cross platform application built in React Native. Development focus on using as many built in components and existing libraries as possible. The instructions assumes you have some knowledge on how operating systems works with environment variables and such.

## Important folders

**/functions**  
Firebase Cloud Functions

**/src**  
Frontend code

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
8. Go to your user folder, here you should find a folder called `.gradle`, go into it.  
   Create a `gradle.properties` file and add the following:
   ```
   DO_GOOD_GET_GOOD_STORE_FILE=''
   DO_GOOD_GET_GOOD_KEY_ALIAS=''
   DO_GOOD_GET_GOOD_STORE_PASSWORD=''
   DO_GOOD_GET_GOOD_KEY_PASSWORD=''
   ```

### How to run the app

Open a terminal and stand in the root of the source code (`/src`).  
Now run one of the following commands:

**Android:**

Development build:  
`npm run android`

Production build:  
`npm run android-prod`

**iOS:**

Development build:  
`npm run ios`

Production build:  
`npm run ios-prod`

#### **Note that you need to have an Android emulator running before you run the _Android_ start command**

## Bundling / Compiling the app for Release

### Android

1. Go to .env, .env.dev, .env.prod and change the **APP_VERSION** and **RELEASE_NUMBER**.
(**RELEASE_NUMBER** have to be **int**)
2. Create a PR and merge your changes main.
3. Run one of the following pipelines bellow.

#### To get an AAB file

Run this [build android release AAB pipeline](https://github.com/Do-Good-Get-Good/do-good-get-good/actions/workflows/build_android_release_aab.yml).  
When it's finished you'll find the AAB on that workflow page under `Artifacts`.

#### To get an APK file

Run this [build android release APK pipeline](https://github.com/Do-Good-Get-Good/do-good-get-good/actions/workflows/build_android_release_apk.yml).  
When it's finished you'll find the APK on that workflow page under `Artifacts`.

## Trouble shooting

- run `npx react-native clean`

### Android trouble

Try

```
cd android
./gradlew clean
./gradlew build
cd ..
```

### iOS trouble

Try
- `bundle install` 
  This command installs all the required Ruby gems specified in the project's Gemfile. It ensures that your development environment has the necessary dependencies to run the project successfully. BUT first is good to run `gem update bundler`/ or `sudo gem update bundler` to ensure that your Bundler is up to date.
- sometimes it helps to run `gem update --system`.
- sometimes you need to reinstall Bundler, run  `gem uninstall bundler`and then `gem install bundler`.
- if it says "Successfully launched the app on the simulator" but after that it's like it don't have connection to the simulator anymore, then probably it run Release mode. 
You can open Xcode Check in `Product -> Scheme -> Edit Scheme -> change to Debug mode`.
- sometimes it helps to open Xcode and build by pressing `Command+B`.
- often it helps to clean pods 
  ```
  rm -rf Pods 
  rm -rf Podfile.lock
  pod install
  ```
- can help to clean cache `pod cache clean --all`

# We who have worked with the project

## Authors

- Mattias Ahlström (_Mobile application developer_)
- Alona Kirichenko (_Mobile application developer_)
- Jimmy Merilainen (_Mobile application developer_)
- Jaya Badarawada (_Mobile application developer_)
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
