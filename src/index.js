import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Leaderboard extends React.Component {
	constructor() {
    	super();
    	this.state = {
      		data: [{
      			"username":"diomed",
				"img":"https://avatars3.githubusercontent.com/u/72777?v=3",
				"alltime":4339,
				"recent":529,
				"lastUpdate":"2017-05-28T17:18:21.890Z"
			},
			{
				"username":"sjames1958gm",
				"img":"https://avatars.githubusercontent.com/u/4639625?v=3",
				"alltime":7186,
				"recent":516,
				"lastUpdate":"2017-05-28T17:18:02.664Z"
			},
			{
				"username":"anthonygallina1",
				"img":"https://avatars.githubusercontent.com/u/11003055?v=3",
				"alltime":4721,
				"recent":508,
				"lastUpdate":"2017-05-28T05:24:41.130Z"
			}]
      	};
    };
	render(){
		return(
			<Table data = {this.state.data} />
		)
	}
}

const Table = (props) => {
	let rows = props.data.map((person, indexOfPerson) => {
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
					<th>Points in past 30 days</th>
					<th>All time points</th>
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
			{ props.data.username }
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