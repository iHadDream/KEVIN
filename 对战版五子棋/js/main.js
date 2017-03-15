
		var n=0;
		var tmp=0;
		var index=0;

		function initTable(){
			var table=byId('table1');
			for(var i=0;i<15;i++){
			//创建棋盘
				var row=table.insertRow(-1);
				for(var j=0;j<15;j++){
					var cell=row.insertCell(-1);
					cell.className="cell";
					cell.onclick  =clk;
					//cell.innerHTML=tmp++;							
				}
			}
		}
		function clk(){
		    if('cell'!=this.className){//判断当前点击点有无棋子
				return;
			}
		    if(n++%2==0){
			    this.className+=" black";
		    }else{
			    this.className+=" white";
			}
	  		isWin(this);
	     	showMsg();
			send1();		
		}
		function run(index,n){
		 	var cells=byId('table1').getElementsByTagName('td');		 		
			    if(n++%2==0){
					this.className+=" black";
				}
	 	 	    else{
		  			this.className+=" white";
		  		}			
					  						
		 }
		function showMsg(){
			if(n%2==0){
				byId('info1').innerHTML="黑子";
			}else{
				byId('info1').innerHTML="白子";					
			}
		}
		//悔棋功能
		function regretCell(n){
			var cells=byId('table1').getElementsByTagName('td');
			var index=0;
			this.className=" black";
			for(var i=0;i<cells.length;i++){
					var cell=cells[i];
						if(cell==targetCell){
							index=i;
								alert(index);
							
							break;
							}
							
				
					
			}
			
		}
		//重置棋盘	
		function resetTable(){
				  var table = byId('table1');
				  var cells = table.getElementsByTagName('td');
				  for(var i=0;i<cells.length;i++){
						  var cell= cells[i];
						  cell.className="cell";				
					  }	
					  n=0;
					  showMsg();
		}
		
		function isWin(targetCell){
			var cells=byId('table1').getElementsByTagName('td');
		
			for(var i=0;i<cells.length;i++){
					var cell=cells[i];
						if(cell==targetCell){
							index=i;
							//send(index);
							break;
							}
							
			}
					leftAndright(index,cells,targetCell);
					
					topAndbottom(index,cells,targetCell);
					
					upperLeftAndlowRight(index,cells,targetCell);
					
					lowLeftAndupperRight(index,cells,targetCell);
					
		}
		function send1(){
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = complete();
			xhr.open("post","demoapp/demo5_p2p.jsp" ,true);
			xhr.setRequestHeader( "Content-Type" , "application/x-www-form-urlencoded" );//http://www.w3cschool.cc/http/http-header-fields.html 参考
			xhr.send('info='+index+'&ip='+byId('ip').value);
			byId('info').scrollIntoView();
			byId('info').value=index;
		
		}
		

		function baseCount(index,cells,targetCell,modValue,step){
			var num=-1;
			for(var i=index;i>0&&i<15*15&&i%15!=modValue; i = i + step){
				var cell=cells[i];
				if(cell.className==targetCell.className){
					num++;
					continue;
				}
					break;
	
			}
				return num;
		}
	
		function directionCount(index,cells,targetCell,modValue,modValue2,step){
			var num1 = baseCount(index,cells,targetCell,modValue,-1*step);
			var  num2  = baseCount	(index,cells,targetCell,modValue2,step);
			//console.log('topnum:'+topnum+',bottomnum:'+bottomnum);
			if( num1 + num2==4 ){
				showWinner();
				return true;
			}	
		}
	
		function leftAndright(index,cells,targetCell){
			return directionCount(index,cells,targetCell,14,0,1);
		}
		
		function topAndbottom(index,cells,targetCell){
			return directionCount(index,cells,targetCell,16,16,15);
		}
		function upperLeftAndlowRight(index,cells,targetCell){
			return directionCount(index,cells,targetCell,14,0,16);
		}
		function lowLeftAndupperRight(index,cells,targetCell){
			return directionCount(index,cells,targetCell,14,0,-14);
		}
		function showWinner(){
			var msg="游戏结束：";
			if(n%2==1){
				msg+="黑色 胜利";
				}else{
					msg+="白色 胜利";
					}
					alert(msg);
					resetTable();				
		}
			
		
		function byId(id){
			return document.getElementById(id);	
		}

<!-- 通信script-->

		function sendMsg(){
			//判断消息是否有内容，如果没有消息不需要做任何事情
			if(''==document.getElementById('info').value)
				return;
			else{
				//如果有消息，先将消息内容在msgTable区域显示出来(旧的消息+新的消息
				document.getElementById('msgTable').innerHTML+="<tr><td bgcolor=#DD9>我："+document.getElementById('info').value+"</td></tr>";

				
				//将消息通过XMLHttpRequest()对象发送给服务端
				var xhr = new XMLHttpRequest();
			
				xhr.onreadystatechange = complete();
				xhr.open("post","demoapp/demo5_p2p.jsp" ,true);
				xhr.setRequestHeader( "Content-Type" , "application/x-www-form-urlencoded" );//http://www.w3cschool.cc/http/http-header-fields.html 参考
				xhr.send('info=' +  byId('info').value + '&ip='+byId('ip').value) ;
				
				
				byId('info').scrollIntoView();
				byId('info').value='';

			}
		}		
		
		function autoquery(btn){
			btn.disabled = true;
			//每间隔1秒刷新函数
			window.setInterval('query()',1000);
		}
		
		function query(){
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = complete;
			xhr.open("post","demoapp/demo5_p2p.jsp" ,true);
			xhr.setRequestHeader( "Content-Type" , "application/x-www-form-urlencoded" );
			xhr.send('info=query');
		}
		
		
		
		function complete(){
			var xhr = this;
			if(xhr.readyState==4&&xhr.status==200){//连接建立完成
				run(index,n);
				var msglist = xhr.responseXML.getElementsByTagName('msg');
				for(var i=0;i<msglist.length;i++){
					var msg = msglist[i];
					var ip, time, info;
					//显示子类的内容
					ip =msg.childNodes[0].textContent;
					time =msg.childNodes[1].textContent;
					info =msg.childNodes[2].textContent;
					
					<!--part2：新内容2 开始 处理服务端返回信息中的表情部分。-->
					if(info=='[懒]'){
						info='<img src="demoapp/bqb/0.gif" class=bq />';
					}
					if(info=='[拉扯]'){
						info='<img src="demoapp/bqb/1.gif" class=bq2 />';
					}
					if(info=='[贱笑]'){
						info='<img src="demoapp/bqb/2.gif" class=bq2 />';
					}
					if(info=='[可怜]'){
						info='<img src="demoapp/bqb/3.gif" class=bq2 />';
					}
					if(info=='[路过]'){
						info='<img src="demoapp/bqb/4.gif" class=bq2 />';
					}
					if(info=='[惊讶]'){
						info='<img src="demoapp/bqb/5.gif" class=bq2 />';
					}
					if(info=='[愤怒]'){
						info='<img src="demoapp/bqb/6.gif" class=bq2 />';
					}
					if(info=='index')
						
					this.className+=" white";
					//在聊天框内容中显示接收的消息
					document.getElementById('msgTable').innerHTML+="<tr><td aglin=left>IP:"+ip+"<br> 发送时间："+time+"<br> 内容："+info+"</td></tr>";
					document.getElementById('msg2').scrollIntoView();

					var cells=byId('table1').getElementsByTagName('td');
					cells[info].onclick();

				}
			}
		}
		
		//将表情图片显示与消息框内
		function bq(sfx){
			var url = 'demoapp/bqb/' + sfx + '.gif';
			var img = '<tr><td align=left><img src="' + url + '" /></td></tr>';
			document.getElementById('msgTable').innerHTML+= '我说：'+img;
			document.getElementById('msg2').scrollIntoView();
		}
		

	