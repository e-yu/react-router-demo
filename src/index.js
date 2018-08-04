import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import "./main.css";

//头部组件
class Headers extends React.Component{
  arrClass = [{logo:"nav-logo-a",font:"link-a"},{logo:"nav-logo-b",font:"link-b"}]
  render(){
    let styleObj = this.props.isRoot ? this.arrClass[0] : this.arrClass[1];
    return (
      
      <header class = "nav">
        <Link to = "/" class = "nav-brand">
          <div className = {styleObj.logo}></div>
        </Link>
        <ul class = "nav-right">
          <li>
            <Link to = "/docs" className = {styleObj.font}>文档</Link>
          </li>
          <li>
            <Link to = "/journals" className = {styleObj.font}>每日总结</Link>
          </li>
        </ul>
      </header>
      
    );
  }
}

//主页组件
class Home extends React.Component{
  
  render(){
    this.props.handleBack(this.props.url);
    
    return (
      <div className = "home">
        <p>欢迎来到研发中心培训网站</p>
        <div className = "home-button">
          <Link to = "/docs" className = "home-button">文档</Link>
        </div>
        <div className = "home-button">
          <Link to = "/journals">日报</Link>
        </div>
      </div>
    );
  }
}

//Container组件
class Container extends React.Component{
  render(){
    
    return (
      <div className = "right">
        <h1>{this.props.match.params.name}</h1>
      </div>
    );
  }
}

//docs组件
class Documents extends React.Component{
  render(){
    this.props.handleBack(this.props.url);
    return (
      <div class = "docs">
        <div className = "left">
          <Link to = {`${this.props.url}/coding_standards`}>编码规范</Link>
          <ul>
            <li>
              <Link to = {`${this.props.url}/sql_standards`}>SQL规范</Link>
            </li>
            <li>
              <Link to = {`${this.props.url}/javabase_standards`}>Java基础开发规范</Link>
            </li>
            <li>
              <Link to = {`${this.props.url}/javebackend_standards`}>Java后端服务开发规范</Link>
            </li>
            <li>
              <Link to = {`${this.props.url}/restapi_standards`}>Rest api规范</Link>
            </li>
            <li>
              <Link to = {`${this.props.url}/frontend_standards`}>前端服务开发规范</Link>
            </li>
            <li>
              <Link to = {`${this.props.url}/git_standards`}>Git提交规范</Link>
            </li>
            <li>
              <Link to = {`${this.props.url}/gitlab_standards`}>Gitlab CI规范</Link>
            </li>
          </ul>
        </div>
        <Route exact path = {`${this.props.url}/:name`} component = {Container}></Route>
        
      </div>
    );
  }
}

//journals组件
class Journals extends React.Component{
  render(){
    this.props.handleBack(this.props.url);
    return (
      <div class = "journals">
        <div className = "left">
          <ul>
            <li>
              <Link to = {`${this.props.url}/backend`}>后端</Link>
            </li>
            <li>
              <Link to = {`${this.props.url}/front-end`}>前端</Link>
            </li>
            <li>
              <Link to = {`${this.props.url}/mobile`}>移动中心</Link>
            </li>
            <li>
              <Link to = {`${this.props.url}/pre-backend`}>提前批</Link>
            </li>
            <li>
              <Link to = {`${this.props.url}/rongjing`}>融晶</Link>
            </li>
            <li>
              <Link to = {`${this.props.url}/test`}>测试中心</Link>
            </li>
          </ul>
        </div>
        <Route exact path = {`${this.props.url}/:name`} component = {Container}></Route>
        
      </div>
    );
  }
}

class Content extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isRoot:false
    }
  }

  handleBack = () => (path) =>{
    if((/^\/$/).test(path)){
      if(!this.state.isRoot){
        
        this.setState({isRoot:true});
      }
    } 
    else{
      if(this.state.isRoot)
        this.setState({isRoot:false});
    }
      
  }

  render(){
    return (
      <Router>
        <div>
          <Headers isRoot = {this.state.isRoot}/>
          <Route exact path = "/" component = {()=><Home handleBack = {this.handleBack()} url = "/" /> }></Route>
          <Route path = "/docs" component = {() => <Documents handleBack = {this.handleBack()} url = "/docs"/>} ></Route>
          <Route path = "/journals" component = {() => <Journals handleBack = {this.handleBack()} url = "/journals"/>} ></Route>
        </div>
      </Router>
    );
  }
}

ReactDom.render(
    <Content/>, document.getElementById('App'));