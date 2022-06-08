import logo from './logo.svg';
import React from 'react';
import './App.css';
import { useRef, useState } from 'react';
import ListTeams from './components/ListTeams';
import { Bracket, RoundProps} from 'react-brackets'
import {View, StyleSheet, Button, Alert} from 'react-native';

function App() {
  const[teams, setTeams] = useState([])
  const[team, setTeam] = useState()
  const[matches, setMatches] = useState([])
  const[start, setStart] = useState(false)
  const[firstTeam, setFirstTeam] = useState()
  const[secondTeam, setSecondTeam] = useState()
  const[currentMatch, setCurrentMatch] = useState()
  const[firstFinalist, setFirstFinalist] = useState("")
  const[secondFinalist, setSecondFinalist] = useState("")
  const[final, setFinal] = useState(false)
  const[finalists, setFinalists] = useState([])
  const[quarters,setQuarters] = useState([])
  const[quarter, setQuarter] = useState(false)
  const[finalMatches, setFinalMatches] = useState([])
  const[groups, setGroups] = useState([
    {
      group: 1,
      groupTeams: []
    },{
      group: 2,
      groupTeams: []
    }
  ])

  function handleChange(e){
    setTeam(e.target.value)
  }

  function generateGroups(){
    teams?.map((i) => {
      const rand = 1 + Math.random() * (10-1)
      if(rand <= 5 ){
        console.log(groups[0].groupTeams.length)
        if(groups[0].groupTeams.length >= 4){
          groups[1].groupTeams.push(i)
        }else{
          groups[0].groupTeams.push(i)
        }
      }else{
        if(groups[1].groupTeams.length >= 4){
          groups[0].groupTeams.push(i)
          
        }else{
          groups[1].groupTeams.push(i)
        }
      }
    })
    generateMatches()
    }
  
    function generateMatches(){
      var match = {team1: groups[0].groupTeams[0], team2: groups[0].groupTeams[1]}
      matches.push(match)
      match = {team1: groups[0].groupTeams[2], team2: groups[0].groupTeams[3]}
      matches.push(match)
      match = {team1: groups[0].groupTeams[0], team2: groups[0].groupTeams[2]}
      matches.push(match)
      match = {team1: groups[0].groupTeams[1], team2: groups[0].groupTeams[3]}
      matches.push(match)
      match = {team1: groups[0].groupTeams[0], team2: groups[0].groupTeams[3]}
      matches.push(match)
      match = {team1: groups[0].groupTeams[1], team2: groups[0].groupTeams[2]}
      matches.push(match)
      
      match = {team1: groups[1].groupTeams[0], team2: groups[1].groupTeams[1]}
      matches.push(match)
      match = {team1: groups[1].groupTeams[2], team2: groups[1].groupTeams[3]}
      matches.push(match)
      match = {team1: groups[1].groupTeams[0], team2: groups[1].groupTeams[2]}
      matches.push(match)
      match = {team1: groups[1].groupTeams[1], team2: groups[1].groupTeams[3]}
      matches.push(match)
      match = {team1: groups[1].groupTeams[0], team2: groups[1].groupTeams[3]}
      matches.push(match)
      match = {team1: groups[1].groupTeams[1], team2: groups[1].groupTeams[2]}
      matches.push(match)
      console.log(matches)

      setCurrentMatch(1)

    }

    function generateQuarterFinals(){
      var match = {team1: groups[0].groupTeams[3], team2: groups[1].groupTeams[0]}
      quarters.push(match)
      match = {team1: groups[0].groupTeams[2], team2: groups[1].groupTeams[1]}
      quarters.push(match)
      match = {team1: groups[0].groupTeams[1], team2: groups[1].groupTeams[2]}
      quarters.push(match)
      match = {team1: groups[0].groupTeams[0], team2: groups[1].groupTeams[3]}
      quarters.push(match)

      console.log(quarters)
      setCurrentMatch(1)
      setQuarter(true)
    }
    
    const finishMatch = (e) => {
      e.preventDefault()
      if(currentMatch<=12){
        console.log(currentMatch)
        if(firstTeam>secondTeam){
          matches[currentMatch-1].team1.points+=3
        }else if(secondTeam>firstTeam){
          matches[currentMatch-1].team2.points+=3
        }else{
          matches[currentMatch-1].team1.points+=1
          matches[currentMatch-1].team2.points+=1
        }
        setCurrentMatch(currentMatch+1)
        if(currentMatch>=12){
          setCurrentMatch(0)
          sortTeams()
          generateQuarterFinals()
        }
      }else{
        setCurrentMatch(0)
        sortTeams()
        generateQuarterFinals()
      }
    }
    
    const finishQuarters = (e) => {
      e.preventDefault()
      if(currentMatch<=4){
        console.log(currentMatch)
        if(firstTeam>secondTeam){
          finalists.push(quarters[currentMatch-1].team1)
          console.log("Winner: " + quarters[currentMatch-1].team1.team)
        }else{
          finalists.push(quarters[currentMatch-1].team2)
        }
        setCurrentMatch(currentMatch+1)
        if(currentMatch>=4){
          setQuarter(false)
          setCurrentMatch(0)
          setFinal(true)
          startFinal()
        }
      }else{
        console.log("Finalists:")
        console.log(finalists)
        setQuarter(false)
        setCurrentMatch(0)
        setFinal(true)
        startFinal()
        
      }
    }

    const startFinal = () => {
      var match = {team1: finalists[0].team, team2: finalists[2].team}
      finalMatches.push(match)
      match = {team1: finalists[1].team, team2: finalists[3].team}
      finalMatches.push(match)
      setCurrentMatch(1)
    }

    const finishFinals = (e) => {
      e.preventDefault()
      if(currentMatch<=2){
        if(firstTeam>secondTeam){
          if(firstFinalist!=""){
            console.log(finalMatches[currentMatch-1].team1)
            setSecondFinalist(finalMatches[currentMatch-1].team1)
            console.log("kys" + currentMatch)
          }else{
            console.log(finalMatches[currentMatch-1].team1)
            setFirstFinalist(finalMatches[currentMatch-1].team1)
          }
        }else{
          if(firstFinalist!=""){
            setSecondFinalist(finalMatches[currentMatch-1].team2)
          }else{
            setFirstFinalist(finalMatches[currentMatch-1].team2)
          }
        }
        setCurrentMatch(currentMatch+1)
        if(currentMatch>=2){
          setFinal(false)
          setCurrentMatch(0)
          console.log(firstFinalist + " " +secondFinalist)
        }
      }else{
        setFinal(false)
        setCurrentMatch(0)
      }
    }


  function handleAdd(){
    if(team.length<=0){
      alert("Please enter a team!")
      return
    }
    if(teams.length >= 8){
      alert("No more than 8 teams allowed!")
      return
    }
    if(teams.includes(team)){
      alert("Team with the following name already exists!")
      return
    }
    const newTeams = teams.concat({ team, points: 0 })
    setTeams(newTeams)
    setTeam("")
    
  }

  function startTournament(){
    if(teams.length < 8){
      alert("Please add " + (8-(teams.length)) + " more teams!")
      return
    }
    generateGroups()
    console.log(groups)
    setStart(true)
  }

  function sortTeams() { 
    const sorted = [...groups[0].groupTeams].sort((a,b) => {
      return a.points >  b.points ? 1 : -1
    })

    setGroups(sorted)
    console.log(groups)
  }
  return (
    
    <div>
      {start ? null : (
      <div class="container">
        <input type="text" value={team} onChange={handleChange} />
        <button type="button" onClick={handleAdd}>
          Add
        </button>
        <button type="button" onClick={startTournament}>
          Start tournament
        </button>
      </div>
      )
      }

      {start ? null : (
      <div class="teams">
      <h1>Entered teams:</h1>
      <ul>
        {teams.map((item) => (
          <li key={item.id}>{item.team}</li>
        ))}
      </ul>
      </div>
      )
      
      }
      {start && !quarter && !final && !firstFinalist && !secondFinalist ? (
      <div class="tables">
        <h1>Group 1</h1>
        <table>
          <tr>
              <th>Team</th>
              <th>Points</th>
            </tr>
            {groups[0].groupTeams.map((item) => (
              <tr>
                <td>{item.team}</td>
                <td>{item.points}</td>
              </tr>
            ))}
        </table>
        <h1>Group 2</h1>
        <table>
            <tr>
              <th>Team</th>
              <th>Points</th>
            </tr>
            {groups[1].groupTeams.map((item) => (
              <tr>
                <td>{item.team}</td>
                <td>{item.points}</td>
              </tr>
            ))}
        </table>
        
        {currentMatch && !quarter ? (
        <form onSubmit={finishMatch}>
          <h1>Qualifiers</h1>
          <h2>{matches[currentMatch-1].team1.team} vs {matches[currentMatch-1].team2.team}</h2>
          <input type="number" value={firstTeam} onChange={(e)=> setFirstTeam(e.target.value)} />
          <input type="number" value={secondTeam} onChange={(e)=> setSecondTeam(e.target.value)} />
          <input type="submit" />
        </form>
        ) : null
        }
      </div>

      
      ) : null
      }

      {currentMatch && quarter ? (
        <div>
        <form onSubmit={finishQuarters}>
          <h1>Quarter finals</h1>
          <h2>{quarters[currentMatch-1].team1.team} vs {quarters[currentMatch-1].team2.team}</h2>
          <input type="number" value={firstTeam} onChange={(e)=> setFirstTeam(e.target.value)} />
          <input type="number" value={secondTeam} onChange={(e)=> setSecondTeam(e.target.value)} />
          <input type="submit" />
        </form>
        </div>
      ) : null
    }

      {currentMatch && final && (!firstFinalist || !secondFinalist) ? (
        <div>
        <form onSubmit={finishFinals}>
          <h1>Semi finals</h1>
          <h2>{finalMatches[currentMatch-1].team1} vs {finalMatches[currentMatch-1].team2}</h2>
          <input type="number" value={firstTeam} onChange={(e)=> setFirstTeam(e.target.value)} />
          <input type="number" value={secondTeam} onChange={(e)=> setSecondTeam(e.target.value)} />
          <input type="submit" />
        </form>
        </div>
      ) : null
    } 

    {firstFinalist && secondFinalist ? (
      <div>
      <form onSubmit={() => {
        if(firstTeam>secondTeam){
          alert(firstFinalist + " wins!")
        }else{
          alert(secondFinalist + " wins!")
        }
      }}>

        <h1>FINALS!!!</h1>
        <h2>{firstFinalist} vs {secondFinalist}</h2>
        <input type="number" value={firstTeam} onChange={(e)=> setFirstTeam(e.target.value)} />
        <input type="number" value={secondTeam} onChange={(e)=> setSecondTeam(e.target.value)} />
        <input type="submit" />
      </form>
      </div>
    ) : null}

    
    

    </div>
  )
}

export default App;
