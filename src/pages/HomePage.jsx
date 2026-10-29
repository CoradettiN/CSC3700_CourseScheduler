import { useState } from 'react';
import CourseList from '../components/CourseList';
import ProgressSummary from "../components/ProgressSummary.jsx";
import FilterBars from '../components/FilterBars.jsx';

function HomePage() {
    const courses = [
        {
            id: 1,
            number: 'CSC1700',
            title: 'Introduction to Programming',
            credits: 4,
            description: 'Java programming fundamentals. Variables, loops, methods, arrays, and basic OOP.',
            prerequisites: []
        },
        {
            id: 2,
            number: 'CSC2150',
            title: 'Data Structures',
            credits: 4,
            description: 'Linked lists, stacks, queues, trees, graphs, sorting, and algorithm analysis.',
            prerequisites: [1]
        },
        {
            id: 3,
            number: 'CSC2200',
            title: 'Introduction to Web Development',
            credits: 3,
            description: 'HTML, CSS, JavaScript client-side programming, DOM manipulation, Bootstrap.',
            prerequisites: [1]
        },
        {
            id: 4,
            number: 'CSC2300',
            title: 'Computer Architecture',
            credits: 3,
            description: 'Digital logic, binary arithmetic, CPU organization, memory hierarchy, assembly language.',
            prerequisites: [1]
        },
        {
            id: 5,
            number: 'CSC3250',
            title: 'Object-Oriented Programming',
            credits: 3,
            description: 'OOP principles, inheritance, polymorphism, interfaces, design patterns.',
            prerequisites: [2]
        },
// Just added the rest of the courses
        {
            "id": 6,
            "number": "CSC3510",
            "title": "Software Testing",
            "credits": 3,
            "description": "Unit testing, integration testing, test-driven development, API testing with Postman.",
            "prerequisites": [5]
        },
        {
            "id": 7,
            "number": "CSC3700",
            "title": "Advanced Web Application Development",
            "credits": 3,
            "description": "React, Node/Express, MySQL, JWT authentication. Full-stack web development.",
            "prerequisites": [3]
        },
        {
            "id": 8,
            "number": "CSC4450",
            "title": "Programming Languages",
            "credits": 3,
            "description": "Language paradigms, memory management, C and C++ systems programming, Rust concepts.",
            "prerequisites": [5]
        },
        {
            "id": 9,
            "number": "CSC4500",
            "title": "Database Systems",
            "credits": 3,
            "description": "Relational databases, SQL, normalization, transactions, database design.",
            "prerequisites": [2]
        },
        {
            "id": 10,
            "number": "CSC4990",
            "title": "Capstone Project",
            "credits": 3,
            "description": "Semester-long team software project. Real client, full development lifecycle.",
            "prerequisites": [6, 7]
        }
];

    const [completedIds, setCompletedIds] = useState([]);
    const [currentFilter, setCurrentFilter] = useState('All Courses');

    function handleToggle(courseId) {
        if (completedIds.includes(courseId))
            setCompletedIds(completedIds.filter(id => id !== courseId));
        else
            setCompletedIds([...completedIds, courseId]);
    }

    function getCourseStatus(course) {
        if (completedIds.includes(course.id)) {
            return "completed";
        }
        const unlockCourse = course.prerequisites.every(id => completedIds.includes(id));
        return unlockCourse ? "available" : "locked";
    }

    const allCourseStatuses = {};
    for (const course of courses) {
        allCourseStatuses[course.id] = getCourseStatus(course);
    }

    const statusList = Object.values(allCourseStatuses);
    const progressBar = {
        total: courses.length,
        completed: statusList.filter(status => status === "completed").length,
        available: statusList.filter(status => status === "available").length,
        locked: statusList.filter(status => status === "locked").length,
    }

    const showSelectCourses = courses.filter(course => {
        if (currentFilter === 'Completed') {
            return allCourseStatuses[course.id] === "completed";
        }
        if (currentFilter === 'Remaining') {
            return allCourseStatuses[course.id] !== "completed";
        }
        return true;
    })

    return (
        <div className="container mt-4 mb-5">
            <h3 className="mb-3">CS Developer Track</h3>
            <ProgressSummary progress={progressBar} />
            <FilterBars currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />
            <CourseList
                courses={showSelectCourses}
                allCourses={courses}
                statuses={allCourseStatuses}
                onToggle={handleToggle}
            />
        </div>
    );
}

export default HomePage;