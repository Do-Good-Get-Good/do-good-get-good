import "react-native";
import React from "react";
import { render, fireEvent, act, } from "@testing-library/react-native";
 
import Suggestions from "../components/Suggestions"
import { useSuggestionFunction } from "../context/SuggestionContext";
import { useCreateActivityFunction } from "../context/CreateActivityContext";
import { useActivityCardContext } from "../context/ActivityCardContext";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});
jest.mock('@react-navigation/native')

  jest.mock('../context/SuggestionContext', () => ({
    
    useSuggestionFunction: () => ({
        popularActivities: jest.fn()
    })
  
  }));

  jest.mock('../context/CreateActivityContext', () => ({
    
    useCreateActivityFunction: () => ({
        changedActivity: jest.fn()
    })
  
  }));

  jest.mock('../context/ActivityCardContext', () => ({
    
    useActivityCardContext: () => ({
      inactiveActivities: jest.fn()
    })
  
  }));


const search = []

const adminGallery = [{
active: true, 
city: "city ",
description: "description", 
id: "id", 
photo: "symbol_earth", 
place: "place", 
popular: true, 
title: "title"}]

const chooseActive = true;

const inactiveActivities =[{
active: false, 
city: "city", 
description: "description", 
id: "id", 
photo: "symbol_hands_heart-DEFAULT", 
popular: false, 
title: "title"}]

const navigation = {
  navigate: jest.fn()
}



  describe('Testing Suggestions', () => {
    
      it("Suggestions exist in AdminActivityGallery", () =>{
         require('@react-navigation/native').useRoute.mockReturnValue({name: 'AdminActivityGallery'})
        const { getAllByText } = render(<Suggestions  search={search} adminGallery={adminGallery} chooseActive={chooseActive} inactiveActivities={inactiveActivities} />)
        expect(getAllByText('Aktivitetsgalleri').length).toBe(1)
      })
    

   
        

    
  })