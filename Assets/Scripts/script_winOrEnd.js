#pragma strict
var targetCombination:String;
var elementsArray:Array;
var mix;
var playerWon:boolean = false;
var playerLost:boolean = false;
elementsArray = ["GoldThorn","Potion of Ghostwalk","Stoneskin Potion","Potion of Impenetrable Will","Liquid Gold","Philosopher's Stone","Elixir of Transcendence","Instant Freeze Dust","Healing Potion","Orb of Scrying","Dust of Magic-Negation","Smoke of Eternity","Potion of Luck"];
var Timer:float = 3.0;

targetCombination = elementsArray[Random.Range(0, elementsArray.length)].ToString();
print(targetCombination);

function Start () {

}

function Update () {

	mix = GameObject.Find("MixWizard").GetComponent(script_mixHandler).resultedMix;
	if(mix == targetCombination) {
		playerWon = true;
	}

	else if(GameObject.Find("stabIndicator").GetComponent(script_StabilityIndicator).counter <= -3) {
		playerLost = true;
	}

	if((playerWon == true || playerLost == true) && Timer > 0 ) {
		Timer -= Time.deltaTime;
	}
	else if((playerWon == true || playerLost == true) && Timer <= 0){
		Application.LoadLevel("MainMenu");
	}
}