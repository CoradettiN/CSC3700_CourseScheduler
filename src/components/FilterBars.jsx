function FilterBars({currentFilter, setCurrentFilter, onSave, savedMessage, saveFailed}) {
    const filterCategories = ["All Courses", "Completed Only", "Remaining"];
    return (
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <div className="btn-group" role="group" aria-label="Filter Card display">
                {filterCategories.map(category => (
                    <button key={category}
                            className={currentFilter === category ? "btn btn-dark" : "btn btn-outline-dark" }
                         type="button"
                            onClick={() => setCurrentFilter(category)}>
                        {category}
                    </button>
                ))}
            </div>
            <div>
                {savedMessage && <span className={saveFailed ? "text-danger small me-3" : "text-success small me-3"}>{savedMessage}.</span>}
                <button className="btn btn-success" type="button" onClick={onSave}>Save</button>
            </div>
        </div>
    );
}

export default FilterBars;