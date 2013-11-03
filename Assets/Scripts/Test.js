#pragma strict

var mix: String; // Holds the resulted mix


// Lists of combinations
var combination = [["Wood","Fire","Charcoal"],["Sticks","Coal","Torch"],["String","Sticks","Bow"]];

// Function call
MixMatch("Sticks","Coal");



// Function for searching for the terms
function MixMatch(item1:String, item2: String) {

	for( var i = 0; i < combination.length; i++ ) {
		for( var j = 0; j < combination[i].length; j++ ) {
			if( item1 == combination[i][j] && item2 == combination[i][j+1] ) {
				mix = combination[i][j+2];
			}
			else if( item2 == combination[i][j] && item1 == combination[i][j+1] ) {
				mix = combination[i][j+2];
			}
		}
	}

	print(mix);
	return mix; // resulted product
}