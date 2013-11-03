#pragma strict

private var hit : RaycastHit;
var hasObjectLeft : boolean = false;
var nameOfObjectLeft;

function Update () {
	if (Physics.Raycast (transform.position, Vector3.up, hit, 5) && hit.collider.tag == "basic") {	
		hasObjectLeft = true;
		nameOfObjectLeft = hit.collider.name;
	}
	else
		hasObjectLeft = false;
}

// Function to destroy the child of cauldronLeftSlot when the new mix gets spawned in
function destroyObject() {
	Destroy(GameObject.Find("cauldronLeftSlot/" + GameObject.Find("MixWizard").GetComponent(script_mixHandler).objectFromLeftSlot), 0);
}