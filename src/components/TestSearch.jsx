import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Autocomplete, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { config } from '../service/api';
import { BASE_URL } from '../service/config';
const SearchForm = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const history = useNavigate();

  const getAthletes = async (searchText) => {
    try {
      const response = await axios.get(BASE_URL+`Api/AthleteProfile/GetList?Name=${searchText}`,{
        headers: config()
      });
      const athletes = response.data.data;
      setOptions(athletes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOptionChange = (event, value) => {
    setSelectedOption(value);
    console.log('Tes value select',selectedOption.pvid)
  };

  const handleSearch = () => {
    if (selectedOption) {
      const pvid = selectedOption.pvid;
      history(`/athlete-profile/${pvid}`);
    }
  };

  return (
    <div>
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.name ? option.name : ""}
        onChange={handleOptionChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Athlete"
            variant="outlined"
            onChange={(event) => getAthletes(event.target.value)}
          />
        )}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchForm;
