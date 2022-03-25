import React, { useContext, useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
const CreateUserContext = React.createContext();

export const useCreateUserFunction = () => {
  return useContext(CreateUserContext);
};

export const CreateUserProvider = ({ children }) => {
  // const [changedUserFirstName, setChangedUserFirstName] = useState("");
  // const [changedUserLasttName, setChangedUserLasttName] = useState("");
  // const [changeUserStatusActive, setChangeUserStatusActive] = useState(null);
  // const [personalInfoID, setPersonalInfoID] = useState("");
  const [tellToAdminHomePageToUpdate, setTellToAdminHomePageToUpdate] =
    useState(false);
  // const [newUser, setNewUser] = useState({
  //   first_name: "",
  //   last_name: "",
  //   email: "",
  //   password: "",
  // });

  //const [userID, setUserID] = useState("");

  const [newChangesInUserInfo, setNewChangesInUserInfo] = useState({
    userID: " ",
    userName: " ",
    statusActive: null,
  });

  useEffect(() => {
    if (newChangesInUserInfo.userID != " ") {
      const setchangedUserFirstNameToFirebase = () => {
        firestore()
          .collection("Users")
          .doc(newChangesInUserInfo.userID)
          .update({
            fullname: newChangesInUserInfo.userName,
            status_active: newChangesInUserInfo.statusActive,
          })
          .then(() => {
            console.log("User first name has been changed");
            setTellToAdminHomePageToUpdate(true);
          });
      };
      setchangedUserFirstNameToFirebase();
    }
  }, [newChangesInUserInfo]);

  // useEffect(() => {
  //   if (changedUserFirstName != "") {
  //     const setchangedUserFirstNameToFirebase = () => {
  //       firestore()
  //         .collection("Users")
  //         .doc(userID)
  //         .collection("personal_information")

  //         .doc(personalInfoID)
  //         .update({
  //           first_name: changedUserFirstName,
  //         })
  //         .then(() => {
  //           console.log("User first name has been changed");
  //           setTellToAdminHomePageToUpdate(true);
  //         });
  //     };
  //     setchangedUserFirstNameToFirebase();
  //   }
  // }, [changedUserFirstName]);

  // useEffect(() => {
  //   if (changedUserLasttName != "") {
  //     const setchangedUserLastNameToFirebase = () => {
  //       firestore()
  //         .collection("Users")
  //         .doc(userID)
  //         .collection("personal_information")
  //         .doc(personalInfoID)
  //         .update({
  //           last_name: changedUserLasttName,
  //         })
  //         .then(() => {
  //           console.log("User last name has been changed");
  //           setTellToAdminHomePageToUpdate(true);
  //         });
  //     };
  //     setchangedUserLastNameToFirebase();
  //   }
  // }, [changedUserLasttName]);

  // useEffect(() => {
  //   console.log("changeUserStatusActive", changeUserStatusActive);
  //   if (changeUserStatusActive != null) {
  //     const setchangedUserStatusActiveToFirebase = () => {
  //       firestore()
  //         .collection("Users")
  //         .doc(userID)
  //         .update({
  //           status_active: changeUserStatusActive,
  //         })
  //         .then(() => {
  //           console.log("User status active has been changed");
  //           setTellToAdminHomePageToUpdate(true);
  //         });
  //     };
  //     setchangedUserStatusActiveToFirebase();
  //   }
  // }, [changeUserStatusActive]);

  return (
    <CreateUserContext.Provider
      value={{
        // newUserInfo: setNewUser,
        // userIDToChangePersonalInfo: setUserID,
        // personalInformationID: setPersonalInfoID,
        // userFirstNameToChange: setChangedUserFirstName,
        // userLastNameToChange: setChangedUserLasttName,
        // userActiveStatusChange: setChangeUserStatusActive,
        setNewChangesInUserInfo: setNewChangesInUserInfo,
        setChangedUserInfoTo: setTellToAdminHomePageToUpdate,
        getChangedUserInfoTo: tellToAdminHomePageToUpdate,
      }}
    >
      {children}
    </CreateUserContext.Provider>
  );
};
