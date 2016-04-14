<?php extend('layout.php') ?>

<?php startblock('title') ?>
    View Location
<?php endblock() ?>

<?php startblock('css') ?>
    <?php echo get_extended_block(); ?>
<?php endblock() ?>

<?php startblock('js') ?>
    <?php echo get_extended_block(); ?>
    <script>
    $( document ).ready(function(){
        $('#menu_place').addClass('active');
    });
    </script>
<?php endblock() ?>

<?php startblock('bodycontent') ?>
<br>
<br>
<div class="body-nav">
    <div class="container">
        <div class="row">
        <div class="col-md-6 col-sm-6 col-xs-12" > <!-- id="head" -->
        <h1 style="display: inline-block; ">地點</h1>
        <div style="width=50%; display: inline-block;">
        <select class="form-control">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        </select>
        </div>
        </div>
            <div class="col-md-6 col-sm-6 col-xs-6" id="head">
                <button onclick="location.href='<?php echo site_url('Welcome/add_location'); ?>'" type="button" class="btn btn-primary pull-right"><span class="glyphicon glyphicon-plus-sign"></span> 新增</button>
            </div> 
        </div>
    </div>
</div>

<div class="firefly-body">
<div class="container">
  <div class="row">
                <?php
                if(isset($view_location) && is_array($view_location) && count($view_location)): $i=1;
                foreach ($view_location as $key => $data) { 
              ?>
                <div class="col-md-3 col-sm-3 col-xs-12">
                    <div class="place_img_wrap">
<!--                     <img src="<?php echo base_url('uploads/location/'. $data['id'].'.jpeg'); ?>" class="img-responsive"> -->
                    <img src="<?php echo base_url('uploads/location/2.jpeg'); ?>" class="img-responsive">
                    </div>
                    <p>地區: <?php echo $data['newlocation']; ?></p>
                    <p>地點: <?php echo $data['address']; ?></p>
                    <button onclick="location.href='<?php echo site_url('Welcome/edit_location/'. $data['id'].''); ?>'" type="button" class="btn btn-warning" style="display: block; margin:20px auto; ">編輯</button> 
                </div>
                <?php
                    $i++;
                      }
                  else:
                ?>
              <tr>
                    <td colspan="7" align="center" >No Records Found..</td>
                </tr>
                <?php
                endif;
              ?>
  </div> 
</div> 
</div> 
<?php endblock() ?>

<? end_extend() ?>



