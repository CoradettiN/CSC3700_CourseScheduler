function ProgressSummary({progress}) {
    const {total, completed, available, locked} = progress;
    const filterBarPercentage = total > 0 ? Math.round((completed/total) * 100) : 0;

    return (
        <div className="card mb-3">
            <div className="card-body py-2">
                <div className="d-flex justify-content-sm-start align-items-baseline gap-2">
                    <span className="fs-5 fw-bold text-success">{completed}</span> of 10 courses completed
                    <span className="fs-5 fw-bold text-primary">{available}</span> available
                    <span className="fs-5 fw-bold ">{locked}</span> locked
                </div>
                <div className="progress summary-bar">
                    <div className="progress-bar bg-success" role="progressbar"
                         style={{width: `${filterBarPercentage}%`}}
                         aria-valuenow={filterBarPercentage}
                         aria-valuemin="0" aria-valuemax="100">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProgressSummary;