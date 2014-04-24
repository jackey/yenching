<?php

class ApiController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function newsAction()
    {
        $request = $this->getRequest();
        $mNews = new Application_Model_News();
        $news_list = $mNews->getAllNews();

        $this->responseJSON($news_list);
    }

    // JSON 返回一个错误
    public function responseError($error, $code = 500, $extra = array()) {
        $data = array(
            "error" => "",
            "data" => array(),
            "extra" => $extra,
            "code" => 0,
            "success" => FALSE,
        );
        $data["error"] = $error;
        $data["code"] = $code;
        
        $this->_helper->json($data);
    }
    
    // JSON 返回一些数据
    public function responseJSON($text, $extra = array()) {
        $data = array(
            "error" => "",
            "data" => array(),
            "extra" => $extra,
            "success" => TRUE,
            "code" => 0
        );
        $data["data"] = $text;
        $data["code"] = 200;
        
        $this->_helper->json($data);
    }

}

