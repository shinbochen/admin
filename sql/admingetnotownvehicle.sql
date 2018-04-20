------------------------------------------------------------------------------------
-- admin get not owner vehicle info
------------------------------------------------------------------------------------ 
CREATE PROCEDURE pro_admingetnotownvehicle @strUserName varchar(13)

AS
SET NOCOUNT ON

SELECT * FROM VIEWCarManage  WHERE ud_vchr_user != @strUserName

SET NOCOUNT OFF
GO
