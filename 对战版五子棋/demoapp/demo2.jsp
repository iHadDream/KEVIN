<%@ page language="java" contentType="text/html" pageEncoding="utf-8"  %>
<%
request.setCharacterEncoding("utf-8");
response.setHeader("Access-Control-Allow-Origin", "*");
response.setContentType("text/xml;charset=utf-8"); //修改此次为text/xml  声明返回的是XML文件内容
%>
<% 
	java.util.Map<String,String> infos = new java.util.HashMap<String,String>();
	infos.put("你好","你好，我一直在这里。"+request.getRemoteAddr());
	infos.put("你是什么？","我是服务端程序");
	infos.put("我叫***","***你好");
	
%>
<%
	String rst = "";//返回值。
	String info = request.getParameter("info");
	//匹配特殊指令
	if("?".equals(info)||"？".equals(info)){
		rst = "指令清单:<br/>";
		for(String key:infos.keySet()){
			rst += "<div style=\"padding-left:20px\">\"" + key + "\"</div>";
		}
	}else if(info.indexOf("我叫")==0){
		String name = info.replace("我叫","");
		rst = name + "，你好！";
	}else{
		rst = infos.get(info);
		rst = null==rst? "听不懂。按\"？\"可以看到我能理解的信息。":rst;
	}
%>
<%="<msg>"+rst+"</msg>"%>
