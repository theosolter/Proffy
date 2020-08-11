import React, { useState, FormEvent } from 'react'
import PageHeader from '../../components/PageHeader'
import './styles.css'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'
import searchIcon from '../../assets/images/icons/icons8-search.svg'
import api from '../../services/api'







function TeacherList() {
    const [teachers, setTeachers] = useState([])

    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')


    async function searchTeachers(e: FormEvent) {
        e.preventDefault()
        const response = await api.get('/classes', {
            params: {
                subject,
                week_day,
                time
            }

        })
        setTeachers(response.data)
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="These are the available proffys.">

                <form action="" id="search-teachers" onSubmit={searchTeachers}>
                    <Select
                        name="subject"
                        label="Subject"
                        value={subject}
                        onChange={(e) => { setSubject(e.target.value) }}
                        options={[
                            { value: 'Arts', label: 'Arts' },
                            { value: 'Biology', label: 'Biology' },
                            { value: 'Mathematics', label: 'Mathematics' },
                            { value: 'History', label: 'History' },
                            { value: 'English', label: 'English' },
                            { value: 'Portguese', label: 'Portguese' },
                            { value: 'Chemistry', label: 'Chemistry' },
                            { value: 'Physics', label: 'Physics' },
                            { value: 'Geography', label: 'Geography' },

                        ]}
                    />
                    <Select
                        name="week-day"
                        label="Week day"
                        value={week_day}
                        onChange={(e) => { setWeekDay(e.target.value) }}
                        options={[

                            { value: '1', label: 'Monday' },
                            { value: '2', label: 'Tuesday' },
                            { value: '3', label: 'Wednesday' },
                            { value: '4', label: 'Thursday' },
                            { value: '5', label: 'Friday' },
                            { value: '6', label: 'Saturday' },
                            { value: '0', label: 'Sunday' },

                        ]}
                    />
                    <Input
                        name="time"
                        label="Time"
                        value={time}
                        type="time"
                        onChange={(e) => { setTime(e.target.value) }} />

                    <button className="search" type="submit">
                        <img src={searchIcon} alt="search" />
                    </button>

                </form>

            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />
                })}

            </main>
        </div>
    )
}




export default TeacherList