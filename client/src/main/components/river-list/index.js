import React, {Component} from 'react'

import RiverList from './RiverList'
import {Col, Row} from 'react-bootstrap'

import { connect } from "react-redux"
import { loadRivers, loadFavorites, actionFavorite, actionUnFavorite } from "../../../redux/actions";

class RiverListContainer extends Component {
    constructor(){
      super()
      this.state = {
        search: ""
      }

      this.handleInput = this.handleInput.bind(this)
    }

    componentDidMount() {
      this.props.loadRivers()
      this.props.authReducer.isAuthenticated ? this.props.loadFavorites() : this.props.mainReducer.favorites = []
    }

    handleActionFavorite(e){
      this.props.actionFavorite(e.target.id)
    }

    handleActionUnFavorite(id){
      this.props.actionUnFavorite(id)
    }

    handleInput(e){
      this.setState({[e.target.name]: e.target.value})
    }

    render() {
      const colStyle = {
        marginTop: "50px",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        borderRadius: "2px",
        paddingTop: "20px"
      }

      const searchStyle = {
        marginBottom: "10px"
      }
      const ids = this.props.mainReducer.favorites.map(favorite=>favorite.stream._id)
      let riverList = this.props.mainReducer.rivers.filter(river=>{
        let match =  ids.indexOf(river._id) === -1
        return match
      })


        return (
          <Row>

            <Col sm={8} smOffset={2} style={colStyle}>
              <input style={searchStyle} name="search" value={this.state.search} onChange={this.handleInput} placeholder="Search"/>

              {this.props.authReducer.isAuthenticated ?
                <RiverList search={this.state.search} rivers={riverList} favorites={this.props.mainReducer.favorites} handleActionFavorite={this.handleActionFavorite.bind(this)} handleActionUnFavorite={this.handleActionUnFavorite.bind(this)}></RiverList>
                :
                <RiverList search={this.state.search} rivers={riverList} favorites={[]} handleActionFavorite={this.handleActionFavorite.bind(this)} handleActionUnFavorite={this.handleActionUnFavorite.bind(this)}></RiverList>
              }
            </Col>
          </Row>
        )
    }
}

export default connect(state => state, { loadRivers, loadFavorites, actionFavorite, actionUnFavorite }) (RiverListContainer);
