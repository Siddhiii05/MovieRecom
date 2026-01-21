const router = require('express').Router();
const FilterData = require('../CustomData/FilterData.json');

router.get('/', (req, res) => {
    try {
        res.status(200).json({  
            success: 'true',
            data: FilterData,
        });
    }       
    catch (err) {
        console.error(err);
        res.status(500).json({ success: 'false', error: 'Internal Server Error' });
    }
});
/**
 * @swagger
 * /filter:
 *   get:
 *     summary: Get filter options
 *     description: Returns a list of filter options from JSON data.
 *     responses:
 *       200:
 *         description: A list of filter options.
 */
module.exports = router;