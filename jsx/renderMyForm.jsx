var React=require('react');
var addons = require('react-addons');
var ReactDOM=require('react-dom');
var MyForm=require('./myForm.jsx');

ReactDOM.render(
  <MyForm></MyForm>,
  document.getElementById('box')
);
Perf =addons.Perf;
