import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Menu from "../components/Menu";

const Faq = (props) => {
  const [faqArray, setFaqArray] = useState([]);

  useEffect(() => {
    setFaqArray(props.qnaData);
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
