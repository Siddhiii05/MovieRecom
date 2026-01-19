const router = require("express").Router();
const TopRatedData = require("../CustomData/TopRatedData.json");

router.get("/", (req, res) => {
  try {
    res.status(200).json({ success: true, data: TopRatedData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /toprated:
 *  get:
 *    summary: Get top-rated movies
 *    description: Returns a list of top-rated movies from JSON data.
 *    responses:
 *    200:
 *     description: A list of top-rated movies.
 */
module.exports = router;