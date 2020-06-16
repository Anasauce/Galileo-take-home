import React, { useState, createContext } from 'react';
import Search from './Search';
import DoctorsList from './DoctorsList';

export const ProvidersListContext = createContext([]);
export const SearchResultsVisibleContext = createContext(false);


const Main = () => {
    const [providersList, setProvidersList] = useState([]);
    const [resultsVisible, setResultsVisible] = useState(false);

    return (
        <div className="main">
            <ProvidersListContext.Provider value={[providersList, setProvidersList]}>
                <SearchResultsVisibleContext.Provider value={[resultsVisible, setResultsVisible]}>
                    <Search />
                    <DoctorsList doctors={providersList}/>
                </SearchResultsVisibleContext.Provider>
            </ProvidersListContext.Provider>
        </div>

    )
}

export default Main;
