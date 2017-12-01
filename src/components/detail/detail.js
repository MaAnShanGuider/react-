import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import '@/assets/detail/detail.scss'
class Detail extends Component{
	constructor(props){
		super(props);
	}
	toCartPage(){
		console.log('加入购物车');
		let ele = {
			product_image:this.props.myEle.product_image,
			sale_price:this.props.myEle.sale_price,
			title:this.props.myEle.title,
			id:this.props.myEle.id,
			num:1,
		}
		this.props.toCart(ele);
	}
	render(){
		//------根据reducers里的nowGoods来判断
		if(!this.props.myEle){
			return (
					<div>正在载入</div>
				)
		}
		else{
			const ele = this.props.myEle;
			return (
						<div className='detail'>
							<img src={ele.product_image} alt=""/>
							<h4>{ele.title}</h4>
							<p>售价<span>￥{ele.sale_price}</span></p>
							<button onClick={()=>{this.toCartPage()}}>放入购物车</button>
						</div>
					)
		}
		
	}
}

const genaction = (ele)=>{
	return{
		type:'submit',
		payload:ele
	}
}
const mapStateToProps =(state)=>{
	return {
		//------获取来自reducer的NOW_GOODS值
		myEle:state.NOW_GOODS
	}
}
const mapDispatchToProps = (dispatch)=>{
	return {
		toCart(ele){
			dispatch(genaction(ele))
		}
	}
}


const initDetail = connect(mapStateToProps,mapDispatchToProps)(Detail);

export default initDetail;