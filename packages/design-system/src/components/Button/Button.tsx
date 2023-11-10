import { motion } from 'framer-motion';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  text: string;
}

export const Button = ({ text, onClick, disabled = false, className = '' }: ButtonProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`text-Body3 bg-DTPurple-400 w-full rounded-xs px-14 py-9 text-white disabled:opacity-50 ${className}`}
      onClick={onClick}
      disabled={disabled}>
      {text}
    </motion.button>
  );
};
