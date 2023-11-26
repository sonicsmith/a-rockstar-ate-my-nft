interface InputProps {
  value: string;
  setValue: (value: string) => void;
  label: string;
  suggestion?: string;
}

export const Input = ({ value, setValue, label, suggestion }: InputProps) => {
  const typedLength = value.length;
  let suggestedExtra = "";
  if (suggestion) {
    suggestedExtra = suggestion.slice(typedLength);
  }
  return (
    <div className="nes-field" style={{ position: "relative" }}>
      <label htmlFor="name_field">{label}</label>
      <input
        type="text"
        id="name_field"
        className="nes-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete="off"
      />
      {suggestion && (
        <div
          style={{
            position: "absolute",
            top: 44,
            left: 24,
            zIndex: 1,
            flex: 1,
          }}
        >
          <span>{value}</span>
          <span
            style={{
              color: "#aaa",
            }}
          >
            {suggestedExtra}
          </span>
        </div>
      )}
    </div>
  );
};
