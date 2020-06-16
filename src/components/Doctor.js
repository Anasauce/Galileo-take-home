import React, {useContext} from 'react';
import { SearchResultsVisibleContext } from './Main';
import { ProvidersListContext } from './Main';


const Doctor = (props) => {
    const [ resultsVisible, setResultsVisible ] = useContext(SearchResultsVisibleContext);
    const [ providersList, setProvidersList ] = useContext(ProvidersListContext);
    const { id, firstName, lastName, degree, removeAddedProviderFromSearch } = props

    const handleAddDoctorClick = () => {
        setResultsVisible(false);
        removeAddedProviderFromSearch(id);
        const updatedProvidersList = providersList.concat(id);
        setProvidersList(updatedProvidersList);
    }

    
    
    return (
        <div className="doctor" onClick={() => handleAddDoctorClick()}>
            <p>Dr {firstName} {lastName}, {degree}</p>
            <img className="doctor__add-doctor-icon" src={`${process.env.PUBLIC_URL}user-plus-solid.svg`}/>
        </div>
    )
}

export default Doctor