import React from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
import Content from '../components/Content';

class Home extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            countries:[],
            //countries min will filtered version of countries
            countriesMin:[],
            current:'',
            searchValue:'',
            navClass:"show"
        }
    }

    toggleNavClass = (condition) => {
        if(condition)
            this.setState({navClass:"hidden"});
        else
            this.setState({navClass:"show"})
    }

    chooseCountry = (country) => {
        this.setState({
            current:country
        })
    }
    
    componentDidMount() {
        window.addEventListener('resize', ()=>{
            this.toggleNavClass(window.innerWidth<=800);
        });
        this.toggleNavClass(window.innerWidth<=800);
        axios.get(`https://api.covid19api.com/countries`)
        .then(results=>{
            this.setState({
                countries:results.data,
                countriesMin:results.data,
                //filters Canada on mount
                current:results.data.filter(object=>object.Country==="Canada")[0]
            })
        })
        .catch(error=>console.log(error));
    }

    //https://stackoverflow.com/questions/7038575/find-element-in-array-using-regex-match-without-iterating-over-array
    //https://stackoverflow.com/questions/7735124/javascript-syntax-for-regex-using-variable-as-pattern
    searchCountries = (e) => {
        this.setState({
            searchValue:e.target.value
        }, () => {
            //https://flaviocopes.com/how-to-uppercase-first-letter-javascript/
            let matcher = new RegExp('^'+this.state.searchValue.charAt(0).toUpperCase() + this.state.searchValue.slice(1), 'g');
            let filteredCountries = this.state.countries.filter(country=>matcher.test(country.Country));
            this.setState({
                countriesMin:filteredCountries
            })
        })
    }

    render(){
        let navProps = {
            countriesMin:this.state.countriesMin,
            chooseCountry:this.chooseCountry,
            searchCountries:this.searchCountries,
            searchValue:this.state.searchValue,
            current:this.state.current,
            navClass:this.state.navClass
        }
        
        return(
            <>
                {this.state.current &&
                    <div className={`wrapper ${this.state.navClass}`}>
                        <Nav {...navProps}/>
                        <Content navClass={this.state.navClass} toggleNavClass={this.toggleNavClass} current={this.state.current}/>
                    </div>
                }
            </>
        )
    }
}

export default Home;