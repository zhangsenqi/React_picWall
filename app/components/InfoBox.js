import React from "react";
import {connect} from "react-redux";



class InfoBox extends React.Component{
	constructor({name}){
		super();

	}

	render(){
		return(
			<div className="info_box">
				<h3 className="info_title">照片墙</h3>
			</div>
		)
	}
}
export default connect(
	(state)=> {
		return {
			name : state.data.name
		}
	}
)(InfoBox);