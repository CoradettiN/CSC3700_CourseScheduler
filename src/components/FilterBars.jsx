import {useState, useEffect} from 'react'
function FilterBars(filter) {
    const [currentFilter, setCurrentFilter] = useState('allCourses');
    return (
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <div className="btn-group" role="group" aria-label="Filter Card display">
                <button className={currentFilter === 'allCourses' ?
                    "btn btn-dark" : "btn btn-outline-dark"} type="button"
                        onClick={() => setCurrentFilter('allCourses')}>
                    All Courses
                </button>
                <button className={currentFilter === 'completedOnly' ?
                    "btn btn-dark" : "btn btn-outline-dark"} type="button"
                        onClick={() => setCurrentFilter('completedOnly')}>
                    Completed Only
                </button>
                <button className={currentFilter === 'remaining' ?
                    "btn btn-dark" : "btn btn-outline-dark"} type="button"
                        onClick={() => setCurrentFilter('remaining')}>
                    Remaining
                </button>
            </div>
            <button className="btn btn-success" type="button">Save</button>
        </div>
    );
}

export default FilterBars;