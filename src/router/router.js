import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {BrowserRouter,HashRouter,Link,NavLink,Route,Switch,Redirect} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../redux/store'
import App from '../App'

//------导入所有的路由大组件
import ShopCity from '../components/shopCity/ShopCity'
import HotNews from '../components/hotNews/HotNews'
import Club from '../components/club/Club'
import Card from '../components/card/Card'
import Mine from '../components/mine/Mine'
import Detail from '../components/detail/detail'
import Search from '../components/search/Search'

//---------导入所有的路由小组件
import Game from '@/views/shopcity/game'
import Peripheral from '@/views/shopcity/peripheral'
import SearchMain from '@/views/search/search_main'



class MyRouter extends Component{
	constructor(props){
		super(props);
	}
	componentWillMount(){
		let nowTime = new Date().getTime();
		axios('/api/store.json?_='+nowTime)
			.then(res=>{
				store.dispatch({
					type:'FROM_SG_DATA',
					payload:res.data
				})
				console.log(store.getState());
			});

	}
	render(){
		return (
			<div>
			<Provider store = { store }>
				<HashRouter >
					<App>
						<Switch>
							<Route path='/index' render={()=>(
								<ShopCity>
									<Switch>
										<Route path='/index/game' component={Game}></Route>
										<Route path='/index/peripheral' component={Peripheral}></Route>
										<Redirect from='/index' to='/index/game' ></Redirect>
									</Switch>
								</ShopCity>
								)}></Route>
							<Route path='/hotnews' component={HotNews}></Route>
							<Route path='/club' component={Club}></Route>
							<Route path='/card' component={Card}></Route>
							<Route path='/mine' component={Mine}></Route>
							<Route path='/detail' component={Detail}></Route>
							<Route path='/search' render={()=>(
								<Search>
									<Switch>
										<Route Path='/search/:target' component={SearchMain}></Route>
									</Switch>
								</Search>
								)}></Route>
							<Redirect from='*' to='/index/game' ></Redirect>
						</Switch>
					</App>
				</HashRouter>
				</Provider>

			</div>

			)
	}
}

export default MyRouter;

