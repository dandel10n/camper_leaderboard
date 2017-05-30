import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Leaderboard extends React.Component {
	constructor() {
    	super();
    	this.state = {
			JSON: []
    	}
    	this.updateJSON = this.updateJSON.bind(this);
	}

	links = {
		recent: "https://fcctop100.herokuapp.com/api/fccusers/top/recent",
		alltime: "https://fcctop100.herokuapp.com/api/fccusers/top/alltime"
	}

    updateJSON(period) {
        var href = this.links[period];
        fetch(href).then( (response) => {
                return response.json();
                }).then( (data) => {
	                this.setState({
	                    JSON: data
	                });
                }).catch(function(ex) {
    			console.log('parsing failed', ex)
        });
    }

    componentDidMount() {
		this.updateJSON("recent");
    }

    render() {
        return (
            <Table updateJSON={this.updateJSON} currentJSON={this.state.JSON} />
        );
    }
}

const Table = (props) => {
	let rows = props.currentJSON.map((person, indexOfPerson) => {
		return <PersonRow 
			key = {person.username}
			data = {person}
			number = {indexOfPerson + 1}
			/>
    })
	return (
		<table>
			<thead>
				<tr>
					<th>№</th>
					<th>Camper Name</th>
					<th><a href="#" className="link" onClick={() => {props.updateJSON('recent')} }>Points in past 30 days</a></th>
					<th><a href="#" className="link" onClick={() => {props.updateJSON('alltime')} }>All time points</a></th>
				</tr>
			</thead>
  			<tbody> 
  				{rows} 
  			</tbody>
		</table>
	)
}

const PersonRow = (props) => {
  return (
	<tr>
		<td>
			{props.number}
		</td>
		<td>
			<a href={"https://www.freecodecamp.com/" + props.data.username}><img src={props.data.img} />{props.data.username}</a>
		</td>
		<td>
			{ props.data.recent }
		</td>
		<td>
			{ props.data.alltime }
		</td>
    </tr>
  );
}

ReactDOM.render(
  	<Leaderboard />,
  	document.getElementById('root')
);