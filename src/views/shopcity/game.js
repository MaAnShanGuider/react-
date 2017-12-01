import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import ReactSwipe from 'react-swipe';

//------其他小组件
import SortGame from './sortGame'


//------引入scss文件
import '@/assets/game.scss'


class Game extends Component{
	constructor(props){
		super(props);
	}
	componentWillMount(){
		
	}
	render(){
		if(this.props.imgurl){
			var imgItems = this.props.imgurl.map((ele)=>{
				return <div  className='swiper_div' key={ele.id}><img src={ele.full_pic} alt=""/></div>
			})
		}
		return (
			<div className='game'>
				{imgItems?
					<ReactSwipe className="carousel" swipeOptions={{continuous: true,auto: 2000}}>
					  	{imgItems}            
		            </ReactSwipe>
					
					:null}
					<SortGame></SortGame>
			</div>
			)
	}
}

const Picaction={
	type:'FROM_SG_DATA',
	payload:null
}


//-------下面是mapStateToProps，mapDispatchStateToProps的配置。
const mapStateToProps=(state)=>{
	// console.log(state);
	if(state.FROM_SG_DATA.store){
	return {
		imgurl:state.FROM_SG_DATA.store.promotions
		}
	}
	return{
		imgurl:null
	}
}
const mapDispatchToProps = (dispatch)=>{
	return {
		getimgurl:dispatch(Picaction),
	}
}
const initGame = connect(mapStateToProps,mapDispatchToProps)(Game);
export default initGame;
