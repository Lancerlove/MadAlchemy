#pragma strict

public var mixSuccessful : boolean = false;
private var hit : RaycastHit;

function Update () {
	
	if (Physics.Raycast (transform.position, Vector3.up, hit, 5) && hit.collider.tag == "pickable") {	
		hit.collider.GetComponent(CheckDown).enabled = true;    // Enable Scripts on instances places on top	
	}
	if (Physics.Raycast (transform.position, Vector3.up, hit, 5) && hit.collider.tag == "mix") {	
		WindowTimer();											// Activate the pop-up
		hit.collider.name = "Essence of Dragon";				// Change the product name - This should be changed
																// to work with a list/array and read from that
		hit.collider.tag = "pickable";							// Make it pickable
	}
}

// Timer for pop-ups
function WindowTimer() {
	mixSuccessful = true; 
     yield WaitForSeconds(3);
    mixSuccessful = false;
}

function OnGUI() {

	if ( mixSuccessful == true) {
		GUI.Box(Rect(Screen.width / 2, 10, 400, 30),"Combination Successful. You have got " + hit.collider.name);

	}

}