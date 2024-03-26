import "react-native";
import React from "react";

import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ListOfAllUsers from "../../components/ListOfAllUsers";
import userLevelStore from "../../store/userLevel";
import { Role } from "../../utility/enums";


jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("@react-navigation/native");


const navigationMock = { goBack: jest.fn() };

jest.mock("../../context/SuperAdminContext", () => ({
  useSuperAdminFunction: () => ({
    allUsersInSystem: [],
    setAllUsersInSystem: jest.fn()
   
  }),
}));


const superAdmin = () => {
  userLevelStore.setUserLevel(Role.superadmin);
 
};

jest.mock('../../hooks/superAdmin/useGetAllUsersThatExistInTheSystem', () => ({
  useGetAllUsersThatExistInTheSystem: () => ({
    getAllUsersByStatus: jest.fn()
   
  }),
}));


// describe("Testing ListOfAllUsers screen", () => {
//   it("Renders searchbar component ", async () => {
//     superAdmin()
//     const { getByPlaceholderText } = render(<ListOfAllUsers navigation={navigationMock}/>);
    
//        expect(getByPlaceholderText('Sök')).toBeTruthy();
//       });



//   // it('renders user names', () => {
//   //       const users = [
//   //         { id: 1, firstName: 'Jaya', lastName: 'Doe' },
//   //         { id: 2, firstName: 'Johan', lastName: 'Doe' }
//   //       ];
//   //       const { getByText } = render(<ListOfAllUsers allUsersInSystem={users} />);
//   //       expect(getByText('Jaya Doe')).toBeTruthy();
//   //       expect(getByText('Johan Doe')).toBeTruthy();
//   //     });



    
      
  
// });
