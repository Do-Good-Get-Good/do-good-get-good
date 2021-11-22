*** Settings ***
Documentation                      Testsuite Login funktioner
Resource                           ../Resources/keywords_general.robot
Resource                           ../Resources/keywords_login.robot
Library                            AppiumLibrary
Test Setup                         Open_App
Test Teardown                      End Web Test

*** Test Cases ***
Starta App
        Open_App


Logga in som användare
        [Documentation]                 Verifiera att en användare kan logga in
        [Tags]                          LIA1
        Login a user            kristoffer.johnsson@gmail.com   Blomma

User can fail a login atempt
    Failed login attempt

Login as a user after first failing
    Login user after a failed attempt       kristoffer.johnsson@gmail.com   Blomma


#Following are initially intended for the browser version
#User can login after a failed attempt
#User can show inputted password
#User can hide inputted password
#User can click on reset password
#User can input an incorrect e-mail
#//User can input a password containing 100 characters
#//User can input an email containing 100 characters
#//User can input a password containing 1 character
#//User can input an email containing 1 charater

#Admin cases for the above mentioned tests.