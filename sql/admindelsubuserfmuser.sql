------------------------------------------------------------------------------------
-- admin�������û����û�  
-- ����:
-- 	  @strUser 		:   �û�
--    @strDEUID   :   ���û�
-----------------------------------------------------------------------------------	
CREATE PROCEDURE 	pro_admindelsubuserfmuser
								  @strUser   		  VARCHAR(13),
								  @strSubUser     VARCHAR(2048)

AS
	SET NOCOUNT ON
	
	DECLARE 	@strTmp			   VARCHAR(2048)
	DECLARE 	@strSQL	       VARCHAR(2048)
	DECLARE	  @strTmp2		   VARCHAR(21) 
	DECLARE		@strValues     VARCHAR(30)	
	DECLARE 	@nCnt	         INT
	DECLARE 	@nCnt2         INT

	--SELECT @nCnt = COUNT(*) FROM dbo.table_user WHERE ur_vchr_user = @strUser
	IF ( @nCnt <= 0 )
	BEGIN
		SELECT MSG = 0
	END
	ELSE
	BEGIN
		
		-- ת��|| ��ָ�����-------------------------------------------------------------
		SET		@strValues = ' ur_vchr_user '
		
		SET		@strTmp	 = dbo.FindDEUIDArrayByStr( @strSubUser , @strValues )
		
		---��������������---------------------------------------------------------------
		CREATE TABLE #TmpTable (ur_vchr_user VARCHAR(21) )
	
		SET @strSQL =  'INSERT INTO #TmpTable(ur_vchr_user) SELECT ur_vchr_user FROM table_user WHERE '+ @strTmp 
		-----------------------------------------------------------------------------------
		EXECUTE(@strSQL)		
		
		SELECT @nCnt = COUNT(*) FROM #TmpTable	
		WHILE (@nCnt > 0)
		BEGIN
			SELECT  TOP 1 @strTmp2 = ur_vchr_user FROM #TmpTable
			delete table_user_subuser WHERE us_vchr_user = @strUser AND us_vchr_subuser = @strTmp2
			DELETE #TmpTable WHERE ur_vchr_user = @strTmp2	
			SET @nCnt = @nCnt - 1
		END		
	END
	--ɾ����ʱ��
	DROP TABLE #TmpTable	
	SELECT MSG = 1 
	SET NOCOUNT OFF
GO
