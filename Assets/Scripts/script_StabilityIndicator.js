#pragma strict
	var stableMix:Array;
	var resultedMix:String;
	var checkOnce:boolean;
	checkOnce = true;
	var counter = 0;
	var isFound:boolean;
	var currentColour: Color;
	var rate = 3;
	public var madAlchemySkin: GUISkin; // MasterSkin

	//array to hold the stable elements
	stableMix = ["GoldThorn","Potion of Ghostwalk","Stoneskin Potion","Potion of Impenetrable Will","Liquid Gold","Philosopher's Stone","Elixir of Transcendence","Instant Freeze Dust","Healing Potion","Orb of Scrying","Dust of Magic-Negation","Smoke of Eternity","Potion of Luck"];

function Update () {
	// var to hold the mix created in the cauldron
	resultedMix = GameObject.Find("MixWizard").GetComponent(script_mixHandler).resultedMix;
	// if a mix has been created
	if(resultedMix != null && GameObject.Find("MixWizard").GetComponent(script_mixHandler).allowAccess == true) {
		// iterate through the array and compare it with the mix
		for(var i = 0; i < stableMix.length; i++) {
			// if it's a match, then set the light towards green and end the loop
			if(resultedMix == stableMix[i]) {
				isFound = true;
				break;
			}
			
			// if it's not a match, it means the element is unstable and set the color to red
			else {
				isFound = false;
			}
		}
		// Decrease and increase the counter until the game ends
		if(isFound == true) {
			counter++;
		}
		else {
			counter--;
		}
	GameObject.Find("MixWizard").GetComponent(script_mixHandler).resultedMix = null;
	}
}

function OnGUI() {

	GUI.skin = madAlchemySkin;
	//Display Counter Text
	switch(counter) {
		case -3:
			currentColour = light.color;
			ChangeColor(currentColour,Color(3.3F, 0, 0));
			GUI.Label(Rect(30,30,500,50), "Well, you've done it! You blew up the castle!");
			break;
		case -2:
			currentColour = light.color;
			ChangeColor(currentColour,Color(2.3F, 0, 0));
			GUI.Label(Rect(30,30,500,50), "Oh,oh! You are very close to blowing the castle up!");
			break;
		case -1:
			currentColour = light.color;
			ChangeColor(currentColour,Color(1.3F, 0, 0));
			GUI.Label(Rect(30,30,500,50), "Wrong combination! The stability went down!");
			break;
		case 0:
			currentColour = light.color;
			ChangeColor(currentColour,Color(0, 0, 0));
			GUI.Label(Rect(30,30,500,50), "The stability is normal.");
			break;
		case 1:
			currentColour = light.color;
			ChangeColor(currentColour,Color(0, 1.3F, 0));
			GUI.Label(Rect(30,30,500,50), "Good choice. The stability has been improved.");
			break;
		case 2:
			currentColour = light.color;
			ChangeColor(currentColour,Color(0, 2.3F, 0));
			GUI.Label(Rect(30,30,500,50), "The stability level is really good!");
			break;
		case 3:
			currentColour = light.color;
			ChangeColor(currentColour,Color(0, 3.3F, 0));
			GUI.Label(Rect(30,30,500,50), "You are really good at this game!");
			break;
		default:
			currentColour = light.color;
			ChangeColor(currentColour,Color(0, 3.3F, 0));
			GUI.Label(Rect(30,30,500,50), "Well done!");
			break;
	}
	
}

function ChangeColor( oldColor : Color, newColor : Color ){
    var t : float = 0.0;
 
    while (t < 1.0) {
        light.color = Color.Lerp(oldColor, newColor, t);
        yield;
        t += Time.deltaTime * rate * 2;
    }
}
