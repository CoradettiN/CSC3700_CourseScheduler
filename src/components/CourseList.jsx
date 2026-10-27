import CourseCard from './CourseCard';

function CourseList({ courses, completedIds, onToggle }) {
    return (
        <div className="row">
            {courses.map(course => (
                <div className="col-md-4 mb-4" key={course.id}>
                    <CourseCard
                        course={course}
                        isCompleted={completedIds.includes(course.id)}
                        onToggle={onToggle}
                        allCourses={courses}
                    />
                </div>
            ))}
        </div>
    );
}

export default CourseList;