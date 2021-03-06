const express = require('express')
const { ERRORS } = require('./utils/errors')
const { CLIENT_URL } = require('./utils/config')
const { handleBlogService } = require('./blogService')

const blogRouter = express.Router()
blogRouter.get('/', async (_req, res) => {
  try {
    const blog = await handleBlogService()
    if (blog?.length) {
      return res
        .set('Access-Control-Allow-Origin', CLIENT_URL)
        .status(200)
        .json(blog)
    }
    return res
      .status(400)
      .set('Access-Control-Allow-Origin', CLIENT_URL)
      .json({ message: ERRORS.REDIS })
  } catch (error) {
    const message = `${ERRORS.MEDIUM}: ${error?.message ?? error}`
    if (process.env.NODE_ENV === 'development') console.error(message)
    return res
      .status(400)
      .set('Access-Control-Allow-Origin', CLIENT_URL)
      .json({ message })
  }
})

module.exports = blogRouter
