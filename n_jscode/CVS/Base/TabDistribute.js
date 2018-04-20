/*
 * date:2009-03-18
 * Copyright(c) 2008-2012, shinbo
 * shinbo@hotmail.com
 * status: modify
 * version:v2.00
 *
 */


function oneColumnGrid( config ){

	var self = this;
	
	var defconfig = {		
		title				:	' ',
		oneSelect		:	true,
		region			:	'west',
		URL					:	null,
		strSQL			:	null,
		strQuerySQL	: null,
		start				:	0,
		limit				:	30,	
		loadCount		:	0,
		width				:	100,	
		colinfo			:	null,
		recordXMLTag: 'ITEM',
		totalXMLTag : 'TOTAL',
		clickFunc		:	null
	};
	
	Ext.apply( this, defconfig );
	Ext.apply( this, config );
	
	self.cmcfg = new Array();
	self.storecfg = new Array();	
	self.cmcfg.push(
		new Ext.grid.RowNumberer({
			renderer: function	( value, metadata, record, rowIndex){
				return self.start + 1 + rowIndex;
			}
		})
	);
	initstorecfg( self );	
	
	self.text_Search = new Ext.form.TextField({
	  width				:	80,
	  disabled		: (self.strQuerySQL == null) ? true : false,
		listeners		:	{   
			'specialkey' : function(txt, ev) {
				if (ev.getKey() == ev.ENTER) {self.search();}
			}
		}
	});
	self.comboBox_Limit = new Ext.form.ComboBox({
    store					:	[10,20,40,60,80,100,150,200,500],
    value					:	self.limit,  
    width					:	60,     
    typeAhead			: true,
    mode					: 'local',
    triggerAction	: 'all',
    selectOnFocus	:	true,
    readOnly 			:	true,
    editable			:	false,
    forceSelection: true
	});	
	self.comboBox_Limit.on('select',function( box, record, index ){
		self.limit = self.comboBox_Limit.getValue();
		self.pagBar.pageSize = self.limit;
		self.load();
	});
	self.toolbar =  new Ext.Toolbar({ 
		items : [
						{
							text		:	MapTrackAdmin.lang.s_Refresh,	
							handler	:	function(){ self.load(); }
						},
						'-',
						self.text_Search,
						{           	
					    text		: MapTrackAdmin.lang.s_Search,
					    handler	: function(){ self.search();	}
						},
						'-',
						MapTrackAdmin.lang.s_Show,
						self.comboBox_Limit
						] 
	});	
	self.pagBar = new Ext.PagingToolbar({
		store 			: self.store,
		pageSize 		: self.limit,
		displayInfo : true,
		displayMsg 	: "{0} - {1} / {2}",
		doLoad 			: function( start ){
			self.start = start;
			self.store.load({
				params	: {	
					start	:	self.start, 
					limit	:	self.limit, 
					sql		:	self.strSQL
				},
				callback	:	function( arrRecord, options, success ){
					if( !success ){
						Ext.Msg.alert( MapTrackAdmin.lang.s_Alert, MapTrackAdmin.lang.s_DBConnFail );	
					}
				} 	
			});
		}
	});	
	self.grid = new Ext.grid.GridPanel({
		title						:	self.title,
		store						: self.store,
		columns					:	self.cmcfg,
		autoExpandColumn: self.expandId,
		tbar						:	self.toolbar,
		bbar						: self.pagBar,
		region					:	self.region, 
		width						:	self.width,
		collapsible 		:	true,
		autoSizeHeaders	:	true,	
		singleSelect 		:	true,
    bodyStyle				: 'border:2',
	  loadMask				:	true,
		stripeRows			:	true,
	  trackMouseOver 	:	true
	});
  self.grid.on( 'click', function(){
  	var record = self.grid.getSelectionModel().getSelected();
  	
  	if( record ){  		  		
	  	if( self.clickFunc != null ){
	  		self.clickFunc( record.get(self.keyFieldName) );
	  	}  	
	  }
  });    
	self.load = function( SQL ){
		
		var strSQL = "";
		if( SQL ){
			if( self.strSQL == null ){
				self.strSQL = SQL;
			}
			strSQL = SQL;
		}
		else{
			strSQL = self.strSQL;
		}
				
		self.store.load({
			params	: {
				start	:	self.start,
				limit	:	self.limit,
				sql		:	strSQL
			},
			callback: 	function(	arrRecord, options, success	){
				if( !success ){ 
					Ext.Msg.alert( MapTrackAdmin.lang.s_Alert, MapTrackAdmin.lang.s_DBConnFail ); 
				}	 	
			}
		});
	};	
	self.search = function(){
		if( self.strQuerySQL != null ){
			var strContent = self.text_Search.getValue();
			
			if( strContent.length > 0 ){
				var	sql = self.strQuerySQL;
				
				sql = sql.replace( 'replacename', self.searchFiledName );
				sql = sql.replace( 'replacevalue', strContent );
				self.load( sql );
			}
			else{
				self.load();
			}
		}
		else{
			if( self.searchFiledName ){
				self.store.filter( 
					self.searchFiledName, 
					strContent, 
					true 
				);				
			}
			else{
				self.store.filter( 
					self.keyFieldName, 
					strContent, 
					true 
				);	
			}
		}
	};	
	self.getSelect = function(){
		var	result = new Array();
		var record = self.grid.getSelectionModel().getSelections();		
		for( var i = 0; i < record.length; i++ ){
			result.push( record[i].get( self.keyFieldName ) );
		}
		return result;
	};
}

function CarDistribute( config ){
	
	var self = this;
	
	var defconfig = {
		title					:	'CarDistrubute',
		URL						:	g_QuestDataURL
	};
	
	Ext.apply( self, defconfig );
	Ext.apply( self, config );
	
	self.left = new oneColumnGrid({
		title				:	MapTrackAdmin.lang.s_AllUser,
		URL					:	self.URL,
		strSQL			:	g_SQL.getUserInfo,
		strQuerySQL	:	g_SQL.getUserInfoSearch,	
		colinfo			:	LangUserList1Head,
		width				:	350,
		region			:	"west",
		recordXMLTag: 'ITEM',
		totalXMLTag : 'TOTAL',
		clickFunc		:	function( user ){
			self.user = user;
			self.panel_own.load( g_SQL.getOwnCar +"  "+ "'" +  user + "'" );
			//self.panel_distribute.load( g_SQL.getNotOwnCar +"  "+ "'" +  user + "'" );
		}	
	});		
	self.panel_own = new oneColumnGrid({
		title				:	MapTrackAdmin.lang.s_OwnCar,
		collapsible	: false,
		hiddenPage	:	false,
		bodyStyle		: 'border:2',
		URL					:	self.URL,
		colinfo			:	LangCarInfo2Head,
		width				:	350,
		limit				:	20,
		region			:	'west',
		recordXMLTag: 'ITEM',
		totalXMLTag : 'TOTAL',
		clickFunc		:	null
	});	
	self.panel_distribute = new oneColumnGrid({
		title				:	MapTrackAdmin.lang.s_WaitForDistributeCar,
		collapsible	: false,
		bodyStyle		: 'border:2',
		URL					:	self.URL,
		strSQL			:	g_SQL.getCarInfo,
		strQuerySQL	:	g_SQL.getCarInfoSearch,	
		colinfo			:	LangCarInfo2Head,
		width				:	350,
		region			:	"east",
		recordXMLTag: 'ITEM',
		totalXMLTag : 'TOTAL',
		clickFunc		:	null
	});	
	self.panel_button = new Ext.Panel({
		baseCls		: 'x-plain',
		bodyStyle	: 'border:0',
		region		:	'center',	
		layout		:	'form',
		width			: 40,
		items			:	[
			{
				html			:	'&nbsp;',
				baseCls		: 'x-plain',
				height		:	120	
			},{
				xtype			:	'button',
				text			:	'<<',
				handler		:	function(){ self.add(); }	
			},{
				html			:	'&nbsp;',
				baseCls		:	'x-plain',
				height		:	20	
			},{
				xtype			:	'button',
				text			:	'>>',
				handler		:	function(){ self.del(); }	
			}
		]
	});
	
	self.panel_main = new Ext.Panel({
		bodyStyle	: 'border:1',
		layout		:	'border',
		items			:	[
			self.left.grid,
			{
				baseCls	: 'x-plain',
				html		:	'&nbsp;',
				region	:	"center"
			}, 
			new Ext.Panel({
				width			: 750,
				bodyStyle	: 'border:1',
				region		: 'east',
				layout		: 'border',
				items			: 
				[ 							
							self.panel_own.grid,
							self.panel_button,
							self.panel_distribute.grid
				]
			})			
		]
	});	
	
	self.load = function(){
		self.left.load();
		self.panel_own.load();
		self.panel_distribute.load();
	};	
	self.add = function(){
		var arr = self.panel_distribute.getSelect();
		if( arr.length > 0 ){
			Ajax( 
				CreateSQLAddCarToUser({ 
					user	: self.user, 
					deuid	: arr }),
				function(){	self.load();}
			);
		}
	};	
	self.del = function(){
		
		var arr = self.panel_own.getSelect();
		if( arr.length > 0 ){
			Ajax( 
				CreateSQLDelCarFmUser({
					user 	: self.user,
					deuid	: arr }),
				function(){	self.load();}
			);
		}
	};
	self.load();	
}
function UserDistribute( config ){
	
	var self = this;
	
	var defconfig = {
		title					:	'UserDistrubute',
		URL						:	g_QuestDataURL
	};
	
	Ext.apply( self, defconfig );
	Ext.apply( self, config );
	
	self.left = new oneColumnGrid({
		title				:	MapTrackAdmin.lang.s_AllUser,
		URL					:	self.URL,
		strSQL			:	g_SQL.getSuperUserInfo,
		strQuerySQL	:	g_SQL.getSuperUserInfoSearch,	
		colinfo			:	LangUserList1Head,
		width				:	350,
		region			:	"west",
		recordXMLTag: 'ITEM',
		totalXMLTag : 'TOTAL',
		clickFunc		:	function( user ){
			self.user = user;
			self.panel_own.load( g_SQL.getSubUser +"  "+ "'" +  user + "'" );
		}	
	});		
	self.panel_own = new oneColumnGrid({
		title				:	MapTrackAdmin.lang.s_OwnUser,
		hiddenPage	:	true,
		bodyStyle		: 'border:2',
		URL					:	self.URL,
		colinfo			:	LangUserList1Head,
		width				:	350,
		limit				:	20,
		region			:	'west',
		recordXMLTag: 'ITEM',
		totalXMLTag : 'TOTAL',
		clickFunc		:	null
	});	
	self.panel_distribute = new oneColumnGrid({
		title				:	MapTrackAdmin.lang.s_WaitForDistributeUsr,
		bodyStyle		: 'border:2',
		URL					:	self.URL,
		strSQL			:	g_SQL.getUserInfo,
		strQuerySQL	:	g_SQL.getUserInfoSearch,	
		colinfo			:	LangUserList1Head,
		width				:	350,
		limit				:	20,
		region			:	"east",
		recordXMLTag: 'ITEM',
		totalXMLTag : 'TOTAL',
		clickFunc		:	null
	});	
	self.panel_button = new Ext.Panel({
		baseCls		: 'x-plain',
		bodyStyle	: 'border:0',
		region		:	'center',	
		layout		:	'form',
		width			: 40,
		items			:	[
			{
				html			:	'&nbsp;',
				baseCls		: 'x-plain',
				height		:	120	
			},{
				xtype			:	'button',
				text			:	'<<',
				handler		:	function(){ self.add(); }	
			},{
				html			:	'&nbsp;',
				baseCls		:	'x-plain',
				height		:	20	
			},{
				xtype			:	'button',
				text			:	'>>',
				handler		:	function(){ self.del(); }	
			}
		]
	});
	self.panel_main = new Ext.Panel({
		bodyStyle	: 'border:1',
		layout		:	'border',
		items			:	[
			self.left.grid,
			new Ext.Panel({
				width			: 15,
				bodyStyle	: 'border:1',
				region		: 'center',
				layout		: 'border',
				items			: [{
							html			:	'&nbsp;',
							baseCls		:	'x-plain'
				}]
			}),			
			new Ext.Panel({
				width			: 750,
				bodyStyle	: 'border:1',
				region		: 'east',
				layout		: 'border',
				items			: 
				[ 							
							self.panel_own.grid,
							self.panel_button,
							self.panel_distribute.grid
				]
			})			
		]
	});	
	
	self.load = function(){
		self.left.load();
		self.panel_own.load();
		self.panel_distribute.load();
	};	
	self.add = function(){
		var arr = self.panel_distribute.getSelect();
		if( arr.length > 0 ){
			Ajax( 
				CreateSQLAddSubUserToUser({
					user 		: self.user,
					subuser	: arr}),
				function(){	self.load();}
			);
		}
	};	
	self.del = function(){
		
		var arr = self.panel_own.getSelect();
		if( arr.length > 0 ){
			Ajax( 
				CreateSQLDelSubUserfmUser({
					user 		: self.user, 
					subuser	: arr }),
				function(){	self.load();}
			);
		}
	};	
	self.load( );
}