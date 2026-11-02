function ProgressSummary({progress}) {
    return (
        <div className="card mb-3">
            <div className="card-body py-2">
                <div className="d-flex justify-content-sm-start align-items-baseline gap-2">
                    <span className="fs-5 fw-bold text-success">0</span> of 10 courses completed
                    <span className="fs-5 fw-bold text-primary">1</span> available
                    <span className="fs-5 fw-bold ">9</span> locked
                </div>
                <div className="progress">
                    <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" ></div>
                </div>
            </div>
        </div>
    );
}

export default ProgressSummary;