const {Router} = require("express");
const router = Router();
const Link = require("../models/Link.js");

router.get("/:code", async (req, res) => {
    try {
        const {code} = req.params;
        const link = await Link.findOne({code});
        if (link) {
            link.clicks++;
            await link.save();
            return res.redirect(link.from);
        }
        res.status(404).json("Link not found");
    } catch (e) {
        res.status(500).json({message: "Something goes bad. Try again."})
    }
});

module.exports = router;
