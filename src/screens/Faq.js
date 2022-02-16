import { it } from "date-fns/locale";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Menu from "../components/Menu";

const Faq = () => {
  const [faqArray, setFaqArray] = useState([
    { question: "QUESTION?????  1", answer: "ANSWER 1", opened: false },
    { question: "QUESTION????? 2", answer: "ANSWER 2", opened: true },
  ]);
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
            <Text>{item.question}</Text>
            {item.opened ? <Text>{item.answer}</Text> : null}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Faq;

const styles = StyleSheet.create({});
