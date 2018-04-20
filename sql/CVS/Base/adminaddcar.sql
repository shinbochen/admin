------------------------------------------------------------------------------------
-- admin增加车辆车辆信息
-----------------------------------------------------------------------------------	
CREATE PROCEDURE pro_adminaddcar
				@cr_vchr_deuid  VARCHAR(21),
				@cr_vchr_desim   VARCHAR(20),
				@cr_vchr_license VARCHAR(20),
				@cr_vchr_fname   VARCHAR(12),
				@cr_vchr_lname   VARCHAR(12),
				@cr_vchr_tel     VARCHAR(20),
				@cr_vchr_addr    VARCHAR(50),
				@cr_vchr_remark VARCHAR(50),
				@cr_tint_type TINYINT
		
AS 
SET NOCOUNT ON
	
	DECLARE 	 @nCnt	        INT	
	
	-- default 
	-- 开启报警状态
	DECLARE	  @ds_int_alenable     INT
	-- 工作模式 0: GSM  1：GPRS 
	DECLARE	  @ds_tint_workmode    TINYINT
	-- 上传模式
	DECLARE	  @ds_tint_trackmode   TINYINT
	-- 跟踪间隔
	DECLARE   @ds_sint_trackspace  SMALLINT
	-- IP地址
	DECLARE	  @ds_vchr_serverip    VARCHAR(16)
	-- 端口号
	DECLARE   @ds_sint_serverport  SMALLINT
	--报警功能
	DECLARE	  @ds_int_alvalid	 	   INT
	--硬件状态
	DECLARE	  @ds_int_hwvalid      INT

  -----------------------------------------
	-- 开启报警状态
	--bit0 bit1 bit2 bit3 bit4 bit5 bit6 bit7
	-- 1    1    1    1    1    1    1    0
	--bit0 bit1 bit2 bit3 bit4 bit5 bit6 bit7
	-- 0    0    1    1    1    0    0    0
	SET @ds_int_alenable = 7295
	-- 工作模式 0: GSM  1：GPRS 
	SET @ds_tint_workmode = 1 
	-- 上传模式
	SET @ds_tint_trackmode = 1
	-- 跟踪间隔
	SET @ds_sint_trackspace = 30
	-- IP地址
	SET @ds_vchr_serverip = '211.154.139.226'
	-- 端口号
	SET @ds_sint_serverport = 8868
	----报警功能
	SET @ds_int_alvalid = 81023
	--硬件状态
	SET @ds_int_hwvalid = 4983
	
	SET  @nCnt = 0

	SELECT @nCnt = COUNT(*) FROM table_device_data WHERE cr_vchr_deuid = @cr_vchr_deuid
	IF ( @nCnt <= 0  )
	BEGIN
		SELECT MSG = 0
	END
	ELSE  
		BEGIN
		INSERT INTO dbo.table_device_data( 
					cr_vchr_deuid,
					cr_tint_type,
					cr_vchr_desim,
					cr_vchr_license,
					cr_vchr_fname,
					cr_vchr_lname,
					cr_vchr_tel,
					cr_vchr_addr,
					cr_vchr_remark )
		    VALUES(
		     @cr_vchr_deuid,
		     @cr_tint_type,
				 @cr_vchr_desim,
				 @cr_vchr_license,
				 @cr_vchr_fname,
				 @cr_vchr_lname,
				 @cr_vchr_tel,
				 @cr_vchr_addr,
				 @cr_vchr_remark)
	
    ------INSERT DEFAULT DEVICE SETUP---------------	
    DELETE dbo.table_device_setup WHERE ds_vchr_deuid =  @cr_vchr_deuid
    INSERT INTO  dbo.table_device_setup(
          ds_vchr_deuid,
				  ds_int_alenable,
				  ds_tint_workmode,
				  ds_tint_trackmode,
				  ds_sint_trackspace,
			 	  ds_vchr_serverip,
				  ds_sint_serverport ,
				  ds_int_alvalid,
				  ds_int_hwvalid) 
			  VALUES( 
			    @cr_vchr_deuid,
				  @ds_int_alenable,
				  @ds_tint_workmode,
				  @ds_tint_trackmode,
				  @ds_sint_trackspace,
				  @ds_vchr_serverip,
				  @ds_sint_serverport,
				  @ds_int_alvalid,
				  @ds_int_hwvalid )				  
		SELECT MSG = 1		
		END	
SET NOCOUNT OFF
GO
