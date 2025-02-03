# Firebase cloud functions

## How to set up

1. Go to the Firebase console for the environment you want to work on.  
   [Dev environment](https://console.firebase.google.com/u/0/project/dev-do-good-get-good/overview)  
   [Prod environment](https://console.firebase.google.com/u/0/project/do-good-get-good-2f6cc/overview)
2. Navigate to **service accounts**  
   (Project settings --> Service accounts)
3. Click on **Generate new private key**
4. When the file has finished downloading, move it to **/functions/ServiceAccount**  
   If you don't see a **ServiceAccount** folder, create it.
5. Rename the file to one of the following:  
   Dev: **devServiceAccount.json**  
   Prod: **serviceAccount.json**
6. Add the keys you've got separetly to **.env** files.  
   (**.env**, **.env.dev** and **.env.prod**).
7. Make sure the environment and service account files are ignored by Git.

Now you should be able to login to your account in the Firebase CLI and start uploading cloud functions!

## 2nd gen cloud function

## onCall

onCall, you need to path the whole url and not just a name of the function
here is more info https://github.com/invertase/react-native-firebase/issues/6622#issuecomment-1287460800

## onSchedule

Most of second gen functions is at europe-north1.
But onSchrdul function doesn't support all region https://github.com/firebase/firebase-functions/issues/1293#issuecomment-1297524616
