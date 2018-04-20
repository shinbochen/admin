---------------------------------------------------------
-- admin get 子用户信息
---------------------------------------------------------
CREATE PROCEDURE pro_getsubuserinfo @strUserName varchar(13)
AS
SET NOCOUNT ON

	DECLARE	@nPrivilege		int
	
	SELECT	@nPrivilege   =   ur_sint_privilege FROM  dbo.table_user  WHERE  ur_vchr_user   =   @strUserName
	
	IF(  @nPrivilege  <>  2  )
	BEGIN
		SELECT	MSG    =    0
		RETURN
	END

	SELECT	table_user_subuser.us_vchr_subuser AS ur_vchr_user,			
		table_user.ur_vchr_psd,
		table_user.ur_sint_privilege,
		table_user.ur_vchr_fname,
		table_user.ur_vchr_lname,
		table_user.ur_vchr_coname,
		table_user.ur_vchr_tel,
		table_user.ur_vchr_addr,
		table_user.ur_vchr_email,
		table_user.ur_vchr_remark
	FROM	table_user_subuser	INNER    JOIN    table_user    
			ON	table_user_subuser.us_vchr_subuser    =    table_user.ur_vchr_user

	WHERE	table_user_subuser.us_vchr_user    =    @strUserName

	ORDER	    BY    table_user_subuser.us_vchr_subuser

SET NOCOUNT OFF

GO
