import React, { useState, useEffect } from 'react';
import { getData } from '../helpers';

const DoctorFullProfile = (props) => {
    const { id, tasks } = props

    const [ doctorProfile, setDoctorProfile ] = useState({})

    useEffect(() => {
        const getFullProfile = async (drId) => {
            const profile = await getData(`https://testapi.io/api/akirayoglu/0/doctor/${drId}`)
            setDoctorProfile(profile[0])
        }
        getFullProfile(id)
    }, {})

    const { first_name, last_name, degree,  dob} = doctorProfile;
    return (
        <div className="doctor-profile">
            <div className="doctor-profile__header">
                <h3 className="doctor-profile__name">Dr {first_name} {last_name}, {degree}</h3>
                <p className="doctor-profile__dob">DATE OF BIRTH: {dob}</p>
            </div>
            <ul className="doctor-profile__task">
                {tasks.map(task => (
                    <li>
                        <p className="doctor-profile__task-id">{task.task_id}</p>
                        <p className="doctor-profile_task-priority">Priority: {task.priority}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
    
}

export default DoctorFullProfile;