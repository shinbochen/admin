------------------------------------------------------------------------------------
-- admin增加车辆到用户  
-- 参数:
-- 	  @strUser :   子用户
--    @strDEUID   :   车辆DEUID
-----------------------------------------------------------------------------------	
CREATE PROCEDURE 	pro_adminaddcartouser
								  @strUser    VARCHAR(13),
								  @strDEUID   VARCHAR(2048)

AS
SET NOCOUNT ON
	
	DECLARE 	@strSQLDEUID   VARCHAR(2048)
	DECLARE 	@strSQL	       VARCHAR(2048)
	DECLARE	  @strTmpDEUID   VARCHAR(21) 
	DECLARE		@strValues     VARCHAR(30)	
	DECLARE 	@nCnt	         INT
	DECLARE 	@nTmpCnt       INT

	SELECT @nCnt = COUNT(*) FROM dbo.table_user WHERE ur_vchr_user = @strUser
	IF ( @nCnt <= 0 )
	BEGIN
		SELECT MSG = 0
	END
	ELSE
	BEGIN
		
		-- 转换|| 成指令的列-------------------------------------------------------------
		SET		@strValues = ' cr_vchr_deuid '
		
		SET		@strSQLDEUID = dbo.FindDEUIDArrayByStr( @strDEUID , @strValues )
		
		---创建表，复制数据---------------------------------------------------------------
		CREATE TABLE #TmpTable (cr_vchr_deuid VARCHAR(21) )
	
		SET @strSQL =  'INSERT INTO #TmpTable(cr_vchr_deuid) SELECT cr_vchr_deuid FROM table_device_data WHERE '+ @strSQLDEUID 
		-----------------------------------------------------------------------------------
		EXECUTE(@strSQL)		
		
		SELECT @nCnt = COUNT(*) FROM #TmpTable	
		WHILE (@nCnt > 0)
		BEGIN
			SELECT  TOP 1 @strTmpDEUID = cr_vchr_deuid FROM #TmpTable
			SELECT  @nTmpCnt = COUNT(*) FROM table_user_device WHERE ud_vchr_user = @strUser AND ud_vchr_deuid = @strTmpDEUID
		
			IF ( @nTmpCnt <= 0 )
			BEGIN
				INSERT INTO table_user_device(ud_vchr_user,ud_vchr_deuid) VALUES(@strUser,@strTmpDEUID)	
			END
			
			DELETE #TmpTable WHERE cr_vchr_deuid = @strTmpDEUID	
			SET @nCnt = @nCnt - 1
		END		
	END
	--删除临时表
	DROP TABLE #TmpTable	
	SELECT MSG = 1 
	SET NOCOUNT OFF
GO
