// List.js
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    SafeAreaView,
} from "react-native";

// definition of the Item, which will be rendered in the FlatList
const Item = ({ name, details }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.details}>{details}</Text>
    </View>
);

// the filter
const List = ({ searchPhrase, setCLicked, data }) => {
    const renderItem = ({ item }) => {
        // when no input, show all
        if (searchPhrase === "") {
            return <Item name={item.name} details={item.details} />;
        }
        // filter of the name
        if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
            return <Item name={item.name} details={item.details} />;
        }
        // filter of the description
        if (item.details.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
            return <Item name={item.name} details={item.details} />;
        }
    };

    const [fontsLoaded] = useFonts({
        'Poppins-black': require('./assets/fonts/Poppins-Black.otf'),
        'Poppins-Bold': require('./assets/fonts/Poppins-Bold.otf'),
        'Poppins-ExtraBold': require('./assets/fonts/Poppins-ExtraBold.otf'),
        'Poppins-ExtraLight': require('./assets/fonts/Poppins-ExtraLight.otf'),
        'Poppins-Light': require('./assets/fonts/Poppins-Light.otf'),
        'Poppins-Medium': require('./assets/fonts/Poppins-Medium.otf'),
        'Poppins-Regular': require('./assets/fonts/Poppins-Regular.otf'),
        'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.otf'),
        'Poppins-Thin': require('./assets/fonts/Poppins-Thin.otf'),
    });
    return (
        <SafeAreaView style={styles.list__container}>
            <View
                onStartShouldSetResponder={() => {
                    setClicked(false);
                }}
            >
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </SafeAreaView>
    );
};

export default List;

const styles = StyleSheet.create({
    list__container: {
        margin: 10,
        height: "85%",
        width: "100%",
    },
    item: {
        margin: 30,
        borderBottomWidth: 2,
        borderBottomColor: "lightgrey"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        fontStyle: "italic",
    },
});