import { render } from "@testing-library/react-native";
import "react-native";
import About from "./About";

jest.mock("react-native-device-info", () => ({
  getVersion: jest.fn(() => "1.2"),
  getBuildNumber: jest.fn(() => "20"),
}));

describe("Testing About page", () => {
  it("Renders page correctly", () => {
    const { getByTestId } = render(<About />);

    const image = getByTestId("app-icon");

    expect(image.props.source).toEqual({
      testUri: "../../../assets/images/icon_dggg.png",
    });

    expect(getByTestId("app-name").children[0]).toEqual("Do Good Get Good");
    expect(getByTestId("app-version-info").children.join("")).toEqual(
      "Version: 1.2 (20)"
    );
    expect(getByTestId("contact-info").children[0]).toEqual("Kontakt info");
    expect(getByTestId("mail").children[0]).toEqual("Mail:");
    expect(getByTestId("actual-mail").children[0]).toEqual(
      "dggg@technogarden.se"
    );
  });
});
