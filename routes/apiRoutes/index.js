const router = require("express").Router();
const animalRoutes = require("../apiRoutes/animalRoutes");

router.use(animalRoutes);
//another way to do above
router.use(require("./zookeeperRoutes"));

module.exports = router;
