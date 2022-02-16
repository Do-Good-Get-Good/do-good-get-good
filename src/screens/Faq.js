import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Menu from "../components/Menu";

const Faq = () => {
  return (
    <View>
      <Menu />
      <Text testID="faq.headerText">FAQ</Text>
      <Text testID="faq.descText">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit libero
        dis ultricies vel vitae aliquam. Vehicula vulputate interdum suspendisse
        dictum cras id nulla.
      </Text>

      <View testID="faq.questionsArray"></View>
    </View>
  );
};

export default Faq;

const styles = StyleSheet.create({});
