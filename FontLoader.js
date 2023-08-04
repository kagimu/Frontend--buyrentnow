// FontLoader.js
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";

export default function FontLoader() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
        PoppinsExtraBold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsSemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
      });
      setFontLoaded(true);
    };

    loadFont();
  }, []);

  if (!fontLoaded) {
    return null; // Render a loading state or splash screen until the font is loaded
  }
}
