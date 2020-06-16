import React, { useState , useContext, useEffect} from 'react';
import { SearchResultsVisibleContext } from './Main';
import FuzzySearch from 'fuzzy-search';
import Doctor from './Doctor';
import { getData } from '../helpers'

const Search = () => {
    const [resultsVisible, setResultsVisible ] = useContext(SearchResultsVisibleContext);

    const [providers, setProviders] = useState([]);
    const [shownProviders, setShownProviders] = useState([])
    const [searchString, setSearchString] = useState('')

    useEffect(() => {
        const getAllProviders = async () => {
            const providersArray = await getData('https://testapi.io/api/akirayoglu/0/reference/getDoctors');
            setProviders(providersArray);
        }

        getAllProviders()
    }, [])

    const handleListAllProvidersClick = () => {
        setResultsVisible(true);
        setShownProviders(providers);
    }

    const removeAddedProviderFromSearch =  async (id) => {
        const updatedProviders = await providers.filter(provider => provider.doctor_id !== id)
        setProviders(updatedProviders);
    }

    const searcher = new FuzzySearch(providers, ['first_name', 'last_name']); 

    useEffect(() => {
        const searchResult = searcher.search(searchString)
        setShownProviders(searchResult)
        setResultsVisible(true)
    }, [searchString])



    const searchResults = () => {
        if (resultsVisible) {
            return (
                <>
                <section className="search-results">
                    <ul className="dashboard-row__list">
                        {shownProviders.map(doctor => (
                            <li key={doctor.doctor_id}>
                                <Doctor
                                    id={doctor.doctor_id}
                                    firstName={doctor.first_name}
                                    lastName={doctor.last_name}
                                    degree={doctor.degree}
                                    removeAddedProviderFromSearch={removeAddedProviderFromSearch}
                                />
                            </li>
                        ))}
                    </ul>
                </section>
                </>
            )
        } else {
            return null;
        }
    }

    return (
        <div className="search">
            <h3 className="search__label">SEARCH PROVIDERS:</h3>
            <div className="search__form">
                <img className="search__icon" src={`${process.env.PUBLIC_URL}search-solid.svg`}/>
                <input 
                    className="search__input"
                    type="text"
                    value={searchString}
                    onChange={e => setSearchString(e.target.value)}
                ></input>
                <div className="search__button--all" onClick={handleListAllProvidersClick}>List All Providers</div>
            </div>
            {searchResults()}
        </div>

    )
}

export default Search;