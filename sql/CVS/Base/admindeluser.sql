------------------------------------------------------------------------------------
-- adminɾ���û�(ֻ��ɾ�����û����û����г��Ļ�����ʾ����ɾ��)
-- 1: ɾ���û����Ҫͬʱ���������ϵ��
---a: �û����������û�
---b: �û�������ϵ�����û��������������û���
---c: �û������з�����Ϣ
---d: �û������г��ӹ�ϵ
---e: ���û���Ϣ
-----------------------------------------------------------------------------------	
CREATE PROCEDURE pro_admindeluser	 	 
					 @strUser	       VARCHAR(20)				
AS 
	SET NOCOUNT ON
	
	DECLARE 	 @nCnt	        		INT	
	DECLARE 	 @nGroupCnt	        INT	
	DECLARE 	 @nGroupID	        INT	

	SELECT @nCnt = COUNT(*) FROM dbo.table_user WHERE ur_vchr_user = @strUser
	IF ( @nCnt < 0 )
	BEGIN	
		SELECT MSG = 0
	END
	ELSE
	BEGIN
	
		---a: �û����������û�
		delete table_user_subuser where us_vchr_user=@strUser
		
		---b: �û�������ϵ�����û��������������û���		
		delete table_user_subuser where us_vchr_subuser=@strUser
		
		---c: �û������з�����Ϣ
		
		---c1: ���鳵����Ϣ
		SELECT @nGroupCnt = COUNT(*) FROM table_group WHERE gp_vchr_user = @strUser
		WHILE @nGroupCnt > 0
		BEGIN
			SELECT @nGroupID = gp_int_uid FROM table_group WHERE gp_vchr_user = @strUser
			DELETE table_group_device WHERE gd_int_uid = @nGroupID
			SET @nGroupCnt = @nGroupCnt - 1			
		END		
		---c2: ������Ϣ
		DELETE table_group WHERE gp_vchr_user = @strUser
			
		---d: �û������г��ӹ�ϵ
		delete table_user_device where ud_vchr_user = @strUser
		
		---e: ���û���Ϣ
		DELETE  table_user  WHERE ur_vchr_user = @strUser
		
		SELECT MSG = 1	
	END
	SET NOCOUNT OFF
GO

