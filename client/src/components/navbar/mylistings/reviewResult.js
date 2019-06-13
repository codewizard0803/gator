import React from 'react'
import { Button, Icon, Placeholder } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 20px;
`

const Wrapper = styled.div`
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  margin: 5px;
`

const LeftColumn = styled.div`
  width: 400px;
  padding: 5px;
`

const MiddleColumn = styled.div`
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

const ReviewResult = props => {
  return (
    <Container>
      <Title>Pending Listings</Title>
      {props.noResults === true ? (
        <h3>There are no listings to review</h3>
      ) : (
        props.isLoading === true ? (
          <Placeholder>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder>
        ) : (
          props.results.map(item => (
            <Wrapper key={item.listing_id}>
              <LeftColumn>
                <img src={item.thumbnail} width="350" height="200" alt="thumbnail"/>
              </LeftColumn>
              <Link to={`/listing/${item.listing_id}`} target="_blank" style={{color: 'black'}}>
              <MiddleColumn>
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
              </MiddleColumn>
              </Link>
              <RightColumn>
                <Button style={{margin: '5px', float: 'right'}} onClick={() => props.deleteListing(item.listing_id)} color='red'>Reject</Button>
                <Button style={{margin: '5px', float: 'right'}} onClick={() => props.acceptListing(item.listing_id)} color='green'>Accept</Button>
              </RightColumn>
            </Wrapper>
        )
      ))
      )}
    </Container>
  )
}

export default ReviewResult