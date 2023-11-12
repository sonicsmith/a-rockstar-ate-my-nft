interface ContainerProps {
  children: React.ReactNode;
  label: string;
}

export const Container = ({ children, label }: ContainerProps) => {
  return (
    <div className="nes-container with-title w-full">
      <h3 className="title">{label}</h3>
      {children}
    </div>
  );
};
