

var Rawang = Rawang || {};

//Make changes to onActorOk

Rawang.Scene_Battle_onActorOk = Scene_Battle.prototype.onActorOk;
Scene_Battle.prototype.onActorOk = function() {
	switch (this._actorCommandWindow.currentSymbol()) {
		//Check if used certain item
		case 'item':
		
			switch ($gameParty.lastItem().id){
				case 12:
					this.checkConfirmation();
				break;
				
				default:
				Rawang.Scene_Battle_onActorOk.call(this);
			}
		break;
		
		//Default
		default:
		Rawang.Scene_Battle_onActorOk.call(this);
		alert("default");
	}
	
};

//If used certain item,show text & choices
Scene_Battle.prototype.checkConfirmation = function() {
	$gameMessage.add("Hello!");
	const choices = ["Continue", "Cancel"];
	$gameMessage.setChoices(choices, 0, 0);
	$gameMessage.setChoiceBackground(0);
	$gameMessage.setChoicePositionType(1);
	$gameMessage.setChoiceCallback(
	
	/*
	I want to achieve that code will run after players make their choice,
	then decided whether procceed or return to the item page
	
	I have no idea this is possible or not
	
	I know using "this" keyword wont work
	However, I have no idea how to make it run anymore.
	
	I tried using Scene_Battle.prototype.calresolution.call/bind/apply, or simply just Scene_Battle.prototype.calresolution()
	None of those works, they either show "xxx is not a function", "cannot read index of undefined" , or they will simply cause the game to freeze.
	
	I tried save the "this" keyword from this function to a gameVariable:
	$gameVariables.setValue(52, this);
	
	and call it in the next function (calresolution)
	var calobj = $gameVariables.value(52);
	then change "this" keyword to calobj
	eg. this._actorWindow.hide(); => calobj._actorWindow.hide();
    and this simply freeze the game after the calresolution function is called.
	*/
	
		function(choice){
			this.calresolution();
		});
	
	
};

//this is basically the Original code of Scene_Battle.prototype.onActorOk;
Scene_Battle.prototype.calresolution = function() {
    var action = BattleManager.inputtingAction();
    action.setTarget(this._actorWindow.index());
	this._actorWindow.hide();
    this._skillWindow.hide();
    this._itemWindow.hide();
    this.selectNextCommand();
};
