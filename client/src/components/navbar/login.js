import React, { Component } from 'react'
import { Button, Form, Grid, Header, Message, Segment, Label, Loader } from 'semantic-ui-react'
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'
import NavBar from './navBar'
import axios from 'axios'

const Container = styled.div`
  max-width: 600px;
  padding-left: 10px;
  padding-right: 10px;
  margin: auto;
  margin-top: 5%;
`

const StyledButton = styled(Button)`
  && {
    background-color: #330033;
    color: white;
    box-shadow: 0px 3px 5px grey;
    :hover {
      background-color: #500150;
      color: white;
    }
  }
`

const StyledLabel = styled.label`
  font-weight: bold;
  display: block;
`

const Invalid = styled.span`
  color: red;
`

class Login extends Component {

  state = {
    user_id: localStorage.getItem('user_id'),
    isAuth: localStorage.getItem('isAuth'),
    isLoading: false,
    email: '',
    password: '',
    formErrors: {
      emailError: '',
      passwordError: '',
      invalidError: ''
    }
  }

  validate = () => {
    let isError = false
    const { email, password, formErrors } = this.state

    if (email.indexOf("@") === -1) {
      this.setState(Object.assign(formErrors, {emailError: 'Email is not valid'} ))
      isError = true
    } else {
      this.setState(Object.assign(formErrors, {emailError: ''} ))
    }

    if (password.length < 6) {
      this.setState(Object.assign(formErrors, {passwordError: 'Password is not valid'} ))
      isError = true
    } else {
      this.setState(Object.assign(formErrors, {passwordError: ''} ))
    }

    return isError
  }

  handleLogin = (e) => {
    e.preventDefault()
    const err = this.validate()
    if (!err) {
      this.setState({ isLoading: true })
      axios.post('/api/user/login', {
        email: this.state.email,
        password: this.state.password
      })
        .then(res => {
          localStorage.setItem('user_id', res.data.user_id)
          localStorage.setItem('isAuth', res.data.isAuthenticated)
          axios.get('/api/user/admin')
            .then(res => {
              if (res.data === true) {
                localStorage.setItem('isAdmin', 'true')
                this.props.history.push('/reviewlistings')
              } else {
                localStorage.setItem('isAdmin', 'false')
                this.props.history.push('/')
              }
            })
        })
        .catch(err => {
          if (err.response.data === 'login failed') {
            this.setState({ isLoading: false })
            this.setState(Object.assign(this.state.formErrors, {invalidError: 'Invalid email or password'} ))
          }
          console.log(err.response.data)
        })
    } else {
      console.log('Submission Error')
    }

  }

  render() {
    const { formErrors } = this.state

    if (this.state.isAuth === 'true') {
      return (
        <Redirect to="/404"/>
      )
    } else {

    return (
      <>
      <NavBar />
      <Container>
        <Grid>
          <Grid.Column style={{ width: '630px' }}>
            <Header as='h2' color='black' textAlign='center'>
              Log-in to your account
            </Header>
            <Form size='large' onSubmit={this.handleLogin}>
              <Segment stacked>
                <StyledLabel>Email</StyledLabel>
                {formErrors.emailError.length > 0 && (
                  <Label basic color='red' pointing='below'>{formErrors.emailError}</Label>
                )}
                <Form.Input 
                  maxLength="30"
                  fluid icon='user' 
                  iconPosition='left' 
                  placeholder='E-mail address' 
                  onChange={(e) => {this.setState({email: e.target.value})}}
                />
                <StyledLabel>Password</StyledLabel>
                {formErrors.passwordError.length > 0 && (
                  <Label basic color='red' pointing='below'>{formErrors.passwordError}</Label>
                )}
                <Form.Input
                  maxLength="30"
                  fluid icon='lock' 
                  iconPosition='left' 
                  placeholder='Password' 
                  type='password' 
                  onChange={(e) => {this.setState({password: e.target.value})}}
                />
                {this.state.isLoading === false ? (
                  <StyledButton fluid size='large'type="submit">Log In</StyledButton>
                ) : (
                  <Loader active inline='centered' />
                )}
              </Segment>
            </Form>
            <Message style={{textAlign: 'right'}}>
              New to us? <Link to="/register" style={{ paddingLeft: '5px'}}>Create an account</Link>
            </Message>
          </Grid.Column>
        </Grid>
        <Invalid>{this.state.formErrors.invalidError}</Invalid>
      </Container>
      </>
    )
    }
  }
}

export default Login