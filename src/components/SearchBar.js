import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Header, Icon } from 'semantic-ui-react'
import { countries } from './dropdown'
import { connect } from 'react-redux'
import { setCountry } from '../redux/actions'

class SearchBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false, 
            results: [], 
            value: '',
            filtered: [],
            selected: ''
        }
    }

    display = country => {
        return (
            <div>
                <i className={country.flag + " flag"} ></i>
                {country.text}
                
            </div>
        )
    }

    handleResultSelect = (e, { result }) => {
        this.props.setCountry(result.value)
        this.setState({ 
            value: '', 
            selected: '', 
            filtered: [],
        })
    } 

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
        if (this.state.value.length < 1) return this.setState({isLoading: false, results: [], value: ''})

        const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
        const isMatch = result => re.test(result.text)

        this.setState({
            isLoading: false,
            results: _.filter(countries, isMatch),
        })
        }, 300)
    }

    render() {

        const { isLoading, value, results } = this.state

        return (
            <div>
                <br></br><br></br>
                <Grid style={{"background-color": "#2C8EA7"}}><br></br>
                    <Grid.Column width={15}>
                        <Grid.Row></Grid.Row>
                            <Header icon>
                                <Icon inverted name='search' />
                            </Header>
                            <br></br>
                            <h2 style={{'color': 'white'}}>Search users by destination</h2>
                            <br></br>
                            <Search
                            fluid
                            placeholder='Country'
                            loading={isLoading}
                            onResultSelect={this.handleResultSelect}
                            onSearchChange={_.debounce(this.handleSearchChange, 500, {
                                leading: true,
                            })}
                            results={results}
                            resultRenderer={this.display}
                            value={value}
                            />
                            <br></br>
                    </Grid.Column>
                <Grid.Column width={1}>
            </Grid.Column>
        </Grid>
        <br></br><br></br>
        </div>
            
        )
    }
}

const mapSTP = state => {
    return {allUsers: state.users}
}

const mapDTP = dispatch => {
    return {
        setCountry: country => dispatch(setCountry(country) )
    }
}

export default connect(mapSTP, mapDTP)(SearchBar)
