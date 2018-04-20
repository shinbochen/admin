<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>::MapTrack BS Manager System::</title>
</head>
<%@ language="javascript"   CODEPAGE="65001"%>

<script language="javascript">		
var MapTrackAdmin={};	
var	lang = 0;
function redraw( ){	
	document.getElementById("DBSERVERIP").innerHTML = MapTrackAdmin.lang.s_DBServerIP + ":";
	document.getElementById("DBSERVERUSER").innerHTML = MapTrackAdmin.lang.s_DBServerUser + ":";
	document.getElementById("DBSERVERPSD").innerHTML = MapTrackAdmin.lang.s_DBServerPsd + ":";
	document.getElementById("ADMINUSER").innerHTML = MapTrackAdmin.lang.s_AdminUser + ":";
	document.getElementById("ADMINPSD").innerHTML = MapTrackAdmin.lang.s_AdminPsd + ":";
	document.getElementById("OK").value = " " + MapTrackAdmin.lang.s_Login + " ";
}
function changeScript( idname, srcfile ){
	
	var oldS=document.getElementById( idname );
	if(oldS){
		oldS.parentNode.removeChild(oldS);
	}
	
	var t=document.createElement('script');
	t.src=srcfile;
	t.type='text/javascript';
	t.id=idname;
	document.getElementsByTagName('head')[0].appendChild(t);	
}
function selectchange( ){	
	
	var obj = document.getElementById('LANG_ID');
	var index=obj.selectedIndex; //序号，取当前选中选项的序号	
	lang = index;
	if( lang == 1 ){
		changeScript( "userlang", "js/lang_cn.js" );		
	}
	else{
		changeScript( "userlang", "js/lang_en.js" );
	}
	redraw( );	
}
</script>	

<% 	
Session("isLogin")=0;
Session.timeout = 30;
	
var dbIP 			= Request("DBIP")+"";
var dbUser		= Request("DBUSER")+"";
var dbPSD			= Request("DBPSD")+"";
var adminUser	= Request("ADMINUSER")+"";
var adminPSD	= Request("ADMINPSD")+"";
var	lang			= Request("LANG")+"";	
var	flag			= Request("login");
	
if( flag == 1 ){

	var Conn = Server.CreateObject("ADODB.Connection"); 
	var rs =Server.CreateObject("ADODB.recordset"); 	
	var Connstr = "Provider=SQLOLEDB; "
							+ "Data Source="+ dbIP +"; "
							+ "UID="+ dbUser +"; "
							+ "PWD="+ dbPSD +"; "
							+ "DATABASE=MapTrack_DB;" ;	
	var strSQL = "select * "
						   + "from table_admin "
						   + "where "
						   + "ad_user='"+adminUser+"'"
						   + " AND "
						   + "ad_psd='"+adminPSD+"'"
						   + ";";	
	Response.write( Connstr + strSQL );
	try{	
		Conn.Open(Connstr);
		rs.Open (strSQL,Conn,1,1);
		
		var len = rs.recordcount;		
		rs.Close();				
		rs=null;
		Conn.Close(); 	
		Conn=null; 		
		
		if(	len > 0 ){
			Session.Contents.RemoveAll();
			Session("isLogin") 					= 1;			
			Session("dbIP") 						= dbIP;
			Session("dbUser") 					= dbUser;
			Session("dbPSD") 						= dbPSD;
			Session("adminUser") 				= adminUser;
			Session("adminPSD") 				= adminPSD;
			Session("lang")							= lang;
			Response.Redirect("manager.asp");	
			Response.End;
		}
		else{
			throw "ERRORUSER";   
		}
	}catch(e){
		var ErrorInfo="";
		if( e=="ERRORUSER" ){
			ErrorInfo = "UserError";
		}
		else{
			ErrorInfo = "ConnError";
		}
	}
}
%>		

<script language="javascript">
	var error = '"'+<%=ErrorInfo%>+'"';
	var alertInfo = " ";
	if( error == "UserError" ){
		alertInfo = MapTrackAdmin.lang.s_UserError;
	}
	else if( error == "ConnError" ){
		alertInfo = MapTrackAdmin.lang.s_DBConnFail;
	}
	else{
		alertInfo = "unknow error!";
	}
	alert( alertInfo );	
</script>

<script id='userlang' type="text/javascript" src="js/lang_en.js"></script>
<body  scroll="no" leftmargin="20"  topmargin="15"  style="font-size: 12px;">
<form method="post">
    <table width="100%" height="100%"  border="0">
        <tr>
            <td id="webTitle" align="center" height="20" style="font-size:22px;">
						::MapTrack BS Manage System::
						</td>
        </tr>
        <tr>
            <td align="center" height="20"></td>
        </tr>
        <tr>
            <td width="100%" align="center">
                <table width="400" border="0" >
                	<tr>
                		<td width="70" align="left" > 
		               		Language:		
                		</td>
                		<td align="left">
			                <select ID="LANG_ID"  name="LANG" size="1" onchange="selectchange()">
											<option selected value=0 >english</option>
											<option value = 1>中文</option>
											</select>
                		</td>
                	</tr>
                	
									<tr>
										<td id="DBSERVERIP" width="70" align="left">Database IP:</td>
										<td width="150" align="left" >
											<input name="DBIP" type="text"  size="30" value="211.154.139.226" style="width:200px;" />
										</td>
									</tr>
									
									<tr>
										<td id="DBSERVERUSER" align="left">Database User:</td>
										<td align="left">
											<input type="text" name="DBUSER" size="30" value="sa" style="width:200px;" />
										</td>
									</tr>
									<tr>
										<td id="DBSERVERPSD" align="left">Database Password:</td>
										<td align="left">
											<input name="DBPSD" type="password" size="32" value="saet101" style="width:200px;" />
										</td>
									</tr>
					
									<tr>
										<td height="15"></td>
										<td></td>
									</tr>
					
									<tr>
										<td id="ADMINUSER" align="left">Admin user:</td>
										<td align="left">
											<input name="ADMINUSER" type="text" size="30" value="admin" style="width:200px;" />
										</td>
									</tr>
									<tr>
										<td id="ADMINPSD" align="left">Admin password:</td>
										<td align="left">
											<input name="ADMINPSD"  type="password" size="32" value="adminet101" style="width:200px;" />
										</td>
									</tr>
									
									<tr>
										<td height="10"></td>
										<td></td>
									</tr>
									<tr>
										<td align="center" colspan=2>
											<input name='login' type=hidden value=1>
											<input id="OK" type="submit"  width = 200 value="  OK  ">
										</td>
									</tr>
                </table>
            </td>
        </tr>    
    </table>
</form>
<script language="javascript">
selectchange( );
</script>
</body>
</html>