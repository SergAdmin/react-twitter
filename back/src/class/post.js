class Post {
  static #list = []
  static #count = 1

  constructor(username, text) {
    this.id = Post.#count++

    this.username = username
    this.text = text
    this.date = new Date().getTime()

    this.reply = []
  }

  static create(username, text, post) {
    // console.log('server1-create', text)
    const newPost = new Post(username, text)

    if (post) {
      console.log('post', post)
      post.reply.push(newPost)
    } else {
      // console.log('post-else', newPost)
      this.#list.push(newPost)
    }

    // console.log('server1', this.#list)

    return newPost
  }

  static getById(id) {
    // console.log('server1-getById', id)
    return (
      this.#list.find((item) => item.id === Number(id)) ||
      null
    )
  }

  static getList = () => {
    return this.#list
  }
}

module.exports = { Post }
