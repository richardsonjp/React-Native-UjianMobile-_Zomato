import React, {Component} from 'react';
import {Image} from 'react-native';
import axios from 'axios'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right,Title,Item,Input } from 'native-base';

class Home extends Component {
  constructor(){
    super();
    this.state={
      data:[],
      text:''
    }
  }
  
  getFood=()=>{
    var url = 'https://developers.zomato.com/api/v2.1/search?q='+this.state.text;
    var config = {
      headers:{'user-key':'b0f268e846cb5574be5af5da79e4c04c'}
    }
    axios.get(url,config)
    .then((x)=>{
      this.setState({data:x.data.restaurants})
      console.log(x.data)
    })
  }
  render(){
    const data = this.state.data.map((item,index)=>{
      let gambardata = item.restaurant.thumb

      return(
          <Card key ={index} style={{flex:0}}>
            <CardItem>
              <Left>
              <Thumbnail source={{uri: gambardata}}/>
              <Body>
                <Text>{item.restaurant.name}</Text>
                <Text note>{item.restaurant.location.city}</Text>
              </Body>
              </Left>
              <Right>   
                <Text>Rp.{item.restaurant.average_cost_for_two/2}</Text>
              </Right>
            </CardItem>

          <CardItem>
            <Body>
              <Image source={{uri: gambardata}} style = {{height: 200, width:350, flex:0}}/>
            </Body>
          </CardItem>

          <CardItem>
            <Left>
              <Icon name="thumbs-up"/>
              <Text>{item.restaurant.location.address}</Text>
            </Left>
          </CardItem>

        </Card>
      )
    })
    return(
      <Container>
        <Header searchBar rounded>
        <Item>
          <Button onPress={this.getFood.bind(this)}><Icon name="search"/></Button>
          <Input
            placeholder = "Cari resto..."
            style={{height: 40, borderColor: 'gray', borderWidth:1}}
            onChangeText={(text)=>this.setState({text: text})}
            value={this.state.text}/>
        </Item>
        </Header>
      <Content>
        {data}
      </Content>
      </Container>
    )
  }
}

export default Home