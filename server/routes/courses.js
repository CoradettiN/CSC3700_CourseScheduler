// server/routes/courses.js
const express = require('express');
const router = express.Router();
const pool = require('../util/database');
const { getCoursesWithPrereqs } = require('../util/courseData');
const validateCourse = require('../util/validateCourse');

// GET /api/courses -- all courses, each with a prerequisites array
router.get('/courses', async (req, res) => {
    try {
        const courses = await getCoursesWithPrereqs(pool);
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/courses/:id -- one course, or 404
router.get('/courses/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(404).json({ error: 'Course not found' });
    }

    try {
        const course = await getCoursesWithPrereqs(pool, id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/courses -- create a course and its prerequisite rows
router.post('/courses', async (req, res) => {
    const validationError = validateCourse(req.body);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    const { number, title, credits, description, prerequisites = [] } = req.body;

    try {
        // 1. The course must exist before its prerequisite rows (foreign keys)
        const [result] = await pool.query(
            'INSERT INTO courses (number, title, credits, description) VALUES (?, ?, ?, ?)',
            [number, title, credits, description ?? null]
        );
        const newId = result.insertId;

        // 2. One prerequisites row per id (skip if the array is empty)
        if (prerequisites.length > 0) {
            const rows = prerequisites.map(prereqId => [newId, prereqId]);
            await pool.query(
                'INSERT INTO prerequisites (course_id, prereq_id) VALUES ?',
                [rows]
            );
        }

        // 3. Send back the new course in the Section 5 shape
        const course = await getCoursesWithPrereqs(pool, newId);
        res.status(201).json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /api/courses/:id -- update a course and replace its prerequisites
router.put('/courses/:id', async (req, res) => {
    const id = Number(req.params.id);

    const validationError = validateCourse(req.body);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    const { number, title, credits, description, prerequisites = [] } = req.body;

    try {
        const [result] = await pool.query(
            'UPDATE courses SET number = ?, title = ?, credits = ?, description = ? WHERE id = ?',
            [number, title, credits, description ?? null, id]
        );

        // Zero rows changed means the course doesn't exist: stop here
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Delete every old prerequisite row, then insert the full new list
        await pool.query('DELETE FROM prerequisites WHERE course_id = ?', [id]);

        if (prerequisites.length > 0) {
            const rows = prerequisites.map(prereqId => [id, prereqId]);
            await pool.query(
                'INSERT INTO prerequisites (course_id, prereq_id) VALUES ?',
                [rows]
            );
        }

        const course = await getCoursesWithPrereqs(pool, id);
        res.json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /api/courses/:id -- delete a course, return the deleted course
router.delete('/courses/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(404).json({ error: 'Course not found' });
    }

    try {
        // Fetch first so we can send it back (and detect a missing course)
        const course = await getCoursesWithPrereqs(pool, id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // ON DELETE CASCADE removes the related prerequisites/completions rows
        await pool.query('DELETE FROM courses WHERE id = ?', [id]);
        res.json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;