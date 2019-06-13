import React from 'react'
import { withRouter }  from 'react-router'
import { Icon } from 'semantic-ui-react'
import { Container, Link, Card, Image, Title, Type, Details, Address, Circle, Space, Span } from './listingResultStyle'

const ListingResult = props => {
  return (
    <Container>
      {props.results.map(item => (
        <Link to={`/listing/${item.listing_id}`} key={item.listing_id} target="_blank">
        <Card>
          <div>
            <Image src={item.thumbnail} alt="thumbnail"></Image>
          </div>
          <div>
            <Title>${item.price}</Title>
            <Type>
              <Circle/>
              <Span>{item.housing_type}</Span>
            </Type>
            <Details>
              <Space><Icon name="bed"/>{item.bedroom}bd</Space>
              <Space><Icon name="bath"/>{item.bathroom}ba</Space>
              {item.squarefoot} sqft
            </Details>
            <Address>{item.address}, {item.zipcode}</Address>
          </div>
        </Card>
        </Link>
      ))}
    </Container>
  )
}

export default withRouter(ListingResult)