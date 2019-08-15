'use strict';

 

//create arrays to hold images and keywords
const images = [];       
let keywords = [];

//pretty simple image object
function image(url, title, description, keyword, horns) {    
  this.url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}
//end block

//parse that JSON YEEEEEEEEEEAAAAAAAAAAUUUUUUUUUUUUUUUGGGGGGGGHHHHHHHHHHHHH
$.getJSON('data/page-1.json', function(data) {          
  let $data = data;
  $data.forEach(function(element){
    images.push(new image(element.image_url, element.title, element.description, element.keyword, element.horns));
    keywords.push(element.keyword);
  });
  images.forEach(function(element){
    renderimage(element.url, element.title, element.description, element.horns, element.keyword);
  });
  keywords = new Set(keywords);
  keywords.forEach(function(element){
    createList(element);
  });
  $('select').change(hideElement);
});
//end code block

//time to display the good stuff
function renderimage(url, title, description, horns, keyword) {
  let $section = $('<section>').attr('data-keyword', keyword);
  let $title = $('<h2>').text(title);
  let $img = $('<img>').attr('src', url).attr('alt', description);
  let $text = $('<p>').text(`Num of horns: ${horns}`);
  $section.append($title, $img, $text);
  $('main').append($section);
}
//end block

//made da key list
function createList(keyword) {
  let $option = $('<option>').text(keyword).attr('value', keyword);
  $('select').append($option);
}
//end block

//make da filter
function hideElement() {
  let value = $(this).val();
  if(value !== 'default'){
    $('section').hide();
    $(`section[data-keyword=${value}]`).slideDown(888);
  } else {
    $('section').fadeIn(750);
  }
}
//end block

