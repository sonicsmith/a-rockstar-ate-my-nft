interface InputProps {
  value: string;
  setValue: (value: string) => void;
  label: string;
  suggestion?: string;
}

export function Input({ value, setValue, label, suggestion }: InputProps) {
  const typedLength = value.length;
  let suggestedExtra = "";
  if (suggestion) {
    suggestedExtra = suggestion.slice(typedLength);
  }
  return (
    <div className="nes-field" style={{ position: "relative" }}>
      <label htmlFor="name_field">{label}</label>
      <input
        autoComplete="off"
        className="nes-input"
        id="name_field"
        onChange={(e) => { setValue(e.target.value); }}
        type="text"
        value={value}
      />
      {suggestion ? <div
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
        </div> : null}
    </div>
  );
}
