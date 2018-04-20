------------------------------------------------------------------------------------
-- admin修改车辆车辆信息
-----------------------------------------------------------------------------------	
CREATE PROCEDURE pro_adminmodifycar		
					@cr_vchr_deuid   VARCHAR(21),
					@cr_vchr_desim   VARCHAR(20),
					@cr_vchr_license VARCHAR(20),
					@cr_vchr_fname   VARCHAR(12),
					@cr_vchr_lname   VARCHAR(12),
					@cr_vchr_tel     VARCHAR(20),
					@cr_vchr_addr    VARCHAR(50),
					@cr_vchr_remark  VARCHAR(50),
					@cr_tint_type	   TINYINT
AS 
	SET NOCOUNT ON
	
	DECLARE 	 @nCnt	        INT	
	
	SET  		@nCnt = 0
	SELECT 	@nCnt = COUNT(*) FROM table_device_data WHERE cr_vchr_deuid = @cr_vchr_deuid
	IF ( @nCnt <= 0 )
		BEGIN
			SELECT MSG = 0
		END
	ELSE  
		BEGIN			
			UPDATE 	dbo.table_device_data	SET
								cr_tint_type    = @cr_tint_type, 	
								cr_vchr_desim   = @cr_vchr_desim ,
								cr_vchr_license = @cr_vchr_license,
								cr_vchr_fname   = @cr_vchr_fname,
								cr_vchr_lname   = @cr_vchr_lname,
								cr_vchr_tel     = @cr_vchr_tel,
								cr_vchr_addr    = @cr_vchr_addr,
								cr_vchr_remark  = @cr_vchr_remark 
			WHERE  cr_vchr_deuid  = @cr_vchr_deuid
			SELECT MSG = 1
		END	
	SET NOCOUNT OFF
GO
