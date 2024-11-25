import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Header_Home from "./Header_Home";
import Body_Home from "./Body_Home";
import Footer_Home from "./Footer_Home";

const HomePage = ({ navigation }) => {
  const [timeLeft, setTimeLeft] = useState(7200);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")} : ${m.toString().padStart(2, "0")} : ${s.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Header_Home />
      <Body_Home formatTime={formatTime} timeLeft={timeLeft} />
      <Footer_Home />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    justifyContent: "space-between",
  },
});

export default HomePage;