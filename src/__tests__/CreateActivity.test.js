import "react-native";
import React, { useState  as useStateMock  }  from "react";
import { render, fireEvent, act, } from "@testing-library/react-native";
 
import CreateActivity from "../screens/CreateActivity"
import { useCreateActivityFunction } from "../context/CreateActivityContext";


jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});


jest.mock("../components/DropDownSmall", () => () => {
    return <mockDropDownSmall />;
  });

  jest.mock('@react-navigation/native')
  

jest.mock('../context/CreateActivityContext', () => ({
    
    useCreateActivityFunction: () => ({
        changedActivity: jest.fn(),
        setUpdateGallery:jest.fn(),
        updateGallery: false,
        activeActivities: [{
            id: "id",
            title: "title",
            active: true,
            city: "city",
            place: "place",
            description: "description",
            photo: "photo",
            popular: true,
          }],
          setNewActivity: jest.fn(),
    })
  
  }));


  const route = { 
    params: { 
        creatingNewUser: true, 
        activityExist: false, 
        newUserInfo: {
            first_name: "first_name",
            last_name: "last_name",
            email: "email",
            password: "password",
          } 
        }
    }  

 
    const titleForNewActivity = "Lägg till aktivitet";
    const titleForNewActivityWithCreateNewUser = "Skapa aktivitet";
    const titleForExistingActivityWithCreateNewUser =
      "Lägg till aktivitet för användare";
    

  describe('Testing  CreateActivity ', () => {

    it(" CreateActivity  screen if existingActivity === false && whileCreatingNewUser === false ", () =>{
        route.params.activityExist = false
        route.params.creatingNewUser = false
        const {getAllByText} = render(< CreateActivity route={route } />);
        expect(getAllByText(titleForNewActivity).length).toBe(1)      
    })

    // it(" CreateActivity  screen if existingActivity === false && whileCreatingNewUser === true ", () =>{
    //     route.params.activityExist = false
    //     route.params.creatingNewUser = true
    //     const {getAllByText} = render(< CreateActivity route={route } />);
    //     expect(getAllByText(titleForNewActivityWithCreateNewUser).length).toBe(1)      
    // })

    




  })