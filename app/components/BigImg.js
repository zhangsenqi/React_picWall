import React from "react";
import {connect} from "react-redux";
import {gonext,goprev} from "../actions/actions.js"
import LazyImg from "./LazyImg.js"


class BigImg extends React.Component{
	constructor({gonext,goprev}){
		super();

	}

	render(){
		if(!this.props.img){
			return <div></div>
		}

		return(
			<div className="big_pic">
				<div className="inner">
					<LazyImg src={"images/big/" + this.props.img}></LazyImg>
					<div className="leftBtn" id="leftBtn" onClick={()=>{this.props.dispatch(goprev())}}></div>
					<div className="rightBtn" id="rightBtn" onClick={()=>{this.props.dispatch(gonext())}}></div>
				</div>
			</div>
		)
	}
}
export default connect(
	(state) => {
		if(state.data.pic.length == 0){
			return {
				img : null,
				idx : 0
			}
		}else{
			return {
				album : state.album,
				filter : state.filter,
				idx : state.idx,
				img : state.data.pic[state.album].filter[state.filter].pics[state.idx]
			}
		}
	}
)(BigImg);