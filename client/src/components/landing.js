import React, { Component } from 'react'
import { Button, Input } from 'semantic-ui-react'
import styled from 'styled-components'
import About from './navbar/about'
import logo from './navbar/img/logo.png'

const Container = styled.div`
  background-color: #330033;
  width: 100%;
  height: 80vh;
`

const Nav = styled.div`
  padding-top: 10px;
  margin: 0 auto;
  max-width: 1000px;
  display: flex;
  flex-direction: row;
`

const LeftColumn = styled.div`
  width: 70px;
`

const MiddleColumn = styled.div`
  width: 200px;
  @media (max-width: 500px) {
    display: none;
  }
`

const RightColumn = styled.div`
  width: 740px;
`

const Wrapper = styled.div`
  float: right;
  margin-right: 10px;
`

const Title = styled.h1`
  color: white;
  font-size: 40px;
  padding-left: 5px
  text-shadow: 0px 2px 2px grey;
`

const Header = styled.h1`
  color: white;
  text-align: center;
  font-size: 35px;
  margin-top: 15vh;
`

const Description = styled.h1`
  color: white;
  text-align: center;
  font-size: 25px;
`

const Search = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 15px;
`

const Footer = styled.div`
  padding: 20px;
  background-color: #ededed;
`

const Disclaimer = styled.h1`
  text-align: center;
  font-size: 25px;
`

const Para = styled.p`
  font-size: 20px;
  text-align: center;
`

const Image = styled.img`
  margin-left: 15px;
`

export default class Landing extends Component {

  state = {
    user_id: localStorage.getItem('user_id'),
    isAuth: localStorage.getItem('isAuth'),
    isAdmin: localStorage.getItem('isAdmin'),
  }

  handleSearch = e => {
    e.preventDefault()
    let query = e.target.elements.search.value
    query = query.replace(/ /g,"+")
    this.props.history.push(`/search/?queue=${query}`)
  }

  logOut = () => {
    localStorage.removeItem('user_id')
    localStorage.removeItem('isAuth')
    localStorage.removeItem('isAdmin')
    this.props.history.push('/login')
  }

  getNav = () => {
    if (this.state.isAdmin === 'true') {
      return (
        <>
          <Button style={{margin: '5px'}} onClick={() => {this.props.history.push('/reviewlistings')}} inverted>Dashboard</Button>
          <Button style={{margin: '5px'}} onClick={this.logOut} inverted>Log Out</Button>
        </>
      )
    }
    if (this.state.isAdmin === 'false') {
      return (
        <>
          <Button style={{margin: '5px'}} onClick={() => {this.props.history.push('/post')}} inverted>Post</Button>
          <Button style={{margin: '5px'}} onClick={() => {this.props.history.push('/mylistings')}} inverted>Dashboard</Button>
          <Button style={{margin: '5px'}} onClick={this.logOut} inverted>Log Out</Button>
        </>
      )
    }
    if (this.state.isAdmin === null) {
      return (
        <> 
          <Button style={{margin: '5px'}} onClick={() => {this.props.history.push('/post')}} inverted>Post</Button>
          <Button style={{margin: '5px'}} onClick={() => {this.props.history.push('/login')}} inverted>Login</Button>
          <Button style={{margin: '5px'}} onClick={() => {this.props.history.push('/register')}} inverted>Sign Up</Button>
        </>
      )
    }
  }

  render() {
    return (
      <>
        <Container>
          <Nav>
            <LeftColumn>
              <Image src={logo} height="45" width="45" alt="logo" />
            </LeftColumn>
            <MiddleColumn>
              <Title>Gatorbnb</Title>
            </MiddleColumn>
            <RightColumn>
              <Wrapper>
                {this.getNav()}
              </Wrapper>
            </RightColumn>
          </Nav>
          <Header>Welcome to Gatorbnb</Header>
          <Description>Housing for SFSU students</Description>
          <Search>
            <form onSubmit={this.handleSearch}>
              <Input size='massive' action={{ icon: 'search' }} name="search" placeholder='Enter a city or ZIP code' style={{width: '100%'}} />
            </form>
          </Search>
        </Container>
        <Footer>
          <Disclaimer>DISCLAIMER</Disclaimer>
          <Para>Gatorbnb is a website <b>NOT</b> intended for commercial purposes. We do not ask for any type of payment in any shape or form. 
            This website is for educational purposes only and only stimulates a website where SFSU students can find a place to rent. 
            The information on this website is fictional, however uses actual locations and pictures of housing. Any similarities 
            are completely coincidental. SFSU Software Engineering Project CSC 648-848, Spring 2019. For Demonstration only.</Para>
        </Footer>
        <About />
      </>
    )
  }
}