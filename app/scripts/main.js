var postTemplate = _.template($('.post-template').html());
var apiURL = 'http://tiny-pizza-server.herokuapp.com/collections/jv-finally-damn';

$('input[type=submit]').on('click', function (event) {
  event.preventDefault();
  var fieldValues = $('.field').serializeArray();
  var dataObj = {};

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

      var finishedTemplate = _.map(allPosts, function (post) {
        if (_.isUndefined(post.title)) {
          post.title = '';
        }
        if (_.isUndefined(post.postBody)) {
          post.postBody = '';
        }
        return postTemplate(post);
      });

      $('.post-target').html(finishedTemplate);
    }
  })
}, 500);