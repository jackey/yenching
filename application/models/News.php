<?php

class Application_Model_News
{

	public function getNews($news_id) {
		$all_news = $this->getAllNews();
		$news = NULL;
		foreach ($all_news as $date => $news_list) {
			foreach ($news_list as $news_item) {
				if ($news_item["news_id"] == $news_id) {
					$news = $news_item;
					break;
				}
			}
			if ($news) {
				break;
			}
		}
		return $news;
	}

	public function getPreNews($news_id) {
		$all_news = $this->getAllNews();
		$news = NULL;
		$pre_news = NULL;
		$index_index = 0;
		foreach ($all_news as $date => $news_list) {
			foreach ($news_list as $index => $news_item) {
				if ($news_item["news_id"] == $news_id) {
					$news = $news_item;
					break;
				}
			}
			if ($news) {
				if ($index - 1 < 0) {
					if ($index_index == 0) {
						$pre_news = array();	
					}
					else {
						$all_news_values = array_values($all_news);
						$pre_news_list = $all_news_values[$index_index - 1];
						$pre_news = $pre_news_list[count($pre_news_list) - 1];
					}
				}
				else {
					$pre_news = $news_list[$index - 1];
				}
			}

			if ($pre_news !== NULL) {
				break;
			}

			$index_index ++;
		}
		return $pre_news;
	}

	public function getNextNews($news_id) {
		$all_news = $this->getAllNews();
		$news = NULL;
		$next_news = NULL;
		$index_index = 0;
		foreach ($all_news as $date => $news_list) {
			foreach ($news_list as $index => $news_item) {
				if ($news_item["news_id"] == $news_id) {
					$news = $news_item;
					break;
				}
			}
			if ($news) {
				if ($index + 1 < count($news_list)) {
					$next_news = $news_list[$index + 1];
				}
				else {
					if ($index_index + 1 < count($all_news)) {
						$next_news_list = current($all_news);
						$next_news = $next_news_list[0];
					}
					else {
						$next_news = array();
					}
				}
			}

			if ($next_news !== NULL) {
				break;
			}

			$index_index ++;
		}
		return $next_news;
	}

	public function getAllNews() {
		$news = array(
			"2015 JUN" => array(
				array(
					"news_id" => 1,
					"title" => "The Yenching Academy 2",
					"date" => "5/5/2015",
					"like"=> "15",
					"body" => "To all the Yenching Scholars who want to get to know some awesome peers in campus should come to the YCA ball today from 8:30-10:00 PM on the Yenching Courtyard!",
					"images" => array(
						"thumbnail" => "/public/misc/images/pictures/news/n38.jpg",
						"slider" => array(
								"/public/misc/images/pictures/news/new-page-mainvisual1.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual2.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual3.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual4.jpg"
							)
						)
					),
				array(
					"news_id" => 2,
					"title" => "The Yenching Academy 2",
					"date" => "5/5/2015",
					"like"=> "15",
					"body" => "To all the Yenching Scholars who want to get to know some awesome peers in campus should come to the YCA ball today from 8:30-10:00 PM on the Yenching Courtyard!",
					"images" => array("thumbnail" => "/public/misc/images/pictures/news/n17.jpg",  
						"slider" => array(
								"/public/misc/images/pictures/news/new-page-mainvisual1.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual2.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual3.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual4.jpg"
							)
						)
					),
				array(
					"news_id" => 3,
					"title" => "The Yenching Academy 2",
					"date" => "5/5/2015",
					"like" => "15",
					"body" => "To all the Yenching Scholars who want to get to know some awesome peers in campus should come to the YCA ball today from 8:30-10:00 PM on the Yenching Courtyard!",
					"images" => array("thumbnail" => "/public/misc/images/pictures/news/n18.jpg", 
						"slider" => array(
								"/public/misc/images/pictures/news/new-page-mainvisual1.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual2.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual3.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual4.jpg"
							))
					),
				array(
					"news_id" => 4,
					"title" => "The Yenching Academy 2",
					"date" => "5/5/2015",
					"like" => "15",
					"body" => "To all the Yenching Scholars who want to get to know some awesome peers in campus should come to the YCA ball today from 8:30-10:00 PM on the Yenching Courtyard!",
					"images" => array("thumbnail" => "/public/misc/images/pictures/news/n19.jpg", 
						"slider" => array(
								"/public/misc/images/pictures/news/new-page-mainvisual1.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual2.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual3.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual4.jpg"
							))
					),
				array(
					"news_id" => 5,
					"title" => "The Yenching Academy 2",
					"date" => "5/5/2015",
					"like" => "15",
					"body" => "To all the Yenching Scholars who want to get to know some awesome peers in campus should come to the YCA ball today from 8:30-10:00 PM on the Yenching Courtyard!",
					"images" => array("thumbnail" => "/public/misc/images/pictures/news/n20.jpg", 
						"slider" => array(
								"/public/misc/images/pictures/news/new-page-mainvisual1.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual2.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual3.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual4.jpg"
							))
					),
				array(
					"news_id" => 6,
					"title" => "The Yenching Academy 2",
					"date" => "5/5/2015",
					"like" => "15",
					"body" => "To all the Yenching Scholars who want to get to know some awesome peers in campus should come to the YCA ball today from 8:30-10:00 PM on the Yenching Courtyard!",
					"images" => array("thumbnail" => "/public/misc/images/pictures/news/n21.jpg", 
						"slider" => array(
								"/public/misc/images/pictures/news/new-page-mainvisual1.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual2.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual3.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual4.jpg"
							))
					),
				array(
					"news_id" => 7,
					"title" => "The Yenching Academy 2",
					"date" => "5/5/2015",
					"like" => "15",
					"body" => "To all the Yenching Scholars who want to get to know some awesome peers in campus should come to the YCA ball today from 8:30-10:00 PM on the Yenching Courtyard!",
					"images" => array("thumbnail" => "/public/misc/images/pictures/news/n23.jpg", 
						"slider" => array(
								"/public/misc/images/pictures/news/new-page-mainvisual1.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual2.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual3.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual4.jpg"
							))
					),
				),
			"2015 MAY" => array(
				array(
					"news_id" => 8,
					"title" => "The Yenching Academy 2",
					"date" => "5/5/2015",
					"like" => "15",
					"body" => "To all the Yenching Scholars who want to get to know some awesome peers in campus should come to the YCA ball today from 8:30-10:00 PM on the Yenching Courtyard!",
					"images" => array("thumbnail" => "/public/misc/images/pictures/news/n11.jpg", 
						"slider" => array(
								"/public/misc/images/pictures/news/new-page-mainvisual1.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual2.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual3.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual4.jpg"
							))
					),
				array(
					"news_id" => 9,
					"title" => "The Yenching Academy 2",
					"date" => "5/5/2015",
					"like" => "15",
					"body" => "To all the Yenching Scholars who want to get to know some awesome peers in campus should come to the YCA ball today from 8:30-10:00 PM on the Yenching Courtyard!",
					"images" => array("thumbnail" => "/public/misc/images/pictures/news/n12.jpg", 
						"slider" => array(
								"/public/misc/images/pictures/news/new-page-mainvisual1.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual2.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual3.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual4.jpg"
							))
					),
				array(
					"news_id" => 10,
					"title" => "The Yenching Academy 2",
					"date" => "5/5/2015",
					"like" => "15",
					"body" => "To all the Yenching Scholars who want to get to know some awesome peers in campus should come to the YCA ball today from 8:30-10:00 PM on the Yenching Courtyard!",
					"images" => array("thumbnail" => "/public/misc/images/pictures/news/n13.jpg", 
						"slider" => array(
								"/public/misc/images/pictures/news/new-page-mainvisual1.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual2.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual3.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual4.jpg"
							))
					),
				array(
					"news_id" => 11,
					"title" => "The Yenching Academy 2",
					"date" => "5/5/2015",
					"like" => "15",
					"body" => "To all the Yenching Scholars who want to get to know some awesome peers in campus should come to the YCA ball today from 8:30-10:00 PM on the Yenching Courtyard!",
					"images" => array("thumbnail" => "/public/misc/images/pictures/news/n14.jpg", 
						"slider" => array(
								"/public/misc/images/pictures/news/new-page-mainvisual1.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual2.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual3.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual4.jpg"
							))
					),
				array(
					"news_id" => 12,
					"title" => "The Yenching Academy 2",
					"date" => "5/5/2015",
					"like" => "15",
					"body" => "To all the Yenching Scholars who want to get to know some awesome peers in campus should come to the YCA ball today from 8:30-10:00 PM on the Yenching Courtyard!",
					"images" => array("thumbnail" => "/public/misc/images/pictures/news/n15.jpg", 
						"slider" => array(
								"/public/misc/images/pictures/news/new-page-mainvisual1.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual2.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual3.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual4.jpg"
							))
					),
				),
			"2015 aug" => array(
				array(
					"news_id" => 13,
					"title" => "The Yenching Academy", 
					"date" => "5/5/2015",
					"like" => "15",
					"body" => "To all the Yenching Scholars who want to get to know some awesome peers in campus should come to the YCA ball today from 8:30-10:00 PM on the Yenching Courtyard!",
					"images" => array("thumbnail" => "/public/misc/images/pictures/news/n1.jpg", 
						"slider" => array(
								"/public/misc/images/pictures/news/new-page-mainvisual1.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual2.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual3.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual4.jpg"
							))
					),
				array(
					"news_id" => 14,
					"title" => "The Yenching Academy 2",
					"date" => "5/5/2015",
					"like" => "15",
					"body" => "To all the Yenching Scholars who want to get to know some awesome peers in campus should come to the YCA ball today from 8:30-10:00 PM on the Yenching Courtyard!",
					"images" => array("thumbnail" => "/public/misc/images/pictures/news/n2.jpg", 
						"slider" => array(
								"/public/misc/images/pictures/news/new-page-mainvisual1.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual2.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual3.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual4.jpg"
							))
					),
				array(
					"news_id" => 15,
					"title" => "The Yenching Academy 2",
					"date" => "5/5/2015",
					"like"=> "15",
					"body" => "To all the Yenching Scholars who want to get to know some awesome peers in campus should come to the YCA ball today from 8:30-10:00 PM on the Yenching Courtyard!",
					"images" => array("thumbnail" => "/public/misc/images/pictures/news/n3.jpg", 
						"slider" => array(
								"/public/misc/images/pictures/news/new-page-mainvisual1.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual2.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual3.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual4.jpg"
							))
					),
			),
			"2015 MAR" => array(
				array(
					"news_id" => 16,
					"title" => "The Yenching Academy 2",
					"date" => "5/5/2015",
					"like"=> "15",
					"body" => "To all the Yenching Scholars who want to get to know some awesome peers in campus should come to the YCA ball today from 8:30-10:00 PM on the Yenching Courtyard!",
					"images" => array("thumbnail" => "/public/misc/images/pictures/news/n4.jpg", 
						"slider" => array(
								"/public/misc/images/pictures/news/new-page-mainvisual1.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual2.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual3.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual4.jpg"
							))
					),
				array(
					"news_id" => 17,
					"title" => "The Yenching Academy 2",
					"date" => "5/5/2015",
					"like"=> "15",
					"body" => "To all the Yenching Scholars who want to get to know some awesome peers in campus should come to the YCA ball today from 8:30-10:00 PM on the Yenching Courtyard!",
					"images" => array("thumbnail" => "/public/misc/images/pictures/news/n6.jpg", 
						"slider" => array(
								"/public/misc/images/pictures/news/new-page-mainvisual1.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual2.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual3.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual4.jpg"
							))
					),
				array(
					"news_id" => 21,
					"title" => "The Yenching Academy 2",
					"date" => "5/5/2015",
					"like"=> "15",
					"body" => "To all the Yenching Scholars who want to get to know some awesome peers in campus should come to the YCA ball today from 8:30-10:00 PM on the Yenching Courtyard!",
					"images" => array("thumbnail" => "/public/misc/images/pictures/news/n8.jpg", 
						"slider" => array(
								"/public/misc/images/pictures/news/new-page-mainvisual1.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual2.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual3.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual4.jpg"
							))
					),
				array(
					"news_id" => 18,
					"title" => "The Yenching Academy 2",
					"date" => "5/5/2015",
					"like"=> "15",
					"body" => "To all the Yenching Scholars who want to get to know some awesome peers in campus should come to the YCA ball today from 8:30-10:00 PM on the Yenching Courtyard!",
					"images" => array("thumbnail" => "/public/misc/images/pictures/news/n9.jpg", 
						"slider" => array(
								"/public/misc/images/pictures/news/new-page-mainvisual1.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual2.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual3.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual4.jpg"
							))
					),
				array(
					"news_id" => 20,
					"title" => "The Yenching Academy 2",
					"date" => "5/5/2015",
					"like"=> "15",
					"body" => "To all the Yenching Scholars who want to get to know some awesome peers in campus should come to the YCA ball today from 8:30-10:00 PM on the Yenching Courtyard!",
					"images" => array("thumbnail" => "/public/misc/images/pictures/news/n10.jpg", 
						"slider" => array(
								"/public/misc/images/pictures/news/new-page-mainvisual1.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual2.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual3.jpg",
								"/public/misc/images/pictures/news/new-page-mainvisual4.jpg"
							))
					),
				),
		
		);

		return $news;
	}
}

