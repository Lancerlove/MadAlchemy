#pragma strict
var originalPosition: Vector3;
var originalRotation: Quaternion;

function Start () {
	// only store the initial value of the object for future use
	originalPosition = transform.position;
	originalRotation = transform.rotation;
}

function Update () {

}