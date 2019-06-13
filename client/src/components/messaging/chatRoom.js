import React from 'react'
import { Message, Input } from 'semantic-ui-react'
import styled from 'styled-components'

const Header = styled.div`
  font-size: 30px;
  text-align: center;
  margin-top: 30px;
  padding-bottom: 31px;
  border-bottom: 1px solid #d6d6d6;
`

const Other = styled.div`
  margin: 10px;
  padding: 10px;
`

const You = styled.div`
  margin: 10px;
  padding: 10px;
  text-align: right;
`

const OtherMessage = styled.span`
  border: 1px solid #E5E5EA;
  background-color: #E5E5EA;
  padding: 10px;
  border-radius: 10px;
`

const YouMessage = styled.span`
  border: 1px solid #0B93F6;
  background-color: #0B93F6;
  color: white;
  padding: 10px;
  border-radius: 10px;
`

const Container = styled.div`
  height: 68vh;
  overflow: auto;
`

const Box = styled.form`
  padding: 10px;
`

const ChatRoom = props => {
  return (
    <>
      {props.conversation.length === 0 ? (
        <Message style={{margin: '10px'}} color='yellow'>Select a listing to view messages</Message>
      ) : (
        <>
          <Header>{props.header.address} {props.header.zipcode}</Header>
          <Container>
          {props.conversation.map(item => (
            <div key={item.message_id}>
              {props.user_id === item.owner_id ? (
                <You>
                  <YouMessage>{item.message}</YouMessage>
                </You>
              ) : (
                <Other>
                  <OtherMessage>{item.message}</OtherMessage>
                </Other>
              )}
            </div>
          ))}
          </Container>
          <Box onSubmit={props.sendMessage}>
            <Input action='Send' style={{width: '100%', height: '40px'}} value={props.message} onChange={props.changeMessage} focus/>
          </Box>
        </>
      )}
    </>
  )
}

export default ChatRoom