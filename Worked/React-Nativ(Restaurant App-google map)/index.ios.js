"use strict";
/**
 ==================================================================================
 Description:       desc
 Creation Date:     3/10/16
 Author:            KOstya
 ==================================================================================
 Revision History
 ==================================================================================
 Rev    Date        Author           Task                Description
 ==================================================================================
 1      3/10/16     KOstya          TaskNumber          Created
 ==================================================================================
 */


var React = require('react-native');
var {
  AppRegistry
} = React;

var Main = require('./main')

AppRegistry.registerComponent('freshreact', () => Main);

