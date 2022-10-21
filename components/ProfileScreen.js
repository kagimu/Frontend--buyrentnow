import React from "react";
import {
    Button,
    Container,
    Icon,
    ScreenContainer,
    Touchable,
    withTheme,
} from "@draftbit/ui";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native'
import { authentication } from "../firebase";

const ProfileScreen = (props) => {
    const navigation = useNavigation()
    const { theme } = props;

    const logout = () => {
        authentication
            .signOut()
            .then(() => {
                navigation.replace('Login')
            })
            .catch(error => alert(error.message))
    }

    return (
        <ScreenContainer
            style={styles.screenContainerJb}
            scrollable={true}
            hasSafeArea={false}
        >
            <ImageBackground
                style={styles.imageBackgroundNb}
                source={{
                    uri: 'https://i.imgur.com/sDaZ1R2.jpg?1',
                }}
                resizeMode="cover"
            />
            <Container
                style={styles.containerEA}
                elevation={0}
                useThemeGutterPadding={true}
            >
                <Image
                    style={StyleSheet.flatten([
                        styles.imageA3,
                        { borderRadius: theme.borderRadius.global },
                    ])}
                    resizeMode="cover"
                    source={{
                        uri: 'https://i.imgur.com/lSepz3v.jpg',
                    }}
                />
                <Text
                    style={StyleSheet.flatten([
                        styles.textPr,
                        theme.typography.headline3,
                    ])}
                >
                    Jessica Kalungi
                </Text>
                <Text>
                    FilmMaker/ DOP
                </Text>
                <Button style={styles.buttonP2} onPress={() => navigation.navigate('EditProfile')}>
                    Edit Profile
                </Button>
            </Container>

            <Container useThemeGutterPadding={true} elevation={0}>
                <Touchable
                    style={StyleSheet.flatten([
                        styles.touchableOk,
                        { borderColor: theme.colors.divider },
                    ])}
                    onPress={() => navigation.navigate('MyProfile')}
                >
                    <View style={styles.viewKs} >
                        <Text style={theme.typography.body1} >My Profile</Text>
                        <Icon
                            style={styles.iconFE}
                            size={24}
                            color={theme.colors.strong}
                            name="MaterialIcons/account-circle"
                        />
                    </View>
                </Touchable>
                <Touchable
                    style={StyleSheet.flatten([
                        styles.touchableBp,
                        { borderColor: theme.colors.divider },
                    ])}
                    onPress={() => navigation.navigate('BookScreen')}
                >
                    <View style={styles.viewS1}>
                        <Text style={theme.typography.body1}>Saved</Text>
                        <Icon
                            style={styles.iconZz}
                            color={theme.colors.strong}
                            size={24}
                            name="MaterialIcons/history"
                        />
                    </View>
                </Touchable>

            </Container>


            <Button
                style={styles.buttonP2}
                type="outline"
                onPress={logout}
            >
                LogOut
            </Button>


            <View style={{ margin: 40, }}>

            </View>
        </ScreenContainer>
    );
};
const styles = StyleSheet.create({
    screenContainerJb: {
        justifyContent: "space-evenly",
    },
    viewKs: {
        justifyContent: "space-between",
        flexDirection: "row",
    },
    viewYR: {
        justifyContent: "space-between",
        flexDirection: "row",
    },
    viewS1: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    viewAl: {
        justifyContent: "space-between",
        flexDirection: "row",
    },
    imageBackgroundNb: {
        width: "100%",
        height: 200,
    },
    imageA3: {
        height: 120,
        width: 120,
    },
    containerEA: {
        alignItems: "center",
        marginTop: -65,
    },
    textPr: {
        width: "100%",
        textAlign: "center",
        marginTop: 16,
        color: '#387981',
    },
    touchableOk: {
        borderTopWidth: 1,
        paddingTop: 12,
        paddingBottom: 12,
        marginTop: 32,
    },
    iconFE: {
        height: 24,
        width: 24,
        color: '#387981',
    },
    iconCl: {
        width: 24,
        height: 24,
        color: '#387981',
    },
    iconZz: {
        width: 24,
        height: 24,
        color: '#387981',
    },
    iconZb: {
        height: 24,
        width: 24,
        color: '#387981',
    },
    buttonP2: {
        marginTop: 16,
        alignSelf: "center",
        width: "50%",
        color: '#387981',
    },
    touchableOm: {
        paddingBottom: 12,
        paddingTop: 12,
        borderTopWidth: 1,
    },
    touchableBp: {
        paddingBottom: 12,
        paddingTop: 12,
        borderTopWidth: 1,
    },
    touchableJg: {
        paddingBottom: 12,
        paddingTop: 12,
        borderTopWidth: 1,
    },
    logout: {
        margin: 15,
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: "left",
        marginBottom: 10,
        marginTop: 20,
    },
});
export default withTheme(ProfileScreen);
