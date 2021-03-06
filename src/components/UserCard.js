import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, Image, Button } from 'semantic-ui-react'
import placeholder from '../photos/profilePicPlaceholder.png'
import { selectedUser } from '../redux/actions'

const UserCard = (props) => {

    // debugger
    // let window = window.location.href

    // let user = props.user ? props.user : window.location.href

    let currentYear =  new Date().getFullYear()
    let yob = props.user.yob ? parseInt(props.user.yob) : 1990
    let age = currentYear - yob
    let ageless = 'Ageless'

    let profilePicUrl = `http://localhost:4000/${props.user.profile_pic_url}`

    return (
        <Card link style={{marginBottom: 25, padding: 10, backgroundColor: '#eeeeee'}}>
            <Card.Content>
                <div>
                <Image src={props.user.profile_pic_url ? profilePicUrl : placeholder} href={`/users/${props.user.sub}`}/>
                </div>
                <div>
                <h3>{props.user.first_name}  {props.user.last_name}</h3>
                <h3>{props.user.occupation ? props.user.occupation : 'Adventurer'}, {yob ? age : ageless}</h3>
                <h3>{props.user.city}, {props.user.country}</h3>
                {/* <Button className='ui button'>
                    <Link to={`/users/${props.user.sub}`} style={{'font-size': '20px', 'backgroundColor': 'white'}}>Full profile</Link>
                </Button> */}
                </div>
            </Card.Content>
        </Card>
    ) 
}

const mapDTP = dispatch => {
    return {selectedUser: user => dispatch(selectedUser(user))}
}

export default connect(null, mapDTP)(UserCard)




