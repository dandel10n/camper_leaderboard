import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


/*
1. + сделать активными/неактивными кнопки
2.   кэширование: не загружать данные, если они уже загружены
3.   стили
4.   рефреш - обновление данных для текущей страницы
*/
class Leaderboard extends React.Component {
	constructor() {
    	super();
    	this.state = {
			JSON: [],
			sort: 'recent'
    	}
    	this.updateJSON = this.updateJSON.bind(this);

		this.data = {
			recent: [],
			alltime: []
		}
	}

	links = {
		recent: "https://fcctop100.herokuapp.com/api/fccusers/top/recent",
		alltime: "https://fcctop100.herokuapp.com/api/fccusers/top/alltime"
	}

    updateJSON(period) {
        var href = this.links[period];

        if (this.data[period].length > 0) {
			this.setState({
				JSON: this.data[period],
				sort: period
			});
        } else {
	        fetch(href).then( (response) => {
				return response.json();
			}).then( (data) => {
				this.setState({
					JSON: data,
					sort: period
				});
				this.data[period] = data;
			}).catch(function(ex) {
				console.log('parsing failed', ex)
			});
		}
    }

    componentDidMount() {
		this.updateJSON("recent");
    }

    render() {
        return (
            <Table updateJSON={this.updateJSON} currentState={this.state} />
        );
    }
}

const Table = (props) => {
	let rows = props.currentState.JSON.map((person, indexOfPerson) => {
		return <PersonRow
			key = {person.username}
			data = {person}
			number = {indexOfPerson + 1}
			/>
    })
	return (
		<div className="container">
			<header>Camper Leaderboard</header>
			<table>
				<thead>
					<tr>
						<th>№</th>
						<th>Camper Name</th>
						<th><a href="#" className={props.currentState.sort === 'recent' ? 'link active' : 'link'} onClick={() => {props.updateJSON('recent')} }>Points in past 30 days</a></th>
						<th><a href="#" className={props.currentState.sort === 'alltime' ? 'link active' : 'link'} onClick={() => {props.updateJSON('alltime')} }>All time points</a></th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		</div>
	)
}

const PersonRow = (props) => {
  return (
	<tr>
		<td className="userNumber">
			{props.number}
		</td>
		<td className="username">
			<a href={"https://www.freecodecamp.com/" + props.data.username}><img src={props.data.img} alt="user avatar"/>{props.data.username}</a>
		</td>
		<td className="userdata">
			{ props.data.recent }
		</td>
		<td className="userdata">
			{ props.data.alltime }
		</td>
    </tr>
  );
}

ReactDOM.render(
  	<Leaderboard />,
  	document.getElementById('root')
);
