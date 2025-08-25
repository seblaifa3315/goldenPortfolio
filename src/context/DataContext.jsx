import { createContext, useState, useEffect, useContext } from "react";
import contentData from "../data/data.json";

// 1. Create context
const DataContext = createContext()

// 2. Create provider component
export const DataProvider = ({children}) => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(contentData)
                setLoading(false)
            } catch (err) {
                console.log("Failed to fetch data: ", err)
            }
        }
        fetchData()
    }, [])



  return (
    <DataContext.Provider value={{ data, loading }}>
        {children}
    </DataContext.Provider>
  )
}

// 3. Create a hook for easier access
export const useData = () => useContext(DataContext)