------------------------------------------------------------------------------------
-- admin get owner vehicle info
------------------------------------------------------------------------------------ 
CREATE PROCEDURE pro_admingetownvehicle @strUserName varchar(13)

AS
SET NOCOUNT ON

SELECT * FROM VIEWCarManage  WHERE ud_vchr_user = @strUserName

SET NOCOUNT OFF
GO
