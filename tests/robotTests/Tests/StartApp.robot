*** Settings ***
Library     AppiumLibrary

*** Test Cases ***
Start App
    [Tags]    DEBUG
    Open_App
    Close_App

*** Keywords ***
Open_App
    Open Application    http://localhost:4723/wd/hub    platformName=Android    deviceName=Pixel 4 API 30   appPackage=com.src     appActivity=com.src.MainActivity     appWaitDuratio=40000    noReset=true

Close_App
    close application