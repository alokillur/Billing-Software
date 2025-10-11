import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'
import { fetchCategories } from '../service/CategoryService';

function AppContextProvider({ children }) {

    const[categories, setCategories] = useState([]);

    useEffect(() => {
        async function loadData() {
            const response = await fetchCategories();
            setCategories(response.data);
        }
        loadData();
    }, []);

    const contextValue = {
        categories,
        setCategories,
    }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
