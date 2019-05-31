/***************************************************************************************************************************
 *************************************************** LOAD-DATA-ON-SCROLL ***************************************************
 ***************************************************************************************************************************
 * This JS is used to load unlimited of data in limited manner.                                                            *
 *                                                                                                                         *
 * HTML CODE:                                                                                                              *
 * --------------------------------                                                                                        *
 * | <div id="searchload0"></div> |                                                                                        *
 * --------------------------------                                                                                        *
 * "searchload" is an Id. As unlimited Data is loaded in limited manner, initial count is considered as 0.                 *
 * Therefore, Division Id is mentioned as "searchload0".                                                                   *
 *                                                                                                                         *
 * JAVASCRIPT CODE:                                                                                                        *
 * STEP-1: First, Write a Custom Function, Where fetch your data from Database with startlimit and Endlimit.               *
 * --------------------------------------------------------------------------------                                        *
 * | function contentData(div_view, appendContent,limit_start,limit_end){         |                                        *
 * |   // As Database contains unlimited rows,                                    |                                        *
 * |   // "limit_start" mentions starting rowNumber where data is to fetch.       |                                        *
 * |   // "limit_end" mentions end rowNumber upto where data is to fetch.         |                                        *
 * |  var content='';                                                             |                                        *
 * |   // Write your Code here                                                    |                                        *
 * |  content+=appendContent; // Appendcontent to content                         |                                        *
 * |  document.getElementById(div_view).innerHTML=content;                        |                                        *
 * | }                                                                            |                                        *
 * --------------------------------------------------------------------------------                                        *
 * STEP-2: Call the Following Function where it should be triggered.                                                       *
 * --------------------------------------------------------------------------------------------------------------          *
 * |  scroll_loadInitializer('searchload',10,contentData,total_data); // division_Id,display_limit,functionName |          *
 * --------------------------------------------------------------------------------------------------------------          *
 * In above Syntax, "searchload" is an identity we mentioned in Division.                                                  *
 *                  10 is the display_limit, which fetch this many rows from Database.                                     *
 *                  contentData is the functionName that returns content data from Database.                               *
 *                                                                                                                         *
 ***************************************************************************************************************************
 ***************************************************************************************************************************
 ***************************************************************************************************************************/

function scroll_loadInitializer(div_load_id,display_limit,contentData,total_data){
  js_setHashMap(div_load_id+"_idCount",0); // This Mentions about Div Id's where data is to be displayed.
  js_setHashMap(div_load_id+"_displayLimit",display_limit); // This Mentions limit of Data that to be displayed as Data.
  js_setHashMap(div_load_id+"_totalData",total_data); // Total Data exists in Length
  js_setHashMap(div_load_id+"_limitStart",0);

  scroll_loadData(div_load_id,contentData);
  $(window).scroll(function () {
    if($("#"+div_load_id+js_getHashMap(div_load_id+"_idCount")).offset()!==undefined) {
		var offset = $("#"+div_load_id+js_getHashMap(div_load_id+"_idCount")).offset().top-$(window).height();
		var totalData=js_getHashMap(div_load_id+"_totalData");
		var display_limit=js_getHashMap(div_load_id+"_displayLimit");
		var div_Data=((js_getHashMap(div_load_id+"_idCount")+1)*display_limit);
		var limit_start=js_getHashMap(div_load_id+"_limitStart");
		
		if ($(window).scrollTop() >= offset) {
			scroll_loadData(div_load_id,contentData);
		}
	}
  });  
}

function scroll_loadData(div_load_id,contentData){
  var limit_start=js_getHashMap(div_load_id+"_limitStart");
  var limit_end=js_getHashMap(div_load_id+"_displayLimit");
  var totalData=js_getHashMap(div_load_id+"_totalData");
  if(limit_start===0 && limit_end===0 && totalData===0) {
	  var div_load_idCurCount=js_getHashMap(div_load_id+"_idCount");
	  var div_view=div_load_id+div_load_idCurCount;
	  contentData(div_view,'',0,0);
  }
  else if(limit_start<=totalData){
    var div_load_idCurCount=js_getHashMap(div_load_id+"_idCount");
    var div_load_idNxtCount=div_load_idCurCount+1;
    var div_view=div_load_id+div_load_idCurCount;
	appendContent='<div id="'+div_load_id+div_load_idNxtCount+'"></div>';
	contentData(div_view, appendContent,limit_start,limit_end);
	/* Settings */
	js_setHashMap(div_load_id+"_idCount",div_load_idNxtCount);
	js_setHashMap(div_load_id+"_limitStart",limit_start+limit_end);
  }
}

