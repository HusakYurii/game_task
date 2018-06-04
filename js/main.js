'use srtict';
window.onload = function() {
	const d = document;

	let btn = d.querySelector('.settings > button');
            btn.addEventListener('click', setFunc);

	function setFunc(){
		let inp = d.querySelector('.settings > input').value;
		let params = inp.split(':');
		let Rnum = params[0];
		let Cnum = params[1];
		//Create a table field
		const table = createField(Rnum,Cnum);
		//Add event to the table
		table.addEventListener('click', clickHandler);

	}

	function createField(Rnum, Cnum) {
		//Rnum - the number of rows
		//Cnum - the number of columns
		// If the table exists - delet it (refresh)
		if(d.getElementById('table')){
			d.body.removeChild(d.getElementById('table'));
		}
		
		const newTable = d.createElement('table');
		      newTable.setAttribute('id', 'table');

		for(let i = 0; i < Rnum; i++){
			//Create a new row
			let newRow = d.createElement('tr');

			for(let j = 0; j < Cnum; j++ ){
				//Create a new cell
				let newCell = d.createElement('td');
				//Insert a random icon
				newCell.innerHTML = getPicture(getRandom(1,4));
				newRow.appendChild(newCell);
			}
			newTable.appendChild(newRow);
		}
		d.body.insertBefore(newTable, d.body.lastElementChild);
		return newTable; //Return the table
	}

		//Get a random number 
	function getRandom(min, max) {
		return Math.floor((Math.random() * (max - min + 1)) + min);
	}
		//Get random icon base on a random number
	function getPicture(num) {
		// ТРЕФЫ &#9827; // БУБНЫ &#9830; // ПИКИ &#9824; // ЧЕРВЫ &#9829;
		switch(num) {
			case 1:
				return '&#9827';
			case 2:
				return '&#9830;';
			case 3:
				return '&#9824;';
			case 4:
				return '&#9829;';
			default:
				break;
		}
	}

	function clickHandler(event){
		let tableBody = this; 					//To define the Table itself;
		let rows = tableBody.rows.length; 			// Number of rows in a table
		let columns = tableBody.rows[0].cells.length; 		//Number of columns in a table
		let targetR = event.target.parentElement.rowIndex; 	//Row index of the picked cell
		let targetC = event.target.cellIndex; 			//Column index of the picked cell

		matchPic(rows, columns, targetR, targetC, tableBody);

	}

	function matchPic(rNum, cNum,i,j,table){ // Number of Rows, Number of Columns, current Row index, current Column index, table
		let currEl = table.rows[i].cells[j];
		    currEl.style.backgroundColor ='grey'; // if the color is grey it means that this cell is already matched
		//If there are not cells (like at the corner) - set null
		let upEl = i == 0 ? null : table.rows[i-1].cells[j];
		let rightEl = j == cNum-1 ? null : table.rows[i].cells[j+1];
		let downEl = i == rNum-1 ? null : table.rows[i+1].cells[j];	
		let leftEl = j == 0 ? null : table.rows[i].cells[j-1];
		
		
		if(upEl){
			if(upEl.style.backgroundColor != 'grey'){
				if(currEl.innerHTML == upEl.innerHTML) {
					matchPic(rNum, cNum, upEl.parentElement.rowIndex, upEl.cellIndex, table);
				}
			}
		}
		if(rightEl){
			if(rightEl.style.backgroundColor != 'grey'){
				if(currEl.innerHTML == rightEl.innerHTML) {
					matchPic(rNum, cNum, rightEl.parentElement.rowIndex, rightEl.cellIndex, table);
				}
			}
		}
		if(downEl){
			if(downEl.style.backgroundColor != 'grey'){
				if(currEl.innerHTML == downEl.innerHTML) {
					matchPic(rNum, cNum, downEl.parentElement.rowIndex, downEl.cellIndex, table);
				}
			}
		}
		if(leftEl){
			if(leftEl.style.backgroundColor != 'grey'){
				if(currEl.innerHTML == leftEl.innerHTML) {
					matchPic(rNum, cNum, leftEl.parentElement.rowIndex, leftEl.cellIndex, table);
				}
			}
		}
	};
};





