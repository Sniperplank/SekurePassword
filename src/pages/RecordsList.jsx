import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CardBox } from '../StyledComponents/CardBox';
import { StyledInput } from '../StyledComponents/StyledInput';

function RecordsList() {
  const [records, setRecords] = useState({})
  const { user, setUser } = useAuth()
  const [update, setUpdate] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [currentURL, setCurrentURL] = useState('')
  const [matchingRecords, setMatchingRecords] = useState([]) // To store records matching the URL

  const updatePage = () => {
    setUpdate(prev => prev + 1)
  }

  const handleAddRecord = () => {
    navigate('/add')
  }

  const handleRecordDetails = (record) => {
    navigate('/details', { state: { record: record } })
  }

  const logout = () => {
    chrome.storage.local.remove('profile', () => {
      if (chrome.runtime.lastError) {
        console.error("Failed to clear profile:", chrome.runtime.lastError.message)
      } else {
        console.log("User profile cleared.")
        navigate('/')
      }
    })
  }

  const filteredRecords = Object.entries(records).filter(record => {
    return (
      record[1].title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const checkMatchingRecords = (url) => {
    const matches = Object.entries(records).filter(([key, value]) => {
      return url.includes(value.login_url);
    });

    setMatchingRecords(matches);
  }

  const fetchActiveTabURL = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const activeTabURL = tabs[0].url || '';
        setCurrentURL(activeTabURL);
        checkMatchingRecords(activeTabURL);
        console.log("Active Tab URL:", activeTabURL);
      }
    });
  };

  // useEffect(() => {
  //   setUser(JSON.parse(localStorage.getItem('profile')))
  // }, [])


  useEffect(() => {
    async function getRecords() {
      console.log(user)
      const records = await axios.get('http://localhost:5000/record?email=' + user?.result.email)
      setRecords(records.data)
    }
    getRecords()
  }, [user, update, location])

  // Monitor active URL changes
  useEffect(() => {
    const handleTabUpdate = (tabId, changeInfo, tab) => {
      if (changeInfo.url) {
        setCurrentURL(changeInfo.url)
        console.log("Tab Updated URL:", changeInfo.url)
        checkMatchingRecords(changeInfo.url)
      }
    };

    const handleTabActivated = (activeInfo) => {
      fetchActiveTabURL() // Fetch the URL of the newly activated tab
    };

    // Add listeners
    chrome.tabs.onUpdated.addListener(handleTabUpdate)
    chrome.tabs.onActivated.addListener(handleTabActivated)

    // Fetch the initial active tab URL on component mount
    fetchActiveTabURL()

    // Cleanup listeners on component unmount
    return () => {
      chrome.tabs.onUpdated.removeListener(handleTabUpdate)
      chrome.tabs.onActivated.removeListener(handleTabActivated)
    };
  }, [records, location, currentURL]) // Re-run when records are updated

  return (
    <Stack spacing={4}>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h6' color='primary'>{user?.result.name}</Typography>
        <Button color='error' onClick={logout} startIcon={<LogoutIcon />}>Logout</Button>
      </Stack>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h6' color='primary' textAlign='center'>Records List</Typography>
        <AddBoxIcon onClick={handleAddRecord} color='primary' fontSize='large' />
      </Stack>
      <StyledInput variant='outlined' label={'Search ' + records.length + ' records by title'} type='search' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <Typography variant="body2">Active URL: {currentURL || 'No active URL detected'}</Typography>
      {
        matchingRecords.length > 0 && (
          <Typography variant="body2">
            {matchingRecords.length} matching record(s) found for the current URL!
          </Typography>
        )
      }
      {
        !records.length ?
          <CircularProgress size={50} />
          : (
            <Stack spacing={3} sx={{ marginTop: 10 }}>
              {
                filteredRecords.map(([key, value]) => {
                  return (
                    <CardBox component={Button} onClick={() => handleRecordDetails(value)} sx={{ paddingTop: 2, paddingBottom: 2, '&:hover': { color: 'primary.main' } }} key={key}>{value.title}</CardBox>
                  )
                })
              }
            </Stack>
          )
      }
    </Stack>
  )
}

export default RecordsList