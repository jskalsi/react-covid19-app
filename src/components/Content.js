import React from 'react';
import GoogleChart from './GoogleChart';

class Content extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            category:'Confirmed',
            buttonClasses:['active','','']
        }
    }

    render(){
        return(
            <div className={`content ${this.props.navClass}`}>
                <button onClick={()=>this.props.toggleNavClass(this.props.navClass==="show")}><i className="fa fa-bars"></i></button>
                <nav className="topNav">
                    <button className={this.state.buttonClasses[0]} onClick={()=>{this.setState({category:"Confirmed", buttonClasses:['active','','']})}}>Confirmed</button>
                    <button className={this.state.buttonClasses[1]} onClick={()=>{this.setState({category:"Recovered", buttonClasses:['','active','']})}}>Recovered</button>
                    <button className={this.state.buttonClasses[2]} onClick={()=>{this.setState({category:"Deaths", buttonClasses:['','','active']})}}>Deaths</button>
                </nav>
                <div className="chart">
                    <GoogleChart category={this.state.category} current={this.props.current}/>
                </div>
            </div>
        )
    }
}

export default Content;