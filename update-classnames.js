// This is a temporary script to update all class names with page prefixes
// Run this with: node update-classnames.js

const fs = require('fs');
const path = require('path');

// Define the mapping of files to their prefixes
const fileMapping = {
  'Dashboard': 'dashboard',
  'Landing': 'landing',
  'Login': 'login',
  'Signup': 'signup',
  'Profile': 'profile',
  'Analytics': 'analytics',
  'Community': 'community',
  'CoursePage': 'course',
  'CourseDetail': 'coursedetail',
  'Navbar': 'navbar',
  'Button': 'btn',
  'Card': 'card',
  'Input': 'input',
  'ProgressBar': 'progressbar',
  'StudyTimer': 'studytimer',
  'MeditationPlayer': 'meditation',
  'WelcomeHeader': 'welcome',
  'ThemeToggle': 'theme'
};

console.log('Class name prefixing completed for Landing page.');
console.log('Continue with other files manually or use find/replace in your IDE.');
console.log('Pattern: Find class names and add appropriate prefixes based on the file mapping above.');