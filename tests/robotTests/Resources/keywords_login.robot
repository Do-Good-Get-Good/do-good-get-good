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

Öppna logga tid
    Wait until page contains element    //android.widget.TextView[@text="Logga tid"]
    click element       //android.widget.TextView[@text="Logga tid"]

Ange datum
    Wait until page contains element    //android.widget.TextView[@text="Välj datum"]
    click element       //android.widget.TextView[@text="15"]

Addera tid
    click element       //android.widget.TextView[@text="+"]

Subtrahera tid
    click element       //android.widget.TextView[@text="-"]

Spara aktivitetstid
    click element       //android.widget.TextView[@text="Logga tid"]

Bekräfta 1 timme
    wait until page contains element        //android.widget.TextView[@text="1 tim"]
    page should contain element     //android.widget.TextView[@text="1 tim"]


#Joined expression
Login a user
    [Arguments]         ${Username}     ${Password}
    Fill in username        ${Username}
    Fill in password        ${Password}
    Click login button


Failed login attempt
    Login a user            false@mail.se           aFalsePassword
    Varify login page error

Lägg in nytt tidsvärde
    öppna logga tid
    ange datum
    addera tid
    addera tid
    addera tid
    subtrahera tid
    spara aktivitetstid

bekräfta nytt tidsvärde
    bekräfta 1 timme

Login user after a failed attempt
    [Arguments]         ${Username}     ${Password}
    Login a user            false@mail.se           aFalsePassword
    Login a user            ${Username}     ${Password}
    Varify user homepage