import { Dialog } from "@rneui/base";
type Props = {
  loading: boolean;
};

export const Spinner = ({ loading = false }: Props) => {
  return (
    loading && (
      <Dialog.Loading
        loadingStyle={{
          position: "absolute",
        }}
        loadingProps={{ color: "#84BD00" }}
      ></Dialog.Loading>
    )
  );
};
