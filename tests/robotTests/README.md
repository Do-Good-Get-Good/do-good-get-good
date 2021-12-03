## How to start and run it ##

I used pycharm, appium and android studio in order to run the tests, coding was done in pycharm and android studio is for the emulator. 
In order to start the test open up the emulator of choice by starting android studio and clicking on AVD manager and install an emulator, ideally with playstore. 
Install Appium and start it, default values should work out just fine, but there is a video below with more details regarding appium.
Open the terminal and run the following two commands:

`pip install robotframework`  

`pip install --upgrade robotframework-appiumlibrary`

Run by using `robot filename.robot`, in this example `robot login.robot`. 
The results of the tests can be viewed by opening the log.html file in a browser. 

## Edit the tests ##

There is a few tests that are incomplete and will need future edits to work, for example the tests for “FAQ” and “Om konceptet” since they pages are yet to be implemented,
aswell as the create activity due to the test in its current state it cannot manage to identify and click on the floating action button. 
To do this you open up “login.robot” and look for the test you want to change, in this test there are a few keywords already present (feel free to add more if needed), 
to edit these keywords, open “keywords_login.robot” and search for the keyword, the most code should be kept in this file to keep the main file as readable as possible. 

###  The incomplete tests are the following  ###
  #### Pages not yet created  ####
Admin meny till om konceptet
  
Admin meny till FAQ
  
Användare meny till om konceptet
  
Användare meny till FAQ
  
  #### Incomplete test ####
Lägg till ny aktivitet
## Inspecting the app ##

In order to inspect the app, install appium inspector, with this tool you can click on elements on the screen and see all attributes and values that each element has, aswell as their xpaths. 
The following is the settings I used in inspector, but make sure to change it to match the emulator you are using: 

  Setting | Option
  ------- | -------
  "platformName": | "Android",
  "appium:deviceName": | "Android Emulator",
  "appium:platformVersion": | "11.0",
  "appium:app": | "C:\\Users\\Kristoffer\\Documents\\appAPK\\name_of_apk.apk",
  "appium:noReset": | true



## Useful information ## 
Appium library for robot framework: https://serhatbolsu.github.io/robotframework-appiumlibrary/AppiumLibrary.html#library-documentation-top

Very informative youtube channel, specifically the videos “open application” and “locate elements” (he uses UI automator viewer instead of appium inspector but the information shown is the same) 
https://www.youtube.com/c/RobotFrameworkTipsTricksAndTutorials/videos

Seminar about Appium and appium inspector by Jonathan Lipps: https://www.youtube.com/watch?v=RC4KbwCPOQE

