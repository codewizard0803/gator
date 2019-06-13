import React from 'react'

class Jay extends React.Component {

    row = {
        width: '56%',
        margin: '0 auto'
    }

    facts = {
        paddingBottom: '15px'
    }

    column = {
        float: 'left',
        marginTop: '5%'
    }

    render() {
        return (
            <div style={this.row}>
                <div style={this.column}>
                    <img src="https://i.imgur.com/s7Nykv4.png" alt="title name"></img>
                    <p style={this.facts}>I lived in Richmond.</p>
                    <p style={this.facts}>I moved to San Franciso.</p>
                    <p style={this.facts}>I now live in Daly Ciy.</p>
                    <p style={this.facts}>I watch a lot of movies and TV shows.</p>
                    <p style={this.facts}>I like playing video games with friends.</p>                    
                    <p style={this.facts}>I write code when I'm bored and I like smelling books.</p>
                    <p style={this.facts}>I like sticking my hands in towels.</p>
                    <p style={this.facts}>I still have both of my kidneys.</p>
                    <p style={this.facts}>I look Chinese, but I'm actually Filipino.</p>
                </div>
                <div style={this.column}>
                    <img src="https://i.imgur.com/6VeEhwL.png" alt="avatar"></img>
                </div>
            </div>
        )
    }
}

export default Jay
