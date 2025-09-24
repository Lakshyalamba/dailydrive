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
  ]
};