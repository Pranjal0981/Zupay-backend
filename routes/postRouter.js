const express = require('express')
const {createPost,viewPost, deletePostById, updatePostById, getAllPosts, getPostById} = require('../controllers/indexController')
const { isAuthenticated } = require('../middlewares/auth')
const router = express.Router()


router.post('/create-post/:userId',isAuthenticated, createPost)

router.get('/view-posts',getAllPosts);

router.get('/view-post/:id',getPostById)

router.delete('/delete-post/:id',isAuthenticated,deletePostById)

router.put('/update-post/:id',isAuthenticated,updatePostById)

module.exports=router