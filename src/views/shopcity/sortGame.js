import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

//----引入scss
import '@/assets/sortGame.scss'
class SortGame extends Component{
	
	constructor(props){
		super(props);
	}
	componentWillMount(){
		// console.log(this.props.selectList);
		// this.refs[this.props.selectList].className = 'active';
	}
	changeClass(liClass){
			for(let i in this.refs){
				this.refs[i].className='';
			}
			this.refs[liClass].className='active';
		
	}
	componentWillUnmount(){
		//----这个钩子函数用来初始化selectList;
		
		this.props.sendClickMsg1();
	}
	toDetail(ele){
		this.context.router.history.push('/detail?id='+ele.id);
		this.props.toDetail(ele);
	}
	render(){
		
		if(this.props.list.length){

			var items = this.props.list.map((ele)=>{
				return <div key={ele.id} className='sortChild' onClick={this.toDetail.bind(this,ele) }>
							<div className='sortChild_left'>
								<img src={ele.product_image} alt=""/>
							</div>
							<div className='sortChild_right'>
								<h4>{ele.title}</h4>
								<p>￥{ele.sale_price}</p>
							</div>
					</div>
			})
		}
		else{
			var items = null;
		}
		return (
			<div className='sortGame'>
				<ul className='sortList'>
				{//通过在onClick里添加两个回调函数，再结合ref可以使当前元素的类名改变
				}
					<li className='active' onClick={(event)=>{this.props.sendClickMsg1();this.changeClass.call(this,'li_1')}} ref='li_1'>热门促销</li>
					<li onClick={(event)=>{this.props.sendClickMsg2();this.changeClass.call(this,'li_2')}} ref='li_2'>最新推荐</li>
					<li onClick={(event)=>{this.props.sendClickMsg3();this.changeClass.call(this,'li_3')}} ref='li_3'>排行榜</li>
					<li onClick={(event)=>{this.props.sendClickMsg4();this.changeClass.call(this,'li_4')}} ref='li_4'>预售抢先</li>
				</ul>
				<div className='sortChange'>{
					items?items:null
				}</div>
			</div>
			)
	}
}
SortGame.contextTypes = {
		router: React.PropTypes.object.isRequired
	}
//--------只能通过这种方式设置组件的初始Props
SortGame.defaultProps = {
    propsNum:1,
}
//------点击切换的思路:
//	要多设置一个子state，然后这个子state用来保存sortChange的数据，
//	点击li时，触发mapDispatchToProps，不同的li发出不同action，然后组件重新渲染。
const genaction=(num)=>{
	return {
		type:'SORT_GAME',
		payload:num
	}
}
const mapStateToProps = (state)=>{
	// console.log('我是sort，我要重新渲染了。');
	return {
		list:state.SORT_GAME.nowList,
		selectList:state.SORT_GAME.selectList
	}
}

//------只能通过这种笨办法来实现不同的参数传递。
const mapDispatchToProps = (dispatch,props) =>{
	return {
		sendClickMsg1:()=>{ dispatch(genaction(1))},
		sendClickMsg2:()=>{ dispatch(genaction(2))},
		sendClickMsg3:()=>{ dispatch(genaction(3))},
		sendClickMsg4:()=>{ dispatch(genaction(4))},
		toDetail(ele){
			dispatch({
				type:'nowGoods',
				payload:ele
			})
		},
	}
}
const initSortGame = connect(mapStateToProps,mapDispatchToProps)(SortGame);
export default initSortGame;

