import { MainPage } from '@/sections/main'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Главная | Next Go',
}

export default function Home() {
  return (
    <MainPage />
  );
}
