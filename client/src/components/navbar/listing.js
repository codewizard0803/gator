import React, { Component } from 'react'
import styled from 'styled-components'


const ShadowedBox = styled.p`
  border: 1px ridge;
  box-shadow:0px 5px 10px grey; 
  width: 75%;
  height: 125px;
`
const BoxContainer = styled.div`
  padding: 20px;
  border: 1px solid #c3c3c3;
  margin: 10px;
  border-radius: 5px;  
  position: absolute;
  float: bottom;
`
const MessageBtn = styled.button`
  background-color: #FFCF00;
  border-radius: 5px;
  margin-left: 50%;
  font-weight: bold;
  position: absolute;
  top: 90px;
  height: 30px;
  width: 150px;
`

const MessageBtn2 = styled.button`
  background-color: #FFCF00;
  border-radius: 5px;
  font-weight: bold;
  height: 30px;
  width: 150px;
  float: bottom;
  margin-left: 50%;
  position: relative;
`

const Line = styled.div`
  margin-bottom: 25px;
  margin-top: 25px;
  width: 75%;
  height: 10px;
  border-bottom: 1px solid grey;
  text-align: left;
  font-size: 20px;
  position: relative;
  padding: 15px;
  float: bottom;
`
const LineTitle = styled.span`
  background-color: white;
  padding: 0 15px;
`   
const Container = styled.div`
  height: 50%;
  width: 75%;
  border-radius: 5px;
  float: bottom;
  margin-left: 100px;
`
const PicDiv = styled.div`
  height: 40%;
  width: 40%;
  margin-left: 100px;
  padding: 20px;
  float: bottom;
`

class Listing extends Component {
  render() {
    return (
      <div>
        <ShadowedBox> 
          <div>
            <span style={{color:'grey', marginLeft:'60px', position: 'relative', width:'30%'}}> Rent </span>
            <strong style={{marginLeft:'30%'}}> <span style={{height:'20px', width:'20px', backgroundColor:'green', borderRadius:'50%', display:'inline-block' }}></span> APPARTMENT FOR RENT </strong>
            <span style={{ marginLeft:'60px', fontSize:'25px', position: 'relative', width:'30%'}}> <br/> $25,000</span>
            <span style={{marginLeft:'25%'}}> Addy goes here </span>
            <span style={{marginLeft:'40%'}}> <br/>sqft of Appartment goes here</span>          
          </div>
          <MessageBtn>Message</MessageBtn>
        </ShadowedBox>
        <PicDiv>
          Pictures goes here
        </PicDiv>
          <Container>
            <Line>
              <LineTitle>Overview </LineTitle>
            </Line>
              <div style={{marginLeft:'8%', width:'60%'}}>
                <p>Appartment</p>
                <p>2 Bedrooms</p>
                <p>1 Bathroom</p>
                <p>600 sqft</p>
                <p>2.4 miles from SFSU</p>
              </div>
          </Container >
          <Container>
            <Line>
                <LineTitle>Description</LineTitle>
            </Line>
              <div style={{marginLeft:'8%', width:'60%'}}>
                <p> Blah Blah  Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah
                Blah Blah  Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah
                Blah Blah  Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah
                Blah Blah  Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah
                Blah Blah  Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah
                Blah Blah  Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah
                Blah Blah  Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah
                Blah Blah  Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah
                Blah Blah  Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah
                </p>
                <MessageBtn2>Message</MessageBtn2>        
              </div>
          </Container>        
        <BoxContainer style={{ backgroundColor:'green',height:'75%', width: '35%', right:'0', top:'48px' }}>
          <p>Map goes here</p>
        </BoxContainer>
      </div>
    )
  }
}

export default Listing