// internal
import * as React from 'react'

// vendors
import axios from 'axios'
import { Breadcrumb, BreadcrumbItem, Container, Hero, HeroBody, Section, Subtitle, Tag, Title } from 'bloomer'
import moment from 'moment'
import { Link } from 'react-router-dom'

// json
import settings from '../../data/settings.json'

// sass
import './Post.scss'

export class Post extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      url: props.match.params.url,
      post: {}
    }
  }

  componentDidMount () {
    axios
      .get(`${settings.api.url.posts}/${this.state.url}`)
      .then(response => this.setState({ post: response.data.data }))
      .catch(err => window.console.error(err))
  }

  render () {
    const post = this.state.post
    const styleHero = {
      backgroundImage: `url(${post.imageurl})`
    }

    return (
      <div id='post'>
        <Hero isBold isSize='medium' className='header' style={styleHero}>
          <HeroBody>
            <Container hasTextAlign='centered'>
              <Title >{post.title}</Title>
              <Subtitle>{post.description}</Subtitle>
              <p>
                { this.renderDatePublished(post) } by { this.renderAuthor(post) }
              </p>
            </Container>
          </HeroBody>
        </Hero>
        <Section>
          <Container>
            <Breadcrumb>
              <ul>
                <BreadcrumbItem>
                  <Link to='/'>Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Link to={`/post/category/${post.categoryurl}`}>{post.categorytitle}</Link>
                </BreadcrumbItem>
                <BreadcrumbItem isActive>
                  <a href='javascript:;'>{post.title}</a>
                </BreadcrumbItem>
              </ul>
            </Breadcrumb>
            <div>
              {post.content}
            </div>
            <div>
              {this.renderTags(post)}
            </div>
          </Container>
        </Section>
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
      <span className='date'>{ moment(item.datepublished).format('LL') }</span>
    )
  }

  renderTags (post) {
    return (
      (post.tags || '').split(',').map(tag => {
        return (
          <Tag isColor='light'>
            <Link to={`/post/tag/${tag}`}>{tag}</Link>
          </Tag>
        )
      })
    )
  }
}
