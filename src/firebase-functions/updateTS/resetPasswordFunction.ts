
import auth from "@react-native-firebase/auth";

export const resetPass= async (email:string) : Promise<string>=> {

   try {
    await auth().sendPasswordResetEmail(email);
    return "Länken för återställning av lösenord har skickats till den nya användaren.";
} 
  catch(error:any) {
      const errorCode = error?.code;
      // const errorMessage = error.message;
      if (errorCode === "auth/invalid-email") {
      return "Det gick inte att skicka länk till användaren. Ange en giltig e-post";
      }
      else if(errorCode === "auth/user-not-found") {
        return "Det gick inte att skicka länk till användaren. Användaren finns inte"
      
      }else{
        return ""
      }
    };

};
