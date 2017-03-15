<%@ page language="java" contentType="text/html" pageEncoding="utf-8"  %>
<%
request.setCharacterEncoding("utf-8");
response.setHeader("Access-Control-Allow-Origin", "*");
response.setContentType("text/xml;charset=utf-8"); //修改此次为text/xml  声明返回的是XML文件内容
%>
<%
synchronized(this) { 
	String rst = "";//返回值。
	String info = request.getParameter("info");

	//目标IP，若输入了目标IP，则视为人人对话。否则视为与服务器人机对话
	String ip = request.getParameter("ip");
	if(ip==null||"".equals(ip.trim())){
		//匹配特殊指令
		if("?".equals(info)||"？".equals(info)){
			IPMSG m =  new IPMSG();
			rst +=  "<msg>";
			rst +=  "<fromip>服务器</fromip>";
			rst +=  "<time>"+ m.time + "</time>";
			rst +=  "<info>"+ "输入你要发送消息的IP和聊天内容，是：" + request.getRemoteAddr() + ",可以告诉身边和你聊天的同学。:)" + 
			"<br/>新加入表情指令：bq0-bq6"+
			"</info>";
			rst +=  "</msg>";
		}else if("query".equals(info) ){
			String targetip = request.getRemoteAddr();
			System.out.println("查找指令，目标IP:" + targetip);
			java.util.List<IPMSG> ipmsg = (java.util.List<IPMSG>)application.getAttribute("ipmsg");
			if(null==ipmsg){
				ipmsg = new java.util.Vector<IPMSG>();
				application.setAttribute("ipmsg", ipmsg);
			}else{
				java.util.List<IPMSG> tmp = new java.util.ArrayList<IPMSG>();
				for(IPMSG m : ipmsg){
					if(targetip.equals(m.toip)){
						tmp.add(m);
						rst +=  "<msg>";
						rst +=  "<fromip>"+ m.fromip + "</fromip>";
						rst +=  "<time>"+ m.time + "</time>";
						rst +=  "<info>"+ m.info + "</info>";
						rst +=  "</msg>";
					}
				}
				for(IPMSG m : tmp){
					ipmsg.remove(m);
				}
			}			
			
		}else if("bq0".equals(info)){
			IPMSG m =  new IPMSG();
			rst +=  "<msg>";
			rst +=  "<fromip>服务器</fromip>";
			rst +=  "<time>"+ m.time + "</time>";
			rst +=  "<info>"+ "[懒]"+ "</info>";
			rst +=  "</msg>";
		}else if("bq1".equals(info)){
			IPMSG m =  new IPMSG();
			rst +=  "<msg>";
			rst +=  "<fromip>服务器</fromip>";
			rst +=  "<time>"+ m.time + "</time>";
			rst +=  "<info>"+ "[拉扯]"+ "</info>";
			rst +=  "</msg>";
		}else if("bq2".equals(info)){
			IPMSG m =  new IPMSG();
			rst +=  "<msg>";
			rst +=  "<fromip>服务器</fromip>";
			rst +=  "<time>"+ m.time + "</time>";
			rst +=  "<info>"+ "[贱笑]"+ "</info>";
			rst +=  "</msg>";
		}else if("bq3".equals(info)){
			IPMSG m =  new IPMSG();
			rst +=  "<msg>";
			rst +=  "<fromip>服务器</fromip>";
			rst +=  "<time>"+ m.time + "</time>";
			rst +=  "<info>"+ "[可怜]"+ "</info>";
			rst +=  "</msg>";
		}else if("bq4".equals(info)){
			IPMSG m =  new IPMSG();
			rst +=  "<msg>";
			rst +=  "<fromip>服务器</fromip>";
			rst +=  "<time>"+ m.time + "</time>";
			rst +=  "<info>"+ "[路过]"+ "</info>";
			rst +=  "</msg>";
		}else if("bq5".equals(info)){
			IPMSG m =  new IPMSG();
			rst +=  "<msg>";
			rst +=  "<fromip>服务器</fromip>";
			rst +=  "<time>"+ m.time + "</time>";
			rst +=  "<info>"+ "[惊讶]"+ "</info>";
			rst +=  "</msg>";
		}else if("bq6".equals(info)){
			IPMSG m =  new IPMSG();
			rst +=  "<msg>";
			rst +=  "<fromip>服务器</fromip>";
			rst +=  "<time>"+ m.time + "</time>";
			rst +=  "<info>"+ "[愤怒]"+ "</info>";
			rst +=  "</msg>";
		}else{
		 	IPMSG m =  new IPMSG();
			rst +=  "<msg>";
			rst +=  "<fromip>服务器</fromip>";
			rst +=  "<time>"+ m.time + "</time>";
			rst +=  "<info>"+ "听不懂。按\"？\"可以看到我能理解的信息。" + "</info>";
			rst +=  "</msg>";
		}
	}else{
		//将内容写入application缓存中。
		ip = ip.trim();
		System.out.println("ip:"+ip);
		String fromip = request.getRemoteAddr();
		java.util.List<IPMSG> ipmsg = (java.util.List<IPMSG>)application.getAttribute("ipmsg");
		if(null==ipmsg){
			ipmsg = new java.util.Vector<IPMSG>();
			application.setAttribute("ipmsg", ipmsg);
			System.out.println("创建缓存对象");
		}
		ipmsg.add( new IPMSG(fromip,ip, info) );
		System.out.println("添加缓存信息。");
		
	}
	rst = "<msglist>" + rst + "</msglist>";
	System.out.println(rst);
%>
<%=rst%>
<%}%>
<%!
	java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	class IPMSG{
		String fromip,toip,info, time;
		IPMSG(){
			this("","","");
		}
		IPMSG(String fromip, String toip, String info){
			time = sdf.format(new java.util.Date());
			this.fromip = fromip;
			this.toip = toip;
			this.info = info;
			System.out.println("创建缓存信息：" + fromip + "," + toip + "," + info );
		}
	}
%>
