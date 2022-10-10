import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';

export default class MessageScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                { id: 3, image: "https://i.imgur.com/lSepz3v.jpg", name: "March SoulLaComa", text: "I loved your place dear..please keep it up", attachment: "https://i.imgur.com/vdy1D6x.jpg?1" },
                { id: 2, image: "https://i.imgur.com/68YZWTT.jpg?1", name: "John DoeLink", text: " Thanks for keping time. it gives me morale for business with ya", attachment: "https://i.imgur.com/YVjHHis.jpg?1" },
                { id: 4, image: "https://i.imgur.com/mJKyIYA.jpg?1", name: "Finn DoRemiFaso", text: "Legit place, beautiful neighbourhood, good customer care.", attachment: "" },
                { id: 5, image: "https://i.imgur.com/NnzJMmn.jpg?1", name: "Maria More More", text: "Hey, how can i book you again?", attachment: "" },
                { id: 1, image: "https://i.imgur.com/GapakDG.jpg?1", name: "Frank Odalthh", text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", attachment: "https://via.placeholder.com/100x100/7B68EE/000000" },
                { id: 6, image: "https://i.imgur.com/lSepz3v.jpg", name: "March SoulLaComa", text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", attachment: "" },
                { id: 7, image: "https://i.imgur.com/mJKyIYA.jpg?1", name: "John DoeLink", text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", attachment: "" },
            ]
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: 'white', }}>
                <Text
                    style={{
                        fontSize: 20,
                        margin: 30,
                        marginTop: 50,
                        fontWeight: 'bold',
                    }}
                >
                    Inbox
                </Text>
                <FlatList
                    style={styles.root}
                    data={this.state.data}
                    extraData={this.state}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={styles.separator} />
                        )
                    }}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    renderItem={(item) => {
                        const Notification = item.item;
                        let attachment = <View />;

                        let mainContentStyle;
                        if (Notification.attachment) {
                            mainContentStyle = styles.mainContent;
                            attachment = <Image style={styles.attachment} source={{ uri: Notification.attachment }} />
                        }
                        return (
                            <View style={styles.container}>
                                <Image source={{ uri: Notification.image }} style={styles.avatar} />
                                <View style={styles.content}>
                                    <View style={mainContentStyle}>
                                        <View style={styles.text}>
                                            <Text style={styles.name}>{Notification.name}</Text>
                                            <Text>{Notification.text}</Text>
                                        </View>
                                        <Text style={styles.reply}>
                                            Reply
                                        </Text>
                                        <Text style={styles.timeAgo}>
                                            2 hours ago
                                        </Text>
                                    </View>
                                    {attachment}
                                </View>
                            </View>
                        );
                    }}

                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#FFFFFF"
    },
    container: {
        padding: 16,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: "#FFFFFF",
        alignItems: 'flex-start'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    text: {
        marginBottom: 5,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    content: {
        flex: 1,
        marginLeft: 16,
        marginRight: 0
    },
    mainContent: {
        marginRight: 60
    },
    img: {
        height: 50,
        width: 50,
        margin: 0
    },
    attachment: {
        position: 'absolute',
        right: 0,
        height: 50,
        width: 50
    },
    separator: {
        height: 1,
        backgroundColor: "#387981",
        borderRadius: 30,
    },
    timeAgo: {
        fontSize: 12,
        color: "#696969"
    },
    name: {
        fontSize: 16,
        color: "#1E90FF"
    },
    reply: {
        color: '#808080',
        margin: 10,
    }
});
