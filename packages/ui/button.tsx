interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "success";
  disabled?: boolean;
}

export const Button = (props: ButtonProps) => {
  let variant = props.variant ? `is-${props.variant}` : "is-normal";
  if (props.disabled) {
    variant = "is-disabled";
  }
  return (
    <div className="h-fit">
      <button className={`nes-btn ${variant}`}>{props.children}</button>
    </div>
  );
};
