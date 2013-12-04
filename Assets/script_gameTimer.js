#pragma strict


var timer: float = 300; // time to complete the level
var difficulty;
var Timer:float = 3.0;
var checkTimer: boolean = false;
var once :boolean = true;

function Update(){
 	if(once) {
  		difficulty = GameObject.Find("settings").GetComponent(script_keepSettings).difficulty;
  			switch(difficulty) {
				case 0 : 
					timer = 600;
					break;
				case 1:
					timer = 300;
					break;
				case 2:
					timer = 150;
					break;
				default:
					timer = 600;
					break;
			}
  		once = false;
	}

  timer -= Time.deltaTime;
  if (timer > 0){
  	checkTimer = true;
  } else {
    checkTimer = false;
    Timer -= Time.deltaTime;
  }

  if(checkTimer == false && Timer <= 0) {
  	Application.LoadLevel("MainMenu");
  }
}
