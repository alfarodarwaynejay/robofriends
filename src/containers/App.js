import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList.js'
import SearchBox from '../components/SearchBox.js'
import Scroll from '../components/Scroll.js'
import './App.css';
import { setSearchField, requestRobots } from '../redux/action.js'

const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSearchChange: event => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	}
	
}

class App  extends Component {

	componentDidMount() {
		this.props.onRequestRobots();
	}

	render() {
		const { searchField, onSearchChange, robots, isPending } = this.props;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase())
		})

		return isPending ? 
			(
				<div className='tc'>
					<h1>RoboFriends</h1> 
					<SearchBox searchChange={this.onSearchChange}/>
					<hr />
					<h1> . . . LOADING . . . </h1>
				</div>
			) :
			(
				<div className='tc'>
					<h1>RoboFriends</h1> 
					<SearchBox searchChange={onSearchChange}/>
					<hr />
					<Scroll>
						<CardList robots={filteredRobots }/>
					</Scroll>
				</div>
			);
	}
}


//exporting connect here....
export default connect(mapStateToProps, mapDispatchToProps)(App);

