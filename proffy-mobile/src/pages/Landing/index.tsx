import React, { useState, useEffect } from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import landingImg from '../../assets/images/landing.png'
import studyIcon from '../../assets/images/icons/study.png'
import teachClassesIcon from '../../assets/images/icons/give-classes.png'
import heartIcon from '../../assets/images/icons/heart.png'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import api from '../../services/api'



function Landing() {
    const { navigate } = useNavigation()
    function handleNavigationToTeachClassesPage() {
        navigate('TeachClasses')
    }


    function handleNavigationToStudyPage() {
        navigate('Study')
    }

    const [totalConnections, setTotalConnections] = useState(0)


    useEffect(() => {
        api.get('/connections').then(response => {
            const { total } = response.data
            setTotalConnections(total)
        })
    }, [])
    return (
        <View style={styles.container}>
            <Image source={landingImg} style={styles.banner} />


            <Text style={styles.title}>
                Welcome, {'\n'}
                <Text style={styles.titleBold}>what do you want to do?</Text>
            </Text>

            <View style={styles.buttonContainer}>
                <RectButton onPress={handleNavigationToStudyPage} style={[styles.button, styles.buttonPrimary]}>
                    <Image source={studyIcon} />
                    <Text style={styles.buttonText}>Study</Text>
                </RectButton>

                <RectButton onPress={handleNavigationToTeachClassesPage} style={[styles.button, styles.buttonSecondary]}>
                    <Image source={teachClassesIcon} />
                    <Text style={styles.buttonText}>Teach classes</Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                Total of {totalConnections} connections made! {' '}
                <Image source={heartIcon} />
            </Text>
        </View>
    )
}

export default Landing