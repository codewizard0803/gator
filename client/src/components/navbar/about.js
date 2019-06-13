import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { withRouter }  from 'react-router'
import styled from 'styled-components'

import peterimg from '../about/assets/peter-profile.jpg'
import wesimg from '../about/assets/wes.png'
import mehiimg from '../about/assets/mehipic.jpg'
import manimg from '../about/assets/manimg.png'
import womanimg from '../about/assets/womanimg.png'

const Header = styled.div`
  text-align: center;
`

const Title = styled.h1`
  padding-top: 20px;
`

const Leads = styled.div`
  margin-top: 15px;
  margin-bottom: 10px;
  text-align: center;
`

const Members = styled.div`
  margin-top: 10px;
  text-align: center;
`

const Container = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  width: 152px;
  display: inline-block;
  border: 1px solid #dfdfdf;
  border-radius: 10px;
  text-align: left;
`

const PeterImage = styled.img`
  background-size: contain;
  height: 150px;
  width: 150px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px solid #dfdfdf;
`

const WesleyImage = styled.img`
  background-size: contain;
  height: 150px;
  width: 150px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px solid #dfdfdf;
`

const MehiImage = styled.img`
  background-size: contain;
  height: 150px;
  width: 150px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px solid #dfdfdf;
`

const ManImage = styled.img`
  background-size: contain;
  height: 150px;
  width: 150px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px solid #dfdfdf;
`

const WomanImage = styled.img`
  background-size: contain;
  height: 150px;
  width: 150px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px solid #dfdfdf;
`

const Nav = styled(NavLink)`
  color: black;
  :hover {
    color: black;
  }
`
const Name = styled.div`
  padding-top: 10px;
  padding-left: 15px;
  font-size: 20px;
  font-weight: bold;
`
const Details = styled.div`
  padding-top: 10px;
  padding-left: 15px;
  padding-bottom: 10px;
  font-style: italic;
`

class About extends Component {
  render() {
    return (
      <div>
        <Header>
          <Title>Our Team</Title>
        </Header>
        <Leads>
          <Nav to="/about/peter">
          <Container>
            <PeterImage src={peterimg}></PeterImage>
            <Name>Peter</Name>
            <Details>Team Lead</Details>
          </Container>
          </Nav>
          <Nav to="/about/wesley">
          <Container>
            <WesleyImage src={wesimg}></WesleyImage>
            <Name>Wesley</Name>
            <Details>Backend Lead</Details>
          </Container>
          </Nav>
          <Nav to="/about/jay">
          <Container>
            <ManImage src={manimg}></ManImage>
            <Name>Jay</Name>
            <Details>Frontend Lead</Details>
          </Container>
          </Nav>
        </Leads>
        <Members>
          <Nav to="/about/mehi">
          <Container>
            <MehiImage src={mehiimg}></MehiImage>
            <Name>Mehi</Name>
            <Details>Frontend</Details>
          </Container>
          </Nav>
          <Nav to="/about/tanya">
          <Container>
            <WomanImage src={womanimg}></WomanImage>
            <Name>Tanya</Name>
            <Details>Frontend</Details>
          </Container>
          </Nav>
          <Nav to="/about/franky">
          <Container>
            <ManImage src={manimg}></ManImage>
            <Name>Franky</Name>
            <Details>Frontend</Details>
          </Container>
          </Nav>
          <Nav to="/about/anthony">
          <Container>
            <ManImage src={manimg}></ManImage>
            <Name>Anthony</Name>
            <Details>Backend</Details>
          </Container>
          </Nav>
        </Members>
      </div>
    )
  }
}

export default withRouter(About)