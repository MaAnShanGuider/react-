import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import { NavLink } from 'react-router-dom'
import '@/assets/app.scss'
import '@/assets/font/font_c0dpztxi87z7u8fr/iconfont.css'

class App extends Component{
	constructor(props){
		super(props);

	}
	render(){
		return (
			<div className='app'>
				{this.props.children}
				<div className='footer'>
					<NavLink to='/index/:aa'><i className="iconfont icon-icon-36"></i><span>商城</span></NavLink>
					<NavLink to='/hotnews'><i className="iconfont icon-icon-4"></i><span>头条</span></NavLink>
					<NavLink to='/club'><i className="iconfont icon-icon-22"></i><span>论坛</span></NavLink>
					<NavLink to='/card'><i className="iconfont icon-icon-35"></i><span>购物车</span></NavLink>
					<NavLink to='/mine'><i className="iconfont icon-icon-20"></i><span>我的</span></NavLink>
				</div>
				
			</div>
			)
	}
}

export default App;