var targetGui : GUITexture;
var hoverTex : Texture2D;
var normalTex : Texture2D;
var tickSound : AudioClip ;
 
function OnMouseEnter() {
targetGui.texture = hoverTex;

audio.PlayOneShot(tickSound);

}
 
function OnMouseExit() {
targetGui.texture = normalTex;
}
