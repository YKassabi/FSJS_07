import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import {config} from '../config';

import Nav from './Nav';
import SearchBar from './SearchBar';
import Gallery from './Gallery';

import '../css/App.css';
import NotFound from './NotFound';

class App extends Component {

    state={
      photos: [],
      queryText: 'Joy',
      loading: true,
    }; 

// Responsable for fetching data from Flickr API //
    FetchingData = (searchingWord)=> {
          
          const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${config.Key}&tags=${searchingWord}&per_page=24&format=json&nojsoncallback=1`;
       
          axios.get(url)
            .then(response => {
              this.setState({
                photos: response.data.photos.photo,
                queryText: searchingWord,
              })
            })
            .catch(error => {
              console.log('>>a bobo happened with fetching or parsing. Error:', error);
            }).finally(()=>this.setState({loading:false}))
    }

    
  // generating the  galery on the first load up // 
  componentDidMount(){
    this.FetchingData(this.state.queryText);
  }


  
  render(){

    return (
      <BrowserRouter>
          <div className="App">
          <SearchBar searchPhotos={this.FetchingData} />
          <Nav searchPhotos={this.FetchingData} />

          <Switch>
            <Route exact path="/" render={ () => (this.state.loading)
            ? <h2>LOADING....</h2>
            : <Gallery photos={this.state.photos} query={this.state.queryText} />} />              
              <Route component={NotFound} />
          </Switch>
          </div>

      </BrowserRouter>
      );
    }
}

export default App;
