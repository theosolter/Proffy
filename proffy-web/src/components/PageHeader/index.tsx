import React from 'react'
import { Link } from 'react-router-dom'
import backIcon from '../../assets/images/icons/back.svg'
import logoImg from '../../assets/images/logo.svg'
import './styles.css'

interface PageHeaderProps {
    title: string;
    description?: string;
}

const PageHeader: React.FunctionComponent<PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Back" />
                </Link>
                <img src={logoImg} alt="Professr" />
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>

                {props.description && <p>{props.description}</p>}

            </div>
            {props.children}
        </header>


    )
}


export default PageHeader