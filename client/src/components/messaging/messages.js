import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Placeholder } from 'semantic-ui-react'
import NavBar from '../navbar/navBar'
import Conversations from './conversations'
import ChatRoom from './chatRoom'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const LeftColumn = styled.div`
  min-width: 350px;
  border: 1px solid #d6d6d6;
  height: 92vh;
  overflow: auto;
`

const RightColumn = styled.div`
  width: 100%;
`

const Title = styled.div`
  font-size: 30px;
  text-align: center;
  margin-top: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #d6d6d6;
`

class Messages extends Component {

  state = {
    user_id: localStorage.getItem('user_id'),
    isAuth: localStorage.getItem('isAuth'),
    listings: [],
    conversation: [],
    header: [],
    sendingTo: '',
    message: '',
    loading: true,
    noResults: false,
  }

  componentDidMount() {
    this.getAllConversations()
  }

  getConversation = (listing_id) => {
    axios.get('/api/message/myMessages')
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].listing_id === listing_id) {
            if (this.state.user_id === res.data[i].owner_id) {
              this.setState({ sendingTo: res.data[i].renter_id })
              break
            } else {
              this.setState({ sendingTo: res.data[i].owner_id })
              break
            }
          }
        }
      })
      .then(() => {
        axios.get(`/api/message/receive/${listing_id}/${this.state.sendingTo}`)
          .then(res => {
            this.setState({ conversation: res.data })
            this.getHeader(listing_id)
          })
          .catch(err => {
            console.log(err.response.data)
          })
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  getAllConversations = () => {
    axios.get('/api/message/myMessages')
      .then(res => {
        if (res.data.length === 0) {
          this.setState({ noResults: true})
        } else {
        const temp = []
        const conversations = res.data
        conversations.forEach(list => {
          axios.get(`/api/listing/retrieve/${list.listing_id}`)
            .then(res => {
              temp.push(res.data)
              this.setState({ 
                listings: temp,
                loading: false,
              })
            })
            .catch(err => {
              console.log(err.response.data)
            })
        })
      }
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  getHeader = (value) => {
    axios.get(`/api/listing/retrieve/${value}`)
      .then(res => {
        this.setState({ header: res.data })
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  sendMessage = e => {
    e.preventDefault()
    axios.post('/api/message/send', {
      message: this.state.message,
      listingId: this.state.header.listing_id,
      recepientId: this.state.sendingTo,
    })
      .then(() => {
        axios.get(`/api/message/receive/${this.state.header.listing_id}/${this.state.sendingTo}`)
          .then(res => {
            this.setState({
              message: '',
              conversation: res.data,
            })
          })
          .catch(err => {
            console.log(err.response.data)
          })
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  changeMessage = e => {
    this.setState({ message: e.target.value})
  }

  render() {

    if (this.state.isAuth === null) {
      return (
        <Redirect to="/404"/>
      )
    } else {

    return (
      <>
        <NavBar />
        <Container>
          <LeftColumn>
            <Title>Messages</Title>
            {this.state.noResults ? (
              null
            ) : (
              this.state.loading ? (
                <Placeholder style={{margin: '10px'}}>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder>
              ) : (
                <Conversations listings={this.state.listings} getConversation={this.getConversation} />
              )
            )}
          </LeftColumn>
          <RightColumn>
            <ChatRoom 
              conversation={this.state.conversation} 
              header={this.state.header} 
              user_id={this.state.user_id} 
              sendMessage={this.sendMessage}
              message={this.state.message}
              changeMessage={this.changeMessage} 
            />
          </RightColumn>
        </Container>
      </>
    )

    }
  }
}

export default Messages;