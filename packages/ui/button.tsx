interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "success" | "error" | "warning";
  disabled?: boolean;
}

export function Button(props: ButtonProps) {
  let variant = props.variant ? `is-${props.variant}` : "is-normal";
  if (props.disabled) {
    variant = "is-disabled";
  }
  return (
    <div>
      <button
        className={`nes-btn ${variant}`}
        onClick={props.onClick}
        style={{
          minWidth: "128px",
        }}
      >
        {props.children}
      </button>
    </div>
  );
}
