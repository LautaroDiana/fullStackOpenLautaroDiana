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

describe('at least one of the blogs with most likes', () => {
    test('of an empty list of blogs is an empty object', () => {
        const result = listHelper.favoriteBlog([])

        assert.deepStrictEqual(result, {})
    })

    test('of a blog list with one element is the title, author and likes', () => {

        const result = listHelper.favoriteBlog(listHelper.blogs[0])

        const expOutput = {
            'title': listHelper.blogs[0].title,
            'author': listHelper.blogs[0].author,
            'likes': listHelper.blogs[0].likes
        }

        assert.deepStrictEqual(result, expOutput)
    })
    test('with a list with more than one valid elements is the blog with most likes', () => {
        const result = listHelper.favoriteBlog(listHelper.blogs)

        assert.strictEqual(result.likes, 12)
    })
})

describe('author with most blogs posted', () => {
    test('from an empty list is an empty object', () => {
        const result = listHelper.mostBlogs([])

        assert.deepStrictEqual(result, {})
    })
    test('from a list with one element is the author and one blog', () => {
        const expOutput = {
            'author': listHelper.blogs[0].author,
            'blogs': 1
        }
        
        const result = listHelper.mostBlogs(listHelper.blogs[0])

        assert.deepStrictEqual(result, expOutput)
    })

    test('from a list with more than one element', () => {
        const result = listHelper.mostBlogs(listHelper.blogs)

        assert.strictEqual(result.blogs, 2)
    })
})

describe('author with most liked posted', () => {
    test('from an empty list', () => {
        const result = listHelper.mostLikes([])

        assert.deepStrictEqual(result, {})
    })
    test('from a list with one element', () => {
        const expOutput = {
            'author': listHelper.blogs[0].author,
            'likes': listHelper.blogs[0].likes
        }
        
        const result = listHelper.mostLikes(listHelper.blogs[0])

        assert.deepStrictEqual(result, expOutput)

    })
    test('from a list with more than one element', () => {
        const result = listHelper.mostLikes(listHelper.blogs)

        assert.strictEqual(result.likes, 17)
    })
})
