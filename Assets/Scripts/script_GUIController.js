#pragma strict

public var madAlchemySkin: GUISkin; // MasterSkin
public var recipeBookSkin : GUISkin; // Skin used to display RecipeBook text
var cursorMode : CursorMode = CursorMode.Auto;
var hotSpot : Vector2 = Vector2.zero;
var basicIngredients = ["Blackthorn","Deathblossom","Goldbark","Frost Serum","Powdered Horn", "Molten Lava", "Essence of Fire", "Dream Leaf"];
var _sizeOfText: Vector2;

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
var _propertyTooltip: Texture2D;
var _property_fatal : Texture2D;
var _property_flames : Texture2D;
var _property_fortune : Texture2D;
var _property_freeze : Texture2D;
var _property_hot : Texture2D;
var _property_magic : Texture2D;
var _property_poison : Texture2D;
var _property_sleepy : Texture2D;

function OnGUI () {
	GUI.skin = madAlchemySkin;

	//Show Item name and property when looking at it
	if(GameObject.Find("Player").GetComponent(script_ObjectInteraction).validHit == true) {

		// change label's text alignment for the pop-up menu
		madAlchemySkin.label.alignment = 3;
		madAlchemySkin.label.padding.left = 20;

		// get width of text in label
		_sizeOfText = GUI.skin.label.CalcSize(new GUIContent(GameObject.Find("Player").GetComponent(script_ObjectInteraction).hit.collider.name));
		
		// display the name of element with the proper size
		GUI.Label (Rect (Screen.width/2 - _sizeOfText.y / 2, Screen.height/2 + 100, _sizeOfText.y, 50), GameObject.Find("Player").GetComponent(script_ObjectInteraction).hit.collider.name);

		// check if the player is looking at a basic element(because the others don't have properties, and they are not required either)
		if(GameObject.Find("Player").GetComponent(script_ObjectInteraction).hit.collider.tag != "mixed_lvl1") {

			// iterate through the basicIngredients array
			for(var i=0; i < basicIngredients.length; i++) {

				// if it matches the object the player is looking at
				if(GameObject.Find("Player").GetComponent(script_ObjectInteraction).hit.collider.name == basicIngredients[i]) {
					
					// find property icon and assign it to the property holder
					switch(basicIngredients[i]) {
						case "Blackthorn":
							_propertyTooltip = _property_poison;
							break;
						case "Deathblossom":
							_propertyTooltip = _property_fatal;
							break;
						case "Goldbark":
							_propertyTooltip = _property_fortune;
							break;
						case "Frost Serum":
							_propertyTooltip = _property_freeze;
							break;
						case "Powdered Horn":
							_propertyTooltip = _property_magic;
							break;
						case "Molten Lava":
							_propertyTooltip = _property_hot;
							break;
						case "Essence of Fire":
							_propertyTooltip = _property_flames;
							break;
						case "Dream Leaf":
							_propertyTooltip = _property_sleepy;
							break;
						default:
							print("No texture found");
							break;
					}
				}
			}

			// draw the actual property in the label
			GUI.DrawTexture(Rect(Screen.width/2 + _sizeOfText.y /2 - 45, Screen.height/2 + 105, 36, 40), _propertyTooltip);
		}

		// revert the text alignment to default
		madAlchemySkin.label.alignment = 4;
		madAlchemySkin.label.padding.left = 0;

	}
	
	//Show Item Name in a box when picked-up
	if(GameObject.Find("Player").GetComponent(script_ObjectInteraction).holdsItem == true) {
		_sizeOfText = GUI.skin.box.CalcSize(new GUIContent(GameObject.Find("Player").GetComponent(script_ObjectInteraction).clonedObject.name));
		GUI.Box(Rect(100, Screen.height - 100, _sizeOfText.x + 30, 64),GameObject.Find("Player").GetComponent(script_ObjectInteraction).clonedObject.name);
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
		_sizeOfText = GUI.skin.label.CalcSize(new GUIContent("You have to create " + GameObject.Find("WinorEnd_Controller").GetComponent(script_winOrEnd).targetCombination));
		GUI.Label (Rect (Screen.width/2 - ((_sizeOfText.x + 40) / 2), 100, _sizeOfText.x + 40, 50), "You have to create " + GameObject.Find("WinorEnd_Controller").GetComponent(script_winOrEnd).targetCombination); 
	}

	// ALways display the target mix
	if(isPopupFinished ==  true) {
		_sizeOfText = GUI.skin.label.CalcSize(new GUIContent("Target: " + GameObject.Find("WinorEnd_Controller").GetComponent(script_winOrEnd).targetCombination));
		GUI.Label (Rect (Screen.width - _sizeOfText.x + 40 - 130, 80, _sizeOfText.x + 40, 50), "Target: " + GameObject.Find("WinorEnd_Controller").GetComponent(script_winOrEnd).targetCombination); 
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
		GUI.Label(Rect (Screen.width/2 + 180, _bookHeight + ((Screen.height - _bookHeight) / 2) - 100, 500, 50), "Press 'R' to close");
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
	if(GameObject.Find("timer").GetComponent(script_gameTimer).checkTimer == true) {
		_sizeOfText = GUI.skin.label.CalcSize(new GUIContent("Time Left: " + GameObject.Find("timer").GetComponent(script_gameTimer).timer.ToString("F0")));
		GUI.Label (Rect (Screen.width - _sizeOfText.x + 40 - 130, 140, _sizeOfText.x + 40, 40),"Time Left: " + GameObject.Find("timer").GetComponent(script_gameTimer).timer.ToString("F0"));
	}
	else {
		GUI.Label (Rect (0, 0, Screen.width, Screen.height), "It has taken you too long to brew the medicine. The king has died!");
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
		
		//Time.timeScale = 1;
		GameObject.Find("Player").GetComponent(MouseLook).enabled = true;
		GameObject.Find("Main Camera").GetComponent(MouseLook).enabled=true;
}
function MenuOn() {
		Screen.showCursor = true;
		Cursor.SetCursor(cursorTexture, hotSpot, cursorMode);

    	//Time.timeScale = 0;
    	GameObject.Find("Player").GetComponent(MouseLook).enabled=false;
    	GameObject.Find("Main Camera").GetComponent(MouseLook).enabled=false;
}

function RecipeBookBasic() {
	drawFound = false;

	GUI.skin = recipeBookSkin;

	var _subNameX = 100;
	var _subPropertyX = 105;
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
				_texHolder = _property_poison;
				break;
			case "Deathblossom":
				_texHolder = _property_fatal;
				break;
			case "Goldbark":
				_texHolder = _property_fortune;
				break;
			case "Frost Serum":
				_texHolder = _property_freeze;
				break;
			case "Powdered Horn":
				_texHolder = _property_magic;
				break;
			case "Molten Lava":
				_texHolder = _property_hot;
				break;
			case "Essence of Fire":
				_texHolder = _property_flames;
				break;
			case "Dream Leaf":
				_texHolder = _property_sleepy;
				break;
			default:
				print("No texture found");
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
		GUI.skin = madAlchemySkin;
	return true;
}