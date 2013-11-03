#pragma strict

private var hit : RaycastHit;
var hasObjectRight : boolean = false;
var nameOfObjectRight;

function Update () {
	if (Physics.Raycast (transform.position, Vector3.up, hit, 5) && (hit.collider.tag == "basic" || hit.collider.tag == "mixed_lvl1" || hit.collider.tag == "mixed_lvl2")) {	
		hasObjectRight = true;
		nameOfObjectRight = hit.collider.name;
	}
	else {
		hasObjectRight = false;
		nameOfObjectRight = null;
	}
}

// Function to destroy the child of cauldronRightSlot when the new mix gets spawned in
function destroyObject() {
	Destroy(GameObject.Find(GameObject.Find("MixWizard").GetComponent(script_mixHandler).objectFromRightSlot), 0);
}