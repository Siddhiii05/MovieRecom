const router = require('express').Router();
const Carousel5Data = require('../CustomData/Carousel5Data.json');

router.get('/', (req, res) => {
    try {
        res.status(200).json({
            success: 'true',
            data: Carousel5Data,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: 'false', error: 'Internal Server Error' });
    }
});
/**
 * @swagger
 * /carousel5:
 *   get:
 *     summary: Get carousel5 movies
 *     description: Returns a list of carousel5 movies from JSON data.
 *     responses:
 *       200:
 *         description: A list of carousel5 movies.
 */
module.exports = router;