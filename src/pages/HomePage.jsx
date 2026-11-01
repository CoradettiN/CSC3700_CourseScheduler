import { useState } from 'react';
import CourseList from '../components/CourseList';
import ProgressSummary from "../components/ProgressSummary.jsx";
import FilterBars from '../components/FilterBars.jsx';
import useFetch from '../hooks/useFetch';

function HomePage() {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const { data, isPending, error } = useFetch(`${BASE_URL}/courses`);
    // json-server returns ids as strings, prerequisites are numbers
    const courses = Array.isArray(data) ? data.map(course => ({ ...course, id: Number(course.id) })) : [];

    const [completedIds, setCompletedIds] = useState(() => {
        const saved = localStorage.getItem('completedCourses');
        return saved ? JSON.parse(saved) : [];
    });
    const [savedMessage, setSavedMessage] = useState('');
    const [currentFilter, setCurrentFilter] = useState('All Courses');

    function handleToggle(courseId) {
        if (completedIds.includes(courseId)) {
            // Uncheck this course, then keep dropping any completed course whose prerequisites are no longer all completed
            let remaining = completedIds.filter(id => id !== courseId);
            let changed = true;
            while (changed) {
                const stillValid = remaining.filter(id =>
                    courses.find(c => c.id === id)?.prerequisites.every(pre => remaining.includes(pre)));
                changed = stillValid.length !== remaining.length;
                remaining = stillValid;
            }
            setCompletedIds(remaining);
        } else
            setCompletedIds([...completedIds, courseId]);
    }

    function handleSave() {
        localStorage.setItem('completedCourses', JSON.stringify(completedIds));
        setSavedMessage('Progress saved');
        setTimeout(() => setSavedMessage(''), 2500);
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
        if (currentFilter === 'Completed Only') {
            return allCourseStatuses[course.id] === "completed";
        }
        if (currentFilter === 'Remaining') {
            return allCourseStatuses[course.id] !== "completed";
        }
        return true;
    })

    if (isPending)
        return <div className="container mt-4">Loading courses...</div>;
    if (error)
        return <div className="container mt-4 text-danger">Error loading courses: {error}</div>;

    return (
        <div className="container mt-4 mb-5">
            <h3 className="mb-3">CS Developer Track</h3>
            <ProgressSummary progress={progressBar} />
            <FilterBars currentFilter={currentFilter} setCurrentFilter={setCurrentFilter}
                        onSave={handleSave} savedMessage={savedMessage} />
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