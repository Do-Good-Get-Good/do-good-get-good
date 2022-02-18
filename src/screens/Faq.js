import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Icon } from "react-native-elements";
import Menu from "../components/Menu";

import AsyncStorage from "@react-native-async-storage/async-storage";

import firestore from "@react-native-firebase/firestore";

const Faq = () => {
  const [faqArray, setFaqArray] = useState([]);
  const curentTime = new Date().getTime();
  const minutesToCompare = 15 * 60000;

  useEffect(() => {
    const getFaqData = async () => {
      const timeWhenDataSavedLastTime = curentTime;
      const arrayWithDataAndCurentTime = [];
      const qna = await firestore().collection("faq").get();
      const data = qna.docs.map((doc) => {
        if (doc.data() != null && doc.data() != undefined) {
          return { id: doc.id, opened: false, ...doc.data() };
        } else {
          console.log("Something went wrong with getiing Faq from Firebase");
        }
      });

      setFaqArray(data);
      arrayWithDataAndCurentTime.push(data);
      arrayWithDataAndCurentTime.push(timeWhenDataSavedLastTime);
      storeData(arrayWithDataAndCurentTime);
    };

    getData().then((res) => {
      if (res != null && res[1] + minutesToCompare > curentTime) {
        console.log("res come from local storege___________   ");

        setFaqArray(res[0]);
      } else {
        console.log("res come from Firebase______________  ");
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit
          libero dis ultricies vel vitae aliquam. Vehicula vulputate interdum
          suspendisse dictum cras id nulla.
        </Text>
        <View style={{ paddingBottom: 24 }}>
          {faqArray.length > 0 ? (
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
                    color="#5B6770"
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
            ))
          ) : (
            <Text style={styles.errorText}>Sorry, something went wrong</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Faq;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontWeight: "500",
    fontSize: 34,
    marginTop: 30,
  },
  errorText: {
    fontSize: 20,
    color: "red",
  },
  headerDesc: {
    fontWeight: "400",
    fontSize: 16,
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
    backgroundColor: "white",
    overflow: "hidden",
    borderColor: "white",
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
    fontSize: 18,
  },
  textAnswerView: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingTop: 4,
    paddingBottom: 18,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  textAnswer: {
    fontSize: 16,
  },
});
