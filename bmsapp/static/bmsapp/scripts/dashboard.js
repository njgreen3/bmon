// Generated by CoffeeScript 1.6.3
(function() {
  var addGauge, addRow, rowCounter, widgetCounter;

  window.ANdash = {};

  addGauge = function(parentID, gauge) {
    var opt, widgetID, _ref;
    opt = {
      chart: {
        events: {
          click: null
        },
        type: "gauge",
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      title: {
        text: gauge.title,
        style: {
          fontSize: "13px"
        }
      },
      pane: {
        startAngle: -130,
        endAngle: 130,
        background: [
          {
            backgroundColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [[0, "#FFF"], [1, "#333"]]
            },
            borderWidth: 0,
            outerRadius: "109%"
          }, {
            backgroundColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [[0, "#333"], [1, "#FFF"]]
            },
            borderWidth: 1,
            outerRadius: "107%"
          }, {}, {
            backgroundColor: "#DDD",
            borderWidth: 0,
            outerRadius: "105%",
            innerRadius: "103%"
          }
        ]
      },
      plotOptions: {
        series: {
          dataLabels: {
            style: {
              fontSize: "14px"
            }
          }
        }
      },
      yAxis: {
        min: gauge.minAxis,
        max: gauge.maxAxis,
        minorTickInterval: "auto",
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: "inside",
        minorTickColor: "#666",
        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: "inside",
        tickLength: 10,
        tickColor: "#666",
        labels: {
          step: 2,
          rotation: "auto",
          style: {
            fontSize: "10px"
          }
        },
        title: {
          text: gauge.units
        },
        plotBands: [
          {
            from: gauge.minAxis,
            to: gauge.minNormal,
            color: "#DF5353"
          }, {
            from: gauge.minNormal,
            to: gauge.maxNormal,
            color: "#55BF3B"
          }, {
            from: gauge.maxNormal,
            to: gauge.maxAxis,
            color: "#DF5353"
          }
        ]
      },
      series: [
        {
          data: [gauge.value],
          tooltip: {
            valueSuffix: " " + gauge.units
          }
        }
      ]
    };
    if (!((gauge.minNormal <= (_ref = gauge.value) && _ref <= gauge.maxNormal))) {
      opt.chart.backgroundColor = "#FCC7C7";
    }
    widgetID = "widget" + (widgetCounter++);
    $("#" + parentID).append("<div id=\"" + widgetID + "\" class=\"gauge\"></div>");
    if (gauge.urlClick != null) {
      $("#" + widgetID).css('cursor', 'pointer');
      opt.chart.events.click = function(e) {
        return window.location = gauge.urlClick;
      };
    }
    return $("#" + widgetID).highcharts(opt).width();
  };

  widgetCounter = 0;

  rowCounter = 0;

  addRow = function(parentID, widgetRow) {
    var rowID, totalWidth, widget, _i, _len;
    rowID = "row" + (rowCounter++);
    $("#" + parentID).append("<div id=\"" + rowID + "\" class=\"row\"></div>");
    totalWidth = 0;
    for (_i = 0, _len = widgetRow.length; _i < _len; _i++) {
      widget = widgetRow[_i];
      totalWidth += addGauge(rowID, widget);
    }
    return $("#" + rowID).width(totalWidth);
  };

  ANdash.createDashboard = function(parentID, dashConfig) {
    var row, _i, _len, _ref, _results;
    $("#" + parentID).empty();
    _ref = dashConfig.widgets;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      row = _ref[_i];
      _results.push(addRow(parentID, row));
    }
    return _results;
  };

}).call(this);
