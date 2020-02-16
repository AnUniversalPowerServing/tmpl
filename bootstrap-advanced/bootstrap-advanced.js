/* Project Constants ::: Start */
var JSONURL_MESSAGES_SUCCESS = "";
var JSONURL_MESSAGES_WARNING = "";
/* Project Constants  ::: End */
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
function bootstrap_menu_contentTrigger(menuContentMapper, sel_Id){
 if(menuContentMapper[sel_Id]!==undefined){
   var allContents = menuContentMapper[sel_Id].contents;
   var all_contents = allContents.map(i=>'#'+i).toString();
   console.log("all_contents: "+all_contents);
   for(var menu in menuContentMapper){
     console.log("menu: "+menu);
     if(menu.length>0){ 
	    var contents = menuContentMapper[menu].contents.map(i=>'#'+i).toString();
	    $(contents).attr('class','hide-block'); 
	 }
	 menuContentMapper[sel_Id]["functions"]();
   }
   $(all_contents).removeAttr('class');
 }
}

function bootstrap_menu_trigger(menuContentMapper,mode, sel_Id,stepAllow){
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
 * || bootstrap_menu_trigger( { "navbar1":{ "contents":[],"functions":function(){ } }, ||
 * ||								   "navbar2":{ "contents":[],"functions":function(){ } }, ||
 * ||								   "navbar3":{ "contents":[],"functions":function(){ } }  ||
 * ||								 }, 'navbar','navbar2',2);                                ||                                                                          ||
 * ---------------------------------------------------------------------------------------------
 */
 var sel_mode = { "list-inline":"list-inline", "tabs" :"nav nav-tabs", "pills": "nav nav-pills", "navbar":"nav navbar-nav",
"badges":"step-badges" };
 console.log(mode+" "+sel_Id);
 if(mode==='badges'){
	/*var child = $('div.'+sel_mode[mode]).children();
	console.log('badges length: '+child.length);
	for(var index=0;index<child.length;index++){
	  console.log('badges: '+child.value);
	}*/
	var loop = 0;
	$('div.'+sel_mode[mode]).find('div>span').each(function(){
		var child = $(this).attr('id');
		console.log('badges content: '+child);
		if(child ===sel_Id){  return false; }
		else { loop++;}
	});
	
	if((loop<stepAllow) || stepAllow===-1){
		$('#'+sel_Id).parent('div').parent('div.step-badges').children('div').children('span').removeClass('active');
		$('#'+sel_Id).attr('class','badge active');
		bootstrap_menu_contentTrigger(menuContentMapper, sel_Id);
	}
 } else {
	if(($('ul.'+sel_mode[mode]+'>li#'+sel_Id).index()<=stepAllow) || stepAllow===-1){
		$('#'+sel_Id).parent('ul').children('li').removeAttr('class');
		$('#'+sel_Id).attr('class','active');
		bootstrap_menu_contentTrigger(menuContentMapper, sel_Id);
	}
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

/*****************************************************************************************************************************/
/************************************ bootstrap-advanced-alerts **************************************************************/
/*****************************************************************************************************************************/
function bootstrap_display_warning(div_Id,warning_Id){
js_ajax("GET",PROJECT_URL+'backend/config/warning_messages.json',{},function(response){
var content='<div class="alert alert-warning alert-dismissible" style="margin-bottom:0px;">';
    content+='<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
    content+='<strong>Warning!</strong> '+response[warning_Id][USR_LANG];
    content+='</div>';
 document.getElementById(div_Id).innerHTML=content;
});
}
function alert_display_warningByContent(data){
var content='<div class="modal-dialog">';
	content+='<div class="modal-content">';
    content+='<div class="modal-body" style="padding:0px;">';
    content+='<div class="alert alert-warning alert-dismissible" style="margin-bottom:0px;">';
    content+='<a href="#" class="close" data-dismiss="modal" aria-label="close">&times;</a>';
    content+=data;
    content+='</div>';
    content+='</div>';
    content+='</div>';
    content+='</div>';
var modalDivision = document.createElement("div"); 
    modalDivision.setAttribute("id", "alertWarningModal");
	modalDivision.setAttribute("class", "modal fade");
	modalDivision.setAttribute("role", "dialog");
 document.body.appendChild(modalDivision);  
 document.getElementById("alertWarningModal").innerHTML=content;
 $('#alertWarningModal').modal();
}
function alert_display_warning(warning_Id){
js_ajax("GET",PROJECT_URL+'backend/config/warning_messages.json',{},function(response){
var content='<div class="modal-dialog">';
	content+='<div class="modal-content">';
    content+='<div class="modal-body" style="padding:0px;">';
    content+='<div class="alert alert-warning alert-dismissible" style="margin-bottom:0px;">';
    content+='<a href="#" class="close" data-dismiss="modal" aria-label="close">&times;</a>';
    content+='<strong>Warning!</strong> '+response[warning_Id][USR_LANG];
    content+='</div>';
    content+='</div>';
    content+='</div>';
    content+='</div>';
var modalDivision = document.createElement("div"); 
    modalDivision.setAttribute("id", "alertWarningModal");
	modalDivision.setAttribute("class", "modal fade");
	modalDivision.setAttribute("role", "dialog");
 document.body.appendChild(modalDivision);  
 document.getElementById("alertWarningModal").innerHTML=content;
 $('#alertWarningModal').modal();
});
}
function div_display_success(div_Id,success_Id){
js_ajax("GET",PROJECT_URL+'backend/config/success_messages.json',{},function(response){
console.log(response);
var content='<div class="alert alert-success alert-dismissible" style="margin-bottom:0px;">';
    content+='<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
    content+='<strong>Success!</strong> '+response[success_Id][USR_LANG];
    content+='</div>';
 document.getElementById(div_Id).innerHTML=content;
});
}
function alert_display_success(success_Id,success_url){
js_ajax("GET",PROJECT_URL+'backend/config/success_messages.json',{},function(response){
var content='<div class="modal-dialog">';
	content+='<div class="modal-content">';
    content+='<div class="modal-body" style="padding:0px;">';
    content+='<div class="alert alert-success alert-dismissible" style="margin-bottom:0px;">';
    content+='<a href="#" onclick="javascript:urlTransfer(\''+success_url+'\');" class="close" data-dismiss="modal" ';
	content+='aria-label="close">&times;</a>';
    content+='<strong>Success!</strong> '+response[success_Id][USR_LANG];
    content+='</div>';
    content+='</div>';
    content+='</div>';
    content+='</div>';
var modalDivision = document.createElement("div"); 
    modalDivision.setAttribute("id", "alertSuccessModal");
	modalDivision.setAttribute("class", "modal fade");
	modalDivision.setAttribute("role", "dialog");
 document.body.appendChild(modalDivision);  
 document.getElementById("alertSuccessModal").innerHTML=content;
 $('#alertSuccessModal').modal({backdrop: "static"});
});
}
