# Thoughts After LIA 2021 #

## What we've noticed/Good to know ##
We have noticed that there are some differences in how components get rendered on Android and iOS. 

Because of this we recommend that every programmer working on this project in the future has the ability/posibillity to run the app on both iOS and Android.

## Code optimization ##
There is also some code that needs to be optimized (i.e. MyUsers and ConfirmActivities). As of now this code is pretty slow when getting data. 

We currently use the "get" function when getting data from firestore. This results in not getting real-time data unless we call these functions manually by code again. Therefor a recommendation is switching to "onSnapshot" where getting real-time data is important. Places where this can be applied is for example when users/admins are adding/updating or removing data from the database (time entries, confirming activites, updating user info).

## Styling tips ##
Right now we only have one pre-defined style for inputs (found in "styles/inputStyles.js"), a recommendation is to create more pre-defined styles to have easy re-usability when wanting to style elements.
Examples where this can be great is for buttons, cards, dropdowns and so on.

## React Redux ##
We currently use React Context in the app, which is pretty newly implemented in React. We recommend looking up React Redux instead since it has existed longer and has more use cases.
It can be great for hooking up all database requests/fetches, have global states/variables and so on.

Link to the official documentation: https://react-redux.js.org/

## Firebase Cloud Functions ##
We never got to work that much with Firebase Cloud Functions, only a little at the end of our internship.
From the information we've gathered the Cloud Functions can be great for many things, i.e. gathering all data from a users collection and sending this back as one object to the client.

It is also needed for getting access to the Firebase Admin SDK. This gives you access to everything in the database/authentication and so on. You can create new users this way.
We are currently setting a users privilege level in each users document. Instead of doing this there is something called Custom Claims in the Admin SDK which is where you are supposed to set a users privilege level. 

_Note that we never had time to use or look more into this so we may have understood this wrong._


Link to React Native Cloud Functions documentation:

https://rnfirebase.io/functions/usage

----------
By Alona and Mattias - 2021-11-05
