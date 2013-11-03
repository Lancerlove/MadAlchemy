#pragma strict

private var hit : RaycastHit;
var hasObjectLeft : boolean = false;
var nameOfObjectLeft;

function Update () {
	if (Physics.Raycast (transform.position, Vector3.up, hit, 5) && (hit.collider.tag == "basic" || hit.collider.tag == "mixed_lvl1" || hit.collider.tag == "mixed_lvl2")) {	
		hasObjectLeft = true;
		nameOfObjectLeft = hit.collider.name;
	}
	else {
		hasObjectLeft = false;
		nameOfObjectLeft = null;
	}
}

// Function to destroy the child of cauldronLeftSlot when the new mix gets spawned in
function destroyObject() {
	Destroy(GameObject.Find(GameObject.Find("MixWizard").GetComponent(script_mixHandler).objectFromLeftSlot), 0);
}