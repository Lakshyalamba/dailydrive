import './ProgressBar.css';

const ProgressBar = ({ 
  progress, 
  max = 100, 
  label, 
  showPercentage = true,
  size = 'medium',
  color = 'primary'
}) => {
  const percentage = Math.min((progress / max) * 100, 100);

  return (
    <div className="progress-container">
      {label && (
        <div className="progress-header">
          <span className="progress-label">{label}</span>
          {showPercentage && (
            <span className="progress-percentage">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className={`progress-bar progress-${size}`}>
        <div 
          className={`progress-fill progress-${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;