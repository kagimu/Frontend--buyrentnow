import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper'
import { Button } from 'react-native'

const Next = ({ ...props }) => (
    <Button
        title='Next'
        color='#000'
        {...props}
    />
)

const Done = ({ ...props }) => (
    <Button
        title='Done'
        color='#000'
        {...props}
    />
)

const OnboardingScreen = ({ navigation }) => {
    return (
        <Onboarding
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            onSkip={() => navigation.replace('Login')}
            onDone={() => navigation.navigate('Login')}
            pages={[
                {
                    backgroundColor: '#F6F8FC',
                    image: <Image source={{ uri: 'https://i.imgur.com/w1QOPZw.png' }} />,
                    title: 'Am Looking for Plot of Land',
                    subtitle: 'Explore the latest properties, Checkout new properties, land, apartments and Houses.',
                },
                {
                    backgroundColor: '#F6F8FC',
                    image: <Image source={{ uri: 'https://i.imgur.com/SaJbil3.png' }} />,
                    title: 'Iwant to own a house',
                    subtitle: 'Explore the latest properties, Checkout new properties, land, apartments and Houses.',
                }
            ]}
        />
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({})