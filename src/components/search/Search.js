import React , { Component } from 'react'
import ReactDOM from 'react-dom'


//---引入scss文件
//


//----引入子组件
import SearchHead from '@/views/search/search_head'
import SearchMain from '@/views/search/search_main'
class Search extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div>
				<SearchHead></SearchHead>
				{this.props.children}
			</div>
			)
	}
}

export default Search;