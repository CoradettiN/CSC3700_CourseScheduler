import CourseCard from './CourseCard';

function CourseList({ courses, allCourses, onToggle, statuses }) {
    return (
        <div className="row">
            {courses.map(course => (
                <div className="col-md-4 mb-4" key={course.id}>
                    <CourseCard
                        course={course}
                        status={statuses[course.id]}
                        onToggle={onToggle}
                        allCourses={allCourses}
                    />
                </div>
            ))}
        </div>
    );
}

export default CourseList;