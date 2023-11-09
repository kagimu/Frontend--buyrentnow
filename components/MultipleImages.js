import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Image,
} from "react-native";
import ImageBrowser from "./ImageBrowser";
import { Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default class MultipleImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageBrowserOpen: false,
      images: [],
    };
  }
  imageBrowserCallback = (callback) => {
    callback
      .then((images) => {
        console.log(images);
        this.setState({
          imageBrowserOpen: false,
          images,
        });
        this.props.onImagesSelected(images);
      })
      .catch((e) => console.log(e));
  };

  renderImage(item, i) {
    return (
      <View style={{ flexDirection: "row", padding: 10 }}>
        <Image
          style={{
            height: 70,
            width: 70,
            borderRadius: 10,
          }}
          source={{ uri: item.file }}
          key={i}
        />
      </View>
    );
  }
  render() {
    if (this.state.imageBrowserOpen) {
      return <ImageBrowser max={10} callback={this.imageBrowserCallback} />;
    }
    return (
      <View style={styles.container}>
        <Entypo
          name="upload"
          size={26}
          color="black"
          onPress={() => this.setState({ imageBrowserOpen: true })}
          style={{ paddingBottom: 10 }}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row" }}>
            {this.state.images.map((item, i) => (
              <View key={i} style={{ flex: 1 }}>
                {this.renderImage(item, i)}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    color: "#fff", // Change the text color
    padding: 10,
    borderRadius: 5,
  },
});
