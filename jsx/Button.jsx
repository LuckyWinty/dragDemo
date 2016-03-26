var React=require('react');

var Button=React.createClass({

	render:function(){
		return (
			<button type={this.props.type} className="loginButton">{this.props.ButtonTip}</button>
		);
	}
})
module.exports=Button;