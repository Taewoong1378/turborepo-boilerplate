import classNames from 'classnames';
import { motion } from 'framer-motion';
import { Icon } from '../Icon';
import { LoadingIconMedium } from '../LoadingIcon';

interface ActionButtonProps {
  actionType: 'Skip' | 'Regenerate' | 'Confirm';
  onClick: () => void;
  isLoading?: boolean;
  isActive?: boolean;
}

export const ActionButton = ({ actionType, isActive, onClick, isLoading }: ActionButtonProps) => {
  const actionDetails = {
    Skip: {
      borderColor: 'border-red',
      color: 'red',
      icon: 'skip',
      size: 24,
      label: 'Skip',
    },
    Regenerate: {
      borderColor: 'border-gray-700',
      color: 'gray-700',
      icon: 'refresh',
      size: 24,
      label: 'Regenerate',
    },
    Confirm: {
      borderColor: 'border-red',
      color: 'red',
      icon: 'confirm',
      size: 12,
      label: 'Confirm',
    },
  } as const;

  const details = actionDetails[actionType];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={classNames(
        'flex w-[130px] cursor-pointer items-center justify-center gap-5 rounded-md border-[1px]',
        isActive ? details.borderColor : 'border-gray-700',
      )}
      onClick={onClick}>
      {isLoading && actionType === 'Regenerate' ? (
        <LoadingIconMedium />
      ) : (
        <Icon icon={details.icon} size={details.size} color={details.color} />
      )}
      <div className={classNames('text-Body5', isActive && `text-${details.color}`)}>
        {details.label}
      </div>
    </motion.div>
  );
};
