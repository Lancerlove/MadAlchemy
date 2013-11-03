#pragma strict

var quitMenu : boolean = false;
var itemPlaced :boolean = false;
function Start () {

}

function Update () {

	if(Input.GetKeyDown(KeyCode.Escape)) {
 
		quitMenu = !quitMenu;
 
	}

}
function OnGUI () {

GUI.Label(Rect(10,10,300,40), "Press ESC for Main Menu");

	if(itemPlaced == true) {
		GUI.Box(Rect(Screen.width -150, 10, 150, 200), "Ingredients on Table" + "\n\n" +
											  			 GameObject.Find("Player").GetComponent(main).itemsOnTable[0] + "\n" +
											  			 GameObject.Find("Player").GetComponent(main).itemsOnTable[1]);
	 }
 
	if(quitMenu == true) {
		
		
 		Time.timeScale = 0;
 		GameObject.Find("Player").GetComponent(MouseLook).enabled = false;
 		
 		if(GUI.Button(Rect(Screen.width/2, Screen.height / 1.3, 200,50), "Restart")) {
 			Application.LoadLevel(0);
 		}
		if(GUI.Button(Rect(Screen.width/2, Screen.height / 1.3+52, 200,50), "Quit")) {
 			Application.Quit();
 		}
 
	}
	
	else {
		Time.timeScale = 1;
		GameObject.Find("Player").GetComponent(MouseLook).enabled = true;
	}
 
}