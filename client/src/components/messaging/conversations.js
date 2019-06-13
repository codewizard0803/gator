import React from 'react'
import { Icon } from 'semantic-ui-react'
import styled from 'styled-components'

const Container = styled.button`
  background-color: white;
  border: 1px solid white;
  padding: 5px;
  display: block;
  width: 348px;
  border-bottom: 1px solid #d6d6d6;
  :hover {
    background-color: #efefef;
    cursor: pointer;
  }
`

const Row = styled.div`
  font-size: 18px;
  margin-bottom: 5px;
  color: grey;
`

const Title = styled.div`
  font-size: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 5px;
`

const Space = styled.span`
  padding-right: 8px;
`

const Conversations = props => {
  return (
    <>
      {props.listings.map(item => (
        <Container key={item.listing_id} onClick={() => props.getConversation(item.listing_id)}>
          <Title>{item.address} {item.zipcode}</Title>
          <Row>
            <Space><Icon name="bed"/>{item.bedroom}bd</Space>
            <Space><Icon name="bath"/>{item.bathroom}ba</Space>
            {item.squarefoot} sqft
          </Row>
          <Row>{item.housing_type}</Row>
        </Container>
      ))}
    </>
  )
}

export default Conversations