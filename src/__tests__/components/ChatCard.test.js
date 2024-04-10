import "react-native";
import React from "react";
import {render } from "@testing-library/react-native";
import { ChatCard } from "../../components/ChartCard/ChatCard";

describe("Testing ChatCardComponent", () => {
  const post = {
    description: "Test Description",
    date: new Date(),
    activityTitle: 'Mock Activity',
    userFirstName: 'John',
    userLastName: 'Doe',
    activityCity: 'Mock City',
    imageURL: 'sampleImageUrl'
  };

  const users = [];

  test('renders ChatCardDate component with correct date', () => {
    const { getByTestId } = render(
      <ChatCard post={post} users={users} handleAddComment={() => {}} />
    );

    const chatCardDate = getByTestId('chat-card-date');
    expect(chatCardDate).toBeTruthy();
    expect(chatCardDate.props.children).toEqual('Today');
  });

  test('renders ChatCardHeadercomponent with correct data', () => {
    const { getByTestId, getByText,queryByT } = render(
      <ChatCard post={post} users={users} handleAddComment={() => {}} />
    );

    const chatCardHeader = getByTestId('chat-card-header');
    expect(chatCardHeader).toBeTruthy();
    const  activityTitleText=getByText(post.activityTitle);
    expect(activityTitleText.children[0]).toBe('Mock Activity')
    const  activityCity=getByText(post.activityCity);
    expect(activityCity.children[0]).toBe('Mock City')
    const userFullName = getByText(`${post.userFirstName} ${post.userLastName}`);
    expect(userFullName.children[0]).toBe('John');
    expect(userFullName.children[2]).toBe('Doe');
  //   const image = queryByType('Image');
  // expect(image).toBeDefined();
  // expect(image.props.source.uri).toEqual('mock-image-url');
    
  });
  test('renders ChatCardImage component with correct data', () => {
    const { getByTestId } = render(
      <ChatCard post={post} users={users} handleAddComment={() => {}} />
    );
    const chatCardImage = getByTestId('chat-card-image');
    expect(chatCardImage).toBeTruthy();
    expect(chatCardImage.props.source.uri).toBe(post.imageURL);
  });

  test('renders ChatCardDescription component with correct data', () => {
    const { getByTestId,getByText } = render(
      <ChatCard post={post} users={users} handleAddComment={() => {}} />
    );

    const chatCardDescription= getByTestId('chat-card-description');
    expect(chatCardDescription).toBeTruthy();
    const  descriptionText=getByText(post.description);
    // console.log(descriptionText.children[0],"++++++++++++")
    expect(descriptionText.children[0]).toBe('Test Description')
    
  });
  // test('renders CommentsSection component with correct data', () => {
  //   const { getByTestId,getByText } = render(
  //     <ChatCard post={post} users={users} handleAddComment={() => {}} />
  //   );

  //   const commentsSection= getByTestId('comments-section');
  //   expect(commentsSection).toBeTruthy();
  //   console.log(commentsSection.children,"*************")
  
    
  // });
});
