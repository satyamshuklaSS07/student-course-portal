# Student Learning & Course Portal

A responsive web application where students can browse courses, view course details, search and filter programs, enroll in courses, and track their learning progress.

## Objective
Build stronger frontend skills using JavaScript application logic, reusable UI components, dynamic rendering, LocalStorage, search, filtering and responsive design.

## Features
- **Course listing page**: course cards generated dynamically from JavaScript data
- **Course detail view**: description, instructor, duration, level and full lesson list
- **Search**: live search by title, instructor, category or description
- **Category filtering**: category chips plus a level dropdown
- **Enrollment**: enroll / unenroll in any course
- **Progress tracking**: mark lessons complete, progress bar updates instantly
- **Student dashboard**: enrolled, in-progress and completed courses with stats
- **Responsive design**: works on mobile, tablet and desktop
- **Persistence**: enrollment and progress saved in LocalStorage

## Tools & Technologies
HTML5, CSS3, JavaScript (ES6), JSON-style data objects, LocalStorage, Git, GitHub

## Project Structure
```
course-portal/
├── index.html   # Page shell (header, main container, footer)
├── style.css    # Styling and responsive rules
├── data.js      # Course data (JavaScript objects)
├── app.js       # App logic: routing, rendering, search, filter, storage
└── README.md
```

## How to Run
1. Download or clone the project.
2. Open `index.html` in any modern browser (no server or install needed).

## How It Works
- `data.js` holds the `COURSES` array.
- `app.js` uses hash routing (`#/`, `#/course/:id`, `#/dashboard`) and renders views dynamically.
- Reusable components: `courseCard()` and `progressBar()`.
- LocalStorage key `learnhub_enrollments` stores:
  `{ courseId: { enrolledAt, completed: [lessonIndexes] } }`

## Git & GitHub
```bash
git init
git add .
git commit -m "Add Student Learning & Course Portal"
git branch -M main
git remote add origin https://github.com/<your-username>/course-portal.git
git push -u origin main
```

## Future Improvements
- User login and multiple student profiles
- Course ratings and reviews
- Load courses from a real JSON/API file
- Certificates on course completion
