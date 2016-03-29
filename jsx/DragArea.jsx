var React=require('react');
// var Drag=require('./DragMixin.jsx');
var addons = require('react-addons');
var ReactDOM=require('react-dom');

var DragArea=React.createClass({
	getInitialState:function(){
		return {
			left: 0,
			top: 0,
			currentX: 0,
			currentY: 0,
			flag: false	
		}
	},
	startDrag:function(e){
		var test=document.getElementById('form');
		test.style.color='red';
		var event=e||window.event;
		event.preventDefault();
		var computedStyle=document.defaultView.getComputedStyle(ReactDOM.findDOMNode(this.refs.dragBox),null);
		this.setState({
			left:computedStyle.left,
			top:computedStyle.top,
			currentX:event.clientX,
			currentY:event.clientY,
			flag:true
		});
		console.log("-----start--------"+this.state.top);
	},
	move:function(event){
        var e = event ? event : window.event;
        if (this.state.flag) {
            var nowX = e.clientX, nowY = e.clientY;
            var disX = nowX - this.state.currentX, disY = nowY - this.state.currentY;
            ReactDOM.findDOMNode(this.refs.dragBox).style.left = parseInt(this.state.left) + disX + "px";
            ReactDOM.findDOMNode(this.refs.dragBox).style.top = parseInt(this.state.top) + disY + "px";
        }
	},
	endStart:function(){
	var computedStyle=document.defaultView.getComputedStyle(ReactDOM.findDOMNode(this.refs.dragBox),null);
          this.setState({
          	left:computedStyle.left,
			top:computedStyle.top,
            flag:false
          });
	},
	render:function(){
		return (
			<div className="drag" id="drag" ref="dragBox" onMouseDown={this.startDrag} onMouseMove={this.move} onMouseUp={this.endStart}>我可以被拖走！</div>
			);
	}
});

module.exports=DragArea;