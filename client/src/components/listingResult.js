import React from 'react'
import styled from 'styled-components'

const ResultTitle = styled.p`
  font-weight: bold;
  text-align: center;
`

export default class ListingResult extends React.Component {
  render() {
    const listings = this.props.value
    const listingItems = listings

    return (
      <>
        {listings && (
          <>
            <ResultTitle>JSON representation from backend, for vertical prototype only:</ResultTitle>
            <ul>
            {listingItems && listingItems.map(listing => (
              <li key={listing.listing_id}>
              {JSON.stringify(listing)}
              <img src={listing.image} alt="housing"/>
            </li>
            ))}
            </ul>
          </>
        )}
      </>
    )
  }
}