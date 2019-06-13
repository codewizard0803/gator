import React from 'react'
import { Button } from 'semantic-ui-react'
import { Container, Title, Label, FilterType, Select, StyledButton } from './filterStyle'

const Filter = props => {
  return (
    <Container>
    <form onSubmit={props.filterSearch}>
      <Title>Filter By</Title>
      <Label>
        <FilterType>Home Type</FilterType>
        <Select name="type" value={props.type} onChange={props.changeType}>
          <option value="">Any</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="condo">Condo</option>
          <option value="townhome">Townhome</option>
        </Select>
      </Label>
      <Label>
        <FilterType>Bedrooms</FilterType>
        <Select name="beds" value={props.beds} onChange={props.changeBeds}>
          <option value="">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </Select>
      </Label>
      <Label>
        <FilterType>Bathrooms</FilterType>
        <Select name="baths" value={props.baths} onChange={props.changeBaths}>
          <option value="">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </Select>
      </Label>
      <Label>
        <FilterType>Price</FilterType>
        <Select name="priceMax" value={props.priceMax} onChange={props.changePrice}>
          <option value="">No Max</option>
          <option value="400">$400</option>
          <option value="600">$600</option>
          <option value="800">$800</option>
          <option value="1000">$1,000</option>
          <option value="1500">$1,500</option>
          <option value="2000">$2,000</option>
          <option value="2500">$2,500</option>
          <option value="3000">$3,000</option>
          <option value="3500">$3,500</option>
          <option value="4000">$4,000</option>
          <option value="5000">$5,000</option>
          <option value="7000">$7,000</option>
          <option value="10000">$10,000</option>
        </Select>
      </Label>
      <Label>
        <FilterType>Distance from SFSU</FilterType>
        <Select name="distanceMax" value={props.distanceMax} onChange={props.changeDist}>
          <option value="">No Max</option>
          <option value="1">1 mile</option>
          <option value="2">2 miles</option>
          <option value="3">3 miles</option>
          <option value="4">4 miles</option>
          <option value="5">5 miles</option>
          <option value="6">6 miles</option>
          <option value="7">7 miles</option>
          <option value="8">8 miles</option>
          <option value="9">9 miles</option>
          <option value="10">10 miles</option>
          <option value="15">15 miles</option>
          <option value="20">20 miles</option>
          <option value="25">25 miles</option>
        </Select>
      </Label>
      <StyledButton>
        <Button style={{color: 'black'}}color='yellow' type="submit">Apply Filter</Button>
      </StyledButton>
    </form>
    </Container>
  )
}

export default Filter