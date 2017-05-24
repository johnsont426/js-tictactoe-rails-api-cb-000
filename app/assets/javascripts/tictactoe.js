var turn = 0;
var winningCombo = [[[0,0],[1,0],[2,0]], [[0,1],[1,1],[2,1]], [[0,2],[1,2],[2,2]], [[0,0],[1,1],[2,2]], [[0,0],[0,1],[0,2]], [[2,0],[2,1],[2,2]], [[1,0],[1,1],[1,2]], [[2,0],[1,1],[0,2]]]


function attachListeners(){
	$("td").on("click", function(){
		doTurn(this)
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
		}
	})
}

function message(str){
	$("#message").append("<p>" + str + "</p>")
}

$(function(){
	attachListeners();
})
