import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function RecordsList() {
  const [records, setRecords] = useState({})
  const [update, setUpdate] = useState(0)
  const location = useLocation()
  const user = location.state?.user
  const navigate = useNavigate()

  const updatePage = () => {
    setUpdate(prev => prev + 1)
  }

  const handleAddRecord = () => {
    navigate('/add', { state: { user: user } })
  }

  const handleRecordDetails = (record) => {
    navigate('/details', { state: { record: record } })
  }

  useEffect(() => {
    async function getRecords() {
      console.log(user)
      const records = await axios.get('http://localhost:5000/record?email=' + user.result.email)
      setRecords(records.data)
    }
    getRecords()
  }, [])

  return (
    <Box p={{ xs: 1, sm: 10 }} pl={{ xs: 1, sm: 20 }} pr={{ xs: 1, sm: 20 }}>
      <Typography variant='h4' color='primary' textAlign='center'>Password Records</Typography>
      <Button onClick={handleAddRecord} variant='contained' color='primary' startIcon={<AddIcon />} sx={{ height: 40, textTransform: 'none', float: 'right', marginRight: 7 }}>New Entry</Button>
      {
        !records.length ?
          <CircularProgress size={50} />
          : (
            <Stack width='100%' spacing={6} sx={{ marginTop: 10 }}>
              {
                Object.entries(records).map(([key, value]) => {
                  return (
                    <Button key={key} onClick={() => handleRecordDetails(value)}>{value.title}</Button>
                  )
                })
              }
            </Stack>
          )
      }
    </Box>
  )
}

export default RecordsList