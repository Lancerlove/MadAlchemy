#pragma strict

public var menuSkin: GUISkin; // MasterSkin
var introduction = true;


function Update () {

}

function OnGUI() {
	GUI.skin = menuSkin;
	if(introduction == true) {
		GUI.Label(Rect(170,340 , 900, 500), "Following a strange set of events and an unfortunate accident involving Dwarven ale and an open flame, a fallen alchemist makes preparations for a series of daring experiments in the hopes of restoring his name to former glory by finding a cure to the King’s mysterious Illness (and maybe discover the secret to eternal youth along the way). With a variety of strange and unusual ingredients at his disposal, chaos and disaster seem like just a matter of time.");
	}
}