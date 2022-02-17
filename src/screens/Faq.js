import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Menu from "../components/Menu";
import firestore from "@react-native-firebase/firestore";

const Faq = ({ qnaArray }) => {
  const [faqArray, setFaqArray] = useState([
    // { question: "QUESTION", answer: "ANSWER 1", opened: true },
  ]);

  useEffect(() => {
    // setFaqArray(qnaArray);
    const getFaqData = async () => {
      const qna = await firestore().collection("faq").get();
      // let info = qna.docs.map((doc) => doc.data());
      const data = qna.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      console.log("!!!!!!!!!!!!!", data);
      setFaqArray(data);
      // if (info != null) {

      //   const dataInfo = {
      //     id: info.id,
      //     question: info.question,
      //     answer: info.answer,
      //   };
      //   setFaqArray((prev) => [...prev, dataInfo]);
      // }

      console.log("ActivityContext activity info");
    };
    getFaqData();
  }, []);

  return (
    <View>
      <Menu />
      <Text testID="faq.headerText">FAQ</Text>
      <Text testID="faq.descText">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit libero
        dis ultricies vel vitae aliquam. Vehicula vulputate interdum suspendisse
        dictum cras id nulla.
      </Text>
      <View testID="faq.questionsArray">
        {faqArray.map((item, index) => (
          <View testID="faq.faqArrayItems" index={index} key={index}>
            <Text testID="textID">{item.question}</Text>
            {item.opened ? <Text>{item.answer}</Text> : null}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Faq;

const styles = StyleSheet.create({});
