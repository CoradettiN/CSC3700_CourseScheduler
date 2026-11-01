function AboutPage() {
    return (
        <div className="container mt-4 d-flex justify-content-center">
            <div className="card p-3 about-card">
                <h3>About</h3>
                <p>
                    The Aurora CS Course Scheduler shows the CS Developer Track catalog,
                    tracks which courses you have completed, and shows which courses you are
                    eligible to take next.
                </p>
                <div className="row mb-2">
                    <div className="col-4 fw-bold">Author(s)</div>
                    <div className="col-8">Nicholas Coradetti, Jalen B</div>
                </div>
                <div className="row mb-2">
                    <div className="col-4 fw-bold">Date</div>
                    <div className="col-8">Sunday, November 1st, 2026</div>
                </div>
                <div className="row mb-2">
                    <div className="col-4 fw-bold">Version</div>
                    <div className="col-8">1.5.0</div>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;