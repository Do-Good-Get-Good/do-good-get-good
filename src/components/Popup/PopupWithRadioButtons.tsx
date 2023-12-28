import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";
import { useEffect, useState } from "react";

import { Overlay } from "@rneui/base";
import { LongButton } from "../Buttons/LongButton";

type OptionsListType = {
  [key: string]: string;
};

type Props = {
  mainTitle: string;
  optionsList: OptionsListType;
  selected: keyof OptionsListType;
  onSelect: (select: keyof OptionsListType) => void;
  showPopup: boolean;
  setShowPopup: () => void;
};

export const PopupWithRadioButtons = ({
  mainTitle,
  optionsList,
  selected,
  onSelect,
  showPopup = false,
  setShowPopup,
}: Props) => {
  const [choice, setChoice] = useState(selected);
  const onOkayButton = () => {
    onSelect(choice), setShowPopup();
  };
  useEffect(() => {
    setChoice(selected);
  }, [selected]);
  console.log(optionsList, "optionsList[selected");

  return (
    <Overlay
      isVisible={showPopup}
      animationType="fade"
      overlayStyle={styles.overlayStyle}
      onBackdropPress={setShowPopup}
    >
      <View>
        <ScrollView>
          <Text style={styles.textTitle}>{mainTitle}</Text>
          <View style={{ backgroundColor: colors.background }}>
            {Object.entries(optionsList).map(([key, value]) => (
              <View style={styles.containerTextAndRadioButtins} key={key}>
                <Text>{value}</Text>
                <TouchableOpacity
                  onPress={() => setChoice(key)}
                  // style={styles.radioButtons}
                >
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 20 / 2,
                      backgroundColor:
                        key === choice ? colors.primary : colors.background,
                      borderColor: colors.dark,
                      borderWidth: 1,
                    }}
                  >
                    {key === choice ? (
                      <View style={styles.smallCircul}></View>
                    ) : null}
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
        <LongButton title="Ok" onPress={() => onOkayButton()} />
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  containerTextAndRadioButtins: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginHorizontal: 22,
    color: colors.background,
  },
  textTitle: {
    ...typography.title,
    margin: 12,
  },
  smallCircul: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    margin: 4,
    backgroundColor: colors.dark,
  },
  okButton: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    paddingVertical: 17,
    marginTop: 30,
  },
  overlayStyle: {
    backgroundColor: colors.light,
    width: "90%",
    height: "35%",
    borderRadius: 5,
  },
});
