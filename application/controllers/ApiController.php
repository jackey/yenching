<?php

class ApiController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function newsAction()
    {
        $mNews = new Application_Model_News();

        $params = $this->getRequest()->getParams();
        $news_id = $params["news_id"];
        if ($news_id) {
            $news = $mNews->getNewsFromServer($news_id);
            $this->responseJSON($news);
        }
        else {
            $news_list = $mNews->getNewsListFromServer();
            $this->responseJSON($news_list);
        }
    }
    
    public function nextpagenewsv2Action() {
      $nextPageNum = $this->getRequest()->getParam('page');
      $category = $this->getRequest()->getParam("category");
      
      $mNews = new Application_Model_News();
      $newsList = array();
      $ret = $mNews->getNewsListFromServer(7, $nextPageNum, $category);
      foreach ($ret["list"] as $news) {
        foreach ($news as $n) {
          $newsList[] = $n;
        }
      }
      
      $categories = Application_Model_News::getNewsCategory();
      $this->view->categories = $categories;
      $this->view->newsList = $newsList;
      $this->view->category = $category;
      header("Content-Type: text/html; charset=utf-8");
      $this->_helper->layout()->disableLayout();
    }

    public function nextnewsAction() {
        $news_id = $this->getRequest()->getParam("news_id", FALSE);
        if ($news_id !== FALSE) {
            $mNews = new Application_Model_News();
            $news = $mNews->getNextNewsFromServer($news_id);
            if (!$news["news_id"]) {
                return $this->responseJSON(array());
            }
            $this->responseJSON($news);
        }
        else {
            $this->responseJSON();
        }
    }

    public function prenewsAction() {
        $news_id = $this->getRequest()->getParam("news_id", FALSE);
        if ($news_id !== FALSE) {
            $mNews = new Application_Model_News();
            $news = $mNews->getPreNewsFromServer($news_id);
            if (!$news["news_id"]) {
                return $this->responseJSON(array());
            }
            $this->responseJSON($news);
        }
        else {
            $this->responseJSON();
        }
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

