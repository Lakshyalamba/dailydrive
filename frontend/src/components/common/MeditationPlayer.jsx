import { useState, useEffect, useRef } from 'react';
import Button from './Button';
import './MeditationPlayer.css';

const MeditationPlayer = ({ onSessionComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(10 * 60); // 10 minutes default
  const [selectedGuide, setSelectedGuide] = useState('breathing');
  const [backgroundSound, setBackgroundSound] = useState('nature');
  const [volume, setVolume] = useState(0.5);
  const intervalRef = useRef(null);

  const meditationGuides = [
    { id: 'breathing', name: 'Breathing Focus', duration: 10 },
    { id: 'body-scan', name: 'Body Scan', duration: 15 },
    { id: 'mindfulness', name: 'Mindfulness', duration: 20 },
    { id: 'loving-kindness', name: 'Loving Kindness', duration: 12 }
  ];

  const backgroundSounds = [
    { id: 'nature', name: '🌿 Forest Sounds', icon: '🌲' },
    { id: 'ocean', name: '🌊 Ocean Waves', icon: '🌊' },
    { id: 'rain', name: '🌧️ Gentle Rain', icon: '☔' },
    { id: 'silence', name: '🔇 Silence', icon: '🤫' }
  ];

  const guidedInstructions = {
    breathing: [
      { time: 0, text: "Welcome. Find a comfortable position and close your eyes." },
      { time: 30, text: "Begin by taking a deep breath in through your nose..." },
      { time: 60, text: "And slowly exhale through your mouth..." },
      { time: 120, text: "Focus on the natural rhythm of your breathing..." },
      { time: 300, text: "If your mind wanders, gently return to your breath..." },
      { time: 480, text: "Take three more deep breaths as we prepare to finish..." }
    ],
    'body-scan': [
      { time: 0, text: "Lie down comfortably and close your eyes." },
      { time: 30, text: "Start by focusing on your toes..." },
      { time: 120, text: "Move your attention to your feet and ankles..." },
      { time: 300, text: "Notice any sensations in your legs..." },
      { time: 600, text: "Bring awareness to your torso and chest..." },
      { time: 780, text: "Slowly prepare to return to the present moment..." }
    ]
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            handleSessionEnd();
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, duration]);

  useEffect(() => {
    const guide = meditationGuides.find(g => g.id === selectedGuide);
    if (guide) {
      setDuration(guide.duration * 60);
      setCurrentTime(0);
    }
  }, [selectedGuide]);

  const handleSessionEnd = () => {
    setIsPlaying(false);
    onSessionComplete?.('meditation');
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetSession = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / duration) * 100;

  const getCurrentInstruction = () => {
    const instructions = guidedInstructions[selectedGuide] || [];
    const current = instructions
      .filter(inst => currentTime >= inst.time)
      .pop();
    return current?.text || "Focus on your breath and stay present.";
  };

  return (
    <div className="meditation-player">
      <div className="meditation-header">
        <h3>Guided Meditation</h3>
        <div className="session-info">
          <span className="meditation-type">🧘 {meditationGuides.find(g => g.id === selectedGuide)?.name}</span>
          <span className="session-duration">{formatTime(duration - currentTime)} remaining</span>
        </div>
      </div>

      <div className="meditation-display">
        <div className="meditation-circle">
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
                stroke: 'var(--soft-blue)'
              }}
            />
          </svg>
          <div className="meditation-content">
            <div className="breathing-indicator">
              <div className={`breath-circle ${isPlaying ? 'breathing' : ''}`}></div>
            </div>
            <span className="time-display">{formatTime(currentTime)}</span>
          </div>
        </div>
      </div>

      <div className="meditation-instruction">
        <p>{getCurrentInstruction()}</p>
      </div>

      <div className="meditation-guides">
        <h4>Choose Your Guide:</h4>
        <div className="guide-options">
          {meditationGuides.map(guide => (
            <button
              key={guide.id}
              className={`guide-btn ${selectedGuide === guide.id ? 'active' : ''}`}
              onClick={() => setSelectedGuide(guide.id)}
              disabled={isPlaying}
            >
              {guide.name}
              <span className="guide-duration">{guide.duration}min</span>
            </button>
          ))}
        </div>
      </div>

      <div className="background-sounds">
        <h4>Background Sound:</h4>
        <div className="sound-options">
          {backgroundSounds.map(sound => (
            <button
              key={sound.id}
              className={`sound-btn ${backgroundSound === sound.id ? 'active' : ''}`}
              onClick={() => setBackgroundSound(sound.id)}
            >
              <span className="sound-icon">{sound.icon}</span>
              <span className="sound-name">{sound.name.split(' ').slice(1).join(' ')}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="volume-control">
        <label>Volume: {Math.round(volume * 100)}%</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="volume-slider"
        />
      </div>

      <div className="meditation-controls">
        {!isPlaying ? (
          <Button onClick={togglePlayPause} size="large" className="start-btn">
            Start Meditation
          </Button>
        ) : (
          <div className="active-controls">
            <Button onClick={togglePlayPause} variant="outline">
              Pause
            </Button>
            <Button onClick={resetSession} variant="outline">
              Reset
            </Button>
          </div>
        )}
      </div>

      <div className="meditation-tips">
        <h4>Meditation Tips:</h4>
        <ul>
          <li>Find a quiet, comfortable space</li>
          <li>Keep your spine straight but relaxed</li>
          <li>Don't judge your thoughts, just observe them</li>
          <li>Start with shorter sessions and build up</li>
        </ul>
      </div>
    </div>
  );
};

export default MeditationPlayer;