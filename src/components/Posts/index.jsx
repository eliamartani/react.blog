// internal
import React from 'react'

// vendors
import axios from 'axios'
import { Card, CardContent, Content, Media, MediaContent, Title } from 'bloomer'
import moment from 'moment'
import { Link } from 'react-router-dom'

export class Posts extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      api: {
        index: 1,
        length: 10,
        url: props.apiUrl
      },
      posts: []
    }

    this.inifiniteScroll = this.inifiniteScroll.bind(this)
  }

  componentDidMount () {
    this.requestPosts(this.state.api)

    window.addEventListener('scroll', this.inifiniteScroll)
  }

  inifiniteScroll () {
    const isBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight
    if (isBottom) {
      let api = this.state.api

      api.index++

      this.setState({ api })

      this.requestPosts(api)
    }
  }

  requestPosts (api) {
    axios
      .get(`${api.url}/${api.length}/${api.index}`)
      .then(response => {
        const posts = this.state.posts
        const data = response.data.data

        if (data) {
          posts.push(...data)
        } else {
          // reached the last page
          window.removeEventListener('scroll', this.inifiniteScroll)
        }

        this.setState({ posts: posts })
      })
      .catch(err => window.console.error(err))
  }

  render () {
    return (
      <div>
        {this.state.posts.map(item => {
          const url = `/post/${item.url}`

          return (
            <Card className='article' key={item.id}>
              <CardContent>
                <Media>
                  <div className='media-center'>
                    <img src='/assets/images/author.png' className='author-image' alt='' />
                  </div>
                  <MediaContent hasTextAlign='centered'>
                    <Title className='post-title' isSize='4'>
                      <Link to={url}>{ item.title }</Link>
                    </Title>
                    <p>
                      <small className='date-and-author'>
                        { this.renderDatePublished(item) } by { this.renderAuthor(item) } - { this.renderCategory(item) }
                      </small>
                    </p>
                  </MediaContent>
                </Media>
                <Content>
                  <p>
                    { item.description }
                  </p>
                  <Link className='read-more' to={url}>
                    Read more
                  </Link>
                </Content>
              </CardContent>
            </Card>
          )
        })}
      </div>
    )
  }

  renderAuthor (item) {
    return (
      <span className='author'>{ item.author }</span>
    )
  }

  renderCategory (item) {
    return (
      <span className='category'>{ item.categorytitle }</span>
    )
  }

  renderDatePublished (item) {
    return (
      <span className='date'>{ moment(item.datepublished).format('L') }</span>
    )
  }
}
