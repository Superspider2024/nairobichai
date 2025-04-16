const express= require('express')
const router = express.Router()
const {post,likes,dislikes,section}= require('../controllers/apex.js')
const uploadFile = require("../middleware/multer.js")

//post interactions
router.post("/post",uploadFile,post)
router.post("/likes",likes)
router.post("/dislikes",dislikes)

//sections
router.post("/section",section)


module.exports=router;