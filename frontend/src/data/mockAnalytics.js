export const userProgress = {
  fitness: {
    currentStreak: 15,
    totalWorkouts: 45,
    caloriesBurned: 12500,
    weeklyGoal: 5,
    weeklyCompleted: 4
  },
  study: {
    hoursStudied: 120,
    sessionsCompleted: 30,
    averageSession: 4,
    weeklyGoal: 20,
    weeklyCompleted: 18
  },
  wellness: {
    meditationMinutes: 450,
    sessionsCompleted: 25,
    currentStreak: 8,
    weeklyGoal: 7,
    weeklyCompleted: 6
  }
};

export const weeklyData = [
  { day: 'Mon', fitness: 2, study: 3, wellness: 1 },
  { day: 'Tue', fitness: 1, study: 4, wellness: 1 },
  { day: 'Wed', fitness: 3, study: 2, wellness: 1 },
  { day: 'Thu', fitness: 2, study: 3, wellness: 0 },
  { day: 'Fri', fitness: 1, study: 5, wellness: 1 },
  { day: 'Sat', fitness: 3, study: 1, wellness: 2 },
  { day: 'Sun', fitness: 2, study: 2, wellness: 1 }
];

export const goals = [
  {
    id: 1,
    category: "fitness",
    name: "Complete 100 workouts",
    current: 45,
    target: 100,
    deadline: "2024-06-01"
  },
  {
    id: 2,
    category: "study",
    name: "Study 200 hours",
    current: 120,
    target: 200,
    deadline: "2024-05-15"
  },
  {
    id: 3,
    category: "wellness",
    name: "30-day meditation streak",
    current: 8,
    target: 30,
    deadline: "2024-03-01"
  }
];

export const achievements = [
  {
    id: 1,
    title: "First Week Complete",
    description: "Completed your first week of activities",
    icon: "FaBullseye",
    unlockedAt: "2024-01-08"
  },
  {
    id: 2,
    title: "Fitness Enthusiast",
    description: "Completed 25 fitness sessions",
    icon: "FaDumbbell",
    unlockedAt: "2024-01-15"
  },
  {
    id: 3,
    title: "Study Master",
    description: "Studied for 100 hours",
    icon: "FaBook",
    unlockedAt: "2024-01-18"
  }
];