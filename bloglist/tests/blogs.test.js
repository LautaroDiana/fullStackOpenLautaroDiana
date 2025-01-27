const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns 1', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])

        assert.strictEqual(result, 0)
    })

    test('when list has only one blog, it equals the likes of that', () => {
        const blog = listHelper.blogs[0]

        const result = listHelper.totalLikes(blog)
        assert.strictEqual(result, listHelper.blogs[0]['likes'])
    })

    test('of a bigger list is calculated right', () => {
        const blogs = listHelper.blogs
        
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 24)
    })
})

