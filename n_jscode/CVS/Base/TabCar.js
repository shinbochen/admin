/*
 * date:2009-03-18
 * Copyright(c) 2008-2012, shinbo
 * shinbo@hotmail.com
 * status: modify
 * version:v2.00
 *
 */
function CarInfoDlg( config ){

	var self = this;
	var defconfig = {		
		type						:	'add',				
		title						:	'carInfoDlg',
		width						:	500,
		height					:	280,
		disabled				:	false,
		Username				:	null,
		carData					:	null,
		callbackfunc		: null
	};
	Ext.apply( self, defconfig );
	Ext.apply( self, config );
	
	self.text_License = new Ext.form.TextField({	
    fieldLabel	: '*'+MapTrackAdmin.lang.s_License,
    allowBlank	: false,
    anchor			: '95%' 
	});
	self.number_Sim = new Ext.form.TextField({
    fieldLabel	: 	'*'+MapTrackAdmin.lang.s_Sim,	
    allowBlank	: 	false,  
    anchor		: 	'95%'
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
	self.number_DEUID = new Ext.form.TextField({
    fieldLabel	: '*'+MapTrackAdmin.lang.s_DEUID,       
    allowBlank	: false,  
    anchor			: '95%' 
	});	
	self.text_FName = new Ext.form.TextField({	
		fieldLabel	:	MapTrackAdmin.lang.s_FName,
		anchor			:	'95%'	
	});
	self.text_LName = new Ext.form.TextField({	
		fieldLabel	:	MapTrackAdmin.lang.s_LName,
		anchor			:	'95%'	
	});	
	self.text_Tel = new Ext.form.TextField({
    fieldLabel	: MapTrackAdmin.lang.s_Tel,
    anchor			: '95%'
	});  
	self.text_Addr = new Ext.form.TextField({
    fieldLabel	: MapTrackAdmin.lang.s_Address,
    anchor			: '95%'
	});
	self.text_Remark = new Ext.form.TextField({
    fieldLabel	: MapTrackAdmin.lang.s_Remark,
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
    		{
 				baseCls	: 'x-plain',
        layout	:	'column',
        items		:	[{
				    		baseCls			: 'x-plain',
				    		columnWidth	:	0.5, 
				    		layout			: 'form',   
				        labelWidth	:	85,   
				        items				: [
					        self.text_License,
					        self.number_Sim,
	    						self.text_FName
				        							]     
					    	},{
				    		baseCls			: 'x-plain',
				    		columnWidth	:	0.5, 
				    		layout			: 'form',   
				        labelWidth	:	85,   
				        items				: [
					        	self.comboBox_DEType,
					        	self.number_DEUID,
	    							self.text_LName
					      							]     
					    	}]
        },{
        	baseCls: 'x-plain',
        	html	:	'&nbsp;'
    		},
	    	self.text_Tel,
	    	self.text_Addr,
	    	self.text_Remark
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
		var disabled = null;
		
		if( self.type == 'show' ){
			self.button_Submit.hide();
			disabled = true;
		}
		else{	
			disabled = false;
		}		
		
		self.text_License.disabled 		= disabled;
		self.number_DEUID.disabled 			= disabled;
		self.comboBox_DEType.disabled = disabled;
		self.number_Sim.disabled 		= disabled;
		self.text_FName.disabled 	= disabled;
		self.text_LName.disabled 	= disabled;
		self.text_Tel.disabled 	= disabled;
		self.text_Addr.disabled 	= disabled;
		self.text_Remark.disabled 		= disabled;
		
		if( self.carData != null ){
			self.text_License.setValue( 	self.carData.license );
			self.number_DEUID.setValue( 	self.carData.deuid );
			self.comboBox_DEType.setValue( 	getDETypeStr( self.carData.detype ) );
			self.number_Sim.setValue( 		self.carData.sim );
			self.text_FName.setValue( 		self.carData.fname );
			self.text_LName.setValue( 		self.carData.lname );
			self.text_Tel.setValue( 			self.carData.tel );
			self.text_Addr.setValue( 			self.carData.addr );
			self.text_Remark.setValue( 		self.carData.remark );			
		}		
		self.winobj.show();
	}		
	self.submit = function(){
		if( !self.Items.form.isValid() ){
			return;
		}
		if( self.callbackfunc != null ){
			self.callbackfunc({
			license	:	self.text_License.getValue(),
			deuid		: self.number_DEUID.getValue(),
			detype	:	getDETypeByStr( self.comboBox_DEType.getValue() ),
			sim			:	self.number_Sim.getValue(),
			fname		: self.text_FName.getValue(),
			lname		: self.text_LName.getValue(),
			tel			: self.text_Tel.getValue(),
			addr		: self.text_Addr.getValue(),
			remark	: self.text_Remark.getValue()
			});
		}
		self.winobj.close();
	}	
}



function EditCarTab( config ){
	
	var self = this;
	
	var defconfig = {
		title				:	'EditCarTab',
		URL					:	null,
		strSQL			:	null,
		start				:	0,
		colinfo			:	null,
		limit				:	30,
		recordXMLTag: 	null,
		totalXMLTag : 	null
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
				text		: MapTrackAdmin.lang.s_Show,
				handler	: function(){ self.show(); }
			},
			'-',
			{   
				text		:	MapTrackAdmin.lang.s_Add,
				handler	:	function(){ self.add(); }
			},
			'-',
			{           
		    text		: MapTrackAdmin.lang.s_Modify,
		    handler	: function(){	self.modify(); }
			    
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
			{
				text 		: MapTrackAdmin.lang.s_BelongUser,
				handler	:	function(){ self.searchUser(); }
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
          text 	: 	MapTrackAdmin.lang.s_Show,
          handler	:	function(){ self.show(); }        		
        },{
          text 	: 	MapTrackAdmin.lang.s_Add,
          handler	:	function(){ self.add(); }
        },{
          text 	: 	MapTrackAdmin.lang.s_Modify,
          handler	:	function(){ self.modify(); }
        },{
          text 		: 	MapTrackAdmin.lang.s_Del,
          handler	:	function(){ self.del();}
        },{
        	text 		:	MapTrackAdmin.lang.s_BelongUser,
          handler	:	function(){ self.searchUser(); }
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
   	
	self.grid.on( 'rowdblclick', function( grid, rowIndex, e ){
		e.preventDefault();	
		self.grid.getSelectionModel().selectRow(rowIndex); 
		self.searchUser();
	}); 
  
  self.searchUser = function(){
		var cursel = self.grid.getSelectionModel().getSelected();
		if( !cursel ){
			return;
		}
		
		var deuid = cursel.get( self.keyFieldName );		
		
		var storecfg = new Array();
		
		storecfg.push({ name:'ud_vchr_user' } );
		var record = new Ext.data.Record.create( storecfg );	
			
	 	var store = new Ext.data.Store({
	    url			: self.URL,
	    reader	: new Ext.data.XmlReader(
	    {
				record			: self.recordXMLTag,
				totalRecords: self.totalXMLTag
			},
			record
			)
		});
		waiting();
		
		store.load({
			params:	{
				start	:	0,
				limit	:	9999,
				sql		:	g_SQL.searchUser +" "+ "'" + deuid + "';"
			},
			callback: function(	records, options, success	){
				wait_end();
				var strUser = "";
				
				var len = records.length;
				
				if( len < 1 ){
					strUser = MapTrackAdmin.lang.s_CarNotOwnByUser;
				}
				else{
					for( var i = 0; i < len; i++ ){
						if( strUser.length > 0 ){
							strUser += ';';
						}
						strUser += records[i].get( 'ud_vchr_user' );
					}	
				}
				Ext.Msg.alert( cursel.get( self.colinfo[0].index ), strUser ); 
			}
		});
  }
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
      record.set( self.storecfg[n++].name, obj.license );
			record.set( self.storecfg[n++].name, obj.deuid );
			record.set( self.storecfg[n++].name, obj.detype );
			record.set( self.storecfg[n++].name, obj.sim );
			record.set( self.storecfg[n++].name, obj.fname );
			record.set( self.storecfg[n++].name, obj.lname );
			record.set( self.storecfg[n++].name, obj.tel );
			record.set( self.storecfg[n++].name, obj.addr );
			record.set( self.storecfg[n++].name, obj.remark );
			self.store.insert(pos, record );
	}	
	self.getdata = function( record ){
	
			var		result = new Object();
			
			result.license 			=record.get( self.colinfo[0].index );
			result.deuid 				=record.get( self.colinfo[1].index );
			result.detype 	=record.get( self.colinfo[2].index );
			result.sim 			=record.get( self.colinfo[3].index );
			result.fname 			=record.get( self.colinfo[4].index );
			result.lname 				=record.get( self.colinfo[5].index );
			result.tel 		=record.get( self.colinfo[6].index );
			result.addr 		=record.get( self.colinfo[7].index );
			result.remark 			=record.get( self.colinfo[8].index );			
			return result;		
	}
	self.show = function(){
		var record = self.grid.getSelectionModel().getSelected();
		if( !record ){
			alert( MapTrackAdmin.lang.s_PLSSelectFirst );
			return;
		}
		var dlg = new CarInfoDlg({
			type		:	'show',
			title		:	MapTrackAdmin.lang.s_Title_Show,
			carData	:	self.getdata( record )
		});
		dlg.show();
	}
	self.add = function( record ){
		var dlg = new CarInfoDlg({
			type		:	'add',
			title		:	MapTrackAdmin.lang.s_Title_Add,
			callbackfunc:	function( result ){
					if( typeof( result ) != "object" ){
						return;
					}
					alert( result );
					Ajax( 	CreateSQLAddCar( result ),
	            		function(){ self.insertRecord( self.store.getCount(), result );} 
	            );	
			}
		});
		dlg.show();	
	}
	self.modify = function(){
		var record = self.grid.getSelectionModel().getSelected();
		if( !record ){
			alert( MapTrackAdmin.lang.s_PLSSelectFirst );
			return;
		}
		
		var dlg = new CarInfoDlg({
			type				:	'edit',
			title				:	MapTrackAdmin.lang.s_Title_Edit,
			carData			:	self.getdata( record ),
			callbackfunc:	function( result ){
					if( typeof( result ) != "object" ){
						return;
					}
        	Ajax( CreateSQLModifyCar(result),
        		  	function(){
									for( var i=0; i<self.store.getCount(); i++ ){
										var deuid = self.store.getAt(i).get( self.keyFieldName );	
										if( deuid == result.deuid ){			
											self.store.remove( self.store.getAt(i) ); 													
											self.insertRecord( i, result );	
											break;
										}
									}
								}
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
		    	Ajax( CreateSQLDelCar( deuid ),
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
 