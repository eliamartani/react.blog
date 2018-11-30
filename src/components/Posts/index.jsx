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
  }

  componentDidMount () {
    axios
      .get(this.state.api.url)
      .then(response => this.setState({ posts: response.data.data }))
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
                        <span className='date'>{ moment(item.datepublished).format('L') }</span> by <span className='author'>{ item.author }</span>
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
}
