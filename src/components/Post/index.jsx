// internal
import * as React from 'react'

// vendors
import axios from 'axios'
import { Container, Hero, HeroBody, Section, Subtitle, Title } from 'bloomer'
import moment from 'moment'

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
    const style = {}

    style.backgroundImage = `url(${post.imageurl})`

    console.log(style)

    return (
      <div id='post'>
        <Hero isBold isSize='medium' className='header' style={style}>
          <HeroBody>
            <Container hasTextAlign='centered'>
              <Title >{post.title}</Title>
              <Subtitle>{post.description}</Subtitle>
              <p>
                <span className='date'>{ moment(post.datepublished).format('LL') }</span> by <span className='author'>{ post.author }</span>
              </p>
            </Container>
          </HeroBody>
        </Hero>
        <Section>
          <Container>
            {post.content}
          </Container>
        </Section>
      </div>
    )
  }
}
