import * as Font from "expo-font";

export default useFonts = async () => {
  await Font.loadAsync({
    "poppins-regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "poppins-bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "poppins-italic": require("../assets/fonts/Poppins-Italic.ttf"),
    // All other fonts here
  });
};
