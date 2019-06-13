import styled from 'styled-components'

export const LeftColumn = styled.div`
  width: 650px;
`

export const RightColumn = styled.div`
  width: 350px;
  position: fixed;
  margin-left: 20px;
`

export const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const StyledContainer = styled.div`
  width: 350px;
`

export const Title = styled.div`
  text-align: left;
  border-bottom: 1px solid grey;
  font-size: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-right: 10px;
`

export const Image = styled.img`
  cursor: pointer;
  width: 520px;
  display: block;
  margin: auto;
  :hover {
    opacity: 0.85;
  }
`

export const Images = styled.div`
  padding-top: 15px;
`

export const Overview = styled.div`
  font-size: 22px;
  margin: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid grey;
`

export const Details = styled.span`
  font-size: 18px;
  display: block;
  margin: 20px 20px 30px 20px;
`

export const Description = styled.div`
  padding-left: 20px;
`

export const Para = styled.p`
  font-size: 18px;
`

export const Map = styled.div`
  padding-top: 10px;
  height: 300px;
`

export const TagsTitle = styled.div`
  font-size: 22px;
  padding: 20px 15px 10px 15px;
`

export const Tag = styled.div`
  display: inline-block !important;
  padding: 8px 8px 8px 12px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  margin: 5px;
  background-color: #E5E5EA;
  color: black;
`

export const TagContainer = styled.div`
  padding-left: 10px;
  width: 350px;
`

export const Button = styled.div`
  color: white;
  font-size: 30px;
  margin-top: 10px;
  padding: 15px;
  width: 350px;
  text-align: center;
  background-color: #330033;
  border-radius: 5px;
  box-shadow: 0px 3px 5px grey;
  :hover {
    background-color: #500150;
    pointer: cursor;
  }
`

export const Footer = styled.div`
  background-color: #330033;
  height: 95px;
  margin-top: 15px;
  color: white;
  font-size: 30px;
  padding: 20px;
`