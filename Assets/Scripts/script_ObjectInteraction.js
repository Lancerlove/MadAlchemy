#pragma downcast
/*
Major variables declaration
*/
var validHit : boolean = false;					// boolean for turning on GUI
var holdsItem : boolean = false;				// check number of items in hand
var clonedObject:Transform;						// clone of the destroyed instance
private var changeState : boolean = true;		// holds the state of mousebutton
var hit : RaycastHit; 							// The object that was hit
var rate = 30;
var isRecipeBook = false;

function Update()
{
	// Store offset of picked item
	var pickPos: Vector3 = Vector3(0.7, -0.2, 0.7);	

	// the ray is shooting from the center of the screen/camera
	var ray : Ray = Camera.main.ScreenPointToRay(Vector3(Screen.width/2, Screen.height/2, Camera.main.nearClipPlane));	// The ray - Middle of the screen

	if (Physics.Raycast (ray, hit, 20)) {
		
		// If hit is a pickable object
		if (hit.collider.tag == "basic" || hit.collider.tag == "mixed_lvl1" || hit.collider.tag == "mixed_lvl2") {
			
			// and you have no item in hand
			if (holdsItem == false) {
				
				// display GUI messages
				isRecipeBook = false;
				validHit = true;												
				GameObject.Find("GUIController").SendMessage("OnGUI"); 	// send GUI status to script_GUIController
				
					// if the left mouse button is pressed
					if(Input.GetMouseButtonUp(0)) 	{					
					
					//if changeState is at default
					if(changeState) {
						validHit = false;											// hide GUI message
						Destroy(hit.collider.gameObject, 0);						// destroy the hit object
						clonedObject = Instantiate(hit.collider.transform, transform.position, Quaternion(0,0,0,0)); 	// instantiate the object to player's position
						clonedObject.name = clonedObject.name.Substring(0, clonedObject.name.length - 7);	// Remove (Clone) from object's name
						clonedObject.parent = Camera.main.transform;				// parent to camera
						clonedObject.transform.localPosition = pickPos;				// and place it in front of the camera
						holdsItem = true;											// changes state of item picked
						changeState = false;										// changes state of mouse click
					}
				}
			}
			
		}
		// if the crosshair is pointed at the camera
		else if (hit.collider.name == "cauldron") { 
			print(hit.collider.name);
			// hide GUI message saying the name of the Item
			validHit = false;
			isRecipeBook = false;	

			//update GUI status(whether to display the pickup text or not)
			GameObject.Find("GUIController").SendMessage("OnGUI");		
			
			// if Left click to drop
			if(Input.GetMouseButtonUp(0) && changeState == false) {  

				//and if the left slot is free(added to block more than 2 objects being added at a time)  
				if(GameObject.Find("cauldronLeftSlot").GetComponent(script_leftCheckTop).hasObjectLeft == false) {
					
					//update the mouse status and pick status
					holdsItem = false;											
					changeState = true;
					
					// if the right slot is free, move the object to rightSlot position and parent
					if(GameObject.Find("cauldronRightSlot").GetComponent(script_rightCheckTop).hasObjectRight == false) {										
						clonedObject.parent = null;	
						MoveObj(clonedObject.transform.position + Vector3(0,0.3,0), GameObject.Find("cauldronRightSlot").transform.position+ Vector3(0, 0.2, 0));	
						//clonedObject.transform.position = GameObject.Find("cauldronRightSlot").transform.position + Vector3(0,0.2,0);
						//clonedObject.parent = GameObject.Find("cauldronRightSlot").transform;
						clonedObject.transform.rotation = GameObject.Find("cauldronRightSlot").transform.rotation;
					}
					// if the left slot is free, move the object to leftSlot position and parent
					else {
						clonedObject.parent = null;	
						MoveObj(clonedObject.transform.position + Vector3(0,0.3,0), GameObject.Find("cauldronLeftSlot").transform.position+ Vector3(0, 0.2, 0));		
						//clonedObject.transform.position = GameObject.Find("cauldronLeftSlot").transform.position + Vector3(0,0.2,0);
						//clonedObject.parent = GameObject.Find("cauldronLeftSlot").transform;
						clonedObject.transform.rotation = GameObject.Find("cauldronLeftSlot").transform.rotation;
					}
				}
			}
		}
		else if(hit.collider.name == "table") {
			// hide GUI message saying the name of the Item
			validHit = false;	
			isRecipeBook = false;

			//update GUI status(whether to display the pickup text or not)
			GameObject.Find("GUIController").SendMessage("OnGUI");		
			
			// if Left click to drop
			if(Input.GetMouseButtonUp(0) && changeState == false) {  

				// Send a ray from the middle of the screen and if it hits, get the info
				if(Physics.Raycast(ray,hit)) {
					//update states
					holdsItem = false;											
					changeState = true;

					//unparent object and move it at the collision point - y position is original * half of object's size
					clonedObject.parent = null;
					MoveObj(clonedObject.transform.position,hit.point + Vector3(0, clonedObject.collider.bounds.size.y/2, 0) )	;	
					//clonedObject.transform.position = hit.point + Vector3(0, clonedObject.collider.bounds.size.y/2, 0);
					clonedObject.transform.rotation = Quaternion(0,0,0,0);
				}

			}
		}
		else if(hit.collider.name == "recipeBook") {
			isRecipeBook = true;
			GameObject.Find("GUIController").SendMessage("OnGUI");		
		}
		// if hit didn't match the above collisions
		else {
			validHit = false;
			isRecipeBook = false;
			//update messages
			GameObject.Find("GUIController").SendMessage("OnGUI");

			if(Input.GetMouseButtonUp(0) && changeState == false) {
				clonedObject.parent = null;	// unparent object from 'hand'

				// enable script on instance
				GameObject.Find(clonedObject.name).GetComponent(script_objectData).enabled = true;
				
				// move back to original position and rotation
				MoveObj(clonedObject.transform.position, GameObject.Find(clonedObject.name).GetComponent(script_objectData).originalPosition);
				//clonedObject.transform.position = GameObject.Find(clonedObject.name).GetComponent(script_objectData).originalPosition;
				clonedObject.transform.rotation = GameObject.Find(clonedObject.name).GetComponent(script_objectData).originalRotation; 
				
				//update states
				changeState = true;		
				holdsItem = false;		
			}
		}
	}	
}

function MoveObj( oldPos : Vector3, newPos : Vector3 ){
    var t : float = 0.0;
 
    while (t < 1.5) {
        clonedObject.transform.position = Vector3.Slerp(oldPos, newPos, t);
        yield;
        t += Time.deltaTime * rate * 2;
    }
}



