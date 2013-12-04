#pragma strict

public var difficulty: int = 0;

function Awake() {
	DontDestroyOnLoad(this);
}

function Update () {
	difficulty = GameObject.Find("Options").GetComponent(script_mainMenu_options).hSliderValue;
}