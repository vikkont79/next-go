export type FormContent = {
  step: number;
  legend: string;
  title: string;
  description: string;
  nav: string;
}

export const formContent: FormContent[] = [
  {
    step: 1,
    legend: 'Выбор даты и участников',
    title: 'Даты пребывания',
    description: 'Укажите предпочтительное количество попутчиков, которых вы хотели бы позвать в поездку, и ее предполагаемую длительность.',
    nav: 'Даты',
  },
  {
    step: 2,
    legend: 'Выбор маршрута',
    title: 'Маршрут',
    description: 'Укажите страны, которые вы хотели бы посетить. Это может быть одна или сразу несколько.',
    nav: 'Маршрут',
  },
  {
    step: 3,
    legend: 'Выбор развлечений',
    title: 'Развлечения',
    description: 'Наконец, расскажите о своих планах времяпровождения. Можно писать в свободной форме и ставить тэги.',
    nav: 'Развлечения',
  }
]
