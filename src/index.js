import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


/*
1. + сделать активными/неактивными кнопки
2. + кэширование: не загружать данные, если они уже загружены
3. + стили
4.   рефреш - обновление данных для текущей страницы
*/
class Leaderboard extends React.Component {
    constructor() {
        super();
        this.state = {
            currentData: [],
            currentChoice: 'recent'
        }
        this.updateJSON = this.updateJSON.bind(this);
        this.refreshData = this.refreshData.bind(this);

        this.cachedData = {
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

        if (this.cachedData[period].length > 0) {
            this.setState({
                currentData: this.cachedData[period],
                currentChoice: period
            });
        } else {
            fetch(href).then( (response) => {
                return response.json();
            }).then( (data) => {
                this.setState({
                    currentData: data,
                    currentChoice: period
                });
                this.cachedData[period] = data;
            }).catch(function(ex) {
                console.log('parsing failed', ex)
            });
        }
    }

    refreshData(currentChoice) {
        this.cachedData["recent"] = [];
        this.cachedData["alltime"] = [];
        this.updateJSON(currentChoice);
    }

    componentDidMount() {
        this.updateJSON("recent");
    }

    render() {
        return (
            <Table
                updateJSON={this.updateJSON}
                refreshData={this.refreshData}
                currentData={this.state.currentData}
                currentChoice = {this.state.currentChoice}
            />
        );
    }
}

const Table = (props) => {
    let rows = props.currentData.map((person, indexOfPerson) => {
        return <PersonRow
            key = {person.username}
            data = {person}
            number = {indexOfPerson + 1}
            />
    })
    return (
        <div className="container">
            <header>
                <div className="header">Camper Leaderboard</div>
                <button className="refreshButton" onClick={() => {props.refreshData(props.currentChoice)} }>Refresh</button>
            </header>
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Camper Name</th>
                        <th><a href="#" className={props.currentChoice === 'recent' ? 'link active' : 'link'} onClick={() => {props.updateJSON('recent')} }>Points in past 30 days</a></th>
                        <th><a href="#" className={props.currentChoice === 'alltime' ? 'link active' : 'link'} onClick={() => {props.updateJSON('alltime')} }>All time points</a></th>
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
        <td className="user">
            <a href={"https://www.freecodecamp.com/" + props.data.username} className="username"><img src={props.data.img} alt="user avatar"/>{props.data.username}</a>
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
