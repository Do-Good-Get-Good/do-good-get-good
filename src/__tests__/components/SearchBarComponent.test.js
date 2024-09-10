import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import "react-native";
import { SearchBarComponent } from "../../components/SearchBarComponent";
import {
  activityArray,
  user1,
  user2,
  userArray,
} from "../../dataMock/arrayToSearchMock";

describe("Testing SearchBarComponent", () => {
  it("TextInput  exist and it's possible to wrire a text there", () => {
    const { getByTestId } = render(
      <SearchBarComponent arrayToSearch={[]} keys={[]} onSearch={jest.fn()} />
    );
    const input = getByTestId("searchbar-input");
    const textToSearch = "activity name or user name or anything else";
    fireEvent.changeText(input, textToSearch);
    expect(input.props.value).toEqual(textToSearch);
  });
});

describe("Testing SearchBarComponent should work for different types. Filter function should work and return filtered arrayToSearch depend on Textinput. Try different types and keys", () => {
  it("User type. Filer by first name ", () => {
    const mockOnSearch = jest.fn();
    const { getByTestId } = render(
      <SearchBarComponent
        arrayToSearch={userArray}
        keys={["firstName"]}
        onSearch={mockOnSearch}
      />
    );
    const input = getByTestId("searchbar-input");

    fireEvent.changeText(input, "John");

    expect(mockOnSearch).toHaveBeenCalledWith([user1]);

    fireEvent.changeText(input, "Hanna");
    expect(mockOnSearch).toHaveBeenCalledWith([]);
  });

  it("User type.Filter by by KEYS: firstname and lastname. If lastname is the same should return both objects", () => {
    const mockOnSearch = jest.fn();
    const { getByTestId } = render(
      <SearchBarComponent
        arrayToSearch={userArray}
        keys={["firstName", "lastName"]}
        onSearch={mockOnSearch}
      />
    );
    const input = getByTestId("searchbar-input");
    fireEvent.changeText(input, "Andersson");
    expect(mockOnSearch).toHaveBeenCalledWith(userArray);
  });

  it("User type.Filter by KEYS: firstname and lastname. if lastname is the same but firts name is dfferent it should rerurn one object. Should react even if we typed only beggining on the name", () => {
    const mockOnSearch = jest.fn();
    const { getByTestId } = render(
      <SearchBarComponent
        arrayToSearch={userArray}
        keys={["firstName", "lastName"]}
        onSearch={mockOnSearch}
      />
    );
    const input = getByTestId("searchbar-input");
    fireEvent.changeText(input, "Er Andersson");
    expect(mockOnSearch).toHaveBeenCalledWith([user2]);
  });

  it("User type.Filter by KEYS: firstname and lastname. if lastname and firtstname are dfferent it should rerurn an empty array", () => {
    const mockOnSearch = jest.fn();
    const { getByTestId } = render(
      <SearchBarComponent
        arrayToSearch={userArray}
        keys={["firstName", "lastName"]}
        onSearch={mockOnSearch}
      />
    );
    const input = getByTestId("searchbar-input");
    fireEvent.changeText(input, "err hgjf");
    expect(mockOnSearch).toHaveBeenCalledWith([]);
  });

  it("Activity type.Filter by KEYS: city, place and title. it should rerurn objects where exist word Gothenburg in the title or city or place", () => {
    const mockOnSearch = jest.fn();
    const { getByTestId } = render(
      <SearchBarComponent
        arrayToSearch={activityArray}
        keys={["title", "city", "place"]}
        onSearch={mockOnSearch}
      />
    );
    const input = getByTestId("searchbar-input");
    fireEvent.changeText(input, " Gothenburg");
    expect(mockOnSearch).toHaveBeenCalledWith([
      activityArray[1],
      activityArray[2],
    ]);
  });

  it("Activity type.Filter by KEYS: city, place and title. it should rerurn all the  objects which includes that word help or pet", () => {
    const mockOnSearch = jest.fn();
    const { getByTestId } = render(
      <SearchBarComponent
        arrayToSearch={activityArray}
        keys={["title", "city", "place"]}
        onSearch={mockOnSearch}
      />
    );
    const input = getByTestId("searchbar-input");
    fireEvent.changeText(input, " help pet");
    expect(mockOnSearch).toHaveBeenCalledWith(activityArray);
  });

  it("It should be case-insensitivce", () => {
    const mockOnSearch = jest.fn();
    const { getByTestId } = render(
      <SearchBarComponent
        arrayToSearch={activityArray}
        keys={["title", "city", "place"]}
        onSearch={mockOnSearch}
      />
    );
    const input = getByTestId("searchbar-input");
    fireEvent.changeText(input, "GOtHEnBUrG");
    expect(mockOnSearch).toHaveBeenCalledWith([
      activityArray[1],
      activityArray[2],
    ]);
  });

  it("It should be a space-insensitivce", () => {
    const mockOnSearch = jest.fn();
    const { getByTestId } = render(
      <SearchBarComponent
        arrayToSearch={activityArray}
        keys={["title", "city", "place"]}
        onSearch={mockOnSearch}
      />
    );
    const input = getByTestId("searchbar-input");
    fireEvent.changeText(
      input,
      "         help              dogs              "
    );
    expect(mockOnSearch).toHaveBeenCalledWith([activityArray[0]]);
  });
});
