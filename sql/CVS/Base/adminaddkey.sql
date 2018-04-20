------------------------------------------------------------------------------------
-- admin增加register key 信息
-----------------------------------------------------------------------------------	
CREATE PROCEDURE pro_adminaddkey		
								@vkey       VARCHAR(21),
								@vTEType    INT,
								@vPrivilege INT,
								@vExpire	  INT
								
AS 
	SET NOCOUNT ON
	
	DECLARE 	 @nCnt	        INT	
	
	SET  		@nCnt = 0
	SELECT 	@nCnt = COUNT(*) FROM table_register_key WHERE rk_vchr_key = @vkey
	IF ( @nCnt > 0 )
		BEGIN
			SELECT MSG = 0
		END
	ELSE  
		BEGIN			
			INSERT INTO dbo.table_register_key(
				rk_vchr_key,
				rk_tint_type,
				rk_tint_privilege,
				rk_expire_day			
			)
			VALUES(
				@vkey,
				@vTEType,
				@vPrivilege,
				@vExpire		
			)
			
			SELECT MSG = 1
		END	
	SET NOCOUNT OFF
GO
