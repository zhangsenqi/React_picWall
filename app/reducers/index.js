let getInitialState = () => {
	return {
		"album" : 0,	//当前所在的相册类型0、1、2
		"filter" : 0,	//当前所在的相册编号
		"idx" : 0,		//当前所在图片序号，小序号，不是全局大排队
		"amount" : 0,	//总图片张数
		"data" : {
			"name" : "",
			"picture-index" : 0,
			"pic" : [
				 
			]
		},
	}
};

//计算图片总张数
let caltPicAmount = (data) => {
	let amount = 0;
	data.pic.forEach(function(pic){
		pic.filter.forEach(function(filter){
			amount += filter.pics.length;
		});
	});
	return amount;
}


export default (state = getInitialState(),action) => {
	switch(action.type){
		case "FETCHDATA" : 
			return {
				...state,
				"album" : action.albumindex,
				"filter" : action.filterindex,
				"idx" : action.picindex,
				"amount" : caltPicAmount(action.data),
				"data" : action.data
			}
		case "GOTOIDX" :
			return {
				...state,
				"idx" : action.number
			}
		case "GONEXT" : 
			if(state.idx == state.data.pic[state.album].filter[state.filter].pics.length -1){
				if(state.filter == state.data.pic[state.album].filter.length - 1){
					if(state.album == state.data.pic.length - 1){
						return {
							...state,
							"idx" : 0,
							"filter" : 0,
							"album" : 0
						}
					}
					return {
						...state,
						"idx" : 0,
						"filter" : 0,
						"album" : state.album + 1
					}
				}
				return {
					...state,
					"idx" : 0,
					"filter" : state.filter + 1
				}
			}
			return {
				...state,
				"idx" : state.idx + 1
			}
		case "GOPREV" : 
			if(state.idx == 0){
				if(state.filter == 0){
					if(state.album == 0){
						let lastAlbum = state.data.pic.length - 1;
						let lastFilter = state.data.pic[lastAlbum].filter.length - 1;
						return {
							...state,
							"album" : lastAlbum,
							"filter" : lastFilter,
							"idx" : state.data.pic[lastAlbum].filter[lastFilter].pics.length - 1
						}
					}
					let lastFilterNumber = state.data.pic[state.album - 1].filter.length - 1;
					return {
						...state,
						"album" : state.album - 1,
						"filter" : lastFilterNumber,
						"idx" : state.data.pic[state.album - 1].filter[lastFilterNumber].pics.length - 1
					}
				}
				return {
					...state,
					"filter" : state.filter - 1,
					"idx" : state.data.pic[state.album].filter[state.filter - 1].pics.length - 1
				}
			}
			return {
				...state,
				"idx" : state.idx - 1
			}
		case "CHANGEFILTER" :
			return {
				...state,
				"album" : action.album,
				"filter" : action.filter,
				"idx" : 0
			}
	}

	return state;
}