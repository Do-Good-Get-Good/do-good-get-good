import "react-native";
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ChatCard from "../../components/ChartCard/ChatCard";

const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

const today = new Date();

const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const longerThanYesterday = new Date("2024-07-06");

const longerThanYesterdayPost = {
  description: "Test Description",
  date: longerThanYesterday,
  activityTitle: "Mock Activity",
  activityImage: "symbol_sport",
  userFirstName: "John",
  userLastName: "Doe",
  userID: "user1",
  activityCity: "Mock City",
  imageURL: "sampleImageUrl",
  emoji: [],
};

const yesterdayPost = {
  description: "Test Description",
  date: yesterday,
  activityTitle: "Mock Activity",
  activityImage: "symbol_sport",
  userFirstName: "John",
  userLastName: "Doe",
  userID: "user1",
  activityCity: "Mock City",
  imageURL: "sampleImageUrl",
  emoji: [],
};

const post = {
  description: "Test Description",
  date: new Date(),
  activityTitle: "Mock Activity",
  activityImage: "symbol_sport",
  userFirstName: "John",
  userLastName: "Doe",
  userID: "user1",
  activityCity: "Mock City",
  imageURL: "sampleImageUrl",
  emoji: [
    {
      emojiName: "😊",
      userID: "user1",
      userFirstName: "Erik",
      userLastName: "Andersson",
    },
  ],
  comments: [
    {
      id: 1,
      comment: "First comment",
      userID: "user2",
      userFirstName: "John",
      userLastName: "Doe",
    },
    {
      id: 2,
      comment: "Second comment",
      userID: "user3",
      userFirstName: "Erik",
      userLastName: "Andersson",
    },
  ],
};

const loggedInUser = {
  id: "user1",
  activitiesAndAccumulatedTime: [],
  connectedActivities: [],
  firstName: "Erik",
  lastName: "Andersson",
  statusActive: true,
};

describe("Testing ChatCardComponent", () => {
  it("Testing ChatCardDate component should show text Igår if post is done yesturday", () => {
    const { getByTestId } = render(
      <ChatCard
        post={yesterdayPost}
        onDelete={() => {}}
        addEmoji={() => {}}
        deleteEmoji={() => {}}
        loggedInUser={loggedInUser}
      />,
    );
    const chatCardDate = getByTestId("chat-card-date");
    expect(chatCardDate).toBeTruthy();
    expect(chatCardDate.props.children).toEqual("Igår");
  });

  it("Testing ChatCardDate component should show text Idag if post is done today", () => {
    const { getByTestId } = render(
      <ChatCard
        post={post}
        onDelete={() => {}}
        addEmoji={() => {}}
        deleteEmoji={() => {}}
        loggedInUser={loggedInUser}
      />,
    );
    const chatCardDate = getByTestId("chat-card-date");
    expect(chatCardDate).toBeTruthy();
    expect(chatCardDate.props.children).toEqual("Idag");
  });

  it("Testing ChatCardDate component should show the full date if post is done the longer than yesturday", () => {
    const { getByTestId } = render(
      <ChatCard
        post={longerThanYesterdayPost}
        onDelete={() => {}}
        addEmoji={() => {}}
        deleteEmoji={() => {}}
        loggedInUser={loggedInUser}
      />,
    );

    const chatCardDate = getByTestId("chat-card-date");
    expect(chatCardDate).toBeTruthy();
    expect(chatCardDate.props.children).toEqual("06.07.2024");
  });

  it("Testing ChatCardHeadercomponent to ensure it renders with correct data", () => {
    const { getByTestId, getByText } = render(
      <ChatCard
        post={post}
        onDelete={() => {}}
        addEmoji={() => {}}
        deleteEmoji={() => {}}
        loggedInUser={loggedInUser}
      />,
    );
    const chatCardHeader = getByTestId("chat-card-header");
    expect(chatCardHeader).toBeTruthy();
    expect(getByText("Mock Activity")).toBeTruthy();
    expect(getByText("Mock City")).toBeTruthy();
    expect(getByText("John Doe")).toBeTruthy();
    const activityImage = getByTestId("chat-card-header-image");
    expect(activityImage.props.source.testUri).toBe(
      "../../../assets/images/activities/symbol_sport.png",
    );
  });

  it("Testing ChatCardImage component to ensure it renders  with correct data", () => {
    const { getByTestId } = render(
      <ChatCard
        post={post}
        onDelete={() => {}}
        addEmoji={() => {}}
        deleteEmoji={() => {}}
        loggedInUser={loggedInUser}
      />,
    );
    const chatCardImage = getByTestId("chat-card-image");
    expect(chatCardImage).toBeTruthy();
    expect(chatCardImage.props.source.uri).toBe(post.imageURL);
  });

  it("Testing ChatCardDescription component to ensure it renders with correct data", () => {
    const { getByText } = render(
      <ChatCard
        post={post}
        onDelete={() => {}}
        addEmoji={() => {}}
        deleteEmoji={() => {}}
        loggedInUser={loggedInUser}
      />,
    );
    expect(getByText("Test Description")).toBeTruthy();
  });

  it("Testing ChatCardEditMenu component is rendered", () => {
    const onDeleteMock = jest.fn();
    const onEditeMock = jest.fn();
    const { getByTestId, getByText } = render(
      <ChatCard
        post={post}
        onDelete={onDeleteMock}
        addEmoji={() => {}}
        deleteEmoji={() => {}}
        loggedInUser={loggedInUser}
      />,
    );
    const chatCardEditMenu = getByTestId("chat-card-edit-menu");
    expect(chatCardEditMenu).toBeTruthy();
    fireEvent.press(chatCardEditMenu);
    expect(getByText("Ta bort")).toBeTruthy();
    fireEvent.press(getByText("Ta bort"));
    expect(onDeleteMock).toBeTruthy();
    fireEvent.press(chatCardEditMenu);
    expect(getByText("Ändra")).toBeTruthy();
    expect(onEditeMock).toBeTruthy();
  });

  it("Testing ChatCard does not render ChatCardEditMenu when isCurrentUser is false", () => {
    const { queryByTestId } = render(
      <ChatCard
        post={post}
        onDelete={() => {}}
        addEmoji={() => {}}
        deleteEmoji={() => {}}
        loggedInUser={!loggedInUser}
      />,
    );
    const chatCardEditMenu = queryByTestId("chat-card-edit-menu");
    expect(chatCardEditMenu).toBeFalsy();
  });

  it("Testing ChatCard component touchability", () => {
    const { getByTestId } = render(
      <ChatCard
        post={post}
        onDelete={() => {}}
        addEmoji={() => {}}
        deleteEmoji={() => {}}
        loggedInUser={loggedInUser}
      />,
    );
    const chatCard = getByTestId("chat-card");
    fireEvent.press(chatCard);
  });
  it("Rendering ChatCard with ChatCardEmoji", () => {
    const { getByTestId } = render(
      <ChatCard
        post={post}
        onDelete={() => {}}
        addEmoji={() => {}}
        deleteEmoji={() => {}}
        loggedInUser={loggedInUser}
        commentsCount={0}
      />,
    );

    const chatCardEmoji = getByTestId("chat-card-emoji");
    expect(chatCardEmoji).toBeTruthy();
  });

  it("Adding Emoji in ChatCardEmoji", () => {
    const addEmojiMock = jest.fn();
    const deleteEmojiMock = jest.fn();
    const { getByTestId, getByText } = render(
      <ChatCard
        post={post}
        onDelete={() => {}}
        addEmoji={addEmojiMock}
        deleteEmoji={() => {}}
        loggedInUser={loggedInUser}
        commentsCount={0}
      />,
    );

    const chatCardEmoji = getByTestId("chat-card-emoji");
    fireEvent.press(chatCardEmoji);
    expect(addEmojiMock).toBeTruthy();
    expect(getByText("😊")).toBeTruthy();
  });

  it("Deleting Emoji in ChatCardEmoji", () => {
    const deleteEmojiMock = jest.fn();
    const addEmojiMock = jest.fn();

    const { getByText, queryByText } = render(
      <ChatCard
        post={post}
        onDelete={() => {}}
        addEmoji={addEmojiMock}
        deleteEmoji={deleteEmojiMock}
        loggedInUser={loggedInUser}
        commentsCount={post.comments.length}
      />,
    );

    const emojiText = getByText("😊");
    fireEvent.press(emojiText);
    expect(deleteEmojiMock).toHaveBeenCalled();
    expect(queryByText("😊")).toBeNull();
  });

  it("Testing comments count in ChatCard", () => {
    const { getByText } = render(
      <ChatCard
        post={post}
        onDelete={() => {}}
        addEmoji={() => {}}
        deleteEmoji={() => {}}
        loggedInUser={loggedInUser}
        commentsCount={post.comments.length}
      />,
    );
    const commentsCountText = getByText("2 Kommentarer");
    expect(commentsCountText).toBeTruthy();
  });
});
