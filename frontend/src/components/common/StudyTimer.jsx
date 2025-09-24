import { useState, useEffect, useRef } from 'react';
import Button from './Button';
import './StudyTimer.css';

const StudyTimer = ({ onSessionComplete }) => {
  const [time, setTime] = useState(25 * 60); // 25 minutes default
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionType, setSessionType] = useState('study'); // study, break
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef(null);

  const presetTimes = [
    { label: '15 min', value: 15 * 60 },
    { label: '25 min', value: 25 * 60 },
    { label: '45 min', value: 45 * 60 },
    { label: '60 min', value: 60 * 60 }
  ];

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTime(time => {
          if (time <= 1) {
            handleSessionEnd();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, isPaused]);

  const handleSessionEnd = () => {
    setIsActive(false);
    setSessions(prev => prev + 1);
    
    if (sessionType === 'study') {
      setSessionType('break');
      setTime(5 * 60); // 5 minute break
      onSessionComplete?.('study');
    } else {
      setSessionType('study');
      setTime(25 * 60); // Back to study
      onSessionComplete?.('break');
    }
  };

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(!isPaused);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setTime(25 * 60);
    setSessionType('study');
  };

  const setPresetTime = (minutes) => {
    if (!isActive) {
      setTime(minutes);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = sessionType === 'study' 
    ? ((25 * 60 - time) / (25 * 60)) * 100
    : ((5 * 60 - time) / (5 * 60)) * 100;

  return (
    <div className="study-timer">
      <div className="timer-header">
        <h3>Study Timer</h3>
        <div className="session-info">
          <span className={`session-type ${sessionType}`}>
            {sessionType === 'study' ? '📚 Study Session' : '☕ Break Time'}
          </span>
          <span className="session-count">Sessions: {sessions}</span>
        </div>
      </div>

      <div className="timer-display">
        <div className="timer-circle">
          <svg className="progress-ring" width="200" height="200">
            <circle
              className="progress-ring-background"
              cx="100"
              cy="100"
              r="90"
            />
            <circle
              className="progress-ring-progress"
              cx="100"
              cy="100"
              r="90"
              style={{
                strokeDasharray: `${2 * Math.PI * 90}`,
                strokeDashoffset: `${2 * Math.PI * 90 * (1 - progress / 100)}`,
                stroke: sessionType === 'study' ? 'var(--primary-green)' : 'var(--soft-blue)'
              }}
            />
          </svg>
          <div className="timer-text">
            <span className="time-display">{formatTime(time)}</span>
            <span className="time-label">{sessionType}</span>
          </div>
        </div>
      </div>

      <div className="timer-presets">
        {presetTimes.map(preset => (
          <button
            key={preset.value}
            className={`preset-btn ${time === preset.value ? 'active' : ''}`}
            onClick={() => setPresetTime(preset.value)}
            disabled={isActive}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="timer-controls">
        {!isActive ? (
          <Button onClick={startTimer} size="large" className="start-btn">
            Start Session
          </Button>
        ) : (
          <div className="active-controls">
            <Button onClick={pauseTimer} variant="outline">
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
            <Button onClick={resetTimer} variant="outline">
              Reset
            </Button>
          </div>
        )}
      </div>

      <div className="timer-tips">
        <h4>Study Tips:</h4>
        <ul>
          <li>Focus on one task during each session</li>
          <li>Take breaks to maintain concentration</li>
          <li>Stay hydrated and comfortable</li>
        </ul>
      </div>
    </div>
  );
};

export default StudyTimer;