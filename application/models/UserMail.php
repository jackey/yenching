<?php

class Application_Model_UserMail extends Zend_Db_Table_Abstract {
    
    protected $_name = "user_mails";
    protected $_primary = "umid";
    
    /**
     * 添加新的Mail
     */
    public function addNewMail($mail) {
        $valdator = new Zend_Validate_EmailAddress();
        if (!$valdator->isValid($mail)) {
            return FALSE;
        }
        
        $data = array(
            "cdate" => date("Y-m-d H:m:s"),
            "mail" => $mail
        );
        return $this->insert($data);
    }
}

