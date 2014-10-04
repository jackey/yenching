<?php

class Application_Model_Page extends Zend_Db_Table_Abstract{
    protected $_name = "pages";
    protected $_primary = "pid";
    
    /**
     * 
     * @param type $keyword
     * @return Zend_Db_Table_Rowset_Abstract
     */
    public function searchWithKeyword($keyword) {
        $query = $this->select();
        $query->from($this->_name);
        $query->orWhere("title LIKE  ?", '%'.$keyword.'%');
        $query->orWhere("content LIKE ?", '%'.$keyword.'%');
        $query->limit(6);
        $rows = $this->fetchAll($query);
        
        return $rows;
    }
    
    public function limitText($str, $limit = 50) {
        if (str_word_count($str, 0) > $limit) {
            $words = str_word_count($str, 2);
            $pos = array_keys($words);
            $text = substr($str, 0, $pos[$limit]). '...';
            return $text;
        }
        
        return $str;
    }
}
