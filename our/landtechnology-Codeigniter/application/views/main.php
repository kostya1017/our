<?php extend('layout.php') ?>

<?php startblock('title') ?>
    Main Page
<?php endblock() ?>

<?php startblock('css') ?>
    <?php echo get_extended_block(); ?>
    <link href="http://landtechnology.com.hk/projects/boat/css/calendar/responsive-calendar.css" rel="stylesheet">
<?php endblock() ?>

<?php startblock('js') ?>q
    <?php echo get_extended_block(); ?>
    <script>
    $( document ).ready(function(){
        $('#menu_place').addClass('active');
    });
    </script>

    <?php endblock() ?>

<? end_extend() ?>
<?php endblock() ?>

<?php startblock('bodycontent') ?>
<br>
<div class="body-nav">
	<div class="container">
		<div class="row">
			<div class="col-md-6 col-sm-6 col-xs-6">
				<h1>主頁</h1>
			</div>
			<div class="col-md-6 col-sm-6 col-xs-6">
				
			</div> 
		</div>
	</div>
</div>
<br>
<div class="container">
	<div class="row">
            <div class="col-lg-5 col-md-6">
        <div class="responsive-calendar">
        <div class="controls">
            <a class="pull-left" data-go="prev"><div class="btn btn-warning"  style="background:#F16B1F">Prev</div></a>
            <div style="font-size:26px;margin-top:10px;margin-bottom:0;padding:0;"><span data-head-month></span> <span data-head-year></span></div>
            <a class="pull-right" data-go="next"><div class="btn btn-warning"  style="background:#F16B1F">Next</div></a>
        </div><hr/>
        <div class="day-headers days-fixs">
          <div class="day header">Mon</div>
          <div class="day header">Tue</div>
          <div class="day header">Wed</div>
          <div class="day header">Thu</div>
          <div class="day header">Fri</div>
          <div class="day header">Sat</div>
          <div class="day header">Sun</div>
        </div>
        <div class="days" data-group="days">     
		</div>
	   
	   
      </div>
            </div>
            <div class="col-lg-7 col-md-6 calendar-note">
            <h1>本星期事件</h1>
            <ul>
            <li><p>2015 / 01 / 12          Something happens</p></li>
            <li><p>2015 / 01 / 12          Something happens</p></li>
            <li><p>2015 / 01 / 12          Something happens</p></li>

            </ul>
            </div>            
        </div>

        <!-- /.row -->
        <div class="line"></div>
	</div>
</div>		

    <script src="http://landtechnology.com.hk/projects/boat/js/calendar/responsive-calendar.js"></script>
    <script type="text/javascript">
      $(document).ready(function () {    
        $(".responsive-calendar").responsiveCalendar({
          time: '2016-01',
          events: {}
        });
     
//get calendar info
        $.ajax({
             url: "event.php",
             type:'post',
             datatype: "json",
error:function(xhr, ajaxOptions, thrownError){ 
            alert(xhr.status); 
            alert(thrownError); 
                 },
success: function(result){  
     var res = {};
    $.each(result, function(key, value) {
        res[value.date] = value.option;
    });
    console.log(res);
    $(".responsive-calendar").responsiveCalendar('edit', res);
  }

  
});
        
        
        
/*      
// get description      
        $.ajax({
             url: "description.php",
             type:'post',
             datatype: "json",
error:function(xhr, ajaxOptions, thrownError){ 
            alert(xhr.status); 
            alert(thrownError); 
                 },
success: function(result){  
    $.each(result, function(key, value) {
        var description =();
        value.date = 
    });
  }

  
});*/
        
});
    </script>		

	
     <?php endblock() ?>

<? end_extend() ?>

