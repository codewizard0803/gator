import React, { Component } from 'react'
import { Button, Icon, Placeholder } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import NavBar from '../navBar'
import styled from 'styled-components'
import axios from 'axios';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  margin-top: 20px;
`

const Wrapper = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: row;
  margin: 5px;
`

const LeftColumn = styled.div`
  width: 400px;
  padding: 5px;
`

const RightColumn = styled.div`
  width: 200px;
`

const Title = styled.h1`
  font-size: 35px;
  border-bottom: 1px solid grey;
  padding-bottom: 5px;
`

const Row = styled.div`
  font-size: 20px;
  margin-bottom: 5px;
  color: grey;
`

const Price = styled.div`
  font-size: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 5px;
`

const Circle = styled.span`
  height: 10px;
  width: 10px;
  margin-right: 5px;
  border-radius: 50%;
  background-color: green; 
  display: inline-block;
`

const Space = styled.span`
  padding-right: 8px;
`

export default class Listings extends Component {

  state ={
    listings: [],
    user_id: localStorage.getItem('user_id'),
    isAuth: localStorage.getItem('isAuth'),
    isAdmin: localStorage.getItem('isAdmin'),
    isLoading: true,
  }

  componentDidMount() {
    this.getAllListings()
  }

  getAllListings = () => {
    axios.get('/api/listing')
      .then(res => {
        this.setState({
          listings: res.data,
          isLoading: false,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  deleteListing = (listing_id) => {
    axios.delete(`/api/listing/${listing_id}`)
      .then(() => {
        this.getAllListings()
      })
      .catch(err => {
        console.log(err.response.data)
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
          <Title>Listings</Title>
          {this.state.isLoading === true ? (
              <Placeholder>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder>
            ) : (
              this.state.listings.map(item => (
                <Wrapper key={item.listing_id}>
                  <Link to={`/listing/${item.listing_id}`} target="_blank" style={{color: 'black'}}>
                  <LeftColumn>
                    <Row style={{color: 'black'}}>
                      <Circle />
                      <span>{item.housing_type}</span>
                    </Row>
                    <Price>${item.price}</Price>
                    <Row>
                      <Space><Icon name="bed"/>{item.bedroom}bd</Space>
                      <Space><Icon name="bath"/>{item.bathroom}ba</Space>
                      {item.squarefoot} sqft
                    </Row>
                    <Row>{item.address} {item.zipcode}</Row>
                  </LeftColumn>
                  </Link>
                  <RightColumn>
                    <Button style={{margin: '5px', float: 'right'}} onClick={() => this.deleteListing(item.listing_id)} color='red'>Delete</Button>
                  </RightColumn>
                </Wrapper>
            )
          )
          )}
        </Container>
      </>
    )
    
    }
  }
}
