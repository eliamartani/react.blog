// internal
import * as React from 'react'

// vendors
import { Container, Navbar, NavbarBrand, NavbarBurger, NavbarEnd, NavbarMenu } from 'bloomer'
import { NavLink } from 'react-router-dom'

// sass
import './Header.scss'

export class Header extends React.Component {
  constructor (props) {
    super(props)

    this.state = { isActive: false }

    this.onClickNav = this.onClickNav.bind(this)
  }

  onClickNav () {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  render () {
    return (
      <header id='header'>
        <Container>
          <Navbar>
            <NavbarBrand>
              <NavbarBurger isActive={this.state.isActive} onClick={this.onClickNav} />
            </NavbarBrand>
            <NavbarMenu isActive={this.state.isActive} onClick={this.onClickNav}>
              <NavbarEnd>
                <NavLink className='navbar-item' activeClassName='is-active' exact to='/'>Home</NavLink>
                <NavLink className='navbar-item' activeClassName='is-active' exact to='/about'>About</NavLink>
              </NavbarEnd>
            </NavbarMenu>
          </Navbar>
        </Container>
      </header>
    )
  }
}
