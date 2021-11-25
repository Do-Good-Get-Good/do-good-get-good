*** Settings ***

*** Variables ***


${BROWSER}                   chrome
${URL_HOMEPAGE}              http://localhost:19006/
${URL_TITLE}				 src



*** Keywords ***
Fill in username
    [Arguments]         ${Username}
    Wait Until Element is Visible   //android.widget.EditText[@text="E-post"]
    Input Text          //android.widget.EditText[@text="E-post"]       ${Username}

#00000000-0000-0054-ffff-ffff00000010
#00000000-0000-00f3-ffff-ffff00000010

    #xpath://*[@id="root"]/div/div/div/div[3]/div[2]/input


Fill in password
    [Arguments]         ${Password}
    Input password      //android.widget.EditText[@text="Lösenord"]     ${Password}

Click login button
    Click Element       //android.widget.TextView[@text="Logga in"]

Varify login page error
    Wait Until Page Contains Element     //android.widget.TextView[@text="* Fel e-post eller lösenord"]
    Page Should Contain Element    //android.widget.TextView[@text="* Fel e-post eller lösenord"]

Varify user homepage
    Wait Until Page Contains Element            //android.widget.TextView[@text="Förslag & inspiration"]
    Page Should Contain Element            //android.widget.TextView[@text="Förslag & inspiration"]

#Joined expression
Login a user
    [Arguments]         ${Username}     ${Password}
    Fill in username        ${Username}
    Fill in password        ${Password}
    Click login button


Failed login attempt
    Login a user            false@mail.se           aFalsePassword
    Varify login page error

Login user after a failed attempt
    [Arguments]         ${Username}     ${Password}
    Login a user            false@mail.se           aFalsePassword
    Login a user            ${Username}     ${Password}
    Varify user homepage