import "react-native";
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import { CreateUserForm } from "../../components";
import { InputField } from "../../components/InputField";
jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("@react-navigation/native");

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));
const mockedNavigate = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));
const navigationMock = { goBack: jest.fn() };



describe("Testing CreateUserForm ", () => {

    it('Should be possible to write to write user name', () => {
        const { getByPlaceholderText } = render(<CreateUserForm />);
        const inputField = getByPlaceholderText('Förnamn');
        fireEvent.changeText(inputField, 'John');
        expect(inputField.props.value).toBe('John');
      });
      it('Should be minimum one letter in name',async () => {
        const { getByPlaceholderText,getByText} = render(<CreateUserForm />);
        const inputField = getByPlaceholderText('Förnamn');
        fireEvent.changeText(inputField, '');
        expect(inputField.props.value).toBe('');
        const nextButton= getByText("Nästa")
        fireEvent.press(nextButton);
        await waitFor(() => {
          expect(getByText("* Förnamn måste innehålla minst 1 tecken")).toBeTruthy();
        })
       
        });
        it('Should be maximum 30 characters in name', async () => {
          const { getByPlaceholderText, getByText} = render(<CreateUserForm />);
          const inputField = getByPlaceholderText('Förnamn');
          fireEvent.changeText(inputField, 'This is a name with more than 30 characters');
          expect(inputField.props.value).toBe('This is a name with more than 30 characters');
          const nextButton = getByText("Nästa");
          fireEvent.press(nextButton);
          await waitFor(() => {
            expect(getByText("* Förnamn kan innehålla max 30 tecken")).toBeTruthy();
          });
        });
        it('Should disable space befor and after the name',() => {
          const { getByPlaceholderText } = render(<CreateUserForm />);
          const inputField = getByPlaceholderText('Förnamn');
          fireEvent.changeText(inputField, ' Erik Hanson  ');
          expect(inputField.props.value.trim()).toBe('Erik Hanson');
          
          });
        
        it('Should be possible to write sur name', () => {
          const { getByPlaceholderText } = render(<CreateUserForm />);
          const inputField = getByPlaceholderText('Efternamn');
          fireEvent.changeText(inputField, 'Andersson');
          expect(inputField.props.value).toBe('Andersson');
        });

        it('Should be minimum one letter in Sur name',async () => {
          const { getByPlaceholderText,getByText} = render(<CreateUserForm />);
          const inputField = getByPlaceholderText('Efternamn');
          fireEvent.changeText(inputField, '');
          expect(inputField.props.value).toBe('');
          const nextButton= getByText("Nästa")
          fireEvent.press(nextButton);
          await waitFor(() => {
            expect(getByText("* Efternamn måste innehålla minst 1 tecken")).toBeTruthy();
          })
         
          });
          it('Should be maximum 30 characters in sur name', async () => {
            const { getByPlaceholderText, getByText} = render(<CreateUserForm />);
            const inputField = getByPlaceholderText('Efternamn');
            fireEvent.changeText(inputField, 'This is a password with more than 30 characters');
            expect(inputField.props.value).toBe('This is a password with more than 30 characters');
            const nextButton = getByText("Nästa");
            fireEvent.press(nextButton);
            await waitFor(() => {
              expect(getByText("* Förnamn kan innehålla max 30 tecken")).toBeTruthy();
            });
          });
          it('Should disable space befor and after the sur name',() => {
            const { getByPlaceholderText } = render(<CreateUserForm />);
            const inputField = getByPlaceholderText('Efternamn');
            fireEvent.changeText(inputField, ' fdsffvg  ');
            expect(inputField.props.value.trim()).toBe('fdsffvg');
            
            });

            it('Should be Write an email address',async () => {
              const { getByPlaceholderText,getByText,getAllByText} = render(<CreateUserForm />);
              const inputField = getByPlaceholderText('E-mail');
              fireEvent.changeText(inputField, '');
              expect(inputField.props.value).toBe('');
              const nextButton= getByText("Nästa")
              fireEvent.press(nextButton);
              await waitFor(() => {
                expect(getAllByText("* Obligatorisk")[2]).toBeTruthy();
              })
             
              });

              it('Should be Write an valid email address',async () => {
                const { getByPlaceholderText,getByText} = render(<CreateUserForm />);
                const inputField = getByPlaceholderText('E-mail');
                fireEvent.changeText(inputField, 'hghjhghghjh');
                expect(inputField.props.value).toBe('hghjhghghjh');
                const nextButton= getByText("Nästa")
                fireEvent.press(nextButton);
                await waitFor(() => {
                  expect(getByText("* Ange en giltig e-mail")).toBeTruthy();
                })
               
                });
                it('Should progress to next step when a valid email is entered', async () => {
                  const { getByPlaceholderText, getByText, queryAllByText } = render(<CreateUserForm />);
                  const emailInput = getByPlaceholderText('E-mail');
              
                  fireEvent.changeText(emailInput, 'test@example.com'); 
              
                  const nextButton = getByText('Nästa');
                  fireEvent.press(nextButton);
              
                  await waitFor(() => {
                    expect(queryAllByText('* Obligatorisk')).toHaveLength(0); 
                  });
                });
                it('Should display error message when emails do not match', async () => {
                  const { getByPlaceholderText, getByText, getAllByText } = render(<CreateUserForm />);
                  const emailInput = getByPlaceholderText('E-mail');
                  const confirmEmailInput = getByPlaceholderText('Bekräfta E-mail');
              
                  fireEvent.changeText(emailInput, 'test@example.com');
                  fireEvent.changeText(confirmEmailInput, 'test@example.org'); 
              
                  const nextButton = getByText('Nästa');
                  fireEvent.press(nextButton);
              
                  await waitFor(() => {
                    expect(getAllByText('Överensstämmer inte')[0]).toBeTruthy(); 
                  });
                });
                it('Should display error message when confirmation email is not entered', async () => {
                  const { getByPlaceholderText, getByText, getAllByText } = render(<CreateUserForm />);
                  const confirmEmailInput = getByPlaceholderText('Bekräfta E-mail');
                
                  fireEvent.changeText(confirmEmailInput, ''); 
                  expect(confirmEmailInput.props.value).toBe('');
                
                  const nextButton = getByText('Nästa');
                  fireEvent.press(nextButton);
                
                  await waitFor(() => {
                    expect(getAllByText('* Obligatorisk')[2]).toBeTruthy(); 
                  });
                });
                it('Should allows typing in email field', async () => {
                  const { getByPlaceholderText, getByText, getAllByText } = render(<CreateUserForm />);
                  const emailInput = getByPlaceholderText('E-mail');
                  fireEvent.changeText(emailInput, 'test@example.com');
                  expect(emailInput.props.value).toBe('test@example.com');
 
                });
                // it(' Should disables paste option in email', () => {
                //   const { getByTestId } = render(<CreateUserForm />);
                //   const textInput = getByTestId('E-mail');
                //   fireEvent.longPress(textInput);
              
                //   const contextMenu = getByTestId('contextMenuHidden');
                //   expect(contextMenu).toBeTruthy();
                // });
              
                

      

  
  });
  