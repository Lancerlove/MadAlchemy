#pragma strict

var changeState:boolean;
var isLooking:boolean;
var createdElements: Array;
function Start () {
	changeState = true;
	
}

function Update () {

	createdElements = GameObject.Find("MixWizard").GetComponent(script_mixHandler).alreadyExists;

	isLooking = GameObject.Find("Player").GetComponent(script_ObjectInteraction).isRecipeBook;

	if(Input.GetKeyDown(KeyCode.R) && changeState && isLooking == true) {
		print("Opened RecipeBook");
		DisplayElements();
		changeState = false;
	}
	else if(Input.GetKeyDown(KeyCode.R) && changeState == false) {
		print("Closed RecipeBook");
		changeState = true;
	}

}

function DisplayElements() {

	for (var i=0; i < createdElements.length; i++) {
		print(createdElements);
	}
}