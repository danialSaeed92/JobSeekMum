/**
 * 
 */

$(function(){
	
	var successMsg = "<div class='alert alert-success'><strong>Success!</strong> Indicates a successful or positive action.</div>";
	var errorMsg = "<div class='alert alert-warning'> <strong>Warning!</strong> Indicates a warning that might need attention.</div>";
	
	
	var imagePath = "/JobSeekMum/resources/images/";
	//Retrieve suggested posts
	listSuggestedPosts();
	//Retrieve all posts
	getPosts();
	//Retrieve MyPosts
	getMyPosts();
	
	/*
	 * MyPost
	 */
	$("#myPostSubmit").click(function(){
		createMyPost();
	});
	
	//Activate Button MyPost
	$(".MyPostForm").keydown(function(){
		let type = $("#myPostType").val();
		let body = $("#myPostBody").val();
		let title = $("#myPostTitle").val();

		if(type != "" && body != "" && title != ""){
			$("#myPostSubmit").removeAttr('disabled');
		}
	});
	
	//Create MyPost
	function createMyPost(){
		let userId = 1;
		let type = $("#myPostType").val();
		let body = $("#myPostBody").val();
		let title = $("#myPostTitle").val();
		
		$.ajax("/JobSeekMum/addPost",{
			"type":"POST",
			"data": { 
				"user_id": userId,
				"postType": type,
				"postText": body,
				"postTitle": title
			},
		}).done(myPostCleanMsg)
		  .fail(showError);
	}
	
	//Get MyPosts
	function getMyPosts() {		
		$.get("/JobSeekMum/listMyPosts").done(retrieveMyPosts).fail(showError);
	}
	
	function retrieveMyPosts(data) {console.log(data);
	let postArr = JSON.parse(data).data; 
	for (let x in postArr){
		let limit = $('<div>', { class : 'limit-text' });
		let main = $('<div>', { class : 'post-wrapper-my-posts' });
		let one = $('<div>', { class : 'row' });
		let two = $('<div>', { class : 'col-sm-12' });
		let twoTwo = $('<div>', { class : 'col-sm-4 likes' });
		let twoThree = $('<div>', { class : 'col-sm-4' });
		let twoFour = $('<div>', { class : 'col-sm-4' });
		let three = $('<div>', { class : 'col-sm-2' });
		let threeTwo = $('<div>', { class : 'col-sm-10 text-left' });
		let threeImg = $('<img>', {
			class	:	'img-circle',
			alt		:	"user image",
			src		:	imagePath + "user.jpg"
		});
		let threep1 = $('<p>', {
			text	:	postArr[x].fullname
		});
		let threep2 = $('<p>', {
			class	:	'post-date grey-txt',
			text	:	'Posted on : ' + postArr[x].datecreated
		});
		let threep3 = $('<p>', {
			class	:	'post-date grey-txt',
			text	:	'Last Updated : ' + postArr[x].dateupdated
		});
		let threepTwoh3 = $('<h3>', {
			class	:	'post-title',
			text	:	postArr[x].posttitle
		});
		let threepTwoh4 = $('<h4>', {
			class	:	'post-cat grey-txt',
			text	:	postArr[x].posttype
		});
		let threepTwop = $('<p>', {
			class	:	'post-desc',
			text	:	 postArr[x].post
		});
		let twoTwoImg = $('<img>', {
			alt		:	'like image',
			src		:	imagePath + 'like.png'
		});
		let twoTwoSpan = $('<span>', {class : 'grey-txt', text : '30'});
		let twoThreea = $('<a>', {
			class		:	'view-comments italic', 
			href		: 	'#', 
			'data-attr'	:	'#' + postArr[x].postid,
			text 		: 	'view comments'
		});			
		let twoFourbtn = $('<button>', {
			class 		: 'btn bg-primary btn-sug-action', 
			'postid' 	: 	postArr[x].postid, 
			text 		: 'Suggest Post'
		});
		let readMore = $('<a>', {
			'href' 	: 	'#' + postArr[x].postid, 
			'class'	:	'readMorePost italic',
			'text' : 	'..readmore'
		});		
		let hiddenPostid = $('<input>', {
			'type' 	: 	'hidden', 
			'class'	:	'postId',
			'value' : 	postArr[x].postid
		});		
		
		
		$(main).html(one).append(hiddenPostid);
		$(one).html(two);
		$(two).html(three).append(threeTwo);
		$(twoTwo).html(twoTwoImg).append(twoTwoSpan);
		$(twoThree).html(twoThreea);
		$(twoFour).html(twoFourbtn);
		$(three).html(threeImg).append(threep1).append(threep2).append(threep3);
		$(limit).html(threepTwop).append(readMore);
		$(threeTwo).html(threepTwoh3).append(threepTwoh4).append(limit).append(twoTwo).append(twoThree).append(twoFour);
	
		//getComments();
		$('#panel4').append(main);
		//console.log(postArr[x]);
	}
}
	
	/*
	 * SuggetsPost Btn from post 
	 */

	$('#panel2').on('click', '.btn-sug-action', function() {
		//Clear items
		$('#listUserToSug').empty();
		//Set idPost
		$("#idPostSug").val($(this).attr("postid"));
		//Get all users
		$.ajax("/JobSeekMum/getUsers",{
			"type":"POST"
		}).done(function(data){
			//console.log(data);
			var data = JSON.parse(data).data;
			console.log(data);
			var listitems;
			$.each(data, function(key, value){
			    listitems += '<option value=' + value.userid + '>' + value.fullname + '</option>';
			});
			$("#listUserToSug").append(listitems);
		})
		  .fail(showError);
	});
	
	//Action of Suggest Btn in Window
	$("#btnSuggetPost").click(function(){
		//Select userid
		var userId = $("#listUserToSug").val()
		var postId = $("#idPostSug").val(); 
			
		console.log("Attribute postId:" + postId + " user: " + userId);
		$.ajax("/JobSeekMum/addSuggestPost",{
			"type":"POST",
			"data": { 
				"postId": postId,
				"toUserId": userId
			},
		}).done($("#messageSpace").append(successMsg))
		  .fail(showError);
	});
	
	
	
	
	/*
	 * Get POSTS
	 */
	function getPosts() {		
		$.get("/JobSeekMum/listUserPosts").done(retrievePosts).fail(showError);
	}
	
	function retrievePosts(data) {console.log(data);
		let postArr = JSON.parse(data).data; 
		let ids = "";
		for (let x in postArr){
			
			ids += postArr[x].postid + ',';
									
			let limit = $('<div>', { class : 'limit-text' });
			let main = $('<div>', { class : 'post-wrapper' });
			let one = $('<div>', { class : 'row' });
			let two = $('<div>', { class : 'col-sm-12' });
			let twoTwo = $('<div>', { class : 'col-sm-4 likes' });
			let twoThree = $('<div>', { class : 'col-sm-4' });
			let twoFour = $('<div>', { class : 'col-sm-4' });
			let three = $('<div>', { class : 'col-sm-2' });
			let threeTwo = $('<div>', { class : 'col-sm-10 text-left' });
			let threeImg = $('<img>', {
				class	:	'img-circle',
				alt		:	"user image",
				src		:	imagePath + "user.jpg"
			});
			let threep1 = $('<p>', {
				text	:	postArr[x].fullname
			});
			let threep2 = $('<p>', {
				class	:	'post-date grey-txt',
				text	:	'Posted on : ' + postArr[x].datecreated
			});
			let threep3 = $('<p>', {
				class	:	'post-date grey-txt',
				text	:	'Last Updated : ' + postArr[x].dateupdated
			});
			let threepTwoh3 = $('<h3>', {
				class	:	'post-title',
				text	:	postArr[x].posttitle
			});
			let threepTwoh4 = $('<h4>', {
				class	:	'post-cat grey-txt',
				text	:	postArr[x].posttype
			});
			let threepTwop = $('<p>', {
				class	:	'post-desc',
				text	:	 postArr[x].post
			});
			
			/*likes*/
			let twoTwoA = $('<a>', {
				'data-toggle'	:	'tooltip',
				id				:	postArr[x].postid + '_a',
				href			: 	"#",
				class			:	"anchorImage"
			});			
			let twoTwoImg = $('<img>', {
				alt		:	'like',
				src		:	imagePath + 'like.png',
				id		:	postArr[x].postid + '_img'
			});			
			let twoTwoInput = $('<input>', {
				type	:	'hidden',
				id		:	postArr[x].postid + '_input'
			});			
			let twoTwoSpan = $('<span>', {
				class 	: 'grey-txt', 
				text 	: '0',
				id		:	postArr[x].postid + '_span'
			});
			/*likes*/
			
			let twoThreea = $('<a>', {
				class		:	'view-comments italic', 
				href		: 	'#', 
				'data-attr'	:	'#' + postArr[x].postid,
				text 		: 	'view comments'
			});			
			let twoFourbtn = $('<button>', {
				class 		: 'btn bg-primary btn-sug-action', 
				'postid' 	: 	postArr[x].postid, 
				text 		: 'Suggest Post'
			});
			let readMore = $('<a>', {
				'href' 	: 	'#' + postArr[x].postid, 
				'class'	:	'readMorePost italic',
				'text' : 	'..readmore'
			});		
			let hiddenPostid = $('<input>', {
				'type' 	: 	'hidden', 
				'class'	:	'postId',
				'value' : 	postArr[x].postid
			});		
			
			$(twoTwoA).append(twoTwoImg);
			$(main).html(one).append(hiddenPostid);
			$(one).html(two);
			$(two).html(three).append(threeTwo);
			$(twoTwo).html(twoTwoA).append(twoTwoSpan).append(twoTwoInput);
			$(twoThree).html(twoThreea);
			$(twoFour).html(twoFourbtn);
			$(three).html(threeImg).append(threep1).append(threep2).append(threep3);
			$(limit).html(threepTwop).append(readMore);
			$(threeTwo).html(threepTwoh3).append(threepTwoh4).append(limit).append(twoTwo).append(twoThree).append(twoFour);
		
			//getComments();
			$('#panel2').append(main);
			//console.log(postArr[x]);
		}
		
		$('#replyObj').text(ids);
		setLikes();
		
	}
	
	function getComments(pid) {		
		$.post("/JobSeekMum/viewComment",{"data":{"postId":pid}}).done(retrieveComments).fail(showError);
	}
	
	function retrieveComments(data) {
		
	}
	/*	 *				
						<div class="row">
							<div class="comment col-sm-10 col-sm-offset-1">
								<div class="col-sm-2">
									<img class="img-circle" alt="user image" src="<%=request.getContextPath() %>/resources/images/user.jpg">
								</div>
								<div class="col-sm-10 text-left">
									<h5 class="comment-name bold clearfix">
										<a href="#" class="pull-left">Mafi M Aboye</a>
										<p class="pull-right grey-txt"><em>2 days ago</em></p>
									</h5>
									<p>
									    Duis aute irure dolor in reprehenderit in voluptate velit esse
                                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
									</p>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="comment col-sm-10 col-sm-offset-1">
								<div class="col-sm-2">
									<img class="img-circle" alt="user image" src="<%=request.getContextPath() %>/resources/images/user.jpg">
								</div>
								<div class="col-sm-10 text-left">
									<h5 class="comment-name bold clearfix">
										<a href="#" class="pull-left">Mafi M Aboye</a>
										<p class="pull-right grey-txt"><em>2 days ago</em></p>
									</h5>
									<p>
									    Duis aute irure dolor in reprehenderit in voluptate velit esse
                                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
									</p>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="new-comment comment col-sm-10 col-sm-offset-1">
								<div class="col-sm-10 col-sm-offset-1 text-left">
									<form action="">
										<textarea class="form-control" placeholder="Write Your Comment Here..."></textarea>
										<button class="btn bg-primary space-sm" type="submit">Post</button>
									</form>
								</div>
							</div>
						</div>
					</div>
					
					
	 */
	function myPostCleanMsg(){
		//Add message Todo
		$("#messageSpace").append(successMsg);
		setTimeout($("#messageSpace").append(""), 5000);
		
		 $("#myPostType").val('');
		 $("#myPostBody").val('');
		 $("#myPostTitle").val('');
		 $("#myPostSubmit").attr('disabled','disabled');
		alert("Insert ok");
	}
	
	/*
	 * SuggestedPosts
	 */
	
	
	function suggestPost(toUserId, postId){
		$.ajax("/JobSeekMum/addSuggestPost",{
			"type":"POST",
			"data": { 
				"toUserId": toUserId,
				"postId": postId
			},
		}).done($("#messageSpace").append(successMsg))
		  .fail(showError);
	}
	
	function listSuggestedPosts(){
	
		$.ajax("/JobSeekMum/listSuggestPost",{
			"type":"POST"
		}).done(showSuggestedPosts)
		  .fail(showError);
	}
	
	function showSuggestedPosts(data){
		var dataDisplay = "";
		let postArr = JSON.parse(data).data;
		console.log(postArr);
		for (let x in postArr){
			var aJob = $("<a/>",{
				class: "bold",
				text: postArr[x].POSTTITLE
			});
			
			var s = $("<span>",{
				text: " has suggested this job: "
			});
			var p = $("<a/>",{
				class: "bold",
				text: postArr[x].FULLNAME
			}); 
		
			var d = $("<div>", {
				class: "sugjobs"
			});
			
			$(d).append(p);
			$(d).append(s);
			$(d).append(aJob);
			$('#mySugPosts').append(d);
		}

		console.log(dataDisplay);
                                                                                                                                                                                                                                                                  
	}
	
	function showError(){
		//Add message Todo
		alert("Error");
	}
	
	/******** LIKES *********/
	function setLikes()
	{
		//alert('setLikes');
		let ids = $('#replyObj').text().split(',');
		if(ids.length > 0)
		{
			console.log(ids);
			for(let i in ids)
			{
				if(ids[i] != '')
				{
					let id_a = ids[i] + '_a';
					let id_input = ids[i] + '_input';
					let id_img = ids[i] + '_img';
					
					getLikePerUserPost(ids[i]);
					updateLikes(ids[i]);//# of likes and names 
					
					$("#" +id_a).click(function(){
						likeUnlikePost(id_img,ids[i],id_input);						
						return false;
					});
				}
			}
		}
	}
	
	
	function likeUnlikePost(id_img,postId,id_input)
	{
		var action = $("#"+id_img).attr("alt");
		var likeId = $("#" +id_input ).val();
		//alert(action);
		if(action === "like")
		{
			saveLike(postId);
		}
		else
		{
			removeLike(likeId,postId);				
		}	
		setTimeout(function(){ updateLikes(postId); }, 1000);
	}
	//**1**----------- ajax call
	function saveLike(postId)
	{
		$.ajax("/JobSeekMum/setLike",{
			"type":"POST",
			"async": "false",
			"data": { 
				"postId": postId
				
			}
		})
		.done(function(a,b,c){saveLikeSuccess(a,b,c,postId);})
		  .fail(showError);			
	}
	//------------callback------
	function saveLikeSuccess(data,b,c,postId)
	{
		//alert('saveLikeSuccess');
		let id = JSON.parse(data).data[0].likeid;
		$("#" + postId + "_input" ).val(id);
		$("#" + postId + "_img").attr("alt","unlike");
		let src = $("#" + postId + "_img").attr("src").toString();
		src = src.replace("like.png","like2.png");
		$("#" + postId + "_img").attr("src",src);
	}
	//-----------------------------
	
	//**2**----------- ajax call
	function removeLike(likeId,postId)
	{
		$.ajax("/JobSeekMum/unLike",{
			"type":"POST",
			"async": "false",
			"data": { 
				"likeId": likeId
			}
		}).done(function(a,b,c){removeLikeSuccess(a,b,c,likeId,postId)})
		  .fail(showError);
	}
	//------------callback------
	function removeLikeSuccess(data,b,c,likeId,postId)
	{
		$("#" + postId + "_input" ).val("");
		$("#" + postId + "_img").attr("alt","like");
		let src = $("#" + postId + "_img").attr("src").toString();
		src = src.replace("like2.png","like.png");
		$("#" + postId + "_img").attr("src",src);
	}	
	
	//**3**----------- ajax call
	function updateLikes(postId)
	{
		$.ajax("/JobSeekMum/getLikes",{
			"type":"POST",
			"async": "false",
			"data": { 
				"postId": postId
			}
		})
		.done(function(a,b,c){updateLikesSuccess(a,b,c,postId)})
		  .fail(showError);			
	}
	//------------callback------
	function updateLikesSuccess(data,b,c,postId)
	{
		var users = JSON.parse(data).data;
		var usersNames="";
		for(var obj in users)
		{
			usersNames += users[obj].fullname + '\n';
		}
		$("#" + postId + "_span" ).text(users.length);
		$("#" + postId + "_a").attr("title",usersNames);
	}
	//---------------------------
	
	//**4**----------- ajax call
	function getLikePerUserPost(postId)
	{
		$.ajax("/JobSeekMum/getLikePerUserPost",{
			"type":"POST",
			"async": "false",
			"data": { 
				"postId": postId
			}
		}).done(function(a,b,c){getLikePerUserPostSuccess(a,b,c,postId)})
		  .fail(showError);			
	}	
	//------------callback------
	function getLikePerUserPostSuccess(data,b,c,postId)
	{		
		//alert('getLikePerUserPostSuccess' + data);
		let objData = JSON.parse(data).data;
		if(objData.length > 0)
		{
			$("#" + postId + "_input").val(data.likeid);
			$("#" + postId + "_img").attr("alt","unlike");			
			let src = $("#" + postId + "_img").attr("src").toString();			
			src = src.replace("like.png","like2.png");
			$("#" + postId + "_img").attr("src",src);
		}
	}
		
});