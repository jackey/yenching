<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        $request = $this->getRequest();
        $mNews = new Application_Model_News();
        $this->view->news = $mNews->getAllNews();
        $this->view->total_news  = 2;
    }
}

