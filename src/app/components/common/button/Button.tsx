import React from 'react';
import styles from '@/app/styles/common/button/Button.module.css';
import { cn } from '@/app/api/utils';
import { cva, VariantProps } from 'class-variance-authority';

type ButtonProps = {
  children: React.ReactNode;
} & VariantProps<typeof buttonVariants>;

const buttonVariants = cva(styles.button, {
  variants: {
    color: {
      red: styles.red,
      green: styles.green,
      blue: styles.blue,
    },
    size: {
      sm: styles.sm,
      lg: styles.lg,
    },
  },
  defaultVariants: {
    color: 'red',
    size: 'lg',
  },
});

const Button = ({ children, color, size }: ButtonProps) => {
  return (
    <div className={cn(buttonVariants({ color, size }))}>
      <span className={styles.text}>{children}</span>
    </div>
  );
};

export default Button;
