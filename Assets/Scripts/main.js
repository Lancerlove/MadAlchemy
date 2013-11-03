#pragma strict

private var validHit = false;
private var pickedItems = 0;
private var clonedObject:Transform;	
var tableCount = Array();
var itemsOnTable = Array(2);
function Update () {
	
	
	var pickPos: Vector3 = Vector3(1, -0.6, 1.5);// offset of picked item
	var hit : RaycastHit; 	// The object that was hit
	var ray : Ray = Camera.main.ScreenPointToRay(Vector3(Screen.width/2, Screen.height/2, Camera.main.nearClipPlane));// The ray - Middle of the screen
	
	if (Physics.Raycast (ray, hit,100) && hit.collider.tag == "pickable" && pickedItems < 1) // if the middle of the screen is perpendicular to the object 
	{													
		validHit = true;													// display GUI message
		
															
			if(Input.GetKeyUp( "mouse 0" )) 									// and the letter 'e' is pressed
			{
				validHit = false;											// hide GUI message
				Destroy(hit.collider.gameObject, 0);						// destroy the hit object
				clonedObject = Instantiate(hit.collider.transform, transform.position, transform.rotation); 	// instantiate the object to player's position
				clonedObject.parent = Camera.main.transform;				// parent to camera
				clonedObject.transform.localPosition = pickPos;				// and place it in front of the camera
				pickedItems = 1;												// increment the item counter


			}
			
	}
	else {
		validHit=false;		// hide GUI message
		if(pickedItems == 1) { // Disable R if no object is in hand
		if(Input.GetKeyUp( "r" )) {	// if R is pressed
			if(Physics.Raycast ( ray, hit, 3 ) && hit.collider.name == "Table") {   // if the player is facing the table
				
				clonedObject.name = clonedObject.name.Substring(0, clonedObject.name.length - 7); // Remove (CLone) from object's name
				tableCount.push(clonedObject); 
				
				GameObject.Find("mainMenuController").GetComponent(menu).itemPlaced = true;	//Modify the menu script
				if(tableCount.length == 1) 
				{
					clonedObject.transform.position = hit.collider.transform.position + Vector3(0,1,-1);
					clonedObject.GetComponent(Rigidbody).useGravity = true;
					clonedObject.parent = null;
					pickedItems = 0;
					itemsOnTable[0] = clonedObject.name;
				}
				else if(tableCount.length == 2) 
				{
					clonedObject.transform.position = hit.collider.transform.position + Vector3(0,1,1);
					clonedObject.GetComponent(Rigidbody).useGravity = true;
					clonedObject.parent = null;
					pickedItems = 0;
					itemsOnTable[1] = clonedObject.name;
					GameObject.Find("mainMenuController").GetComponent(menu).itemPlaced = false;
				}
			
				
			}
			else 
			{   // otherwise, just drop the item
				clonedObject.parent = null;
				clonedObject.GetComponent(Rigidbody).useGravity = true;	// tick gravity
				pickedItems = 0;
			}
		}
		}
	}



	
// If user hits Esc, the game quits	
/*if(Input.GetKeyDown( "escape" )) {
    Application.Quit();
}*/



}
// GUI Function
function OnGUI () {
	if(validHit == true) {
		GUI.Label (Rect (Screen.width/2, Screen.height/2, 100, 20), "Press E to pick up!");
	}
	
	if(pickedItems == 1) {
	GUI.Label (Rect (Screen.width/2, Screen.height/2, 100, 20), "Press R to drop the item!");
	}
	

}