interface ContainerProps {
  children: React.ReactNode;
  label?: string;
  rounded?: boolean;
}

export function Container({ children, label, rounded }: ContainerProps) {
  const roundStyle = rounded ? "is-rounded" : "";
  const labelStyle = label ? "with-title" : "";
  return (
    <div className={`nes-container ${roundStyle} ${labelStyle}`}>
      {label ? <h3 className="title">{label}</h3> : null}
      {children}
    </div>
  );
}
