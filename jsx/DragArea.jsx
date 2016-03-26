var React=require('react');

var DragArea=React.createClass({
	drag:function(event){
		var instance={};

        instance.dragElementStartLeftX=event.clientX;  //被拖动元素开始距离左边的距离
        instance.dragElementStartTopY=event.clientY;   //被拖动元素开始距离上边的距离

        
        

    }
    render:function(){
    	return (
    		<div className="drag" id="drag" onMouseDown={this.drag}></div>
    		);
    }
});

module.exports=DragArea;