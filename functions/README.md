## 2nd gen cloud function

## onCall

onCall, you need to path the whole url and not just a name of the function
here is more info https://github.com/invertase/react-native-firebase/issues/6622#issuecomment-1287460800

## onSchedule

Most of second gen functions is at europe-north1.
But onSchrdul function doesn't support all region https://github.com/firebase/firebase-functions/issues/1293#issuecomment-1297524616
In summer 2024 I tried europe-north1, europe-west1, europe-west2 it didn't work, so I deployed it to default us-central1. But maybe in future they will fix it.
So when you deploy onSchedul function, just comment awaty setGlobalOptions({ region: "europe-north1" }); at config file
