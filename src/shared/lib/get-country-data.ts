import { countries } from '../config/countries'

export const getCountryByCode = (code: string) => {
  return countries.find(country => country.code === code)
}
