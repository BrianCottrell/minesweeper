/* Minesweeper            */
/* by Brian Cottrell      */
/* 10-04-2014             */

/*VARIABLES*/
var rows = 20;						//Sets number of rows on game board
var columns = 20;					//Sets number of columns on game board
var mines = 40;						//Sets number of mines
var sideLength = (50.0)/columns-0.4;//Edge length of each box
var board = [];						//Create an array to store boxed
var mineArray = [];					//Stores boxes that contain mines
var originalColor = '#000000';		//Store a backround color to be temporarily changed
var docFrag = document.createDocumentFragment();
board.length = rows*columns;		//Make box array large enough to fit the total number of boxes
mineArray.length = mines;
/*FUNCTIONS*/
//Set up the game board with the specified number of rows
function setBoard(){
	for(var i = 0; i < board.length; i++){
		board[i] = document.createElement('div');
		board[i].classList.add('box');
		board[i].style.padding = sideLength.toString()+'%';
		if(i%columns == 0){
			board[i].classList.add('clearboth');
		}
		docFrag.appendChild(board[i]);
		board[i].addEventListener('mouseover', addFocus, false);
		board[i].addEventListener('mouseout', removeFocus, false);
		board[i].addEventListener('click', selectBox, false);
		board[i].addEventListener('contextmenu', rightClick, false);
	}
	document.getElementsByClassName('outerdiv')[0].appendChild(docFrag);
}
//Randomly select boxes to add the specified number of mines
function addMines(){
	for(var i = 0; i < mineArray.length; i++){
		mineArray[i] = Math.floor(Math.random()*board.length)
		for(var j = 0; j < i; j++){
			if(mineArray[i] == mineArray[j]){
				i--;
			}
		}
	}
}
function addFocus(){
	originalColor = this.style.backgroundColor;
	this.style.backgroundColor = '#884400';
}
function removeFocus(){
	this.style.backgroundColor = originalColor;
}
function selectBox(){
	var box = board.indexOf(this);
	var minesNearby = 0;
	var boxesNearby = [box-columns, box+columns];
	if((box+columns)%columns != 0){
		boxesNearby.push(box-columns-1, box-1, box+columns-1);
	}
	if((box+1)%columns != 0){
		boxesNearby.push(box-columns+1, box+1, box+columns+1);
	}
	for(var i = 0; i < mineArray.length; i++){
		if(box == mineArray[i]){
			this.style.backgroundColor = '#880000';
			originalColor = this.style.backgroundColor;
			break;
		}
		else{
			for(var j = 0; j < boxesNearby.length; j++){
				if(boxesNearby[j] == mineArray[i]){
					minesNearby++;
					break;
				}
			}
		}
		this.style.background = 'url(m'+minesNearby+'.png)';
		this.style.backgroundSize = 'contain';
		this.style.backgroundColor = '#'+minesNearby+'0'+(9-minesNearby)+'000';
		originalColor = this.style.backgroundColor;
	}
//	document.getElementsByTagName('p')[0].innerHTML = minesNearby;
}
function rightClick(e){
	e.preventDefault();
	this.style.background = 'url(flag.png)';
	this.style.backgroundSize = 'contain';
}
/*PROGRAM*/
setBoard();
addMines();