import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Platform,
  Button,
  Pressable,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import ImageTile from "./ImageTile";

const { width } = Dimensions.get("window");

export default class ImageBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      selected: {},
      after: null,
      has_next_page: true,
    };
  }

  componentDidMount() {
    this.getImages(); // Update the function call from "getPhotos" to "getImages"
  }

  selectImage = (index) => {
    let newSelected = { ...this.state.selected };
    if (newSelected[index]) {
      delete newSelected[index];
    } else {
      newSelected[index] = true;
    }
    if (Object.keys(newSelected).length > this.props.max) return;

    if (!newSelected) newSelected = {};
    this.setState({ selected: newSelected });
  };

  getImages = () => {
    let params = { first: 50, mediaType: "photo" };
    if (this.state.after) params.after = this.state.after;
    if (!this.state.has_next_page) return;
    MediaLibrary.getAssetsAsync(params).then(this.processImages);
  };

  processImages = (result) => {
    const { assets, endCursor, hasNextPage } = result;
    if (this.state.after === endCursor) return;
    const uris = assets.map((asset) => asset.uri);
    this.setState({
      images: [...this.state.images, ...uris], // Replace "photos" with "images" here
      after: endCursor,
      has_next_page: hasNextPage,
    });
  };

  getItemLayout = (data, index) => {
    const length = width / 4;
    return { length, offset: length * index, index };
  };

  prepareCallback() {
    let { selected, images } = this.state;
    let selectedImages = images.filter((item, index) => {
      return selected[index];
    });
    let files = selectedImages.map((i) =>
      FileSystem.getInfoAsync(i, { md5: true })
    );
    let callbackResult = Promise.all(files).then((imageData) => {
      return imageData.map((data, i) => {
        return { file: selectedImages[i], ...data };
      });
    });
    this.props.callback(callbackResult);
  }

  renderHeader = () => {
    const selectedCount = Object.keys(this.state.selected).length;
    let headerText = `${selectedCount} SELECTED`;
    if (selectedCount === this.props.max) headerText += " (Max)";
    return (
      <View style={styles.header}>
        <Pressable
          style={styles.button}
          onPress={() => this.props.callback(Promise.resolve([]))}
        >
          <Text style={styles.text}>EXIT</Text>
        </Pressable>
        <Text style={headerText}>{headerText}</Text>
        <Pressable
          style={styles.button1}
          onPress={() => this.prepareCallback()}
        >
          <Text style={styles.text}>CHOOSE</Text>
        </Pressable>
      </View>
    );
  };

  renderImageTile = ({ item, index }) => {
    const selected = this.state.selected[index] ? true : false;
    return (
      <ImageTile
        item={item}
        index={index}
        selected={selected}
        selectImage={this.selectImage}
      />
    );
  };

  renderImages() {
    return (
      <FlatList
        data={this.state.images}
        numColumns={4}
        renderItem={this.renderImageTile}
        keyExtractor={(_, index) => index.toString()}
        onEndReached={() => {
          this.getImages();
        }}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<Text>Loading...</Text>}
        initialNumToRender={24}
        getItemLayout={this.getItemLayout}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderImages()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    width: width,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#ff0061",
    color: "white",
    padding: 10,
    borderRadius: 10,
    left: width * 0.02,
  },
  button1: {
    backgroundColor: "#ff0061",
    color: "white",
    padding: 10,
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontFamily: "PoppinsSemiBold",
    fontSize: 15,
  },
  headerText: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 15,
    color: "#ff0061",
  },
});
