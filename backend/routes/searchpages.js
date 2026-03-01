const router = require("express").Router();
const SearchPagesData = require("../CustomData/SearchPagesData.json");

router.get("/", (req, res) => {
    try {
        res.status(200).json({
            success: "true",
            data: SearchPagesData,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: "false", error: "Internal Server Error" });
    }
});
/**
 * @swagger 
 * /searchpages:
 *   get:
 *     summary: Get search pages data
 *     description: Returns a list of search pages data from JSON file.
 *     responses:
 *       200:
 *         description: A list of search pages data.
 */
module.exports = router;    