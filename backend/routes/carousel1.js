const router = require('express').Router();
const Carousel1Data = require('../CustomData/Carousel1Data.json');

router.get('/', (req, res) => {
    try {
        res.status(200).json({
            success: 'true',
            data: Carousel1Data,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: 'false', error: 'Internal Server Error' });
    }
});
/**
 * @swagger
 * /carousel1:
 *   get:
 *     summary: Get carousel1 movies
 *     description: Returns a list of carousel1 movies from JSON data.
 *     responses:
 *       200:
 *         description: A list of carousel1 movies.
 */
module.exports = router;