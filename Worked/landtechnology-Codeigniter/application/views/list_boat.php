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
      <div class="col-md-8 col-sm-8 col-xs-8">
        <h1>遊艇</h1>
      </div>
      <div class="col-md-4 col-sm-4 col-xs-4">
        <button onclick="location.href='<?php echo site_url('/Welcome/add_boat'); ?>'" type="button" class="btn btn-primary pull-right"><span class="glyphicon glyphicon-plus-sign"></span> 新增</button>
      </div> 
    </div>
  </div>
</div>
<br>
<div class="container hidden-xs">

<table class="table">
<thead>
      <tr >
        <th></th>
        <th>      
        <label for="shipper">船家</label>
        <select class="form-control" id="shipper">
        <option>a</option>
        <option>b</option>
        <option>c</option>
        <option>d</option>
           </select>
           </th>
        <th></th>
        <th>
          <label for="rent">租金</label>
        <select class="form-control" id="rent">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        </select>
           </th>
        <th>        <label for="status">狀態</label>
        <select class="form-control" id="status">
        <option>ok</option>
        <option>not ok</option>
      </select>      </th>
        <th></th>
      </tr>
    </thead>


  </table>
<table class="table table-bordered">
    <thead>
      <tr>
        <th>圖像</th>
        <th>船家</th>
        <th>概要</th>
        <th>租金</th>
        <th>狀態</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
              <?php
                if(isset($view_boat) && is_array($view_boat) && count($view_boat)): $i=1;
                foreach ($view_boat as $key => $data) { 
              ?>
      <tr>
        <td><a href="<?php echo site_url('/Welcome/add_reservation'); ?>"><img src="<?php echo base_url('/images/boat-'.$data['id'].''); ?>/1.png" height="150" width="200"></div></td>
        <td><?php echo $data['boat_owner']; ?></td>
        <td>

    <?php if($data['boat_equip1'] == 'yes' ) { echo '<button type="button" class="btn btn-success">25 <img src="http://landtechnology.com.hk/projects/boat/images/human.png" alt="human" height="21" width="8"></button>'; } ?>
    <?php if($data['boat_equip2'] == 'yes' ) { echo '<button type="button" class="btn btn-success">25 <img src="http://landtechnology.com.hk/projects/boat/images/wifi.png" alt="wifi" height="21" width="8"></button>'; } ?> 
    <?php if($data['boat_equip3'] == 'yes' ) { echo '<button type="button" class="btn btn-success">25 <img src="http://landtechnology.com.hk/projects/boat/images/cooking.png" alt="cooking" height="21" width="8"></button>'; } ?> 
    <?php if($data['boat_equip4'] == 'yes' ) { echo '<button type="button" class="btn btn-success">25 <img src="http://landtechnology.com.hk/projects/boat/images/singing.png" alt="singing" height="21" width="8"></button>'; } ?>     
   <!--  <button type="button" class="btn btn-success">25 <img src="images/human.png" alt="human" height="21" width="8"></button>
    <button type="button" class="btn btn-success"><img src="images/wifi.png" alt="wifi" height="21" width="21"></button>
    <button type="button" class="btn btn-success"><img src="images/cook.png" alt="cook" height="21" width="21"></button>
    <button type="button" class="btn btn-success"><img src="images/singing.png" alt="singing" height="21" width="21"></button> -->
    </td>
        <td><?php echo $data['boat_price']; ?></td>
        <td><?php echo $data['status']; ?></td>
        <td>       
        <a href="<?php echo site_url('Welcome/edit_boat/'. $data['id'].''); ?>">
          <span class="glyphicon glyphicon-edit"></span>
        </a>
        <a href="#">
          <span class="glyphicon glyphicon-remove-sign"></span>
        </a>
        </td>
      </tr>
 <?php
                    $i++;
                      }
                  else:
                ?>
              
                    <h1>No Records Found..</h1>
                
                <?php
                endif;
              ?>
    </tbody>
  </table>
</div>

<!-- <div class="container hidden-lg hidden-md hidden-sm">
<table class="table table-bordered">
    <thead>
      <tr>
        <th>圖像</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><a href="index.php?show=reservation" class="yacht-table-img"><img src="images/abc.jpg"></a></td>
      </tr>
      <tr>
        <th>船家</th>
      </tr>
      <tr>
        <td>abc</td>
      </tr>
    <tr>
        <th>概要</th>
      </tr>
    <tr>
        <td>
    <button type="button" class="btn btn-success">25 <img src="images/human.png" alt="human" height="21" width="8"></button>
    <button type="button" class="btn btn-success"><img src="images/wifi.png" alt="wifi" height="21" width="21"></button>
    <button type="button" class="btn btn-success"><img src="images/cook.png" alt="cook" height="21" width="21"></button>
    <button type="button" class="btn btn-success"><img src="images/singing.png" alt="singing" height="21" width="21"></button>
    </td>
      </tr>
    <tr>
        <th>租金</th>
      </tr>
    <tr>
        <td>HKD123</td>
      </tr>
    <tr>
        <th>狀態</th>
      </tr>
    <tr>
        <td>ok</td>
      </tr>
    <tr>
        <td>
    <a href="#">
          <span class="glyphicon glyphicon-edit"></span>
        </a>
        <a href="#">
          <span class="glyphicon glyphicon-remove-sign"></span>
        </a>
    </td>
      </tr>
    </tbody>
  </table>
</div> -->


</div>
    <!-- /.container -->
    <?php endblock() ?>

<? end_extend() ?>