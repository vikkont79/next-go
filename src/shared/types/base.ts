/* Базовые пропсы для всех кнопок/кликабельных элементов */
export interface BasePressableProps {
  /** Текст или содержимое кнопки, строки */
  children?: React.ReactNode;
  /** Дополнительные CSS-классы */
  className?: string;
  disabled?: boolean;
  // Добавляем popover-атрибуты
  popoverTarget?: string;
  popoverTargetAction?: 'toggle' | 'show' | 'hide';
}

/* Базовые пропсы для инпутов/форм */
export interface BaseInputProps {
  /** Значение поля */
  value: string;
  /** Обработчик изменения значения */
  onChange: (value: string) => void;
  /** Плейсхолдер */
  placeholder?: string;
  /** Отключено ли поле */
  disabled?: boolean;
  /** Дополнительные CSS-классы */
  className?: string;
}

/* Варианты внешнего вида компонентов */
export type Variant = 'primary' | 'secondary' | 'outline' | 'transparent';
export type Size = 'small' | 'base' | 'large';
