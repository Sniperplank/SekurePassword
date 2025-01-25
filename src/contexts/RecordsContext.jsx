import React, { createContext, useContext, useState } from 'react'

const RecordsContext = createContext()


export const RecordsProvider = ({ children }) => {
    const [records, setRecords] = useState(null);

    return (
        <RecordsContext.Provider value={{ records, setRecords }}>
            {children}
        </RecordsContext.Provider>
    )
}

export const useRecords = () => {
    const context = useContext(RecordsContext)
    if (!context) {
        throw new Error('useRecords must be used within a RecordsProvider')
    }
    return context
}
