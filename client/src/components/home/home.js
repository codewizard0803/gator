import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'
import ListingResult from './listingResult'
import NavBar from '../navbar/navBar'
import Filter from './filter'
import Search from './search'
import styled from 'styled-components'
import axios from 'axios'
import ReactGA from 'react-ga'

const queryString = require('query-string')

const Container = styled.div`
  margin-left: 240px;
  background-color: white;
`

const ContainerMobile = styled.div`
  background-color: white;
  margin-top: 50px;
`

const Results = styled.div`
  margin-left: 240px;
`

const alertStyle = {
  margin: '10px',
  position: 'static'
}

class Home extends Component {

  state = {
    listings: [],
    noResults: false,
    filter: false,
    queue: '',
    type: '',
    beds: '',
    baths: '',
    priceMax: '',
    distanceMax: '',
    width: window.innerWidth,
  }

  componentDidMount() {
    ReactGA.initialize('UA-140468325-1', {
    'cookieDomain': 'auto',
    'debug': true
    });
    // ReactGA.initialize('UA-140468325-1');
    ReactGA.pageview(window.location.pathname + window.location.search)
    const query = this.props.location.search
    const parsed = queryString.parse(query);

    this.setState({
      queue: parsed.queue,
      type: parsed.type,
      beds: parsed.beds,
      baths: parsed.baths,
      priceMax: parsed.priceMax,
      distanceMax: parsed.distanceMax,
    })

    if (query === '?queue=' || query === '?queue=all') {
      this.getAllListings()
    } else {
      this.getListings(query)
    }

  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth })
  }

  getListings = (value) => {
    axios.get(`/api/listing/search/${value}`)
      .then(res => {
        if (res.data.length === 0) {
          this.setState({ noResults: true})
        }
        else {
          let listingsTemp = res.data
          let temp = []
          listingsTemp.forEach(list => {
            if (list.confirmation === true) {
              temp.push(list)
            }
          })
          temp.forEach(list => {
            axios.get(`/api/listing/photos/${list.listing_id}`)
              .then(res => {
                list.thumbnail = res.data[0].photo_url
                this.setState({
                  listings: temp
                })
              })
              .catch(err => {
                console.log(err)
              })
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  getAllListings = () => {
    axios.get('/api/listing')
      .then(res => {
        let listingsTemp = res.data
        let temp = []
        listingsTemp.forEach(list => {
          if (list.confirmation === true) {
            temp.push(list)
          }
        })
        temp.forEach(list => {
          axios.get(`/api/listing/photos/${list.listing_id}`)
            .then(res => {
              list.thumbnail = res.data[0].photo_url
              this.setState({
                listings: temp
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
  }

  filterSearch = e => {
    e.preventDefault()
    const query = this.props.location.search
    const search = query.split("&")
    const type =  e.target.elements.type.value
    const beds =  e.target.elements.beds.value
    const baths =  e.target.elements.baths.value
    const priceMax =  e.target.elements.priceMax.value
    const distanceMax =  e.target.elements.distanceMax.value
    this.props.history.push(`${search[0]}&type=${type}&beds=${beds}&baths=${baths}&priceMax=${priceMax}&distanceMax=${distanceMax}`)
  }

  showFilter = () => {
    if (this.state.filter) {
      return (
        <Filter
          filterSearch={this.filterSearch}
          type={this.state.type}
          beds={this.state.beds}
          baths={this.state.baths}
          priceMax={this.state.priceMax}
          distanceMax={this.state.distanceMax}
          changeType={this.changeType}
          changeBeds={this.changeBeds}
          changeBaths={this.changeBaths}
          changePrice={this.changePrice}
          changeDist={this.changeDist}
        />
      )
    } else {
      return null
    }
  }

  toggleFilter = () => {
    this.setState({
      filter: !this.state.filter
    })
  }

  changeQueue = e => {
    this.setState({ queue: e.target.value})
  }

  changeType = e => {
    this.setState({ type: e.target.value})
  }

  changeBeds = e => {
    this.setState({ beds: e.target.value})
  }

  changeBaths = e => {
    this.setState({ baths: e.target.value})
  }

  changePrice = e => {
    this.setState({ priceMax: e.target.value})
  }

  changeDist = e => {
    this.setState({ distanceMax: e.target.value})
  }

  render() {
    const { width } = this.state
    const isMobile = width <= 560

    let props = {
      filterSearch: this.filterSearch,
      type: this.state.type,
      beds: this.state.beds,
      baths: this.state.baths,
      priceMax: this.state.priceMax,
      distanceMax: this.state.distanceMax,
      changeType: this.changeType,
      changeBeds: this.changeBeds,
      changeBaths: this.changeBaths,
      changePrice: this.changePrice,
      changeDist: this.changeDist,
    }

    //mobile view
    if (isMobile) {
      if (this.state.noResults === true) {
        return (
          <>
            <NavBar queue={this.state.queue} changeQueue={this.changeQueue} />
            <Search handleFilter={this.toggleFilter} />
            {this.showFilter()}
            <ContainerMobile>
              <Alert style={alertStyle} variant="warning">
                <Alert.Heading>No matching results...</Alert.Heading>
                <p>Please check your spelling or enter a valid city or ZIP code.</p>
              </Alert>
            </ContainerMobile>
          </>
        )
      } else {
        return (
          <>
            <NavBar queue={this.state.queue} changeQueue={this.changeQueue} />
            <Search handleFilter={this.toggleFilter} />
            {this.showFilter()}
            <ContainerMobile>
              <ListingResult results={this.state.listings}/>
            </ContainerMobile>
          </>
        )
      }
    }

    //desktop view
    if (this.state.noResults === true) {
      return (
        <>
          <NavBar queue={this.state.queue} changeQueue={this.changeQueue} />
          <Filter {...props}/>
          <Results>
            <Alert style={alertStyle} variant="warning">
              <Alert.Heading>No matching results...</Alert.Heading>
              <p>Please check your spelling or enter a valid city or ZIP code.</p>
            </Alert>
          </Results>
        </>
      )
    } else {
      return (
        <>
          <NavBar queue={this.state.queue} changeQueue={this.changeQueue} />
          <Filter {...props} />
          <Container>
            <ListingResult results={this.state.listings}/>
          </Container>
        </>
      )
    }
  }
}

export default Home
