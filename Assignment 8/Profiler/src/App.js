import React, { Component } from 'react';
import picture from './bread.jpg';

const data = {
  name: 'Jal Irani',
  imgUrl: picture,
  hobbyList: ['Front-end Web Development', 'Back-end Web Development', 'Eating Free Food', 'New Hobby']
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Name name={data.name}/>
        <Image image={data.imgUrl}/>
        <Hobbies hobbyList={data.hobbyList}/>
      </div>
    );
  }
}

class Name extends Component{
  render(){
    return (
      <h1>{this.props.name}</h1>
    );
  }
}

class Image extends Component{
  render(){
    return (
      <div>
        <img src={this.props.image}></img>;
      </div>
    );
  }
}

class Hobbies extends Component{
  render(){
    return (
      <div>
        <h4>My hobbies:</h4>
        <ul>
        {this.props.hobbyList.map(function(hobbyList){
            return <li>{hobbyList}</li>;
          })}
        </ul>
      </div>
    );
  }
}
export default App;