import './styles.css'
import React from 'react'
import whatsAppIncon from '../../assets/images/icons/whatsapp.svg'


export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface TeacherItemProps {
    teacher: Teacher;
}


const TeacherItem: React.FunctionComponent<TeacherItemProps> = ({ teacher }) => {
    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name} />
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
            <p>
                {teacher.bio}
            </p>

            <footer>
                <p>
                    Wage
                <strong>$ {teacher.cost}</strong>
                </p>
                <button type="button">
                    <img src={whatsAppIncon} alt="Whatsapp" />
                Contact
            </button>
            </footer>
        </article>
    )
}


export default TeacherItem