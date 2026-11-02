function CourseCard({ course, isCompleted, onToggle, allCourses }) {
    // Loop through prerequisites, use those IDs to loop through allCourses to see what matches
    const prereqs = [];
    for (const preId of course.prerequisites) {
        for (const curCourse of allCourses) {
            if (preId === curCourse.id)
                prereqs.push(curCourse.number);
        }
    }

    return (
        <div className="card h-100">
            <div className="card-header fw-bold">{course.number}</div>
            <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="small text-muted mb-2">{course.credits} credits</p>
                <p className="card-text">{course.description}</p>
                <p className="card-text small">
                    <strong>Prerequisites:</strong> {prereqs.length > 0 ? prereqs.join(', ') : 'None'}
                </p>
            </div>
            <div className="card-footer bg-transparent">
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={isCompleted}
                        onChange={() => onToggle(course.id)}
                    />
                    <label className="form-check-label">Completed</label>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;