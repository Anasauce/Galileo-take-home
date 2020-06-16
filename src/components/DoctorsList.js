import React, { useState , useEffect} from 'react';
import DoctorFullProfile from './DoctorFullProfile';
import { getData } from '../helpers';

const DoctorsList = (props) => {
    const { doctors } = props;
    const [allTasks, setAllTasks] = useState([]);

    useEffect(() => {
        const getAllTasks = async () => {
            const tasksArray = await getData('https://testapi.io/api/akirayoglu/0/tasks/getTasks')
            setAllTasks(tasksArray);
        }

        getAllTasks();
    }, [])

    const getTasksAssociatedWithDoctor = (tasksArr, id) => {
        const doctorsTasks = tasksArr.filter(task => task.owner === id)
        const sortedTasks = doctorsTasks.sort((a, b) => (a.priority > b.priority) ? 1 : -1)
        return sortedTasks
    }

    return (
        <div>
            <ul className="doctors-list">
                {doctors.map(doctorId => (
                    <li>
                        <DoctorFullProfile
                            id={doctorId}
                            tasks={getTasksAssociatedWithDoctor(allTasks, doctorId)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DoctorsList;