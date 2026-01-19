const router = require("express").Router();
const Trendingdata = require("../CustomData/Trendingdata.json");

router.get("/", (req, res) => {
  try {
    res.status(200).json({ success: true, data: Trendingdata });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
/**
 * @swagger
 * /trending:
 *   get:
 *     summary: Get trending movies
 *     description: Returns a list of trending movies from JSON data.
 *     responses:
 *       200:
 *         description: List of trending movies
 */
module.exports = router;