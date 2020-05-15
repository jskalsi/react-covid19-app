import React from 'react';

class Nav extends React.Component{
    render(){
        return(
            <nav className={`sideNav ${this.props.navClass}`}>
                <h2>COVID-19 Tracker</h2>
                <form onSubmit={(e)=>e.preventDefault()}>
                    <input type="text" value={this.props.searchValue} onChange={this.props.searchCountries} placeholder="Search country"/>
                </form>
                <ul>
        {this.props.countriesMin.map(country=>country.Country===this.props.current.Country
            ?<li key={country.Country}><button className="active" onClick={()=>this.props.chooseCountry(country)}>{country.Country}</button></li>:
            <li key={country.Country}><button className="inactive" onClick={()=>this.props.chooseCountry(country)}>{country.Country}</button></li>)}
				</ul>
            </nav>
        )
    }
}

export default Nav;