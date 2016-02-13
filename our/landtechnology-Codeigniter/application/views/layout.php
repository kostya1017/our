<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title><? start_block_marker('title') ?><? end_block_marker() ?></title>

    <?php start_block_marker('css') ?>
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <link rel="stylesheet" href="http://landtechnology.com.hk/projects/boat/css/override.bootstrap.css">
    <link rel="stylesheet" href="http://landtechnology.com.hk/projects/boat/css/firefly.css">   
    <?php end_block_marker() ?>

    <?php start_block_marker('js') ?>
    <script src="http://landtechnology.com.hk/projects/boat/js/jquery-1.12.0.min.js"></script>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
    <?php end_block_marker() ?>
</head>
<body>
<?php start_block_marker('header') ?>
<nav class="navbar navbar-default navbar-fixed-top" role = "navigation" style="margin-bottom:0;padding-bottom:0;overflow:hidden;">
    <div class="container">
        <div class="col-md-12  col-sm-12  col-xs-12">
            <div class="row">
					<div class="col-md-6 col-sm-6 col-xs-6">
						<div class="navbar-text text-left nopadding">
							<img alt="Brand" src="http://landtechnology.com.hk/projects/boat/images/header/logo.png" />
						</div>
					</div>
					<div class="col-md-6 col-sm-6 col-xs-6">
						<div class="navbar-text nopadding pull-right">
								<div class="firefly-nav-user">
									<div style="float:left;padding-top:5px;">
										<span>admin</span>
										<a href="login.php"><span>Logout</span></a>
									</div>
									<div class="hidden-xs" style="float:left;">
										<img class="right" src="http://landtechnology.com.hk/projects/boat/images/header/tmp-user.png">
									</div>
									<div class="hidden-md" style="float:left;margin-left:10px;padding-right:0;margin-right:-20px">
									<button type="button" class="navbar-toggle btn btn-default" 
								 data-toggle = "collapse" data-target = "#example-navbar-collapse">
										 <span class = "sr-only">Toggle navigation</span>
										 <span class = "icon-bar"></span>
										 <span class = "icon-bar"></span>
										 <span class = "icon-bar"></span>
									  </button>
									</div>
								</div>

									
						</div>
					</div>

            </div>
            <div class="row">
				<div class="col-md-7 col-sm-7 col-xs-12">
					<div class="collapse navbar-collapse" id="example-navbar-collapse">
						<ul class="nav navbar-nav" style="margin-top:6px;overflow:hidden;">
							<li id="menu_main">
								<a href="<?php echo site_url('/Welcome/'); ?>"><span class="glyphicon glyphicon-home"></span> 主頁</a>
							</li>
							<li class="divider-vertical"></li>
							<li id="menu_owner">
								<a href="<?php echo site_url('/Welcome/view_owner'); ?>"><span class="glyphicon glyphicon-user"></span> 船家</a>
							</li>
							<li class="divider-vertical"></li>
							<li id="menu_yacht">
								<a href="<?php echo site_url('/Welcome/view_boat'); ?>"><span class="glyphicon glyphicon-cutlery"></span> 遊艇</a>
							</li>
							<li class="divider-vertical"></li>
							<li id="menu_place">
								<a href="<?php echo site_url('/Welcome/view_location'); ?>"><span class="glyphicon glyphicon-map-marker"></span> 地點</a>
							</li>
							<li class="divider-vertical"></li>
							<li <?php //if($_GET['show']=="calendar") echo 'class="active"'?>>
								<a href="<?php echo site_url('/Welcome/add_data'); ?>"><span class="glyphicon glyphicon-map-marker"></span> 日曆</a>
							</li>
						</ul>
					</div>
                </div> 
                <div class="col-md-5 col-sm-5 col-xs-12 hidden-xs">
                    <form class="navbar-form firefly-nav-input pull-right">
						<div class="input-group">
							<input type="text" class="form-control">
							<div class="input-group-btn">
								<button class="btn btn-default" type="button"><span class="glyphicon glyphicon-search"></span></button>
							
						
							  
							</div>
						</div>
                    </form>
					
                </div>
            </div>
        </div>
    </div>
</nav>

<div class="hidden-xs" style="padding-top:96px;width:100%"></div>
<div class="hidden-md hidden-lg  hidden-sm" style="padding-top:43px;width:100%"></div>
<?php end_block_marker() ?>

    <!-- <div id="content"> -->
        <?php start_block_marker('bodycontent') ?>
        <?php end_block_marker() ?>
    <!-- </div> -->

<?php start_block_marker('footer') ?>
	
		<div class="footer">
		</div>
		</div> <!--end absolute-->
<?php end_block_marker() ?>
</body>
</html>