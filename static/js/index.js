const ons = require('onsenui')
const _ = require('lodash')
const Parse = require('parse')
const $ = require('jquery')
const Highcharts = require('../vendor/highcharts')


ons.ready(function() {
  console.log("ons is ready")

  console.log("Parse is initialized")



  //query.equalTo("playerName", "Sean Plott");

});

document.addEventListener('init', function(event) {
  console.log("init event fired")
  var page = event.target;

  if (page.id === 'page1') {
    // page.querySelector('#push-button').onclick = function() {
    //   document.querySelector('#myNavigator').pushPage('page2.html', {data: {title: 'Page 2'}});
    // };
    Parse.initialize("petsbook001")
    Parse.serverURL = 'https://app.petsbook.io/parse'
    var GameScore = Parse.Object.extend("GameScore");
    var query = new Parse.Query(GameScore);
    query.find({
      success: function(results) {
        alert("Successfully retrieved " + results.length + " scores.");
        // Do something with the returned Parse.Object values
        _.map(results, (object)=>{
          $("#pets-list").append(
            `<ons-list-item class="pets-list-item">
            <div class="left">
            <img class="list__item__thumbnail" src="https://placekitten.com/g/40/40">
            </div>
            <div class="center">
            <span class="list__item__title">` + object.get('playerName') + `</span><span class="list__item__subtitle">On the Internet</span>
            </div>
            </ons-list-item>`
          )
        })
        // page.querySelector('.pets-list-item').onclick = function() {
        //   document.querySelector('#myNavigator').pushPage('page2.html', {data: {title: 'Page 2'}});
        // };
        _.map(document.querySelectorAll('.pets-list-item'), (x, idx) => x.onclick = function() {
          document.querySelector('#myNavigator').pushPage('page2.html', {data: {title: results[idx].get('playerName')}});
        })

      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  } else if (page.id === 'page2') {
    console.log("page2", page, page.data)
    page.querySelector('ons-toolbar .center').innerHTML = "<span>" + page.data.title + "的飲食紀錄</span>";
    $(function () {
        var myChart = Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Fruit Consumption'
            },
            xAxis: {
                categories: ['Apples', 'Bananas', 'Oranges']
            },
            yAxis: {
                title: {
                    text: 'Fruit eaten'
                }
            },
            series: [{
                name: 'Jane',
                data: [1, 0, 4]
            }, {
                name: 'John',
                data: [5, 7, 3]
            }]
        });
    });

  }
});
