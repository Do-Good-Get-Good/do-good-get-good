import "react-native";
import React from "react";
import {render } from "@testing-library/react-native";
import { ChatCard } from "../../components/ChartCard/ChatCard";

describe("Testing ChatCardComponent", () => {
  it("", () => {
    const { getByTestId } = render(
        <ChatCard post={post} users={users} handleAddComment={()=>{}} /> 
    );
  });
  
});
