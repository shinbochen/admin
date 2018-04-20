var		MainTabs = null;
var		oTabEditUser = null;
var 	oTabEditCar = null;
var 	oTabCarDistribute = null;
var 	oTabRegisterKey = null;
var 	leftCUMGrid = null;
var 	rightCUMGrid = null;
var 	leftCDUserList = null;
var 	rightCDOwnCar = null;
var 	leftCharge = null;
var 	rightCharge = null;
var		oDBManage = null;


var 	textLog = null;
var 	sysLog = null;

Ext.onReady(function(){
	
	document.getElementById("load").style.display = "none";
	Ext.BLANK_IMAGE_URL = 'ext/resources/images/default/s.gif';

	var WebTop = new Ext.BoxComponent({
		region  	: 	'north',
		bodyStyle	: 	'border:0',
		el				: 	'Top',
		height  	: 	30
  });	
    
	////////////////////////////////////
	//tab0
	//oDBManage = new ServerInfoPanel({
	//	URL			:	g_QuestDataURL
	//});
    
	////////////////////////////////////
	//tab1           						
	oTabEditUser = new EditUserTab({
		title				:	MapTrackAdmin.lang.s_User,
		URL					:	g_QuestDataURL,
		strSQL			:	g_SQL.getUserInfo,
		colinfo			:	LangUserList2Head,
		recordXMLTag: 'ITEM',
		totalXMLTag : 'TOTAL'	
	});
	
	////////////////////////////////////
	//tab2
	
	oTabEditCar  = new EditCarTab({
		title				:	MapTrackAdmin.lang.s_CarManage,
		URL					:	g_QuestDataURL,
		strSQL			:	g_SQL.getCarInfo,
		colinfo			:	LangCarListHead,
		recordXMLTag: 'ITEM',
		totalXMLTag : 'TOTAL'	
	});	
	
	////////////////////////////////////
	// tab3
	oTabCarDistribute = new CarDistribute({
		title			:	MapTrackAdmin.lang.s_CarDistribute,
		URL				:	g_QuestDataURL
	});
	
	////////////////////////////////////
	// tab4
	oTabUserDistribute = new UserDistribute({
		title			:	MapTrackAdmin.lang.s_SubUserDistribute,
		URL				:	g_QuestDataURL
		
	});
	
	oTabRegisterKey = new EditRegisterKeyTab({
		title				:	MapTrackAdmin.lang.s_RegisterKeyManage,
		URL					:	g_QuestDataURL,
		strSQL			:	g_SQL.getRegisterKeyInfo,
		colinfo			:	LangRegKeyListHead,
		recordXMLTag: 'ITEM',
		totalXMLTag : 'TOTAL'	
	});
	////////////////////////////////////
	//tab5
	rightCharge = new ChargeManage({
		region			:	"east",
		colinfo			:	LangUserList3Head,
		URL					:	g_QuestDataURL,
		width				:	600,
		recordXMLTag: 'ITEM',
		totalXMLTag : 'TOTAL',
		strSQL			:	g_SQL.getUserInfo
	});
	leftCharge = new oneColumnGrid({
		title				:	MapTrackAdmin.lang.s_AllUser,
		URL					:	g_QuestDataURL,
		strSQL			:	g_SQL.getUserInfo,
		strQuerySQL	:	g_SQL.getUserInfoSearch,		
		colinfo			:	LangUserList1Head,
		width				:	400,
		region			:	"west",
		recordXMLTag: 'ITEM',
		totalXMLTag : 'TOTAL',
		clickFunc		:	rightCharge.load
	});
	
	
	////////////////////////////////////
	////////////////////////////////////
	//main Tab panel
	MainTabs = new Ext.TabPanel({
		deferredRender			: true,
		monitorResize 			: true,
		layoutOnTabChange 	:	true,
		enableTabScroll			:	true,
		region							:	'center',
		bodyStyle						: 'border:0',
    margins   					: '3 3 3 0',
    autoWidth 					: true, 
    activeTab 					: 0,
    defaults  					: {autoScroll : true},
		items     					: [
		
	  	/*
			{
	  	////////////////////////
	  	//Data base Manage ( tab0 )
	  	title 		: MapTrackAdmin.lang.s_DatabaseStatus,
			layout		:	'fit',
			items			: [ oDBManage.show() ],
			listeners : { 
				activate 	: function(){
	                  	if( oDBManage.loadCount == 0 ){
	                  		setTimeout( 'oDBManage.load()', 500 );
	                  	}
	                	}
	          			}	    		
	  	},*/
	  	{
	  	////////////////////////
	  	//Edit user ( tab1 )
			title 		:	MapTrackAdmin.lang.s_User,
			layout		:	'fit',
			items			: [ oTabEditUser.grid ],
			listeners	: { 
				activate 	: function(){setTimeout( 'oTabEditUser.load()', 500 );}
	          			}
	   	},{
	 		////////////////////////
	 		//Edit Car
	    title   	:	MapTrackAdmin.lang.s_CarManage,
	    layout		:	'fit',
	    items   	:	[ oTabEditCar.grid ],
			listeners	: { 
				activate : 	function(){setTimeout( 'oTabEditCar.load()', 500 );}
	          			}
	   	}
	  	,{
			////////////////////////
			//User own car manage
			title			:	MapTrackAdmin.lang.s_RegisterKeyManage,	
			layout		:	'fit',
			bodyStyle	: 'border:0',
			items			:	[ oTabRegisterKey.grid ],
			listeners	:	{ 
				activate 	:	function(){setTimeout( 'oTabRegisterKey.load()', 500 );  }
	              	}
	  	},{
	   	////////////////////////
	   	// car distribute	   	
			title			:	MapTrackAdmin.lang.s_CarDistribute,
	    layout		:	'fit',
	    items   	:	[ oTabCarDistribute.panel_main ],
			listeners	: { 
				activate : 	function(){setTimeout( 'oTabCarDistribute.load()', 500 );}
	          			}
	   	
	  	},{ 
	 		////////////////////////
	 		//sub user manage 
			title			:	MapTrackAdmin.lang.s_SubUserDistribute,
			layout		:	'fit',
			items   	: [ oTabUserDistribute.panel_main ],
			listeners	:	{ 
				activate : 	function(){setTimeout( 'oTabUserDistribute.load()', 500 );}
	          			}
	  	}
	  	,{
			////////////////////////
			//Charge manage
			title			:	MapTrackAdmin.lang.s_ChargeMange,
			layout		:	'border',
			bodyStyle	: 'border:0',
			items			:	[ 
				    			leftCharge.grid,
				    			{
				    				baseCls	: 'x-plain',
				    				html		:	'&nbsp;',
				    				region	:	"center"
				    			}, 
				    			rightCharge.panel_main 
									],
			listeners	:	{ 
				activate :	function(){setTimeout( 'leftCharge.load()', 500 ); }
									}
	  	}]
	});	
	
	////////////////////////////////////
	//
	var mainPanel = new Ext.Panel({
		region  	: 'center',
		layout		:	'fit',
		bodyStyle	: 'border:0',
		tbar			:	[
							{
								xtype:'tbfill'
							},
							'-',
							{
								text			:	MapTrackAdmin.lang.s_Exit,
								pressed		: true,
								handler		:	function(){ Logout(); }
							}
		],
		items			:	MainTabs	
	});
	
	////////////////////////////////////
	// bottom log
	textLog = new Ext.form.TextArea({
		bodyStyle	: 'border:0',
		readOnly 	:	true
	});
	 
	var bottomLog = new Ext.Panel({		
		title				:	MapTrackAdmin.lang.s_Log,
		collapsible :	true,
		bodyStyle		: 'border:0',
		split				:	true,
		height			:	80,		
		region  		: 'south',
		layout			:	'fit',				
		items				:	textLog
	});
	
	///////////////////////////////////////
	// 
	var View = new Ext.Viewport({
		layout : 'border', 
		items  : [ 
						WebTop,
						mainPanel, 
						bottomLog 
						]
	});	
	if( sysLog == null ){
		sysLog = new log( textLog );
	}
	sysLog.add( g_oUser.Username + MapTrackAdmin.lang.s_Login );
	
	////////////////////////////////////
	checkTimout();
	Ext.getBody().on( 'click', function(){
		g_userLastCilckTime = new Date();	
	});	
});

