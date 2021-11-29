*** Settings ***
Library     AppiumLibrary
*** Variables ***




*** Keywords ***
Open_App
    Open Application    http://localhost:4723/wd/hub    platformName=Android    deviceName=Pixel 4 API 30   appPackage=com.src     appActivity=com.src.MainActivity   automationName=Uiautomator2
    set appium timeout      30
Close_App
    close application
