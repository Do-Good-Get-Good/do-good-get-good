import "react-native";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { SearchBarComponent } from "../../components/SearchBarComponent";
import { mockUser1, mockUserArray } from "../../dataMock/arrayToSearchMock";


describe("Testing SearchBarComponent", () => {
    it("TextInput  exist and it's possible to wrire a text there", () => {
      const { getByTestId} = render(<SearchBarComponent
        arrayToSearch={[]} 
        keys={[]} 
        onSearch={jest.fn() }
        
        />);
      const input = getByTestId("searchbar-input");
      const textToSearch="activity name or user name or anything else"
      fireEvent.changeText(input, textToSearch);
      expect(input.props.value).toEqual(textToSearch);

    });

});
describe("Testing SearchBarComponent should work for different types. Filter function should work and return filtered arrayToSearch depend on Textinput.", () => {
  it("Try different types. User array type. Filer by first name ",()=>{
    const mockOnSearch = jest.fn()
    const { getByTestId} = render(<SearchBarComponent
      arrayToSearch={mockUserArray} 
      keys={["firstName"]} 
      onSearch={mockOnSearch }
      
      />);
    const input = getByTestId("searchbar-input"); 
      fireEvent.changeText(input, "John");
      expect(mockOnSearch).toHaveBeenCalledWith([
      mockUser1
    ]);

      fireEvent.changeText(input,"Hanna");
      expect(mockOnSearch).toHaveBeenCalledWith([]
      )
      
      
  })
});