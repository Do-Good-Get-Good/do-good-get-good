import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "@rneui/base";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";
import BottomLogo from "../components/BottomLogo";
import Menu from "../components/Menu";
import { getFaq } from "../firebase-functions/get";

const Faq = () => {
  const [faqArray, setFaqArray] = useState([]);
  const [error, setError] = useState(null);
  const curentTime = new Date().getTime();
  const minutesToCompare = 15 * 60000;

  useEffect(() => {
    const getFaqData = async () => {
      const timeWhenDataSavedLastTime = curentTime;
      const arrayWithDataAndCurentTime = [];
      const tempArray = [];
      await getFaq()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            tempArray.push({ id: doc.id, opened: false, ...doc.data() });
          });
        })
        .catch((error) => {
          if (error === "no-data") {
            setError("Sorry, something went wrong");
          }
        });

      setFaqArray(tempArray);
      arrayWithDataAndCurentTime.push(tempArray);
      arrayWithDataAndCurentTime.push(timeWhenDataSavedLastTime);
      storeData(arrayWithDataAndCurentTime);
    };

    getData().then((res) => {
      if (res != null && res[1] + minutesToCompare > curentTime) {
        setFaqArray(res[0]);
      } else {
        getFaqData();
      }
    });
  }, []);

  const openAnswer = (selectedQuestion) => {
    const newFaqArray = faqArray.map((question) => {
      return {
        ...question,
        opened:
          question.id === selectedQuestion.id
            ? !question.opened
            : question.opened,
      };
    });
    const secondNewFaqArray = newFaqArray.map((question) => {
      return {
        ...question,
        opened: question.id != selectedQuestion.id ? false : question.opened,
      };
    });
    setFaqArray(secondNewFaqArray);
  };

  const storeData = async (faqs) => {
    try {
      const jsonValue = JSON.stringify(faqs);
      await AsyncStorage.setItem("@Faq_Key", jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@Faq_Key");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Menu />
      <ScrollView
        style={styles.containterForDropDown}
        testID="faq.questionsArray"
      >
        <Text style={styles.headerText} testID="faq.headerText">
          FAQ
        </Text>
        <Text style={styles.headerDesc} testID="faq.descText">
          Här kan du hitta svar på de vanligaste frågorna. Hittar du inte svar
          på din fråga kan du också kontakta din konsultchef.
        </Text>
        <View style={{ paddingBottom: 24 }}>
          {faqArray.length > 0 &&
            faqArray.map((item, index) => (
              <View
                style={styles.faqContainer}
                testID="faq.faqArrayItems"
                index={index}
                key={index}
              >
                <TouchableOpacity
                  onPress={() => {
                    openAnswer(item);
                  }}
                  style={[
                    styles.dropDown,
                    item.opened && styles.dropDownOpened,
                  ]}
                  testID={`question ${index}`}
                >
                  <Text style={styles.textQuestion} testID="textID">
                    {item.question}
                  </Text>
                  <Icon
                    style={styles.icon}
                    color={colors.secondary}
                    name={
                      item.opened === true ? "arrow-drop-up" : "arrow-drop-down"
                    }
                    size={30}
                  />
                </TouchableOpacity>
                {item.opened ? (
                  <View style={styles.textAnswerView}>
                    <Text style={styles.textAnswer}>{item.answer}</Text>
                  </View>
                ) : null}
              </View>
            ))}
          {error != null && (
            <Text testID="errorTextId" style={styles.errorText}>
              {error}
            </Text>
          )}
        </View>
      </ScrollView>
      <BottomLogo />
    </SafeAreaView>
  );
};

export default Faq;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    ...typography.h2,
    fontWeight: "500",
    marginTop: 30,
  },
  errorText: {
    fontSize: 20,
    color: colors.error,
  },
  headerDesc: {
    ...typography.b2,
    marginBottom: 10,
  },
  containterForDropDown: {
    paddingHorizontal: 18,
  },
  faqContainer: {
    flexDirection: "column",
  },
  dropDown: {
    flexDirection: "row",
    height: 50,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.background,
    marginTop: 10,
  },
  dropDownOpened: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  icon: {
    marginRight: 5,
  },
  textQuestion: {
    marginLeft: 18,
    ...typography.b1,
  },
  textAnswerView: {
    backgroundColor: colors.background,
    paddingHorizontal: 18,
    paddingTop: 4,
    paddingBottom: 18,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  textAnswer: {
    ...typography.b2,
  },
});
