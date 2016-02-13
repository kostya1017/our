<?php

/**
 *
 * Global session configuration file
 *
 *
 */

$CI = get_instance();

// domain
$config['global_cookie_domain'] = $CI->config->item('cookie_domain');
// COOKIE NAME
$config['global_cookie_name'] = 'sticky_global_session';
// base path
$account_api_base_url = $CI->config->item('api_base_url');
// base url
$config['gsession_base_url'] = $account_api_base_url;
// login path
$config['gsession_login'] = $account_api_base_url.'stickyauth/login';
// logout path
$config['gsession_logout'] = $account_api_base_url.'stickyauth/logout';
// api url
$config['gsession_api_url'] = $account_api_base_url.'api';
// api user
$config['gsession_api_user'] = 'admin';
// api password
$config['gsession_api_password'] = 'mypass';
// global admin cookie
$config['global_admin_cookie_name'] = 'sticky_admin_global_session';