------------------------------------------------------------------------------------
-- admin删除用户(只能删除空用户，用户下有车的话，提示不能删除)
-- 1: 删除用户表后。要同时清除所属关系。
---a: 用户下所有子用户
---b: 用户从属关系（此用户属于其他超级用户）
---c: 用户下所有分组信息
---d: 用户下所有车子关系
---e: 此用户信息
-----------------------------------------------------------------------------------	
CREATE PROCEDURE pro_admindeluser	 	 
					 @strUser	       VARCHAR(20)				
AS 
	SET NOCOUNT ON
	
	DECLARE 	 @nCnt	        		INT	
	DECLARE 	 @nGroupCnt	        INT	
	DECLARE 	 @nGroupID	        INT	

	SELECT @nCnt = COUNT(*) FROM dbo.table_user WHERE ur_vchr_user = @strUser
	IF ( @nCnt < 0 )
	BEGIN	
		SELECT MSG = 0
	END
	ELSE
	BEGIN
	
		---a: 用户下所有子用户
		delete table_user_subuser where us_vchr_user=@strUser
		
		---b: 用户从属关系（此用户属于其他超级用户）		
		delete table_user_subuser where us_vchr_subuser=@strUser
		
		---c: 用户下所有分组信息
		
		---c1: 分组车辆信息
		SELECT @nGroupCnt = COUNT(*) FROM table_group WHERE gp_vchr_user = @strUser
		WHILE @nGroupCnt > 0
		BEGIN
			SELECT @nGroupID = gp_int_uid FROM table_group WHERE gp_vchr_user = @strUser
			DELETE table_group_device WHERE gd_int_uid = @nGroupID
			SET @nGroupCnt = @nGroupCnt - 1			
		END		
		---c2: 分组信息
		DELETE table_group WHERE gp_vchr_user = @strUser
			
		---d: 用户下所有车子关系
		delete table_user_device where ud_vchr_user = @strUser
		
		---e: 此用户信息
		DELETE  table_user  WHERE ur_vchr_user = @strUser
		
		SELECT MSG = 1	
	END
	SET NOCOUNT OFF
GO

