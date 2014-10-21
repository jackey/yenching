<?php

class Application_Model_News {
  //public static $api_host = "http://yenchingacademy.org";
  //public static $api_host = "http://114.215.181.57:8083";
  public static $api_host = "http://yenching.local";
  /**
   * 
   * @param type $num
   * @param type $page
   * @param type $type
   * @return int
   */
  public function getNewsListFromServer($num = 7, $page = 1, $type = FALSE) {
    $host = self::$api_host."/admin/index.php?q=api/news";
    $client = new Zend_Http_Client($host);
    $client->setMethod(Zend_Http_Client::GET);
    $client->setParameterGet("num", $num)
            ->setParameterGet("page", $page);
    
    if ($type) {
      $client->setParameterGet("type", $type);
    }

    $res = $client->request();
    $body = $res->getBody();
    $ret = json_decode($body, TRUE);
    
    if (isset($ret["count"])) {
      $newsCount = $ret["total"];
      $news = $ret["content"];
    }
    else {
      $news = $ret;
    }

    if (isset($newsCount)) {
      return array("list" => $news, "count" => $newsCount);
    }
    else {
      return $news;
    }
  }

  public function getNextNewsFromServer($news_id, $type = FALSE) {
    $host = self::$api_host."/admin/index.php?q=api/news";
    $client = new Zend_Http_Client($host);
    $client->setMethod(Zend_Http_Client::GET);
    $client->setParameterGet("news_id", $news_id)
            ->setParameterGet("next", 1);
    
    if ($type) {
      $client->setParameterGet("type", $type);
    }


    $res = $client->request();
    $body = $res->getBody();
    $news = json_decode($body, TRUE);

    return (($news));
  }

  public function getPreNewsFromServer($news_id, $type = FALSE) {
    $host = self::$api_host."/admin/index.php?q=api/news";
    $client = new Zend_Http_Client($host);
    $client->setMethod(Zend_Http_Client::GET);
    $client->setParameterGet("news_id", $news_id)
            ->setParameterGet("next", 0);
    
    if ($type) {
      $client->setParameterGet("type", $type);
    }

    $res = $client->request();
    $body = $res->getBody();
    $news = json_decode($body, TRUE);
    return (($news));
  }

  public function getNewsFromServer($news_id) {
    $host = self::$api_host."/admin/index.php?q=api/news/" . $news_id;
    $client = new Zend_Http_Client($host);
    $client->setMethod(Zend_Http_Client::GET);

    $res = $client->request();
    $body = $res->getBody();
    $news = json_decode($body, TRUE);
    return $news;
  }
  
  public static function getNewsCategory() {
    static $categories;
    if (!empty($categories)) {
      return $categories;
    }
    $host = self::$api_host."/admin/index.php?q=api/category/";
    $client = new Zend_Http_Client($host);
    $client->setMethod(Zend_Http_Client::GET);

    $res = $client->request();
    $body = $res->getBody();
    $categories = json_decode($body, TRUE);
    return $categories;
  }

}
