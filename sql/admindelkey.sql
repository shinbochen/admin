------------------------------------------------------------------------------------
-- adminÉ¾³ýregister key ÐÅÏ¢
-----------------------------------------------------------------------------------	
CREATE PROCEDURE pro_admindelkey		
					@vkey   VARCHAR(21)
AS 
	SET NOCOUNT ON
	
	DECLARE 	 @nCnt	        INT	
	
	SET  		@nCnt = 0
	SELECT 	@nCnt = COUNT(*) FROM table_register_key WHERE rk_vchr_key = @vkey
	IF ( @nCnt <= 0 )
		BEGIN
			SELECT MSG = 0
		END
	ELSE  
		BEGIN			
			delete from table_register_key WHERE rk_vchr_key = @vkey
			SELECT MSG = 1
		END	
	SET NOCOUNT OFF
GO
