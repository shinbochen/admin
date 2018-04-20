var 	g_oUser = new Object();
var 	g_userLastCilckTime	= new Date();

////////////////////////////////////////
//
function checkTimout(){
	var outTime 	= 30*60*1000;	
	
	var d = new Date();
	var oldTime = g_userLastCilckTime.getTime();
	var nowTime = d.getTime();
	
	if( nowTime - oldTime > outTime ){
		usedTimeout();
	}
	else{
		setTimeout( 'checkTimout()', outTime );
	}			
}

////////////////////////////////////////
//
function usedTimeout(){
	
	document.cookies = null;
	alert( MapTrackAdmin.lang.s_User );	
	Ajax( "", null,null, "logout.asp" );
	window.location.href="index.asp";
}
function UTCtoLocal( UTC ){

	var 	zone;
	var		d = new Date( UTC*1000 );	

	zone = d.getTimezoneOffset()*60*1000;
	
	d.setTime( d.getTime() + zone );
	return d;
}
function LocalToUTC( local ){
	
	var 	zone;
	var		d = new Date( local * 1000 );	

	zone = d.getTimezoneOffset()*60*1000;

	d.setTime( d.getTime() - zone );
	return d;		
}
function GetLocalTime(){
	var d = new Date();
	return d;
}
function getTimeStr( vDate ){
	
	var d = new Date( vDate );
	return d.toLocaleString();	
}
function getUserPrivilegeArrStr( ){
	var		result = new Array();
	for( var i = 0; i < LangUserPrivilege.length; i++ ){
		result.push( LangUserPrivilege[i].cen );		
	}		
	return result;
}	
function getUserPrivilegeStr( Privilege ){		
	for( var i = 0; i < LangUserPrivilege.length; i++ ){		
		if( LangUserPrivilege[i].type == Privilege ){
			return LangUserPrivilege[i].cen;
		}
	}
	return MapTrackAdmin.lang.s_Privilege;
}
function getUserPrivilegeByStr( str ){
	
	for( var i = 0; i < LangUserPrivilege.length; i++ ){		
		if( LangUserPrivilege[i].cen == str ){
			return LangUserPrivilege[i].type;
		}
	}
	return 255;
}
function getDETypeArrStr( ){
	
	var		result = new Array();
	for( var i = 0; i < LangDEType.length; i++ ){
		result.push( LangDEType[i].cen );		
	}
	return result;
}	
function getDETypeStr( nType ){
	
	nType = Number( nType );
	if( nType >= LangDEType.length ){
		nType = LangDEType.length-1;
	}
	for( var i = 0; i < LangDEType.length; i++ ){		
		if( LangDEType[i].type == nType ){
			break;
		}
	}
	return LangDEType[i].cen;
}
function getDETypeByStr( str ){
	
	for( var i = 0; i < LangDEType.length; i++ ){		
		if( LangDEType[i].cen == str ){
			return LangDEType[i].type;
		}
	}
	return 255;
}
function getColInfoIndex( colinfo, name ){
	if( !name || typeof(colinfo) != 'object' ){
		return null;
	}
	var len = colinfo.length;
	for( var i = 0; i < len; i++ ){
		if( name == colinfo[i].header ){
			return colinfo[i].dataIndex;
		}
	}
	return null;
}
function waiting(){
	if( Ext.getCmp('window_LoadWait') ){
		return;
	}
	
	var p = new Ext.ProgressBar({
		id		:	'ProgressBar_LoadWait'
	});
	p.wait({
		interval	: 	100, 
		increment	: 	15
	});
	var Window = new Ext.Window({
		id			:	'window_LoadWait',
	    title		: 	'Loading...',
	    resizable 	: 	false,
	    width		: 	200,
	    items		: 	p
	});
	Window.on('close',
		function(){
			if( Ext.getCmp('ProgressBar_LoadWait') ){
				Ext.getCmp('ProgressBar_LoadWait').reset( true );
			}
		}
	);
	Window.show();    
}
function wait_end(){
	if( Ext.getCmp('ProgressBar_LoadWait') ){
		Ext.getCmp('ProgressBar_LoadWait').reset( true );
	}
	if( Ext.getCmp('window_LoadWait') ){
		Ext.getCmp('window_LoadWait').close();
	}	
}
function Logout(){
	Ext.MessageBox.confirm(
		MapTrackAdmin.lang.s_Alert,
		"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
		+ MapTrackAdmin.lang.s_PleaseConfrim 
		+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
		function( e ){
			if( e=="yes" ){
				document.cookies = null;
				Ajax( "", null, null, "logout.asp" );
				window.location.href="index.asp";
			}
		}
	);
}
function log( Textarea ){
	this.text = " ";
	this.id = 0;
	
	this.add = function( str ){
		if( str ){
			str = str.toString();	
		}
		else{
			return;	
		}
		
		this.id++;
		var nowTime = GetLocalTime().toLocaleTimeString();
		this.text = this.id 
				 + ".-  "
				 + nowTime 
				 + "  "
				 + str
				 + "\n"
				 + this.text;
		
		this.show();
	}	
	this.show = function(){
		Textarea.setValue( this.text );
	}
}
function getGridArrData( columns, store ){
	if( !columns || !store ){
		//alert( "Download excel no data input ");
		return;
	}
	
	var arrData = new Array();
	arrData[0] = new Array();	
	
	//insert table head	
	var len = columns.length;
	for( var i=0; i<len; i++ ){
		if( columns[i].header ){
			arrData[0].push( columns[i].header );
		}
	}

	//insert data
	var RCount = store.getCount();
	for( var i=0; i<RCount; i++){
		arrData[ i+1 ] = new Array();
		var record = store.getAt(i);
		for( var n=0; n<len; n++){
			if( columns[n].dataIndex ){
				arrData[ i+1 ].push( record.get( columns[n].dataIndex ) );	
			}
		} 
	} 
	return arrData;
}
function DownloadExcel( arrData ){
	if( !arrData ){
		//alert("Create excel no input arrData");
		return;
	}
	
	var p = "<|>";
	var pp = "<||>";
	
	var strData = "";
	var len = arrData.length;
	for( var i=0; i<len; i++ ){

		strData += arrData[i][0];
		var rowLen = arrData[i].length;		
		for( var n=1; n<rowLen; n++ ){
			strData += p + arrData[i][n];
		}
		strData += pp;
	}
	strData = strData.substring( 0, strData.length - pp.length );

	if( waiting != null ){
		waiting();	
	}
	
	Ext.Ajax.request({
		method 	:	"POST",
		timeout :	180 * 1000,
		url			: "CreateExcel.asp",
		headers	: {
		   'charset'		:	'UTF-8'
		},
		params	: 	{
			Username	:	g_oUser.Username,
			strData		:	strData
		},
		success	: 	function(response) {
			if( wait_end != null ){
				wait_end();		
			}
			
			var RecvText = response.responseText;
			var Result = RecvText.split( p );
			if( Result[0] == "true" ){
				window.location.href = Result[1];
			}
			else{
				Ext.Msg.alert( MapTrackAdmin.lang.s_Alert, MapTrackAdmin.lang.s_downloadBusyWait );	
			}
		},
		failure	:	function(){
			if( showAjaxStatus != null ){
				showAjaxStatus('Timeout...');
			}
			if( wait_end != null ){
				wait_end();		
			}
			Ext.Msg.alert( MapTrackAdmin.lang.s_Alert, MapTrackAdmin.lang.s_downloadBusyWait );			
		}
	});
}
function initstorecfg( obj ){  	  
	for( var i = 0; i < obj.colinfo.length; i++ ){		
		
		var		indexname = obj.colinfo[i].index;
		
		if( obj.arrFieldName ){			
			obj.arrFieldName.push(  obj.colinfo[i].cen );			
		}
					
		obj.storecfg.push({ name: indexname });
		if( obj.colinfo[i].renderer != null ){
			obj.cmcfg.push({
				id				: indexname,
				dataIndex	: indexname,
				width			: obj.colinfo[i].width,
				header		: obj.colinfo[i].cen,
				renderer	:	obj.colinfo[i].renderer,
				sortable	: true
			});
		}
		else{
			obj.cmcfg.push({
				id				:	indexname,
				dataIndex	:	indexname,
				width			:	obj.colinfo[i].width,
				header		:	obj.colinfo[i].cen,
				sortable	:	true
			});
		}
		if( obj.colinfo[i].keyCol == 1 ){	
			obj.keycol = i;
			obj.keyFieldName = indexname;
		}
		if( obj.colinfo[i].searchCol == 1 ){
			obj.searchFiledName = indexname;
		}
		if( obj.colinfo[i].expand == 1 ){
			obj.expandId = indexname;
		}
	}	  
	obj.record = new Ext.data.Record.create( obj.storecfg );	
	obj.store = new Ext.data.Store({
    url			: obj.URL,
    reader	: new Ext.data.XmlReader(
	    {
				record			: obj.recordXMLTag,
				totalRecords: obj.totalXMLTag
			},
			obj.record	
		)
	});   
	return;
}
//alert("global is end");

