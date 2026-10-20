function CourseCard({ course }) {
    return (
        <div className="card h-100">
            <div className="card-header fw-bold">{course.number}</div>
            <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="small text-muted mb-2">{course.credits} credits</p>
                <p className="card-text">{course.description}</p>
                <p className="card-text small">
                    <strong>Prerequisites:</strong> {course.prerequisites.join(', ')}
                </p>
            </div>
        </div>
    );
}

export default CourseCard;