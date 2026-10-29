import {useState, useEffect} from 'react'
function FilterBars({currentFilter,setCurrentFilter}) {
    const filterCategories = ["All Courses", "Completed", "Remaining"];
    return (
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <div className="btn-group" role="group" aria-label="Filter Card display">
{/*Each filter button is now mapped into one button(Left the previous button layouts only because of paranoia)*/}
                {filterCategories.map(category => (
                    <button key={category}
                            className={currentFilter === category ? "btn btn-dark" : "btn btn-outline-dark" }
                         type="button"
                            onClick={() => setCurrentFilter(category)}>
                        {category}
                    </button>
                ))}
            {/*    <button className={currentFilter === 'completedOnly' ?*/}
            {/*        "btn btn-dark" : "btn btn-outline-dark"} type="button"*/}
            {/*            onClick={() => setCurrentFilter('completedOnly')}>*/}
            {/*        Completed Only*/}
            {/*    </button>*/}
            {/*    <button className={currentFilter === 'remaining' ?*/}
            {/*        "btn btn-dark" : "btn btn-outline-dark"} type="button"*/}
            {/*            onClick={() => setCurrentFilter('remaining')}>*/}
            {/*        Remaining*/}
            {/*    </button>*/}
            </div>
            <button className="btn btn-success" type="button">Save</button>
        </div>
    );
}

export default FilterBars;