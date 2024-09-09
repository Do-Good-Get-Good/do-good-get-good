import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import "react-native";
import { CreateUserForm } from "../../components";
import { UserLevelProvider } from "../../context/useUserLevel";
import { Role } from "../../utility/enums";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("../../components/Menu", () => () => {
  return <mockMenu />;
});

const mockGoBack = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: mockGoBack,
  }),
}));

let mockUserLevel = Role.user;

jest.mock("../../context/useUserLevel", () => ({
  useUserLevel: () => ({
    userLevel: mockUserLevel,
  }),
}));

describe("Testing CreateUserForm ", () => {
  it("Should be possible to write to write user name", () => {
    const { getByPlaceholderText } = render(<CreateUserForm />);
    const inputField = getByPlaceholderText("Förnamn");
    fireEvent.changeText(inputField, "John");
    expect(inputField.props.value).toBe("John");
  });

  it("Should be minimum one letter in name", async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <CreateUserForm />
    );
    const inputField = getByPlaceholderText("Förnamn");
    fireEvent.changeText(inputField, "");
    expect(inputField.props.value).toBe("");
    const nextButton = getByText("Nästa");
    fireEvent.press(nextButton);
    await waitFor(() => {
      expect(
        getByText("* Förnamn måste innehålla minst 1 tecken")
      ).toBeTruthy();
    });
  });

  it("Should be maximum 30 characters in name", async () => {
    const { getByPlaceholderText, getByText } = render(<CreateUserForm />);
    const inputField = getByPlaceholderText("Förnamn");
    fireEvent.changeText(
      inputField,
      "This is a name with more than 30 characters"
    );
    expect(inputField.props.value).toBe(
      "This is a name with more than 30 characters"
    );
    const nextButton = getByText("Nästa");
    fireEvent.press(nextButton);
    await waitFor(() => {
      expect(getByText("* Förnamn kan innehålla max 30 tecken")).toBeTruthy();
    });
  });

  it("Should disable space befor and after the name", () => {
    const { getByPlaceholderText } = render(<CreateUserForm />);
    const inputField = getByPlaceholderText("Förnamn");
    fireEvent.changeText(inputField, " Erik Hanson  ");
    expect(inputField.props.value.trim()).toBe("Erik Hanson");
  });

  it("Should be possible to write sur name", () => {
    const { getByPlaceholderText } = render(<CreateUserForm />);
    const inputField = getByPlaceholderText("Efternamn");
    fireEvent.changeText(inputField, "Andersson");
    expect(inputField.props.value).toBe("Andersson");
  });

  it("Should be minimum one letter in Sur name", async () => {
    const { getByPlaceholderText, getByText } = render(<CreateUserForm />);
    const inputField = getByPlaceholderText("Efternamn");
    fireEvent.changeText(inputField, "");
    expect(inputField.props.value).toBe("");
    const nextButton = getByText("Nästa");
    fireEvent.press(nextButton);
    await waitFor(() => {
      expect(
        getByText("* Efternamn måste innehålla minst 1 tecken")
      ).toBeTruthy();
    });
  });

  it("Should be maximum 30 characters in sur name", async () => {
    const { getByPlaceholderText, getByText } = render(<CreateUserForm />);
    const inputField = getByPlaceholderText("Efternamn");
    fireEvent.changeText(
      inputField,
      "This is a password with more than 30 characters"
    );
    expect(inputField.props.value).toBe(
      "This is a password with more than 30 characters"
    );
    const nextButton = getByText("Nästa");
    fireEvent.press(nextButton);
    await waitFor(() => {
      expect(getByText("* Förnamn kan innehålla max 30 tecken")).toBeTruthy();
    });
  });

  it("Should disable space befor and after the sur name", () => {
    const { getByPlaceholderText, getByTestId } = render(<CreateUserForm />);
    const inputField = getByPlaceholderText("Efternamn");
    fireEvent.changeText(inputField, " fdsffvg  ");
    expect(inputField.props.value.trim()).toBe("fdsffvg");
  });

  it("Should be Write an email address", async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <CreateUserForm />
    );
    const inputField = getByPlaceholderText("E-mail");
    fireEvent.changeText(inputField, "");
    expect(inputField.props.value).toBe("");
    const nextButton = getByText("Nästa");
    fireEvent.press(nextButton);
    await waitFor(() => {
      const errorMessage = getByTestId("input-error-email");
      expect(errorMessage.props.children).toBe("* Obligatorisk");
    });
  });

  it("Should be Write an valid email address", async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <CreateUserForm />
    );
    const inputField = getByPlaceholderText("E-mail");
    fireEvent.changeText(inputField, "hghjhghghjh");
    expect(inputField.props.value).toBe("hghjhghghjh");
    const nextButton = getByText("Nästa");
    fireEvent.press(nextButton);
    await waitFor(() => {
      const errorMessage = getByTestId("input-error-email");
      expect(errorMessage.props.children).toBe("* Ange en giltig e-mail");
    });
  });

  it("Should display error message when emails do not match", async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <CreateUserForm />
    );
    const emailInput = getByPlaceholderText("E-mail");
    const confirmEmailInput = getByPlaceholderText("Bekräfta E-mail");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(confirmEmailInput, "test@example.org");

    const nextButton = getByText("Nästa");
    fireEvent.press(nextButton);

    await waitFor(() => {
      const errorMessage = getByTestId("input-error-confirm-email");
      expect(errorMessage.props.children).toBe("Överensstämmer inte");
    });
  });

  it("Should display error message when confirmation email is not entered", async () => {
    const { getByPlaceholderText, getByText, getAllByText, getByTestId } =
      render(<CreateUserForm />);
    const confirmEmailInput = getByPlaceholderText("Bekräfta E-mail");

    fireEvent.changeText(confirmEmailInput, "");
    expect(confirmEmailInput.props.value).toBe("");

    const nextButton = getByText("Nästa");
    fireEvent.press(nextButton);

    await waitFor(() => {
      const errorMessage = getByTestId("input-error-confirm-email");
      expect(errorMessage.props.children).toBe("Överensstämmer inte");
    });
  });

  it("Should allows typing in email field", async () => {
    const { getByPlaceholderText } = render(<CreateUserForm />);
    const emailInput = getByPlaceholderText("E-mail");
    fireEvent.changeText(emailInput, "test@example.com");
    expect(emailInput.props.value).toBe("test@example.com");
  });

  it(" Should disables paste option in email", () => {
    const { getByPlaceholderText } = render(<CreateUserForm />);
    const textInput = getByPlaceholderText("E-mail");
    expect(textInput.props.contextMenuHidden).toBe(true);
  });

  it("Should  select a role if superadmin otherwise show error", async () => {
    mockUserLevel = Role.superadmin;
    const { getByText, getByTestId } = render(<CreateUserForm />, {
      wrapper: UserLevelProvider,
    });
    const nextButton = getByText("Nästa");
    fireEvent.press(nextButton);

    await waitFor(() => {
      const errorMessage = getByTestId("role-error");
      expect(errorMessage.props.children).toBe("* Obligatorisk");
    });
  });

  it("Can open drop down and see role options", async () => {
    mockUserLevel = Role.superadmin;
    const { getByTestId, queryByTestId } = render(<CreateUserForm />, {
      wrapper: UserLevelProvider,
    });
    const dropDownList = getByTestId("role-item");
    expect(getByTestId("role-item").props.children).toBe("Behörighet");
    expect(getByTestId("arrow-drop-down-icon")).toBeTruthy();
    fireEvent.press(dropDownList);
    const dropUpIcon = getByTestId("arrow-drop-up-icon");

    await waitFor(() => {
      expect(dropUpIcon).toBeTruthy();
    });
    fireEvent.press(dropUpIcon);
    await waitFor(() => {
      expect(getByTestId("arrow-drop-down-icon")).toBeTruthy();
      expect(queryByTestId("arrow-drop-up-icon")).toBeNull();
    });
    fireEvent.press(dropDownList);
    expect(getByTestId("role-item-user")).toBeTruthy();
    expect(getByTestId("role-item-admin")).toBeTruthy();
    expect(getByTestId("role-item-superadmin")).toBeTruthy();
  });

  it("Should  select a role if superadmin choose user", async () => {
    mockUserLevel = Role.superadmin;
    const { getByTestId } = render(<CreateUserForm />, {
      wrapper: UserLevelProvider,
    });
    const dropDownTitle = getByTestId("role-item");
    expect(dropDownTitle.props.children).toBe("Behörighet");
    fireEvent.press(dropDownTitle);
    expect(getByTestId("role-item-user")).toBeTruthy();
    expect(getByTestId("role-item-admin")).toBeTruthy();
    expect(getByTestId("role-item-superadmin")).toBeTruthy();

    fireEvent.press(getByTestId("role-item-user"));
    expect(dropDownTitle.props.children).toBe("user");
    fireEvent.press(dropDownTitle);
    fireEvent.press(getByTestId("role-item-admin"));
    expect(dropDownTitle.props.children).toBe("admin");
    fireEvent.press(dropDownTitle);
    fireEvent.press(getByTestId("role-item-superadmin"));
    expect(dropDownTitle.props.children).toBe("superadmin");
  });

  it('should navigate to the next page when "Next" button is pressed', async () => {
    mockUserLevel = Role.superadmin;
    const setUser = jest.fn();
    const nextPage = jest.fn();
    const user = {
      name: "",
      surname: "",
      email: "",
      password: "randomPassword",
      role: Role.user,
    };

    const { getByPlaceholderText, getByTestId, getByText, debug } = render(
      <CreateUserForm user={user} nextPage={nextPage} setUser={setUser} />,
      { wrapper: UserLevelProvider }
    );

    fireEvent.changeText(getByPlaceholderText("Förnamn"), "John");
    fireEvent.changeText(getByPlaceholderText("Efternamn"), "Andersson");
    fireEvent.changeText(getByPlaceholderText("E-mail"), "test@example.com");
    fireEvent.changeText(
      getByPlaceholderText("Bekräfta E-mail"),
      "test@example.com"
    );

    fireEvent.press(getByTestId("role-item"));
    fireEvent.press(getByTestId("role-item-admin"));
    const nextButton = getByText("Nästa");
    const userData = {
      name: "John",
      surname: "Andersson",
      email: "test@example.com",
      password: "randomPassword",
      role: "admin",
    };
    fireEvent.press(nextButton);
    debug();

    await waitFor(() => {
      expect(setUser).toHaveBeenCalledWith(userData);
      expect(nextPage).toHaveBeenCalled();
    });
  });

  it("should navigate to the back page when Back button is pressed", async () => {
    const { getByText } = render(<CreateUserForm />);
    const backButton = getByText("Avbryt");
    expect(backButton);
    fireEvent.press(backButton);
    expect(mockGoBack).toHaveBeenCalled();
  });

  it("Admin should not have possibilty to give role to user.It should be automatically user.It works to create user", async () => {
    mockUserLevel = Role.admin;
    const setUser = jest.fn();
    const nextPage = jest.fn();

    const user = {
      name: "",
      surname: "",
      email: "",
      password: "randomPassword",
      role: Role.user,
    };

    const { getByPlaceholderText, getByText, queryByTestId } = render(
      <CreateUserForm user={user} nextPage={nextPage} setUser={setUser} />,
      { wrapper: UserLevelProvider }
    );
    fireEvent.changeText(getByPlaceholderText("Förnamn"), "John");
    fireEvent.changeText(getByPlaceholderText("Efternamn"), "Andersson");
    fireEvent.changeText(getByPlaceholderText("E-mail"), "test@example.com");
    fireEvent.changeText(
      getByPlaceholderText("Bekräfta E-mail"),
      "test@example.com"
    );
    expect(queryByTestId("role-item")).toBeNull();

    const nextButton = getByText("Nästa");
    const userData = {
      name: "John",
      surname: "Andersson",
      email: "test@example.com",
      password: "randomPassword",
      role: "user",
    };
    fireEvent.press(nextButton);

    await waitFor(() => {
      expect(setUser).toHaveBeenCalledWith(userData);
      expect(nextPage).toHaveBeenCalled();
    });
  });
});
