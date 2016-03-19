<%@page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.chuangdun.jsl.lab.LAB"%>
<%@page import="com.chuangdun.jsl.lab.EditUtil"%>
<%@page import="com.chuangdun.jsl.lab.SYS"%>
<%@page import="com.chuangdun.jsl.dao.ToolArticleDao"%>
<%@page import="com.chuangdun.jsl.dao.VideoDao"%>
<%@page import="com.sun.rowset.CachedRowSetImpl"%>
<%@page import="com.chuangdun.jsl.lab.Page"%>
<%@page import="com.chuangdun.jsl.lab.DateUtil"%>
<%
int pageNum = SYS.RequestInt(request, "page", 1);
	ToolArticleDao articleDao = new ToolArticleDao();
	VideoDao videoDao = new VideoDao();
	Page wentiPage = articleDao.getArticlePage(pageNum, 8, "4");
	CachedRowSetImpl wentiRs = wentiPage.getCachedRowSetImpl();
%>

<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>940-开店技巧</title>
<link rel="stylesheet" type="text/css" href="/style/style.css">
<link rel="stylesheet" type="text/css" href="/style/shop.css">
</head>
<body>
	<%@ include file="/inc/header.jsp"%>

	<div id='kd_content'>
		<div id="wrapJiqiao">
			<ul class='j_tab_ul'>
				<li><a href="/shop">开店流程</a></li>
				<li><a href="/shop/jiqiao">开店技巧</a></li>
				<li><a href="/shop/fenxiang">干货分享</a></li>
				<li class='cur'><a href="/shop/wenti">常见问题</a></li>
				<li><a href="/shop/tuiguang">网店推广</a></li>
			</ul>
			<ul class='j_list_ul'>
				<%
					while (wentiRs.next()) {
						String preview = LAB
								.replaceNull(wentiRs.getString("a_preview"));
						String classStr = "";
						int id = wentiRs.getInt("a_id");
						String title = wentiRs.getString("a_TITLE");
						String time = wentiRs.getString("a_TIME").substring(0, 10);
						String click = wentiRs.getString("a_click");
				%>

				<li>
					<p>
						<a href="details.jsp?id=<%=id%>"><img src="<%=preview%>"></a>
					</p>
					<dl class='wrapTxtDl'>
						<dt>
							<a href="details.jsp?id=<%=id%>"><%=title%></a>
						</dt>
						<dd>
							发表日期：<span><%=time%></span>
						</dd>
						<dd>
							阅读人数：<span><%=click%></span>
						</dd>
					</dl>
				</li>
				<%
					}
					wentiRs.close();
				%>

				<h2 style="clear: both;"></h2>
			</ul>
			<div class="tcdPageCode">
				<%=EditUtil.getShopPageStr(wentiPage)%>
			</div>
		</div>
	</div>

	<%@ include file="/inc/footer.jsp"%>

</body>
</html>