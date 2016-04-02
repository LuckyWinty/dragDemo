var React=require('react');
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
		// var dragBox=document.getElementById('form');
        var newState={};
		var event=e||window.event;
		event.preventDefault();
		// var computedStyle=document.defaultView.getComputedStyle(dragBox,null);
		// newState.left=computedStyle.left;
		// newState.top=computedStyle.top;
		newState.currentX=event.clientX;
        newState.currentY=event.clientY;
        newState.flag=true;
        this.props.callbackParent(newState);
	},
	render:function(){
		return (
			<div className="drag" id="drag"  onMouseDown={this.startDrag}>在我身上按住鼠标可以把From拖走！</div>
			);
	}
});

module.exports=DragArea;