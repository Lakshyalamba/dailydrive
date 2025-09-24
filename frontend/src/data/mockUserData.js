export const mockUserProfiles = {
  'john@example.com': {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    avatar: '/avatars/john.jpg',
    joinDate: '2024-01-15',
    memberSince: 'January 2024',
    membershipType: 'Pro',
    stats: {
      coursesEnrolled: 5,
      coursesCompleted: 3,
      communityPosts: 24,
      streakDays: 28,
      totalPoints: 1250
    },
    progress: {
      fitness: { current: 85, goal: 100, weeklyCompleted: 6, weeklyGoal: 7 },
      study: { current: 120, goal: 150, weeklyCompleted: 18, weeklyGoal: 20 },
      wellness: { current: 45, goal: 60, weeklyCompleted: 5, weeklyGoal: 7 }
    },
    recentActivity: [
      { id: 1, type: 'workout', description: 'Completed HIIT workout session', time: '2 hours ago' },
      { id: 2, type: 'study', description: 'Finished Advanced JavaScript module', time: '1 day ago' },
      { id: 3, type: 'community', description: 'Posted fitness tips in community', time: '2 days ago' }
    ],
    goals: [
      { id: 1, name: 'Complete 100 workouts', current: 85, target: 100, category: 'fitness' },
      { id: 2, name: 'Study 150 hours', current: 120, target: 150, category: 'study' }
    ]
  },

  'jane@example.com': {
    id: 2,
    name: 'Jane Wilson',
    email: 'jane@example.com',
    avatar: '/avatars/jane.jpg',
    joinDate: '2023-11-20',
    memberSince: 'November 2023',
    membershipType: 'Premium',
    stats: {
      coursesEnrolled: 8,
      coursesCompleted: 6,
      communityPosts: 45,
      streakDays: 42,
      totalPoints: 2100
    },
    progress: {
      fitness: { current: 95, goal: 100, weeklyCompleted: 7, weeklyGoal: 7 },
      study: { current: 200, goal: 250, weeklyCompleted: 22, weeklyGoal: 25 },
      wellness: { current: 80, goal: 90, weeklyCompleted: 6, weeklyGoal: 7 }
    },
    recentActivity: [
      { id: 1, type: 'meditation', description: '20-minute mindfulness session', time: '1 hour ago' },
      { id: 2, type: 'study', description: 'Completed Data Science course', time: '3 hours ago' },
      { id: 3, type: 'achievement', description: 'Unlocked 40-day streak badge', time: '1 day ago' }
    ],
    goals: [
      { id: 1, name: 'Master Data Science', current: 200, target: 250, category: 'study' },
      { id: 2, name: 'Daily meditation streak', current: 80, target: 90, category: 'wellness' }
    ]
  },

  'mike@example.com': {
    id: 3,
    name: 'Mike Chen',
    email: 'mike@example.com',
    avatar: '/avatars/mike.jpg',
    joinDate: '2024-02-10',
    memberSince: 'February 2024',
    membershipType: 'Basic',
    stats: {
      coursesEnrolled: 2,
      coursesCompleted: 1,
      communityPosts: 8,
      streakDays: 12,
      totalPoints: 450
    },
    progress: {
      fitness: { current: 25, goal: 50, weeklyCompleted: 3, weeklyGoal: 5 },
      study: { current: 30, goal: 60, weeklyCompleted: 8, weeklyGoal: 15 },
      wellness: { current: 15, goal: 30, weeklyCompleted: 2, weeklyGoal: 4 }
    },
    recentActivity: [
      { id: 1, type: 'workout', description: 'Started beginner fitness program', time: '4 hours ago' },
      { id: 2, type: 'study', description: 'Enrolled in Web Development basics', time: '2 days ago' },
      { id: 3, type: 'community', description: 'Introduced myself to the community', time: '1 week ago' }
    ],
    goals: [
      { id: 1, name: 'Build exercise habit', current: 25, target: 50, category: 'fitness' },
      { id: 2, name: 'Learn web development', current: 30, target: 60, category: 'study' }
    ]
  },

  default: {
    id: 0,
    name: 'New User',
    email: '',
    avatar: '/avatars/default.jpg',
    joinDate: new Date().toISOString().split('T')[0],
    memberSince: 'March 2024',
    membershipType: 'Free',
    stats: {
      coursesEnrolled: 0,
      coursesCompleted: 0,
      communityPosts: 0,
      streakDays: 0,
      totalPoints: 0
    },
    progress: {
      fitness: { current: 0, goal: 10, weeklyCompleted: 0, weeklyGoal: 3 },
      study: { current: 0, goal: 20, weeklyCompleted: 0, weeklyGoal: 5 },
      wellness: { current: 0, goal: 10, weeklyCompleted: 0, weeklyGoal: 2 }
    },
    recentActivity: [
      { id: 1, type: 'welcome', description: 'Welcome to DailyDrive! Start your journey today.', time: 'Just now' }
    ],
    goals: [
      { id: 1, name: 'Complete your first workout', current: 0, target: 1, category: 'fitness' },
      { id: 2, name: 'Enroll in your first course', current: 0, target: 1, category: 'study' }
    ]
  }
};