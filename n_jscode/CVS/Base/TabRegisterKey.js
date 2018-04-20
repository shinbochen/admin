/*
 * date:2009-03-18
 * Copyright(c) 2008-2012, shinbo
 * shinbo@hotmail.com
 * status: modify
 * version:v2.00
 *
 */


function RegKeyInfoDlg( config ){

	var self = this;
	var defconfig = {					
		title						:	'RegKeyInfoDlg',
		width						:	300,
		height					:	280,
		disabled				:	false,
		Username				:	null,
		carData					:	null,
		callbackfunc		: null
	};
	Ext.apply( self, defconfig );
	Ext.apply( self, config );
	
	self.text_DEUID = new Ext.form.TextField({	
    fieldLabel	: '*'+MapTrackAdmin.lang.s_DEUID,
    allowBlank	: false,
    anchor			: '95%' 
	});
	self.comboBox_DEType = new Ext.form.ComboBox({
		fieldLabel		: '*'+MapTrackAdmin.lang.s_DEType,
	  store					: getDETypeArrStr(),
	  editable 			:	false,
	  typeAhead			: true,
	  mode					: 'local',
	  triggerAction	: 'all',
	  selectOnFocus	:	true,
	  readOnly 			: true,
	  forceSelection:	true,
	  allowBlank		:	false,
	  anchor				: '95%'
	});		
	self.comboBox_privilege = new Ext.form.ComboBox({
		fieldLabel		: '*'+MapTrackAdmin.lang.s_Privilege,
	  store					: getUserPrivilegeArrStr(),
	  editable 			:	false,
	  typeAhead			: true,
	  mode					: 'local',
	  triggerAction	: 'all',
	  selectOnFocus	:	true,
	  readOnly 			: true,
	  forceSelection:	true,
	  allowBlank		:	false,
	  anchor				: '95%'
	});		                
	self.number_expireDay = new Ext.form.NumberField({
    fieldLabel	: '*'+MapTrackAdmin.lang.s_ValidDate,       
    allowBlank	: false,  
    anchor			: '95%' 
	});	
	self.button_Submit = new Ext.Button({
		text			: MapTrackAdmin.lang.s_Submit,
		minWidth	:	75,
		handler 	: function(){ self.submit();}
	});
	self.Items = new Ext.FormPanel({
		baseCls		: 'x-plain',  
   	layout		: 'form',    
    items			: [
        self.text_DEUID,
        self.number_expireDay,
        self.comboBox_DEType,
				self.comboBox_privilege
        ]
	});	
	
	self.winobj = new Ext.Window({
		title				:	self.title,
    resizable 	: false,
    width				: self.width,
    height			: self.height,
    bodyStyle		: 'padding:20px 0px 0px 20px;',
    items				: self.Items,
    buttons			: [
    	self.button_Submit,
    	{
        text		: 	MapTrackAdmin.lang.s_Close,
        handler	: 	function(){ self.winobj.close();}
    	}
    ]
	});	
	
	self.show = function(){	
		self.winobj.show();
	}		
	self.submit = function(){
		if( !self.Items.form.isValid() ){
			return;
		}
		
		if( self.callbackfunc != null ){
			self.callbackfunc({
				deuid			:	self.text_DEUID.getValue(),
				detype		:	getDETypeByStr( self.comboBox_DEType.getValue() ),
				privilege	:	getUserPrivilegeByStr( self.comboBox_privilege.getValue() ),
				exprieday	: self.number_expireDay.getValue()
			});
		}
		self.winobj.close();
	}	
}



////////////////////////////////////////
//
function EditRegisterKeyTab( config ){
	
	var self = this;
	
	var defconfig = {
		title				:	'EditRegisterKeyTab',
		URL					:	null,
		strSQL			:	null,
		start				:	0,
		colinfo			:	null,
		limit				:	30,
		recordXMLTag: null,
		totalXMLTag : null
	}
	
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
		width			:	130,
		listeners	:	{   
			'specialkey' : function(txt, ev) {
				if (ev.getKey() == ev.ENTER) {self.search();}
			}
		}
	}),

	self.comboBox_Limit = new Ext.form.ComboBox({
    store					: [10,20,40,60,80,100,150,200,500],
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
				text		:	MapTrackAdmin.lang.s_Add,
				handler	:	function(){ self.add(); }
			},
			'-',
			{
			    text		: MapTrackAdmin.lang.s_Del,
			    handler	: function(){	self.del(); }
			},
			'-',
			{
				text		:	MapTrackAdmin.lang.s_Refresh,	
				handler	:	function(){ self.load(); }
			},
			'-',
			self.comboBox_Field,
			self.text_Search,				
			{           	
			    text	: 	MapTrackAdmin.lang.s_Search,
			    handler	: 	function(){ self.search();	}
			},
			'-',
			MapTrackAdmin.lang.s_Show,
			self.comboBox_Limit	
		]    
	});
		
	self.pagBar = new Ext.PagingToolbar({
	  store 			:	self.store,
		pageSize 		:	self.limit,
		displayInfo :	true,
		doLoad 			: function( start ){
				self.start = start;
				self.store.load({
						params	: {	
						start		:	start, 
						limit		:	self.limit, 
						sql			:	self.strSQL
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
		stripeRows			: true,
	  trackMouseOver 	: true
	});

	self.rMenu = new Ext.menu.Menu({
    items : [
    		{
          text 	: 	MapTrackAdmin.lang.s_Add,
          handler	:	function(){ self.add(); }
        },{
          text 		: 	MapTrackAdmin.lang.s_Del,
          handler	:	function(){ self.del();}
        }
    			]
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
			params	: 	{
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
	}	
	self.insertRecord = function( pos, obj ){
			var		n = 0;
      var 	record = new self.record({ex:'ex'});
      record.set( self.storecfg[n++].name, obj.deuid );
			record.set( self.storecfg[n++].name, obj.detype );
			record.set( self.storecfg[n++].name, obj.privilege );
			record.set( self.storecfg[n++].name, obj.exprieday );
			self.store.insert(pos, record );
	}	
	self.add = function( record ){
		var dlg = new RegKeyInfoDlg({
			title		:	MapTrackAdmin.lang.s_Title_Add,
			callbackfunc:	function( result ){
					if( typeof( result ) != "object" ){
						return;
					}
					Ajax( 	CreateSQLAddRegKey( result ),
	            		function(){ self.insertRecord( self.store.getCount(), result );} 
	            );	
			}
		});
		dlg.show();	
	}
	self.del = function(){
		var record = self.grid.getSelectionModel().getSelected();
		if( !record ){
			alert( MapTrackAdmin.lang.s_PLSSelectFirst );
			return;
		}
		var deuid = record.get( self.keyFieldName );
		
		Ext.Msg.confirm( 
			MapTrackAdmin.lang.s_Alert, 
			MapTrackAdmin.lang.s_Del + "&nbsp;&nbsp;" + record.get(self.colinfo[0].index), 
			function( btn ){
				if( btn == "yes" ){
		    	Ajax( CreateSQLDelRegKey( deuid ),
		    		  	function(){ self.store.remove( record ); } );					
				}
			}
		);
	}
	self.search = function(){
		var strField = self.comboBox_Field.getValue();
		var strContent = self.text_Search.getValue();
		if( strContent.length < 1  || strField.length < 1 ){
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
	}
}
 