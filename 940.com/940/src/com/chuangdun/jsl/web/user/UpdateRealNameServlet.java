package com.chuangdun.jsl.web.user;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.text.MessageFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONException;
import net.sf.json.JSONObject;

import com.chuangdun.jsl.bean.Article;
import com.chuangdun.jsl.bean.RegInfo;
import com.chuangdun.jsl.dao.ArticleManagerDao;
import com.chuangdun.jsl.dao.RegInfoDao;
import com.chuangdun.jsl.dao.ToolArticleDao;
import com.chuangdun.jsl.lab.HttpUtil;
import com.chuangdun.jsl.lab.LAB;
import com.chuangdun.jsl.lab.MD5;
import com.chuangdun.jsl.lab.SYS;
import com.sun.rowset.CachedRowSetImpl;

/**
 * Servlet implementation class ArticleEdit
 */
@WebServlet("/UpdateRealNameServlet")
public class UpdateRealNameServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public UpdateRealNameServlet() {

		super();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		
		String doStr = SYS.RequestString(request, "do");
		String userName = SYS.RequestString(request, "user_name");
		String newName = SYS.RequestString(request, "new_name");
		String code = SYS.RequestString(request, "code");
		
		byte[] result = HttpUtil.doPost(HttpUtil.INDEX+"/exe/" + "msg_code_check?", initParams(userName,code,newName), "UTF-8");
		
		System.out.println(new String(result));
		response.getOutputStream().write(result);
	}

	public static final String USERNAME = "username";
	public static final String REGISTER = "reg?";
	public final static String SERVLET_KEY = "servlet";

	private HashMap initParams(String userName, String code,String newPhone) {
		String servlet = "/exe/" + "msg_code_check?";
		Date orderDate = new java.sql.Date(System.currentTimeMillis());
		String orderId = MessageFormat.format("{0,date,yyyyMMddHHmmssSSS}",
				new Object[] { orderDate }) ;
		
		HashMap<String, String> params = new HashMap<String, String>();
		params.put(USERNAME, userName);
		params.put("do","editrealname");
		params.put("code",code);
		params.put("param",newPhone); 
		params = HttpUtil.initSignParams1(servlet,  params, 0);
		return params;
	}


	

	
}
