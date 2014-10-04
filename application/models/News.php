<?php

class Application_Model_News {
  public static $api_host = "http://yenchingacademy.org";
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
      $newsCount = $ret["count"];
      $news = $ret["list"];
    }
    else {
      $news = $ret;
    }
    $keys = array_keys($news);

    // total count
    $total_count = 0;
    foreach ($news as $d_str => $item) {
      $total_count += count($item);
    }

    $date_str = $keys[count($keys) - 1];
    $last_news = array_pop($news);

    if ($total_count < 7) {
      $append_news_count = 7 - $total_count;
      $append_news = array();
      for ($i = 0; $i < $append_news_count; $i++) {
        $last_news[] = array(
            "news_id" => 0,
            "title" => "The Yenching Academy 2",
            "date" => "1/5/2014",
            "like" => "15",
            "body" => "To all the Yenching Scholars who want to get to know some awesome peers in campus should come to the YCA ball today from 8:30-10:00 PM on the Yenching Courtyard!",
            "images" => array("thumbnail" => "/public/misc/images/comingsoon.jpg",
                "slider" => array(
                    "/public/misc/images/pictures/news/new-page-mainvisual1.jpg",
                    "/public/misc/images/pictures/news/new-page-mainvisual2.jpg",
                    "/public/misc/images/pictures/news/new-page-mainvisual3.jpg",
                    "/public/misc/images/pictures/news/new-page-mainvisual4.jpg"
                ))
        );
      }
    }
    $news[$date_str] = $last_news;
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

    return array_pop(array_shift($news));
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
    return array_pop(array_shift($news));
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
