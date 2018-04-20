var	LIMITUSER 			= 0;
var	NORMALUSER 			= 1;
var	SUPERUSER				= 2;
var LangUserPrivilege = [
  {cen:MapTrackAdmin.lang.s_Privilege_LimitUser,		type:LIMITUSER},
  {cen:MapTrackAdmin.lang.s_Privilege_NormalUser,	type:NORMALUSER},
  {cen:MapTrackAdmin.lang.s_Privilege_SuperUser,		type:SUPERUSER}
];
var	DETYPE_STANDARD_A	= 0;
var	DETYPE_STANDARD_B	= 1;
var	DETYPE_ENHANCE	= 2;
var	DETYPE_ADVANCE	= 3;
var	DETYPE_SIMAPLE_A	= 4;
var	DETYPE_SIMAPLE_B	= 5;
var	DETYPE_SIMAPLE_C	= 6;
var	DETYPE_SIMAPLE_D	= 7;

var	LangDEType = [
	{cen:MapTrackAdmin.lang.s_DEType_StandardA, 		type:DETYPE_STANDARD_A},
	{cen:MapTrackAdmin.lang.s_DEType_StandardB, 		type:DETYPE_STANDARD_B},
	{cen:MapTrackAdmin.lang.s_DEType_SimpleA,				type:DETYPE_SIMAPLE_A},
	{cen:MapTrackAdmin.lang.s_DEType_SimpleB,				type:DETYPE_SIMAPLE_B},
	{cen:MapTrackAdmin.lang.s_DEType_SimpleC,				type:DETYPE_SIMAPLE_C},
	{cen:MapTrackAdmin.lang.s_DEType_SimpleD,				type:DETYPE_SIMAPLE_D},
	{cen:MapTrackAdmin.lang.s_DEType_Enhance,				type:DETYPE_ENHANCE},
	{cen:MapTrackAdmin.lang.s_DEType_Advance,				type:DETYPE_ADVANCE}
	
];
var	LangUserListHead = [
	{cen:MapTrackAdmin.lang.s_User,			index:"ur_vchr_user",		width:50,		keyCol:1, 	expand:1, searchCol:1 }
];
var	LangUserList1Head = [
	{cen:MapTrackAdmin.lang.s_User,			index:"ur_vchr_user",		width:50,		keyCol:1, 	expand:1, searchCol:1 },	
	{cen:MapTrackAdmin.lang.s_Privilege,  index:"ur_sint_privilege",width: 80,	keyCol: 0,	renderer:getUserPrivilegeStr}
];
var LangUserList2Head = [
  {cen:MapTrackAdmin.lang.s_User, 			index:"ur_vchr_user",			width: 80,	keyCol: 1, searchCol:1 },
  {cen:MapTrackAdmin.lang.s_Password, 	index:"ur_vchr_psd",			width: 80,	keyCol: 0 },
  {cen:MapTrackAdmin.lang.s_Privilege,  index:"ur_sint_privilege",width: 80,	keyCol: 0,	renderer:getUserPrivilegeStr},
  {cen:MapTrackAdmin.lang.s_FName, 			index:"ur_vchr_fname",		width: 80,	keyCol: 0 },
  {cen:MapTrackAdmin.lang.s_LName, 			index:"ur_vchr_lname",		width: 80,	keyCol: 0 },
  {cen:MapTrackAdmin.lang.s_Tel,				index:"ur_vchr_tel",			width: 100,	keyCol: 0 },
  {cen:MapTrackAdmin.lang.s_CompanyName,index:"ur_vchr_coname",		width: 150,	keyCol: 0 },
  {cen:MapTrackAdmin.lang.s_Address, 		index:"ur_vchr_addr",			width: 150,	keyCol: 0 },   
	{cen:MapTrackAdmin.lang.s_Emaill, 		index:"ur_vchr_email",		width: 95,	keyCol: 0 },
	{cen:MapTrackAdmin.lang.s_ValidDate, 	index:"ur_date_expire",		width: 100,	keyCol: 0, renderer:getTimeStr },
	{cen:MapTrackAdmin.lang.s_Remark, 		index:"ur_vchr_remark",		width: 100,	keyCol: 0, 	expand:1 }
];


////////////////////////////////////////
//
var LangCarListHead = [
  {cen:MapTrackAdmin.lang.s_License, 	index:"cr_vchr_license",width: 100,	keyCol: 0 },
  {cen:MapTrackAdmin.lang.s_DEUID, 		index:"cr_vchr_deuid",	width: 100,	keyCol: 1 },
 	{cen:MapTrackAdmin.lang.s_DEType, 		index:"cr_tint_type",		width: 100,	keyCol: 0, renderer:getDETypeStr },
  {cen:MapTrackAdmin.lang.s_Sim,				index:"cr_vchr_desim",	width: 100,	keyCol: 0 },
  {cen:MapTrackAdmin.lang.s_FName,			index:"cr_vchr_fname",	width: 100,	keyCol: 0 },
  {cen:MapTrackAdmin.lang.s_LName,			index:"cr_vchr_lname",	width: 100,	keyCol: 0 },
  {cen:MapTrackAdmin.lang.s_Tel, 			index:"cr_vchr_tel",		width: 100,	keyCol: 0 },   
	{cen:MapTrackAdmin.lang.s_Address, 	index:"cr_vchr_addr",		width: 150,	keyCol: 0 },
	{cen:MapTrackAdmin.lang.s_Remark, 		index:"cr_vchr_remark",	width: 100,	keyCol: 0, expand:1 }
];

 
var	LangCarInfo2Head = [
	{cen:MapTrackAdmin.lang.s_DEUID,			index:'cr_vchr_deuid',		width: 1, keyCol:1 },
	{cen:MapTrackAdmin.lang.s_License,		index:'cr_vchr_license',	width: 80, expand:1, searchCol:1 }	
];

var LangRegKeyListHead = [
  {cen:MapTrackAdmin.lang.s_DEUID, 			index:"rk_vchr_key",			width: 100,	keyCol: 1 },
  {cen:MapTrackAdmin.lang.s_DEType, 		index:"rk_tint_type",			width: 100,	keyCol: 0, renderer:getDETypeStr },
 	{cen:MapTrackAdmin.lang.s_Privilege,	index:"rk_tint_privilege",width: 100,	keyCol: 0, renderer:getUserPrivilegeStr },
  {cen:MapTrackAdmin.lang.s_ValidDate,	index:"rk_expire_day",		width: 100,	keyCol: 0 },
  {cen:MapTrackAdmin.lang.s_UsedStatus,	index:"rk_b_usedflag",		width: 100,	keyCol: 0 },
  {cen:MapTrackAdmin.lang.s_RegUser,		index:"rk_vchr_reguser",	width: 100,	keyCol: 0 },
  {cen:MapTrackAdmin.lang.s_RegTime, 		index:"rk_date_regtime",	width: 100,	keyCol: 0 },   
	{cen:MapTrackAdmin.lang.s_RegIP, 			index:"rk_vchr_regip",		width: 150,	keyCol: 0 }
];

 
var LangUserList3Head = [
	{cen:MapTrackAdmin.lang.s_User, 				index:"ur_vchr_user",				width: 100,	keyCol: 1, searchCol:1 },  
  {cen:MapTrackAdmin.lang.s_PrevExpire, 	index:"ur_date_expire",			width: 100 }
];
