import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import '@/assets/cart/cart_main.scss'
class Card extends Component{
	constructor(props){
		super(props);
	}

	render(){
		// console.log('我是card，我渲染了。');
		if(this.props.cartSum.bool){
			//---cartViews：cartSum的sum整个对象，包含了所有的加入购物车的商品
			let cartViews = this.props.cartSum.sum;
			//----jsxViews：空对象，用来将cartViews遍历出的结果加入进来，并且一次性加入main
			let jsxViews = [];
			//------总价
			let sumPrice = 0;

			for(let i in cartViews){
				// console.log(i);
				let jsxCom = (<div key={i} className='cartChild' >
							 <img src={cartViews[i].product_image} className='cartChild_left' alt=""/>
							 <div className='cartChild_right'>
							 	<h4>{cartViews[i].title}</h4>
							 	{
							 		/*
							 		给下面两个按钮添加不同的按钮，发出不同的action，用来改变sum
							 		 */
							 	}
							 	<div>数量:<button onClick={()=>{this.props.del(i)}}>-</button><span>{cartViews[i].num}</span><button onClick={()=>{this.props.add(i)}}>+</button></div>
							 	<p>价格:￥{cartViews[i].sale_price*cartViews[i].num}</p>
							 </div>
						</div>)
				sumPrice+=(cartViews[i].sale_price*cartViews[i].num);
				jsxViews.push(jsxCom);
				
			}
		
			let jsxSum = (<div className='sumPrice'>总价:￥{sumPrice}</div>);
		
			return <div className='cart'>
				<div className='cart_head'>购物车</div>
					<div>{jsxViews}</div>
					{jsxSum}
			</div>
		}
		
		return (
			<div>我是Card</div>
			)
	}
}

const mapStateToProps = (state)=>{
		// console.log('重新获得cartsum');
	return {
		cartSum:state.CART_SUM,
	}
}

//--建立dispatch映射

const mapDispatchToProps = (dispatch)=>{
	return {
		add(i){
			// console.log('执行我');
			dispatch({
				type:'sumAdd',
				payload:i
			})
		},
		del(i){
			dispatch({
				type:'sumDel',
				payload:i
			})
		},
	}
}
const initCard = connect(mapStateToProps,mapDispatchToProps)(Card);
export default initCard;