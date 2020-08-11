import React from 'react'
import { View, ImageBackground, Text } from 'react-native'
import styles from './styles'
import teachClassesBackground from '../../assets/images/give-classes-background.png'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

function TeachClasses() {
    const { navigate } = useNavigation()
    function handleNavigationToLanding() {
        navigate('Landing')
    }


    return (

        <View style={styles.container}>
            <ImageBackground resizeMode="contain" source={teachClassesBackground} style={styles.content}>
                <Text style={styles.title}>
                    Want to be a Proffy?
        </Text>
                <Text style={styles.description}>
                    To start you need to sign-up as a teacher on our web platform.
        </Text>
            </ImageBackground>
            <RectButton onPress={handleNavigationToLanding} style={styles.okButton}>
                <Text style={styles.okButtonText}>Okay</Text>

            </RectButton>
        </View>

    )
}

export default TeachClasses