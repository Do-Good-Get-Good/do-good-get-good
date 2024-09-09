import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import "react-native";
import ChangeActivity from "../../screens/ChangeActivity";

jest.mock("@react-native-async-storage/async-storage", () => {
  const actualAsyncStorage = jest.requireActual(
    "@react-native-async-storage/async-storage/jest/async-storage-mock"
  );
  return {
    ...actualAsyncStorage,
    getItem: () => null,
  };
});

jest.mock("../../context/ActivityImagesContext/ActivityImagesContext", () => ({
  useActivityImages: jest.fn(() => ({
    getImageForActivity: jest.fn(() => ({
      photo: "symbol_blood",
    })),
  })),
}));

jest.mock("../../components/Menu", () => () => {
  return <mockMenu />;
});

jest.mock("../../context/ActivityCardContext", () => ({
  useActivityCardContext: () => ({
    changeActivityCard: jest.fn(),
    activityWithChangedInfor: jest.fn(),
  }),
}));

jest.mock("../../context/CreateActivityContext/CreateActivityContext", () => ({
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
  it("Main title exist", () => {
    const { getAllByText } = render(
      <ChangeActivity navigation={navigation} route={route} />
    );
    expect(getAllByText("Ändra aktivitet").length).toBe(1);
  });

  it("Title placeholder exists and possible to change", () => {
    const { getByPlaceholderText } = render(
      <ChangeActivity navigation={navigation} route={route} />
    );
    const input = getByPlaceholderText(route.params.activity.title);
    fireEvent.changeText(input, "activity name or title");
    expect(input.props.value).toEqual("activity name or title");
  });

  it("City placeholder exists and possible to change", () => {
    const { getByPlaceholderText } = render(
      <ChangeActivity navigation={navigation} route={route} />
    );
    const input = getByPlaceholderText(route.params.activity.city);
    fireEvent.changeText(input, "activity name or city");
    expect(input.props.value).toEqual("activity name or city");
  });

  it("Place placeholder exists and possible to change", () => {
    const { getByPlaceholderText } = render(
      <ChangeActivity navigation={navigation} route={route} />
    );
    const input = getByPlaceholderText(route.params.activity.place);
    fireEvent.changeText(input, "activity name or place");
    expect(input.props.value).toEqual("activity name or place");
  });
  it("Description placeholder exists and possible to change", () => {
    const { getByPlaceholderText } = render(
      <ChangeActivity navigation={navigation} route={route} />
    );
    const input = getByPlaceholderText(route.params.activity.description);
    fireEvent.changeText(input, "activity name or description");
    expect(input.props.value).toEqual("activity name or description");
  });

  it("Change image button exists and navigate to ImagesGallery when pressed", () => {
    const { getByTestId } = render(
      <ChangeActivity navigation={navigation} route={route} />
    );

    const changeImageButton = getByTestId("navigateToImagesGallery");
    expect(changeImageButton.children[0].props.children.props.children).toEqual(
      "Ändra bild"
    );

    fireEvent.press(changeImageButton);
    expect(navigation.navigate).toHaveBeenCalledWith("ImagesGallery", {
      activity: route.params.activity,
      tgPopular: route.params.tgPopular,
      cameFrom: "ChangeActivity",
      selectedImage: { photo: "symbol_earth", imageUrl: "" },
    });
  });

  it("Button 'Save' exist and updates ActivityCard when pressed", () => {
    const { getByText } = render(
      <ChangeActivity navigation={navigation} route={route} />
    );

    const saveButton = getByText("Spara");
    expect(saveButton);

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
      imageUrl: "",
    };

    expect(navigation.navigate).toHaveBeenCalledWith("ActivityCard", {
      activityInfo: changedObject,
      admin: true,
      active: true,
      tgPopular: route.params.tgPopular,
    });
  });

  it("Button 'Back' exist and navigate back when pressed", () => {
    const { getByText } = render(
      <ChangeActivity navigation={navigation} route={route} />
    );

    const cancelButton = getByText("Avbryt");
    expect(cancelButton);
    fireEvent.press(cancelButton);
    expect(navigation.goBack).toHaveBeenCalled();
  });
});
