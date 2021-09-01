const searchBtn = document.querySelector(`.searchBtn`);
const row = document.querySelector(`.row`);
const modalPage = document.querySelector(`.modalPage`);
searchBtn.addEventListener("click", () => {
	const loadSportsaApi = () => {
		let searchInp = document.querySelector(`.searchInp`);
		let searchText = searchInp.value;
		searchInp.value = "";
		if (searchText == "") {
			row.innerHTML = `
			<div class="col-sm-6 mx-auto">
				<div class="card">
					<div class="card-body text-center text-danger">
						<h1 class="card-title">OOPS........😒</h1>
						<h3 class="card-text">no result found</h3>
					</div>
				</div>
			</div>
			`;
		} else {
			fetch(
				`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchText}`
			)
				.then((res) => res.json())
				.then((data) => {
					const teams = data.teams;
					if (teams == null) {
						row.innerHTML = `
							<div class="col-sm-6 mt-5 mx-auto"">
								<div class="card">
									<div class="card-body text-center">
									<h1 class="fs-1">😫</h1>
										<h1 class="card-title">Sooooorry........</h1>
										<h3 class="card-text">no result found</h3>
										<p class="card-text">i think you have enterd wrong keywords</p>
									</div>
								</div>
							</div>
							`;
					} else {
						teams.forEach((team) => {
							const div = document.createElement("div");
							div.classList.add("col-sm-3");
							// console.log(team);
							div.innerHTML = `
							<div class="card mb-3" onclick="clubDetails('${team.strTeam}')" >
								<img src="${team.strTeamBadge}" class="card-img-top img-fluid" >
								<div class="card-body">
									<h5 class="card-title">${team.strTeam}</h5>
								</div>
							 </div>
							`;
							row.appendChild(div);
						});
					}
				});
		}
	};
	row.innerHTML = "";
	loadSportsaApi();
	modalPage.innerHTML = "";
});

const clubDetails = (name) => {
	fetch(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${name}`)
		.then((res) => res.json())
		.then((data) => {
			const team = data.teams[0];
			// console.log(team);
			const div = document.createElement("div");
			div.classList.add("col");
			div.innerHTML = `
			<div class="card mb-3" >
				<div class="row g-0">
					<div class="col-md-4">
						<img src="${team.strTeamBadge}" class="img-fluid rounded-start" alt="...">
					</div>
					<div class="col-md-8">
						<div class="card-body">
							<h2 class="card-title">Name: ${team.strTeam}</h2>
							<h5 class="card-text">Country: ${team.strCountry}</h3>
							<p class="card-text">Description: ${team.strDescriptionEN}</p>
							<p class="card-text">Leauge: ${team.strLeague}</p>
							<p class="card-text">Stadium: ${team.strStadium}</p>
							<p class="card-text">Stadium Description: ${team.strStadiumDescription}</p>
							<p class="card-text">Stadium Location: ${team.strStadiumLocation}</p>
						</div>
					</div>
				</div>
			</div>
			`;
			modalPage.appendChild(div);
		});
		modalPage.innerHTML = "";
};
