import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Alert,
    ScrollView
} from 'react-native';

export default class BookScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            userSelected: [],
            data: [
                { id: 1, name: "Zen Apartments", image: "https://i.imgur.com/UstzJlq.jpg", mula: "$", count: 124.711 },
                { id: 2, name: "Serena Suites", image: "https://i.imgur.com/0EnG6K6.jpg?1", mula: "$", count: 234.722 },
                { id: 3, name: "Danz Close", image: "https://i.imgur.com/sDaZ1R2.jpg?1", mula: "$", count: 324.723 },
                { id: 4, name: "Hillside Library", image: "https://i.imgur.com/QK7q9Jp.jpg?1", mula: "$", count: 154.573 },
                { id: 5, name: "Chariot Records", image: "https://i.imgur.com/yk3vJ82.jpg?1", mula: "$", count: 124.678 },
            ]
        };
    }

    clickEventListener = (item) => {
        Alert.alert('Message', 'Item clicked. ' + item.name);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text
                    style={{
                        fontSize: 20,
                        margin: 15,
                        fontWeight: 'bold',
                    }}
                >
                    Recent Bookings
                </Text>
                <FlatList
                    style={styles.contentList}
                    columnWrapperStyle={styles.listContainer}
                    data={this.state.data}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.card} onPress={() => { this.clickEventListener(item) }}>
                                <Image style={styles.image} source={{ uri: item.image }} />
                                <View style={styles.cardContent}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                    }}>
                                        <Text style={styles.mula}>{item.mula}</Text>
                                        <Text style={styles.count}>{item.count}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.followButton} onPress={() => this.clickEventListener(item)}>
                                        <Text style={styles.followButtonText}>Book Again?</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: "#ebf0f7"
    },
    contentList: {
        flex: 1,
    },
    cardContent: {
        marginLeft: 20,
        marginTop: 10
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 2,
        borderColor: "#387981"
    },

    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,

        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        backgroundColor: "white",
        padding: 10,
        flexDirection: 'row',
        borderRadius: 30,
    },

    name: {
        fontSize: 18,
        flex: 1,
        alignSelf: 'center',
        color: "#4C9AE9",
        fontWeight: 'bold'
    },
    count: {
        fontSize: 14,
        flex: 1,
        alignSelf: 'center',
        color: "#7FE6FF"
    },
    followButton: {
        marginTop: 10,
        height: 35,
        width: 100,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#F7916D",
    },
    followButtonText: {
        color: "#808080",
        fontSize: 12,

    },
});
