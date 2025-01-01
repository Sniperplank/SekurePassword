import React from 'react'
import { useLocation } from 'react-router-dom'

function RecordDetails() {
    const location = useLocation()
    const record = location.state?.record

    return (
        <div>
            RecordDetails
            {record.title}
            {record.login}
            {record.password}
        </div>
    )
}

export default RecordDetails