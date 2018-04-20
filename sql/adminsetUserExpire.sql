------------------------------------------------------------------------------------
-- admin充值  
-- 1: 记录充值记录
-- 2: 修改user表的有效期
-----------------------------------------------------------------------------------	
CREATE PROCEDURE 	pro_adminsetUserExpire(
								  @strUser         VARCHAR(13),
								  @nMoney			     INT,
								  @nPrevExpire     INT,
								  @nDay					 INT,
								  @strRemark       VARCHAR(200)
)

AS
	SET NOCOUNT ON
	
	DECLARE			@today 		smalldatetime
	DECLARE			@oldday		smalldatetime
	
	set 	@today = GETDATE();
	
	INSERT INTO dbo.table_charge(
				ce_vchr_user,
				ce_date_time,
				ce_int_money,
				ce_date_prevexpire,
				ce_int_day,
				ce_vchr_remark			
			)
			VALUES(
				@strUser,
				@today,
				@nMoney,
				@nPrevExpire,
				@nDay,
				@strRemark	
			)
			
	select @oldday = ur_date_expire from dbo.table_user where ur_vchr_user = @strUser
			
	set @oldday = DATEADD( Day, @nDay, @oldday )
			
	UPDATE dbo.table_user set ur_date_expire = @oldday where ur_vchr_user = @strUser
			
	SET NOCOUNT OFF
GO
