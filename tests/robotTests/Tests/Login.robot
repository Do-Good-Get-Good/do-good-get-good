*** Settings ***
Documentation                      Testsuite Login funktioner
Resource                           ../Resources/keywords_general.robot
Resource                           ../Resources/keywords_login.robot
Library                            AppiumLibrary
Test Setup                         Open_App
Test Teardown                      Close_App

*** Test Cases ***
User can fail a login atempt
    Failed login attempt


Logga in som användare
        [Documentation]                 Verifiera att en användare kan logga in
        [Tags]                          TC2
        Login a user            test@test.com   test123
        varify user homepage

Logga ut som användare
        Login a user            test@test.com   test123
        logout a user

Logga tid
        login a user            test@test.com   test123
        lägg in nytt tidsvärde
        close_app
        open_app
        login a user            test@test.com   test123
        bekräfta nytt tidsvärde


logga in admin
        login a user        admin@admin.com     admin123
        #accept a users time     Test Test2      2021-12-15      1 tim
        #Denna är inaktiverad tills vidare då den inte fungerar som planerat.

Lägg till ny aktivitet
        login a user        admin@admin.com     admin123
        skapa aktivitet     testaktivitet

Användare meny till hem
        login a user        test@test.com       test123
        click meny
        click hem användare

Användare meny till min tid
        login a user        test@test.com       test123
        click meny
        click min tid

Användare meny till om konceptet  #Page not yet created, will need update after it is created
        login a user        test@test.com       test123
        click meny
        click om konceptet

Användare meny till FAQ #Page not yet created, will need update after it is created
        login a user        test@test.com       test123
        click meny
        click FAQ

Admin meny till hem
        login a user        admin@admin.com     admin123
        click meny
        click hem admin

Admin meny till aktiviter
        login a user        admin@admin.com     admin123
        click meny
        click aktiviteter

Admin meny till om konceptet    #Page not yet created, will need update after it is created
        login a user        admin@admin.com     admin123
        click meny
        click om konceptet

Admin meny till FAQ #Page not yet created, will need update after it is created
        login a user        admin@admin.com     admin123
        click meny
        click FAQ
