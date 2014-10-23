var postTemplate = _.template($('.post-template').html());
var apiURL = 'http://tiny-pizza-server.herokuapp.com/collections/jv-finally-damn';

var Post = function (attributes) { // constructor function
  return _.extend({
    title: 'no title',
    postBody: 'none',
    date: new Date()
  }, attributes);
};


$('.preview-button').on('click', function (event) {
  event.preventDefault();
  var fieldValues = $('.field').serializeArray();
  var dataObj = new Post();

  fieldValues.forEach(function (field) {
    dataObj[field.name] = field.value;
  });

  $.ajax({
    method: 'POST',
    url: apiURL,
    data: dataObj
  }).done(function (data) {
    $('.field').val('')
  });

});

var previousCount = 0;

setInterval(function () {
  $.ajax({
    url: apiURL
  }).done(function (allPosts) {
    if(allPosts.length > previousCount) {
      previousCount = allPosts.length;

      var finishedTemplates = _.map(allPosts, function (postData) {
        return postTemplate(new Post(postData));
      });

      console.log(finishedTemplates); // plural vs singular

      $('.post-target').html(_.first(finishedTemplates)); /* the _.first underscore method is what causes the most
      recent post to always show up */
    }
  })
}, 500);