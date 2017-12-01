import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { connect } from 'react-redux'

//---引入scss文件
import '@/assets/search/search_main.scss'


class SearchMain extends Component{
	constructor(props){
		super(props);
	}
	componentWillMount(){
		
	}
	//-----被销毁的时候，发出另个action，让doneGet为false
	componentWillUnmount(){
		this.props.destroy();
	}
	changeWeb(ele){
		//------跳转到当前id的detail页面
		this.context.router.history.push('/detail?id='+ele.id);
		//------将这个ele传给store
		this.props.toDetail(ele);
	}
	//------改变页数
	changePage(value){
		axios.get(`/api/store/search.json?q=${this.props.searchText}&ver=2&page=${value}&_=1512031336504`)
			.then(res=>{
				this.props.sendSearch(res.data);
			})
	}
	render(){
		if(this.props.searchData.doneGet ){
			let self = this;
			//-----每个小得结果页
			const listItems = this.props.searchData.games.map((ele)=>{
				return  <div key={ele.id} className='mainChild' onClick={()=>self.changeWeb(ele)}>
							 <img src={ele.product_image} className='mainChild_left' alt=""/>
							 <div className='mainChild_right'>
							 	<h4>{ele.title}</h4>
							 	<p>￥{ele.sale_price}</p>
							 </div>
						</div>
			})
			//---按钮
			let btnItems = [];
			let btnNum = Math.ceil(this.props.searchData.meta.total/20);
			for(let i = 1;i<=btnNum;i++ ){
				btnItems.push(<button onClick={()=>{self.changePage(i)}} key={i}>{i}</button>);
			}

			return <div className='search_main'>
				<div className='search_total'>共有<span>{this.props.searchData.meta.total}</span>个搜索结果</div>
					{listItems}
					<div className='pagesCon'>{btnItems}</div>
			</div>
		}
		{
		return (
			<div className='search_main'>
				请输入你要找的游戏，回车后开始搜索。
			</div>
			)
		}
	}
}

SearchMain.contextTypes = {
    router: React.PropTypes.object.isRequired
}
const genaction = function(type,data){
	return {
		type:type,
		payload:data
	}
} 

const mapStateToProps = (state) =>{
	return {
		searchData:state.SEARCH_RUSULT,
		searchText:state.TEXT
	}
}
const mapDispatchToProps = (dispatch)=>{
	return {
		//-------改变页数
		sendSearch(data){
			dispatch(genaction('startSearch',data));
		},
		//-------去别的页面时，需要再重新搜索。
		destroy(){
			dispatch(genaction('endSearch',null))
		},
		//-----将信息发送到详情页的reducer中
		toDetail(ele){
			dispatch(genaction('nowGoods',ele))
		},
	}
}


const initSearchMain = connect(mapStateToProps,mapDispatchToProps)(SearchMain);
export default initSearchMain;