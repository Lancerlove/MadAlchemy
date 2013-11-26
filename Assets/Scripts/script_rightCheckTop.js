#pragma strict

private var hit : RaycastHit;
var hasObjectRight : boolean = false;
var nameOfObjectRight: String;
var clonedObject:Transform;
var rate = 30;

function Update () {
	if (Physics.Raycast (transform.position, Vector3.up, hit, 10) && (hit.collider.tag == "basic" || hit.collider.tag == "mixed_lvl1" || hit.collider.tag == "mixed_lvl2")) {	
		hasObjectRight = true;
		nameOfObjectRight = hit.collider.name;
	}
	else {
		hasObjectRight = false;
		nameOfObjectRight = null;
	}
}

// Function to destroy the child of cauldronRightSlot when the new mix gets spawned in and replace the original object in the correct position on the table
function moveObject() {
	//get position and rotation
	var objPos = GameObject.Find(nameOfObjectRight).GetComponent(script_objectData).originalPosition;
	var objRot = GameObject.Find(nameOfObjectRight).GetComponent(script_objectData).originalRotation;

	//destroy and recreate object at original position
	Destroy(GameObject.Find(nameOfObjectRight), 0);
	clonedObject = Instantiate(GameObject.Find(nameOfObjectRight).transform, objPos, objRot);
	clonedObject.name = clonedObject.name.Substring(0, clonedObject.name.length - 7);
	clonedObject.GetComponent(script_objectData).enabled = true;
}

