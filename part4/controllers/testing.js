const router = require('express').Router()
const { request } = require('express')
const Note = require('../models/note')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
    await Note.deleteMany({})
    await User.deleteMant({})

    response.status(204).end()
})

module.exports = router