/*
 * date:2009-03-18
 * Copyright(c) 2008-2012, shinbo
 * shinbo@hotmail.com
 * status: modify
 * version:v2.00
 *
 */
function ChargeManage( config ){
	
	var self = this;
	
	var defconfig = {
		title				:	'Charge Manage',
		monthPrice	:	10,
		width				:	500,
		region			:	"east",
		URL					:	null,
		strSQL			:	g_SQL.getUserInfo,
		colinfo			:	LangUserList3Head,
		recordXMLTag: null,
		totalXMLTag : null,
		status			:	0,
		strUser			:	null,
		prevExprie	:	null,
		systemTime	:	null
	};
	Ext.apply( this, defconfig );
	Ext.apply( this, config );
	
	self.cmcfg = new Array();
	self.storecfg = new Array();
	initstorecfg( self );	
	
	
	this.text_user = new Ext.form.TextField({
    fieldLabel	: MapTrackAdmin.lang.s_User,
    disabled		: true,
    anchor			: '95%'
	});	
	this.text_money = new Ext.form.NumberField({
    fieldLabel		: MapTrackAdmin.lang.s_Money,
    anchor				: '95%',
    allowNegative	:	false,
    allowBlank 		:	false,
		validator 		:	function(){
			self.check();	
			return true;
		}
	});		
	this.text_usedDay = new Ext.form.TextField({
    fieldLabel	: MapTrackAdmin.lang.s_UsedDay,
    disabled		: true,
    anchor			: '95%'
	});	
	this.text_prevExpire = new Ext.form.TextField({
		fieldLabel	: MapTrackAdmin.lang.s_PrevExpire, 
		disabled		: true,
		anchor			: '95%'	
  });
	this.text_priceRule = new Ext.form.TextField({
    fieldLabel	: MapTrackAdmin.lang.s_PriceRule,
    value				:	this.monthPrice,
    disabled		: true,
    anchor			: '95%',
    validator 	:	this.check
	});
	this.text_giftDay = new Ext.form.TextField({
    fieldLabel	: MapTrackAdmin.lang.s_GiftDay,
    disabled		: true,
    anchor			: '95%'
	});			
	this.text_curExpire = new Ext.form.TextArea({
		fieldLabel	: MapTrackAdmin.lang.s_CurExpire,
		readOnly 		: true,
		autoCreate	:	{ 
			tag					: "textarea", 
			style				: "height:25px;width:480px;color:#ff0000;font-size:20px;overflow:visible;", 
			autocomplete: "off"
		},
		anchor		: '95%'	
	});	
	this.text_remark = new Ext.form.TextArea({
		fieldLabel	: MapTrackAdmin.lang.s_Remark,
		height			:	100,
    anchor			: '95%'
	});	
	this.button_submit = new Ext.Button({
		text		:	MapTrackAdmin.lang.s_Submit,
		handler	:	function(){self.submit();}
	});		
	this.text_startTime = new Ext.form.DateField({
    fieldLabel	: MapTrackAdmin.lang.s_StartTime,
		anchor			: '95%',
		format 			: 'Y-m-d H:i:s',
		value				:	new Date()
	});    
  this.text_endTime = new Ext.form.DateField({
		fieldLabel	: MapTrackAdmin.lang.s_EndTime,
		anchor			: '95%',
		format 			: 'Y-m-d H:i:s',
		value				:	new Date()
  });    
	this.button_report = new  Ext.Button({
		text				:	MapTrackAdmin.lang.s_View,
		handler			:	function(){	self.search();}
	});	
	this.check = function(){
		return;
	};
	this.panel_main = new Ext.FormPanel({
		baseCls		: 'x-plain',  
		bodyStyle	: 'border:0',
		width			:	this.width,
		region		:	this.region,
		bodyStyle	: 'padding:20px 0px 0px 20px;',	
   	layout		: 'form',
   	items			:	[
   		{   
   			baseCls		: 'x-plain', 
     		layout		: 'column', 
        items			: [ 
        	{
        		baseCls			:	'x-plain',
        		columnWidth	:	0.50, 
        		labelWidth	:	100, 
        		layout			: 'form',  
        		items 			: [
        			this.text_user,
        			this.text_money,
        			this.text_giftDay
        		]
        	},{
        		baseCls			: 'x-plain',
        		columnWidth	:	0.50, 
        		labelWidth	:	120, 
        		layout			: 'form',  
        		items 			: [
        			this.text_prevExpire,
        			this.text_priceRule
        		]
        	}
        ]
			},
			this.text_remark,
			/*{   
   			baseCls		: 'x-plain', 
     		layout		: 'column', 
        items			: [ 
        	{
        		baseCls			:	'x-plain',
        		columnWidth	:	0.50, 
        		labelWidth	:	100, 
        		layout			: 'form',  
        		items 			: this.text_usedDay
        	},{
        		baseCls			: 'x-plain',
        		columnWidth	:	0.50, 
        		labelWidth	:	120, 
        		layout			: 'form',  
        		items 			: this.text_curExpire
        	}
        ]
			},		*/	
			{
				baseCls		: 'x-plain', 
     		layout		: 'column', 
        items			: [
	      	{ 
	      		baseCls			: 'x-plain',
	      		columnWidth	:	0.85, 
	      		html				: '&nbsp;' 	
	      	},{
	      		baseCls			: 'x-plain',
	      		columnWidth	:	0.15, 
	   				layout			: 'form',
	   				items				:	this.button_submit
	      	}
        ]	
			},{
				baseCls		: 'x-plain',
				html			:	"<font style='font-size:12px;'>" 
										+ MapTrackAdmin.lang.s_SearchExprieUser
										+ ":</font>"
			},{
				baseCls		: 'x-plain', 
     		layout		: 'column', 
        items			: [{
        		baseCls			: 'x-plain', 
        		columnWidth	:	0.4,
        		labelWidth	:	55,
        		layout			: 'form',
        		items				:	this.text_startTime
        	},{
        		baseCls			: 'x-plain', 
        		columnWidth	:	0.4,
        		labelWidth	:	55,
        		layout			: 'form',
        		items				:	this.text_endTime
        	},{
        		baseCls			: 'x-plain', 
        		columnWidth	:	0.2,
        		items				:	this.button_report
        	}
			]
			}
		]
	});	
	
	
	this.calcuseday = function(){

		var money = self.text_money.getValue();
		if( !money ){
			money = 0;
		}
		
		var giftDay = self.text_giftDay.getValue();
		if( !giftDay ){
			giftDay = 0;
		}
		var o = new Date();
		var startTime = parseInt(o.valueOf()/1000);
		
		if( startTime < self.prevExprie ){
			startTime = self.prevExprie
		}
		
		var addsecond = ( money / self.text_priceRule.getValue() ) * ( 31*24*60*60 ) 
					  				+ ( giftDay * 24*60*60 );
  
		
		this.text_curExpire.setValue( UTCtoLocal( startTime + addsecond ).toLocaleString() );
		this.text_usedDay.setValue( addsecond / ( 24*60*60 ) );
		
	}		
	this.disable = function(){
		this.text_money.disable();
		this.text_usedDay.disable();
		this.text_remark.disable();
		this.button_submit.disable();
		this.status = 0;
	}	
	this.load = function( strUser ){
		if( strUser.length < 1 ){
			return;
		}		
		self.text_user.setValue('');
		self.text_money.setValue('');
		self.text_usedDay.setValue('');
		self.text_prevExpire.setValue('');
		self.text_giftDay.setValue('0');
		self.text_curExpire.setValue('');
		self.text_remark.setValue('');
		
		self.disable();
		self.strUser = strUser;
		waiting();
		
		var strSQL = CreateSQLGetUserInfo( self.strUser );
		self.store.load({
			params	: {
				start	:	0,
				limit	:	10,
				sql		:	strSQL
			},			
			callback: 	function(	arrRecord, options, success	){
				wait_end();
				if( success && arrRecord.length > 0 ){  						
						
						self.text_user.enable();
						self.text_money.enable();
						self.text_giftDay.enable();
						self.text_remark.enable();
						self.button_submit.enable();			
						
						self.text_user.setValue( strUser );
						self.prevExpire = new Date( arrRecord[0].get( self.storecfg[1].name ) );
						//alert( self.prevExpire );
						self.text_prevExpire.setValue( self.prevExpire.toLocaleString() );								
				}	
				else{
					Ext.Msg.alert( MapTrackAdmin.lang.s_Alert, MapTrackAdmin.lang.s_DBConnFail ); 
				} 	
			}
		});
	}
	
	this.submit = function(){
		if( !self.panel_main.form.isValid() ){
			return;
		}
		self.disable();		
		self.calcuseday( );
		
		//self.prevExpire = new Date( self.text_prevExpire.getValue() );
		var strSQL = CreateSQLSetUserExpire({ 
			user			:	self.text_user.getValue(),
			money			: self.text_money.getValue(),
			prevExpire: self.prevExpire.getFullYear()+'/'+(self.prevExpire.getMonth()+1)+'/'+self.prevExpire.getDate(), 
			day 			: self.text_usedDay.getValue(),
			remark		: self.text_remark.getValue()
		});
		alert( strSQL );
		Ajax(	strSQL );		
	};
	
	this.search = function(){
		
		var startTime = LocalToUTC( self.text_startTime.getValue().getTime() * 0.001 ).getTime() * 0.001;
		var endtime = LocalToUTC( self.text_endTime.getValue().getTime() *0.001 ).getTime() * 0.001;
		
		var sTitle = MapTrackAdmin.lang.s_ExpireReport + "  ";
		
		sTitle += MapTrackAdmin.lang.s_StartTime 
					+ " > " 
					+ self.text_startTime.getValue().toLocaleString()
		      +  " --- "
		      +  MapTrackAdmin.lang.s_EndTime 
		      + " < " 
		      + self.text_endTime.getValue().toLocaleString();	
		
		var dlg = new ReportCharge({
			title				:	sTitle,
			URL					:	g_QuestDataURL,
			strSQL			:	CreateSQLGetUserByExpireTime( startTime, endtime ),
			colinfo			:	LangUserList2Head,
			recordXMLTag: 'ITEM',
			totalXMLTag : 'TOTAL',
			clickFunc		:	null
		});		
		dlg.show();
	}	
	self.disable();	
}

//////////////////////////////////////////////////////////////////////
//
function ReportCharge( config ){
	
	var self = this;
	
	var defconfig = {
		title			:	'ReportChargeDlg',
		URL				:	null,
		strSQL		:	null,
		start			:	0,
		colinfo		:	null,
		limit			:	30,
		recordXMLTag: null,
		totalXMLTag : null
	}
	
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
	
	self.comboBox_Limit = new Ext.form.ComboBox({
    store					: [10,20,40,60,80,100,150,200,500],
    value					:	self.limit,  
    width					:	60,     
    typeAhead			: true,
    mode					: 'local',
    triggerAction	: 'all',
    selectOnFocus	:	true,
    readOnly 			:	true,
    editable			: false,
    forceSelection: true
	});	
	self.comboBox_Limit.on('select',function( box, record, index ){
		self.limit = self.comboBox_Limit.getValue();
		self.pagBar.pageSize = self.limit;
		self.load();
	});
	self.toolbar =  new Ext.Toolbar({
		items 		: [
			{
				text		:	MapTrackAdmin.lang.s_Refresh,	
				handler	:	function(){ self.load(); }
			},
			'-',
			self.comboBox_Limit
		]    
	});
	self.store = new Ext.data.Store({
    url			: self.URL,
    reader	: new Ext.data.XmlReader({
			record			: self.recordXMLTag,
			totalRecords: self.totalXMLTag
		},
		self.record)
	});	
	self.pagBar = new Ext.PagingToolbar({
	  store 			:	self.store,
		pageSize 		:	self.limit,
		displayInfo :	true,
		doLoad 			:	function( start ){
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
		title				:	self.title,
		store				: self.store,
		columns			:	self.cmcfg,
		autoExpandColumn: self.expandId,
		tbar				:	self.toolbar,
		bbar				: self.pagBar, 
		autoSizeHeaders	:	true,	
		singleSelect 	:	true,
  	bodyStyle			:	'border:0',
    loadMask			:	true,
		stripeRows		:	true,
	  trackMouseOver:	true
	});	
	self.winobj = new Ext.Window({
	    title			: self.title, 
	    width			: self.width,
	    height		: self.height,
	    items			: self.grid,		    
	    layout		:	'fit',
	    resizable : false,
	    buttons 	: [{
				text		:	MapTrackAdmin.lang.s_OutputExcel,
				handler	:	function(){	DownloadExcel( getGridArrData( self.cmcfg, self.store ) ); }
			},{
        text		: MapTrackAdmin.lang.s_Close,
        handler	:	function(){ self.winobj.close(); }
			}]		    
	}); 
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
	self.show = function(){
		self.load();
		self.winobj.show();	
	}
}
