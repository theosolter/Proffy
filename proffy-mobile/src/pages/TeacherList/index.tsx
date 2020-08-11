import React, { useState, useEffect } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import styles from './styles'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'


function TeacherList() {
    const [teachers, setTeachers] = useState([])
    const [favorites, setFavorites] = useState<number[]>([])

    const [filterVisible, setFilterVisible] = useState(false)
    function handleToggleFilterVisible() {
        setFilterVisible(!filterVisible)
    }
    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = (JSON.parse(response))
                const favoritedTeachersId = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id
                })
                setFavorites(favoritedTeachersId)
            }
        })
    }

    useFocusEffect(() => {
        loadFavorites()
    })

    async function handleFiltersSubmit() {
        loadFavorites()
        const response = await api.get('classes', {
            params: {
                subject, week_day, time,
            },
        });
        setTeachers(response.data)
        setFilterVisible(false)
    }

    return (
        <View style={styles.container}>
            <PageHeader title="Available proffys" headerRight={(
                <BorderlessButton onPress={handleToggleFilterVisible}>
                    <Feather name="filter" size={20} color="#FFF" />
                </BorderlessButton>
            )}>

                {filterVisible && (

                    <View style={styles.searchForm}>
                        
                            <Text style={styles.label}>Subject</Text>
                            <TextInput
                                placeholderTextColor='#c1bccc'
                                style={styles.input}
                                placeholder="What is the subject?"
                                value={subject}
                                onChangeText={text => setSubject(text)}
                            />

                            <View style={styles.inputGroup}>
                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>Week day</Text>
                                    <TextInput
                                        placeholderTextColor='#c1bccc'
                                        style={styles.input}
                                        placeholder="Which day of the week?"
                                        value={week_day}
                                        onChangeText={text => setWeekDay(text)}
                                    />
                                </View>

                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>Time</Text>
                                    <TextInput
                                        placeholderTextColor='#c1bccc'
                                        style={styles.input}
                                        placeholder="At what time?"
                                        value={time}
                                        onChangeText={text => setTime(text)}
                                    />
                                </View>
                            </View>
                        
                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filter</Text>

                        </RectButton>

                    </View>
                )}


            </PageHeader>

            <ScrollView style={styles.teacherList} contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16
            }}>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)} />
                }
                )}
            </ScrollView>
        </View>
    )
}

export default TeacherList