import "react-native";
import React from "react";
import { render, fireEvent, waitFor, } from "@testing-library/react-native";

import { CreateUserForm } from "../../components";
import { Role } from "../../utilily/enums";
import userLevelStore from '../../store/userLevel'
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


const superAdmin = () => {
  userLevelStore.setUserLevel(Role.superadmin);
};



describe("Testing CreateUserForm ", () => {

    it('Should be possible to write to write user name', () => {
        const { getByPlaceholderText} = render(<CreateUserForm />);
        const inputField = getByPlaceholderText('Förnamn');
        fireEvent.changeText(inputField, 'John');
        expect(inputField.props.value).toBe('John');
      });
      it('Should be minimum one letter in name',async () => {
        const { getByPlaceholderText,getByText,getByTestId} = render(<CreateUserForm />);
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
            const { getByPlaceholderText , getByTestId} = render(<CreateUserForm />);
            const inputField = getByPlaceholderText('Efternamn');
            fireEvent.changeText(inputField, ' fdsffvg  ');
            expect(inputField.props.value.trim()).toBe('fdsffvg');
            
            });

            it('Should be Write an email address',async () => {
              const { getByPlaceholderText,getByText, getByTestId} = render(<CreateUserForm />);
              const inputField = getByPlaceholderText('E-mail');
              fireEvent.changeText(inputField, '');
              expect(inputField.props.value).toBe('');
              const nextButton= getByText("Nästa")
              fireEvent.press(nextButton);
              await waitFor(() => {
                const errorMessage = getByTestId("input-error-email")
                expect(errorMessage.props.children).toBe('* Obligatorisk');
              })
             
              });

              it('Should be Write an valid email address',async () => {
                const { getByPlaceholderText,getByText,getByTestId} = render(<CreateUserForm />);
                const inputField = getByPlaceholderText('E-mail');
                fireEvent.changeText(inputField, 'hghjhghghjh');
                expect(inputField.props.value).toBe('hghjhghghjh');
                const nextButton= getByText("Nästa")
                fireEvent.press(nextButton);
                await waitFor(() => {
                  const errorMessage = getByTestId("input-error-email")
                  expect(errorMessage.props.children).toBe('* Ange en giltig e-mail');
                })
               
                });
              //   it('Should progress to next step when a valid email is entered', async () => {
              //     const { getByPlaceholderText, getByText, getAllByText , debug} = render(<CreateUserForm />);
              //     const emailInput = getByPlaceholderText('E-mail');
              
              //     fireEvent.changeText(emailInput, 'test@example.com'); 
              
              //     const nextButton = getByText('Nästa');
              //     fireEvent.press(nextButton);
              // debug()
              //     await waitFor(() => {
              //       expect(getAllByText('* Obligatorisk')[0]).toBeTruthy(); 
              //     });
              //   });
                it('Should display error message when emails do not match', async () => {
                  const { getByPlaceholderText, getByText,getByTestId} = render(<CreateUserForm />);
                  const emailInput = getByPlaceholderText('E-mail');
                  const confirmEmailInput = getByPlaceholderText('Bekräfta E-mail');
              
                  fireEvent.changeText(emailInput, 'test@example.com');
                  fireEvent.changeText(confirmEmailInput, 'test@example.org'); 
              
                  const nextButton = getByText('Nästa');
                  fireEvent.press(nextButton);
              
                  await waitFor(() => {
                    const errorMessage = getByTestId("input-error-confirm-email")
                    expect(errorMessage.props.children).toBe("Överensstämmer inte");
                  });
                });
                it('Should display error message when confirmation email is not entered', async () => {
                  const { getByPlaceholderText, getByText, getAllByText,getByTestId } = render(<CreateUserForm />);
                  const confirmEmailInput = getByPlaceholderText('Bekräfta E-mail');
                
                  fireEvent.changeText(confirmEmailInput, ''); 
                  expect(confirmEmailInput.props.value).toBe('');
                
                  const nextButton = getByText('Nästa');
                  fireEvent.press(nextButton);
                
                  await waitFor(() => {
                    const errorMessage = getByTestId("input-error-confirm-email")
                    expect(errorMessage.props.children).toBe("Överensstämmer inte");               
                  });
                });
                it('Should allows typing in email field', async () => {
                  const { getByPlaceholderText } = render(<CreateUserForm />);
                  const emailInput = getByPlaceholderText('E-mail');
                  fireEvent.changeText(emailInput, 'test@example.com');
                  expect(emailInput.props.value).toBe('test@example.com');
 
                });
                it(' Should disables paste option in email', () => {
                  const { getByPlaceholderText } = render(<CreateUserForm />);
                  const textInput = getByPlaceholderText('E-mail');
                  expect(textInput.props.contextMenuHidden).toBe(true);
                });
                it('Should be enter a password',async () => {
                  const { getByPlaceholderText,getByText, getByTestId, debug} = render(<CreateUserForm />);
                  const inputField = getByPlaceholderText('Lösenord');
                  fireEvent.changeText(inputField, '');
                  expect(inputField.props.value).toBe('');
                  const nextButton= getByText("Nästa")
                  fireEvent.press(nextButton);
               
                  await waitFor(() => {
                    debug()
                    const errorMessage = getByTestId("input-error-password")
                    expect(errorMessage.props.children).toBe('* Lösenordet måste innehålla minst 6 tecken');
                  })
                 
                  });
                  it('Should toggles password visibility when icon is pressed',async () => {

                    const { getByPlaceholderText,getByTestId,queryByTestId} = render(<CreateUserForm />);
                    const inputField = getByPlaceholderText('Lösenord');
                    expect(inputField.props.secureTextEntry).toBe(true);
                  
      
                    fireEvent.press(getByTestId('visibility-off-icon'));
                    expect(inputField.props.secureTextEntry).toBe(false)
                    expect(queryByTestId('visibility-off-icon'))

                    fireEvent.press(getByTestId('visibility-icon'));
                    expect(inputField.props.secureTextEntry).toBe(true);
                   
                    });



                    it('Should  select a role if superadmin otherwise show error',async () => {
                      superAdmin()
                      const { getByText,getByTestId,  } = render(<CreateUserForm />);
                      const nextButton= getByText("Nästa")
                      fireEvent.press(nextButton);
                  
                      await waitFor(() => {
                        const errorMessage = getByTestId('role-error');
                        expect(errorMessage.props.children).toBe('* Obligatorisk');
                      });
                     
                      })

                        it('Can open drop down to select role',async () => {
                        superAdmin()
                        const { getByText,getByTestId,  } = render(<CreateUserForm />);
                        const dropDownList=getByTestId("role-item")
                        fireEvent.press(dropDownList)
                        expect(dropDownList.value)
                    
                      }); 

                      // it('Can open drop down to select role',async () => {
                      //   superAdmin()
                      //   const { getByText,getByTestId,  } = render(<CreateUserForm />);
                      //   const dropDownList=getByTestId("role-item")
                      //   expect(getByTestId('role-item').props.children).toBe('Behörighet');
                      //   fireEvent.press(dropDownList)
                      //   await waitFor(() => {
                      //     fireEvent.press(getByTestId('arrow-drop-down-icon'))
                      //     expect
              
                         
                      //   });
 
                    
                      // }); 
                      

                      // it('Should  select a role if superadmin chhose user',async () => {
                      //   superAdmin()
                      //   const { getByText,getByTestId,  } = render(<CreateUserForm />);
                     
                        
                      //   const nextButton= getByText("Nästa")
                      //   fireEvent.press(nextButton);
                    
                      //   await waitFor(() => {
                      //     const userRole = getByText('role-item');
                      //     expect(userRole.props.value).toBe('user');
                      //   });
                      // }); 


  
  });
  