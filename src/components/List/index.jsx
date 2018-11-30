// internal
import * as React from 'react'
import { Posts } from '../Posts'

// vendors
import { Container, Hero, HeroBody, Section, Subtitle, Title } from 'bloomer'

// json
import settings from '../../data/settings.json'

// sass
import './List.scss'

export const List = () => {
  return (
    <div id='list'>
      <Hero isBold isSize='medium' className='header'>
        <HeroBody>
          <Container hasTextAlign='centered'>
            <Title>{ settings.blog.title }</Title>
            <Subtitle>{ settings.blog.subtitle }</Subtitle>
          </Container>
        </HeroBody>
      </Hero>
      <Section>
        <Container>
          <Posts apiUrl={settings.api.url.posts} />
        </Container>
      </Section>
    </div>
  )
}
