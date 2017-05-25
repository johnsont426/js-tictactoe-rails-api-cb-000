var turn = 0;
var winningCombo = [[[0,0],[1,0],[2,0]], [[0,1],[1,1],[2,1]], [[0,2],[1,2],[2,2]], [[0,0],[1,1],[2,2]], [[0,0],[0,1],[0,2]], [[2,0],[2,1],[2,2]], [[1,0],[1,1],[1,2]], [[2,0],[1,1],[0,2]]]
var gameOver

function attachListeners(){
	$("td").on("click", function(){
		doTurn(this)
	})
	$("#save").on("click", function(){
		postGame()
	})
	$("#previous").on("click", function(){
		getGames();
	})
}

function boxSelector(array){
	var box = $(`[data-x=${array[0]}][data-y=${array[1]}]`)
	return box.text()
}

function doTurn(box){
	turn += 1;
	updateState(box);
	checkWinner();
	checkTie()
}

function player(){
	if(turn % 2 === 1){
		return "O"
	}else {
		return "X"
	}
}

function updateState(box){
	var token = player();
	$(box).text(token);
}

function checkWinner(){
	winningCombo.forEach(array => {
		if(boxSelector(array[0]) === boxSelector(array[1]) && boxSelector(array[1]) === boxSelector(array[2]) && boxSelector(array[0]) != ""){
			var messageStr = "Player " + boxSelector(array[0]) + " Won!"
			message(messageStr);
			gameOver = true
		}
	})
}

function checkTie(){
	var stateArray = getStateArray();
	if(!stateArray.includes("") && !gameOver){
		message("Tie!");
		gameOver = true
	}
}

function message(str){
	$("#message").append("<p>" + str + "</p>")
}

function getStateArray(){
	var stateArray = []
	$("td").each(function(){
		stateArray.push($(this).text())
	})
	return stateArray
}

function stateJson(state){
	return { "game": { "state": state } }
}

function postGame(){
	var state = stateArray();
	$.ajax({
		url: "/games",
		data: stateJson(state),
		method: "POST",
		dataType: "json"
	})
}

function getGames(){
	$.ajax({
		url: "/games",
		dataType: 'script'
	}).done(makeGameLinksWork)
}

function makeGameLinksWork(){
	$(".saved-game").each(getGame)
}

function getGame(){
	$(this).on("click", function(e){
		$.get("/games/"+ $(this).data("id") + ".json", function(json){
			$("td").each(function(index){
				$(this).text(json.state[index])
			})
		})
	})
}


$(function(){
	attachListeners();
})
