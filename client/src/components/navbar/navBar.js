import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import { Input } from 'semantic-ui-react'
import { Container, Image, Title, List, Link, Nav, ImageMobile, StyledDropdown, LeftColumn, MiddleColumn, RightColumn, LeftMobile, MiddleMobile, RightMobile, StyledButton } from './navBarStyle'
import logo from './img/logo.png'

const inputStyle = {
  width: '400px',
  paddingTop: '9px',
  paddingBottom: '8px'
}

const mobileStyle = {
  width: '175px',
  paddingTop: '9px',
  paddingBottom: '8px'
}

class NavBar extends Component {

  state = {
    width: window.innerWidth,
    user_id: localStorage.getItem('user_id'),
    isAuth: localStorage.getItem('isAuth'),
    isAdmin: localStorage.getItem('isAdmin'),
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }
  
  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

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
    if (this.state.isAdmin === 'false') {
      return (
        <>
          <Link><Nav to="/post">Post</Nav></Link>
          <Link><Nav to="/mylistings">My Listings</Nav></Link>
          <Link><Nav to="/messages">Messages</Nav></Link>
          <Link><StyledButton onClick={this.logOut}>Logout</StyledButton></Link>
        </>
      )
    }
    if (this.state.isAdmin === 'true') {
      return (
        <>
          <Link><Nav to="/users">Users</Nav></Link>
          <Link><Nav to="/listings">Listings</Nav></Link>
          <Link><Nav to="/reviewlistings">Pending Listings</Nav></Link>
          <Link><StyledButton onClick={this.logOut}>Logout</StyledButton></Link>
        </>
      )
    }
    if (this.state.isAdmin === null) {
      return (
        <>
          <Link><Nav to="/post">Post</Nav></Link>
          <Link><Nav to="/login">Login</Nav></Link>
          <Link><Nav to="/register">Sign Up</Nav></Link>
        </>
      )
    }
  }

  getNavMobile = () => {
    if (this.state.isAdmin === 'false') {
      return (
        <>
          <StyledDropdown title="Menu" variant="warning" drop="left">
            <Dropdown.Item onClick={() => {this.props.history.push('/post')}}>Post</Dropdown.Item>
            <Dropdown.Item onClick={() => {this.props.history.push('/mylistings')}}>My Listings</Dropdown.Item>
            <Dropdown.Item onClick={() => {this.props.history.push('/messages')}}>Messages</Dropdown.Item>
            <Dropdown.Item onClick={this.logOut}>Logout</Dropdown.Item>
          </StyledDropdown>
        </>
      )
    }
    if (this.state.isAdmin === 'true') {
      return (
        <>
          <StyledDropdown title="Menu" variant="warning" drop="left">
            <Dropdown.Item onClick={() => {this.props.history.push('/users')}}>Users</Dropdown.Item>
            <Dropdown.Item onClick={() => {this.props.history.push('/listings')}}>Listings</Dropdown.Item>
            <Dropdown.Item onClick={() => {this.props.history.push('/reviewlistings')}}>Pending Listings</Dropdown.Item>
            <Dropdown.Item onClick={this.logOut}>Logout</Dropdown.Item>
          </StyledDropdown>
        </>
      )
    }
    if (this.state.isAdmin === null) {
      return (
        <>
          <StyledDropdown title="Menu" variant="warning" drop="left">
            <Dropdown.Item onClick={() => {this.props.history.push('/login')}}>Login</Dropdown.Item>
            <Dropdown.Item onClick={() => {this.props.history.push('/register')}}>Sign Up</Dropdown.Item>
            <Dropdown.Item onClick={() => {this.props.history.push('/post')}}>Post</Dropdown.Item>
          </StyledDropdown>
        </>
      )
    }
  }

  render() {
    const { width } = this.state;
    const isMobile = width <= 1020;

    //mobile view
    if (isMobile) {
      return (
        <Container>
          <LeftMobile>
            <Nav to="/"><ImageMobile src={logo} height="45" width="45" alt="logo"/></Nav>
          </LeftMobile>
          <MiddleMobile>
            <form onSubmit={this.handleSearch}>
              <Input 
                style={mobileStyle}
                size='large'
                action={{ icon: 'search' }} 
                name="search"
                placeholder='City or ZIP code' 
                value={this.props.queue}
                onChange={this.props.changeQueue}
                maxLength="40"
              />
            </form>
          </MiddleMobile>
          <RightMobile>
            {this.getNavMobile()}
          </RightMobile>
        </Container>
      )
    } else {
      
      //desktop view
      return (
        <Container>
          <LeftColumn>
            <Nav to="/"><Image src={logo} height="45" width="45" alt="logo"/></Nav>
            <Nav to="/"><Title>Gatorbnb</Title></Nav>
          </LeftColumn>
          <MiddleColumn>
            <form onSubmit={this.handleSearch}>
              <Input 
                style={inputStyle}
                size='large'
                action={{ icon: 'search' }} 
                name="search"
                placeholder='Enter a city or ZIP code' 
                value={this.props.queue}
                onChange={this.props.changeQueue}
                maxLength="40"
              />
            </form>
          </MiddleColumn>
          <RightColumn>
            <List>
              {this.getNav()}
            </List>
          </RightColumn>
        </Container>
      )
    }
  }
}

export default withRouter(NavBar);