import React from "react";
import {changeFilter} from "../actions/actions.js";



class FilterBoxItem extends React.Component{
	constructor({item,cur,changeFilter,album,index}){
		super();

	}

	show(){
		if(this.props.item["filter-name"] == "资源"){
			return this.props.item.filter.map((thefilter,index)=>{
				let classname = ["color_choose"];

				if(this.props.cur && index == this.props.filter){
					classname.push("cur");
				}
				return <a key={index} onClick={()=>{this.props.dispatch(changeFilter(this.props.albumindex,index))}} className={classname.join(" ")}>{thefilter["type-name"]}</a>
			});
		}else{
			return this.props.item.filter.map((thefilter,index)=>{
				return <a key={index} onClick={()=>{this.props.dispatch(changeFilter(this.props.albumindex,index))}} className={(this.props.cur && index == this.props.filter)? "cur" : ""}>{thefilter["type-name"]}</a>
			});
		}
	}

	render(){
		return(
			<div>
				<div className="filter_name">
					{this.props.item["filter-name"]}
					 
				</div>
				<div className="filter_types">
					{
						this.show()
					}
				</div>
			</div>
		)
	}
}
export default FilterBoxItem;