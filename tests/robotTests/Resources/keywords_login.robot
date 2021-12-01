*** Settings ***
Library                            DateTime

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

Click logout
    wait until page contains element        //android.widget.TextView[@text="Logga ut"]
    Click element       //android.widget.TextView[@text="Logga ut"]

Click meny
    wait until page contains element        //android.widget.TextView[@text="MENY"]
    click element at coordinates        970     228
    #click element       //android.widget.TextView[@text="MENY"]

Varify login page
    Wait Until Page Contains Element     //android.widget.TextView[@text="Glömt ditt lösenord?"]
    Page Should Contain Element    //android.widget.TextView[@text="Glömt ditt lösenord?"]

Varify login page error
    Wait Until Page Contains Element     //android.widget.TextView[@text="* Fel e-post eller lösenord"]
    Page Should Contain Element    //android.widget.TextView[@text="* Fel e-post eller lösenord"]

Varify user homepage
    Wait Until Page Contains Element            //android.widget.TextView[@text="Min tid"]
    Page Should Contain Element            //android.widget.TextView[@text="Min tid"]

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

Varify and confirm user
    [Arguments]         ${Full name}     ${Date}     ${Duration}
    wait until page contains element        //android.widget.TextView[@text="Att godkänna"]
    wait until page contains element        //*[@text="${Full name}"]
    @{elements}     Get Webelements     //ViewGroup[@text="Test Test2"]
    click element           //android.view.ViewGroup[@text="${Full name}"]
    #//android.widget.viewgroup[contains(@text=${Full name} and @text=${Date})]/android.widget.checkbox/android.widget.TextView

öppna skapa aktivitet
    wait until page contains element        //android.widget.TextView[@text="Att godkänna"]
    click element at coordinates            950     2000    #clicks floating action button, not working yet
    click element                           //android.widget.TextView[@text="Lägg till aktivitet"]

#Joined expression
Login a user
    [Arguments]         ${Username}     ${Password}
    Fill in username        ${Username}
    Fill in password        ${Password}
    Click login button

Logout a user
    Click meny
    Click logout


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


accept a users time
    [Arguments]         ${Full name}     ${Date}     ${Duration}
    varify and confirm user     ${Full name}     ${Date}     ${Duration}


skapa aktivitet
    [Arguments]     ${Activity Name}
    öppna skapa aktivitet
