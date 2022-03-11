import "react-native";
import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";

import ChangeActivity from "../screens/ChangeActivity";
import { useActivityCardContext } from "../context/ActivityCardContext";
import { useCreateActivityFunction } from "../context/CreateActivityContext";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});

jest.mock("../components/Menu", () => () => {
  return <mockMenu />;
});

jest.mock("../context/ActivityCardContext", () => ({
  useActivityCardContext: () => ({
    changeActivityCard: jest.fn(),
    activityWithChangedInfor: jest.fn(),
  }),
}));

jest.mock("../context/CreateActivityContext", () => ({
  useCreateActivityFunction: () => ({
    activityHasChangedID: jest.fn(),
    activityHasChanged: jest.fn(),
  }),
}));

const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const route = {
  params: {
    activity: {
      id: "5",
      title: "title",
      city: "city",
      description: " description",
      photo: "symbol_earth",
      active: true,
      place: "Some place 51",
      popular: true,
    },
    tgPopular: true,
  },
};

describe("Testing ChangeActivity screen", () => {
  it("ChangeActivity. Main title exist", () => {
    const { getAllByText } = render(
      <ChangeActivity navigation={navigation} route={route} />
    );
    expect(getAllByText("Ändra aktivitet").length).toBe(1);
  });

  it("ChangeActivity. Placeholder with title exists and possible to wtire", () => {
    const { getByPlaceholderText } = render(
      <ChangeActivity navigation={navigation} route={route} />
    );
    fireEvent.changeText(
      getByPlaceholderText(route.params.activity.title),
      "activity name or title"
    );
  });

  it("ChangeActivity. Placeholder with city exists and possible to wtire", () => {
    const { getByPlaceholderText } = render(
      <ChangeActivity navigation={navigation} route={route} />
    );
    fireEvent.changeText(
      getByPlaceholderText(route.params.activity.city),
      "activity name or city"
    );
  });

  it("ChangeActivity. Placeholder with place exists and possible to wtire", () => {
    const { getByPlaceholderText } = render(
      <ChangeActivity navigation={navigation} route={route} />
    );
    fireEvent.changeText(
      getByPlaceholderText(route.params.activity.place),
      "activity name or place"
    );
  });
  it("ChangeActivity. Placeholder with description exists and possible to wtire", () => {
    const { getByPlaceholderText } = render(
      <ChangeActivity navigation={navigation} route={route} />
    );
    fireEvent.changeText(
      getByPlaceholderText(route.params.activity.description),
      "activity name or description"
    );
  });

  it("ChangeActivity. Button 'Save' exist and navigate back  ", () => {
    const { getAllByText, getByTestId } = render(
      <ChangeActivity navigation={navigation} route={route} />
    );

    expect(getAllByText("Spara").length).toBe(1);
    const saveButton = getByTestId("saveButton");
    fireEvent.press(saveButton);
    let changedObject = {
      active: route.params.activity.active,
      city: "city",
      description: " description",
      id: route.params.activity.id,
      photo: "symbol_earth",
      place: "Some place 51",
      popular: route.params.tgPopular,
      title: "title",
    };
    useActivityCardContext().changeActivityCard.mockReturnValue(true);
    expect(navigation.navigate).toHaveBeenCalledWith("ActivityCard", {
      activityInfo: changedObject,
      admin: true,
      active: true,
      tgPopular: route.params.tgPopular,
    });

    useCreateActivityFunction().activityHasChangedID.mockReturnValue({
      activityInfo: changedObject,
      popular: route.params.tgPopular,
      statusActive: true,
    });
    useCreateActivityFunction().activityHasChanged.mockReturnValue(true);
  });

  it("ChangeActivity. Button 'Back' exist and navigate back  ", () => {
    const { getAllByText, getByTestId } = render(
      <ChangeActivity navigation={navigation} route={route} />
    );
    expect(getAllByText("Avbryt").length).toBe(1);
    const backButton = getByTestId("backButton");
    fireEvent.press(backButton);

    expect(navigation.goBack).toHaveBeenCalled();
  });
});
