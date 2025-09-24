import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false, 
  loading = false,
  type = 'button',
  className = ''
}) => {
  const buttonClass = `btn btn-${variant} btn-${size} ${className} ${loading ? 'loading' : ''}`;

  return (
    <button 
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="spinner"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;