const router = require('express').Router();
const Carousel2Data = require('../CustomData/Carousel2Data.json');

router.get('/', (req, res) => {
    try {
        res.status(200).json({
            success: 'true',
            data: Carousel2Data,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: 'false', error: 'Internal Server Error' });
    }
});
/**
 * @swagger
 * /carousel2:
 *   get:
 *     summary: Get carousel2 movies
 *     description: Returns a list of carousel2 movies from JSON data.
 *     responses:
 *       200:
 *         description: A list of carousel2 movies.
 */
module.exports = router;