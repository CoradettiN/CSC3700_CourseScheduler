import CourseCard from './CourseCard';

function CourseList({ courses }) {
    return (
        <div className="row">
            {courses.map(course => (
                <div className="col-md-4 mb-4" key={course.id}>
                    <CourseCard course={course} />
                </div>
            ))}
        </div>
    );
}

export default CourseList;