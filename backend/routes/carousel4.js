const router = require('express').Router();
const Carousel4Data = require('../CustomData/Carousel4Data.json');

router.get('/', (req, res) => {
    try {
        res.status(200).json({
            success: 'true',
            data: Carousel4Data,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: 'false', error: 'Internal Server Error' });
    }
});
/**
 * @swagger
 * /carousel4:
 *   get:
 *     summary: Get carousel4 movies
 *     description: Returns a list of carousel4 movies from JSON data.
 *     responses:
 *       200:
 *         description: A list of carousel4 movies.
 */
module.exports = router;