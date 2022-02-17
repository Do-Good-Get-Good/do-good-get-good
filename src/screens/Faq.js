import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import Menu from "../components/Menu";

import firestore from "@react-native-firebase/firestore";

const Faq = () => {
  const [faqArray, setFaqArray] = useState([]);

  useEffect(() => {
    const getFaqData = async () => {
      const qna = await firestore().collection("faq").get();
      const data = qna.docs.map((doc) => {
        return { id: doc.id, opened: false, ...doc.data() };
      });
      setFaqArray(data);
    };
    getFaqData();
  }, []);

  useEffect(() => {
    if (faqArray.length != 0) console.log("faqArray", faqArray);
  }, [faqArray]);

  return (
    <View style={styles.container}>
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
            style={{ flex: 0.5 }}
            testID="faq.faqArrayItems"
            index={index}
            key={index}
          >
            <TouchableOpacity style={styles.dropDown}>
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
    </View>
  );
};

export default Faq;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 19,
  },
  containterForDropDown: { flex: 0.5 },
  dropDown: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
    borderRadius: 2,
    borderWidth: 1,
    backgroundColor: "white",
    overflow: "hidden",
    borderColor: "white",
    marginTop: 10,
  },

  textQuestion: {
    marginLeft: 19,
    flex: 1,
    paddingTop: 10,
  },
  icon: { flex: 0.5, paddingTop: 5 },
  textAnswer: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "white",
    paddingHorizontal: 19,
  },
  insideSortBox: {
    flex: 1,
  },
});
