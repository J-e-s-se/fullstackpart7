import {useState, useEffect} from 'react'
import axios from "axios"

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [allCountries, setAllCountries] = useState([])

  useEffect(() =>  {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setAllCountries(response.data);
      })
  }, [])


  useEffect(() => {
    if (name) {
      setCountry(allCountries.find(cnt => cnt.name.common.toLowerCase() === name.toLowerCase()))
    }
  }, [name, allCountries])

  return country
}