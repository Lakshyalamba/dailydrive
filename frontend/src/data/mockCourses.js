export const courses = [
  {
    id: 1,
    title: "Fitness Fundamentals",
    description: "Build sustainable healthy habits with comprehensive fitness training",
    price: 0,
    instructor: { name: "Sarah Johnson", avatar: "/avatars/sarah.jpg" },
    modules: 12,
    duration: "6 weeks",
    enrolled: 1247,
    rating: 4.8,
    progress: 45,
    thumbnail: "/images/fitness-course.jpg",
    category: "fitness"
  },
  {
    id: 2,
    title: "Study Mastery",
    description: "Effective study techniques and time management for academic success",
    price: 0,
    instructor: { name: "Mike Chen", avatar: "/avatars/mike.jpg" },
    modules: 8,
    duration: "4 weeks",
    enrolled: 892,
    rating: 4.9,
    progress: 0,
    thumbnail: "/images/study-course.jpg",
    category: "study"
  },
  {
    id: 3,
    title: "Mindfulness & Meditation",
    description: "Daily practices for mental wellness and stress reduction",
    price: 0,
    instructor: { name: "Emma Wilson", avatar: "/avatars/emma.jpg" },
    modules: 10,
    duration: "5 weeks",
    enrolled: 1534,
    rating: 4.7,
    progress: 80,
    thumbnail: "/images/mindfulness-course.jpg",
    category: "wellness"
  },
  {
    id: 4,
    title: "Productivity & Time Management",
    description: "Master proven systems like GTD, time-blocking, and energy management for peak productivity",
    price: 0,
    instructor: { name: "David Rodriguez", avatar: "/avatars/david.jpg" },
    modules: 9,
    duration: "6 weeks",
    enrolled: 967,
    rating: 4.8,
    progress: 0,
    thumbnail: "/images/productivity-course.jpg",
    category: "study"
  },
  {
    id: 5,
    title: "Communication & Social Skills",
    description: "Master effective communication, networking, and build confidence in social interactions",
    price: 0,
    instructor: { name: "Lisa Thompson", avatar: "/avatars/lisa.jpg" },
    modules: 8,
    duration: "5 weeks",
    enrolled: 1243,
    rating: 4.9,
    progress: 0,
    thumbnail: "/images/communication-course.jpg",
    category: "study"
  }
];

export const courseModules = {
  1: [
    { id: 1, title: "Introduction to Fitness", completed: true },
    { id: 2, title: "Setting Your Goals", completed: true },
    { id: 3, title: "Basic Exercises", completed: true },
    { id: 4, title: "Nutrition Basics", completed: false },
    { id: 5, title: "Creating a Routine", completed: false }
  ],
  2: [
    { id: 1, title: "Study Environment Setup", completed: false },
    { id: 2, title: "Time Management", completed: false },
    { id: 3, title: "Note-Taking Strategies", completed: false },
    { id: 4, title: "Memory Techniques", completed: false }
  ],
  3: [
    { id: 1, title: "What is Mindfulness?", completed: true },
    { id: 2, title: "Breathing Exercises", completed: true },
    { id: 3, title: "Body Scan Meditation", completed: true },
    { id: 4, title: "Walking Meditation", completed: true },
    { id: 5, title: "Dealing with Stress", completed: false }
  ],
  4: [
    { id: 1, title: "Productivity Masterclass", completed: false },
    { id: 2, title: "Getting Things Done (GTD)", completed: false },
    { id: 3, title: "Time-Blocking Strategies", completed: false },
    { id: 4, title: "Goal Setting Workshop", completed: false },
    { id: 5, title: "SMART Goals Framework", completed: false },
    { id: 6, title: "OKRs Implementation", completed: false },
    { id: 7, title: "Conquering Procrastination", completed: false },
    { id: 8, title: "Energy Management", completed: false },
    { id: 9, title: "Building Action-Oriented Mindset", completed: false }
  ],
  5: [
    { id: 1, title: "Effective Communication Foundations", completed: false },
    { id: 2, title: "Active Listening Mastery", completed: false },
    { id: 3, title: "Articulating Ideas Clearly", completed: false },
    { id: 4, title: "Navigating Difficult Conversations", completed: false },
    { id: 5, title: "Networking for Introverts", completed: false },
    { id: 6, title: "Building Professional Relationships", completed: false },
    { id: 7, title: "Building Confidence & Charisma", completed: false },
    { id: 8, title: "Advanced Social Interactions", completed: false }
  ]
};