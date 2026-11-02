function CourseCard({ course, status, onToggle, allCourses }) {
    // Loop through prerequisites, use those IDs to loop through allCourses to see what matches
    const prereqs = [];
    for (const preId of course.prerequisites) {
        for (const curCourse of allCourses) {
            if (preId === curCourse.id)
                prereqs.push(curCourse.number);
        }
    }

    const lockStatus = status === "locked";
    const completedStatus = status === "completed";

    let statusCard = "card h-100";
    if (lockStatus) {
        statusCard += ' border-secondary card-locked';
    } else if (completedStatus) {
        statusCard += ' border-success';
        statusCard += ' card-completed';
    } else {
        statusCard += ' border-primary';
    }

    const showStatus = {
        available: <span className="badge bg-primary ">Available</span>,
        completed: <span className="badge bg-success">Completed</span>,
        locked: <span className="badge bg-secondary">Locked</span>,
    }

    return (
        <div className={statusCard}>
            <div className="card-header fw-bold">{course.number} {showStatus[status]}</div>
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
                        id={`completed-${course.id}`}
                        checked={completedStatus}
                        disabled={lockStatus}
                        onChange={() => onToggle(course.id)}
                    />
{/*htmlFor now connects the label to the course id*/}
                    <label className="form-check-label" htmlFor={`completed-${course.id}`}>
                        {lockStatus ? 'Complete prerequisites first' : 'Completed'}
                    </label>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;