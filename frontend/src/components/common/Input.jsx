import './Input.css';

const Input = ({
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  label,
  error,
  required = false,
  disabled = false,
  className = ''
}) => {
  const inputClass = `input ${error ? 'input-error' : ''} ${className}`;

  return (
    <div className="input-group">
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        className={inputClass}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
      />
      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
};

export default Input;