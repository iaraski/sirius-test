interface ChipsProps {
  children: React.ReactNode;
}

export default function Chips({ children, ...props }: ChipsProps) {
  return (
    <button {...props} className='chips'>
      {children}
    </button>
  );
}
