#pragma strict

private var hit : RaycastHit;
var hasObjectLeft : boolean = false;
var nameOfObjectLeft;
var clonedObject:Transform;

function Update () {
	if (Physics.Raycast (transform.position, Vector3.up, hit, 10) && (hit.collider.tag == "basic" || hit.collider.tag == "mixed_lvl1" || hit.collider.tag == "mixed_lvl2")) {	
		hasObjectLeft = true;
		nameOfObjectLeft = hit.collider.name;
	}
	else {
		hasObjectLeft = false;
		nameOfObjectLeft = null;
	}
}

// Function to destroy the child of cauldronLeftSlot when the new mix gets spawned in
function moveObject() {
	var objPos = GameObject.Find(GameObject.Find("MixWizard").GetComponent(script_mixHandler).objectFromLeftSlot).GetComponent(script_objectData).originalPosition;
	var objRot = GameObject.Find(GameObject.Find("MixWizard").GetComponent(script_mixHandler).objectFromLeftSlot).GetComponent(script_objectData).originalRotation;

	Destroy(GameObject.Find(GameObject.Find("MixWizard").GetComponent(script_mixHandler).objectFromLeftSlot), 0);
	clonedObject = Instantiate(GameObject.Find(GameObject.Find("MixWizard").GetComponent(script_mixHandler).objectFromLeftSlot).transform, objPos, objRot);
	clonedObject.name = clonedObject.name.Substring(0, clonedObject.name.length - 7);
	clonedObject.GetComponent(script_objectData).enabled = true;
}