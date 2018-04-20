------------------------------------------------------------------------------------
-- admin删除辆车辆信息
-- 1: 删除车辆信息
-- 2: 删除用户下此车的信息
-- 3: 要不要删除GPS信息?
-----------------------------------------------------------------------------------	
CREATE PROCEDURE pro_admindelcar	@strdeuid	VARCHAR(21)			
		
AS 
	SET NOCOUNT ON
	
	DECLARE 	 @nCnt	        INT	
	
	SET  		@nCnt = 0
	SELECT 	@nCnt = COUNT(*) FROM table_device_data WHERE cr_vchr_deuid = @strdeuid
	IF ( @nCnt <= 0 )
	BEGIN
		SELECT MSG = 0
	END
	ELSE  
	BEGIN
		--- 删除用户下此车辆信息
		DELETE table_user_device  WHERE  ud_vchr_deuid = @strdeuid
		--- 删除群组下此车辆信息
		DELETE table_group_device WHERE  gd_vchr_deuid = @strdeuid		
		--- 删除车辆设置信息
		DELETE table_device_setup WHERE  ds_vchr_deuid = @strdeuid
		--- 删除车辆信息
		DELETE table_device_data  WHERE  cr_vchr_deuid = @strdeuid
		SELECT MSG = 1	
	END	
	SET NOCOUNT OFF
GO
