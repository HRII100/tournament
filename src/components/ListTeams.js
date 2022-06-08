const ListTeams = (teams) => {
    return (
        teams.map((team) => {
            <li key={team.id}>{team.name}</li>
        })
    )
}

export default ListTeams