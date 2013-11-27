#pragma strict

//variables to hold the objects found by the cauldron slots
var objectFromRightSlot:String;
var objectFromLeftSlot:String;

var clonedObject:Transform;			// holds instances

var resultedMix:String; // holds the result of the combination
var checkOnce:boolean;
var alreadyExists: Array;
var itExists:boolean;
var timer: float = 3.0;
var allowAccess : boolean = true;

// first 2 elements in the array are the materials and the third one is the result
// each new line  = a new combination
var recipeList = [
["Blackthorn", "Deathblossom", "The Black Plague"]
,
["Blackthorn", "Goldbark", "GoldThorn"]
,
["Blackthorn", "Frost Serum", "The Black Frost"]
,
["Blackthorn", "Essence of Fire", "Flaming Agony"]
,
["Deathblossom", "Dream Leaf", "Potion of Ghostwalk"]
,
["Deathblossom", "Goldbark", "Stoneskin Potion"]
,
["Deathblossom", "Frost Serum", "Potion of Impenetrable Will"]
,
["Goldbark", "Molten Lava", "Liquid Gold"]
,
["Goldbark", "Powdered Horn", "Philosopher's Stone"]
,
["Goldbark", "Dream Leaf", "Elixir of Transcendence"]
,
["Goldbark", "Essence of Fire", "Coal"]
,
["Frost Serum", "Essence of Fire", "FireFrost Elixir"]
,
["Frost Serum", "Powdered Horn", "Instant Freeze Dust"]
,
["Frost Serum", "Dream Leaf", "Herb of Eternal Slumber"]
,
["Frost Serum", "Molten Lava", "Rock"]
,
["Powdered Horn", "Dream Leaf", "Healing Potion"]
,
["Powdered Horn", "Deathblossom", "Dust of Disintegration"]
,
["Powdered Horn", "Molten Lava", "Orb of Scrying"]
,
["Powdered Horn", "Blackthorn", "Dust of Magic-Negation"]
,
["Molten Lava", "Dream Leaf", "Elixir of Mindless Rage"]
,
["Molten Lava", "Deathblossom", "The Black Lotus"]
,
["Molten Lava", "Blackthorn", "Stone Bramble"]
,
["Molten Lava", "Essence of Fire", "Vial of Cataclysm"]
,
["Essence of Fire", "Powdered Horn", "Smoke of Eternity"]
,
["Essence of Fire", "Deathblossom", "Foul Smelling Smoke"]
,
["Essence of Fire", "Dream Leaf", "Potion of Luck"]
,
["Dream Leaf", "Blackthorn", "Bubbling Nightmare"]];

function Start() {
	resultedMix = null;
	checkOnce = true;
	alreadyExists = [];
	itExists = false;
}

function Update () {
	// constantly check for the name of the objects on top
	objectFromRightSlot = GameObject.Find("cauldronRightSlot").GetComponent(script_rightCheckTop).nameOfObjectRight as String;
	objectFromLeftSlot = GameObject.Find("cauldronLeftSlot").GetComponent(script_leftCheckTop).nameOfObjectLeft as String;
	
	// constantly check for combinations
	if(objectFromRightSlot != null && objectFromLeftSlot != null) {
		MixMatch(objectFromRightSlot,objectFromLeftSlot);
	}
	// if a mix is found, create the object with the same name
	if(resultedMix != null) {
		//Check Sparkles once
		if(checkOnce) {

			// if mix doesn't match the array of already created elements
			if(CheckExisting(resultedMix, alreadyExists) == false) {
				alreadyExists.Push(resultedMix);  // add it to the list
				spawnMixedObject();  // spawn object
				checkOnce = true;   // allow next spawn
				allowAccess = true;   // allow access for stability indicator to get variables
			}
			//Otherwise
			else {
				allowAccess = false; // block access for stability indicator to get variables 
				checkOnce = false;  // block spawn
				ItExists(); // show GUI message, move objects back, allow next spawn and clear mix variable
			}

		}
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

function spawnMixedObject() {
	Destroy(Instantiate(GameObject.Find("LightGlow"), transform.position + Vector3(0, .5, 0), Quaternion(0,0,0,0)), 3.0);
	
	clonedObject = Instantiate(GameObject.Find(resultedMix).transform, transform.position, Quaternion(0,0,0,0));
	clonedObject.name = clonedObject.name.Substring(0, clonedObject.name.length - 7);

	clonedObject.transform.position = transform.position + Vector3(0, .4, 0);

	clonedObject.GetComponent(script_objectData).enabled = true;
	clonedObject.GetComponent(script_objectData).originalPosition = transform.position;
	
	clonedObject.tag = "mixed_lvl1";

	// Send a message to left and right slots to move their childs :-)
	GameObject.Find("cauldronLeftSlot").SendMessage("moveObject");
	GameObject.Find("cauldronRightSlot").SendMessage("moveObject");

	checkOnce = false;
}

// API for cross-matching an element with an array
function CheckExisting(element: String, arr: Array): boolean {
	for(var i=0; i < arr.length; i++) {
		if(element == arr[i]) {
			return true;
		}
	}
	return false;
}

// Function to trigger the GUI message when an element has already been created
function ItExists() {
	itExists = true;

 	GameObject.Find("cauldronLeftSlot").SendMessage("moveObject");
	GameObject.Find("cauldronRightSlot").SendMessage("moveObject");

	yield WaitForSeconds(3);
 	itExists = false;	

	resultedMix = null;
 	checkOnce = true;

}