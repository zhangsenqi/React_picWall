import React from "react";


class LazyImg extends React.Component{
	constructor(){
		super();

	}

	componentWillUpdate(){
		$(this.refs.img).hide();
		$(this.refs.img).load(function(){
			$(this).show();
		});
	}

	render(){
		return(
			<div className="big_inner">
				<img ref="img" src={this.props.src} alt=""/>
			</div>
		)
	}
}
export default LazyImg;