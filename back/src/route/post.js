// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const { Post } = require('../class/post')

//=======================

router.post('/post-create', function (req, res) {
  //console.log('server post-create', req.body)
  try {
    const { username, text, postId } = req.body

    if (!username || !text) {
      return res.status(400).json({
        message: 'You need to put all data in the box',
      })
    }

    let post = null

    // console.log('postId', postId)

    if (postId) {
      console.log('post')
      post = Post.getById(Number(postId))
      console.log('post', post)

      if (!post) {
        console.log('!post')
        return res.status(400).json({
          message: 'Data with this number of post is here.',
        })
      }
    }

    // console.log('Post.create1', username, text, post)

    const newPost = Post.create(username, text, post)

    // console.log('Post.create2', newPost)

    return res.status(200).json({
      post: {
        id: newPost.id,
        text: newPost.text,
        username: newPost.username,
        date: newPost.date,
      },
    })
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    })
  }
})

//==============================

router.get('/post-list', function (req, res) {
  // console.log('server post-list')
  try {
    const list = Post.getList()

    if (list.length === 0) {
      return res.status(200).json({
        list: [],
      })
    }

    return res.status(200).json({
      list: list.map(({ id, username, text, date }) => ({
        id,
        username,
        text,
        date,
      })),
    })
  } catch (e) {
    // console.log('Обшибка')
    return res.status(400).json({
      message: e.message,
    })
  }
})

//==============================

router.get('/post-item', function (req, res) {
  try {
    const { id } = req.query
    if (!id) {
      return res.status(400).json({
        message: 'Have to send post ID ',
      })
    }

    const post = Post.getById(Number(id))

    if (!post) {
      return res.status(400).json({
        message: 'There are no tsis ID post ',
      })
    }

    return res.status(200).json({
      post: {
        id: post.id,
        text: post.text,
        username: post.username,
        date: post.date,

        reply: post.reply.map((reply) => ({
          id: reply.id,
          text: reply.text,
          username: reply.username,
          date: reply.date,
        })),
      },
    })
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    })
  }
})

//==============================
// Експортуємо глобальний роутер
module.exports = router
