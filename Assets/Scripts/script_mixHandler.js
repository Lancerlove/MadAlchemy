#pragma strict

//variables to hold the objects found by the cauldron slots
var objectFromRightSlot:String;
var objectFromLeftSlot:String;

var clonedObject:Transform;			// holds instances

var resultedMix:String; // holds the result of the combination

// first 2 elements in the array are the materials and the third one is the result
// each new line  = a new combination
var recipeList = [["Wood","Fire","Charcoal"],
				  ["Sticks","Coal","Torch"],
				  ["String","Sticks","Bow"]];

function Update () {
	// constantly check for the name of the objects on top
	objectFromRightSlot = GameObject.Find("cauldronRightSlot").GetComponent(script_rightCheckTop).nameOfObjectRight as String;
	objectFromLeftSlot = GameObject.Find("cauldronLeftSlot").GetComponent(script_leftCheckTop).nameOfObjectLeft as String;
	
	// constantly check for combinations
	if(objectFromRightSlot != null && objectFromLeftSlot != null) {
		MixMatch(objectFromRightSlot,objectFromLeftSlot);
	}

	// if a mix is found, create the object with the same name only once
	if(resultedMix != null) {
		clonedObject = Instantiate(GameObject.Find(resultedMix).transform, transform.position, Quaternion(0,0,0,0));
		//sparkles
		Destroy(Instantiate(GameObject.Find("sparkle_effect"), transform.position, Quaternion(0,0,0,0)), 3.0);
		clonedObject.transform.position = Vector3.Lerp(transform.position, transform.position + Vector3(0, .4, 0), 3);

		clonedObject.GetComponent(script_objectData).enabled = true;
		clonedObject.GetComponent(script_objectData).originalPosition = transform.position;
		
		clonedObject.name = clonedObject.name.Substring(0, clonedObject.name.length - 7);
		clonedObject.tag = "mixed_lvl1";

		// Send a message to left and right slots to begin the destruction of their child :-)
		GameObject.Find("cauldronLeftSlot").SendMessage("destroyObject");
		GameObject.Find("cauldronRightSlot").SendMessage("destroyObject");

		resultedMix = null; // clear the resultedMix var
	}
}

// Function for searching for the terms
function MixMatch(item1:String, item2: String) {

	for( var i = 0; i < recipeList.length; i++ ) {
		for( var j = 0; j < recipeList[i].length; j++ ) {
			if( item1 == recipeList[i][j] && item2 == recipeList[i][j+1] ) {
				resultedMix = recipeList[i][j+2];
			}
			else if( item2 == recipeList[i][j] && item1 == recipeList[i][j+1] ) {
				resultedMix = recipeList[i][j+2];
			}
		}
	}
	return resultedMix; // resulted product
}