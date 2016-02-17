/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} from 'react-native';

//var FacebookTabBar = require('./FacebookTabBar');
var ScrollableTabView = require('react-native-scrollable-tab-view');
/*
var {
  ScrollableTabBar,
  DefaultTabBar,
} =  ScrollableTabView;
*/

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;

class ListPage extends Component {
  render() {
    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <Image style={styles.image} source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}} />
          <View style={styles.col}>
            <Text style={styles.title}>Flexbox and Styling (2016-02-30 14:00)</Text>
            <Text style={styles.text}>Laying out views should be easy, which is why we brought the flexbox layout model from the web to React Native. Flexbox makes it simple to build the most common UI layouts, such as stacked and nested boxes with margin and padding.</Text>
          </View>
        </View>
      </View>
    );
  }
}


class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }
}


class Example1 extends Component {
  render() {
    return (
      <AwesomeProject />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    marginLeft: 15,

  },
  year: {
    marginLeft: 15,
  },
  thumbnail: {
    width: 100,
    height: 100,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('Example1', () => Example1);
