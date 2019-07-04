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
 if(($('ul[class="'+sel_mode[mode]+'"]>li#'+sel_Id).index()<=stepAllow) ||){
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
 $(name_data).change(function){
   if($(this).is(":checked")){ $(name_data).not(this).each(function(){ $(this).bootstrapToggle("off"); });
                               if(switchMapper[this.value]!==undefined){ switchMapper[this.value](); } }
 });
}