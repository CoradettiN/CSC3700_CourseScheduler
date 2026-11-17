// server/routes/completions.js
const express = require('express');
const router = express.Router();
const pool = require('../util/database');
const { getCoursesWithPrereqs, replaceCompletions } = require('../util/courseData');

const USER_ID = 1; // M3: replaced by the logged-in user's id

// courses: array in the Section 5 shape, completed: array of ids
const isValidCompletionSet = (courses, completed) => {
    return completed.every(id => {
        const course = courses.find(c => c.id === id);
        return course && course.prerequisites.every(p => completed.includes(p));
    });
};

// GET /api/completions -- this user's completed course ids, e.g. [1, 3]
router.get('/completions', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT course_id FROM completions WHERE user_id = ? ORDER BY course_id',
            [USER_ID]
        );
        res.json(rows.map(row => row.course_id));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /api/completions -- replace this user's completions (body: array of ids)
router.put('/completions', async (req, res) => {
    // 1. The body must be an array
    if (!Array.isArray(req.body)) {
        return res.status(400).json({ error: 'Body must be an array of course ids' });
    }

    // Drop duplicates so [1, 1] can't hit the primary key
    const completed = [...new Set(req.body)];

    try {
        // 2. Every id must exist and have all its prerequisites in the set
        const courses = await getCoursesWithPrereqs(pool);
        if (!isValidCompletionSet(courses, completed)) {
            return res.status(400).json({
                error: 'Invalid completions: unknown course or missing prerequisites'
            });
        }

        // 3. Only now do we save anything
        await replaceCompletions(pool, USER_ID, completed);
        res.json([...completed].sort((a, b) => a - b));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;