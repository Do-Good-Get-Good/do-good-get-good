import "react-native";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import CreateActivity from "../screens/CreateActivity";
import { useCreateActivityFunction } from "../context/CreateActivityContext";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});

jest.mock("../components/DropDownSmall", () => () => {
  return <mockDropDownSmall />;
});

jest.mock("@react-navigation/native");

jest.mock("../context/CreateActivityContext", () => ({
  useCreateActivityFunction: () => ({
    changedActivity: jest.fn(),
    setUpdateGallery: jest.fn(),
    updateGallery: false,
    activeActivities: [
      {
        id: "id",
        title: "title",
        active: true,
        city: "city",
        place: "place",
        description: "description",
        photo: "symbol_hands_heart-DEFAULT",
        popular: true,
      },
    ],
    setNewActivity: jest.fn(),
    sendChoiceFromDropDown: "Skapa ny aktivitet",
  }),
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
    },
  },
};

const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const titleForNewActivity = "Lägg till aktivitet";
const titleForNewActivityWithCreateNewUser = "Skapa aktivitet   2/2";
const titleForExistingActivityWithCreateNewUser =
  "Lägg till aktivitet för användare   2/2";

describe("Testing  CreateActivity ", () => {
  it(" CreateActivity  screen if existingActivity === false && whileCreatingNewUser === false ", () => {
    route.params.activityExist = false;
    route.params.creatingNewUser = false;
    const { getAllByText } = render(<CreateActivity route={route} />);
    expect(getAllByText(titleForNewActivity).length).toBe(1);
  });

  it(" CreateActivity  screen if existingActivity === false && whileCreatingNewUser === true ", () => {
    route.params.activityExist = false;
    route.params.creatingNewUser = true;
    // useCreateActivityFunction().sendChoiceFromDropDown.mockImplementation(()=> "Skapa ny aktivitet")
    // useCreateActivityFunction().sendChoiceFromDropDown.mockReturnValueOnce("Skapa ny aktivitet")

    const { getAllByText } = render(<CreateActivity route={route} />);
    expect(getAllByText(titleForNewActivityWithCreateNewUser).length).toBe(1);
  });

  it(" Choice from DropDown = Skapa ny aktivitet. Placeholder Aktivity title exist   ", () => {
    route.params.activityExist = false;
    route.params.creatingNewUser = true;
    const { getByPlaceholderText } = render(<CreateActivity route={route} />);
    fireEvent.changeText(getByPlaceholderText("Aktivitet"), "Aktivity title");
  });

  it(" Choice from DropDown = Skapa ny aktivitet. Placeholder Place exist   ", () => {
    route.params.activityExist = false;
    route.params.creatingNewUser = true;
    const { getByPlaceholderText } = render(<CreateActivity route={route} />);
    fireEvent.changeText(getByPlaceholderText("Var"), "Aktivity place");
  });

  it(" Choice from DropDown = Skapa ny aktivitet. Placeholder City exist   ", () => {
    route.params.activityExist = false;
    route.params.creatingNewUser = true;
    const { getByPlaceholderText } = render(<CreateActivity route={route} />);
    fireEvent.changeText(getByPlaceholderText("Aktör"), "Aktivity city");
  });

  it(" Choice from DropDown = Skapa ny aktivitet. Placeholder Description exist   ", () => {
    route.params.activityExist = false;
    route.params.creatingNewUser = true;
    const { getByPlaceholderText } = render(<CreateActivity route={route} />);
    fireEvent.changeText(getByPlaceholderText("Vad"), "Aktivity Description");
  });

  it("Photo exists in CreateActivity", () => {
    const { getByTestId } = render(<CreateActivity route={route} />);
    expect(getByTestId("photo"));
    const image = getByTestId("photo");
    expect(image.props.source).toEqual({
      testUri: "../../../img/activities_images/symbol_hands_heart-DEFAULT.png",
    });
  });
  it("ActivityCard. Navigation to ImagesGallery", () => {
    const { getByTestId } = render(
      <CreateActivity route={route} navigation={navigation} />
    );

    const imagesGalleryButton = getByTestId("navigateToImagesGallery");
    fireEvent.press(imagesGalleryButton);
    expect(navigation.navigate).toHaveBeenCalledWith("ImagesGallery");
  });

  it("ActivityCard. Text 'Infoga' exidst", () => {
    const { getAllByText } = render(
      <CreateActivity route={route} navigation={navigation} />
    );
    expect(getAllByText("Infoga").length).toBe(1);
  });
  it("ActivityCard. Text 'Lägg till somTG-favorit' exidst", () => {
    const { getAllByText } = render(
      <CreateActivity route={route} navigation={navigation} />
    );
    expect(getAllByText("Lägg till somTG-favorit").length).toBe(1);
  });

  it("ActivityCard. Button buttonSomTGFavorit", () => {
    const { getByTestId } = render(
      <CreateActivity route={route} navigation={navigation} />
    );

    const buttonSomTGFavorit = getByTestId("buttonSomTGFavorit");
    fireEvent.press(buttonSomTGFavorit);
  });

  it("ActivityCard. Text '[TG-favoriter vissas för alla användare]' exidst", () => {
    const { getAllByText } = render(
      <CreateActivity route={route} navigation={navigation} />
    );
    expect(getAllByText("TG-favoriter vissas för alla användare").length).toBe(
      1
    );
  });

  it("ActivityCard. Button 'Spara' send new activity to createActivityContext", () => {
    route.params.creatingNewUser = true;
    const { getByTestId } = render(
      <CreateActivity route={route} navigation={navigation} />
    );

    const sendNewActivityToCreateActivityContext = getByTestId(
      "sendNewActivityToCreateActivityContext"
    );
    fireEvent.press(sendNewActivityToCreateActivityContext);
    useCreateActivityFunction().setNewActivity.mockReturnValue({
      active_status: true,
      activity_city: "city",
      activity_description: "description",
      activity_photo: "newActivityImage",
      activity_place: "place",
      activity_title: "title",
      tg_favorite: true,
    });
  });

  it("ActivityCard. Button 'Spara' send new activity to createActivityContext", () => {
    route.params.creatingNewUser = true;
    const { getByTestId } = render(
      <CreateActivity route={route} navigation={navigation} />
    );
    const goBackButton = getByTestId("goBackButton");
    fireEvent.press(goBackButton);
    expect(navigation.goBack).toHaveBeenCalled();
  });
});
