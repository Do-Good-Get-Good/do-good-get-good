import React from "react";
import {render,fireEvent } from "@testing-library/react-native";
import { CommentsSection } from "../../components/ChartCard/ChatComments/CommentsSection";
import userLevelStore from "../../store/userLevel";
import { Role } from "../../utility/enums";

jest.mock("../../components/ChartCard/ChatCardEditMenu", () => () => {
    return <mockChatCardEditMenu />;
  });


jest.mock("@react-native-firebase/firestore", () => {
    return jest.fn();
  });
  jest.mock('@react-native-firebase/storage', () => {
    return {
      ref: jest.fn(() => ({
        getDownloadURL: jest.fn(),
        putFile: jest.fn(),
      })),
    };
  });
  jest.mock("../../context/SuperAdminContext", () => ({
    useSuperAdminFunction: () => ({
      setGetAllUsers: jest.fn(),
      userLevel: jest.fn(),
    }),
  }));
  

  jest.mock("@react-native-firebase/crashlytics", () => () => ({
    crashlytics: jest.fn(),
  }));

const mockAddComment = jest.fn();
const mockDeleteComment = jest.fn();
const superAdmin = () => {
    userLevelStore.setUserLevel(Role.superadmin);
  };

const loggedInUser = {
    id: "user1", 
    activitiesAndAccumulatedTime: [],
    connectedActivities: [],
    firstName: "Erik",
    lastName: "Andersson",
    statusActive: true 
  };
  

const comments = [
    { comment: 'First comment', userID: '1', userFirstName: 'John', userLastName: 'Doe' },
    { comment: 'Second comment', userID: '2', userFirstName: 'Jane', userLastName: 'Smith' },
    { comment: 'Third comment', userID: '2', userFirstName: 'Erik', userLastName: 'Andersson' }
  ];


describe("Testing CommentsSection Component", () => {
    it('renders comments correctly', () => {
        const { getByText } = render(
          <CommentsSection
            comments={comments}
            addComment={mockAddComment}
            deleteComment={mockDeleteComment}
            loggedInUser={loggedInUser}
            postID="post1"
          />
        );
    
        expect(getByText('John Doe')).toBeTruthy();
        expect(getByText('First comment')).toBeTruthy();
        expect(getByText('Jane Smith')).toBeTruthy();
        expect(getByText('Second comment')).toBeTruthy();
      });

      it('should add a comment', () => {
        const { getByPlaceholderText, getByTestId} = render(
          <CommentsSection
          comments={comments}
          addComment={mockAddComment}
          deleteComment={mockDeleteComment}
          loggedInUser={loggedInUser}
          postID="post1"
        />
        );
    
        const input = getByPlaceholderText('Skriv en kommentar');
        const submitButton = getByTestId('arrow-upward');
    
        fireEvent.changeText(input, 'New Comment');
        fireEvent.press(submitButton);
        expect(mockAddComment).toHaveBeenCalledWith({
          comment: 'New Comment',
          userID: loggedInUser.id,
          userFirstName:loggedInUser.firstName,
          userLastName: loggedInUser.lastName
        });
      });
      it('allows logged in user to delete their own comment', async () => {
        const { getByTestId,getByText,debug} = render(
          <CommentsSection
            comments={comments}
            addComment={mockAddComment}
            deleteComment={mockDeleteComment}
            loggedInUser={loggedInUser}
            postID="post1"
          />
        );

        expect(getByText('Erik Andersson')).toBeTruthy();
        expect(getByText('Third comment')).toBeTruthy();
        // debug()
        // const editMenu= getByTestId("chat-card-edit-menu")
    
      });
    
});
