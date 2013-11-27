#pragma strict

public var madAlchemySkin: GUISkin; // MasterSkin
public var recipeBookSkin : GUISkin; // Skin used to display RecipeBook text
var cursorMode : CursorMode = CursorMode.Auto;
var hotSpot : Vector2 = Vector2.zero;


//Triggers
var quitMenu : boolean = false; // quit bool
var timer:boolean = true;
var isPopupFinished:boolean = false;
var drawBasic:boolean = false;
var drawFound:boolean = false;

// Environment Vars
var _bookWidth = 1024;
var _bookHeight = 766;
var combTimer : float = 3.0;

// Texture Vars
var cursorTexture : Texture2D;
var bookTexture: Texture2D;
var _property_death : Texture2D;

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

			MenuOn();
	    	
	 		//Create rectangle and restart level
	 		if(GUI.Button(Rect(Screen.width/2 - 100, Screen.height /2, 200,50), "Restart")) {
	 			Application.LoadLevel("Level01");
	 		}
	 		//Create rectangle and quit game
			if(GUI.Button(Rect(Screen.width/2 - 100, Screen.height /2 + 50, 200,50), "Quit")) {
	 			Application.Quit();
	 		}
	}
	
	else if(quitMenu == false){

			MenuOff();
		
	}

	// Display the item required to be created
	if(timer == true) {
		GUI.Label (Rect (Screen.width/2 - 300, 100, 600, 50), "You have to create " + GameObject.Find("WinorEnd_Controller").GetComponent(script_winOrEnd).targetCombination); 
	}

	// ALways display the target mix
	if(isPopupFinished ==  true) {
		GUI.Label (Rect (Screen.width - 450, 80, 400, 50), "Target: " + GameObject.Find("WinorEnd_Controller").GetComponent(script_winOrEnd).targetCombination); 
	}

	// Display the message when the game is won
	if(GameObject.Find("WinorEnd_Controller").GetComponent(script_winOrEnd).playerWon == true) {
		GUI.Label (Rect (0, 0, Screen.width, Screen.height), "You won! Challenge: Next time do it in one try!");
	}

	// Display the message when the game is lost
	if(GameObject.Find("WinorEnd_Controller").GetComponent(script_winOrEnd).playerLost == true) {
		GUI.Label (Rect (0, 0, Screen.width, Screen.height), "The castle blew up because you were too irresponsible!");
	}

	// label when the discovered element already exists
	if(GameObject.Find("MixWizard").GetComponent(script_mixHandler).itExists == true) {
		GUI.Label (Rect (Screen.width/2 - 300, 100, 600, 50), "You have already discovered that element"); 
	}
	
	// Label for recipe book when looked at
	if(GameObject.Find("Player").GetComponent(script_ObjectInteraction).isRecipeBook == true) {
		GUI.Label (Rect (Screen.width/2 - 150, Screen.height - 100, 300, 50), "Press 'R' to open the recipe book!");
	}

	// Handle Recipe Book
	if(GameObject.Find("recipeBook").GetComponent(script_recipeBook).isOpened == true) {

		// Hide the label for recipe book
		GameObject.Find("Player").GetComponent(script_ObjectInteraction).isRecipeBook = false;
		
		// Trigger the menu function
		MenuOn();

		// Draw the book background
		GUI.DrawTexture(Rect(Screen.width/2 - 512, Screen.height/2 - 383, _bookWidth, _bookHeight), bookTexture);
			GUI.skin = recipeBookSkin;
		GUI.Label(Rect (Screen.width/2 + 150, (Screen.height - ((Screen.height - _bookHeight) + ((Screen.height - _bookHeight) / 2))) + 10, 500, 50), "Press 'R' to close");
			GUI.skin = madAlchemySkin;
		// Draw the default first page - info about the recipe book


		if(GUI.Button(Rect(Screen.width/2 + 100, ((Screen.height - _bookHeight)/2) -  40 , 70, 40), "Basic"))
			drawBasic = true;

		if(drawBasic == true) {
			RecipeBookBasic();
		}

		if(GUI.Button(Rect(Screen.width/2 + 180, ((Screen.height - _bookHeight)/2) -  40 , 70, 40), "Found"))
			drawFound = true;

		if(drawFound == true) {
			RecipeBookFound();
		}

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
 	else {
 		timer = false;
 		isPopupFinished = true;
 	}
 	 	
}

function MenuOff() {
		Screen.showCursor = false;
		Cursor.SetCursor(null, Vector2.zero, cursorMode);
		
		Time.timeScale = 1;
		GameObject.Find("Player").GetComponent(MouseLook).enabled = true;
		GameObject.Find("Main Camera").GetComponent(MouseLook).enabled=true;
}
function MenuOn() {
		Screen.showCursor = true;
		Cursor.SetCursor(cursorTexture, hotSpot, cursorMode);

    	Time.timeScale = 0;
    	GameObject.Find("Player").GetComponent(MouseLook).enabled=false;
    	GameObject.Find("Main Camera").GetComponent(MouseLook).enabled=false;
}

function RecipeBookBasic() {
	drawFound = false;

	GUI.skin = recipeBookSkin;

	var _subNameX = 100;
	var _subPropertyX = 105;
	var basicIngredients = ["Blackthorn","Deathblossom","Goldbark","Frost Serum","Powdered Horn", "Molten Lava", "Essence of Fire", "Dream Leaf"];
	var _texHolder : Texture2D;

	// Change font size and colour for title
	GUI.skin.label.fontSize = 30;
	var initialFontColor = GUI.skin.label.normal.textColor;
	GUI.skin.label.normal.textColor = Color.black;

	// Title
	GUI.Label(Rect (Screen.width/2 - _bookWidth / 2 + 100, (Screen.height - _bookHeight) / 2 + 40 , 500, 50), "Basic Ingredients Properties");

	// Change font size and colour for elements
	GUI.skin.label.fontSize = 36;
	GUI.skin.label.normal.textColor = initialFontColor;

	// Generate elements
	for(var i=0; i<basicIngredients.length; i++) {
		
		// Write name of current string in basicIndredients and position it
		GUI.Label(Rect (Screen.width/2 - _bookWidth / 2 + 90, (Screen.height - _bookHeight) / 2 + _subNameX, 500, 50), basicIngredients[i]);
		
		// find out which texture is associated to the name
		switch(basicIngredients[i]) {
			case "Blackthorn":
				_texHolder = _property_death;
				break;
			default:
				_texHolder = _property_death;
				break;
		}

		// draw the property texture
		GUI.DrawTexture(Rect(Screen.width/2 - _bookWidth / 2 + 400, (Screen.height - _bookHeight) / 2 + _subPropertyX , 40, 40), _texHolder);

		// increment the x position of text and icon
		_subNameX += 60;
		_subPropertyX += 60;
	}

	GUI.skin = madAlchemySkin;
	return true;

}

function RecipeBookFound() {
	drawBasic = false;

	GUI.skin = recipeBookSkin;
	var foundMixes : Array;
	var _subNameX = 100;
	var _subNameX_orig = 100;
	
	foundMixes = GameObject.Find("recipeBook").GetComponent(script_recipeBook).createdElements;

	GUI.skin.label.fontSize = 30;
	var initialFontColor = GUI.skin.label.normal.textColor;
	GUI.skin.label.normal.textColor = Color.black;

	// Title
	GUI.Label(Rect (Screen.width/2 - _bookWidth / 2 + 100, (Screen.height - _bookHeight) / 2 + 40 , 500, 50), "Combinations Discovered");

	// Change font size and colour for elements
	GUI.skin.label.fontSize = 36;
	GUI.skin.label.normal.textColor = initialFontColor;

	for(var i=0; i<foundMixes.length; i++) {
		
		if(i <= 9) {

		// Write name of current string in basicIndredients and position it
		GUI.Label(Rect (Screen.width/2 - _bookWidth / 2 + 90, (Screen.height - _bookHeight) / 2 + _subNameX, 500, 50), foundMixes[i].ToString());
		
		// increment the x position of text and icon
		_subNameX += 60;
			if(i == 9) {
				_subNameX = _subNameX_orig;
			}
		}
		else {
			// Write name of current string in basicIndredients and position it
			GUI.Label(Rect (Screen.width/2 + 90, (Screen.height - _bookHeight) / 2 + _subNameX, 500, 50), foundMixes[i].ToString());
			
			// increment the x position of text and icon
			_subNameX += 60;
		}

	}

	return true;
}