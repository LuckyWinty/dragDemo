var React=require('react');
var addons = require('react-addons');
var ReactDOM=require('react-dom');
var MyInput=require('./myInput.jsx');
var MyButton=require('./Button.jsx');
var DragArea=require('./DragArea.jsx');

var MyFrom=React.createClass({

  getInitialState: function () {
    return {
        username:"",
        password:"",
        checked: true,
        left: 0,
        top: 0,
        currentX: 0,
        currentY: 0,
        flag: false
    }; 
},
onChildChanged:function(newState){
    /*以下为修改处*/
    var computedStyle=document.defaultView.getComputedStyle(ReactDOM.findDOMNode(this.refs.dragBox),null);
    newState.left=computedStyle.left;
    newState.top=computedStyle.top;
    /*以上为修改处*/
    this.setState(newState);
},
handleChange:function(event){
    var newState={};
    var name=event.target.name;
    newState[name]=name=="checked"? event.target.checked:event.target.value;
    this.setState(newState);
},
submitHandler: function (event) {
    event.preventDefault();
    console.log(this.state); 
},
move:function(event){
    var e = event ? event : window.event;
    var dBox=ReactDOM.findDOMNode(this.refs.dragBox);
    if (this.state.flag) {
        var nowX = e.clientX, nowY = e.clientY;
        var disX = nowX - this.state.currentX, disY = nowY - this.state.currentY;
        /*增加拖拽范围检测*/
        var currentLeft=parseInt(this.state.left) + disX;
        var currentTop=parseInt(this.state.top) + disY;
        var docX=document.documentElement.clientWidth||document.body.clientWidth;
        var docY=document.documentElement.clientHeight||document.body.clientHeight;
        if(currentLeft<=250){//检测屏幕左边，因为我这里的初始居中是利用了负1/2的盒子宽度，所以用250px判断边界
            dBox.style.left=250+"px";
        }else if(currentLeft>=(docX-dBox.offsetWidth+250)){
            dBox.style.left=(docX-this.state.offsetX)+"px";
        }else{
            dBox.style.left =currentLeft+ "px";
        }
        if(currentTop<=200){ //检测屏幕上边，因为我这里的初始居中是利用了负1/2的盒子高度，所以用200px判断边界
            dBox.style.top=200+"px";
        }else if(currentTop>=(docY-dBox.offsetHeight+200)){
            dBox.style.top=(docY-this.state.offsetY)+"px";
        }else{
            dBox.style.top = currentTop + "px";
        }
    }
},
endDrag:function(){
    var computedStyle=document.defaultView.getComputedStyle(ReactDOM.findDOMNode(this.refs.dragBox),null);
    this.setState({
        left:computedStyle.left,
        top:computedStyle.top,
        flag:false
    });
},
/*
组件被装载后才会被调用，也就是说调用这个方法的时候，
组件已经被渲染到了页面上，
这个时候可以修改DOM。
此时把相应的docume事件绑定到上面
*/
componentDidMount:function(){
  document.addEventListener('mousemove',(e)=>{this.move(e);},false);/*ES6新特性，箭头函数，需要依赖jsx编译工具才能正确运行*/
  document.addEventListener('mouseup',(e)=>{this.endDrag(e);},false);
},
render:function(){
   return (
    <form className="form-horizontal" id="form"  ref="dragBox" onSubmit={this.submitHandler}>
    <DragArea callbackParent={this.onChildChanged} />
    <div id="form-wrap">
    <MyInput name="username" labelId={"userId"} labelTip={"用户名"} type={"text"} placeholder={"请输入用户名"} value={this.state.username} onChange={this.handleChange}/>
    <MyInput name="password" labelId={"pw"} labelTip={"密码"} type={"password"} placeholder={"请输入密码"} value={this.state.password} onChange={this.handleChange}/>
    <div className="form-group">
    <div className="col-sm-offset-2 col-sm-10">
    <div className="checkbox">
    <label>
    <input name="checked" type="checkbox" checked={this.state.checked} onChange={this.handleChange} /> 记住我
    </label>
    </div>
    </div>
    </div>   
    <MyButton type={"submit"} ButtonTip={"登陆"}/>
    </div>
    </form>
    );
}
});
module.exports=MyFrom;