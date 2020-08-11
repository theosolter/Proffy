import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import './styles.css'
import Input from '../../components/Input'
import warningIcon from '../../assets/images/icons/warning.svg'
import Textarea from '../../components/TextArea'
import Select from '../../components/Select'
import api from '../../services/api'


function TeacherForm() {
    const history = useHistory()

    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [bio, setBio] = useState('')

    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')


    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ])

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ])
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault()

        api.post('/classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Sign-up was successful!')
            history.push('/')
        }).catch(() => {
            alert('Error in sign-up form')
        })

    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }
            return scheduleItem
        })
        setScheduleItems(updatedScheduleItems)
    }



    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="It's amazing that you want to teach classes!"
                description="The first step is to fulfill the sign-up form." />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>
                            Your information
                    </legend>
                        <Input
                            name="name"
                            label="Full name"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }} />
                        <Input
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => { setAvatar(e.target.value) }} />
                        <Input
                            name="whatsapp"
                            label="WhatsApp"
                            value={whatsapp}
                            onChange={(e) => { setWhatsapp(e.target.value) }} />
                        <Textarea
                            name="bio"
                            label="Biography"
                            value={bio}
                            onChange={(e) => { setBio(e.target.value) }} />
                    </fieldset>

                    <fieldset>
                        <legend>
                            About the class
                    </legend>
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
                                { value: 'Portuguese', label: 'Portuguese' },
                                { value: 'Chemistry', label: 'Chemistry' },
                                { value: 'Physics', label: 'Physics' },
                                { value: 'Geography', label: 'Geography' },

                            ]}
                        />
                        <Input
                            name="cost"
                            label="Your hourly rate"
                            value={cost}
                            onChange={(e) => { setCost(e.target.value) }} />
                    </fieldset>
                    <fieldset>
                        <legend>Available times
                    <button type="button" onClick={addNewScheduleItem}>
                                + New time
                    </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week-day"
                                        label="Week day"
                                        value={scheduleItem.week_day}
                                        onChange={(e) => { setScheduleItemValue(index, 'week-day', e.target.value) }}
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
                                    <Input name="from" label="From" type="time" value={scheduleItem.from} onChange={(e) => { setScheduleItemValue(index, 'from', e.target.value) }} />
                                    <Input name="to" label="To" type="time" value={scheduleItem.to} onChange={(e) => { setScheduleItemValue(index, 'to', e.target.value) }} />
                                </div>
                            )
                        })}

                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Important warning" />
                        Important! <br />
                        Complete all the information.
                    </p>
                        <button type="submit">
                            Submit
                    </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}




export default TeacherForm