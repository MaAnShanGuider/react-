import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router';
import { HashRouter,Route,Switch,NavLink, } from 'react-router-dom'

import '@/assets/detailhead.scss'
import '@/assets/font/font_c0dpztxi87z7u8fr/iconfont.css'

class DetailHead extends Component{
	constructor(props){
		super(props);
	}
	toSearch(){	
		this.context.router.history.push('/search');		
	}
	render(){
		return (
			<div className='detailhead'>
				<i className="iconfont icon-icon-24"></i>
				<div className='detailhead_middle'>
					<NavLink to='/index/game'>游戏</NavLink>
					<NavLink to='/index/peripheral'>周边</NavLink>
				</div>
				<i className="iconfont icon-icon-2" onClick={this.toSearch.bind(this)}></i>
			</div>
			)
	}
}
DetailHead.contextTypes = {
    router: React.PropTypes.object.isRequired
}
export default DetailHead;