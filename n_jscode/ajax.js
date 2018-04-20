var g_QuestDataURL = "data/getData.asp";
var g_ModifyDataURL = "data/ModifyData.asp";

////////////////////////////////////////
//
function Ajax( strSQL, SuccessFunc, FaileFunc, vURL ){
	waiting();	
	var QuestURL = null;
	if( vURL ){
		QuestURL = vURL;
	}
	else{
		QuestURL = g_QuestDataURL;
	}
	
	Ext.Ajax.request({
		method 	:	"POST",
		timeout :	180 * 1000,
		url			: QuestURL,
		params	: {
			sql		:	strSQL
		},
		success	: function( response ) {
			wait_end();
			var RecvText = response.responseText;

			if( RecvText == "1" ){
				if( SuccessFunc ){
					SuccessFunc();	
				}
				alert( MapTrackAdmin.lang.s_Success );
			}
			else if( RecvText == "0" ){
				if( FaileFunc ){
					FaileFunc();
				}	
				alert( MapTrackAdmin.lang.s_Fail );
			}
			else{
				alert( RecvText );
			}
		},
		failure	:	function(){
			wait_end();
			if( FaileFunc ){
				FaileFunc();
			}
			alert( MapTrackAdmin.lang.s_Fail );
		}
	});
}
////////////////////////////////////////
//All SQL str
var g_SQL = { 
	
	getUserInfo				:	"select * from table_user", 
	getUserInfoSearch	:	"select * from table_user where replacename like '%replacevalue%'", 
	
	getSuperUserInfo	:	"exec pro_admingetsuperuser ",
	getSuperUserInfoSearch:	"exec pro_admingetsuperuserbyco 'replacename', 'replacevalue'; ",
	addUser						:	"exec pro_adminadduser",
	modifyUser				:	"exec pro_adminmodifyuser",
	delUser						:	"exec pro_admindeluser",	
	
	getCarInfo				: "select * from table_device_data",
	getCarInfoSearch	: "select * from table_device_data where replacename like '%replacevalue%'", 
	addCar						:	"exec pro_adminaddcar",
	modifyCar					:	"exec pro_adminmodifycar",
	delCar						:	"exec pro_admindelcar",	
	searchUser				:	"exec pro_adminsearchuserbycar",
	
	
	
	getRegisterKeyInfo: "select * from table_register_key",
	delRegisterKey		: "exec pro_admindelkey",	
	addRegisterKey		: "exec pro_adminaddkey",
	
	
	addCarToUser			:	"exec pro_adminaddcartouser",
	delCarFmUser			:	"exec pro_admindelcarfmuser",
	setUserExpire			:	"exec pro_adminsetUserExpire",
	
	
	
	getSubUser				:	"exec pro_admingetsubuser",
	addSubUserToUser	:	"exec pro_adminaddsubusertouser",
	delSubUserFmUser	: "exec pro_admindelsubuserfmuser",
	
	
	getOwnCar					:	"exec pro_admingetownvehicle",
	getNotOwnCar			:	"exec pro_admingetnotownvehicle",
	
		
	getDBTableCount		:	"exec SQLGetDBTableCount ",
	getServerDiskSpace:	"exec SQLGetDiskSpace ",
	getDBFileSize			:	"select * FROM sysfiles ",
	getDBConfig				:	"select	* FROM table_Config ",
	
	setSaveTrackDay		:	"UPDATE AW_Config SET nSaveTrackDay = ",
	nowClearTrackTable:	"exec SQLDelOldTrackData ",
	setSaveImageURL		:	"UPDATE table_Config SET strSaveImageURl = ",
	setSaveImageNumber:	"UPDATE table_Config SET nSaveImageNumber = "
};
//////////////////////////////////
//
function CreateSQLAddUser( obj ){
	var strSQL = 	g_SQL.addUser 
								+ "'" + obj.user 	+ "',"
								+ "'" + obj.psd 	+ "',"
								+ obj.privilege 	+ ","
								+ "'" + obj.fname + "',"
								+ "'" + obj.lname + "',"
								+ "'" + obj.coname+ "',"
								+ "'" + obj.tel 	+ "',"
								+ "'" + obj.addr 	+ "',"
								+ "'" + obj.email + "',"
								+ "'" + obj.remark+ "'"
								+ ";";				
	return 	strSQL;
}
//////////////////////////////////
//
function CreateSQLModifyUser( obj ){
	var strSQL = g_SQL.modifyUser 
								+ " "
								+ "'" + obj.user 	+ "',"
								+ "'" + obj.psd 	+ "',"
								+ obj.privilege 	+ ","
								+ "'" + obj.fname + "',"
								+ "'" + obj.lname + "',"
								+ "'" + obj.coname+ "',"
								+ "'" + obj.tel 	+ "',"
								+ "'" + obj.addr 	+ "',"
								+ "'" + obj.email + "',"
								+ "'" + obj.remark+ "'"
								+ ";";				
			
	return 	strSQL;
}
//////////////////////////////////
//
function CreateSQLDelUser( user ){
	var strSQL = g_SQL.delUser 
								+ " "
								+ "'" + user + "'"
								+ ";";								
	return 	strSQL;
}
//////////////////////////////////
function CreateSQLGetUserInfo( user ){
	var strSQL = g_SQL.getUserInfo 
								+ " "
								+ "WHERE ur_vchr_user = "
								+ "'" + user + "'"
								+ ";";								
	return 	strSQL;
}

	
function CreateSQLAddSubUserToUser( obj 	){
	var strSQL = g_SQL.addSubUserToUser 
								+ " "
								+ "'" + obj.user + "',"
								+ "'" + obj.subuser.join('||') + "'"
								+ ";";								
	return 	strSQL;	
	
}

function CreateSQLDelSubUserFmUser( ){
	var strSQL = g_SQL.delSubUserFmUser 
								+ " "
								+ "'" + obj.user + "',"
								+ "'" + obj.subuser.join('||') + "'"
								+ ";";								
	return 	strSQL;	
}
//////////////////////////////////
//
function CreateSQLAddCar( obj ){
	var strSQL = g_SQL.addCar 
								+ " "
								+ "'" + obj.deuid + "',"
								+ "'" + obj.sim + "',"
								+ "'" + obj.license + "',"
								+ "'" + obj.fname + "',"
								+ "'" + obj.lname + "',"
								+ "'" + obj.tel + "',"
								+ "'" + obj.addr + "',"
								+ "'" + obj.remark + "',"
								+ obj.detype
								+ ";";	
			
	return 	strSQL;
}
//////////////////////////////////
function CreateSQLModifyCar( obj ){
	var strSQL = g_SQL.modifyCar 
								+ " "
								+ "'" + obj.deuid + "',"
								+ "'" + obj.sim + "',"
								+ "'" + obj.license + "',"
								+ "'" + obj.fname + "',"
								+ "'" + obj.lname + "',"
								+ "'" + obj.tel + "',"
								+ "'" + obj.addr + "',"
								+ "'" + obj.remark + "',"
								+ obj.detype
								+ ";";				
	return 	strSQL;
}
/////////////////////////////////
//
function CreateSQLDelCar( deuid ){
	var strSQL = g_SQL.delCar 
								+ " "
								+ "'" + deuid + "'";				
	return 	strSQL;
}	
/////////////////////////////////
//
function CreateSQLAddCarToUser( obj ){
	
	var strSQL = g_SQL.addCarToUser
								+ " "
								+ " '" + obj.user + "',"
								+ "'" + obj.deuid.join('||') + "'"
								+ ";";	
			
	return 	strSQL;
}
/////////////////////////////////
//
function CreateSQLDelCarFmUser( obj ){
	var strSQL = g_SQL.delCarFmUser
								+ " "
								+ " '" + obj.user + "',"
								+ "'" + obj.deuid.join('||') + "'"
								+ ";";
			
	return 	strSQL;
}
/////////////////////////////////
//
function CreateSQLSetUserExpire( obj ){
	var strSQL = g_SQL.setUserExpire
			+ " "
			+ "'" + obj.user + "',"
			+ "'" + obj.money + "',"
			+ "'" + obj.prevExpire+"',"
			+ "'" + obj.day + "',"		
			+ "'" + obj.remark +"'"
			+ ";";
	
	return strSQL;
	
}
/////////////////////////////////
//
function CreateSQLDelRegKey( key ){
	var strSQL = g_SQL.delRegisterKey
			+ " "
			+ "'" + key + "'"
			+ ";";	
	return strSQL;
	
}
/////////////////////////////////
function CreateSQLAddRegKey( obj ){
	var strSQL = g_SQL.addRegisterKey
			+ " "
			+ "'" + obj.deuid + "',"
			+  obj.detype + ","
			+  obj.privilege + ","
			+  obj.exprieday
			+ ";";				
	return strSQL;
	
}