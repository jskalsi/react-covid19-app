import React from "react";
import Chart from "react-google-charts";
import axios from 'axios';

let date = new Date();

class GoogleChart extends React.Component {
  constructor(props){
      super(props);
      
      this.state = {
        day:date.getDate()-1,
        month:date.getMonth()+1,
        data:[
          ["Day", `${this.props.category}`],
          ["1-1", 0]
        ]
      }
  }

  getData = () => {
    axios.get(`https://api.covid19api.com/total/dayone/country/${this.props.current.Slug}`)
    .then(results=>{
      //To filter around 20 values to vizualize
      let filteredData = results.data.filter((result,index)=>(index%Math.ceil(results.data.length/10))===0);
      let tempData = [["Day", `${this.props.category}`],["1-1", 0]];
      filteredData.forEach((dayData)=>{
        let tempDay = dayData["Date"].substring(8,10)+"-"+dayData["Date"].substring(5,7);
        tempData.push([tempDay, dayData[this.props.category]]);
      });
      this.setState({
        data:tempData
      })
    })
    .catch(error=>console.log(error));
  }

  componentDidUpdate(prevProps, prevState) {
    if((prevProps.category !== this.props.category)||(prevProps.current !== this.props.current)){
      this.getData();
    }
  }

  componentDidMount(){
    this.getData();
  }

  render() {
    const options = {
      title: this.props.current.Country,
      legend: { position: "bottom" }
    };

    return (
        <>
          <Chart
            chartType="LineChart"
            width="100%"
            height="100%"
            data={this.state.data}
            options={options}
          />
        </>
    );
  }
}

export default GoogleChart;