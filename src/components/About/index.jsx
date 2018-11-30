// internal
import * as React from 'react'

// vendors
import { Container, Hero, HeroBody, Section, Title } from 'bloomer'

// sass
import './About.scss'

export const About = () => {
  return (
    <div id='about'>
      <Hero isBold isSize='medium' className='header'>
        <HeroBody>
          <Container hasTextAlign='centered'>
            <Title>About</Title>
          </Container>
        </HeroBody>
      </Hero>
      <Section>
        <Container>
          <p>
            Project created using <code>React</code>, <code>Bloomer</code>, <code>Bulma CSS</code>, <code>SASS</code> and <code>MomentJS</code>.
          </p>
        </Container>
      </Section>
    </div>
  )
}
