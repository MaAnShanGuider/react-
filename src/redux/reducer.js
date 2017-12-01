import { combineReducers } from 'redux'
import axios from 'axios'

const defaultState = {
		CARD_DETAIL:{num:0,price:0,title:null,imgUrl:null},
		FROM_SG_DATA:{},
		TEXT:'',
		SORT_GAME:{
			nowList:[],
			selectList:null, //这个selectList是用来记录，当跳转之后，再跳回来时，跳转之前停留的状态
		},
		SEARCH_RUSULT:{
			games:null,
			meta:null,
			doneGet:false,
		},
		NOW_GOODs:null,
		CART_SUM:{
			//----sum里存放所有的购物车里的东西
			sum:{},
			//---bool判断sum是否为空对象
			bool:false,
		},
}


//-----(1)下面的三个函数的第一个参数，都是与type其对应的子state，而不是整个state
//		例如CARD_DETALL函数里第一个参数，就是对应了state里的CARD_DETALL属性。
//		
//		
//-------(2)每个函数里的return，都是给总state里的key值为函数名的子state赋值。
//
//
//-------(3)所有的子reducers在每个dispatch触发时，都会被触发，所以我们要利用switch来
//		判断action.type,因为第二点的缘故，这些字reducer被触发时都必须返回一个值，
//		如果不加switch，那么所有的子reducer都会执行Object.assign({},a,action.payload);
//		combineReducers并不会自动根据action.type来选择执行哪个子reducers，而是所有的都
//		会被执行。然后根据执行后的返回值再进行下一步的操作。
//		
const CARD_DETAIL = (a=defaultState.CARD_DETAIL,action)=>{
	switch (action.type){
		case 'CARD_DETAIL':
			return Object.assign({},a,action.payload);
		default:
			return a;
	}
}

const FROM_SG_DATA = (b=defaultState.FROM_SG_DATA,action)=>{
	
	switch (action.type){
		case 'FROM_SG_DATA':
			return Object.assign({},b,action.payload);
		default:
			return b;
	}
}


const TEXT = (c=defaultState.TEXT,action)=>{
	/*console.log('我是TEXT');*/
	switch (action.type){
		case 'sendText':
			return action.payload;
		default :
			return c;
	}
}

//-----首页的分页目录
const SORT_GAME = (d=defaultState.SORT_GAME,action)=>{
	
	switch (action.type){
		//-----获取第一次请求到的数据
		case 'FROM_SG_DATA':
			
			if(action.payload){
				//----设置nowList的初始值
				return Object.assign({},d,action.payload,{nowList:action.payload.store.hot_tag_games,selectList:'li_1'});
			}
			else{
				return Object.assign({},d,action.payload);
			}
		//-----以后每个li点击时，都会跳到这个地方
		case 'SORT_GAME':
				switch (action.payload){
					case 1 :
						// console.log(d);
						 
						var obj = Object.assign({},d,{nowList:d.store.hot_tag_games,selectList:'li_1'});
						return obj;
							
					case 2 :
						// console.log(d);
						var obj = Object.assign({},d,{nowList:d.store.new_tag_games,selectList:'li_2'});
						return obj;
							
					case 3 :
						// console.log(d);
						var obj = Object.assign({},d,{nowList:d.store.top10_games,selectList:'li_3'});
						return obj;
							
					case 4 :
						// console.log(d);
						
						var obj = Object.assign({},d,{nowList:d.store.rec_games,selectList:'li_4'});
						return obj;
						
				};
		default:
			return d;
	}
}

const SEARCH_RUSULT=(state=defaultState.SEARCH_RUSULT,action)=>{
	switch (action.type){
		case 'startSearch':
			return Object.assign([],state,action.payload,{doneGet:true});
		case 'endSearch':
							return {
							games:null,
							meta:null,
							doneGet:false,
						};
		default:
			return state;
	}
}
const NOW_GOODS = (f = defaultState.NOW_GOODs,action)=>{
	switch(action.type){
		case 'nowGoods':
			return action.payload;
		default:
			return f;
	}
}

const CART_SUM = (g = defaultState.CART_SUM,action)=>{
	switch(action.type){
		case 'submit':
			let id=action.payload.id;
			let sum = Object.assign({},g.sum,{[id]:action.payload});
			
			return Object.assign({},g,{sum,bool:true});
		case 'sumAdd':
			//----这里传过来的payload就是sum的属性名，
				
				g.sum[action.payload].num++;
				console.log(g.sum[action.payload].num);
				//-----如果这里返回g，那么views默认不会变化.
				let ng = Object.assign({},g);
			return ng;
		case 'sumDel':
				//---当点击减少按钮时，执行这个，结果值大于0，保留该对象
				//结果值等于0，移除该对象。
				//怎么移除？？？可以返回一个新对象。
				if(g.sum[action.payload].num-1>0){
					g.sum[action.payload].num--;
					return Object.assign({},g);
				}
				else {
					//-----返回一个新对象
					let newSum = {};
					let boolSum = 0;
					for(let i in g.sum){
						if(i !== action.payload){
							newSum[i] = g.sum[i];
							boolSum++;
						}
					}
					g.sum = newSum;
					//-----当成员为0，boolSum仍为0，g.bool应该为false
					if(boolSum){
						return Object.assign({},g);
					}
					else{
						g.bool = false;
						return Object.assign({},g);
					}
					
					}
				
			
		default:
			return g;
	}
}
const reducer = combineReducers({
		CARD_DETAIL,
		FROM_SG_DATA,
		TEXT,
		SORT_GAME,
		SEARCH_RUSULT,
		NOW_GOODS,
		CART_SUM,
})



export default reducer;
