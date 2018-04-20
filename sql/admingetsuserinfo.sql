---------------------------------------------------------
-- admin get 所有用户信息
---------------------------------------------------------
CREATE PROCEDURE pro_admingetalluser
AS
SET NOCOUNT ON	
	select * from table_user 
SET NOCOUNT OFF

GO
