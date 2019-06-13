import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Table } from 'semantic-ui-react'
import NavBar from '../navBar'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.div`
  width: 1000px;
  margin: 0 auto;
  margin-top: 50px;
`

export default class Users extends Component {

  state ={
    users: [],
    user_id: localStorage.getItem('user_id'),
    isAuth: localStorage.getItem('isAuth'),
    isAdmin: localStorage.getItem('isAdmin'),
  }

  componentDidMount() {
    this.getAllUsers()
  }

  getAllUsers = () => {
    axios.get('/api/user/')
    .then(res => {
      console.log(res.data)
      this.setState({ users: res.data })
    })
    .catch(err => {
      console.log(err)
    })
  }

  deleteUser = user_id => {
    axios.delete(`/api/user/${user_id}`)
      .then(() => {
        this.getAllUsers()
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {

    if (this.state.isAdmin !== 'true') {
      return (
        <Redirect to="/404"/>
      )
    } else {

    return (
      <> 
        <NavBar />
        <Container>
        <h1>Users List</h1>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>E-mail</Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.users.map(item => (
              <Table.Row key={item.user_id}>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell>{item.firstname}</Table.Cell>
                <Table.Cell>{item.lastname}</Table.Cell>
                <Table.Cell style={{textAlign: 'center'}}><Button onClick={() => this.deleteUser(item.user_id)} color='red'>Delete</Button></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        </Container>
      </>
    )

    }
  }
}
