import { forwardRef } from 'react';

interface ChipsProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  active?: boolean;
}

const Chips = forwardRef<HTMLButtonElement, ChipsProps>(({ children, active, className, ...props }, ref) => {
  const classes = ['chips', active ? 'active' : '', className].filter(Boolean).join(' ');
  return (
    <button ref={ref} {...props} className={classes}>
      {children}
    </button>
  );
});
export default Chips;
