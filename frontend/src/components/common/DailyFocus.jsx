import { useState, useEffect } from 'react';
import Card from './Card';
import { useAuth } from '../../contexts/AuthContext';

const DailyFocus = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([
    { id: 1, task_text: '', is_completed: false },
    { id: 2, task_text: '', is_completed: false },
    { id: 3, task_text: '', is_completed: false }
  ]);

  const handleTaskChange = (id, value) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, task_text: value } : task
    ));
  };

  const handleCheckboxChange = (id, checked) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, is_completed: checked } : task
    ));
  };

  return (
    <Card className="daily-focus-card">
      <h3>Today's Focus</h3>
      <div className="daily-focus-tasks">
        {tasks.map((task, index) => (
          <div key={task.id} className="task-item">
            <input
              type="checkbox"
              id={`task-${task.id}`}
              checked={task.is_completed}
              onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
              className="task-checkbox"
            />
            <input
              type="text"
              placeholder={`Task ${index + 1}`}
              value={task.task_text}
              onChange={(e) => handleTaskChange(task.id, e.target.value)}
              className="task-input"
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DailyFocus;