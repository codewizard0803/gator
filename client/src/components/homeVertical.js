import React from 'react'
import styled from 'styled-components'

import ListingResult from './listingResult'

const Title = styled.h1`
  text-align: center;
`

const Fieldset = styled.fieldset`
  text-align: center;
`

const Hint = styled.p`
  text-align: center;
  font-style: italic;
`

class HomeVertical extends React.Component {
  state = {
    searchField: "",
    filterField: "tags",
    listing: null
  }

  changeHandler = event => {
    const name = event.target.name
    const value = event.target.value
    this.setState({
      [name]: value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.onSubmit && this.props.onSubmit(this.state)
    
    this.fetchAPI()
    .then(res => {
      this.setState({
        listing: res
      })
    })
    .catch( _ => console.log('no results'))
  }

  fetchAPI = async () => {
    const res = await fetch('/api/listing/' + this.state.filterField + '/' + this.state.searchField)
    const listing = await res.json()
    
    if(res.status !== 200) {
      throw Error(listing.message)
    }
    return listing
  }

  render() {
    return (
      <div>
        <Title> Software Engineering SFSU Fall 2019 Section 1 Team 5</Title>
        <form onSubmit={this.handleSubmit}>
          <Fieldset>
            <select value={this.state.filterField} name="filterField" onChange={this.changeHandler}>
              <option value="tags">Tags</option>
              <option value="zipcodes">Zipcode</option>
            </select>
            <label>
              Search:
              <input
                type="text"
                name="searchField"
                placeholder="search"
                value={this.state.searchField}
                onChange={this.changeHandler}
              />
            </label>
            <button type="submit">Search</button>
          </Fieldset>
        </form>
        <Hint>
          <b>valid test searches</b><br/>
          <b>tags:</b> kitchen, pets, living room, haunted, parking<br/>
          <b>zipcodes:</b> 94132, 94105<br/>
        </Hint>
        <ListingResult
          value={this.state.listing}
        />
      </div>
    )
  }
}

export default HomeVertical