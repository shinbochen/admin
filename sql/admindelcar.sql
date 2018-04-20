------------------------------------------------------------------------------------
-- adminɾ����������Ϣ
-- 1: ɾ��������Ϣ
-- 2: ɾ���û��´˳�����Ϣ
-- 3: Ҫ��Ҫɾ��GPS��Ϣ?
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
		--- ɾ���û��´˳�����Ϣ
		DELETE table_user_device  WHERE  ud_vchr_deuid = @strdeuid
		--- ɾ��Ⱥ���´˳�����Ϣ
		DELETE table_group_device WHERE  gd_vchr_deuid = @strdeuid		
		--- ɾ������������Ϣ
		DELETE table_device_setup WHERE  ds_vchr_deuid = @strdeuid
		--- ɾ��������Ϣ
		DELETE table_device_data  WHERE  cr_vchr_deuid = @strdeuid
		SELECT MSG = 1	
	END	
	SET NOCOUNT OFF
GO
