//从服务器获取初始化数据
export const fetchData = () => (dispatch) => {
	$.get("./api/json.json",function(data){
		let pn = Number(window.location.hash.substr(1));
		if(pn == 0){
			window.location == "#1";
			pn = 1;
		}
		let result = calcTotal(data,pn);
		dispatch({"type":"FETCHDATA" , "data" : data , ...result});
	});
}

let calcTotal = (data,idx) =>{
	let amount = 0;
	var result;
	data.pic.forEach((pic,albumindex) => {
		pic.filter.forEach((filter,filterindex) => {
			filter.pics.forEach((thepic,picindex) => {
				amount++;
				if(amount == idx){
					result = {
						"albumindex" : albumindex,
						"filterindex" : filterindex,
						"picindex" : picindex
					}
				}
			});
		});
	});
	return result;
}

export const gotoidx = (number) => { return {"type" : "GOTOIDX", "number" : number}}

export const gonext = () => { return {"type": "GONEXT"}}

export const goprev = () => { return {"type": "GOPREV"}}

export const changeFilter = (album,filter) => { return {"type" : "CHANGEFILTER" , "album" : album , "filter" : filter}}