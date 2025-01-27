const blog = require("../models/blog")

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    }
]

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {

    if (blogs.length === 0) {
        return 0
    } 

    let counter = 0

    blogs = blogs instanceof(Array) ? blogs : [blogs]

    blogs.map(b => {
        counter += b.likes
    })
    return counter
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    blogs = blogs instanceof(Array) ? blogs : [blogs]

    let max = 0
    let favOne = {}

    blogs.forEach(blog => {
        if (blog.likes > max) {
            max = blog.likes
            favOne = {
                title: blog.title,
                author: blog.author,
                likes: blog.likes
            }
        }
    })

    return favOne
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    blogs = blogs instanceof(Array) ? blogs : [blogs]

    let authorsAndBlogs = {}
    let max = 0
    let mostBlogs = {}

    blogs.forEach(blog => {
        if (Object.keys(authorsAndBlogs).includes(blog.author)) {
            authorsAndBlogs[blog.author].blogs += 1
        } else {
            authorsAndBlogs[blog.author.toString()] = {
                'author': blog.author,
                'blogs': 1
            }
        }
    })

    Object.keys(authorsAndBlogs).forEach(key => {
        if (authorsAndBlogs[key].blogs > max) {
            max = authorsAndBlogs[key].blogs
            mostBlogs = authorsAndBlogs[key]
        }
    })

    return mostBlogs
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    blogs = blogs instanceof(Array) ? blogs : [blogs]

    let authorsAndLikes = {}
    let max = 0
    let favOne = null

    blogs.forEach(blog => {
        if (!Object.keys(authorsAndLikes).includes(blog.author)) {
            authorsAndLikes[blog.author.toString()] = {
                'author': blog.author,
                'likes': blog.likes
            }
        } else {
            authorsAndLikes[blog.author.toString()].likes += blog.likes
        }
    })

    Object.keys(authorsAndLikes).forEach(key => {
        if (authorsAndLikes[key]['likes'] > max) {
            max = authorsAndLikes[key]['likes']
            favOne = authorsAndLikes[key]
        }
    })

    return favOne
}

module.exports = {
    blogs,
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}