<%@ page language="java" pageEncoding="utf-8"%>
<%@page import="com.sun.rowset.CachedRowSetImpl"%>
<%@page import="com.chuangdun.jsl.dao.RegInfoDao"%>
<%@page import="com.chuangdun.jsl.bean.RegInfo"%>
<%@page import="com.chuangdun.jsl.lab.LAB"%>
<%@page import="com.chuangdun.jsl.lab.DateUtil"%>
<%@page import="com.chuangdun.jsl.lab.SYS"%>
<%
	String dostr = "", title = "", userName = "",phoneNum = "", qq = "", time = DateUtil
			.getDateTime();
	RegInfo regInfo = null;
	int id=0;
	String doWhat = SYS.RequestString(request, "do");
	if (doWhat.equals("edit")) {
		 id = SYS.RequestInt(request, "id", 0);
		RegInfoDao regInfoDao = new RegInfoDao();
		regInfo = regInfoDao.getRegInfoById(id);
	}

	if (regInfo != null) {
		time = regInfo.getTime();
		userName  = regInfo.getUserName();
		phoneNum = regInfo.getPhoneNum();
		qq = regInfo.getQq();
		
		id = regInfo.getId();
		dostr = "edit";
	} else {
		dostr = "add";
	}
%>




<body>
<div class="form_table_wrap">
	<form id="regInfo_form" action="../enroll"
		name="regInfo_form" method="post">

		<input type="hidden" name="do" id="do" value="<%=dostr%>" /> <input
			type="hidden" name="id" id="id" value="<%=id%>" /> <input
			type="hidden" name="format" id="format" value="json" />
		<table class="form_table" cellspacing="1"  >
			<tr>
				<td class="td_item">姓名：</td>
				<td><input type="text" name="user_name" id="user_name"
					value="<%=userName%>" style="width:300px;" /></td>
			</tr>
			
			<tr>
				<td class="td_item">手机号：</td>
				<td><input name="phone_number" id="phone_number"
						value="<%=phoneNum%>"></input></td>
			</tr>
			<tr>
				<td class="td_item">QQ：</td>
				<td><input type="text" name="qq" id="qq"
					value="<%=qq%>" /></td>
			</tr>
			<!-- <tr>
				<td class="td_item">时间：</td>
				<td><input type="text" name="time" id="time" value="<%=time%>"
					style="width:115px;" /></td>
			</tr> -->
			<tr>
				<td></td>
				<td><label class="submit_wrap"> <%
 	if ("edit".equals(dostr)) {
 %> <input type="submit" class="button" id="btnSave" value="修  改 " /> <%
 	} else {
 %> <input type="submit" class="button" id="btnSave" value="添  加" /> <%
 	}
 %>
				</label></td>
			</tr>
		</table>
	</form>
</div>
</body>
			