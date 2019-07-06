/*****************************************************************************************************************************/
/************************************ bootstrap-advanced-inputvalidations ****************************************************/
/*****************************************************************************************************************************/

function bootstrap_formField_trigger(perform,field_Ids){
 if(perform.toLowerCase()==='remove'){
     if(Array.isArray(field_Ids)){
       for(var index=0;index<field_Ids.length;index++){ bootstrap_formField_hglRemove(field_Ids[index]); }
     } else { bootstrap_formField_hglRemove(field_Ids); }
 } else {
     if(Array.isArray(field_Ids)){
       for(var index=0;index<field_Ids.length;index++){ bootstrap_formField_addToField(perform,field_Ids[index]); }
     } else { bootstrap_formField_addToField(perform,field_Ids); }
 }
}

function bootstrap_formField_addToField(hglApply,field_Id){
 bootstrap_formField_hglRemove(field_Id);
 hglApply = hglApply.toLowerCase();
 var msg = { success:{ label:'inputSuccess', field:'has-success', icon:'glyphicon-ok', color:'#3c763d' },
		     warning:{ label:'inputWarning', field:'has-warning', icon:'glyphicon-warning-sign', color:'#8a6d3b' }, 
			 error:{ label:'inputError', field:'has-error', icon:'glyphicon-remove', color:'#a94442' }
		   };
 var tagName = document.getElementById(field_Id).tagName;
 var inputgroup = $('#'+field_Id).closest('div.input-group'); // Getting closest input-group
 var formgroup = $('#'+field_Id).closest('div.form-group'); // Getting closest form-group
 // Add to Class and for Attribute to label
     formgroup.children('label').attr('class','control-label').attr('for',msg[hglApply].label);
 // check inputgroup exists or not
 // IF EXISTS : 
 //           a) formgroup->label, wrap div with .has-success .has-feedback classes
 //           b) fiedl_Id->parent !=div[class='has-success has-feedback'], make it
 // ELSE (No Input-group exists in the form) : 
 //           Add .has-success .has-feedback classes to div.form-group
 if(inputgroup.length>0){
   if(formgroup.children('label').length>0){
      formgroup.children('label').wrap('<div class="'+msg[hglApply].field+' has-feedback"></div>');
   }
   if(!$('#'+field_Id).parent().hasClass(msg[hglApply].field+' has-feedback')){
    $('#'+field_Id).wrap('<div class="'+msg[hglApply].field+' has-feedback"></div>');
   }
 } else {
    formgroup.addClass(msg[hglApply].field+' has-feedback');
 }
 // glyphicon glyphicon-remove from-control-feedback
 if(tagName.toLowerCase()==='button'){
   if($('#'+field_Id+'>span[class="glyphicon '+msg[hglApply].icon+' form-control-feedback"]').length===0){
     $('#'+field_Id).append('<span class="glyphicon '+msg[hglApply].icon+' form-control-feedback"></span>');
   }
   $('#'+field_Id).css('border-color',msg[hglApply].color);
 } else { // If next to field_Id is not span, add it
    if(!$('#'+field_Id).next().is('span[class="glyphicon '+msg[hglApply].icon+' form-control-feedback"]')){
	  $('#'+field_Id).after('<span class="glyphicon '+msg[hglApply].icon+' form-control-feedback"></span>')
	}
 }
}

function bootstrap_formField_hglRemove(field_Id){
 var tagName = document.getElementById(field_Id).tagName;
 var inputgroup = $('#'+field_Id).closest('div.input-group'); // Getting closest input-group
 var formgroup = $('#'+field_Id).closest('div.form-group'); // Getting closest form-group
 // Check input-group exists or not
 // IF EXISTS a) form-group -> div[class="has-success has-feedback"]->label, make unwrap to remove
 //           b) field_Id->parent->div[class="has-success has-feedback", make it unwrap
 //           c) input-group->span[class="glyphicon glyphicon-remove form-control-feedback"], remove
 // ELSE (No Input group exists in the form)
 //   a) remove form-group with has-success has-feedback classes
 //   b) form-group->span[class="glyphicon glyphicon-remove form-control-feedback"], remove
  if(inputgroup.length>0){
   if(formgroup.children('div[class="has-success has-feedback"]').length>0){
     formgroup.children('div[class="has-success has-feedback"]').children('label').unwrap();
   }
   if(formgroup.children('div[class="has-warning has-feedback"]').length>0){
     formgroup.children('div[class="has-warning has-feedback"]').children('label').unwrap();
   }
   if(formgroup.children('div[class="has-error has-feedback"]').length>0){
     formgroup.children('div[class="has-error has-feedback"]').children('label').unwrap();
   }
   if($('#'+field_Id).parent().is('div[class="has-success has-feedback"]')){ $('#'+field_Id).unwrap(); }
   if($('#'+field_Id).parent().is('div[class="has-warning has-feedback"]')){ $('#'+field_Id).unwrap(); }
   if($('#'+field_Id).parent().is('div[class="has-error has-feedback"]')){ $('#'+field_Id).unwrap(); }
   if(tagName.toLowerCase()!=='button'){
       if(inputgroup.children('span').hasClass("glyphicon glyphicon-ok form-control-feedback")){
          inputgroup.children('span[class="glyphicon glyphicon-ok form-control-feedback"]').remove();
       }
	   if(inputgroup.children('span').hasClass("glyphicon glyphicon-warning-sign form-control-feedback")){
          inputgroup.children('span[class="glyphicon glyphicon-warning-sign form-control-feedback"]').remove();
       }
	   if(inputgroup.children('span').hasClass("glyphicon glyphicon-remove form-control-feedback")){
          inputgroup.children('span[class="glyphicon glyphicon-remove form-control-feedback"]').remove();
       }
	   
   } 
  } else {
      if(formgroup.hasClass('has-success has-feedback')){ formgroup.removeClass('has-success has-feedback'); }
	  if(formgroup.hasClass('has-warning has-feedback')){ formgroup.removeClass('has-warning has-feedback'); }
	  if(formgroup.hasClass('has-error has-feedback')){ formgroup.removeClass('has-error has-feedback'); }
	  
	  if(tagName.toLowerCase()!=='button'){
	    if(formgroup.children('label').hasClass("glyphicon glyphicon-ok form-control-feedback")){
		  formgroup.children('label').hasClass("glyphicon glyphicon-ok form-control-feedback").remove();
		}
		if(formgroup.children('label').hasClass("glyphicon glyphicon-warning-sign form-control-feedback")){
		  formgroup.children('label').hasClass("glyphicon glyphicon-warning-sign form-control-feedback").remove();
		}
		if(formgroup.children('label').hasClass("glyphicon glyphicon-remove form-control-feedback")){
		  formgroup.children('label').hasClass("glyphicon glyphicon-remove form-control-feedback").remove();
		}
	  }
	   
	   if(formgroup.children('span').hasClass("glyphicon glyphicon-ok form-control-feedback")){
          formgroup.children('span[class="glyphicon glyphicon-ok form-control-feedback"]').remove();
       }
	   if(formgroup.children('span').hasClass("glyphicon glyphicon-warning-sign form-control-feedback")){
          formgroup.children('span[class="glyphicon glyphicon-warning-sign form-control-feedback"]').remove();
       }
	   if(formgroup.children('span').hasClass("glyphicon glyphicon-remove form-control-feedback")){
          formgroup.children('span[class="glyphicon glyphicon-remove form-control-feedback"]').remove();
       }
  }
  if(tagName.toLowerCase()==='button'){
    if($('#'+field_Id+'>span[class="glyphicon glyphicon-ok form-control-feedback"]').length>0){
	  $('#'+field_Id+'>span[class="glyphicon glyphicon-ok form-control-feedback"]').remove();
	}
	if($('#'+field_Id+'>span[class="glyphicon glyphicon-warning-sign form-control-feedback"]').length>0){
	  $('#'+field_Id+'>span[class="glyphicon glyphicon-warning-sign form-control-feedback"]').remove();
	}
	if($('#'+field_Id+'>span[class="glyphicon glyphicon-remove form-control-feedback"]').length>0){
	  $('#'+field_Id+'>span[class="glyphicon glyphicon-remove form-control-feedback"]').remove();
	}
	$('#'+field_Id).removeAttr('style');
  }
  // Removing label class and for attributes
  formgroup.children('label').removeAttr('class').removeAttr('for');
}

/*****************************************************************************************************************************/
/************************************ bootstrap-advanced-tabPillsNav *********************************************************/
/*****************************************************************************************************************************/

function bootstrap_tabPillsNav_trigger(tabPillsNavbarContentMapper,mode, sel_Id,stepAllow){
/* ====================================
 * FUNCTION DESCRIPTION:
 * ====================================
 * 1) Select only related Tab/Pill/NavBar
 * 2) Allowing selection of Tab/Pill/NavBar from First Tab to Current Tab
 * _____________________________________________________________________________________________
 * || HTML CODE:                                                                              ||
 * ---------------------------------------------------------------------------------------------
 * || <ul class="nav navbar-nav">                                                             ||
 * ||   <li id="navbar1" class="active"><a href="#">Home</a></li>                             ||
 * ||   <li id="navbar2"><a href="#">Page 1</a></li>                                          ||
 * ||   <li id="navbar3"><a href="#">Page 2</a></li>                                          ||
 * ||   <li id="navbar4"><a href="#">Page 3</a></li>                                          ||
 * || </ul>                                                                                   ||
 * _____________________________________________________________________________________________
 * || JS TRIGGER CODE:                                                                        ||                                                                             ||  
 * ---------------------------------------------------------------------------------------------
 * || bootstrap_tabPillsNav_trigger( { "navbar1":{ "contents":[],"functions":function(){ } }, ||
 * ||								   "navbar2":{ "contents":[],"functions":function(){ } }, ||
 * ||								   "navbar3":{ "contents":[],"functions":function(){ } }  ||
 * ||								 }, 'navbar','navbar2',2);                                ||                                                                          ||
 * ---------------------------------------------------------------------------------------------
 */
 var sel_mode = { "tabs" :"nav nav-tabs", "pills": "nav nav-pills","navbar":"nav navbar-nav" }
 if(($('ul[class="'+sel_mode[mode]+'"]>li#'+sel_Id).index()<=stepAllow) || stepAllow===-1){
  $('#'+sel_Id).parent('ul[class="'+sel_mode[mode]+'"]').children('li').removeAttr('class');
  $('#'+sel_Id).attr('class','active');
  var contents = tabPillsNavbarContentMapper[sel_Id]["contents"];
  if(contents.length>0){
   contents = contents.map(i=>'#'+i).toString();
   $(contents).parent('div'),chilldren('div').attr('class','hide-block');
   $(contents).removeAttr('class');
  }
  tabPillsNavbarContentMapper[sel_Id]["functions"]();
 }
}


/*****************************************************************************************************************************/
/************************************ bootstrap-advanced-switch **************************************************************/
/*****************************************************************************************************************************/

function bootstrap_switch_loadup(){
/* ====================================
 * FUNCTION DESCRIPTION:
 * ====================================
 * This should be called before to activate the Bootstrap Toggle Feature.
 */
 $('input[data-toggle="toggle"]').bootstrapToggle();
}

function bootstrap_switch_radioMode(name,switchMapper){
/* ====================================
 * FUNCTION DESCRIPTION:
 * ====================================
 * Only one switch is to be activated, all other to be deactivated
 * ________________________________________________________________________________________________________________________
 * || HTML CODE:                                                                                                         ||
 * ------------------------------------------------------------------------------------------------------------------------
 * || <label class="checkbox-inline"><input type="checkbox" name="ranking" data-toggle="toggle" value="R1">First</label> ||                                                                    |
 * || <label class="checkbox-inline"><input type="checkbox" name="ranking" data-toggle="toggle" value="R2">Second</label>||      ||                                                                   |
 * || <label class="checkbox-inline"><input type="checkbox" name="ranking" data-toggle="toggle" value="R3">Third</label> ||       ||                                                               |
 * ________________________________________________________________________________________________________________________
 * || JS TRIGGER CODE:                                                                                                   ||                                                                             ||  
 * ------------------------------------------------------------------------------------------------------------------------
 * || bootstrap_switch_radioMode('ranking',{"R1":function(){ ...TRIGGER_R1_FUNCTIONS... },                               ||
 * ||                                       "R2":function(){ ...TRIGGER_R2_FUNCTIONS... },                               ||
 * ||                                       "R3":function(){ ...TRIGGER_R3_FUNCTIONS... }                                ||
 * ||                                      });                                                                           ||
 * ------------------------------------------------------------------------------------------------------------------------
 */
 var name_data ='[name="'+name+'"]';
 $(name_data).change(function(){
   if($(this).is(":checked")){ $(name_data).not(this).each(function(){ $(this).bootstrapToggle("off"); });
                               if(switchMapper[this.value]!==undefined){ switchMapper[this.value](); } }
 });
}