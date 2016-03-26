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
        checked: true
    }; 
},
handleChange:function(event){
    console.log(event.target.name);
    var newState={};
    var name=event.target.name;
    newState[name]=name=="checkbox"?event.target.checked:event.target.value;
    this.setState(newState);
},
submitHandler: function (event) {
    event.preventDefault();
    console.log(this.state); 
},
render:function(){
   return (
    <form className="form-horizontal" id="form" onSubmit={this.submitHandler}>
    <DragArea/>
    <div id="form-wrap">
    <MyInput name="username" labelId={"userId"} labelTip={"用户名"} type={"text"} placeholder={"请输入用户名"} value={this.state.username} onChange={this.handleChange}/>
    <MyInput name="password" labelId={"pw"} labelTip={"密码"} type={"password"} placeholder={"请输入密码"} value={this.state.password} onChange={this.handleChange}/>
    <div className="form-group">
    <div className="col-sm-offset-2 col-sm-10">
      <div className="checkbox">
        <label>
          <input name="checkbox" type="checkbox" checked={this.state.checked} onChange={this.handleChange} /> 记住我
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