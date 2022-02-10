
import "react-native";
import React from "react";
import { render, getByTestId, getByText, queryByTestId, fireEvent, getAllByText } from "@testing-library/react-native";
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
      activeActivities: jest.fn(),
      activityHasChangedID: jest.fn(),
    })
  
  }));
  
  jest.mock('../context/ActivityCardContext', () => ({
      
    useActivityCardContext: () => ({
      active: jest.fn(),
      popular: jest.fn(),
      changePopular:jest.fn(),
      changeActive:jest.fn(),
      idActivity: jest.fn(),
    })
  
  }));

  const route = { 
    params: { 
        admin: true, 
        activityInfo: {
            id: "5",
            title:"title",
            city: "city",
            description: " description",
            photo: "symbol_earth"
        }, 
        active: true, 
        tgPopular: true
        } 
    }   

   
  describe("Testing ActivityCard ", () => {
      
    it("Can find ActivityCard", () => {
        const component = render(<ActivityCard route={route } />);
        component.getByText("Gå tillbaka")
    })

       it( "Photo exists in ActivityCard",() => {
    const { getByTestId }  = render(<ActivityCard route={route } />);
    expect(getByTestId('photo'))
    const image = getByTestId('photo')
     expect(image.props.source).toEqual({testUri: "../../../img/activities_images/symbol_earth.png"})
     
      })

   it("Activity title exists in ActivityCard", () => {
       const { getAllByText }  = render(<ActivityCard route={route } />);
       expect(getAllByText(route.params.activityInfo.title).length).toBe(1)   
      })

      it("Activity city exists in ActivityCard", () => {
        const { getAllByText }  = render(<ActivityCard route={route } />);
        expect(getAllByText(route.params.activityInfo.city).length).toBe(1)   
       })

      it("Activity description exists in ActivityCard", () => {
        const { getAllByText }  = render(<ActivityCard route={route } />);
        expect(getAllByText(route.params.activityInfo.description).length).toBe(1)   
       })

       it("For admin in ActivityCard. Delet button exist for both active and inactive activities", ()=> {  
        const { getAllByText, getByTestId }  = render(<ActivityCard route={route} />);  
        const alertToDeleteActivity = getByTestId("alertToDeleteActivity")
        fireEvent.press(alertToDeleteActivity)  
        expect(getAllByText("Ta bort").length).toBe(1)     
       })


    it("ActivityCard for admin for active activities. Arkivera button", () => {
    
        const { getAllByText, getByTestId }  = render(<ActivityCard route={route} />);  
        const alertToArchiveActivity= getByTestId("alertToArchiveActivity")
        fireEvent.press(alertToArchiveActivity)  
        expect(getAllByText("Arkivera").length).toBe(1)  
        useActivityCardContext().changeActive(false)
        useActivityCardContext().idActivity(route.params.activityInfo.id);
        useCreateActivityFunction().activityHasChangedID(route.params.activityInfo.id)

    })

    it("ActivityCard for admin for inactive activities. To take away from archive", () => {
        route.params.tgPopular = false
        route.params.active = false      

        const { getAllByText, getByTestId }  = render(<ActivityCard route={route} />);  
        const alertToTakeAwayFromArchiveActivity= getByTestId("alertToTakeAwayFromArchiveActivity")
        fireEvent.press(alertToTakeAwayFromArchiveActivity)  
        expect(getAllByText("Flytta från arkiv").length).toBe(1) 
        useActivityCardContext().changeActive(true)
        useActivityCardContext().idActivity(route.params.activityInfo.id);
        useCreateActivityFunction().activityHasChangedID(route.params.activityInfo.id)
        

       })

    it("ActivityCard for admin for active activities. TG_status button turn to favotite ", () => {
        route.params.tgPopular = false
        route.params.active = true
        
        const { getAllByText, getByTestId }  = render(<ActivityCard route={route} />);  
         expect(getAllByText("Lägg till som TG-favorit").length).toBe(1) 
        const toFavorite = getByTestId("toFavorite")
        fireEvent.press(toFavorite) 
         expect(getAllByText("Ta bort från TG-favoriter").length).toBe(1) 
        useActivityCardContext().changePopular.mockReturnValue(true)  
        useActivityCardContext().idActivity(route.params.activityInfo.id);
        useCreateActivityFunction().activityHasChangedID(route.params.activityInfo.id)    

    })
    it("ActivityCard for admin for active activities. TG_status button turn to NOT favotite ", () => {
      route.params.tgPopular = true
      route.params.active = true   
      const { getAllByText, getByTestId }  = render(<ActivityCard route={route} />);  
      expect(getAllByText("Ta bort från TG-favoriter").length).toBe(1)    
      const toNotFavorite = getByTestId("toNotFavorite")
      fireEvent.press(toNotFavorite) 
      expect(getAllByText("Lägg till som TG-favorit").length).toBe(1) 
      useActivityCardContext().changePopular.mockReturnValue(false)  
      useActivityCardContext().idActivity(route.params.activityInfo.id);
      useCreateActivityFunction().activityHasChangedID(route.params.activityInfo.id)    

  })


     

       

    
  })