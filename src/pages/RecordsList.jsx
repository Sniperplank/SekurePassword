import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function RecordsList() {
  const [records, setRecords] = useState({})
  const [update, setUpdate] = useState(0)
  const location = useLocation()
  const user = location.state?.user

  const updatePage = () => {
    setUpdate(prev => prev + 1)
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
      <Button variant='contained' color='primary' startIcon={<AddIcon />} sx={{ height: 40, textTransform: 'none', float: 'right', marginRight: 7 }}>New Entry</Button>
      {
        !records.length ?
          <CircularProgress size={50} />
          : (
            <>
              {
                Object.entries(records).map(([key, value]) => {
                  return (
                    <Stack key={key} width='100%' spacing={6} sx={{ marginTop: 10 }}>
                      <Typography variant='h4' color='primary' textAlign='center'>{value.title}</Typography>
                    </Stack>
                  )
                })
              }
            </>
          )
      }
    </Box>
  )
}

export default RecordsList