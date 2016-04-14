"use strict";
/**
 ==================================================================================
 Description:       desc
 Creation Date:     ${DATE}
 Author:            ${USER}
 ==================================================================================
 Revision History
 ==================================================================================
 Rev    Date        Author           Task                Description
 ==================================================================================
 1      ${DATE}     ${USER}          TaskNumber          Created
 ==================================================================================
 */

var React = require('react-native');
var synchronization = require('./synchronization.js');
var server_auth = require('./server_auth');
var LoginComponent = require('./app.component.login');
var SideBarSection = require('./app.component.side-bar');
var DataListComponent = require('./app.component.data-list');
var ForerunnerDB = require("forerunnerdb");
var fdb = new ForerunnerDB(); 
var db = fdb.db('xenforma');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
//import Swiper from 'react-native-swiper'
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  DrawerLayoutAndroid,
  Dimensions,
  ToolbarAndroid,ListView,
  TextInput,
} = React;
var DRAWER_WIDTH_LEFT = 56;
var Maincomponent = React.createClass({
    getInitialState: function() {
        var context = this;		 
		 
		
        return {data:"Loading...",menustate:"left"};
    },
 
  onActionSelected: function(position) {
	  //this.drawer.openDrawer();  
  },
  onActionclose_secondsub:function(rowID,rowData){  
    this.setState({itemcont:rowData})  
	console.log(rowData); 
	console.log("rowData"); 
  },
  onActionclose_threesub:function(rowID,rowData){  
    this.setState({itemcont:rowData})  
	this.drawer.closeDrawer(); 
  },
  app_object_handler: function (app_object) {
        var context = this;
        var handle_app_object = function () {
            var state_object = context.get_clear_state();
            var code = app_object.code;
            var data_list = app_object.type == "data_list";
            var edit_form = app_object.type == "edit_form";
            var dashboard = app_object.type == "dashboard";      
			
			var conditions=[];
			conditions=app_object.conditions || {};
			
            delete state_object.app_object_conditions;
            if (app_object.workflow_conditions) {
                conditions.workflow_status = app_object.workflow_conditions.workflow_status; //overrides standing conditions.
            }

            state_object.data_list = data_list;
            state_object.edit_form = edit_form;
            state_object.dashboard = dashboard;
            state_object.app_object_code = code;
			console.log("index-android");
            if (data_list) {				
                state_object.app_object_conditions = conditions;
            }
            state_object.edit_form_id = app_object._id;
            context.setState(state_object);
        };
      
	  
		this.get_object(app_object);
		return handle_app_object();
    },
	get_object:function(app_object){
		var context=this;
		var request = {};
        request.entity = "app_object";
        request.method = "get_by_code";
        request.data = {app_object_code: app_object.code, conditions: context.state.app_object_conditions};
       
        var context = this;
		server_auth.do_authenticated_http_call('api/entity/invoke_method', {
        method: "POST",				
        headers: {          
            "Content-Type":"application/json"
        },
        body: JSON.stringify(request)
		}).then((response) => {	
		
		   response.json().then(function(json_response) {	
		    console.log(json_response.data.app_object);			
			 console.log("json response");
			   context.setState({
                    app_object: json_response.data.app_object,
                    entity_attributes: json_response.data.entity_attributes,
                    entity_instances: []
                });		
                context.get_colums();				
				//push_href_location(json_response.data.app_object.name + " - " + (R.client_application_title || "Xenforma"), "/data_list?code=" + data.data.app_object.code);
			  
		   }).catch(function(err) {
			  context.setState({error: err.responseJSON.message});             
           }); 
		}).catch(function(err) {
			context.setState({error: err.responseJSON.message}); 
		});
	},
	get_colums:function(){
	   var columns = [];
       var context = this;	 
	   console.log("rendser_submenu");
	 
	  for (var i = 0; context.state.entity_attributes && i < context.state.entity_attributes.attributes.length; i++) {
	        
			var attribute = context.state.entity_attributes.attributes[i];
			
            if (!attribute.list_visible) {
                continue;
            }
			if (attribute.type == "Mixed" || attribute.is_array) {
                continue;
            }
			var column = {id:i, dataField: attribute.field_path, caption: attribute.caption};
			//console.log(column);
			if (attribute.list_of_values) {
			
                var tempAttribute = attribute.list_of_values;
                column.allowHeaderFiltering = true;
                column.headerFilter = {
                    dataSource: {
                        load: function (loadOptions) {
                            var res = [];
                            for (var i = 0; i < tempAttribute.length; i++) {
								
                                res.push({text: tempAttribute[i].value, value: tempAttribute[i].code});
                            }
                            return res;
                        }
                    }
                }
            }
            else {
                column.allowHeaderFiltering = false;
            }
			var type = attribute.attribute_type == null ? attribute.db_type : attribute.attribute_type;
			columns.push(column);
			
	  }
	  var column = {id:i+1, dataField: "", caption: ""}; //blank header;
	  columns.push(column);
	  context.setState({columns :columns});
		
	  context.setState({header_caption : {"Header": columns}});
	  context.setState({header_length : columns.length});
	},
	get_clear_state : function () {
    var state_object = {};
    state_object.settings = false;
    state_object.invite_users = false;
    state_object.edit_form = false;
    state_object.data_list = false;
    state_object.app_object_code = false;
    state_object.edit_form_id = undefined;
    state_object.dashboard = false;
    state_object.setup_user = false;
    state_object.reset_password = false;
    state_object.forgot_password = false;
    state_object.search = false;
    state_object.search_string = undefined;
    state_object.user_data_list = false;
    state_object.home = false;    
    return state_object;
   },
   leftmenuclose:function(){
	 this.drawer.closeDrawer();  
   },
   navigationView:function(){
		if(this.state.menustate=="left")
			return(	<SideBarSection on_closesecond_Event={this.onActionclose_secondsub}
			on_closethree_Event={this.onActionclose_threesub } 
			mainmenu={this.props.mainmenu}
			app_object_handler={this.app_object_handler}
			setclosemenufunc={this.leftmenuclose}
			
			/>);
		else
			return( 
			 <View style={{flexDirection:'row',flex:1,width:windowSize.width}}>
				

			   <View style={{backgroundColor:'#FFF',borderRadius:2,flexDirection:'column',flex:.90,
				}}>
				  <View sytle={{flex:1,height:50}} >	
					 <ToolbarAndroid
									  logo={{uri: "https://dev.tractfile.com/images/logo.png"}}
									  title=""                
									   style={styles.toolbar}				 				   
									   />   
					
				  </View>
				
				<View style={{height:40,borderWidth:1,borderColor:'#FFF',borderBottomColor:'#CCC',justifyContent: 'center',paddingLeft:30}}>
				</View>
				
				 <View style={{height:40,borderWidth:1,borderColor:'#FFF',borderBottomColor:'#CCC',justifyContent: 'center',paddingLeft:30}}>
				  
				  <TouchableOpacity  onPress={this.onmyorder}>
					<Text style={{color:'#373037'}}>{'User Setting'}</Text>
				   </TouchableOpacity>
				   
				  </View>				  
				  <View style={{height:40,justifyContent: 'center',paddingLeft:30,borderWidth:1,borderColor:'#FFF',borderBottomColor:'#CCC',}}>
					<TouchableOpacity  onPress={this.onwallet}>
					 <Text style={{color:'#373037'}}>{'Log out'}</Text>
					</TouchableOpacity>
				  </View>
				  
			   </View>
			   <View style={{flex:.10}}>
			   
			   </View>
			 </View>
			);
		  
		
   },  
   
   menuswitch:function(){
	
	  this.setState({menustate:"left"});  
	  this.drawer.openDrawer();
   },  
   menuswitch_B:function(){
	 this.setState({menustate:"right"})  ;

	 this.drawer.openDrawer();
   },
    render: function() {
       
				 var page_content = <DataListComponent app_object_code={this.state.app_object_code}
				                                   conditions={this.state.app_object_conditions}
												  
												   entity_attributes={this.state.entity_attributes}
												   entity_instances={this.state.entity_instances}
												   header_caption={this.state.header_caption}
												   header_length={this.state.header_length}
												   /> 
						
		
			return (		
			   <DrawerLayoutAndroid drawerWidth={320}				  			 
				                    drawerPosition={DrawerLayoutAndroid.positions.Left}
				                    ref={(drawer) => { this.drawer = drawer; }}				
				                    renderNavigationView={this.navigationView}>
				 <View style={styles.container}>
				   <ToolbarAndroid
				     logo={{uri: "https://dev.tractfile.com/images/logo.png"}}
				     title=""				 
                     navIcon={ require('./images/title.png')}
				     style={styles.toolbar}
				     onIconClicked={this.menuswitch}
				     actions={[{title: 'Settings', icon: require('./images/title.png'), show: 'always'}]}
				     onActionSelected={this.menuswitch_B}
				   />               
												  
					{page_content}		  
				 
				 	 	   
				 </View >
				 
				</DrawerLayoutAndroid>
			
			);
			
		
			
	},
});

var styles = StyleSheet.create({
    container: {
        flex: 1,       	
        backgroundColor: '#E6E6E6',		
    }, 
	 toolbar: {
    backgroundColor: '#2DC3E8',
    height: 50,
  },
	container_welcome: {
        flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
        backgroundColor: '#2DC3E8',
		
		
    },
	searchRow: {
    backgroundColor: 'red',
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
	
  },
  searchTextInput: {
    backgroundColor: 'white',
    borderColor: '#cccccc',
    borderRadius: 3,
    borderWidth: 1,
    paddingLeft: 8,
	height:30,
  },
	container_main: {
        flex: 1,
		top:37,
        justifyContent: 'center',
		alignItems: 'center',   
		backgroundColor: 'green',		
    },
	nav_bar_content:{
		flexDirection:'row',
		flex:1,height:35,
		justifyContent: 'space-between',
         alignItems: 'stretch',
		 flexWrap :'nowrap', 
		 backgroundColor: '#2DC3E8',
	},
	bottom_container: {
        flex: 1,       
        alignItems: 'center',
        backgroundColor: '#00FCFF',
		flexWrap :'nowrap',		
		marginBottom :10,
	   justifyContent: 'flex-end',
		
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
         margin: 10,
		color:'#FFFFFF',
		
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },wrapper: {
		 
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },
  text: {
    color: '#2DC3E8',
    fontSize: 30,
    fontWeight: 'bold',
  },
   
});

AppRegistry.registerComponent('Maincomponent', () => Maincomponent);
module.exports = Maincomponent;