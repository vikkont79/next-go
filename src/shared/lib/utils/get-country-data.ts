import { countries } from '../../config'

export const getCountryByCode = (code: string) => {
  return countries.find(country => country.code === code)
}
