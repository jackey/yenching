<?php

class Bootstrap extends Zend_Application_Module_Bootstrap {

    public function _initSession() {
        $session = new Zend_Session_Namespace("admin");
        Zend_Registry::set("Session_Admin", $session);
    }

}
