#pragma strict

var quitMenu : boolean = false; // quit bool
public var madAlchemySkin: GUISkin; // MasterSkin
var cursorTexture : Texture2D;
var cursorMode : CursorMode = CursorMode.Auto;
var hotSpot : Vector2 = Vector2.zero;
var combTimer : float = 3.0;
var timer:boolean = true;

function OnGUI () {
	GUI.skin = madAlchemySkin;
	//Show Item name when looking to it
	if(GameObject.Find("Player").GetComponent(script_ObjectInteraction).validHit == true) {
		GUI.Label (Rect (Screen.width/2 - 150, Screen.height - 100, 300, 50), GameObject.Find("Player").GetComponent(script_ObjectInteraction).hit.collider.name);
	}
	
	//Show Item Name in a box when picked-up
	if(GameObject.Find("Player").GetComponent(script_ObjectInteraction).holdsItem == true) {
		GUI.Box(Rect(100, Screen.height - 100, 256, 64),GameObject.Find("Player").GetComponent(script_ObjectInteraction).clonedObject.name);
	}

	if(quitMenu == true) {
		//Pause the Game when the menu opens, show the cursor
		Screen.showCursor = true;
		Cursor.SetCursor(cursorTexture, hotSpot, cursorMode);

    	Time.timeScale = 0;
    	GameObject.Find("Player").GetComponent(MouseLook).enabled=false;
    	GameObject.Find("Main Camera").GetComponent(MouseLook).enabled=false;
    	
 		//Create rectangle and restart level
 		if(GUI.Button(Rect(Screen.width/2 - 100, Screen.height /2, 200,50), "Restart")) {
 			Application.LoadLevel("Level01");
 		}
 		//Create rectangle and quit game
		if(GUI.Button(Rect(Screen.width/2 - 100, Screen.height /2 + 50, 200,50), "Quit")) {
 			Application.Quit();
 		}
 
	}
	
	else {
		//unpause the game when the menu closes
		Screen.showCursor = false;
		Cursor.SetCursor(null, Vector2.zero, cursorMode);
		
		Time.timeScale = 1;
		GameObject.Find("Player").GetComponent(MouseLook).enabled = true;
		GameObject.Find("Main Camera").GetComponent(MouseLook).enabled=true;
		
	}

	// Display the item required to be created
	if(timer == true) {
		GUI.Label (Rect (Screen.width/2 - 300, 100, 600, 50), "You have to create " + GameObject.Find("WinorEnd_Controller").GetComponent(script_winOrEnd).targetCombination); 
	}

	// Display the message when the game is won
	if(GameObject.Find("WinorEnd_Controller").GetComponent(script_winOrEnd).playerWon == true) {
		GUI.Label (Rect (0, 0, Screen.width, Screen.height), "You won! Challenge: Next time do it in one try!");
	}

	// Display the message when the game is lost
	if(GameObject.Find("WinorEnd_Controller").GetComponent(script_winOrEnd).playerLost == true) {
		GUI.Label (Rect (0, 0, Screen.width, Screen.height), "The castle blew up because you were too irresponsible!");
	}

	if(GameObject.Find("MixWizard").GetComponent(script_mixHandler).itExists == true) {
		GUI.Label (Rect (Screen.width/2 - 300, 100, 600, 50), "You have already discovered that element"); 
	}
	if(GameObject.Find("Player").GetComponent(script_ObjectInteraction).isRecipeBook == true) {
		GUI.Label (Rect (Screen.width/2 - 150, Screen.height - 100, 300, 50), "Press 'R' to open the recipe book!");
	}
}

// Quit Game when escape is pressed
function Update() {
	if(Input.GetKeyDown(KeyCode.Escape)) {
 
		quitMenu = !quitMenu;
 
	}
	 if(combTimer > 0){
  		combTimer -= Time.deltaTime;
  		timer = true;
 	}
 	else 
 		timer = false;
}
