import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";
import { useEffect, useState } from "react";
import { Overlay } from "@rneui/base";
import { LongButton } from "../Buttons/LongButton";
import { RadioButton } from "../Buttons/RadioButton";

type OptionsListType = {
  [key: string]: string;
};

type Props = {
  mainTitle: string;
  optionsList: OptionsListType;
  selected: keyof OptionsListType;
  onSelect: (select: string) => void;
  exceptOf?: keyof OptionsListType;
  showPopup: boolean;
  setShowPopup: () => void;
};

export const PopupWithRadioButtons = ({
  mainTitle,
  optionsList,
  selected,
  onSelect,
  exceptOf,
  showPopup = false,
  setShowPopup,
}: Props) => {
  const [choice, setChoice] = useState(selected);
  const onOkayButton = () => {
    onSelect(choice.toString()), setShowPopup();
  };
  useEffect(() => {
    setChoice(selected);
  }, [selected]);

  return (
    <Overlay
      isVisible={showPopup}
      animationType="fade"
      overlayStyle={styles.overlayStyle}
      onBackdropPress={setShowPopup}
    >
      <View>
        <Text testID="popUpTextvalue.mainTitle" style={styles.textTitle}>
          {mainTitle}
        </Text>
        <ScrollView style={{ height: "50%" }}>
          <View style={{ backgroundColor: colors.background }}>
            {Object.entries(optionsList).map(
              ([key, value]) =>
                exceptOf !== key && (
                  <View style={styles.containerTextAndRadioButtins} key={key}>
                    <Text testID={`popUpTextvalue.${key}`}>{value}</Text>
                    <RadioButton
                        testID={`popUpRadioButton.${key}`}
                      label=""
                      selected={key === choice}
                      onPress={() => setChoice(key)}
                    />
                  </View>
                ),
            )}
          </View>
        </ScrollView>
        <LongButton
          style={{ marginTop: 20 }}
          title="Ok"
          onPress={onOkayButton}
        />
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
  okButton: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    paddingVertical: 17,
  },
  overlayStyle: {
    backgroundColor: colors.light,
    width: "90%",
    maxHeight: "45%",
    borderRadius: 5,
  },
});
