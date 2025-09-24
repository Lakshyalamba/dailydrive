export const detailedCourses = [
  {
    id: 1,
    title: "Fitness Fundamentals",
    category: "fitness",
    difficulty: "Beginner",
    description: "Transform your body and build lasting fitness habits with our comprehensive 30-day challenge. Perfect for beginners and those returning to fitness.",
    duration: "4 weeks",
    completionTime: "30-45 min/day",
    enrolledCount: 12543,
    isEnrolled: false,
    progress: 0,
    timeSpent: "0h 0m",
    lastAccessed: null,
    instructor: {
      name: "Sarah Johnson",
      title: "Certified Personal Trainer & Nutritionist",
      rating: 4.9,
      avatar: "SJ"
    },
    modules: [
      {
        id: 1,
        title: "Foundation Week - Building Habits",
        description: "Learn the fundamentals of fitness and establish daily workout routines",
        duration: "45 min",
        lessons: 5,
        completed: false,
        improvements: [
          "Build consistent daily exercise habits",
          "Improve overall body strength and flexibility",
          "Increase energy levels throughout the day",
          "Develop proper workout form and technique",
          "Create a sustainable fitness routine"
        ],
        materials: [
          "Start with 10-15 minute daily workouts to build the habit",
          "Practice basic bodyweight exercises: push-ups, squats, planks",
          "Follow a structured warm-up and cool-down routine",
          "Track your daily exercise completion in a fitness journal",
          "Set specific workout times and stick to them consistently"
        ]
      },
      {
        id: 2,
        title: "Strength Building Basics",
        description: "Introduction to bodyweight exercises and proper form",
        duration: "50 min",
        lessons: 6,
        completed: false,
        improvements: [
          "Build lean muscle mass and definition",
          "Improve functional strength for daily activities",
          "Enhance bone density and joint stability",
          "Boost metabolism and fat burning",
          "Develop core strength and stability"
        ],
        materials: [
          "Perform progressive overload with bodyweight exercises",
          "Focus on compound movements: squats, lunges, push-ups",
          "Practice proper form with slow, controlled movements",
          "Include resistance band exercises for added challenge",
          "Maintain consistent protein intake to support muscle growth"
        ]
      },
      {
        id: 3,
        title: "Cardio & Endurance Training",
        description: "Boost your cardiovascular health with progressive cardio workouts",
        duration: "40 min",
        lessons: 4,
        completed: false,
        improvements: [
          "Strengthen heart and cardiovascular system",
          "Increase lung capacity and breathing efficiency",
          "Improve stamina and endurance levels",
          "Enhance blood circulation and oxygen delivery",
          "Reduce risk of heart disease and diabetes"
        ],
        materials: [
          "Start with 20-30 minutes of moderate cardio 3x per week",
          "Try interval training: alternate high and low intensity",
          "Include activities you enjoy: dancing, cycling, swimming",
          "Monitor your heart rate to stay in target zones",
          "Gradually increase duration and intensity over time"
        ]
      },
      {
        id: 4,
        title: "Advanced Techniques & Maintenance",
        description: "Advanced exercises and creating long-term fitness plans",
        duration: "55 min",
        lessons: 7,
        completed: false,
        improvements: [
          "Master advanced exercise techniques",
          "Prevent workout plateaus and maintain progress",
          "Develop injury prevention strategies",
          "Create personalized long-term fitness goals",
          "Build mental resilience and discipline"
        ],
        materials: [
          "Learn advanced variations of basic exercises",
          "Implement periodization in your training schedule",
          "Practice mobility and flexibility exercises daily",
          "Set SMART fitness goals and track progress monthly",
          "Develop a growth mindset and celebrate small wins"
        ]
      }
    ],
    learningOutcomes: [
      "Develop a consistent daily exercise routine",
      "Master fundamental bodyweight exercises",
      "Improve cardiovascular endurance and strength",
      "Create personalized workout plans",
      "Understand proper nutrition for fitness goals",
      "Build confidence in your fitness journey"
    ],
    skills: ["Strength Training", "Cardio Fitness", "Habit Formation", "Exercise Planning", "Body Awareness"],
    prerequisites: []
  },
  {
    id: 2,
    title: "Study Mastery",
    category: "study",
    difficulty: "Intermediate",
    description: "Master proven study techniques and learning strategies to boost your academic performance and retain information more effectively.",
    duration: "6 weeks",
    completionTime: "20-30 min/day",
    enrolledCount: 8934,
    isEnrolled: true,
    progress: 35,
    timeSpent: "4h 25m",
    lastAccessed: "Module 2: Active Learning Techniques",
    instructor: {
      name: "Dr. Michael Chen",
      title: "Educational Psychology Professor",
      rating: 4.8,
      avatar: "MC"
    },
    modules: [
      {
        id: 1,
        title: "Study Environment & Time Management",
        description: "Create optimal study spaces and manage your time effectively",
        duration: "35 min",
        lessons: 4,
        completed: true,
        improvements: [
          "Increase focus and concentration levels",
          "Eliminate distractions and procrastination",
          "Optimize study space for maximum productivity",
          "Develop effective time blocking techniques",
          "Create sustainable daily study routines"
        ],
        materials: [
          "Create a dedicated, clutter-free study space",
          "Use the Pomodoro Technique: 25 minutes focused study, 5 minute breaks",
          "Turn off notifications and use website blockers during study time",
          "Plan your study schedule the night before",
          "Establish consistent study times and stick to them daily"
        ]
      },
      {
        id: 2,
        title: "Active Learning Techniques",
        description: "Engage with material using proven active learning methods",
        duration: "40 min",
        lessons: 5,
        completed: false,
        improvements: [
          "Improve comprehension and understanding",
          "Enhance critical thinking and analysis skills",
          "Increase engagement with study material",
          "Develop effective questioning techniques",
          "Build stronger connections between concepts"
        ],
        materials: [
          "Practice the Feynman Technique: explain concepts in simple terms",
          "Create mind maps to visualize connections between ideas",
          "Ask yourself 'why' and 'how' questions while reading",
          "Teach the material to someone else or record yourself explaining it",
          "Use active recall: test yourself without looking at notes"
        ]
      },
      {
        id: 3,
        title: "Memory & Retention Strategies",
        description: "Techniques to improve memory and long-term retention",
        duration: "45 min",
        lessons: 6,
        completed: false,
        improvements: [
          "Boost memory recall by 40-60%",
          "Improve long-term information retention",
          "Develop effective memorization techniques",
          "Enhance pattern recognition abilities",
          "Strengthen neural pathways for learning"
        ],
        materials: [
          "Use spaced repetition: review material at increasing intervals",
          "Create acronyms and mnemonics for complex information",
          "Practice the memory palace technique for lists and sequences",
          "Connect new information to existing knowledge",
          "Review material before sleep to enhance consolidation"
        ]
      },
      {
        id: 4,
        title: "Note-Taking & Organization",
        description: "Effective note-taking systems and information organization",
        duration: "30 min",
        lessons: 4,
        completed: false,
        improvements: [
          "Create clear and organized study materials",
          "Improve information processing speed",
          "Develop systematic knowledge organization",
          "Enhance review and revision efficiency",
          "Build effective study reference systems"
        ],
        materials: [
          "Use the Cornell Note-Taking System for structured notes",
          "Create digital folders with consistent naming conventions",
          "Summarize key points in your own words",
          "Use bullet points, headings, and visual hierarchy",
          "Review and reorganize notes within 24 hours of taking them"
        ]
      },
      {
        id: 5,
        title: "Test Preparation & Exam Strategies",
        description: "Prepare effectively for exams and reduce test anxiety",
        duration: "50 min",
        lessons: 7,
        completed: false,
        improvements: [
          "Reduce test anxiety and stress levels",
          "Improve exam performance and grades",
          "Develop strategic test-taking skills",
          "Build confidence in academic abilities",
          "Master time management during exams"
        ],
        materials: [
          "Practice deep breathing and relaxation techniques before exams",
          "Take practice tests under timed conditions",
          "Read questions carefully and identify key words",
          "Start with easier questions to build confidence",
          "Allocate time per question and stick to your schedule"
        ]
      },
      {
        id: 6,
        title: "Maintaining Long-term Learning",
        description: "Sustain effective study habits throughout your academic journey",
        duration: "25 min",
        lessons: 3,
        completed: false,
        improvements: [
          "Build lifelong learning habits",
          "Maintain motivation and consistency",
          "Adapt study methods to different subjects",
          "Develop self-assessment and reflection skills",
          "Create sustainable academic success patterns"
        ],
        materials: [
          "Set weekly and monthly learning goals",
          "Keep a learning journal to track progress and insights",
          "Experiment with different study techniques for different subjects",
          "Regularly assess what's working and what needs improvement",
          "Celebrate learning milestones and maintain a growth mindset"
        ]
      }
    ],
    learningOutcomes: [
      "Implement effective time management strategies",
      "Apply active learning techniques to any subject",
      "Improve memory retention by 40-60%",
      "Develop personalized note-taking systems",
      "Reduce study time while increasing comprehension",
      "Build confidence for exams and presentations"
    ],
    skills: ["Time Management", "Active Learning", "Memory Techniques", "Note-Taking", "Test Strategies", "Self-Assessment"],
    prerequisites: ["Basic reading comprehension", "Access to study materials"]
  },
  {
    id: 3,
    title: "Mindfulness & Meditation",
    category: "wellness",
    difficulty: "Beginner",
    description: "Discover inner peace and improve your mental well-being through mindfulness practices, stress management, and holistic wellness approaches.",
    duration: "8 weeks",
    completionTime: "15-25 min/day",
    enrolledCount: 15672,
    isEnrolled: false,
    progress: 0,
    timeSpent: "0h 0m",
    lastAccessed: null,
    instructor: {
      name: "Emma Rodriguez",
      title: "Licensed Therapist & Mindfulness Coach",
      rating: 4.9,
      avatar: "ER"
    },
    modules: [
      {
        id: 1,
        title: "Introduction to Mindfulness",
        description: "Understanding mindfulness and its benefits for mental health",
        duration: "25 min",
        lessons: 3,
        completed: false,
        improvements: [
          "Reduce stress and anxiety levels",
          "Improve present-moment awareness",
          "Enhance mental clarity and focus",
          "Develop inner peace and calmness",
          "Build foundation for mindful living"
        ],
        materials: [
          "Practice 5-10 minutes of daily mindfulness meditation",
          "Use guided meditation apps or videos for beginners",
          "Focus on your breath and observe thoughts without judgment",
          "Practice mindful walking and eating exercises",
          "Keep a mindfulness journal to track your experiences"
        ]
      },
      {
        id: 2,
        title: "Breathing & Meditation Basics",
        description: "Learn fundamental breathing techniques and basic meditation",
        duration: "30 min",
        lessons: 4,
        completed: false,
        improvements: [
          "Lower blood pressure and heart rate",
          "Improve oxygen flow and circulation",
          "Enhance relaxation and stress relief",
          "Develop deeper meditation practice",
          "Build breathing awareness and control"
        ],
        materials: [
          "Practice 4-7-8 breathing: inhale 4, hold 7, exhale 8 counts",
          "Try box breathing: inhale, hold, exhale, hold for equal counts",
          "Use diaphragmatic breathing by expanding your belly",
          "Set aside 10-15 minutes daily for breathing exercises",
          "Practice breathing techniques during stressful moments"
        ]
      },
      {
        id: 3,
        title: "Stress Management Techniques",
        description: "Practical strategies for managing daily stress and anxiety",
        duration: "35 min",
        lessons: 5,
        completed: false,
        improvements: [
          "Reduce chronic stress and tension",
          "Improve coping mechanisms for challenges",
          "Enhance emotional stability and balance",
          "Develop healthy stress response patterns",
          "Build resilience against daily pressures"
        ],
        materials: [
          "Practice progressive muscle relaxation techniques",
          "Use the STOP method: Stop, Take a breath, Observe, Proceed",
          "Identify your stress triggers and develop response strategies",
          "Practice grounding techniques: 5-4-3-2-1 sensory method",
          "Create a stress management toolkit with your favorite techniques"
        ]
      },
      {
        id: 4,
        title: "Emotional Awareness & Regulation",
        description: "Develop emotional intelligence and healthy coping mechanisms",
        duration: "40 min",
        lessons: 6,
        completed: false,
        improvements: [
          "Increase emotional intelligence and awareness",
          "Improve relationship communication skills",
          "Develop healthy emotional processing",
          "Enhance self-compassion and acceptance",
          "Build emotional resilience and stability"
        ],
        materials: [
          "Practice the RAIN technique: Recognize, Allow, Investigate, Nurture",
          "Keep an emotion diary to track patterns and triggers",
          "Use loving-kindness meditation for self-compassion",
          "Practice active listening and empathetic communication",
          "Learn to pause before reacting to emotional situations"
        ]
      },
      {
        id: 5,
        title: "Mindful Living Practices",
        description: "Integrate mindfulness into daily activities and relationships",
        duration: "30 min",
        lessons: 4,
        completed: false,
        improvements: [
          "Enhance daily life satisfaction and joy",
          "Improve mindful eating and lifestyle habits",
          "Strengthen relationships and connections",
          "Develop gratitude and appreciation practices",
          "Build sustainable mindfulness routines"
        ],
        materials: [
          "Practice mindful eating: chew slowly and savor flavors",
          "Set mindfulness reminders throughout your day",
          "Practice gratitude by writing 3 things you're thankful for daily",
          "Engage in mindful conversations without distractions",
          "Create mindful transitions between activities"
        ]
      },
      {
        id: 6,
        title: "Sleep & Recovery Optimization",
        description: "Improve sleep quality and recovery through mindful practices",
        duration: "25 min",
        lessons: 3,
        completed: false,
        improvements: [
          "Improve sleep quality and duration",
          "Enhance physical recovery and healing",
          "Reduce insomnia and sleep disturbances",
          "Develop healthy bedtime routines",
          "Boost energy levels and vitality"
        ],
        materials: [
          "Practice body scan meditation before bed",
          "Create a consistent sleep schedule and bedtime routine",
          "Use guided sleep meditations or calming music",
          "Avoid screens 1 hour before bedtime",
          "Practice gentle stretching or yoga before sleep"
        ]
      },
      {
        id: 7,
        title: "Building Resilience",
        description: "Develop mental resilience and bounce back from challenges",
        duration: "45 min",
        lessons: 6,
        completed: false,
        improvements: [
          "Strengthen mental toughness and perseverance",
          "Improve adaptability to life changes",
          "Develop positive mindset and outlook",
          "Build confidence in handling challenges",
          "Enhance recovery from setbacks and failures"
        ],
        materials: [
          "Practice reframing negative thoughts into learning opportunities",
          "Develop a personal mantra or affirmation for difficult times",
          "Build a support network of friends, family, or mentors",
          "Practice visualization techniques for overcoming challenges",
          "Celebrate small victories and learn from setbacks"
        ]
      },
      {
        id: 8,
        title: "Creating Your Wellness Plan",
        description: "Design a personalized wellness routine for long-term success",
        duration: "35 min",
        lessons: 5,
        completed: false,
        improvements: [
          "Create sustainable wellness habits",
          "Develop personalized self-care routines",
          "Build long-term mental health strategies",
          "Enhance overall life balance and harmony",
          "Establish lasting mindfulness practices"
        ],
        materials: [
          "Design a personalized daily wellness routine",
          "Set realistic and achievable wellness goals",
          "Create a self-care menu with various activities to choose from",
          "Schedule regular check-ins with yourself to assess progress",
          "Build accountability by sharing your wellness plan with others"
        ]
      }
    ],
    learningOutcomes: [
      "Practice daily mindfulness and meditation",
      "Effectively manage stress and anxiety",
      "Improve emotional awareness and regulation",
      "Enhance sleep quality and recovery",
      "Build mental resilience and coping skills",
      "Create a sustainable wellness routine"
    ],
    skills: ["Mindfulness", "Meditation", "Stress Management", "Emotional Intelligence", "Sleep Hygiene", "Resilience Building"],
    prerequisites: []
  }
];