<?php extend('layout.php') ?>

<?php startblock('title') ?>
    View Location
<?php endblock() ?>

<?php startblock('css') ?>
    <?php echo get_extended_block(); ?>
<?php endblock() ?>

<?php startblock('js') ?>q
    <?php echo get_extended_block(); ?>
    <script>
    $( document ).ready(function(){
        $('#menu_place').addClass('active');
    });
    </script>
<?php endblock() ?>

<?php startblock('bodycontent') ?>
<br>

<div class="body-nav">
    <div class="container">
        <div class="row">
            <div class="col-md-6 col-sm-6 col-xs-12">
                <h1>新增/編輯 預約資料</h1>
            </div>
        </div>
    </div>
</div>
<div class="firefly-body">
    <div class="container">
        <div class="row">
            <div class="col-md-9">
            <div style="width:100%;height:10px;"></div>

<?php
     // if(isset($view_data) && is_array($view_data) && count($view_data)): $i=1;
      foreach ($edit_location as $key => $data) {
 ?>             
<form class="form-horizontal" method="post" action="<?php echo site_url('Welcome/update_location/'.$data['id'].''); ?>" name="data_register">
    <fieldset>
    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
        <div class="form-group">
            <label for="inputPassword" class="control-label col-lg-3 col-md-3 col-sm-3 col-xs-3">地區</label>
            <div class="col-lg-10 col-md-9 col-sm-9 col-xs-9">
                <select class="form-control" name="newlocation">
                    <option>選擇地區</option>
                    <option value="1" <?php if($data['newlocation'] == '1' ) { echo 'selected'; } ?>>地區1</option>
                    <option value="2"<?php if($data['newlocation'] == '2' ) { echo 'selected'; } ?>>地區2</option>
                    <option value="3"<?php if($data['newlocation'] == '3' ) { echo 'selected'; } ?>>地區3</option>
                </select>
            </div>
        </div>
    </div>
    <hr class="control-label col-xs-12" style="margin-top:10px;margin-bottom:10px;">
    <div class="col-md-9">
        <div class="form-group">
            <label for="inputPassword" class="control-label col-lg-3 col-md-3 col-sm-3 col-xs-3">地點</label>
            <div class="col-lg-9 col-md-9 col-xs-9">
                <input type="text" class="form-control" name="address" value="<?php echo $data['address']; ?>">
            </div>
        </div>
    </div>
    <hr class="control-label col-xs-12" style="margin-top:10px;margin-bottom:10px;">
    <div class="col-md-9 col-sm-12 col-xs-12">
        <div class="form-group">
            <label for="inputPassword" class="control-label col-lg-3 col-md-3 col-sm-3 col-xs-3">地點相片</label>
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-9">                   
            <div class="image-upload">
            <label for="file-input">
            <img src="images/upload_photo.png" class="responsive">
            </label>
            <input id="file-input" type="file">
            </div>
            </div>
        </div>
    </div>
    <div class="form-group">
        <div class="col-lg-offset-2 col-lg-9 col-md-offset-2 col-md-9 col-sm-offset-2 col-sm-9 col-xs-offset-2 col-xs-9 form-button">
            <button type="submit" class="btn btn-warning" style="background:#F16B1F">儲存</button>
            <button type="cancel" class="btn">取消</button>
        </div>
    </div>
</fieldset>    
</form>
<?php
        }
        //endif;
     ?>
            <div style="width:100%;height:150px;"></div>
            </div>
        </div>
    </div>
</div><!--end container-->
<?php endblock() ?>

<? end_extend() ?>