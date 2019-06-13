import React from 'react'
import styled from 'styled-components'

import img from './assets/peter-profile.jpg'

const Container = styled.div`
  background-color: #FFFFFF;
  margin: auto;
  height: 50%;
  width: 75%;
  border-radius: 5px;
  text-align: center;
  font-family: 'IBM Plex Sans', sans-serif;
`

const Title = styled.h1`

`

const ProfileImage = styled.div`
  background-size: contain;
  background-image: url(${img});
  height: 300px;
  width: 300px;
  display:block;
  margin:auto;
`


export default class Peter extends React.Component {
  render() {
    return (
      <Container>
        <Title> Peter's about page</Title>
        <ProfileImage></ProfileImage>
        <p> I am a Computer Science student at San Francisco State University.</p>
        <p> For this team, I am the team lead to help our team build a sfsu housing website.</p>
        <p> I enjoy meeting new people, going out and exploring new places.</p>
      </Container>
    )
  }
}