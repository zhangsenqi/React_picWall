import React from "react";
import {connect} from "react-redux";
import {gotoidx} from "../actions/actions.js";


class SmallPicNavBox extends React.Component{
	constructor({pics,idx,filter,gotoidx}){
		super();
		//总页数，跟store中的pics数组有关系，所以不需要用state周转
		this.pageamount = 0;
		this.filter = filter;
		this.state = {
			"nowpage" : 0 
	}
}

	showul(){
		//数组，图片数组
		var pics = this.props.pics;
		//准备返回的ul清单
		var uls = [];
		//得到第几页的第几张有cur
		var curi = parseInt(this.props.idx / 9);
		var curj = this.props.idx % 9;

		//遍历ul清单
		for(let i = 0 ; i < this.pageamount ; i++){
			//放入li
			let lis = [];
			for(let j = 0 ; j < 9 && i * 9 + j < pics.length; j++){
				//得到数组中这里的字符串
				var imgurl = pics[i * 9 + j];
				//图片的完整路径
				let src = "images/small/" + imgurl;
				lis.push(
					<li key={j} className={i==curi && j == curj ? "cur" : ""} onClick={()=>{this.props.dispatch(gotoidx(i * 9 + j))}}>
						<img src={src} />
						<div className="mask"></div>
					</li>
				);
			}
			uls.push(<ul key={i}>{lis}</ul>);
		}
		return uls;
	}

	//显示图片小导航条
	showulnav(){
		var spans = [];
		for(var i = 0 ; i < this.pageamount ; i++){
			spans.push(<span key={i}></span>);
		}
		return spans;
	}

	//组件上树之后
	componentDidMount(){
		var self  = this;
		$(this.refs.ul_nav).delegate("span","click",function(){
			$(self.refs.ul_box).stop(true).animate({"left" : -263 * $(this).index()},500);
			$(this).addClass("cur").siblings().removeClass("cur");
		});
	}

	//组件更新之后
	componentDidUpdate(){
		if(this.filter != this.props.filter){
 			this.setState({ nowpage :0});
 			this.filter = this.props.filter;
   			$(this.refs.ul_box).css({"left" : 0 });
   			return;
		}

		if(this.state.nowpage != parseInt(this.props.idx / 9)){
			this.setState({"nowpage" : parseInt(this.props.idx / 9)});
			 $(this.refs.ul_box).stop(true).animate({"left" : -263 * parseInt(this.props.idx / 9) } , 500);
		}
		$(this.refs.ul_nav).find("span").eq(this.state.nowpage).addClass("cur").siblings().removeClass("cur");
		$(this.refs.ul_box).stop(true).animate({"left" : -263 * parseInt(this.props.idx / 9) } , 500);
	}

	render(){
		this.pageamount = Math.ceil(this.props.pics.length / 9);
		return(
			<div className="small_pic_nav_box">
				<h3>图片导航</h3>
				<div className="inner" id="small_pic_nav_box">
					<div className="ul_box"  ref="ul_box">
						{this.showul()}
					</div>
				</div>
				<div className="ul_nav" style={{"width" : this.pageamount * 40 - 10}} ref="ul_nav">
					{this.showulnav()}
				</div>
			</div>
		)
	}
}
export default connect(
	(state) => {
		//处理
		if(state.data.pic.length == 0){
			return {
				pics : [],
				idx : 0,
				filter : 0
			}
		}else{
			return {
				pics : state.data.pic[state.album].filter[state.filter].pics,
				idx : state.idx,
				filter : state.filter
			}
		}
	}
)(SmallPicNavBox);