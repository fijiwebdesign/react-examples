import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  
  input = null
  urls = {
    airbnb: {
      local: 'http://localhost:3000/airbnb.html',
      remote: 'https://www.airbnb.com.au/users/show/99824610',
    },
    ebay: {
      local: 'http://localhost:3000/ebay.html',
      remote: 'https://www.ebay.com.au/usr/twiz911',
    }

  }
  
  state = {
    html: null,
    fetching: false,
  }
  
  fetchHTML(url) {
    this.setState({ fetching: true })
    
    return fetch(url)
      .then(resp => resp.text())
      .then(html => this.setState({ html }))
      .then(() => this.setState({ fetching: false }))
  }
  
  onInputRef = input => {
    this.input = input
  }

  fetchAirBnb = () => {
    this.fetchHTML(this.urls.airbnb.local)
  }

  fetchEbay = () => {
    this.fetchHTML(this.urls.ebay.local)
  }
  
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.search}>
          <label>Fetch HTML from</label>
          <button onClick={this.fetchAirBnb}>AirBnb</button>
          <button onClick={this.fetchEbay}>Ebay</button>
        </div>
        {
          (this.state.html && !this.state.fetching) &&
          (
            <div style={styles.popupContainer}>
              <div 
                style={styles.popup} 
                dangerouslySetInnerHTML={ { __html: this.state.html } }
              >
              </div>
            </div>
          )
        }
        {this.state.fetching && <div style={styles.loader}>loading...</div>}
      </div>  
    )
    
  }

}

const styles = {
  container: {
    padding: '20px',
  },
  popupContainer: {
    position: 'relative',
  },
  popup: {
    position: 'absolute',
    top: '15px',
    left: '15px',
    border: '5px solid #000'
  },
  loader: {
    color: 'red'
  }
}
