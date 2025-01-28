const { describe, test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const listHelper = require('../utils/list_helper')
const Blog = require('../models/blog')
const mongoose = require('mongoose')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    
    const blogObjects = listHelper.blogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())

    await Promise.all(promiseArray)
    console.log('done!')
})

test('get all blogs in db', async () => {
    const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, listHelper.blogs.length)
})

test('post one new blog in db', async () => {
    const newBlog = {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    }

    const response = await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const expOutput = await Blog.find({})

    assert.strictEqual(expOutput.length, listHelper.blogs.length + 1)

    const urls = expOutput.map(blog => blog.url)
    
    assert.strictEqual(urls.includes(newBlog.url), true)

})

after(async () => {
    await mongoose.connection.close()
})