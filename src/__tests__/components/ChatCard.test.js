import "react-native";
import React from "react";
import {render,fireEvent,waitFor } from "@testing-library/react-native";
import { ChatCard } from "../../components/ChartCard/ChatCard";

const comments=[
  {id:'1',comment:"First comment",userID:'user1'},
  {id:'2',comment:"Second comment",userID:'user2'}
]
const post = {
  description: "Test Description",
  date: new Date(),
  activityTitle: 'Mock Activity',
  activityImage: 'symbol_sport',
  userFirstName: 'John',
  userLastName: 'Doe',
  activityCity: 'Mock City',
  imageURL: 'sampleImageUrl',
  comments:comments
};

const users = [ { 
  id: "user1", 
  activitiesAndAccumulatedTime: [],
  connectedActivities: [],
  firstName: "Erik",
  lastName: "Andersson",
  statusActive: true 
},
{ 
  id: "user2", 
  activitiesAndAccumulatedTime: [],
  connectedActivities: [],
  firstName: "Jerom",
  lastName: "Karlsson",
  statusActive: false 
}];

describe("Testing ChatCardComponent", () => {
 
  //TODO: add handleAddComment function when we add react function

  test('Testing ChatCardDate component to ensure it renders with correct date', () => {
    const { getByTestId } = render(
      <ChatCard post={post} users={users} handleAddComment={() => {}} />
    );
    const chatCardDate = getByTestId('chat-card-date');
    expect(chatCardDate).toBeTruthy();
    expect(chatCardDate.props.children).toEqual('Today');
  });

  test('Testing ChatCardHeadercomponent to ensure it renders with correct data', () => {
    const { getByTestId, getByText } = render(
      <ChatCard post={post} users={users} handleAddComment={() => {}} />
    );
    const chatCardHeader = getByTestId('chat-card-header');
    expect(chatCardHeader).toBeTruthy();
    expect(getByText('Mock Activity')).toBeTruthy();
    expect(getByText('Mock City')).toBeTruthy();
    expect(getByText('John Doe')).toBeTruthy();
    const activityImage= getByTestId("chat-card-header-image")
    expect(activityImage.props.source.testUri).toBe( "../../../assets/images/activities/symbol_sport.png" )
  });

  test('Testing ChatCardImage component to ensure it renders  with correct data', () => {
    const { getByTestId } = render(
      <ChatCard post={post} users={users} handleAddComment={() => {}} />
    );
    const chatCardImage = getByTestId('chat-card-image');
    expect(chatCardImage).toBeTruthy();
    expect(chatCardImage.props.source.uri).toBe(post.imageURL);
  });

  test('Testing ChatCardDescription component to ensure it renders with correct data', () => {
    const { getByTestId,getByText } = render(
      <ChatCard post={post} users={users} handleAddComment={() => {}} />
    );
    expect(getByText('Test Description')).toBeTruthy();  
  });

  test('Testing ChatCardEditMenu component to ensure it renders correctly', () => {
    const { getByTestId,getByText,queryByTestId } = render(
      <ChatCard post={post} users={users} handleAddComment={() => {}} />
    );
    const chatCardMenu= getByTestId('chat-card-edit-menu');
    fireEvent.press(chatCardMenu);
    expect(getByText('Delete')).toBeTruthy();
    fireEvent.press(getByText('Delete'));
  });

  test('Testing ChatCard component touchability', () => {
    const { getByTestId } = render(
      <ChatCard post={post} users={users} handleAddComment={() => {}} />
    );
    const chatCard= getByTestId('chat-card');
    fireEvent.press(chatCard);
  });

  test('Testing CommentsSection component to ensure it renders data correctly', async() => {
    const { getAllByTestId,getByText,debug} = render(
      <ChatCard post={post} users={users} handleAddComment={() => {}} />
    );
    await waitFor(() => {
    const commentsSection = getAllByTestId('comment-user-name');
    const commentsList = getAllByTestId('comment-text');
    debug();
    expect(commentsSection[0].props.children).toBe('Erik Andersson');
    expect(commentsList[0].props.children).toBe('First comment');
    })
  });
});