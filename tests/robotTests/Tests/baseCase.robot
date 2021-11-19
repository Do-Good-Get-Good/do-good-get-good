*** Settings ***
Documentation    Suite description

*** Test Cases ***
Test title
    [Tags]    DEBUG
    Provided precondition
    When action
    Then check expectations

*** Keywords ***
Provided precondition
    Setup system under test

Appium Keyword: Open Application

remote_url: http://localhost:4723/

platformName=android

platformVersion=10.0

deviceName='Pixel_4_API_30'

appPackage=com.android.Calculator

appActivity=Calculator