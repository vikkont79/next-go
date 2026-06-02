import { Button } from '@/shared/ui';
import styles from './StepsNav.module.css';

interface StepsNavProps {
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  isSubmit?: boolean;
}

const StepsNav = ({
  currentStep,
  onNext,
  onBack,
  isSubmit = false
}: StepsNavProps) => {

  return (
    <div className={styles.stepsNav}>
      <Button
        onClick={onNext}
        disabled={isSubmit}
      >
        {isSubmit ? 'Отправка...' : currentStep === 3 ? 'Отправить' : 'Следующий шаг'}
      </Button>

      {currentStep > 1 && (
        <Button
          onClick={onBack}
          variant='outline'
          disabled={isSubmit}
        >
          На шаг назад
        </Button>
      )}
    </div>
  );
};

export { StepsNav };
