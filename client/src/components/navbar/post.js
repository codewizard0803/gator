import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import { Button, Input, Loader } from 'semantic-ui-react'
import NavBar from './navBar'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.div`
    max-width: 600px;
    padding-left: 10px;
    padding-right: 10px;
    margin: auto;
    margin-top: 20px;
    position: static;
`

const Wrapper = styled.div`
  border: 2px solid #dbdbdb;
  padding: 10px 15px 15px 15px; 
  border-radius: 4px;
  margin-bottom: 10px;
  position: static;
`

const StyledLabel = styled.label`
  font-size: 15px;
  display: block;
`

const Title = styled.label`
  font-size: 20px;
  font-weight: bold;
  padding-top: 5px;
  padding-bottom: 5px;
`

const StyledButton = styled(Button)`
  && {
    margin-top: 10px;
    margin-bottom: 20px;
    background-color: #330033;
    color: white;
    box-shadow: 0px 3px 5px grey;
    :hover {
      background-color: #500150;
      color: white;
    }
  }
`

const Error = styled.span`
  color: red;
`

const Header = styled.h1`
  text-align: center;
`

const Text = styled.div`
  margin-top: 30px;
  text-align: center;
  font-size: 30px;
`

const Footer = styled.div`
  background-color: #330033;
  height: 95px;
  margin-top: 15px;
  color: white;
  font-size: 30px;
  padding: 20px;
`

class Post extends Component {

  //store input values and error messages for each
  state = {
    user_id: localStorage.getItem('user_id'),
    isAuth: localStorage.getItem('isAuth'),
    isLoading: false,
    address: '',
    city: '',
    state: 'California',
    zipcode: '',
    bedroom: '',
    bathroom: '',
    squarefoot: '',
    price: '',
    distance: '',
    housing_type: '',
    description: '',
    tags: '',
    images: [],
    formErrors: {
      addressError: '',
      cityError: '',
      zipcodeError: '',
      bedroomError: '',
      bathroomError: '',
      squarefootError: '',
      priceError: '',
      distanceError: '',
      housing_typeError: '',
      imagesError: '',
    }
  }

  //do this when user clicks submit
  handlePost = (e) => {
    e.preventDefault()

    //client validation
    const err = this.validate()
    if (!err) {
      this.setState({ isLoading: true })
      
      //step 1: post a listing and receive a listing_id
      axios.post('/api/listing', {
        user_id: this.state.user_id,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zipcode: this.state.zipcode,
        bedroom: this.state.bedroom,
        bathroom: this.state.bathroom,
        squarefoot: this.state.squarefoot,
        price: this.state.price,
        distance: this.state.distance,
        housing_type: this.state.housing_type,
        description: this.state.description
      })
        .then(res => {

          //step2: post tags
          let tags = this.state.tags
          tags = tags.replace(/\s/g,'')
          tags = tags.replace(/,/g, '+')
          axios.post(`/api/listing/tags/${tags}`, {
            listingId: res.data.listing_id
          })
            .then(res => {
              console.log(res.data)
            })
            .catch(err => {
              console.log(err.response)
            })
          
          //step3: post images
          const { images } = this.state
          let formdata = new FormData()
          for (let i = 0; i < images.length; i++) {
            formdata.append('photo', images[i])
          }
          axios({
            method: 'post',
            url: `/api/listing/photos/upload/${res.data.listing_id}`,
            data: formdata,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(res => {
              console.log(res.data)
              this.props.history.push('/mylistings')
            })
            .catch(err => {
              console.log(err)
            })

        })
        .catch(err => {
          if (err.response.status === 400) {
            this.props.history.push('/404')
          }
        })

    } else {
      console.log('Submission Error')
    }

  }

  //store images uploaded to state
  handleFile = e => {
    const images = e.target.files
    this.setState({ images })
  }

  //check if forms are empty and update error messages
  validate = () => {
    let isError = false
    const { address, city, zipcode, bedroom, bathroom, squarefoot, price, distance, housing_type, images, formErrors } = this.state
    
    if (address.length < 6) {
      this.setState(Object.assign(formErrors, {addressError: '*required'} ))
      isError = true
    } else {
      this.setState(Object.assign(formErrors, {addressError: ''} ))
    }

    if (city.length === 0) {
      this.setState(Object.assign(formErrors, {cityError: '*required'} ))
      isError = true
    } else {
      this.setState(Object.assign(formErrors, {cityError: ''} ))
    }

    if (zipcode.length !== 5) {
      this.setState(Object.assign(formErrors, {zipcodeError: '*required'} ))
      isError = true
    } else {
      this.setState(Object.assign(formErrors, {zipcodeError: ''} ))
    }

    if (bedroom.length === 0) {
      this.setState(Object.assign(formErrors, {bedroomError: '*required'} ))
      isError = true
    } else {
      this.setState(Object.assign(formErrors, {bedroomError: ''} ))
    }

    if (bathroom.length === 0) {
      this.setState(Object.assign(formErrors, {bathroomError: '*required'} ))
      isError = true
    } else {
      this.setState(Object.assign(formErrors, {bathroomError: ''} ))
    }

    if (squarefoot.length === 0) {
      this.setState(Object.assign(formErrors, {squarefootError: '*required'} ))
      isError = true
    } else {
      this.setState(Object.assign(formErrors, {squarefootError: ''} ))
    }

    if (price.length === 0) {
      this.setState(Object.assign(formErrors, {priceError: '*required'} ))
      isError = true
    } else {
      this.setState(Object.assign(formErrors, {priceError: ''} ))
    }

    if (distance.length === 0) {
      this.setState(Object.assign(formErrors, {distanceError: '*required'} ))
      isError = true
    } else {
      this.setState(Object.assign(formErrors, {distanceError: ''} ))
    }

    if (housing_type.length === 0) {
      this.setState(Object.assign(formErrors, {housing_typeError: '*required'} ))
      isError = true
    } else {
      this.setState(Object.assign(formErrors, {housing_typeError: ''} ))
    }

    if (images.length === 0) {
      this.setState(Object.assign(formErrors, {imagesError: '*required'} ))
      isError = true
    } else {
      this.setState(Object.assign(formErrors, {imagesError: ''} ))
    }

    return isError
  }

  changeZIP = e => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({zipcode: e.target.value})
    }
  }

  changePrice = e => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({price: e.target.value})
    }
  }

  changeSquareFoot = e => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({squarefoot: e.target.value})
    }
  }

  changeDistance = e => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({distance: e.target.value})
    }
  }

  render() {
    const { formErrors } = this.state

    if (this.state.isAuth === 'true') {
    return (
      <>
      <NavBar />
      <Container>
        <Form onSubmit={this.handlePost}>
          <Header>List your property</Header>
          <Wrapper>
            <Title>Location</Title>
            <Form.Group>
              <StyledLabel>Address</StyledLabel>
              <Form.Control maxLength="40" onChange={(e) => {this.setState({address: e.target.value})}}/>
              {formErrors.addressError.length > 0 && (
                <Error>{formErrors.addressError}</Error>
              )}
            </Form.Group>
            <Form.Group>
              <StyledLabel>City</StyledLabel>
              <Form.Control as="select" onChange={(e) => {this.setState({city: e.target.value})}}>
                <option value="">Select</option>
                <option value="San Francisco">San Francisco</option>
                <option value="Daly City">Daly City</option>
                <option value="San Bruno">San Bruno</option>
                <option value="South City">South City</option>
                <option value="Oakland">Oakland</option>
                <option value="Colma">Colma</option>
              </Form.Control>
              {formErrors.cityError.length > 0 && (
                <Error>{formErrors.cityError}</Error>
              )}
            </Form.Group>
            <Form.Group>
              <StyledLabel>State</StyledLabel>
              <Form.Control value={this.state.state} onChange={() => {}}/>
            </Form.Group>
            <Form.Group>
              <StyledLabel>ZIP Code</StyledLabel>
              <Form.Control maxLength="5" value={this.state.zipcode} onChange={(e) => {this.changeZIP(e)}}/>
              {formErrors.zipcodeError.length > 0 && (
                <Error>{formErrors.zipcodeError}</Error>
              )}
            </Form.Group>
          </Wrapper>
          <Wrapper>
            <Title>Details</Title>
            <Form.Group>
              <StyledLabel>Price</StyledLabel>
              <Form.Control maxLength="6" placeholder="$" value={this.state.price} onChange={(e) => {this.changePrice(e)}}/>
              {formErrors.priceError.length > 0 && (
                <Error>{formErrors.priceError}</Error>
              )}
            </Form.Group>
            <Form.Group>
              <StyledLabel>Property Type</StyledLabel>
              <Form.Control as="select" onChange={(e) => {this.setState({housing_type: e.target.value})}}>
                <option value="">Select</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Condo">Condo</option>
                <option value="Townhome">Townhome</option>
              </Form.Control>
              {formErrors.housing_typeError.length > 0 && (
                <Error>{formErrors.housing_typeError}</Error>
              )}
            </Form.Group>
            <Form.Group>
              <StyledLabel>Number of Bedrooms</StyledLabel>
              <Form.Control as="select" onChange={(e) => {this.setState({bedroom: e.target.value})}}>
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </Form.Control>
              {formErrors.bedroomError.length > 0 && (
                <Error>{formErrors.bedroomError}</Error>
              )}
            </Form.Group>
            <Form.Group>
              <StyledLabel>Number of Bathrooms</StyledLabel>
              <Form.Control as="select" onChange={(e) => {this.setState({bathroom: e.target.value})}}>
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </Form.Control>
              {formErrors.bathroomError.length > 0 && (
                <Error>{formErrors.bathroomError}</Error>
              )}
            </Form.Group>
            <Form.Group>
              <StyledLabel>Squarefoot</StyledLabel>
              <Form.Control maxLength="6" placeholder="sqft" value={this.state.squarefoot} onChange={(e) => {this.changeSquareFoot(e)}}/>
              {formErrors.squarefootError.length > 0 && (
                <Error>{formErrors.squarefootError}</Error>
              )}
            </Form.Group>
            <Form.Group>
              <StyledLabel>Distance from SFSU</StyledLabel>
              <Form.Control maxLength="3" placeholder="mi" value={this.state.distance} onChange={(e) => {this.changeDistance(e)}}/>
              {formErrors.distanceError.length > 0 && (
                <Error>{formErrors.distanceError}</Error>
              )}
            </Form.Group>
            <Form.Group>
              <StyledLabel style={{display: 'block'}}>Upload Images</StyledLabel>
              <Input type="file" name="file" onChange={e => this.handleFile(e)} multiple/>
              {formErrors.imagesError.length > 0 && (
                <span style={{color: 'red', display: 'block'}}>{formErrors.imagesError}</span>
              )}
            </Form.Group>
            <Form.Group>
              <StyledLabel>Tags</StyledLabel>
              <Form.Control maxLength="1000" as="textarea" placeholder="Separate tags with , ex) garage, kitchen, pets" rows="2" onChange={(e) => {this.setState({tags: e.target.value})}}/>
            </Form.Group>
          </Wrapper>
          <Wrapper>
            <Title>Description</Title>
            <Form.Control maxLength="1000" as="textarea" placeholder="Tell us more" rows="3" onChange={(e) => {this.setState({description: e.target.value})}}/>
          </Wrapper>
          {this.state.isLoading === false ? (
            <StyledButton fluid size='large'type="submit">Submit</StyledButton>
          ) : (
            <Loader active inline='centered' />
          )}
        </Form>
      </Container>
      <Footer>
        SFSU Software Engineering Project CSC 648-848, Spring 2019. For Demonstration only
      </Footer>
      </>
    )
    } else {
      return (
        <>
          <NavBar/>
          <Text>
            You must be logged in to post
            <Button style={{display: 'block', margin: 'auto', marginTop: '30px'}} onClick={() => {this.props.history.push('/login')}} color='yellow'>Login</Button>
          </Text>
        </>
      )
    }
  }
}

export default Post