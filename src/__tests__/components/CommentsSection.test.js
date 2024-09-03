import React, { PropsWithChildren } from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { CommentsSection } from "../../components/ChartCard/ChatComments/CommentsSection";
import { Role } from "../../utility/enums";
import { UserLevelProvider } from "../../context/useUserLevel";
import { EventProvider } from "react-native-outside-press";

jest.mock("@react-native-firebase/firestore", () => {
  return jest.fn();
});

jest.mock("@react-native-firebase/storage", () => {
  return {
    ref: jest.fn(() => ({
      getDownloadURL: jest.fn(),
      putFile: jest.fn(),
    })),
  };
});

jest.mock("@react-native-firebase/crashlytics", () => () => ({
  crashlytics: jest.fn(),
}));

jest.mock("../../context/SuperAdminContext", () => ({
  useSuperAdminFunction: () => ({
    setGetAllUsers: jest.fn(),
    userLevel: jest.fn(),
  }),
}));

let mockUserLevel = Role.user;

jest.mock("../../context/useUserLevel", () => ({
  useUserLevel: () => ({
    userLevel: mockUserLevel,
  }),
}));

const mockAddComment = jest.fn();
const mockDeleteComment = jest.fn();

const loggedInUser = {
  id: "user1",
  activitiesAndAccumulatedTime: [],
  connectedActivities: [],
  firstName: "Erik",
  lastName: "Andersson",
  statusActive: true,
};
const anotherUser = {
  id: "user4",
  activitiesAndAccumulatedTime: [],
  connectedActivities: [],
  firstName: "Alex",
  lastName: "Johnson",
  statusActive: true,
};

const comments = [
  {
    comment: "First comment",
    userID: "user2",
    userFirstName: "John",
    userLastName: "Doe",
  },
  {
    comment: "Second comment",
    userID: "user3",
    userFirstName: "Jane",
    userLastName: "Smith",
  },
  {
    comment: "Third comment",
    userID: "user1",
    userFirstName: "Erik",
    userLastName: "Andersson",
  },
];

jest.mock("react-native-outside-press", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: ({ children }) =>
      React.createElement(React.Fragment, null, children),
  };
});
describe("Testing CommentsSection Component", () => {
  it("renders comments correctly", () => {
    mockUserLevel = Role.user;
    const { getByText } = render(
      <CommentsSection
        comments={comments}
        addComment={mockAddComment}
        deleteComment={mockDeleteComment}
        loggedInUser={loggedInUser}
        postID="post1"
      />,
      { wrapper: UserLevelProvider },
    );

    expect(getByText("John Doe")).toBeTruthy();
    expect(getByText("First comment")).toBeTruthy();
    expect(getByText("Jane Smith")).toBeTruthy();
    expect(getByText("Second comment")).toBeTruthy();
    expect(getByText("Erik Andersson")).toBeTruthy();
    expect(getByText("Third comment")).toBeTruthy();
  });

  it("should add a comment", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <CommentsSection
        comments={comments}
        addComment={mockAddComment}
        deleteComment={mockDeleteComment}
        loggedInUser={loggedInUser}
        postID="post1"
      />,
    );

    const input = getByPlaceholderText("Skriv en kommentar");
    const submitButton = getByTestId("arrow-upward");

    fireEvent.changeText(input, "New Comment");
    fireEvent.press(submitButton);
    expect(mockAddComment).toHaveBeenCalledWith({
      comment: "New Comment",
      userID: loggedInUser.id,
      userFirstName: loggedInUser.firstName,
      userLastName: loggedInUser.lastName,
    });
  });

  it("shows delete option only for logged in user comment", () => {
    mockUserLevel = Role.user;
    const { getByTestId } = render(
      <CommentsSection
        comments={comments}
        addComment={mockAddComment}
        deleteComment={mockDeleteComment}
        loggedInUser={loggedInUser}
        postID="post1"
      />,
      { wrapper: UserLevelProvider },
    );
    const editMenu = getByTestId("chat-card-edit-menu");
    expect(editMenu).toBeTruthy();
  });

  it("Superadmin should see delete option for all comments", () => {
    mockUserLevel = Role.superadmin;
    const { getAllByTestId } = render(
      <CommentsSection
        comments={comments}
        addComment={mockAddComment}
        deleteComment={mockDeleteComment}
        loggedInUser={loggedInUser}
        postID="post1"
      />,
      { wrapper: UserLevelProvider },
    );
    const editMenu = getAllByTestId("chat-card-edit-menu");
    expect(editMenu).toHaveLength(3);
  });
  it("Delete option not visible for others comments", () => {
    mockUserLevel = Role.user;
    const { queryByTestId } = render(
      <CommentsSection
        comments={comments}
        addComment={mockAddComment}
        deleteComment={mockDeleteComment}
        loggedInUser={anotherUser}
        postID="post1"
      />,
      { wrapper: UserLevelProvider },
    );

    const editMenu = queryByTestId("chat-card-edit-menu");
    expect(editMenu).toBeFalsy();
  });
  it("Should delete comment when user who wrote it pressing delete", async () => {
    mockUserLevel = Role.user;
    const { getByTestId, debug } = render(
      <CommentsSection
        comments={comments}
        addComment={mockAddComment}
        deleteComment={mockDeleteComment}
        loggedInUser={loggedInUser}
        postID="post1"
      />,
      { wrapper: UserLevelProvider },
    );

    const deleteMenu = getByTestId("chat-card-edit-menu");
    fireEvent.press(deleteMenu);

    const deleteButton = getByTestId("dropdown-overlay-ta bort");
    fireEvent.press(deleteButton);
    debug();

    // TODO: mock alert to test delet function

    // await waitFor(() => {
    //   expect(mockAlert).toHaveBeenCalledWith(
    //     '',
    //     'Vill du ta bort den här kommentar?',
    //     // expect.any(Array)
    //   );

    // expect(mockDeleteComment).toBeTruthy();
    //   expect(mockDeleteComment).toHaveBeenCalledWith({
    //     comment: 'Third comment',
    //     userID: loggedInUser.id,
    //     userFirstName: loggedInUser.firstName,
    //     userLastName: loggedInUser.lastName,
    //   }, 'post1');
    //  });
  });
});
