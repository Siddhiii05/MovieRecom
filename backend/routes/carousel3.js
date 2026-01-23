const router = require('express').Router();
const Carousel3Data = require('../CustomData/Carousel3Data.json');

router.get('/', (req, res) => {
    try {
        res.status(200).json({
            success: 'true',
            data: Carousel3Data,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: 'false', error: 'Internal Server Error' });
    }
});
/**
 * @swagger
 * /carousel3:
 *   get:
 *     summary: Get carousel3 movies
 *     description: Returns a list of carousel3 movies from JSON data.
 *     responses:
 *       200:
 *         description: A list of carousel3 movies.
 */
module.exports = router;