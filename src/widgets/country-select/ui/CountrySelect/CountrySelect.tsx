import { useCallback, useEffect, useRef, useState } from 'react'
import { CountryDropdown } from '@/features/country-dropdown/ui/CountryDropdown/CountryDropdown'
import { IconButton } from '@/shared/ui'
import { Country } from '@/shared/config'
import Image from 'next/image'
import styles from './CountrySelect.module.css'


interface CountrySelectProps {
  value: Country[];
  onChange: (value: Country[]) => void;
  error?: string;
}

const CountrySelect = ({ value, onChange, error }: CountrySelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleOpenDropdown = useCallback((index: number) => {
    setActiveIndex(index)
    setIsOpen(true)
  }, [])

  const handleAddCountry = useCallback((country: Country) => {
    onChange([...value, country])
    setIsOpen(false)
  }, [onChange, value])

  const handleReplaceCountry = useCallback((country: Country) => {
    if (activeIndex !== null) {
      const newValue = [...value]
      newValue[activeIndex] = country
      onChange(newValue)
      setIsOpen(false)
    }
  }, [activeIndex, onChange, value])

  const handleRemoveCountry = useCallback((index: number) => {
    const newValue = value.filter((_, i) => i !== index)
    onChange(newValue)
  }, [onChange, value])

  const handleCloseDropdown = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    const handleOutsideClick = (e: MouseEvent) => {
      if (!isOpen) return
      if (dropdownRef.current && dropdownRef.current.contains(e.target as Node)) {
        return
      }
      setIsOpen(false)
    };
    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen, dropdownRef])

  return (
    <div className={styles.selects}>
      {value.map((country, index) => (
        <div
          key={`${country}-${index}`}
          className={styles.select}
        >
          <IconButton
            className={styles.selectButton}
            icon='arrow-down'
            iconPosition='right'
            variant='transparent'
            onClick={() => handleOpenDropdown(index)}
          >
            {country.name_ru}
          </IconButton>
          <Image
            src={`https://cdn.jsdelivr.net/npm/flag-icons@6.6.6/flags/4x3/${country.code.toLowerCase()}.svg`}
            alt={country.name_ru}
            className={styles.flag}
            width={70}
            height={47}
            onError={(e) => {
              // fallback: скрыть или поставить заглушку
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
          <IconButton
            className={styles.close}
            icon='close'
            iconSizeMob={10}
            variant='transparent'
            onClick={() => handleRemoveCountry(index)}
          />
          {isOpen && activeIndex === index && (
            <>
              <IconButton
                className={styles.closeButton}
                icon='close'
                iconPosition='right'
                variant='transparent'
                onClick={handleCloseDropdown}
              >
                Выберите страну
              </IconButton>
              <CountryDropdown
                ref={dropdownRef}
                className={styles.countryDropdown}
                onCountrySelect={handleReplaceCountry}
              />
            </>
          )}
        </div>
      ))}

      {value.length < 4 && (
        <div
          className={styles.select}
        >
          <IconButton
            className={styles.selectButton}
            icon='plus'
            iconSize={20}
            iconPosition='right'
            variant='transparent'
            onClick={() => handleOpenDropdown(-1)}
          >
            Добавить страну
          </IconButton>
          {error && (
            <span className={styles.error}>{error}</span>
          )}
          {isOpen && activeIndex === -1 && (
            <>
              <IconButton
                className={styles.closeButton}
                icon='close'
                iconPosition='right'
                variant='transparent'
                onClick={handleCloseDropdown}
              >
                Выберите страну
              </IconButton>
              <CountryDropdown
                ref={dropdownRef}
                className={styles.countryDropdown}
                onCountrySelect={handleAddCountry}
              />
            </>
          )}
        </div>
      )}
    </div >
  )
}

export { CountrySelect }
