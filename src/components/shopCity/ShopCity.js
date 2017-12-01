import React,{ Component } from 'react'
import ReactDOM from 'react-dom'

//---引进其他组件
import DetailHead from '@/views/shopcity/detailhead'
import '@/assets/shopcity.scss'

class ShopCity extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (

			<div className='shopcity'>
				<DetailHead></DetailHead>
				{this.props.children}
			</div>
			)
	}
}

export default ShopCity;