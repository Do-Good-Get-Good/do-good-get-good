*** Settings ***
Library     AppiumLibrary
*** Variables ***




*** Keywords ***
Open Application
    Open Application    http://localhost:4723/wd/hub    platformName=Android    deviceName=Pixel 4 API 30   appPackage=com.src     appActivity=com.src.MainActivity - src   automationName=Uiautomator2

