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
        $params = $this->getRequest()->getParams();
        $newsInCategory = array();
        $countInCategory = array();
        foreach ($mNews->getNewsCategory() as $key => $category) {
          $ret = $mNews->getNewsListFromServer(7, 1, $key);
          $countInCategory[$key] = $ret["count"];
          foreach ($ret["list"] as $news) {
            foreach ($news as $n) {
              $newsInCategory[$key][] = $n;
            }
          }
        }
        
        $this->view->news = $mNews->getNewsListFromServer();
        $this->view->newsInCategory = $newsInCategory;
        $this->view->countInCategory = $countInCategory;
        $this->view->total_news  = 2;
        $this->view->categories = $mNews->getNewsCategory();
    }

    public function testAction() {
        $this->_helper->layout->disableLayout();
    }

    public function newAction() {
        
    }
    
    public function searchAction() {
        $keyword = $_GET['q'];
        $mPage = new Application_Model_Page();
        $rows = $mPage->searchWithKeyword(trim($keyword));
        $rows = $rows->toArray();
        
        foreach ($rows as $key => $row) {
            $row["content"] = $mPage->limitText($row["content"]);
            $rows[$key] = $row;
        }
        $this->_helper->json($rows);
    }
    
    public function addnewmailAction() {
        $request = $this->getRequest();
        
        if (!$request->getPost() && FALSE) {
            $this->_helper->json(array(
                "error" => "post only"
            ));
        }
        else {
            $to = $request->getParam("mail");
            $userMail = new Application_Model_UserMail();
            $ret = $userMail->addNewMail($to);
            
            // 然后发送一个邮件
            if ($ret) {
                // 到这里 就发邮件
                $config = array(
                    "port" => "25",
                    "auth" => "login",
                    "ssl" => "ssl",
                    "username" => "yca-information@pku.edu.cn",
                    "password" => "yenching2014",
                );

                $send_text = "<p style=\"font-family:'Times Roma'\">Dear applicant, <br />
<br />
Thanks for your interest in our program. <br />
Please check more information in the digital brochure which is attached in the email. <br />
<br /> <br /><br />
 

Best,</br><br />
Yenching Academy of Peking University</p>";

                $transport = new Zend_Mail_Transport_Smtp("mail.pku.edu.cn", $config);

                //Zend_Mail::setDefaultTransport($transport);
                
                $file_name = "YENCHING BROCHURE.pdf";
                $file = file_get_contents(realpath(APPLICATION_PATH.'/../'. $file_name));
                $attachment = new Zend_Mime_Part($file);
                $attachment->type = "application/pdf";
                $attachment->disposition = Zend_Mime::DISPOSITION_ATTACHMENT;
                $attachment->encoding = Zend_Mime::ENCODING_BASE64;
                $attachment->filename = $file_name;

                // 发送中文邮件
                $mail = new Zend_Mail("UTF-8");

                $mail->setBodyHtml($send_text);
                $mail->setFrom("yca-information@pku.edu.cn", "Yenching Academy of Peking University");
                $mail->addTo($to);
                $mail->setHeaderEncoding(Zend_Mime::ENCODING_BASE64);
                $mail->setSubject("Yenching Academy of Peking University");
                $mail->addAttachment($attachment);
                try {
                    $mail->send();
                }
                catch (Exception $e) {
                    //
                    $this->_helper->json(array("data" => $e->getMessage()));
                }
            }
            
            $this->_helper->json(array('data' => "success"));
        }
    }
}

