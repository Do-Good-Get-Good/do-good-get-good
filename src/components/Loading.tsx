import { Dialog } from "@rneui/base";
import colors from "../assets/theme/colors";
import { Overlay } from "@rneui/themed";

type Props = {
  loading: boolean;
};

export const Spinner = ({ loading = false }: Props) => {
  return (
    <Overlay
      isVisible={loading}
      animationType="fade"
      overlayStyle={{
        backgroundColor: "transparent",
      }}
    >
      <Dialog.Loading
        loadingStyle={{
          alignSelf: "center",
          justifyContent: "center",
        }}
        loadingProps={{ color: "#84BD00" }}
      ></Dialog.Loading>
    </Overlay>
  );
};
