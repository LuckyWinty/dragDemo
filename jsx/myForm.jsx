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
    console.log("move------------"+this.state.currentX)
    var e = event ? event : window.event;
    if (this.state.flag) {

        console.log("yy------------"+this.state.currentY)
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
    <form className="form-horizontal" id="form"  ref="dragBox" onSubmit={this.submitHandler} onMouseMove={this.move} onMouseUp={this.endStart}>
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