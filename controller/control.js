const shortid = require('shortid');
const URL = require('../model/user');

async function generateShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "URL is required" });
    
    const shortId = shortid.generate();
    
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    });

    const urls = await URL.find({});
    res.render('home', { id: shortId, urls });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory });
}

module.exports = { generateShortURL, handleGetAnalytics };
