import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import ListingResult from './listingResult'
import NavBar from '../navBar'
import axios from 'axios'

class MyListings extends Component {

  state ={
    listings: [],
    user_id: localStorage.getItem('user_id'),
    isAuth: localStorage.getItem('isAuth'),
    noResults: false,
    isLoading: true,
  }

  componentDidMount = () => {
    axios.get(`/api/listing/owner/${this.state.user_id}`)
      .then(res => {
        if (res.data.length === 0) {
          this.setState({ noResults: true})
        } else {
        const listingsTemp = res.data
        const temp = []
        listingsTemp.forEach(list => {
          axios.get(`/api/listing/retrieve/${list.listing_id}`)
            .then(res => {
              temp.push(res.data)
              temp.forEach(list => {
                axios.get(`/api/listing/photos/${list.listing_id}`)
                  .then(res => {
                    list.thumbnail = res.data[0].photo_url
                    this.setState({
                      listings: temp,
                      isLoading: false,
                    })
                  })
                  .catch(err => {
                    console.log(err)
                  })
              })
            })
            .catch(err => {
              console.log(err)
            })
        })
        }
      })
      .catch(() => {
        console.log('error getting listings')
      })
  }

  render() {

    if (this.state.isAuth === null) {
      return (
        <Redirect to="/404"/>
      )
    } else {

    return (
      <>
        <NavBar />
        <ListingResult results={this.state.listings} {...this.props} noResults={this.state.noResults} isLoading={this.state.isLoading} />
      </>
    )
    
    }
  }
}

export default MyListings