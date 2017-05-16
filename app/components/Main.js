import React from "react";
import {connect} from "react-redux";
import {fetchData} from "../actions/actions.js";
import BigImg from "./BigImg.js";
import FilterBox from "./FilterBox.js";
import InfoBox from "./InfoBox.js";
import SmallPicNavBox from "./SmallPicNavBox.js";



class Main extends React.Component{
	constructor({state,dispatch}){
		super();

		dispatch(fetchData());
	}

	calcTotal(){
		let amount = 0;
		let end = false;
		this.props.state.data.pic.forEach((pic,albumindex) => {
			pic.filter.forEach((filter,filterindex) => {
				filter.pics.forEach((thepic,picindex) => {
					if(
						albumindex == this.props.state.album
						&&
						filterindex == this.props.state.filter
						&&
						picindex == this.props.state.idx
					){
						end = true;
					}
					!end && amount++;
				});
			});
		});
		return amount;
	}

	componentDidUpdate(){
		var totalIdx = this.calcTotal();

		window.location.hash = totalIdx + 1;
	}

	render(){
		return(
			<div className="appwrap">
				<BigImg></BigImg>
				<div className="number_nav">
					{this.calcTotal() + 1}/{this.props.state.amount}
				</div>
				<div className="right_bar">
					<InfoBox></InfoBox>
					<FilterBox></FilterBox>
					<SmallPicNavBox></SmallPicNavBox>
				</div>
			</div>
		)
	}
}
export default connect(
	(state) => {
		return {
			"state" : state
		}
	}
)(Main);