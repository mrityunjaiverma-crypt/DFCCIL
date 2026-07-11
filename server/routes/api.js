const express = require('express');
const router = express.Router();
const News = require('../models/News');

// Get all news
router.get('/news', async (req, res) => {
    try {
        // Return dummy data if DB fails or is empty, to ensure frontend always has content
        const dummyNews = [
            { _id: '1', title: 'Reply to Pre Bid Queries', isNew: true },
            { _id: '2', title: 'Congratulatory Message from the Chairman & CEO, Railway Board', isNew: true },
            { _id: '3', title: 'MD\'s Message on Republic Day 2026', isNew: true },
            { _id: '4', title: 'MD\'s New Year Message', isNew: true }
        ];
        
        let news;
        try {
            news = await News.find().sort({ date: -1 });
        } catch (dbErr) {
            console.warn('DB error, using dummy news:', dbErr.message);
        }

        if (!news || news.length === 0) {
            news = dummyNews;
        }

        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
