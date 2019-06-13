import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import ReviewListing from './reviewResult'
import NavBar from '../navBar'
import axios from 'axios'

class ReviewListings extends Component {

  state ={
    listings: [],
    user_id: localStorage.getItem('user_id'),
    isAuth: localStorage.getItem('isAuth'),
    isAdmin: localStorage.getItem('isAdmin'),
    noResults: false,
    isLoading: true,
  }

  componentDidMount = () => {
    this.getAllListings()
  }

  getAllListings = () => {
    axios.get('/api/listing/incomplete')
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

  deleteListing = (listing_id) => {
    axios.delete(`/api/listing/${listing_id}`)
      .then(() => {
        this.getAllListings()
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  acceptListing = (listing_id) => {
    axios.put(`/api/listing/confirm/${listing_id}`)
      .then(() => {
        this.getAllListings()
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
        <ReviewListing 
          results={this.state.listings} 
          {...this.props} 
          noResults={this.state.noResults} 
          isLoading={this.state.isLoading} 
          deleteListing={this.deleteListing}
          acceptListing={this.acceptListing}
        />
      </>
    )
    
    }
  }
}

export default ReviewListings