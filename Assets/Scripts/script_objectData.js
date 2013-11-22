#pragma strict
var positionSet:boolean = false;
var originalPosition: Vector3;
var originalRotation: Quaternion;

function Start () {
	if(positionSet == false) {
	// only store the initial value of the object for future use
	originalPosition = transform.position;
	originalRotation = transform.rotation;
	positionSet = true;
	}
}

function Update () {
}