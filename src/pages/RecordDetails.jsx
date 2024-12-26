import React from 'react'
import { useLocation } from 'react-router-dom'

function RecordDetails() {
    const location = useLocation()
    const record = location.state?.record

    return (
        <div>
            RecordDetails
            {record.title}
        </div>
    )
}

export default RecordDetails