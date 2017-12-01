import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { connect } from 'react-redux'

//---引入scss文件
import '@/assets/search/search_head.scss'
import '@/assets/font/font_c0dpztxi87z7u8fr/iconfont.css'

class SearchHead extends Component{
	constructor(props){
		super(props);
	}
	back(){
		this.context.router.history.push('/index');	
	}
	enterEvent(e){
		
		if(e.keyCode == 13){
			console.log('发送搜索请求');
			axios.get(`/api/store/search.json?q=${this.refs.myInput.value}&ver=2&page=1&_=${new Date().getTime()}`)
				.then(res=>{
					console.log('发送数据到store');
					this.props.sendSearch(res.data);
					this.props.sendText(this.refs.myInput.value);
					this.context.router.history.push('/search/'+this.refs.myInput.value);
				})
		}
	}
	render(){
		return (
			<div className='search_head'>
			<i className="iconfont icon-icon-8" onClick={this.back.bind(this)}></i>
				<input type="text" placeholder='搜游戏' className='search_head_input' ref='myInput' onKeyDown={this.enterEvent.bind(this)}/>
			<i className="iconfont icon-icon-24"></i>
			</div>
			)
	}
}

SearchHead.contextTypes = {
    router: React.PropTypes.object.isRequired
}
const genaction = function(data){
	return {
		type:'startSearch',
		payload:data
	}
} 

const mapDispatchToProps = (dispatch)=>{
	return {
		sendSearch(data){
			dispatch(genaction(data));
		},
		sendText(str){
			dispatch({
				type:'sendText',
				payload:str
			})
		}
	}
}


const initSearchHead = connect(null,mapDispatchToProps)(SearchHead);
export default initSearchHead;