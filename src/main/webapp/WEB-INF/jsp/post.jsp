<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
	<section class="bg-primary" id="posts">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 text-center posts">
	                <ul class="nav nav-tabs">
					  <li role="presentation"><a href="#">Suggested Jobs</a></li>
					  <li role="presentation"><a href="#">Job Posts</a></li>
					  <li role="presentation"><a href="#">My Posts</a></li>
					</ul>
					<div class="post-panel panel panel-default" id="panel1">
						
					</div>
					<div class="post-panel panel panel-default" id="panel2">
						
					</div>
					<div class="post-panel panel panel-default">
						<div class="panel-body" id="panelContent">
						    <div class="form-group">
	                			<div class="col-sm-12">
	                				<select class="form-control" id="myPostType">
	                					<option value="JAVADEVELOPER" selected>Java Developer</option>
	                					<option value="NETDEVELOPER">.Net Developer</option>
	                					<option value="WEBDEVELOPER">Web Developer</option>
	                				</select>
	                			</div>
	                			<div class="col-sm-12">
	                				<textarea id="myPostBody" class="form-control" required></textarea>
	                			</div>
	                			<div class="col-sm-12">
	                				<input type="submit" class="btn" value="Submit" id="myPostSubmit">
	                			</div>
                			</div>
						</div>
					</div>
					<div class="post-panel  panel panel-default">
						<div class="panel-body" id="panelContent">
						    MyPosts
						</div>
					</div>
	                </div>
            </div>
        </div>
    </section>