#pragma strict

function Update () {

	var hit : RaycastHit;
	
	
		if (Physics.Raycast (transform.position, Vector3.forward, hit, 2)) {     // Send a ray to the left
		
			if(hit.collider.tag=="pickable") {  // If there's an object sitting there

				Destroy(gameObject, 0);   //Destroy both
				Destroy(hit.collider.gameObject,0);
				
				
				//Make a copy of the combined product
				Instantiate(GameObject.Find("Mix"), GameObject.Find("Table").transform.position,GameObject.Find("Table").transform.rotation);
				
				
			}
		}
	}
	
