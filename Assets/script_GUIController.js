#pragma strict

//


function OnGUI () {
	
	// Raycast Pop-up Item name
	 
	if(GameObject.Find("Player").GetComponent(script_ObjectInteraction).validHit == true) {
		GUI.Label (Rect (Screen.width/2, Screen.height/2 + 30, 150, 20), "Left Click to PickUp");
	}
	
	if(GameObject.Find("Player").GetComponent(script_ObjectInteraction).holdsItem == true) {
		GUI.Box(Rect(Screen.width/2, Screen.height - 100, 100, 30),GameObject.Find("Player").GetComponent(script_ObjectInteraction).clonedObject.name);
	}
}

function Update() {
	if(Input.GetKeyDown('escape')) {
		Application.Quit();
	}
}