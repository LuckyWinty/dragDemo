var React=require('React');

window.getCss=function(obj,attr){
	if(obj){
	return obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj,false)[attr];
    }else{
    	alert('obj is null');
    }
};

var Drag={
	startDrag:function(e){
		var that=this;
		var newState={};
		if (getCss(e.target, "left") !== "auto") {
			newState.left =getCss(e.target, "left");
		};
		if (getCss(e.target, "top") !== "auto") {
			newState.top =getCss(e.target, "top");
		};
		newState.flag=true;
		var event=e||window.event;
		event.preventDefault();
		e.target.onselectstart=function(){
			return false;
		}
		newState.currentX=event.clientX;
		newState.currentY=event.clientY;

		console.log("startDrag--------"+newState.currentX);
		return function(event){
			that.setState(newState);
		}
	document.onmousemove=function(){
		console.log(this.state.currentX);
		var that=this;
		var newState={};
		var e = event||window.event;
		if (this.state.flag) {
			var nowX = e.clientX, nowY = e.clientY;
			var disX = nowX - this.state.currentX, disY = nowY - this.state.currentY;
			e.target.style.left = parseInt(this.state.left) + disX + "px";
			e.target.style.top = parseInt(this.state.top) + disY + "px";
		}
	};
	document.onmouseup=function(e){
		console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^"+this.state.currentX);
		var that=this;
		var newState={};
		newState.flag=false;
		if (getCss(e.target, "left") !== "auto") {
			newState.left = getCss(e.target, "left");
		}
		if (getCss(e.target, "top") !== "auto") {
			newState.top = getCss(e.target, "top");
		}
		console.log("endDrag--------"+newState.left);
		return function(event){
			that.setState(newState);
		}
	}
}
module.exports=Drag;