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
  },
  {
    id: 4,
    title: "Productivity & Time Management",
    category: "study",
    difficulty: "Intermediate",
    description: "Master proven systems like GTD, time-blocking, and energy management. Go beyond basic to-do lists and build sustainable productivity habits.",
    duration: "6 weeks",
    completionTime: "25-35 min/day",
    enrolledCount: 967,
    isEnrolled: false,
    progress: 0,
    timeSpent: "0h 0m",
    lastAccessed: null,
    instructor: {
      name: "David Rodriguez",
      title: "Productivity Coach & Business Consultant",
      rating: 4.8,
      avatar: "DR"
    },
    modules: [
      {
        id: 1,
        title: "Productivity Masterclass",
        description: "Go beyond basic to-do lists and learn advanced productivity systems",
        duration: "40 min",
        lessons: 5,
        completed: false,
        improvements: [
          "Increase daily productivity by 40-60%",
          "Eliminate time-wasting activities",
          "Build systematic approach to work",
          "Develop clear priorities and focus",
          "Create sustainable productivity habits"
        ],
        materials: [
          "Audit your current productivity systems and identify gaps",
          "Learn the difference between being busy and being productive",
          "Implement the 80/20 rule (Pareto Principle) in daily tasks",
          "Create a personal productivity manifesto",
          "Set up tracking systems to measure productivity improvements"
        ]
      },
      {
        id: 2,
        title: "Getting Things Done (GTD)",
        description: "Master David Allen's GTD methodology for stress-free productivity",
        duration: "45 min",
        lessons: 6,
        completed: false,
        improvements: [
          "Achieve mental clarity and reduced stress",
          "Never forget important tasks or commitments",
          "Process information efficiently",
          "Maintain organized systems for all areas of life",
          "Increase confidence in handling multiple projects"
        ],
        materials: [
          "Set up GTD capture system: inbox, calendar, task lists",
          "Practice the 2-minute rule for quick tasks",
          "Create context-based action lists (@calls, @computer, @errands)",
          "Implement weekly reviews to maintain system integrity",
          "Use GTD for both personal and professional commitments"
        ]
      },
      {
        id: 3,
        title: "Time-Blocking Strategies",
        description: "Learn advanced time-blocking and calendar management techniques",
        duration: "35 min",
        lessons: 4,
        completed: false,
        improvements: [
          "Eliminate multitasking and increase focus",
          "Better estimate and allocate time for tasks",
          "Reduce context switching and mental fatigue",
          "Improve work-life balance through intentional scheduling",
          "Increase deep work and creative thinking time"
        ],
        materials: [
          "Block time for different types of work (deep work, meetings, admin)",
          "Use color-coding system for different categories of activities",
          "Schedule buffer time between meetings and tasks",
          "Implement theme days for focused work on specific areas",
          "Practice saying no to protect your blocked time"
        ]
      },
      {
        id: 4,
        title: "Goal Setting Workshop",
        description: "A practical course on setting, planning, and executing long-term goals",
        duration: "50 min",
        lessons: 7,
        completed: false,
        improvements: [
          "Set clear, achievable long-term goals",
          "Break down big goals into actionable steps",
          "Maintain motivation and momentum over time",
          "Track progress and adjust strategies as needed",
          "Align daily actions with long-term vision"
        ],
        materials: [
          "Define your core values and life vision",
          "Set 1-year, 5-year, and 10-year goals in key life areas",
          "Create quarterly milestones and monthly targets",
          "Develop accountability systems and progress tracking",
          "Practice regular goal review and adjustment sessions"
        ]
      },
      {
        id: 5,
        title: "SMART Goals Framework",
        description: "Master the SMART criteria for effective goal setting",
        duration: "30 min",
        lessons: 3,
        completed: false,
        improvements: [
          "Create specific and measurable goals",
          "Set realistic yet challenging targets",
          "Establish clear deadlines and timelines",
          "Improve goal achievement rate by 70%",
          "Develop better planning and execution skills"
        ],
        materials: [
          "Transform vague goals into SMART objectives",
          "Create measurement criteria for abstract goals",
          "Set up regular check-ins and progress reviews",
          "Use SMART framework for both personal and professional goals",
          "Practice writing SMART goals for different time horizons"
        ]
      },
      {
        id: 6,
        title: "OKRs Implementation",
        description: "Learn Objectives and Key Results framework for ambitious goal setting",
        duration: "40 min",
        lessons: 5,
        completed: false,
        improvements: [
          "Set ambitious yet achievable objectives",
          "Create measurable key results",
          "Align personal goals with team/company objectives",
          "Improve transparency and accountability",
          "Drive innovation and stretch thinking"
        ],
        materials: [
          "Write compelling objectives that inspire action",
          "Define 3-5 key results for each objective",
          "Set up quarterly OKR cycles with regular check-ins",
          "Practice grading OKRs and learning from results",
          "Cascade OKRs from annual to quarterly to monthly goals"
        ]
      },
      {
        id: 7,
        title: "Conquering Procrastination",
        description: "Understand root causes of procrastination and build action-oriented mindset",
        duration: "45 min",
        lessons: 6,
        completed: false,
        improvements: [
          "Identify and eliminate procrastination triggers",
          "Develop immediate action-taking habits",
          "Overcome perfectionism and fear of failure",
          "Build momentum and maintain consistency",
          "Increase confidence in tackling difficult tasks"
        ],
        materials: [
          "Identify your personal procrastination patterns and triggers",
          "Use the 5-minute rule to start overwhelming tasks",
          "Practice breaking large projects into micro-tasks",
          "Implement accountability systems and external commitments",
          "Develop self-compassion while maintaining high standards"
        ]
      },
      {
        id: 8,
        title: "Energy Management",
        description: "Optimize your energy levels throughout the day for peak performance",
        duration: "35 min",
        lessons: 4,
        completed: false,
        improvements: [
          "Identify your natural energy rhythms",
          "Match tasks to optimal energy levels",
          "Prevent energy crashes and burnout",
          "Sustain high performance throughout the day",
          "Improve overall well-being and life satisfaction"
        ],
        materials: [
          "Track your energy levels throughout the day for one week",
          "Schedule high-focus work during peak energy hours",
          "Use low-energy times for routine and administrative tasks",
          "Implement energy renewal practices (breaks, movement, nutrition)",
          "Create rituals for transitioning between different types of work"
        ]
      },
      {
        id: 9,
        title: "Building Action-Oriented Mindset",
        description: "Develop mental frameworks for consistent action and execution",
        duration: "30 min",
        lessons: 3,
        completed: false,
        improvements: [
          "Develop bias toward action over analysis paralysis",
          "Build confidence in decision-making",
          "Create systems for rapid experimentation",
          "Maintain momentum through setbacks",
          "Cultivate growth mindset and continuous improvement"
        ],
        materials: [
          "Practice the 'good enough' principle for non-critical decisions",
          "Implement rapid prototyping for new ideas and projects",
          "Create feedback loops to learn from actions quickly",
          "Develop personal mantras and affirmations for action-taking",
          "Build celebration rituals for completed actions and milestones"
        ]
      }
    ],
    learningOutcomes: [
      "Master GTD and time-blocking systems",
      "Set and achieve ambitious goals using SMART and OKR frameworks",
      "Eliminate procrastination and build action-oriented habits",
      "Optimize energy management for sustained high performance",
      "Create personalized productivity systems",
      "Develop long-term planning and execution skills"
    ],
    skills: ["GTD System", "Time-Blocking", "Goal Setting", "OKRs", "Procrastination Management", "Energy Optimization"],
    prerequisites: ["Basic time management awareness", "Willingness to experiment with new systems"]
  },
  {
    id: 5,
    title: "Communication & Social Skills",
    category: "study",
    difficulty: "Beginner",
    description: "Master effective communication, active listening, and networking. Build confidence and charisma in all your social interactions.",
    duration: "5 weeks",
    completionTime: "20-30 min/day",
    enrolledCount: 1243,
    isEnrolled: false,
    progress: 0,
    timeSpent: "0h 0m",
    lastAccessed: null,
    instructor: {
      name: "Lisa Thompson",
      title: "Communication Coach & Public Speaking Expert",
      rating: 4.9,
      avatar: "LT"
    },
    modules: [
      {
        id: 1,
        title: "Effective Communication Foundations",
        description: "Learn the fundamentals of clear and impactful communication",
        duration: "35 min",
        lessons: 4,
        completed: false,
        improvements: [
          "Communicate ideas with clarity and confidence",
          "Understand different communication styles",
          "Improve verbal and non-verbal communication",
          "Build rapport and connection with others",
          "Develop authentic communication presence"
        ],
        materials: [
          "Practice the 7-38-55 rule: words, tone, and body language",
          "Learn to match your communication style to your audience",
          "Use the PREP method: Point, Reason, Example, Point",
          "Practice active body language and eye contact",
          "Record yourself speaking to identify improvement areas"
        ]
      },
      {
        id: 2,
        title: "Active Listening Mastery",
        description: "Develop deep listening skills for better relationships and understanding",
        duration: "30 min",
        lessons: 3,
        completed: false,
        improvements: [
          "Build stronger relationships through better listening",
          "Understand others' perspectives and needs",
          "Reduce misunderstandings and conflicts",
          "Increase empathy and emotional intelligence",
          "Become a more trusted and valued communicator"
        ],
        materials: [
          "Practice the SOLER technique: Square shoulders, Open posture, Lean in, Eye contact, Relax",
          "Use reflective listening: paraphrase what you heard",
          "Ask open-ended questions to encourage deeper sharing",
          "Avoid interrupting and practice patience in conversations",
          "Listen for emotions and feelings, not just facts"
        ]
      },
      {
        id: 3,
        title: "Articulating Ideas Clearly",
        description: "Learn to express your thoughts and ideas with precision and impact",
        duration: "40 min",
        lessons: 5,
        completed: false,
        improvements: [
          "Express complex ideas in simple, understandable terms",
          "Organize thoughts logically and persuasively",
          "Increase influence and persuasion abilities",
          "Improve presentation and public speaking skills",
          "Build confidence in sharing your ideas"
        ],
        materials: [
          "Use the pyramid principle: start with conclusion, then supporting points",
          "Practice the rule of three: group ideas in sets of three",
          "Learn to use analogies and metaphors for complex concepts",
          "Structure presentations with clear beginning, middle, and end",
          "Practice elevator pitches for different time constraints"
        ]
      },
      {
        id: 4,
        title: "Navigating Difficult Conversations",
        description: "Handle challenging discussions with grace and achieve positive outcomes",
        duration: "45 min",
        lessons: 6,
        completed: false,
        improvements: [
          "Approach conflicts with confidence and composure",
          "De-escalate tense situations effectively",
          "Find win-win solutions in disagreements",
          "Maintain relationships while addressing issues",
          "Develop emotional regulation during stress"
        ],
        materials: [
          "Use the DESC method: Describe, Express, Specify, Consequences",
          "Practice staying calm under pressure with breathing techniques",
          "Learn to separate people from problems",
          "Use 'I' statements to express concerns without blame",
          "Practice finding common ground and shared interests"
        ]
      },
      {
        id: 5,
        title: "Networking for Introverts",
        description: "Practical, low-stress strategies for building meaningful professional relationships",
        duration: "35 min",
        lessons: 4,
        completed: false,
        improvements: [
          "Build professional networks without draining your energy",
          "Create authentic connections based on shared interests",
          "Develop comfortable conversation starters and topics",
          "Leverage online networking to supplement in-person events",
          "Build confidence in professional social situations"
        ],
        materials: [
          "Prepare 3-5 conversation starters and questions in advance",
          "Set realistic networking goals: quality over quantity",
          "Use the buddy system: attend events with a colleague",
          "Follow up within 24-48 hours with new connections",
          "Practice networking in low-pressure environments first"
        ]
      },
      {
        id: 6,
        title: "Building Professional Relationships",
        description: "Develop and maintain strong professional networks and partnerships",
        duration: "40 min",
        lessons: 5,
        completed: false,
        improvements: [
          "Create lasting professional relationships",
          "Increase career opportunities through networking",
          "Develop mentorship and sponsorship relationships",
          "Build a personal brand and professional reputation",
          "Expand your influence and reach in your industry"
        ],
        materials: [
          "Create a relationship map of your professional network",
          "Schedule regular check-ins with key contacts",
          "Offer value before asking for favors or help",
          "Use LinkedIn strategically for relationship building",
          "Practice gratitude and recognition in professional relationships"
        ]
      },
      {
        id: 7,
        title: "Building Confidence & Charisma",
        description: "Actionable steps to build self-confidence and improve social interactions",
        duration: "50 min",
        lessons: 7,
        completed: false,
        improvements: [
          "Increase self-confidence in social and professional settings",
          "Develop natural charisma and magnetic presence",
          "Overcome social anxiety and self-doubt",
          "Improve first impressions and social impact",
          "Build authentic confidence based on self-awareness"
        ],
        materials: [
          "Practice power posing for 2 minutes before important interactions",
          "Develop a personal confidence ritual and routine",
          "Use positive self-talk and affirmations daily",
          "Practice stepping out of your comfort zone gradually",
          "Celebrate small wins and build momentum over time"
        ]
      },
      {
        id: 8,
        title: "Advanced Social Interactions",
        description: "Master sophisticated social skills for leadership and influence",
        duration: "45 min",
        lessons: 6,
        completed: false,
        improvements: [
          "Develop leadership presence and executive communication",
          "Master the art of influence and persuasion",
          "Build emotional intelligence and social awareness",
          "Navigate complex social and political dynamics",
          "Become a connector and relationship facilitator"
        ],
        materials: [
          "Practice reading social cues and non-verbal communication",
          "Learn to adapt your communication style to different personalities",
          "Use storytelling techniques to engage and influence others",
          "Practice facilitating introductions and connections",
          "Develop your personal leadership communication style"
        ]
      }
    ],
    learningOutcomes: [
      "Master active listening and effective communication techniques",
      "Navigate difficult conversations with confidence and grace",
      "Build meaningful professional relationships and networks",
      "Develop authentic confidence and charismatic presence",
      "Improve social skills for leadership and influence",
      "Create lasting personal and professional connections"
    ],
    skills: ["Active Listening", "Public Speaking", "Networking", "Conflict Resolution", "Emotional Intelligence", "Leadership Communication"],
    prerequisites: ["Willingness to practice social interactions", "Open mindset for personal growth"]
  }
];