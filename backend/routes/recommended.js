const router = require("express").Router();
const RecommendedData = require("../CustomData/RecommendedData.json");

router.get("/", (req, res) => {
  try {
    res.status(200).json({
      success: "true",
      data: RecommendedData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: "false", error: "Internal Server Error" });
  }
});
/**
 * @swagger 
 * /recommended:
 *   get:
 *     summary: Get recommended movies     
 *     description: Returns a list of recommended movies from JSON data.
 *     responses:
 *      200:
 *        description: A list of recommended movies.
 */
module.exports = router;