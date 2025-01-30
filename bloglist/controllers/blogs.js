const BlogRouter = require('express').Router()
const Blog = require('../models/blog')

BlogRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({})
    response.json(blogs)

})

BlogRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)

    try {
        const result = await blog.save()
        response.status(201).json(result)    
    } catch(exception) {
        response.status(400)
        next(exception)
    }
    
})

module.exports = BlogRouter