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
        $('#menu_yacht').addClass('active');
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
      foreach ($edit_reservation as $key => $data) {
 ?>             
<form class="form-horizontal" method="post" action="<?php echo site_url('Welcome/update_reservation/'.$data['id'].''); ?>" name="data_register">
    <fieldset>
    <div class="form-group">
        <label for="inputEmail" class="control-label col-xs-3">日期</label>
        <div class="col-xs-5">
            <input type="date" class="form-control" name="fromdate" value="<?php echo $data['fromdate']; ?>">
        </div>
        <div class="col-xs-4">
            <input type="time" class="form-control" name="fromtime" value="<?php echo $data['fromtime']; ?>">
        </div>
        <!-- Blank Space -->
        <div class="col-xs-2">      
        </div>
        <div class="col-xs-12 text-center">
        至
        </div>
        <label for="inputEmail" class="control-label col-xs-3"></label>
        <div class="col-xs-5">
            <input type="date" class="form-control" name="todate" value="<?php echo $data['todate']; ?>">
        </div>
        <div class="col-xs-4">
            <input type="time" class="form-control" name="totime" value="<?php echo $data['totime']; ?>">
        </div>
    </div>
    <div class="form-group">
        <label for="inputPassword" class="control-label col-xs-3">遊艇</label>
        <div class="col-xs-9">
            <select class="form-control">
                <option>請選擇</option>
            </select>
        </div>
    </div>
    <div class="form-group">
        <label for="inputPassword" class="control-label col-xs-3">船家</label>
        <div class="col-xs-9">
            <select class="form-control">
                <option>請選擇</option>
            </select>
        </div>
    </div>
    <div class="form-group">
        <label for="inputPassword" class="control-label col-xs-3">客人姓名</label>
        <div class="col-xs-9">
            <input type="text" class="form-control" name="clientname">
        </div>
    </div>
    <div class="form-group">
        <label for="inputPassword" class="control-label col-xs-3">聯絡電話</label>
        <div class="col-xs-9">
            <input type="text" class="form-control" name="contactphone">
        </div>
    </div>
    <div class="form-group">
        <label for="inputPassword" class="control-label col-xs-3">登船地點</label>
        <div class="col-xs-9">
            <select class="form-control" name="boardinglocation">
                <option value="1" <?php if($data['boardinglocation'] == '1' ) { echo 'selected'; } ?>> 請選擇 </option>
                <option value="2" <?php if($data['boardinglocation'] == '2' ) { echo 'selected'; } ?>> 請選擇1 </option>
                <option value="3" <?php if($data['boardinglocation'] == '3' ) { echo 'selected'; } ?>> 請選擇2 </option>
                <option value="4" <?php if($data['boardinglocation'] == '4' ) { echo 'selected'; } ?>> 請選擇3 </option>
            </select>
        </div>
    </div>
    <div class="form-group">
        <label for="inputPassword" class="control-label col-xs-3">下船地點</label>
        <div class="col-xs-9">
            <select class="form-control">
                <option>請選擇</option>
            </select>
        </div>
    </div>
        <div class="form-group">
            <label for="inputPassword" class="control-label col-xs-3">狀態</label>
            <div class="col-xs-9">
               
                <input type="radio" name="status" id="radios-0" <?php if($data['status'] == 'yes' ) { echo 'checked'; } ?> value="yes">
                <label class="r-label" for="radios-0">可用</label> 
                
                <input type="radio" name="status" id="radios-1" <?php if($data['status'] == 'no' ) { echo 'checked'; } ?> value="no">
                <label class="r-label" for="radios-1">不可用</label> 
            </div>
        </div>
    
    <div class="form-group">
        <div class="col-xs-offset-2 col-xs-10">
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