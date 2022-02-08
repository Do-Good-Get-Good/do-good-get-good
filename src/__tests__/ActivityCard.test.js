
import "react-native";
import React from "react";
import { render, getByTestId, getByText, queryByTestId } from "@testing-library/react-native";
import { useActivityCardContext } from "../context/ActivityCardContext";
import { useCreateActivityFunction } from "../context/CreateActivityContext";

import ActivityCard from "../screens/ActivityCard";




jest.mock("react-native-elements/dist/icons/Icon", () => () => {
    return <fakeIcon />;
  });
  
 jest.mock('@react-navigation/native')

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("../components/Menu", () => () => {
    return <mockMenu/>;
  });

  jest.mock('../context/CreateActivityContext', () => ({
    
    useCreateActivityFunction: () => ({
      activeActivities: jest.fn()
    })
  
  }));
  
  jest.mock('../context/ActivityCardContext', () => ({
      
    useActivityCardContext: () => ({
      active: jest.fn(),
      popular: jest.fn()
    })
  
  }));

  const route = { 
    params: { 
    admin: true, 
    activityInfo:
     {
        id: "5",
        title:"title",
        city: "city",
        description: " description",
        photo: "photo"
    }, 
   active: true, 
   tgPopular: true} }   

  describe("Testing ActivityCard ", () => {
      


    it("Can find ActivityCard", () => {
        const component = render(<ActivityCard route={route } />);
        component.getByText("Gå tillbaka")
    })
   
   
  })