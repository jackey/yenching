<?php

class Admin_Bootstrap extends Zend_Application_Module_Bootstrap {

    public function _initSession() {
      print "HELLO";
      die();
        $session = new Zend_Session_Namespace("admin");
        Zend_Registry::set("Session_Admin", $session);
    }

}
