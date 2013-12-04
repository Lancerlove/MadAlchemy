#pragma strict
// Draws a horizontal slider control that goes from 0 to 10.
var hSliderValue : int = 0;
var sliderUp = false;
var difficulty : String;
public var menuSkin : GUISkin; // MasterSkin

function Update () {

}
function OnMouseUpAsButton () {
	GameObject.Find("MainCamera").GetComponent(script_MenuController).introduction = false;
	GameObject.Find("MainCamera").SendMessage("OnGUI");
	sliderUp = true;
}

function OnGUI() {
	GUI.skin = menuSkin;
	if(sliderUp == true) {

		hSliderValue = GUI.HorizontalSlider (Rect (170, 380, 200, 30), hSliderValue, 0, 2);

		switch(hSliderValue) {
			case 0: 
				difficulty = "Beginner";
				break;
			case 1: 
				difficulty = "Intermediate";
				break;
			case 2: 
				difficulty = "Expert";
				break;
			default: 
				difficulty = "Beginner";
		}

		GUI.Label(Rect(170,290, 400,100), "Difficulty: " + difficulty);
	}
}