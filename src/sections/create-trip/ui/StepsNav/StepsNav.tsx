import { Button } from '@/shared/ui';
import styles from './StepsNav.module.css';

interface StepsNavProps {
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

const StepsNav = ({
  currentStep,
  onNext,
  onBack,
  isSubmitting = false
}: StepsNavProps) => {

  return (
    <div className={styles.stepsNav}>
      <Button
        onClick={onNext}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Отправка...' : currentStep === 3 ? 'Отправить' : 'Следующий шаг'}
      </Button>

      {currentStep > 1 && (
        <Button
          onClick={onBack}
          variant='outline'
          disabled={isSubmitting}
        >
          На шаг назад
        </Button>
      )}
    </div>
  );
};

export { StepsNav };
