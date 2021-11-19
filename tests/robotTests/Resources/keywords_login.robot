*** Settings ***

*** Variables ***


${BROWSER}                   chrome
${URL_HOMEPAGE}              http://localhost:19006/
${URL_TITLE}				 src



*** Keywords ***
Fill in username
    [Arguments]         ${Username}
    Input text          00000000-0000-0009-ffff-ffff0000009c        ${Username}

    #xpath://*[@id="root"]/div/div/div/div[3]/div[2]/input


Fill in password
    [Arguments]         ${Password}
    Input password      00000000-0000-0009-ffff-ffff0000009d     ${Password}

Click login button
    Click Element       00000000-0000-0009-ffff-ffff000000a3

Varify login page
    Contains Element    00000000-0000-0009-ffff-ffff000000a4

Varify user homepage
    Contains            Mina aktiviteter

#Joined expression
Login a user
    [Arguments]         ${Username}     ${Password}
    Open_Application
    Fill in username        ${Username}
    Fill in password        ${Password}
    Click login button
    Varify user homepage

Failed login attempt
    Login a user            false@mail.se           aFalsePassword
    Varify login page

Login user after a failed attempt
    [Arguments]         ${Username}     ${Password}
    Login a user            false@mail.se           aFalsePassword
    Login a user            ${Username}     ${Password}
    Varify user homepage