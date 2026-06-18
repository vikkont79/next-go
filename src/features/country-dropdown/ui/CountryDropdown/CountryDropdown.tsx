import { forwardRef, useCallback, useEffect, useState } from 'react'
import { Button } from '@/shared/ui'
import { Country, countries } from '@/shared/config'
import styles from './CountryDropdown.module.css'

interface CountryDropdownProps {
  onCountrySelect: (country: Country) => void;
  className?: string;
}

const CountryDropdown = forwardRef<HTMLDivElement, CountryDropdownProps>(
  ({ onCountrySelect, className }, ref) => {
    const allCountries = countries
    const [filteredCountries, setFilterdCountries] = useState<Country[]>([])
    const [isCountryOpen, setIsCountryOpen] = useState(false)

    const handleLetterClick = useCallback((letter: string) => {
      const normalizedLetter = letter.toLowerCase()
      const filtered = allCountries
        .filter(country => country.name_ru.toLowerCase().startsWith(normalizedLetter))
        .sort((a, b) => a.name_ru.localeCompare(b.name_ru, 'ru'))
      setFilterdCountries(filtered)
      setIsCountryOpen(true)
    }, [allCountries])

    const handleCountrySelect = useCallback((country: Country) => {
      onCountrySelect(country)
      setIsCountryOpen(false)
    }, [onCountrySelect])

    return (
      <div ref={ref} className={`${styles.dropdown} ${className}`}>

        <div className={styles.content}>
          <div className={styles.alfabet}>
            {'АБВГДЕЗИКЛМНОПРСТУФХЧШЭЮЯ'.split('').map(letter => (
              <Button
                key={letter}
                className={styles.letter}
                variant='transparent'
                onClick={() => handleLetterClick(letter)}
              >
                {letter}
              </Button>
            ))}
          </div>
          {isCountryOpen && (
            <div className={styles.countries}>
              {filteredCountries.map(country => (
                <Button
                  key={country.code}
                  className={styles.country}
                  variant='transparent'
                  onClick={() => handleCountrySelect(country)}
                >
                  {country.name_ru}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
)

export { CountryDropdown }
