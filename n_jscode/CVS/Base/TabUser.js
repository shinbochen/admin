/*
 * date:2009-03-18
 * Copyright(c) 2008-2012, shinbo
 * shinbo@hotmail.com
 * status: modify
 * version:v2.02
 *
 */
function UserInfoDlg( config ){
	var self = this;
	var defConfig = {
		type							:	'show',      // 'show',  'edit',  'add'
		title							:	'UserInfoDlg',		
		width							:	500,
		height						:	300,
		privilegeeditable	:	true,	
		usereditable			:	true,
		userData					:	null,
		callback					:	null
	};
	
	Ext.apply( this, defConfig );
	Ext.apply( this, config);	
	self.text_user =  new Ext.form.TextField({
    fieldLabel	: '*'+MapTrackAdmin.lang.s_User, 
    allowBlank	: false,
    anchor			: '95%'
	});
	self.text_Password = new Ext.form.TextField({ 
    fieldLabel	: '*'+MapTrackAdmin.lang.s_Password, 
    allowBlank	: true,
    anchor			: '95%'  
  });
  self.button_ClrPsd = new Ext.Button({
		text			: MapTrackAdmin.lang.s_Clear,
		minWidth	:	75,
		handler 	: function(){ self.text_Password.setValue("");}
	});
  self.text_FName = new Ext.form.TextField({ 
    fieldLabel	: '*'+MapTrackAdmin.lang.s_FName,
    allowBlank	: false,
    anchor			: '95%'  
  });
	
  self.text_LName = new Ext.form.TextField({ 
    fieldLabel	: '*'+MapTrackAdmin.lang.s_LName,
    allowBlank	: false,
    anchor			: '95%'  
  });
	self.combox_Privilege = new Ext.form.ComboBox({
		fieldLabel		: '*'+MapTrackAdmin.lang.s_Privilege,
    store					: getUserPrivilegeArrStr(),
    editable 			:	false,
    typeAhead			: true,
    mode					: 'local',
    triggerAction	:	'all',
    selectOnFocus	:	true,
    readOnly 			: true,
    forceSelection:	true,
    allowBlank		:	false,
    anchor				:	'95%'
	});    
  self.number_Tel	= new Ext.form.TextField({
    fieldLabel	: MapTrackAdmin.lang.s_Tel,
    anchor			: '95%'  
  });    
	self.text_CoName = new Ext.form.TextField({
	  fieldLabel	: '*' + MapTrackAdmin.lang.s_CompanyName,
	  allowBlank	: false,
	  anchor			: '95%'
	});	
	self.text_CoAddr = new Ext.form.TextField({
		fieldLabel	: MapTrackAdmin.lang.s_Address,	 
		readOnly		: self.disable,
		anchor			: '95%'
	});		        	
	self.text_Emaill = new Ext.form.TextField({
    vtype				: 'email',
    fieldLabel	: MapTrackAdmin.lang.s_Emaill,
    anchor			: '95%'
	});	
	self.text_Remark = new Ext.form.TextField({
    fieldLabel	: MapTrackAdmin.lang.s_Remark,
    anchor			: '95%'
	});	
	self.button_Submit = new Ext.Button({
		text		: MapTrackAdmin.lang.s_Submit,
		minWidth:	75,
		handler : function(){ self.submit();}
	});		
	self.Items = new Ext.FormPanel({			
		baseCls		: 'x-plain',  
   	layout		: 'form',    
    items			: [
    
    {
			baseCls		: 'x-plain',
      layout		:	'column',
      items			:	[{
				baseCls			: 'x-plain',
				columnWidth	:	0.5, 
				layout			: 'form',   
				labelWidth	:	70,   
				items				: [
					self.text_user,
					self.text_Password, 
					self.text_FName]
				},{
    		baseCls			: 'x-plain',
    		columnWidth	:	0.5, 
    		layout			: 'form',   
      	labelWidth	:	70,   
      	items				:	[
		    	self.combox_Privilege,		    	
					self.button_ClrPsd,
					self.text_LName]
			}] 
    },
    {
			baseCls	: 'x-plain',
			height 	: 2
  	},
  	self.text_CoName,
  	self.text_CoAddr,
		self.number_Tel,
  	self.text_Emaill,
  	self.text_Remark
  	] 
	});		
	self.winobj = new Ext.Window({
    title			: self.title,
    resizable : false,
    width			: self.width,
    height		: self.height,
    bodyStyle	: 'padding:20px 0px 0px 20px;',
    items			:	self.Items,
    buttons		: [
								self.button_Submit,
								{
						       text			: MapTrackAdmin.lang.s_Close,
						       handler	: function(){self.winobj.close();}
								}
								]
	}); 	
	self.show = function( ){		
		var disabled = false;
		var userDisable = false;
		
		if( self.type == 'show' ){
			self.button_Submit.hide();
			disabled = true;
			userDisable = true;	
		}
		else if( self.type == 'edit' ){
			userDisable = true;
		}	
		self.text_user.disabled 			= userDisable;
		self.text_Password.disabled 	= true;
		self.text_FName.disabled 			= disabled;
		self.text_LName.disabled 			= disabled;
		self.combox_Privilege.disabled= disabled;
		self.number_Tel.disabled 			= disabled;
		self.text_CoName.disabled 		= disabled;
		self.text_CoAddr.disabled 			= disabled;
		self.text_Emaill.disabled 		= disabled;
		self.text_Remark.disabled 		= disabled;		
		
		
		if(	self.userData != null ){
			self.text_user.setValue( 				self.userData.user );
			self.text_Password.setValue( 		self.userData.psd );
			self.combox_Privilege.setValue( getUserPrivilegeStr( self.userData.privilege ) );
			self.text_FName.setValue( 			self.userData.fname );
			self.text_LName.setValue( 			self.userData.lname );
			self.number_Tel.setValue( 			self.userData.tel );
			self.text_CoName.setValue( 			self.userData.coname );
			self.text_CoAddr.setValue( 			self.userData.coaddr );
			self.text_Emaill.setValue( 			self.userData.email );
			self.text_Remark.setValue( 			self.userData.remark );
		}
		self.winobj.show();		
	};	
	self.submit = function(){
		if( !self.Items.form.isValid() ){
			return;
		}		
		if( self.callback != null ){
			self.callback({
				user			:	self.text_user.getValue(), 
				psd				:	self.text_Password.getValue(),
				privilege	: getUserPrivilegeByStr( self.combox_Privilege.getValue() ),
				fname			:	self.text_FName.getValue(), 
				lname			:	self.text_LName.getValue(), 
				coname		:	self.text_CoName.getValue(), 
				tel				:	self.number_Tel.getValue(), 
				coaddr		:	self.text_CoAddr.getValue(), 
				email			:	self.text_Emaill.getValue(), 
				remark		:	self.text_Remark.getValue(),
				validdate : new Date()			
			});
		}		
		self.winobj.close();
	};	
};

function EditUserTab( config ){
	
	var self = this;
	
	var defconfig = {
		title				:	'EditUserTab',
		URL					:	null,
		strSQL			:	null,
		start				:	0,
		colinfo			:	null,
		limit				:	30,
		recordXMLTag: null,
		totalXMLTag : null
	};
	
	Ext.apply( this, defconfig );
	Ext.apply( this, config );
	
	
	self.cmcfg = new Array();
	self.arrFieldName = new Array();
	self.storecfg = new Array();
	
	self.cmcfg.push(
		new Ext.grid.RowNumberer({
			renderer: function	( value, metadata, record, rowIndex){
				return self.start + 1 + rowIndex;
			}
		})
	);
	initstorecfg( self );	
	self.comboBox_Field = new Ext.form.ComboBox({
    store					: self.arrFieldName,
    value					:	self.arrFieldName[0],
    width					:	100,     
    typeAhead			: true,
    mode					: 'local',
    triggerAction	: 'all',
    selectOnFocus	:	true,
    readOnly 			: true,
    editable			: false,
    forceSelection:	true
	});
	self.text_Search = new Ext.form.TextField({
		width				:	130,
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
    readOnly 			: true,
    editable			: false,
    forceSelection: true
	});	
	self.comboBox_Limit.on('select',function( box, record, index ){
		self.limit = self.comboBox_Limit.getValue();
		self.pagBar.pageSize = self.limit;
		self.load();
	});	
	self.toolbar =  new Ext.Toolbar({
		items 	: 	[
			{   
				text		: MapTrackAdmin.lang.s_Show,
				handler	: function(){ self.show(); }
			},
			'-',
			{   
				text		: MapTrackAdmin.lang.s_Add,
				handler	:	function(){ self.add(); }
			},
			'-',
			{           
			    text		:	MapTrackAdmin.lang.s_Modify,
			    handler	:	function(){	self.modify(); }			    
			},
			'-',
			{
			    text		:	MapTrackAdmin.lang.s_Del,
			    handler	:	function(){	self.del(); }
			},
			'-',
			{
				text			:	MapTrackAdmin.lang.s_Refresh,	
				handler		:	function(){ self.load(); }
			},
			'-',
			self.comboBox_Field,
			self.text_Search,				
			{           	
			    text		:	MapTrackAdmin.lang.s_Search,
			    handler	:	function(){ self.search();	}
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
		doLoad 			: function( start ){
			self.start = start;
			self.store.load({
							params	: {	
								start	:	start, 
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
		store						: self.store,
		columns					:	self.cmcfg,
		autoExpandColumn: self.expandId,
		tbar						:	self.toolbar,
		bbar						:	self.pagBar, 
		autoSizeHeaders	:	true,	
		singleSelect 		:	true,
    bodyStyle				: 'border:0',
	  loadMask				: true,
		stripeRows			:	true,
	  trackMouseOver 	: true
	});
	self.rMenu = new Ext.menu.Menu({
    items : [{
		            text 		: MapTrackAdmin.lang.s_Show,
		            handler	:	function(){ self.show(); }        		
		        },{
		            text 		: MapTrackAdmin.lang.s_Add,
		            handler	:	function(){ self.add(); }
		        },{
		            text 		: MapTrackAdmin.lang.s_Modify,
		            handler	:	function(){ self.modify(); }
		        },{
		            text 		: MapTrackAdmin.lang.s_Del,
		            handler	:	function(){ self.del();}
		        }]
	});    
	self.grid.on( 
 		'cellcontextmenu', 
 		function( grid, rowIndex, cellIndex, e ){
			e.preventDefault();	
			self.grid.getSelectionModel().selectRow(rowIndex); 
			self.rMenu.showAt( e.getXY() );
		}
	); 
	self.load = function( SQL ){
		var strSQL = "";
		if( SQL ){
			strSQL = SQL;
		}
		else{
			strSQL = self.strSQL
		}
		self.store.load({
			params	: {
				start	:	self.start,
				limit	:	self.limit,
				sql		:	strSQL
			},
			callback: function(	arrRecord, options, success	){
				
				if( !success ){  
					Ext.Msg.alert( MapTrackAdmin.lang.s_Alert, MapTrackAdmin.lang.s_DBConnFail ); 
				} 	
			}
		});
	};	
	self.insertRecord = function( pos, obj ){
			var		n = 0;
      var 	record = new self.record({ex:'ex'});
      record.set( self.storecfg[n++].name, obj.user );
			record.set( self.storecfg[n++].name, obj.psd );
			record.set( self.storecfg[n++].name, obj.privilege );
			record.set( self.storecfg[n++].name, obj.fname );
			record.set( self.storecfg[n++].name, obj.lname );
			record.set( self.storecfg[n++].name, obj.tel );
			record.set( self.storecfg[n++].name, obj.coname );
			record.set( self.storecfg[n++].name, obj.coaddr );
			record.set( self.storecfg[n++].name, obj.email );
			record.set( self.storecfg[n++].name, obj.validdate );
			record.set( self.storecfg[n++].name, obj.remark );
			self.store.insert(pos, record );
	};		
	self.getdata = function( record ){
	
		
		var		result = new Object();
		
		result.user 			=record.get( self.colinfo[0].index );
		result.psd 				=record.get( self.colinfo[1].index );
		result.privilege 	=record.get( self.colinfo[2].index );
		result.fname 			=record.get( self.colinfo[3].index );
		result.lname 			=record.get( self.colinfo[4].index );
		result.tel 				=record.get( self.colinfo[5].index );
		result.coname 		=record.get( self.colinfo[6].index );
		result.coaddr 		=record.get( self.colinfo[7].index );
		result.email 			=record.get( self.colinfo[8].index );
		result.validdate	=record.get( self.colinfo[9].index );
		result.remark 		=record.get( self.colinfo[10].index );
		
		return result;		
	};			
	self.show = function(){
		var record = self.grid.getSelectionModel().getSelected();
		if( !record ){
			alert( MapTrackAdmin.lang.s_PLSSelectFirst );
			return;
		}		
		var dlg = new UserInfoDlg({
			type		:	'show',
			title		:	MapTrackAdmin.lang.s_Title_Show,
			userData:	self.getdata( record )
		});		
		dlg.show();		
	};	
	
	
	
	self.add = function( record ){
				
		var obj = new UserInfoDlg({
			type				:	'add',
			title				:	MapTrackAdmin.lang.s_Title_Add,
			callback		:	function( result ){
					if( typeof( result ) != "object" ){
						return;
					}					
				 	Ajax( CreateSQLAddUser( result ),
        		  	function(){self.insertRecord( self.store.getCount(), result );}
         	);	
			}
		});
		obj.show();	
	};	
	self.modify = function(){
		var record = self.grid.getSelectionModel().getSelected();
		if( !record ){
			alert( MapTrackAdmin.lang.s_PLSSelectFirst );
			return;
		}
		
		var obj = new UserInfoDlg({
			type		:	'edit',
			title		:	MapTrackAdmin.lang.s_Title_Edit,
			userData:	self.getdata( record ),
			callback:	function( result ){
					if( typeof( result ) != "object" ){
						return;
					}		
        	Ajax( CreateSQLModifyUser( result ),
        		  	function(){
									for( var i=0; i<self.store.getCount(); i++ ){
										var tmp = self.store.getAt(i).get( self.keyFieldName );	
										if( result.user == tmp ){			
											self.store.remove( self.store.getAt(i) ); 						
											self.insertRecord( i, result );	
											break;
										}
									}
								}
					);		
			}
		});
		obj.show();	
	};	
	self.del = function(){
		var record = self.grid.getSelectionModel().getSelected();
		if( !record ){
			alert( MapTrackAdmin.lang.s_PLSSelectFirst );
			return;
		}		
		var user = record.get( self.keyFieldName );
		
		Ext.Msg.confirm( 
			MapTrackAdmin.lang.s_Alert, 
			MapTrackAdmin.lang.s_Del + "&nbsp;&nbsp;" + user, 
			function( btn ){
				if( btn == "yes" ){
			    	Ajax( CreateSQLDelUser( user ),
			    	function(){ self.store.remove( record );} );					
				}
			}
		);		

	};	
	self.search = function(){
		var strField = self.comboBox_Field.getValue();
		var strContent = self.text_Search.getValue();
		if( strContent.length < 1 || strField.length < 1 ){
			self.load();
			return;
		}
		var field = getColInfoIndex( self.cmcfg, strField );
		if( field != null ){
			var cache = self.strSQL
								  + " where "
								  + field
								  + " like '%" 
								  + strContent 
								  +	"%';" ;					  			  
			self.load( cache );		
		}
	};
}