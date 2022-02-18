import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Icon } from "react-native-elements";
import Menu from "../components/Menu";

import AsyncStorage from "@react-native-async-storage/async-storage";

import firestore from "@react-native-firebase/firestore";

const Faq = () => {
  const [faqArray, setFaqArray] = useState([]);

  useEffect(() => {
    const getFaqData = async () => {
      const qna = await firestore().collection("faq").get();
      const data = qna.docs.map((doc) => {
        if (doc.data() != null && doc.data() != undefined) {
          return { id: doc.id, opened: false, ...doc.data() };
        } else {
          console.log("Something went wrong with getiing Faq from Firebase");
        }
      });
      setFaqArray(data);
      storeData(data);
    };
    getData().then((res) => {
      if (res != null) {
        setFaqArray(res);
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
      <Text testID="faq.headerText">FAQ</Text>
      <Text testID="faq.descText">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit libero
        dis ultricies vel vitae aliquam. Vehicula vulputate interdum suspendisse
        dictum cras id nulla.
      </Text>
      <View style={styles.containterForDropDown} testID="faq.questionsArray">
        {faqArray.map((item, index) => (
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
              style={[styles.dropDown, item.opened && styles.dropDownOpened]}
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
              <Text style={styles.textAnswer}>{item.answer}</Text>
            ) : null}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Faq;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
  },
  faqContainer: {
    flexDirection: "column",
  },
  dropDown: {
    flexDirection: "row",
    height: 50,
    borderRadius: 10,
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
  textQuestion: {
    marginLeft: 18,
  },
  textAnswer: {
    backgroundColor: "white",
    paddingHorizontal: 18,
    paddingBottom: 18,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
