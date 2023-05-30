/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 10.0, "series": [{"data": [[0.0, 8.0], [1200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-17", "isController": false}, {"data": [[0.0, 7.0], [100.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-16", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-19", "isController": false}, {"data": [[0.0, 8.0], [300.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-18", "isController": false}, {"data": [[300.0, 3.0], [600.0, 1.0], [200.0, 5.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-9", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-20", "isController": false}, {"data": [[0.0, 6.0], [100.0, 4.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-22", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-21", "isController": false}, {"data": [[0.0, 5.0], [300.0, 1.0], [100.0, 3.0], [400.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-24", "isController": false}, {"data": [[0.0, 5.0], [100.0, 3.0], [200.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-23", "isController": false}, {"data": [[0.0, 4.0], [100.0, 4.0], [400.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-26", "isController": false}, {"data": [[0.0, 5.0], [100.0, 4.0], [400.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-25", "isController": false}, {"data": [[0.0, 3.0], [100.0, 6.0], [400.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-28", "isController": false}, {"data": [[1100.0, 2.0], [1200.0, 1.0], [600.0, 2.0], [1400.0, 1.0], [1500.0, 1.0], [1600.0, 1.0], [1900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-0", "isController": false}, {"data": [[0.0, 5.0], [100.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-27", "isController": false}, {"data": [[0.0, 5.0], [100.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-29", "isController": false}, {"data": [[300.0, 3.0], [1200.0, 1.0], [200.0, 6.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-7", "isController": false}, {"data": [[300.0, 3.0], [1200.0, 1.0], [1300.0, 1.0], [400.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-8", "isController": false}, {"data": [[0.0, 7.0], [100.0, 3.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-5", "isController": false}, {"data": [[0.0, 8.0], [100.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-6", "isController": false}, {"data": [[0.0, 5.0], [100.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-3", "isController": false}, {"data": [[0.0, 8.0], [100.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-4", "isController": false}, {"data": [[300.0, 1.0], [100.0, 7.0], [400.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-1", "isController": false}, {"data": [[0.0, 7.0], [100.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-2", "isController": false}, {"data": [[0.0, 3.0], [100.0, 7.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-31", "isController": false}, {"data": [[0.0, 2.0], [600.0, 1.0], [100.0, 6.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-30", "isController": false}, {"data": [[0.0, 5.0], [300.0, 1.0], [200.0, 1.0], [100.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-33", "isController": false}, {"data": [[0.0, 4.0], [100.0, 5.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-32", "isController": false}, {"data": [[0.0, 7.0], [100.0, 3.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-35", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0], [700.0, 1.0], [200.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-34", "isController": false}, {"data": [[0.0, 3.0], [100.0, 7.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-37", "isController": false}, {"data": [[0.0, 5.0], [600.0, 1.0], [300.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-36", "isController": false}, {"data": [[300.0, 2.0], [200.0, 5.0], [100.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-50", "isController": false}, {"data": [[0.0, 7.0], [100.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-6", "isController": false}, {"data": [[0.0, 6.0], [1200.0, 1.0], [300.0, 1.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-5", "isController": false}, {"data": [[0.0, 7.0], [1200.0, 1.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-4", "isController": false}, {"data": [[0.0, 6.0], [100.0, 1.0], [400.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-3", "isController": false}, {"data": [[300.0, 1.0], [1300.0, 1.0], [200.0, 5.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-9", "isController": false}, {"data": [[1200.0, 1.0], [1300.0, 1.0], [700.0, 1.0], [200.0, 6.0], [400.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-8", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [200.0, 8.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-7", "isController": false}, {"data": [[0.0, 1.0], [1200.0, 1.0], [300.0, 2.0], [1300.0, 1.0], [200.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/-48", "isController": false}, {"data": [[0.0, 6.0], [100.0, 4.0]], "isOverall": false, "label": "https://chaldal.com/-47", "isController": false}, {"data": [[0.0, 5.0], [2300.0, 1.0], [200.0, 3.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-11", "isController": false}, {"data": [[300.0, 6.0], [200.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-49", "isController": false}, {"data": [[0.0, 3.0], [300.0, 2.0], [1200.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-10", "isController": false}, {"data": [[0.0, 4.0], [100.0, 4.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-44", "isController": false}, {"data": [[0.0, 6.0], [300.0, 1.0], [100.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-2", "isController": false}, {"data": [[0.0, 5.0], [300.0, 1.0], [600.0, 1.0], [200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-13", "isController": false}, {"data": [[0.0, 5.0], [100.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/-43", "isController": false}, {"data": [[300.0, 1.0], [100.0, 6.0], [200.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-1", "isController": false}, {"data": [[0.0, 2.0], [300.0, 2.0], [100.0, 1.0], [200.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-12", "isController": false}, {"data": [[0.0, 5.0], [700.0, 1.0], [100.0, 3.0], [400.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-46", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [700.0, 1.0], [800.0, 1.0], [1700.0, 2.0], [1800.0, 1.0], [1000.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-0", "isController": false}, {"data": [[0.0, 7.0], [1200.0, 1.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-15", "isController": false}, {"data": [[0.0, 5.0], [100.0, 3.0], [200.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/-45", "isController": false}, {"data": [[0.0, 6.0], [600.0, 1.0], [200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-14", "isController": false}, {"data": [[0.0, 6.0], [100.0, 2.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-40", "isController": false}, {"data": [[0.0, 8.0], [100.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/-42", "isController": false}, {"data": [[0.0, 6.0], [1300.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "https://chaldal.com/-41", "isController": false}, {"data": [[0.0, 1.0], [300.0, 3.0], [1400.0, 1.0], [3200.0, 1.0], [200.0, 2.0], [900.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/-9", "isController": false}, {"data": [[300.0, 6.0], [400.0, 2.0], [200.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-5", "isController": false}, {"data": [[4600.0, 1.0], [4800.0, 1.0], [5100.0, 1.0], [5600.0, 1.0], [5700.0, 1.0], [6200.0, 1.0], [6700.0, 1.0], [3800.0, 1.0], [3900.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/", "isController": false}, {"data": [[0.0, 8.0], [300.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-17", "isController": false}, {"data": [[300.0, 6.0], [2400.0, 1.0], [400.0, 1.0], [800.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-6", "isController": false}, {"data": [[0.0, 7.0], [300.0, 3.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-16", "isController": false}, {"data": [[2300.0, 1.0], [1200.0, 1.0], [600.0, 1.0], [300.0, 2.0], [400.0, 1.0], [200.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-7", "isController": false}, {"data": [[0.0, 5.0], [100.0, 1.0], [200.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-15", "isController": false}, {"data": [[300.0, 6.0], [400.0, 1.0], [200.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-8", "isController": false}, {"data": [[0.0, 6.0], [600.0, 1.0], [200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-14", "isController": false}, {"data": [[300.0, 3.0], [700.0, 1.0], [100.0, 1.0], [3200.0, 1.0], [400.0, 1.0], [200.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-1", "isController": false}, {"data": [[0.0, 8.0], [100.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-13", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [2500.0, 1.0], [2600.0, 1.0], [2800.0, 1.0], [1700.0, 1.0], [1800.0, 3.0], [1900.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-2", "isController": false}, {"data": [[0.0, 3.0], [1500.0, 1.0], [200.0, 3.0], [3200.0, 1.0], [400.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-12", "isController": false}, {"data": [[2100.0, 1.0], [1300.0, 5.0], [1500.0, 1.0], [3200.0, 1.0], [1900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-3", "isController": false}, {"data": [[300.0, 4.0], [1200.0, 1.0], [200.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-11", "isController": false}, {"data": [[300.0, 7.0], [700.0, 1.0], [400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-4", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [1600.0, 1.0], [200.0, 6.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-10", "isController": false}, {"data": [[2100.0, 2.0], [2300.0, 1.0], [1200.0, 1.0], [2500.0, 2.0], [1300.0, 1.0], [1600.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-0", "isController": false}, {"data": [[19200.0, 1.0], [11200.0, 1.0], [12200.0, 1.0], [13200.0, 2.0], [12800.0, 1.0], [12900.0, 1.0], [13700.0, 1.0], [14400.0, 1.0], [15800.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[0.0, 5.0], [100.0, 4.0], [1000.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-37", "isController": false}, {"data": [[0.0, 7.0], [300.0, 1.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-36", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [100.0, 8.0]], "isOverall": false, "label": "https://chaldal.com/-39", "isController": false}, {"data": [[0.0, 7.0], [100.0, 3.0]], "isOverall": false, "label": "https://chaldal.com/-38", "isController": false}, {"data": [[0.0, 5.0], [1400.0, 1.0], [100.0, 2.0], [400.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/-33", "isController": false}, {"data": [[0.0, 1.0], [300.0, 2.0], [100.0, 5.0], [400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-32", "isController": false}, {"data": [[0.0, 4.0], [100.0, 5.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-35", "isController": false}, {"data": [[2200.0, 1.0], [2400.0, 1.0], [5100.0, 1.0], [2500.0, 1.0], [2600.0, 1.0], [3100.0, 1.0], [3200.0, 1.0], [1600.0, 1.0], [3400.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0], [200.0, 2.0], [100.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-34", "isController": false}, {"data": [[0.0, 7.0], [100.0, 1.0], [800.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-20", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0], [200.0, 4.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-12", "isController": false}, {"data": [[0.0, 7.0], [200.0, 1.0], [100.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-13", "isController": false}, {"data": [[0.0, 3.0], [100.0, 5.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-31", "isController": false}, {"data": [[0.0, 6.0], [600.0, 1.0], [300.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-14", "isController": false}, {"data": [[0.0, 1.0], [600.0, 1.0], [700.0, 1.0], [100.0, 6.0], [1000.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-30", "isController": false}, {"data": [[0.0, 4.0], [600.0, 1.0], [200.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-15", "isController": false}, {"data": [[300.0, 1.0], [1300.0, 1.0], [400.0, 1.0], [200.0, 4.0], [800.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-10", "isController": false}, {"data": [[0.0, 2.0], [300.0, 2.0], [400.0, 1.0], [200.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-11", "isController": false}, {"data": [[0.0, 2.0], [600.0, 1.0], [300.0, 1.0], [100.0, 2.0], [200.0, 4.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-28", "isController": false}, {"data": [[0.0, 6.0], [300.0, 1.0], [100.0, 2.0], [900.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-27", "isController": false}, {"data": [[200.0, 2.0], [100.0, 7.0], [400.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-26", "isController": false}, {"data": [[0.0, 2.0], [600.0, 1.0], [300.0, 1.0], [100.0, 6.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-25", "isController": false}, {"data": [[0.0, 5.0], [1500.0, 1.0], [100.0, 3.0], [400.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-24", "isController": false}, {"data": [[0.0, 8.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-23", "isController": false}, {"data": [[300.0, 1.0], [100.0, 6.0], [200.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-22", "isController": false}, {"data": [[0.0, 7.0], [300.0, 2.0], [1300.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-21", "isController": false}, {"data": [[0.0, 1.0], [600.0, 1.0], [200.0, 2.0], [100.0, 5.0], [900.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-29", "isController": false}, {"data": [[0.0, 8.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-19", "isController": false}, {"data": [[0.0, 8.0], [400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-18", "isController": false}, {"data": [[0.0, 6.0], [300.0, 1.0], [200.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-26", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [200.0, 2.0], [100.0, 2.0], [400.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-25", "isController": false}, {"data": [[0.0, 3.0], [600.0, 2.0], [300.0, 1.0], [100.0, 2.0], [800.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/-28", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0], [600.0, 1.0], [100.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-27", "isController": false}, {"data": [[0.0, 3.0], [100.0, 5.0], [200.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/-22", "isController": false}, {"data": [[0.0, 4.0], [1200.0, 1.0], [100.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/-21", "isController": false}, {"data": [[2100.0, 1.0], [4400.0, 1.0], [2300.0, 1.0], [2400.0, 1.0], [2800.0, 1.0], [3000.0, 1.0], [1700.0, 1.0], [3600.0, 1.0], [1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care", "isController": false}, {"data": [[300.0, 1.0], [100.0, 7.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-24", "isController": false}, {"data": [[600.0, 2.0], [300.0, 1.0], [100.0, 6.0], [400.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-23", "isController": false}, {"data": [[0.0, 3.0], [600.0, 1.0], [100.0, 4.0], [200.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-23", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [1200.0, 1.0], [200.0, 5.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-8", "isController": false}, {"data": [[0.0, 6.0], [300.0, 1.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-39", "isController": false}, {"data": [[0.0, 4.0], [300.0, 2.0], [100.0, 1.0], [200.0, 1.0], [400.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-24", "isController": false}, {"data": [[0.0, 4.0], [300.0, 2.0], [200.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-7", "isController": false}, {"data": [[0.0, 6.0], [300.0, 2.0], [100.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-38", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0], [100.0, 5.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-20", "isController": false}, {"data": [[0.0, 3.0], [600.0, 1.0], [100.0, 5.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-25", "isController": false}, {"data": [[0.0, 5.0], [100.0, 3.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-26", "isController": false}, {"data": [[0.0, 3.0], [300.0, 2.0], [1200.0, 1.0], [100.0, 1.0], [200.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-9", "isController": false}, {"data": [[0.0, 6.0], [300.0, 2.0], [700.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-4", "isController": false}, {"data": [[0.0, 7.0], [1500.0, 1.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-20", "isController": false}, {"data": [[0.0, 7.0], [300.0, 1.0], [600.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-3", "isController": false}, {"data": [[0.0, 5.0], [300.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-21", "isController": false}, {"data": [[0.0, 7.0], [300.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-6", "isController": false}, {"data": [[0.0, 3.0], [700.0, 1.0], [100.0, 3.0], [400.0, 1.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-22", "isController": false}, {"data": [[0.0, 7.0], [300.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-5", "isController": false}, {"data": [[2400.0, 2.0], [1200.0, 1.0], [700.0, 2.0], [900.0, 1.0], [1900.0, 3.0], [1000.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-0", "isController": false}, {"data": [[0.0, 4.0], [300.0, 3.0], [400.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-2", "isController": false}, {"data": [[300.0, 2.0], [600.0, 1.0], [100.0, 5.0], [400.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-1", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [700.0, 1.0], [100.0, 4.0], [200.0, 3.0]], "isOverall": false, "label": "https://chaldal.com/-19", "isController": false}, {"data": [[0.0, 5.0], [600.0, 1.0], [100.0, 3.0], [400.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-18", "isController": false}, {"data": [[0.0, 6.0], [300.0, 2.0], [100.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-40", "isController": false}, {"data": [[300.0, 3.0], [100.0, 6.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-29", "isController": false}, {"data": [[0.0, 5.0], [100.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-15", "isController": false}, {"data": [[0.0, 5.0], [300.0, 1.0], [100.0, 2.0], [200.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-42", "isController": false}, {"data": [[0.0, 5.0], [1200.0, 1.0], [100.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-14", "isController": false}, {"data": [[0.0, 5.0], [100.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-41", "isController": false}, {"data": [[0.0, 7.0], [100.0, 3.0]], "isOverall": false, "label": "https://chaldal.com/-17", "isController": false}, {"data": [[4100.0, 1.0], [2300.0, 1.0], [2400.0, 1.0], [2600.0, 2.0], [5400.0, 1.0], [2800.0, 1.0], [3200.0, 1.0], [3400.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials", "isController": false}, {"data": [[0.0, 8.0], [300.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-16", "isController": false}, {"data": [[0.0, 6.0], [300.0, 2.0], [200.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-43", "isController": false}, {"data": [[0.0, 7.0], [100.0, 3.0]], "isOverall": false, "label": "https://chaldal.com/-11", "isController": false}, {"data": [[0.0, 7.0], [400.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-16", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0], [1400.0, 1.0], [400.0, 1.0], [200.0, 3.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-10", "isController": false}, {"data": [[0.0, 6.0], [300.0, 3.0], [400.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-17", "isController": false}, {"data": [[0.0, 4.0], [600.0, 1.0], [100.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/-13", "isController": false}, {"data": [[0.0, 7.0], [300.0, 2.0], [700.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-18", "isController": false}, {"data": [[0.0, 5.0], [200.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "https://chaldal.com/-12", "isController": false}, {"data": [[0.0, 9.0], [400.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-19", "isController": false}, {"data": [[300.0, 4.0], [100.0, 3.0], [200.0, 3.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-30", "isController": false}, {"data": [[0.0, 4.0], [300.0, 3.0], [100.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-31", "isController": false}, {"data": [[0.0, 4.0], [200.0, 2.0], [100.0, 4.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-27", "isController": false}, {"data": [[0.0, 5.0], [100.0, 2.0], [400.0, 1.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-28", "isController": false}, {"data": [[0.0, 2.0], [100.0, 6.0], [200.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-29", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 19200.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 84.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 1387.0, "series": [{"data": [[0.0, 1387.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 138.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 84.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 1.2388059701492538, "minX": 1.68545034E12, "maxY": 7.059633027522941, "series": [{"data": [[1.6854504E12, 7.059633027522941], [1.68545046E12, 5.279411764705883], [1.68545034E12, 1.2388059701492538]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68545046E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 63.0, "minX": 1.0, "maxY": 19290.0, "series": [{"data": [[8.0, 89.5], [4.0, 77.0], [2.0, 69.0], [1.0, 70.0], [9.0, 92.0], [5.0, 1253.0], [6.0, 81.0], [3.0, 86.0], [7.0, 102.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-17", "isController": false}, {"data": [[5.299999999999999, 200.9]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-17-Aggregated", "isController": false}, {"data": [[8.0, 88.5], [4.0, 78.0], [2.0, 73.0], [1.0, 75.0], [9.0, 89.0], [5.0, 78.0], [6.0, 78.0], [3.0, 296.0], [7.0, 278.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-16", "isController": false}, {"data": [[5.299999999999999, 122.2]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-16-Aggregated", "isController": false}, {"data": [[8.0, 89.0], [4.0, 76.0], [2.0, 72.0], [1.0, 79.0], [9.0, 97.0], [5.0, 73.0], [6.0, 83.0], [3.0, 88.0], [7.0, 86.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-19", "isController": false}, {"data": [[5.299999999999999, 83.2]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-19-Aggregated", "isController": false}, {"data": [[8.0, 237.5], [4.0, 78.0], [2.0, 80.0], [1.0, 73.0], [9.0, 93.0], [5.0, 79.0], [6.0, 80.0], [3.0, 89.0], [7.0, 87.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-18", "isController": false}, {"data": [[5.299999999999999, 113.39999999999998]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-18-Aggregated", "isController": false}, {"data": [[4.0, 343.0], [8.0, 285.75], [9.0, 389.0], [7.0, 493.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-9", "isController": false}, {"data": [[7.7, 363.9]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-9-Aggregated", "isController": false}, {"data": [[8.0, 98.0], [4.0, 73.0], [2.0, 73.0], [1.0, 72.0], [9.0, 96.0], [5.0, 81.0], [6.0, 80.0], [3.0, 86.0], [7.0, 83.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-20", "isController": false}, {"data": [[5.299999999999999, 84.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-20-Aggregated", "isController": false}, {"data": [[8.0, 145.0], [4.0, 139.0], [2.0, 81.0], [1.0, 76.0], [9.0, 104.0], [5.0, 79.0], [6.0, 81.0], [3.0, 95.0], [7.0, 96.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-22", "isController": false}, {"data": [[5.299999999999999, 104.10000000000001]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-22-Aggregated", "isController": false}, {"data": [[8.0, 97.5], [4.0, 74.0], [2.0, 74.0], [1.0, 79.0], [9.0, 97.0], [5.0, 74.0], [6.0, 79.0], [3.0, 91.0], [7.0, 92.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-21", "isController": false}, {"data": [[5.299999999999999, 85.5]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-21-Aggregated", "isController": false}, {"data": [[8.0, 108.0], [4.0, 80.0], [2.0, 83.0], [1.0, 79.0], [9.0, 94.0], [5.0, 399.0], [6.0, 421.0], [3.0, 100.0], [7.0, 85.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-24", "isController": false}, {"data": [[5.299999999999999, 155.70000000000002]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-24-Aggregated", "isController": false}, {"data": [[8.0, 146.5], [4.0, 200.0], [2.0, 78.0], [1.0, 82.0], [9.0, 98.0], [5.0, 90.0], [6.0, 79.0], [3.0, 106.0], [7.0, 273.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-23", "isController": false}, {"data": [[5.299999999999999, 129.9]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-23-Aggregated", "isController": false}, {"data": [[8.0, 139.5], [4.0, 79.0], [2.0, 79.0], [1.0, 82.0], [9.0, 96.0], [5.0, 494.0], [6.0, 478.0], [3.0, 172.0], [7.0, 100.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-26", "isController": false}, {"data": [[5.299999999999999, 185.9]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-26-Aggregated", "isController": false}, {"data": [[8.0, 107.5], [4.0, 77.0], [2.0, 85.0], [1.0, 85.0], [9.0, 109.0], [5.0, 469.0], [6.0, 163.0], [3.0, 95.0], [7.0, 97.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-25", "isController": false}, {"data": [[5.299999999999999, 139.5]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-25-Aggregated", "isController": false}, {"data": [[8.0, 272.5], [4.0, 133.0], [2.0, 79.0], [1.0, 159.0], [9.0, 98.0], [5.0, 155.0], [6.0, 80.0], [3.0, 107.0], [7.0, 188.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-28", "isController": false}, {"data": [[5.299999999999999, 154.4]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-28-Aggregated", "isController": false}, {"data": [[4.0, 1225.0], [8.0, 1212.75], [9.0, 1413.6666666666667], [7.0, 1108.5]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-0", "isController": false}, {"data": [[7.7, 1253.4000000000003]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-0-Aggregated", "isController": false}, {"data": [[8.0, 182.0], [4.0, 82.0], [2.0, 78.0], [1.0, 83.0], [9.0, 173.0], [5.0, 136.0], [6.0, 84.0], [3.0, 163.0], [7.0, 89.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-27", "isController": false}, {"data": [[5.299999999999999, 125.2]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-27-Aggregated", "isController": false}, {"data": [[8.0, 307.0], [4.0, 74.0], [2.0, 77.0], [1.0, 137.0], [9.0, 92.0], [5.0, 80.0], [6.0, 167.0], [3.0, 91.0], [7.0, 169.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-29", "isController": false}, {"data": [[5.299999999999999, 150.1]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-29-Aggregated", "isController": false}, {"data": [[4.0, 358.0], [8.0, 279.25], [9.0, 604.3333333333334], [7.0, 299.5]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-7", "isController": false}, {"data": [[7.7, 388.70000000000005]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-7-Aggregated", "isController": false}, {"data": [[4.0, 353.0], [8.0, 569.25], [9.0, 609.3333333333334], [7.0, 299.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-8", "isController": false}, {"data": [[7.7, 505.59999999999997]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-8-Aggregated", "isController": false}, {"data": [[4.0, 109.0], [8.0, 86.25], [9.0, 105.0], [7.0, 97.5]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-5", "isController": false}, {"data": [[7.7, 96.39999999999998]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-5-Aggregated", "isController": false}, {"data": [[4.0, 105.0], [8.0, 85.75], [9.0, 90.66666666666667], [7.0, 97.5]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-6", "isController": false}, {"data": [[7.7, 91.5]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-6-Aggregated", "isController": false}, {"data": [[4.0, 102.0], [8.0, 87.5], [9.0, 98.0], [7.0, 101.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-3", "isController": false}, {"data": [[7.7, 94.8]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-3-Aggregated", "isController": false}, {"data": [[4.0, 106.0], [8.0, 85.0], [9.0, 96.0], [7.0, 97.5]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-4", "isController": false}, {"data": [[7.7, 92.89999999999998]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-4-Aggregated", "isController": false}, {"data": [[4.0, 323.0], [8.0, 162.25], [9.0, 245.66666666666669], [7.0, 295.5]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-1", "isController": false}, {"data": [[7.7, 230.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-1-Aggregated", "isController": false}, {"data": [[4.0, 101.0], [8.0, 167.5], [9.0, 103.66666666666667], [7.0, 99.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-2", "isController": false}, {"data": [[7.7, 128.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-2-Aggregated", "isController": false}, {"data": [[8.0, 110.5], [4.0, 136.0], [2.0, 134.0], [1.0, 82.0], [9.0, 101.0], [5.0, 81.0], [6.0, 82.0], [3.0, 161.0], [7.0, 161.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-31", "isController": false}, {"data": [[5.299999999999999, 115.9]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-31-Aggregated", "isController": false}, {"data": [[8.0, 354.5], [4.0, 80.0], [2.0, 139.0], [1.0, 146.0], [9.0, 185.0], [5.0, 186.0], [6.0, 88.0], [3.0, 156.0], [7.0, 235.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-30", "isController": false}, {"data": [[5.299999999999999, 192.39999999999998]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-30-Aggregated", "isController": false}, {"data": [[8.0, 172.0], [4.0, 74.0], [2.0, 75.0], [1.0, 397.0], [9.0, 96.0], [5.0, 84.0], [6.0, 95.0], [3.0, 1021.0], [7.0, 105.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-33", "isController": false}, {"data": [[5.299999999999999, 229.10000000000002]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-33-Aggregated", "isController": false}, {"data": [[8.0, 394.0], [4.0, 76.0], [2.0, 77.0], [1.0, 77.0], [9.0, 169.0], [5.0, 196.0], [6.0, 162.0], [3.0, 92.0], [7.0, 105.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-32", "isController": false}, {"data": [[5.299999999999999, 174.2]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-32-Aggregated", "isController": false}, {"data": [[8.0, 97.0], [4.0, 74.0], [2.0, 87.0], [1.0, 74.0], [9.0, 100.0], [5.0, 86.0], [6.0, 89.0], [3.0, 91.0], [7.0, 194.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-35", "isController": false}, {"data": [[5.299999999999999, 98.9]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-35-Aggregated", "isController": false}, {"data": [[8.0, 521.0], [4.0, 137.0], [2.0, 77.0], [1.0, 82.0], [9.0, 96.0], [5.0, 397.0], [6.0, 148.0], [3.0, 164.0], [7.0, 98.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-34", "isController": false}, {"data": [[5.299999999999999, 224.10000000000005]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-34-Aggregated", "isController": false}, {"data": [[8.0, 145.0], [4.0, 124.0], [2.0, 160.0], [1.0, 143.0], [9.0, 95.0], [5.0, 154.0], [6.0, 89.0], [3.0, 160.0], [7.0, 93.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-37", "isController": false}, {"data": [[5.299999999999999, 130.8]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-37-Aggregated", "isController": false}, {"data": [[8.0, 423.0], [4.0, 80.0], [2.0, 84.0], [1.0, 142.0], [9.0, 94.0], [5.0, 308.0], [6.0, 85.0], [3.0, 150.0], [7.0, 95.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-36", "isController": false}, {"data": [[5.299999999999999, 188.39999999999998]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-36-Aggregated", "isController": false}, {"data": [[1.0, 281.0], [2.0, 310.0], [8.0, 252.0], [9.0, 220.0], [5.0, 180.0], [3.0, 320.0], [6.0, 502.0]], "isOverall": false, "label": "https://chaldal.com/-50", "isController": false}, {"data": [[5.5, 274.9]], "isOverall": false, "label": "https://chaldal.com/-50-Aggregated", "isController": false}, {"data": [[8.0, 99.25], [1.0, 230.0], [9.0, 99.0], [5.0, 79.5], [6.0, 80.0], [7.0, 285.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-6", "isController": false}, {"data": [[6.5, 125.00000000000001]], "isOverall": false, "label": "https://chaldal.com/personal-care-6-Aggregated", "isController": false}, {"data": [[8.0, 191.0], [1.0, 320.0], [9.0, 104.0], [5.0, 79.0], [6.0, 83.0], [7.0, 1281.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-5", "isController": false}, {"data": [[6.5, 271.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-5-Aggregated", "isController": false}, {"data": [[8.0, 88.25], [1.0, 232.0], [9.0, 108.0], [5.0, 76.0], [6.0, 83.0], [7.0, 1282.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-4", "isController": false}, {"data": [[6.5, 220.99999999999997]], "isOverall": false, "label": "https://chaldal.com/personal-care-4-Aggregated", "isController": false}, {"data": [[8.0, 168.5], [1.0, 224.0], [9.0, 100.0], [5.0, 93.0], [6.0, 81.0], [7.0, 294.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-3", "isController": false}, {"data": [[6.5, 155.9]], "isOverall": false, "label": "https://chaldal.com/personal-care-3-Aggregated", "isController": false}, {"data": [[8.0, 606.25], [1.0, 487.0], [9.0, 341.0], [5.0, 244.5], [6.0, 241.0], [7.0, 467.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-9", "isController": false}, {"data": [[6.5, 445.00000000000006]], "isOverall": false, "label": "https://chaldal.com/personal-care-9-Aggregated", "isController": false}, {"data": [[8.0, 528.5], [1.0, 796.0], [9.0, 1373.0], [5.0, 230.5], [6.0, 258.0], [7.0, 478.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-8", "isController": false}, {"data": [[6.5, 548.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-8-Aggregated", "isController": false}, {"data": [[8.0, 274.0], [1.0, 253.0], [9.0, 305.0], [5.0, 240.5], [6.0, 796.0], [7.0, 284.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-7", "isController": false}, {"data": [[6.5, 321.5]], "isOverall": false, "label": "https://chaldal.com/personal-care-7-Aggregated", "isController": false}, {"data": [[1.0, 72.0], [2.0, 1278.0], [8.0, 279.0], [9.0, 251.0], [5.0, 313.5], [3.0, 299.0], [6.0, 1324.0]], "isOverall": false, "label": "https://chaldal.com/-48", "isController": false}, {"data": [[5.5, 468.8]], "isOverall": false, "label": "https://chaldal.com/-48-Aggregated", "isController": false}, {"data": [[1.0, 80.0], [2.0, 111.0], [8.0, 92.0], [9.0, 99.0], [5.0, 110.5], [3.0, 92.0], [6.0, 99.0]], "isOverall": false, "label": "https://chaldal.com/-47", "isController": false}, {"data": [[5.5, 97.80000000000001]], "isOverall": false, "label": "https://chaldal.com/-47-Aggregated", "isController": false}, {"data": [[8.0, 193.5], [4.0, 241.0], [2.0, 74.0], [1.0, 82.0], [9.0, 84.0], [5.0, 76.0], [6.0, 292.0], [3.0, 81.0], [7.0, 2357.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-11", "isController": false}, {"data": [[5.299999999999999, 367.4]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-11-Aggregated", "isController": false}, {"data": [[1.0, 331.0], [2.0, 594.0], [8.0, 300.3333333333333], [9.0, 329.0], [5.0, 324.5], [3.0, 375.0], [6.0, 391.0]], "isOverall": false, "label": "https://chaldal.com/-49", "isController": false}, {"data": [[5.5, 357.0]], "isOverall": false, "label": "https://chaldal.com/-49-Aggregated", "isController": false}, {"data": [[8.0, 309.0], [4.0, 246.0], [2.0, 76.0], [1.0, 76.0], [9.0, 91.0], [5.0, 231.0], [6.0, 283.0], [3.0, 1230.0], [7.0, 311.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-10", "isController": false}, {"data": [[5.299999999999999, 316.20000000000005]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-10-Aggregated", "isController": false}, {"data": [[1.0, 82.0], [2.0, 102.0], [8.0, 359.0], [9.0, 74.0], [5.0, 99.5], [3.0, 199.0], [6.0, 124.0]], "isOverall": false, "label": "https://chaldal.com/-44", "isController": false}, {"data": [[5.5, 185.7]], "isOverall": false, "label": "https://chaldal.com/-44-Aggregated", "isController": false}, {"data": [[8.0, 162.75], [1.0, 224.0], [9.0, 100.0], [5.0, 80.5], [6.0, 79.0], [7.0, 299.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-2", "isController": false}, {"data": [[6.5, 151.4]], "isOverall": false, "label": "https://chaldal.com/personal-care-2-Aggregated", "isController": false}, {"data": [[8.0, 198.5], [4.0, 79.0], [2.0, 238.0], [1.0, 76.0], [9.0, 92.0], [5.0, 72.0], [6.0, 100.0], [3.0, 610.0], [7.0, 289.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-13", "isController": false}, {"data": [[5.299999999999999, 195.29999999999998]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-13-Aggregated", "isController": false}, {"data": [[1.0, 81.0], [2.0, 110.0], [8.0, 131.0], [9.0, 76.0], [5.0, 100.0], [3.0, 91.0], [6.0, 104.0]], "isOverall": false, "label": "https://chaldal.com/-43", "isController": false}, {"data": [[5.5, 105.5]], "isOverall": false, "label": "https://chaldal.com/-43-Aggregated", "isController": false}, {"data": [[8.0, 223.0], [1.0, 458.0], [9.0, 204.0], [5.0, 172.5], [6.0, 166.0], [7.0, 201.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-1", "isController": false}, {"data": [[6.5, 226.6]], "isOverall": false, "label": "https://chaldal.com/personal-care-1-Aggregated", "isController": false}, {"data": [[8.0, 99.0], [4.0, 229.0], [2.0, 255.0], [1.0, 75.0], [9.0, 307.0], [5.0, 208.0], [6.0, 265.0], [3.0, 249.0], [7.0, 300.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-12", "isController": false}, {"data": [[5.299999999999999, 208.60000000000002]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-12-Aggregated", "isController": false}, {"data": [[1.0, 80.0], [2.0, 99.0], [8.0, 248.66666666666669], [9.0, 754.0], [5.0, 99.5], [3.0, 94.0], [6.0, 142.0]], "isOverall": false, "label": "https://chaldal.com/-46", "isController": false}, {"data": [[5.5, 211.4]], "isOverall": false, "label": "https://chaldal.com/-46-Aggregated", "isController": false}, {"data": [[8.0, 1203.75], [1.0, 1746.0], [9.0, 1164.0], [5.0, 984.0], [6.0, 561.0], [7.0, 1755.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-0", "isController": false}, {"data": [[6.5, 1200.8999999999999]], "isOverall": false, "label": "https://chaldal.com/personal-care-0-Aggregated", "isController": false}, {"data": [[8.0, 89.0], [4.0, 74.0], [2.0, 1254.0], [1.0, 137.0], [9.0, 87.0], [5.0, 214.0], [6.0, 84.0], [3.0, 80.0], [7.0, 97.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-15", "isController": false}, {"data": [[5.299999999999999, 220.5]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-15-Aggregated", "isController": false}, {"data": [[1.0, 79.0], [2.0, 103.0], [8.0, 144.66666666666666], [9.0, 73.0], [5.0, 101.0], [3.0, 101.0], [6.0, 239.0]], "isOverall": false, "label": "https://chaldal.com/-45", "isController": false}, {"data": [[5.5, 123.1]], "isOverall": false, "label": "https://chaldal.com/-45-Aggregated", "isController": false}, {"data": [[8.0, 196.0], [4.0, 249.0], [2.0, 77.0], [1.0, 75.0], [9.0, 87.0], [5.0, 69.0], [6.0, 94.0], [3.0, 172.0], [7.0, 667.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-14", "isController": false}, {"data": [[5.299999999999999, 188.2]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-14-Aggregated", "isController": false}, {"data": [[1.0, 84.0], [2.0, 96.0], [8.0, 96.0], [9.0, 227.0], [5.0, 102.5], [3.0, 96.0], [6.0, 534.0]], "isOverall": false, "label": "https://chaldal.com/-40", "isController": false}, {"data": [[5.5, 153.00000000000003]], "isOverall": false, "label": "https://chaldal.com/-40-Aggregated", "isController": false}, {"data": [[1.0, 81.0], [2.0, 99.0], [8.0, 124.33333333333333], [9.0, 80.0], [5.0, 98.5], [3.0, 94.0], [6.0, 91.0]], "isOverall": false, "label": "https://chaldal.com/-42", "isController": false}, {"data": [[5.5, 101.5]], "isOverall": false, "label": "https://chaldal.com/-42-Aggregated", "isController": false}, {"data": [[1.0, 87.0], [2.0, 97.0], [8.0, 120.0], [9.0, 78.0], [5.0, 706.0], [3.0, 93.0], [6.0, 100.0]], "isOverall": false, "label": "https://chaldal.com/-41", "isController": false}, {"data": [[5.5, 222.70000000000002]], "isOverall": false, "label": "https://chaldal.com/-41-Aggregated", "isController": false}, {"data": [[1.0, 340.0], [2.0, 313.0], [8.0, 1483.3333333333335], [9.0, 289.0], [5.0, 245.5], [3.0, 947.0], [6.0, 1437.0]], "isOverall": false, "label": "https://chaldal.com/-9", "isController": false}, {"data": [[5.5, 826.7]], "isOverall": false, "label": "https://chaldal.com/-9-Aggregated", "isController": false}, {"data": [[1.0, 374.0], [2.0, 367.0], [8.0, 368.6666666666667], [9.0, 270.0], [5.0, 1154.0], [3.0, 355.0], [6.0, 319.0]], "isOverall": false, "label": "https://chaldal.com/-5", "isController": false}, {"data": [[5.5, 509.9]], "isOverall": false, "label": "https://chaldal.com/-5-Aggregated", "isController": false}, {"data": [[2.0, 5792.0], [8.0, 4835.666666666667], [9.0, 4832.0], [5.0, 5976.0], [3.0, 4637.0], [6.0, 5144.0]], "isOverall": false, "label": "https://chaldal.com/", "isController": false}, {"data": [[6.000000000000001, 5207.111111111111]], "isOverall": false, "label": "https://chaldal.com/-Aggregated", "isController": false}, {"data": [[4.0, 98.0], [8.0, 86.0], [9.0, 91.33333333333333], [7.0, 536.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-17", "isController": false}, {"data": [[7.7, 178.79999999999998]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-17-Aggregated", "isController": false}, {"data": [[1.0, 350.0], [2.0, 368.0], [8.0, 556.3333333333334], [9.0, 273.0], [5.0, 1387.0], [3.0, 391.0], [6.0, 312.0]], "isOverall": false, "label": "https://chaldal.com/-6", "isController": false}, {"data": [[5.5, 613.7]], "isOverall": false, "label": "https://chaldal.com/-6-Aggregated", "isController": false}, {"data": [[4.0, 96.0], [8.0, 84.0], [9.0, 162.33333333333331], [7.0, 334.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-16", "isController": false}, {"data": [[7.7, 158.7]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-16-Aggregated", "isController": false}, {"data": [[1.0, 1263.0], [2.0, 621.0], [8.0, 1061.0], [9.0, 263.0], [5.0, 311.0], [3.0, 409.0], [6.0, 247.0]], "isOverall": false, "label": "https://chaldal.com/-7", "isController": false}, {"data": [[5.5, 660.8]], "isOverall": false, "label": "https://chaldal.com/-7-Aggregated", "isController": false}, {"data": [[4.0, 117.0], [8.0, 255.5], [9.0, 87.33333333333333], [7.0, 242.5]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-15", "isController": false}, {"data": [[7.7, 188.60000000000002]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-15-Aggregated", "isController": false}, {"data": [[1.0, 356.0], [2.0, 317.0], [8.0, 303.0], [9.0, 288.0], [5.0, 360.0], [3.0, 304.0], [6.0, 575.0]], "isOverall": false, "label": "https://chaldal.com/-8", "isController": false}, {"data": [[5.5, 346.9]], "isOverall": false, "label": "https://chaldal.com/-8-Aggregated", "isController": false}, {"data": [[4.0, 94.0], [8.0, 134.75], [9.0, 159.0], [7.0, 393.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-14", "isController": false}, {"data": [[7.7, 189.6]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-14-Aggregated", "isController": false}, {"data": [[1.0, 330.0], [2.0, 182.0], [8.0, 443.3333333333333], [9.0, 214.0], [5.0, 1792.0], [3.0, 376.0], [6.0, 534.0]], "isOverall": false, "label": "https://chaldal.com/-1", "isController": false}, {"data": [[5.5, 654.9999999999999]], "isOverall": false, "label": "https://chaldal.com/-1-Aggregated", "isController": false}, {"data": [[4.0, 94.0], [8.0, 93.5], [9.0, 88.0], [7.0, 105.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-13", "isController": false}, {"data": [[7.7, 94.19999999999999]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-13-Aggregated", "isController": false}, {"data": [[1.0, 2118.0], [2.0, 2678.0], [8.0, 2057.3333333333335], [9.0, 1813.0], [5.0, 2044.0], [3.0, 1995.0], [6.0, 2877.0]], "isOverall": false, "label": "https://chaldal.com/-2", "isController": false}, {"data": [[5.5, 2174.1]], "isOverall": false, "label": "https://chaldal.com/-2-Aggregated", "isController": false}, {"data": [[4.0, 1564.0], [8.0, 217.75], [9.0, 1282.3333333333335], [7.0, 865.5]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-12", "isController": false}, {"data": [[7.7, 801.3000000000001]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-12-Aggregated", "isController": false}, {"data": [[1.0, 1371.0], [2.0, 3202.0], [8.0, 1503.3333333333333], [9.0, 1303.0], [5.0, 1467.0], [3.0, 1931.0], [6.0, 1359.0]], "isOverall": false, "label": "https://chaldal.com/-3", "isController": false}, {"data": [[5.5, 1661.0]], "isOverall": false, "label": "https://chaldal.com/-3-Aggregated", "isController": false}, {"data": [[4.0, 348.0], [8.0, 560.0], [9.0, 285.6666666666667], [7.0, 304.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-11", "isController": false}, {"data": [[7.7, 405.29999999999995]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-11-Aggregated", "isController": false}, {"data": [[1.0, 363.0], [2.0, 782.0], [8.0, 333.0], [9.0, 276.0], [5.0, 337.5], [3.0, 454.0], [6.0, 321.0]], "isOverall": false, "label": "https://chaldal.com/-4", "isController": false}, {"data": [[5.5, 387.0]], "isOverall": false, "label": "https://chaldal.com/-4-Aggregated", "isController": false}, {"data": [[4.0, 1607.0], [8.0, 269.75], [9.0, 286.6666666666667], [7.0, 607.5]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-10", "isController": false}, {"data": [[7.7, 476.1]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-10-Aggregated", "isController": false}, {"data": [[1.0, 2188.0], [2.0, 2564.0], [8.0, 1602.3333333333333], [9.0, 2079.0], [5.0, 2458.5], [3.0, 1686.0], [6.0, 1654.0]], "isOverall": false, "label": "https://chaldal.com/-0", "isController": false}, {"data": [[5.5, 1989.4999999999998]], "isOverall": false, "label": "https://chaldal.com/-0-Aggregated", "isController": false}, {"data": [[8.0, 13663.0], [4.0, 12922.0], [2.0, 11208.0], [1.0, 13244.0], [9.0, 13233.0], [5.0, 13707.0], [6.0, 15874.0], [3.0, 12281.0], [7.0, 19290.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[5.299999999999999, 13908.5]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[1.0, 90.0], [2.0, 95.0], [8.0, 112.66666666666667], [9.0, 131.0], [5.0, 106.5], [3.0, 1000.0], [6.0, 87.0]], "isOverall": false, "label": "https://chaldal.com/-37", "isController": false}, {"data": [[5.5, 195.39999999999998]], "isOverall": false, "label": "https://chaldal.com/-37-Aggregated", "isController": false}, {"data": [[1.0, 90.0], [2.0, 93.0], [8.0, 161.66666666666666], [9.0, 78.0], [5.0, 160.5], [3.0, 90.0], [6.0, 94.0]], "isOverall": false, "label": "https://chaldal.com/-36", "isController": false}, {"data": [[5.5, 125.10000000000001]], "isOverall": false, "label": "https://chaldal.com/-36-Aggregated", "isController": false}, {"data": [[1.0, 90.0], [2.0, 102.0], [8.0, 116.66666666666667], [9.0, 159.0], [5.0, 105.0], [3.0, 317.0], [6.0, 111.0]], "isOverall": false, "label": "https://chaldal.com/-39", "isController": false}, {"data": [[5.5, 133.9]], "isOverall": false, "label": "https://chaldal.com/-39-Aggregated", "isController": false}, {"data": [[1.0, 82.0], [2.0, 94.0], [8.0, 98.0], [9.0, 70.0], [5.0, 100.5], [3.0, 103.0], [6.0, 90.0]], "isOverall": false, "label": "https://chaldal.com/-38", "isController": false}, {"data": [[5.5, 93.4]], "isOverall": false, "label": "https://chaldal.com/-38-Aggregated", "isController": false}, {"data": [[1.0, 85.0], [2.0, 96.0], [8.0, 194.33333333333334], [9.0, 1405.0], [5.0, 111.0], [3.0, 99.0], [6.0, 481.0]], "isOverall": false, "label": "https://chaldal.com/-33", "isController": false}, {"data": [[5.5, 297.1]], "isOverall": false, "label": "https://chaldal.com/-33-Aggregated", "isController": false}, {"data": [[1.0, 96.0], [2.0, 111.0], [8.0, 257.6666666666667], [9.0, 345.0], [5.0, 242.5], [3.0, 111.0], [6.0, 170.0]], "isOverall": false, "label": "https://chaldal.com/-32", "isController": false}, {"data": [[5.5, 209.1]], "isOverall": false, "label": "https://chaldal.com/-32-Aggregated", "isController": false}, {"data": [[1.0, 178.0], [2.0, 198.0], [8.0, 117.0], [9.0, 287.0], [5.0, 109.0], [3.0, 89.0], [6.0, 95.0]], "isOverall": false, "label": "https://chaldal.com/-35", "isController": false}, {"data": [[5.5, 141.6]], "isOverall": false, "label": "https://chaldal.com/-35-Aggregated", "isController": false}, {"data": [[4.0, 3129.0], [8.0, 2271.25], [9.0, 3583.6666666666665], [7.0, 3444.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle", "isController": false}, {"data": [[7.7, 2985.3]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-Aggregated", "isController": false}, {"data": [[1.0, 86.0], [2.0, 90.0], [8.0, 340.0], [9.0, 396.0], [5.0, 160.5], [3.0, 92.0], [6.0, 91.0]], "isOverall": false, "label": "https://chaldal.com/-34", "isController": false}, {"data": [[5.5, 209.6]], "isOverall": false, "label": "https://chaldal.com/-34-Aggregated", "isController": false}, {"data": [[4.0, 94.0], [8.0, 89.0], [9.0, 92.33333333333333], [7.0, 553.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-20", "isController": false}, {"data": [[7.7, 183.29999999999998]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-20-Aggregated", "isController": false}, {"data": [[8.0, 126.5], [1.0, 820.0], [9.0, 338.0], [5.0, 227.5], [6.0, 243.0], [7.0, 575.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-12", "isController": false}, {"data": [[6.5, 293.7]], "isOverall": false, "label": "https://chaldal.com/personal-care-12-Aggregated", "isController": false}, {"data": [[8.0, 87.25], [1.0, 67.0], [9.0, 283.0], [5.0, 260.0], [6.0, 82.0], [7.0, 180.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-13", "isController": false}, {"data": [[6.5, 148.1]], "isOverall": false, "label": "https://chaldal.com/personal-care-13-Aggregated", "isController": false}, {"data": [[1.0, 96.0], [2.0, 110.0], [8.0, 256.0], [9.0, 240.0], [5.0, 113.0], [3.0, 107.0], [6.0, 105.0]], "isOverall": false, "label": "https://chaldal.com/-31", "isController": false}, {"data": [[5.5, 165.2]], "isOverall": false, "label": "https://chaldal.com/-31-Aggregated", "isController": false}, {"data": [[8.0, 259.75], [1.0, 63.0], [9.0, 362.0], [5.0, 75.0], [6.0, 81.0], [7.0, 288.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-14", "isController": false}, {"data": [[6.5, 198.3]], "isOverall": false, "label": "https://chaldal.com/personal-care-14-Aggregated", "isController": false}, {"data": [[1.0, 191.0], [2.0, 103.0], [8.0, 332.3333333333333], [9.0, 1090.0], [5.0, 119.0], [3.0, 766.0], [6.0, 98.0]], "isOverall": false, "label": "https://chaldal.com/-30", "isController": false}, {"data": [[5.5, 348.3]], "isOverall": false, "label": "https://chaldal.com/-30-Aggregated", "isController": false}, {"data": [[8.0, 285.25], [1.0, 66.0], [9.0, 511.0], [5.0, 301.0], [6.0, 251.0], [7.0, 561.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-15", "isController": false}, {"data": [[6.5, 313.20000000000005]], "isOverall": false, "label": "https://chaldal.com/personal-care-15-Aggregated", "isController": false}, {"data": [[8.0, 601.0], [1.0, 232.0], [9.0, 458.0], [5.0, 536.5], [6.0, 545.0], [7.0, 262.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-10", "isController": false}, {"data": [[6.5, 497.40000000000003]], "isOverall": false, "label": "https://chaldal.com/personal-care-10-Aggregated", "isController": false}, {"data": [[8.0, 202.0], [1.0, 542.0], [9.0, 480.0], [5.0, 261.5], [6.0, 261.0], [7.0, 396.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-11", "isController": false}, {"data": [[6.5, 301.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-11-Aggregated", "isController": false}, {"data": [[4.0, 78.0], [8.0, 165.75], [9.0, 377.6666666666667], [7.0, 263.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-28", "isController": false}, {"data": [[7.7, 240.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-28-Aggregated", "isController": false}, {"data": [[4.0, 103.0], [8.0, 91.0], [9.0, 419.3333333333333], [7.0, 205.5]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-27", "isController": false}, {"data": [[7.7, 213.59999999999997]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-27-Aggregated", "isController": false}, {"data": [[4.0, 283.0], [8.0, 146.25], [9.0, 153.33333333333334], [7.0, 279.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-26", "isController": false}, {"data": [[7.7, 188.6]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-26-Aggregated", "isController": false}, {"data": [[4.0, 106.0], [8.0, 100.0], [9.0, 294.0], [7.0, 235.5]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-25", "isController": false}, {"data": [[7.7, 185.89999999999998]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-25-Aggregated", "isController": false}, {"data": [[4.0, 102.0], [8.0, 108.25], [9.0, 215.33333333333331], [7.0, 861.5]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-24", "isController": false}, {"data": [[7.7, 290.4]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-24-Aggregated", "isController": false}, {"data": [[4.0, 93.0], [8.0, 107.25], [9.0, 92.0], [7.0, 319.5]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-23", "isController": false}, {"data": [[7.7, 143.7]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-23-Aggregated", "isController": false}, {"data": [[4.0, 181.0], [8.0, 185.75], [9.0, 258.33333333333337], [7.0, 394.5]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-22", "isController": false}, {"data": [[7.7, 248.79999999999998]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-22-Aggregated", "isController": false}, {"data": [[4.0, 93.0], [8.0, 84.0], [9.0, 163.66666666666669], [7.0, 866.5]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-21", "isController": false}, {"data": [[7.7, 265.3]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-21-Aggregated", "isController": false}, {"data": [[1.0, 258.0], [2.0, 180.0], [8.0, 401.6666666666667], [9.0, 182.0], [5.0, 172.5], [3.0, 605.0], [6.0, 114.0]], "isOverall": false, "label": "https://chaldal.com/-29", "isController": false}, {"data": [[5.5, 288.9]], "isOverall": false, "label": "https://chaldal.com/-29-Aggregated", "isController": false}, {"data": [[4.0, 99.0], [8.0, 82.75], [9.0, 91.33333333333333], [7.0, 223.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-19", "isController": false}, {"data": [[7.7, 115.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-19-Aggregated", "isController": false}, {"data": [[4.0, 95.0], [8.0, 84.5], [9.0, 89.66666666666667], [7.0, 384.5]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-18", "isController": false}, {"data": [[7.7, 147.10000000000002]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-18-Aggregated", "isController": false}, {"data": [[1.0, 87.0], [2.0, 92.0], [8.0, 289.0], [9.0, 95.0], [5.0, 231.5], [3.0, 94.0], [6.0, 298.0]], "isOverall": false, "label": "https://chaldal.com/-26", "isController": false}, {"data": [[5.5, 199.6]], "isOverall": false, "label": "https://chaldal.com/-26-Aggregated", "isController": false}, {"data": [[1.0, 90.0], [2.0, 264.0], [8.0, 398.3333333333333], [9.0, 128.0], [5.0, 354.0], [3.0, 101.0], [6.0, 525.0]], "isOverall": false, "label": "https://chaldal.com/-25", "isController": false}, {"data": [[5.5, 301.0999999999999]], "isOverall": false, "label": "https://chaldal.com/-25-Aggregated", "isController": false}, {"data": [[1.0, 88.0], [2.0, 100.0], [8.0, 474.0], [9.0, 396.0], [5.0, 474.5], [3.0, 810.0], [6.0, 92.0]], "isOverall": false, "label": "https://chaldal.com/-28", "isController": false}, {"data": [[5.5, 385.7]], "isOverall": false, "label": "https://chaldal.com/-28-Aggregated", "isController": false}, {"data": [[1.0, 98.0], [2.0, 99.0], [8.0, 326.0], [9.0, 95.0], [5.0, 232.5], [3.0, 100.0], [6.0, 94.0]], "isOverall": false, "label": "https://chaldal.com/-27", "isController": false}, {"data": [[5.5, 192.9]], "isOverall": false, "label": "https://chaldal.com/-27-Aggregated", "isController": false}, {"data": [[1.0, 94.0], [2.0, 113.0], [8.0, 130.66666666666666], [9.0, 161.0], [5.0, 112.5], [3.0, 202.0], [6.0, 112.0]], "isOverall": false, "label": "https://chaldal.com/-22", "isController": false}, {"data": [[5.5, 129.9]], "isOverall": false, "label": "https://chaldal.com/-22-Aggregated", "isController": false}, {"data": [[1.0, 194.0], [2.0, 104.0], [8.0, 464.33333333333337], [9.0, 90.0], [5.0, 112.0], [3.0, 96.0], [6.0, 103.0]], "isOverall": false, "label": "https://chaldal.com/-21", "isController": false}, {"data": [[5.5, 220.4]], "isOverall": false, "label": "https://chaldal.com/-21-Aggregated", "isController": false}, {"data": [[8.0, 2515.25], [1.0, 3044.0], [9.0, 2861.0], [5.0, 2204.5], [6.0, 1771.0], [7.0, 4414.0]], "isOverall": false, "label": "https://chaldal.com/personal-care", "isController": false}, {"data": [[6.5, 2656.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-Aggregated", "isController": false}, {"data": [[1.0, 113.0], [2.0, 126.0], [8.0, 346.0], [9.0, 187.0], [5.0, 179.5], [3.0, 119.0], [6.0, 112.0]], "isOverall": false, "label": "https://chaldal.com/-24", "isController": false}, {"data": [[5.5, 205.4]], "isOverall": false, "label": "https://chaldal.com/-24-Aggregated", "isController": false}, {"data": [[1.0, 102.0], [2.0, 177.0], [8.0, 545.3333333333334], [9.0, 453.0], [5.0, 168.0], [3.0, 105.0], [6.0, 195.0]], "isOverall": false, "label": "https://chaldal.com/-23", "isController": false}, {"data": [[5.5, 300.40000000000003]], "isOverall": false, "label": "https://chaldal.com/-23-Aggregated", "isController": false}, {"data": [[8.0, 240.5], [1.0, 74.0], [9.0, 173.0], [5.0, 158.5], [6.0, 100.0], [7.0, 260.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-23", "isController": false}, {"data": [[6.5, 188.60000000000002]], "isOverall": false, "label": "https://chaldal.com/personal-care-23-Aggregated", "isController": false}, {"data": [[8.0, 295.5], [4.0, 1225.0], [2.0, 277.0], [1.0, 83.0], [9.0, 108.0], [5.0, 237.0], [6.0, 286.0], [3.0, 82.0], [7.0, 306.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-8", "isController": false}, {"data": [[5.299999999999999, 319.5]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-8-Aggregated", "isController": false}, {"data": [[8.0, 99.5], [4.0, 394.0], [2.0, 232.0], [1.0, 74.0], [9.0, 81.0], [5.0, 80.0], [6.0, 131.0], [3.0, 93.0], [7.0, 85.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-39", "isController": false}, {"data": [[5.299999999999999, 136.9]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-39-Aggregated", "isController": false}, {"data": [[8.0, 200.25], [1.0, 81.0], [9.0, 141.0], [5.0, 449.5], [6.0, 90.0], [7.0, 326.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-24", "isController": false}, {"data": [[6.5, 233.79999999999998]], "isOverall": false, "label": "https://chaldal.com/personal-care-24-Aggregated", "isController": false}, {"data": [[8.0, 333.5], [4.0, 531.0], [2.0, 258.0], [1.0, 83.0], [9.0, 88.0], [5.0, 88.0], [6.0, 293.0], [3.0, 89.0], [7.0, 279.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-7", "isController": false}, {"data": [[5.299999999999999, 237.6]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-7-Aggregated", "isController": false}, {"data": [[8.0, 247.0], [4.0, 71.0], [2.0, 82.0], [1.0, 131.0], [9.0, 89.0], [5.0, 319.0], [6.0, 89.0], [3.0, 80.0], [7.0, 90.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-38", "isController": false}, {"data": [[5.299999999999999, 144.5]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-38-Aggregated", "isController": false}, {"data": [[1.0, 97.0], [2.0, 115.0], [8.0, 118.66666666666667], [9.0, 94.0], [5.0, 250.0], [3.0, 100.0], [6.0, 216.0]], "isOverall": false, "label": "https://chaldal.com/-20", "isController": false}, {"data": [[5.5, 147.8]], "isOverall": false, "label": "https://chaldal.com/-20-Aggregated", "isController": false}, {"data": [[8.0, 139.25], [1.0, 83.0], [9.0, 123.0], [5.0, 345.5], [6.0, 91.0], [7.0, 585.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-25", "isController": false}, {"data": [[6.5, 213.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-25-Aggregated", "isController": false}, {"data": [[8.0, 163.25], [1.0, 88.0], [9.0, 171.0], [5.0, 309.0], [6.0, 99.0], [7.0, 104.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-26", "isController": false}, {"data": [[6.5, 173.29999999999998]], "isOverall": false, "label": "https://chaldal.com/personal-care-26-Aggregated", "isController": false}, {"data": [[8.0, 201.0], [4.0, 251.0], [2.0, 536.0], [1.0, 79.0], [9.0, 92.0], [5.0, 1247.0], [6.0, 96.0], [3.0, 258.0], [7.0, 301.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-9", "isController": false}, {"data": [[5.299999999999999, 326.20000000000005]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-9-Aggregated", "isController": false}, {"data": [[8.0, 193.5], [4.0, 259.0], [2.0, 370.0], [1.0, 82.0], [9.0, 90.0], [5.0, 89.0], [6.0, 93.0], [3.0, 85.0], [7.0, 783.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-4", "isController": false}, {"data": [[5.299999999999999, 223.79999999999998]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-4-Aggregated", "isController": false}, {"data": [[8.0, 89.75], [1.0, 65.0], [9.0, 212.0], [5.0, 69.5], [6.0, 88.0], [7.0, 1509.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-20", "isController": false}, {"data": [[6.5, 237.2]], "isOverall": false, "label": "https://chaldal.com/personal-care-20-Aggregated", "isController": false}, {"data": [[8.0, 199.0], [4.0, 252.0], [2.0, 96.0], [1.0, 79.0], [9.0, 90.0], [5.0, 91.0], [6.0, 96.0], [3.0, 78.0], [7.0, 675.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-3", "isController": false}, {"data": [[5.299999999999999, 185.5]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-3-Aggregated", "isController": false}, {"data": [[8.0, 158.5], [1.0, 66.0], [9.0, 136.0], [5.0, 73.5], [6.0, 370.0], [7.0, 359.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-21", "isController": false}, {"data": [[6.5, 171.2]], "isOverall": false, "label": "https://chaldal.com/personal-care-21-Aggregated", "isController": false}, {"data": [[8.0, 200.5], [4.0, 259.0], [2.0, 91.0], [1.0, 74.0], [9.0, 89.0], [5.0, 89.0], [6.0, 95.0], [3.0, 78.0], [7.0, 329.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-6", "isController": false}, {"data": [[5.299999999999999, 150.50000000000003]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-6-Aggregated", "isController": false}, {"data": [[8.0, 328.5], [1.0, 134.0], [9.0, 118.0], [5.0, 327.5], [6.0, 95.0], [7.0, 254.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-22", "isController": false}, {"data": [[6.5, 257.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-22-Aggregated", "isController": false}, {"data": [[8.0, 191.5], [4.0, 253.0], [2.0, 76.0], [1.0, 78.0], [9.0, 90.0], [5.0, 90.0], [6.0, 91.0], [3.0, 85.0], [7.0, 328.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-5", "isController": false}, {"data": [[5.299999999999999, 147.4]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-5-Aggregated", "isController": false}, {"data": [[8.0, 2161.5], [4.0, 1974.0], [2.0, 962.0], [1.0, 1945.0], [9.0, 1007.0], [5.0, 735.0], [6.0, 1230.0], [3.0, 714.0], [7.0, 2444.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-0", "isController": false}, {"data": [[5.299999999999999, 1533.4]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-0-Aggregated", "isController": false}, {"data": [[8.0, 249.5], [4.0, 264.0], [2.0, 371.0], [1.0, 74.0], [9.0, 90.0], [5.0, 364.0], [6.0, 91.0], [3.0, 388.0], [7.0, 424.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-2", "isController": false}, {"data": [[5.299999999999999, 256.5]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-2-Aggregated", "isController": false}, {"data": [[8.0, 247.5], [4.0, 301.0], [2.0, 444.0], [1.0, 679.0], [9.0, 172.0], [5.0, 186.0], [6.0, 163.0], [3.0, 167.0], [7.0, 432.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-1", "isController": false}, {"data": [[5.299999999999999, 303.9]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-1-Aggregated", "isController": false}, {"data": [[1.0, 180.0], [2.0, 138.0], [8.0, 520.0], [9.0, 222.0], [5.0, 281.5], [3.0, 128.0], [6.0, 205.0]], "isOverall": false, "label": "https://chaldal.com/-19", "isController": false}, {"data": [[5.5, 299.6]], "isOverall": false, "label": "https://chaldal.com/-19-Aggregated", "isController": false}, {"data": [[1.0, 94.0], [2.0, 101.0], [8.0, 272.3333333333333], [9.0, 83.0], [5.0, 292.0], [3.0, 96.0], [6.0, 106.0]], "isOverall": false, "label": "https://chaldal.com/-18", "isController": false}, {"data": [[5.5, 188.1]], "isOverall": false, "label": "https://chaldal.com/-18-Aggregated", "isController": false}, {"data": [[8.0, 201.0], [4.0, 68.0], [2.0, 86.0], [1.0, 80.0], [9.0, 387.0], [5.0, 93.0], [6.0, 147.0], [3.0, 161.0], [7.0, 82.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-40", "isController": false}, {"data": [[5.299999999999999, 150.60000000000002]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-40-Aggregated", "isController": false}, {"data": [[4.0, 329.0], [8.0, 207.75], [9.0, 188.0], [7.0, 251.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-29", "isController": false}, {"data": [[7.7, 222.60000000000002]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-29-Aggregated", "isController": false}, {"data": [[1.0, 91.0], [2.0, 106.0], [8.0, 97.66666666666667], [9.0, 80.0], [5.0, 100.0], [3.0, 196.0], [6.0, 237.0]], "isOverall": false, "label": "https://chaldal.com/-15", "isController": false}, {"data": [[5.5, 120.3]], "isOverall": false, "label": "https://chaldal.com/-15-Aggregated", "isController": false}, {"data": [[8.0, 94.5], [4.0, 85.0], [2.0, 76.0], [1.0, 124.0], [9.0, 77.0], [5.0, 76.0], [6.0, 215.0], [3.0, 268.0], [7.0, 344.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-42", "isController": false}, {"data": [[5.299999999999999, 145.4]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-42-Aggregated", "isController": false}, {"data": [[1.0, 94.0], [2.0, 103.0], [8.0, 640.0], [9.0, 79.0], [5.0, 103.0], [3.0, 98.0], [6.0, 92.0]], "isOverall": false, "label": "https://chaldal.com/-14", "isController": false}, {"data": [[5.5, 259.2]], "isOverall": false, "label": "https://chaldal.com/-14-Aggregated", "isController": false}, {"data": [[8.0, 101.5], [4.0, 75.0], [2.0, 93.0], [1.0, 157.0], [9.0, 150.0], [5.0, 81.0], [6.0, 76.0], [3.0, 168.0], [7.0, 159.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-41", "isController": false}, {"data": [[5.299999999999999, 116.2]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-41-Aggregated", "isController": false}, {"data": [[1.0, 89.0], [2.0, 106.0], [8.0, 92.66666666666667], [9.0, 84.0], [5.0, 96.5], [3.0, 89.0], [6.0, 89.0]], "isOverall": false, "label": "https://chaldal.com/-17", "isController": false}, {"data": [[5.5, 92.80000000000001]], "isOverall": false, "label": "https://chaldal.com/-17-Aggregated", "isController": false}, {"data": [[8.0, 3701.5], [4.0, 3478.0], [2.0, 2682.0], [1.0, 2889.0], [9.0, 2069.0], [5.0, 2383.0], [6.0, 2466.0], [3.0, 2615.0], [7.0, 5432.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials", "isController": false}, {"data": [[5.299999999999999, 3141.7]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-Aggregated", "isController": false}, {"data": [[1.0, 89.0], [2.0, 102.0], [8.0, 186.0], [9.0, 89.0], [5.0, 95.5], [3.0, 94.0], [6.0, 89.0]], "isOverall": false, "label": "https://chaldal.com/-16", "isController": false}, {"data": [[5.5, 121.19999999999999]], "isOverall": false, "label": "https://chaldal.com/-16-Aggregated", "isController": false}, {"data": [[8.0, 149.0], [4.0, 206.0], [2.0, 95.0], [1.0, 97.0], [9.0, 95.0], [5.0, 96.0], [6.0, 322.0], [3.0, 94.0], [7.0, 342.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-43", "isController": false}, {"data": [[5.299999999999999, 164.50000000000003]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-43-Aggregated", "isController": false}, {"data": [[1.0, 94.0], [2.0, 105.0], [8.0, 96.33333333333333], [9.0, 76.0], [5.0, 101.5], [3.0, 98.0], [6.0, 86.0]], "isOverall": false, "label": "https://chaldal.com/-11", "isController": false}, {"data": [[5.5, 95.10000000000001]], "isOverall": false, "label": "https://chaldal.com/-11-Aggregated", "isController": false}, {"data": [[8.0, 125.75], [1.0, 64.0], [9.0, 499.0], [5.0, 246.0], [6.0, 90.0], [7.0, 86.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-16", "isController": false}, {"data": [[6.5, 173.40000000000003]], "isOverall": false, "label": "https://chaldal.com/personal-care-16-Aggregated", "isController": false}, {"data": [[1.0, 448.0], [2.0, 94.0], [8.0, 606.6666666666667], [9.0, 282.0], [5.0, 99.5], [3.0, 278.0], [6.0, 285.0]], "isOverall": false, "label": "https://chaldal.com/-10", "isController": false}, {"data": [[5.5, 340.59999999999997]], "isOverall": false, "label": "https://chaldal.com/-10-Aggregated", "isController": false}, {"data": [[8.0, 144.5], [1.0, 67.0], [9.0, 323.0], [5.0, 269.5], [6.0, 359.0], [7.0, 90.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-17", "isController": false}, {"data": [[6.5, 195.6]], "isOverall": false, "label": "https://chaldal.com/personal-care-17-Aggregated", "isController": false}, {"data": [[1.0, 101.0], [2.0, 601.0], [8.0, 92.66666666666667], [9.0, 86.0], [5.0, 99.0], [3.0, 118.0], [6.0, 106.0]], "isOverall": false, "label": "https://chaldal.com/-13", "isController": false}, {"data": [[5.5, 148.79999999999998]], "isOverall": false, "label": "https://chaldal.com/-13-Aggregated", "isController": false}, {"data": [[8.0, 259.5], [1.0, 69.0], [9.0, 332.0], [5.0, 74.5], [6.0, 85.0], [7.0, 395.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-18", "isController": false}, {"data": [[6.5, 206.8]], "isOverall": false, "label": "https://chaldal.com/personal-care-18-Aggregated", "isController": false}, {"data": [[1.0, 206.0], [2.0, 100.0], [8.0, 92.66666666666667], [9.0, 171.0], [5.0, 101.5], [3.0, 98.0], [6.0, 92.0]], "isOverall": false, "label": "https://chaldal.com/-12", "isController": false}, {"data": [[5.5, 114.8]], "isOverall": false, "label": "https://chaldal.com/-12-Aggregated", "isController": false}, {"data": [[8.0, 85.5], [1.0, 70.0], [9.0, 484.0], [5.0, 71.5], [6.0, 85.0], [7.0, 83.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-19", "isController": false}, {"data": [[6.5, 120.69999999999999]], "isOverall": false, "label": "https://chaldal.com/personal-care-19-Aggregated", "isController": false}, {"data": [[8.0, 228.75], [1.0, 245.0], [9.0, 307.0], [5.0, 248.5], [6.0, 353.0], [7.0, 279.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-30", "isController": false}, {"data": [[6.5, 259.6]], "isOverall": false, "label": "https://chaldal.com/personal-care-30-Aggregated", "isController": false}, {"data": [[8.0, 116.5], [1.0, 92.0], [9.0, 334.0], [5.0, 287.5], [6.0, 336.0], [7.0, 323.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-31", "isController": false}, {"data": [[6.5, 212.6]], "isOverall": false, "label": "https://chaldal.com/personal-care-31-Aggregated", "isController": false}, {"data": [[8.0, 111.75], [1.0, 80.0], [9.0, 225.0], [5.0, 194.5], [6.0, 158.0], [7.0, 192.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-27", "isController": false}, {"data": [[6.5, 149.1]], "isOverall": false, "label": "https://chaldal.com/personal-care-27-Aggregated", "isController": false}, {"data": [[8.0, 203.75], [1.0, 80.0], [9.0, 121.0], [5.0, 180.0], [6.0, 88.0], [7.0, 483.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-28", "isController": false}, {"data": [[6.5, 194.70000000000002]], "isOverall": false, "label": "https://chaldal.com/personal-care-28-Aggregated", "isController": false}, {"data": [[8.0, 173.75], [1.0, 101.0], [9.0, 121.0], [5.0, 78.0], [6.0, 171.0], [7.0, 278.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-29", "isController": false}, {"data": [[6.5, 152.19999999999996]], "isOverall": false, "label": "https://chaldal.com/personal-care-29-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 9.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 697.6833333333333, "minX": 1.68545034E12, "maxY": 2816701.6, "series": [{"data": [[1.6854504E12, 2816701.6], [1.68545046E12, 1185677.05], [1.68545034E12, 147589.48333333334]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.6854504E12, 17773.666666666668], [1.68545046E12, 14737.933333333332], [1.68545034E12, 697.6833333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68545046E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 72.0, "minX": 1.68545034E12, "maxY": 13908.5, "series": [{"data": [[1.6854504E12, 89.5], [1.68545046E12, 228.75]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-17", "isController": false}, {"data": [[1.6854504E12, 83.0], [1.68545046E12, 132.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-16", "isController": false}, {"data": [[1.6854504E12, 89.0], [1.68545046E12, 81.75]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-19", "isController": false}, {"data": [[1.6854504E12, 234.0], [1.68545046E12, 83.25]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-18", "isController": false}, {"data": [[1.6854504E12, 337.42857142857144], [1.68545046E12, 425.6666666666667]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-9", "isController": false}, {"data": [[1.6854504E12, 99.5], [1.68545046E12, 80.125]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-20", "isController": false}, {"data": [[1.6854504E12, 147.0], [1.68545046E12, 93.37499999999999]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-22", "isController": false}, {"data": [[1.6854504E12, 97.0], [1.68545046E12, 82.62500000000001]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-21", "isController": false}, {"data": [[1.6854504E12, 99.5], [1.68545046E12, 169.74999999999997]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-24", "isController": false}, {"data": [[1.6854504E12, 140.0], [1.68545046E12, 127.375]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-23", "isController": false}, {"data": [[1.6854504E12, 135.0], [1.68545046E12, 198.625]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-26", "isController": false}, {"data": [[1.6854504E12, 106.0], [1.68545046E12, 147.87499999999997]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-25", "isController": false}, {"data": [[1.6854504E12, 103.0], [1.68545046E12, 167.25]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-28", "isController": false}, {"data": [[1.6854504E12, 1289.6250000000002], [1.68545046E12, 1108.5]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-0", "isController": false}, {"data": [[1.6854504E12, 138.5], [1.68545046E12, 121.87499999999999]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-27", "isController": false}, {"data": [[1.6854504E12, 303.0], [1.68545046E12, 111.875]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-29", "isController": false}, {"data": [[1.6854504E12, 424.8571428571429], [1.68545046E12, 304.3333333333333]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-7", "isController": false}, {"data": [[1.6854504E12, 478.50000000000006], [1.68545046E12, 546.25]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-8", "isController": false}, {"data": [[1.6854504E12, 96.12499999999999], [1.68545046E12, 97.5]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-5", "isController": false}, {"data": [[1.6854504E12, 90.0], [1.68545046E12, 97.5]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-6", "isController": false}, {"data": [[1.6854504E12, 93.25], [1.68545046E12, 101.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-3", "isController": false}, {"data": [[1.6854504E12, 91.74999999999999], [1.68545046E12, 97.5]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-4", "isController": false}, {"data": [[1.6854504E12, 213.62499999999997], [1.68545046E12, 295.5]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-1", "isController": false}, {"data": [[1.6854504E12, 135.25], [1.68545046E12, 99.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-2", "isController": false}, {"data": [[1.6854504E12, 101.5], [1.68545046E12, 119.49999999999999]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-31", "isController": false}, {"data": [[1.6854504E12, 145.0], [1.68545046E12, 204.25]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-30", "isController": false}, {"data": [[1.6854504E12, 170.0], [1.68545046E12, 243.875]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-33", "isController": false}, {"data": [[1.6854504E12, 183.5], [1.68545046E12, 171.875]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-32", "isController": false}, {"data": [[1.6854504E12, 97.0], [1.68545046E12, 99.37499999999999]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-35", "isController": false}, {"data": [[1.6854504E12, 194.0], [1.68545046E12, 231.62499999999997]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-34", "isController": false}, {"data": [[1.6854504E12, 100.5], [1.68545046E12, 138.375]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-37", "isController": false}, {"data": [[1.6854504E12, 137.5], [1.68545046E12, 201.125]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-36", "isController": false}, {"data": [[1.6854504E12, 274.2222222222222], [1.68545034E12, 281.0]], "isOverall": false, "label": "https://chaldal.com/-50", "isController": false}, {"data": [[1.6854504E12, 106.0], [1.68545046E12, 133.14285714285714]], "isOverall": false, "label": "https://chaldal.com/personal-care-6", "isController": false}, {"data": [[1.6854504E12, 229.33333333333331], [1.68545046E12, 288.8571428571429]], "isOverall": false, "label": "https://chaldal.com/personal-care-5", "isController": false}, {"data": [[1.6854504E12, 93.0], [1.68545046E12, 275.85714285714283]], "isOverall": false, "label": "https://chaldal.com/personal-care-4", "isController": false}, {"data": [[1.6854504E12, 92.33333333333333], [1.68545046E12, 183.14285714285714]], "isOverall": false, "label": "https://chaldal.com/personal-care-3", "isController": false}, {"data": [[1.6854504E12, 641.6666666666666], [1.68545046E12, 360.7142857142857]], "isOverall": false, "label": "https://chaldal.com/personal-care-9", "isController": false}, {"data": [[1.6854504E12, 643.0], [1.68545046E12, 507.2857142857143]], "isOverall": false, "label": "https://chaldal.com/personal-care-8", "isController": false}, {"data": [[1.6854504E12, 286.0], [1.68545046E12, 336.71428571428567]], "isOverall": false, "label": "https://chaldal.com/personal-care-7", "isController": false}, {"data": [[1.6854504E12, 512.8888888888889], [1.68545034E12, 72.0]], "isOverall": false, "label": "https://chaldal.com/-48", "isController": false}, {"data": [[1.6854504E12, 99.77777777777777], [1.68545034E12, 80.0]], "isOverall": false, "label": "https://chaldal.com/-47", "isController": false}, {"data": [[1.6854504E12, 185.0], [1.68545046E12, 412.99999999999994]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-11", "isController": false}, {"data": [[1.6854504E12, 359.8888888888889], [1.68545034E12, 331.0]], "isOverall": false, "label": "https://chaldal.com/-49", "isController": false}, {"data": [[1.6854504E12, 193.5], [1.68545046E12, 346.87500000000006]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-10", "isController": false}, {"data": [[1.6854504E12, 197.22222222222223], [1.68545034E12, 82.0]], "isOverall": false, "label": "https://chaldal.com/-44", "isController": false}, {"data": [[1.6854504E12, 92.33333333333333], [1.68545046E12, 176.7142857142857]], "isOverall": false, "label": "https://chaldal.com/personal-care-2", "isController": false}, {"data": [[1.6854504E12, 87.5], [1.68545046E12, 222.25]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-13", "isController": false}, {"data": [[1.6854504E12, 108.22222222222223], [1.68545034E12, 81.0]], "isOverall": false, "label": "https://chaldal.com/-43", "isController": false}, {"data": [[1.6854504E12, 251.33333333333331], [1.68545046E12, 216.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-1", "isController": false}, {"data": [[1.6854504E12, 202.0], [1.68545046E12, 210.25]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-12", "isController": false}, {"data": [[1.6854504E12, 226.0], [1.68545034E12, 80.0]], "isOverall": false, "label": "https://chaldal.com/-46", "isController": false}, {"data": [[1.6854504E12, 1282.6666666666667], [1.68545046E12, 1165.8571428571427]], "isOverall": false, "label": "https://chaldal.com/personal-care-0", "isController": false}, {"data": [[1.6854504E12, 85.0], [1.68545046E12, 254.37500000000003]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-15", "isController": false}, {"data": [[1.6854504E12, 128.0], [1.68545034E12, 79.0]], "isOverall": false, "label": "https://chaldal.com/-45", "isController": false}, {"data": [[1.6854504E12, 193.0], [1.68545046E12, 187.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-14", "isController": false}, {"data": [[1.6854504E12, 160.66666666666663], [1.68545034E12, 84.0]], "isOverall": false, "label": "https://chaldal.com/-40", "isController": false}, {"data": [[1.6854504E12, 103.77777777777779], [1.68545034E12, 81.0]], "isOverall": false, "label": "https://chaldal.com/-42", "isController": false}, {"data": [[1.6854504E12, 237.77777777777777], [1.68545034E12, 87.0]], "isOverall": false, "label": "https://chaldal.com/-41", "isController": false}, {"data": [[1.6854504E12, 951.7499999999999], [1.68545034E12, 326.5]], "isOverall": false, "label": "https://chaldal.com/-9", "isController": false}, {"data": [[1.6854504E12, 544.75], [1.68545034E12, 370.5]], "isOverall": false, "label": "https://chaldal.com/-5", "isController": false}, {"data": [[1.6854504E12, 5207.111111111111]], "isOverall": false, "label": "https://chaldal.com/", "isController": false}, {"data": [[1.6854504E12, 88.42857142857142], [1.68545046E12, 389.66666666666663]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-17", "isController": false}, {"data": [[1.6854504E12, 677.3750000000001], [1.68545034E12, 359.0]], "isOverall": false, "label": "https://chaldal.com/-6", "isController": false}, {"data": [[1.6854504E12, 118.85714285714286], [1.68545046E12, 251.66666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-16", "isController": false}, {"data": [[1.6854504E12, 590.5], [1.68545034E12, 942.0]], "isOverall": false, "label": "https://chaldal.com/-7", "isController": false}, {"data": [[1.6854504E12, 116.0], [1.68545046E12, 358.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-15", "isController": false}, {"data": [[1.6854504E12, 349.5], [1.68545034E12, 336.5]], "isOverall": false, "label": "https://chaldal.com/-8", "isController": false}, {"data": [[1.6854504E12, 116.42857142857143], [1.68545046E12, 360.3333333333333]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-14", "isController": false}, {"data": [[1.6854504E12, 754.7500000000001], [1.68545034E12, 256.0]], "isOverall": false, "label": "https://chaldal.com/-1", "isController": false}, {"data": [[1.6854504E12, 91.14285714285714], [1.68545046E12, 101.33333333333333]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-13", "isController": false}, {"data": [[1.6854504E12, 2180.3333333333335], [1.68545034E12, 2118.0]], "isOverall": false, "label": "https://chaldal.com/-2", "isController": false}, {"data": [[1.6854504E12, 860.1428571428572], [1.68545046E12, 664.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-12", "isController": false}, {"data": [[1.6854504E12, 1693.2222222222222], [1.68545034E12, 1371.0]], "isOverall": false, "label": "https://chaldal.com/-3", "isController": false}, {"data": [[1.6854504E12, 297.66666666666663], [1.68545046E12, 566.75]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-11", "isController": false}, {"data": [[1.6854504E12, 340.625], [1.68545034E12, 572.5]], "isOverall": false, "label": "https://chaldal.com/-4", "isController": false}, {"data": [[1.6854504E12, 466.2857142857143], [1.68545046E12, 499.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-10", "isController": false}, {"data": [[1.6854504E12, 1892.875], [1.68545034E12, 2376.0]], "isOverall": false, "label": "https://chaldal.com/-0", "isController": false}, {"data": [[1.6854504E12, 13908.5]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.6854504E12, 207.11111111111111], [1.68545034E12, 90.0]], "isOverall": false, "label": "https://chaldal.com/-37", "isController": false}, {"data": [[1.6854504E12, 129.0], [1.68545034E12, 90.0]], "isOverall": false, "label": "https://chaldal.com/-36", "isController": false}, {"data": [[1.6854504E12, 138.77777777777777], [1.68545034E12, 90.0]], "isOverall": false, "label": "https://chaldal.com/-39", "isController": false}, {"data": [[1.6854504E12, 94.66666666666667], [1.68545034E12, 82.0]], "isOverall": false, "label": "https://chaldal.com/-38", "isController": false}, {"data": [[1.6854504E12, 320.66666666666663], [1.68545034E12, 85.0]], "isOverall": false, "label": "https://chaldal.com/-33", "isController": false}, {"data": [[1.6854504E12, 221.66666666666669], [1.68545034E12, 96.0]], "isOverall": false, "label": "https://chaldal.com/-32", "isController": false}, {"data": [[1.6854504E12, 137.55555555555554], [1.68545034E12, 178.0]], "isOverall": false, "label": "https://chaldal.com/-35", "isController": false}, {"data": [[1.6854504E12, 3133.166666666667], [1.68545046E12, 2763.5]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle", "isController": false}, {"data": [[1.6854504E12, 223.33333333333334], [1.68545034E12, 86.0]], "isOverall": false, "label": "https://chaldal.com/-34", "isController": false}, {"data": [[1.6854504E12, 90.85714285714286], [1.68545046E12, 399.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-20", "isController": false}, {"data": [[1.6854504E12, 166.33333333333334], [1.68545046E12, 348.2857142857143]], "isOverall": false, "label": "https://chaldal.com/personal-care-12", "isController": false}, {"data": [[1.6854504E12, 151.33333333333334], [1.68545046E12, 146.71428571428572]], "isOverall": false, "label": "https://chaldal.com/personal-care-13", "isController": false}, {"data": [[1.6854504E12, 172.88888888888889], [1.68545034E12, 96.0]], "isOverall": false, "label": "https://chaldal.com/-31", "isController": false}, {"data": [[1.6854504E12, 345.66666666666663], [1.68545046E12, 135.14285714285714]], "isOverall": false, "label": "https://chaldal.com/personal-care-14", "isController": false}, {"data": [[1.6854504E12, 365.77777777777777], [1.68545034E12, 191.0]], "isOverall": false, "label": "https://chaldal.com/-30", "isController": false}, {"data": [[1.6854504E12, 428.0], [1.68545046E12, 264.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-15", "isController": false}, {"data": [[1.6854504E12, 436.3333333333333], [1.68545046E12, 523.5714285714287]], "isOverall": false, "label": "https://chaldal.com/personal-care-10", "isController": false}, {"data": [[1.6854504E12, 282.0], [1.68545046E12, 309.14285714285717]], "isOverall": false, "label": "https://chaldal.com/personal-care-11", "isController": false}, {"data": [[1.6854504E12, 256.42857142857144], [1.68545046E12, 201.66666666666669]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-28", "isController": false}, {"data": [[1.6854504E12, 233.28571428571425], [1.68545046E12, 167.66666666666669]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-27", "isController": false}, {"data": [[1.6854504E12, 160.85714285714286], [1.68545046E12, 253.33333333333331]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-26", "isController": false}, {"data": [[1.6854504E12, 184.71428571428572], [1.68545046E12, 188.66666666666669]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-25", "isController": false}, {"data": [[1.6854504E12, 155.14285714285717], [1.68545046E12, 606.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-24", "isController": false}, {"data": [[1.6854504E12, 101.42857142857143], [1.68545046E12, 242.33333333333334]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-23", "isController": false}, {"data": [[1.6854504E12, 218.57142857142856], [1.68545046E12, 319.3333333333333]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-22", "isController": false}, {"data": [[1.6854504E12, 118.71428571428572], [1.68545046E12, 607.3333333333334]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-21", "isController": false}, {"data": [[1.6854504E12, 292.3333333333333], [1.68545034E12, 258.0]], "isOverall": false, "label": "https://chaldal.com/-29", "isController": false}, {"data": [[1.6854504E12, 88.14285714285714], [1.68545046E12, 177.66666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-19", "isController": false}, {"data": [[1.6854504E12, 88.14285714285715], [1.68545046E12, 284.6666666666667]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-18", "isController": false}, {"data": [[1.6854504E12, 212.11111111111111], [1.68545034E12, 87.0]], "isOverall": false, "label": "https://chaldal.com/-26", "isController": false}, {"data": [[1.6854504E12, 324.55555555555554], [1.68545034E12, 90.0]], "isOverall": false, "label": "https://chaldal.com/-25", "isController": false}, {"data": [[1.6854504E12, 418.77777777777777], [1.68545034E12, 88.0]], "isOverall": false, "label": "https://chaldal.com/-28", "isController": false}, {"data": [[1.6854504E12, 203.44444444444443], [1.68545034E12, 98.0]], "isOverall": false, "label": "https://chaldal.com/-27", "isController": false}, {"data": [[1.6854504E12, 133.88888888888889], [1.68545034E12, 94.0]], "isOverall": false, "label": "https://chaldal.com/-22", "isController": false}, {"data": [[1.6854504E12, 223.33333333333334], [1.68545034E12, 194.0]], "isOverall": false, "label": "https://chaldal.com/-21", "isController": false}, {"data": [[1.6854504E12, 2779.6666666666665], [1.68545046E12, 2603.0]], "isOverall": false, "label": "https://chaldal.com/personal-care", "isController": false}, {"data": [[1.6854504E12, 215.66666666666666], [1.68545034E12, 113.0]], "isOverall": false, "label": "https://chaldal.com/-24", "isController": false}, {"data": [[1.6854504E12, 322.44444444444446], [1.68545034E12, 102.0]], "isOverall": false, "label": "https://chaldal.com/-23", "isController": false}, {"data": [[1.6854504E12, 288.3333333333333], [1.68545046E12, 145.85714285714283]], "isOverall": false, "label": "https://chaldal.com/personal-care-23", "isController": false}, {"data": [[1.6854504E12, 203.5], [1.68545046E12, 348.49999999999994]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-8", "isController": false}, {"data": [[1.6854504E12, 92.5], [1.68545046E12, 148.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-39", "isController": false}, {"data": [[1.6854504E12, 196.66666666666666], [1.68545046E12, 249.7142857142857]], "isOverall": false, "label": "https://chaldal.com/personal-care-24", "isController": false}, {"data": [[1.6854504E12, 194.5], [1.68545046E12, 248.375]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-7", "isController": false}, {"data": [[1.6854504E12, 95.5], [1.68545046E12, 156.75]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-38", "isController": false}, {"data": [[1.6854504E12, 153.44444444444446], [1.68545034E12, 97.0]], "isOverall": false, "label": "https://chaldal.com/-20", "isController": false}, {"data": [[1.6854504E12, 108.0], [1.68545046E12, 258.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-25", "isController": false}, {"data": [[1.6854504E12, 117.33333333333333], [1.68545046E12, 197.28571428571428]], "isOverall": false, "label": "https://chaldal.com/personal-care-26", "isController": false}, {"data": [[1.6854504E12, 97.0], [1.68545046E12, 383.5]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-9", "isController": false}, {"data": [[1.6854504E12, 87.5], [1.68545046E12, 257.875]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-4", "isController": false}, {"data": [[1.6854504E12, 126.33333333333333], [1.68545046E12, 284.7142857142857]], "isOverall": false, "label": "https://chaldal.com/personal-care-20", "isController": false}, {"data": [[1.6854504E12, 87.0], [1.68545046E12, 210.12500000000003]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-3", "isController": false}, {"data": [[1.6854504E12, 195.0], [1.68545046E12, 161.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-21", "isController": false}, {"data": [[1.6854504E12, 88.5], [1.68545046E12, 166.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-6", "isController": false}, {"data": [[1.6854504E12, 413.3333333333333], [1.68545046E12, 189.99999999999997]], "isOverall": false, "label": "https://chaldal.com/personal-care-22", "isController": false}, {"data": [[1.6854504E12, 85.5], [1.68545046E12, 162.875]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-5", "isController": false}, {"data": [[1.6854504E12, 1459.5], [1.68545046E12, 1551.8749999999998]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-0", "isController": false}, {"data": [[1.6854504E12, 86.5], [1.68545046E12, 299.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-2", "isController": false}, {"data": [[1.6854504E12, 253.0], [1.68545046E12, 316.625]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-1", "isController": false}, {"data": [[1.6854504E12, 312.8888888888889], [1.68545034E12, 180.0]], "isOverall": false, "label": "https://chaldal.com/-19", "isController": false}, {"data": [[1.6854504E12, 210.75000000000003], [1.68545034E12, 97.5]], "isOverall": false, "label": "https://chaldal.com/-18", "isController": false}, {"data": [[1.6854504E12, 349.5], [1.68545046E12, 100.87499999999999]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-40", "isController": false}, {"data": [[1.6854504E12, 230.42857142857142], [1.68545046E12, 204.33333333333334]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-29", "isController": false}, {"data": [[1.6854504E12, 125.75000000000001], [1.68545034E12, 98.5]], "isOverall": false, "label": "https://chaldal.com/-15", "isController": false}, {"data": [[1.6854504E12, 88.5], [1.68545046E12, 159.625]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-42", "isController": false}, {"data": [[1.6854504E12, 299.375], [1.68545034E12, 98.5]], "isOverall": false, "label": "https://chaldal.com/-14", "isController": false}, {"data": [[1.6854504E12, 127.5], [1.68545046E12, 113.375]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-41", "isController": false}, {"data": [[1.6854504E12, 91.625], [1.68545034E12, 97.5]], "isOverall": false, "label": "https://chaldal.com/-17", "isController": false}, {"data": [[1.6854504E12, 2661.5], [1.68545046E12, 3261.75]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials", "isController": false}, {"data": [[1.6854504E12, 127.625], [1.68545034E12, 95.5]], "isOverall": false, "label": "https://chaldal.com/-16", "isController": false}, {"data": [[1.6854504E12, 94.5], [1.68545046E12, 182.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-43", "isController": false}, {"data": [[1.6854504E12, 94.0], [1.68545034E12, 99.5]], "isOverall": false, "label": "https://chaldal.com/-11", "isController": false}, {"data": [[1.6854504E12, 275.0], [1.68545046E12, 129.85714285714283]], "isOverall": false, "label": "https://chaldal.com/personal-care-16", "isController": false}, {"data": [[1.6854504E12, 358.0], [1.68545034E12, 271.0]], "isOverall": false, "label": "https://chaldal.com/-10", "isController": false}, {"data": [[1.6854504E12, 244.0], [1.68545046E12, 174.85714285714283]], "isOverall": false, "label": "https://chaldal.com/personal-care-17", "isController": false}, {"data": [[1.6854504E12, 154.1111111111111], [1.68545034E12, 101.0]], "isOverall": false, "label": "https://chaldal.com/-13", "isController": false}, {"data": [[1.6854504E12, 396.0], [1.68545046E12, 125.71428571428571]], "isOverall": false, "label": "https://chaldal.com/personal-care-18", "isController": false}, {"data": [[1.6854504E12, 105.25], [1.68545034E12, 153.0]], "isOverall": false, "label": "https://chaldal.com/-12", "isController": false}, {"data": [[1.6854504E12, 214.66666666666669], [1.68545046E12, 80.42857142857143]], "isOverall": false, "label": "https://chaldal.com/personal-care-19", "isController": false}, {"data": [[1.6854504E12, 240.0], [1.68545046E12, 268.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-30", "isController": false}, {"data": [[1.6854504E12, 170.33333333333334], [1.68545046E12, 230.7142857142857]], "isOverall": false, "label": "https://chaldal.com/personal-care-31", "isController": false}, {"data": [[1.6854504E12, 131.33333333333334], [1.68545046E12, 156.71428571428572]], "isOverall": false, "label": "https://chaldal.com/personal-care-27", "isController": false}, {"data": [[1.6854504E12, 249.0], [1.68545046E12, 171.42857142857144]], "isOverall": false, "label": "https://chaldal.com/personal-care-28", "isController": false}, {"data": [[1.6854504E12, 150.33333333333334], [1.68545046E12, 153.00000000000003]], "isOverall": false, "label": "https://chaldal.com/personal-care-29", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68545046E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.68545034E12, "maxY": 2749.3, "series": [{"data": [[1.6854504E12, 45.5], [1.68545046E12, 167.25]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-17", "isController": false}, {"data": [[1.6854504E12, 44.5], [1.68545046E12, 44.5]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-16", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-19", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 20.75]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-18", "isController": false}, {"data": [[1.6854504E12, 171.42857142857144], [1.68545046E12, 206.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-9", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-20", "isController": false}, {"data": [[1.6854504E12, 96.5], [1.68545046E12, 88.25]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-22", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-21", "isController": false}, {"data": [[1.6854504E12, 93.0], [1.68545046E12, 81.25000000000001]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-24", "isController": false}, {"data": [[1.6854504E12, 91.5], [1.68545046E12, 106.125]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-23", "isController": false}, {"data": [[1.6854504E12, 93.5], [1.68545046E12, 142.62500000000003]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-26", "isController": false}, {"data": [[1.6854504E12, 100.0], [1.68545046E12, 122.25]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-25", "isController": false}, {"data": [[1.6854504E12, 92.0], [1.68545046E12, 126.00000000000001]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-28", "isController": false}, {"data": [[1.6854504E12, 612.6249999999999], [1.68545046E12, 372.5]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-0", "isController": false}, {"data": [[1.6854504E12, 91.0], [1.68545046E12, 116.75]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-27", "isController": false}, {"data": [[1.6854504E12, 91.5], [1.68545046E12, 91.5]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-29", "isController": false}, {"data": [[1.6854504E12, 51.14285714285714], [1.68545046E12, 211.33333333333331]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-7", "isController": false}, {"data": [[1.6854504E12, 209.16666666666666], [1.68545046E12, 396.50000000000006]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-8", "isController": false}, {"data": [[1.6854504E12, 26.25], [1.68545046E12, 96.5]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-5", "isController": false}, {"data": [[1.6854504E12, 11.125], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-6", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-3", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-4", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-1", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-2", "isController": false}, {"data": [[1.6854504E12, 91.0], [1.68545046E12, 88.875]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-31", "isController": false}, {"data": [[1.6854504E12, 133.5], [1.68545046E12, 155.25]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-30", "isController": false}, {"data": [[1.6854504E12, 126.5], [1.68545046E12, 194.75]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-33", "isController": false}, {"data": [[1.6854504E12, 125.5], [1.68545046E12, 154.87499999999997]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-32", "isController": false}, {"data": [[1.6854504E12, 87.0], [1.68545046E12, 92.25]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-35", "isController": false}, {"data": [[1.6854504E12, 185.5], [1.68545046E12, 199.25]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-34", "isController": false}, {"data": [[1.6854504E12, 92.5], [1.68545046E12, 96.75]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-37", "isController": false}, {"data": [[1.6854504E12, 89.0], [1.68545046E12, 192.25]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-36", "isController": false}, {"data": [[1.6854504E12, 265.22222222222223], [1.68545034E12, 267.0]], "isOverall": false, "label": "https://chaldal.com/-50", "isController": false}, {"data": [[1.6854504E12, 25.333333333333332], [1.68545046E12, 11.857142857142858]], "isOverall": false, "label": "https://chaldal.com/personal-care-6", "isController": false}, {"data": [[1.6854504E12, 167.33333333333331], [1.68545046E12, 254.14285714285717]], "isOverall": false, "label": "https://chaldal.com/personal-care-5", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-4", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-3", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 139.14285714285714]], "isOverall": false, "label": "https://chaldal.com/personal-care-9", "isController": false}, {"data": [[1.6854504E12, 184.66666666666666], [1.68545046E12, 65.71428571428572]], "isOverall": false, "label": "https://chaldal.com/personal-care-8", "isController": false}, {"data": [[1.6854504E12, 192.0], [1.68545046E12, 146.14285714285714]], "isOverall": false, "label": "https://chaldal.com/personal-care-7", "isController": false}, {"data": [[1.6854504E12, 512.5555555555555], [1.68545034E12, 72.0]], "isOverall": false, "label": "https://chaldal.com/-48", "isController": false}, {"data": [[1.6854504E12, 99.55555555555556], [1.68545034E12, 80.0]], "isOverall": false, "label": "https://chaldal.com/-47", "isController": false}, {"data": [[1.6854504E12, 142.5], [1.68545046E12, 10.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-11", "isController": false}, {"data": [[1.6854504E12, 257.1111111111111], [1.68545034E12, 266.0]], "isOverall": false, "label": "https://chaldal.com/-49", "isController": false}, {"data": [[1.6854504E12, 147.0], [1.68545046E12, 106.125]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-10", "isController": false}, {"data": [[1.6854504E12, 157.77777777777777], [1.68545034E12, 82.0]], "isOverall": false, "label": "https://chaldal.com/-44", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-2", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 82.625]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-13", "isController": false}, {"data": [[1.6854504E12, 108.0], [1.68545034E12, 80.0]], "isOverall": false, "label": "https://chaldal.com/-43", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-1", "isController": false}, {"data": [[1.6854504E12, 201.5], [1.68545046E12, 41.125]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-12", "isController": false}, {"data": [[1.6854504E12, 226.0], [1.68545034E12, 80.0]], "isOverall": false, "label": "https://chaldal.com/-46", "isController": false}, {"data": [[1.6854504E12, 457.6666666666667], [1.68545046E12, 425.85714285714283]], "isOverall": false, "label": "https://chaldal.com/personal-care-0", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 28.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-15", "isController": false}, {"data": [[1.6854504E12, 127.88888888888889], [1.68545034E12, 79.0]], "isOverall": false, "label": "https://chaldal.com/-45", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 114.24999999999999]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-14", "isController": false}, {"data": [[1.6854504E12, 160.55555555555554], [1.68545034E12, 84.0]], "isOverall": false, "label": "https://chaldal.com/-40", "isController": false}, {"data": [[1.6854504E12, 103.77777777777779], [1.68545034E12, 81.0]], "isOverall": false, "label": "https://chaldal.com/-42", "isController": false}, {"data": [[1.6854504E12, 161.66666666666666], [1.68545034E12, 87.0]], "isOverall": false, "label": "https://chaldal.com/-41", "isController": false}, {"data": [[1.6854504E12, 951.0], [1.68545034E12, 326.5]], "isOverall": false, "label": "https://chaldal.com/-9", "isController": false}, {"data": [[1.6854504E12, 543.8749999999999], [1.68545034E12, 370.0]], "isOverall": false, "label": "https://chaldal.com/-5", "isController": false}, {"data": [[1.6854504E12, 952.111111111111]], "isOverall": false, "label": "https://chaldal.com/", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 138.33333333333331]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-17", "isController": false}, {"data": [[1.6854504E12, 676.375], [1.68545034E12, 358.5]], "isOverall": false, "label": "https://chaldal.com/-6", "isController": false}, {"data": [[1.6854504E12, 25.714285714285715], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-16", "isController": false}, {"data": [[1.6854504E12, 590.2500000000001], [1.68545034E12, 941.5]], "isOverall": false, "label": "https://chaldal.com/-7", "isController": false}, {"data": [[1.6854504E12, 14.571428571428571], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-15", "isController": false}, {"data": [[1.6854504E12, 348.87500000000006], [1.68545034E12, 335.5]], "isOverall": false, "label": "https://chaldal.com/-8", "isController": false}, {"data": [[1.6854504E12, 12.428571428571427], [1.68545046E12, 303.66666666666663]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-14", "isController": false}, {"data": [[1.6854504E12, 754.0000000000001], [1.68545034E12, 245.0]], "isOverall": false, "label": "https://chaldal.com/-1", "isController": false}, {"data": [[1.6854504E12, 25.714285714285715], [1.68545046E12, 70.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-13", "isController": false}, {"data": [[1.6854504E12, 569.6666666666666], [1.68545034E12, 348.0]], "isOverall": false, "label": "https://chaldal.com/-2", "isController": false}, {"data": [[1.6854504E12, 223.4285714285714], [1.68545046E12, 635.3333333333333]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-12", "isController": false}, {"data": [[1.6854504E12, 474.22222222222223], [1.68545034E12, 345.0]], "isOverall": false, "label": "https://chaldal.com/-3", "isController": false}, {"data": [[1.6854504E12, 49.66666666666667], [1.68545046E12, 241.75]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-11", "isController": false}, {"data": [[1.6854504E12, 340.125], [1.68545034E12, 376.5]], "isOverall": false, "label": "https://chaldal.com/-4", "isController": false}, {"data": [[1.6854504E12, 271.5714285714286], [1.68545046E12, 212.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-10", "isController": false}, {"data": [[1.6854504E12, 865.875], [1.68545034E12, 1432.0]], "isOverall": false, "label": "https://chaldal.com/-0", "isController": false}, {"data": [[1.6854504E12, 2749.3]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.6854504E12, 164.11111111111111], [1.68545034E12, 90.0]], "isOverall": false, "label": "https://chaldal.com/-37", "isController": false}, {"data": [[1.6854504E12, 128.66666666666666], [1.68545034E12, 90.0]], "isOverall": false, "label": "https://chaldal.com/-36", "isController": false}, {"data": [[1.6854504E12, 136.55555555555554], [1.68545034E12, 89.0]], "isOverall": false, "label": "https://chaldal.com/-39", "isController": false}, {"data": [[1.6854504E12, 94.33333333333331], [1.68545034E12, 82.0]], "isOverall": false, "label": "https://chaldal.com/-38", "isController": false}, {"data": [[1.6854504E12, 277.8888888888889], [1.68545034E12, 85.0]], "isOverall": false, "label": "https://chaldal.com/-33", "isController": false}, {"data": [[1.6854504E12, 175.77777777777777], [1.68545034E12, 86.0]], "isOverall": false, "label": "https://chaldal.com/-32", "isController": false}, {"data": [[1.6854504E12, 137.22222222222223], [1.68545034E12, 178.0]], "isOverall": false, "label": "https://chaldal.com/-35", "isController": false}, {"data": [[1.6854504E12, 681.8333333333333], [1.68545046E12, 388.75]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle", "isController": false}, {"data": [[1.6854504E12, 210.44444444444446], [1.68545034E12, 85.0]], "isOverall": false, "label": "https://chaldal.com/-34", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-20", "isController": false}, {"data": [[1.6854504E12, 141.0], [1.68545046E12, 137.14285714285714]], "isOverall": false, "label": "https://chaldal.com/personal-care-12", "isController": false}, {"data": [[1.6854504E12, 29.333333333333332], [1.68545046E12, 75.71428571428571]], "isOverall": false, "label": "https://chaldal.com/personal-care-13", "isController": false}, {"data": [[1.6854504E12, 148.66666666666669], [1.68545034E12, 92.0]], "isOverall": false, "label": "https://chaldal.com/-31", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 21.428571428571427]], "isOverall": false, "label": "https://chaldal.com/personal-care-14", "isController": false}, {"data": [[1.6854504E12, 338.0], [1.68545034E12, 190.0]], "isOverall": false, "label": "https://chaldal.com/-30", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 40.57142857142858]], "isOverall": false, "label": "https://chaldal.com/personal-care-15", "isController": false}, {"data": [[1.6854504E12, 109.0], [1.68545046E12, 155.85714285714283]], "isOverall": false, "label": "https://chaldal.com/personal-care-10", "isController": false}, {"data": [[1.6854504E12, 88.66666666666667], [1.68545046E12, 125.28571428571428]], "isOverall": false, "label": "https://chaldal.com/personal-care-11", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-28", "isController": false}, {"data": [[1.6854504E12, 216.14285714285714], [1.68545046E12, 163.33333333333331]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-27", "isController": false}, {"data": [[1.6854504E12, 87.99999999999999], [1.68545046E12, 190.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-26", "isController": false}, {"data": [[1.6854504E12, 171.0], [1.68545046E12, 158.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-25", "isController": false}, {"data": [[1.6854504E12, 124.57142857142857], [1.68545046E12, 577.3333333333333]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-24", "isController": false}, {"data": [[1.6854504E12, 99.0], [1.68545046E12, 240.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-23", "isController": false}, {"data": [[1.6854504E12, 183.0], [1.68545046E12, 156.66666666666669]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-22", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-21", "isController": false}, {"data": [[1.6854504E12, 241.44444444444446], [1.68545034E12, 257.0]], "isOverall": false, "label": "https://chaldal.com/-29", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-19", "isController": false}, {"data": [[1.6854504E12, 35.714285714285715], [1.68545046E12, 157.33333333333331]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-18", "isController": false}, {"data": [[1.6854504E12, 199.55555555555554], [1.68545034E12, 87.0]], "isOverall": false, "label": "https://chaldal.com/-26", "isController": false}, {"data": [[1.6854504E12, 211.77777777777777], [1.68545034E12, 89.0]], "isOverall": false, "label": "https://chaldal.com/-25", "isController": false}, {"data": [[1.6854504E12, 280.44444444444446], [1.68545034E12, 87.0]], "isOverall": false, "label": "https://chaldal.com/-28", "isController": false}, {"data": [[1.6854504E12, 193.55555555555554], [1.68545034E12, 98.0]], "isOverall": false, "label": "https://chaldal.com/-27", "isController": false}, {"data": [[1.6854504E12, 127.11111111111111], [1.68545034E12, 87.0]], "isOverall": false, "label": "https://chaldal.com/-22", "isController": false}, {"data": [[1.6854504E12, 221.11111111111111], [1.68545034E12, 89.0]], "isOverall": false, "label": "https://chaldal.com/-21", "isController": false}, {"data": [[1.6854504E12, 457.6666666666667], [1.68545046E12, 425.85714285714283]], "isOverall": false, "label": "https://chaldal.com/personal-care", "isController": false}, {"data": [[1.6854504E12, 127.0], [1.68545034E12, 90.0]], "isOverall": false, "label": "https://chaldal.com/-24", "isController": false}, {"data": [[1.6854504E12, 232.22222222222223], [1.68545034E12, 93.0]], "isOverall": false, "label": "https://chaldal.com/-23", "isController": false}, {"data": [[1.6854504E12, 284.6666666666667], [1.68545046E12, 119.71428571428571]], "isOverall": false, "label": "https://chaldal.com/personal-care-23", "isController": false}, {"data": [[1.6854504E12, 149.0], [1.68545046E12, 48.12499999999999]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-8", "isController": false}, {"data": [[1.6854504E12, 92.0], [1.68545046E12, 99.5]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-39", "isController": false}, {"data": [[1.6854504E12, 167.0], [1.68545046E12, 117.85714285714285]], "isOverall": false, "label": "https://chaldal.com/personal-care-24", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 43.25]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-7", "isController": false}, {"data": [[1.6854504E12, 88.0], [1.68545046E12, 150.87499999999997]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-38", "isController": false}, {"data": [[1.6854504E12, 127.88888888888889], [1.68545034E12, 93.0]], "isOverall": false, "label": "https://chaldal.com/-20", "isController": false}, {"data": [[1.6854504E12, 96.33333333333333], [1.68545046E12, 179.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-25", "isController": false}, {"data": [[1.6854504E12, 110.66666666666667], [1.68545046E12, 154.00000000000003]], "isOverall": false, "label": "https://chaldal.com/personal-care-26", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 240.75]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-9", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-4", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-20", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-3", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-21", "isController": false}, {"data": [[1.6854504E12, 44.0], [1.68545046E12, 39.125]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-6", "isController": false}, {"data": [[1.6854504E12, 297.6666666666667], [1.68545046E12, 117.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-22", "isController": false}, {"data": [[1.6854504E12, 40.5], [1.68545046E12, 52.75]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-5", "isController": false}, {"data": [[1.6854504E12, 641.0], [1.68545046E12, 802.5]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-0", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-2", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-1", "isController": false}, {"data": [[1.6854504E12, 122.22222222222223], [1.68545034E12, 170.0]], "isOverall": false, "label": "https://chaldal.com/-19", "isController": false}, {"data": [[1.6854504E12, 162.125], [1.68545034E12, 97.5]], "isOverall": false, "label": "https://chaldal.com/-18", "isController": false}, {"data": [[1.6854504E12, 196.5], [1.68545046E12, 96.75]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-40", "isController": false}, {"data": [[1.6854504E12, 225.14285714285714], [1.68545046E12, 200.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-29", "isController": false}, {"data": [[1.6854504E12, 112.24999999999999], [1.68545034E12, 93.5]], "isOverall": false, "label": "https://chaldal.com/-15", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-42", "isController": false}, {"data": [[1.6854504E12, 153.625], [1.68545034E12, 97.5]], "isOverall": false, "label": "https://chaldal.com/-14", "isController": false}, {"data": [[1.6854504E12, 123.0], [1.68545046E12, 96.625]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-41", "isController": false}, {"data": [[1.6854504E12, 91.0], [1.68545034E12, 97.5]], "isOverall": false, "label": "https://chaldal.com/-17", "isController": false}, {"data": [[1.6854504E12, 641.0], [1.68545046E12, 802.5]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials", "isController": false}, {"data": [[1.6854504E12, 127.625], [1.68545034E12, 95.5]], "isOverall": false, "label": "https://chaldal.com/-16", "isController": false}, {"data": [[1.6854504E12, 83.0], [1.68545046E12, 172.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-43", "isController": false}, {"data": [[1.6854504E12, 93.49999999999999], [1.68545034E12, 99.0]], "isOverall": false, "label": "https://chaldal.com/-11", "isController": false}, {"data": [[1.6854504E12, 275.0], [1.68545046E12, 34.714285714285715]], "isOverall": false, "label": "https://chaldal.com/personal-care-16", "isController": false}, {"data": [[1.6854504E12, 357.75], [1.68545034E12, 270.5]], "isOverall": false, "label": "https://chaldal.com/-10", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 21.71428571428571]], "isOverall": false, "label": "https://chaldal.com/personal-care-17", "isController": false}, {"data": [[1.6854504E12, 153.77777777777777], [1.68545034E12, 101.0]], "isOverall": false, "label": "https://chaldal.com/-13", "isController": false}, {"data": [[1.6854504E12, 261.66666666666663], [1.68545046E12, 37.57142857142857]], "isOverall": false, "label": "https://chaldal.com/personal-care-18", "isController": false}, {"data": [[1.6854504E12, 104.75], [1.68545034E12, 151.5]], "isOverall": false, "label": "https://chaldal.com/-12", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-19", "isController": false}, {"data": [[1.6854504E12, 163.33333333333334], [1.68545046E12, 178.28571428571428]], "isOverall": false, "label": "https://chaldal.com/personal-care-30", "isController": false}, {"data": [[1.6854504E12, 159.66666666666666], [1.68545046E12, 224.2857142857143]], "isOverall": false, "label": "https://chaldal.com/personal-care-31", "isController": false}, {"data": [[1.6854504E12, 97.66666666666667], [1.68545046E12, 133.42857142857142]], "isOverall": false, "label": "https://chaldal.com/personal-care-27", "isController": false}, {"data": [[1.6854504E12, 220.33333333333334], [1.68545046E12, 111.71428571428571]], "isOverall": false, "label": "https://chaldal.com/personal-care-28", "isController": false}, {"data": [[1.6854504E12, 93.0], [1.68545046E12, 126.28571428571428]], "isOverall": false, "label": "https://chaldal.com/personal-care-29", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68545046E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.68545034E12, "maxY": 852.0, "series": [{"data": [[1.6854504E12, 0.0], [1.68545046E12, 146.125]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-17", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 49.75]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-16", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-19", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-18", "isController": false}, {"data": [[1.6854504E12, 244.42857142857144], [1.68545046E12, 209.33333333333334]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-9", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-20", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-22", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-21", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-24", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 22.5]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-23", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 44.25]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-26", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 39.25]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-25", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-28", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-0", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-27", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-29", "isController": false}, {"data": [[1.6854504E12, 339.4285714285714], [1.68545046E12, 213.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-7", "isController": false}, {"data": [[1.6854504E12, 368.1666666666667], [1.68545046E12, 459.5]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-8", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-5", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-6", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-3", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-4", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-1", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-2", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-31", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 61.87499999999999]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-30", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-33", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 60.875]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-32", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-35", "isController": false}, {"data": [[1.6854504E12, 97.0], [1.68545046E12, 111.62499999999999]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-34", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-37", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 98.87499999999999]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-36", "isController": false}, {"data": [[1.6854504E12, 183.66666666666666], [1.68545034E12, 191.0]], "isOverall": false, "label": "https://chaldal.com/-50", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 50.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-6", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 194.28571428571428]], "isOverall": false, "label": "https://chaldal.com/personal-care-5", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 195.42857142857144]], "isOverall": false, "label": "https://chaldal.com/personal-care-4", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 51.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-3", "isController": false}, {"data": [[1.6854504E12, 552.6666666666666], [1.68545046E12, 273.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-9", "isController": false}, {"data": [[1.6854504E12, 557.3333333333334], [1.68545046E12, 420.5714285714286]], "isOverall": false, "label": "https://chaldal.com/personal-care-8", "isController": false}, {"data": [[1.6854504E12, 200.33333333333334], [1.68545046E12, 250.85714285714283]], "isOverall": false, "label": "https://chaldal.com/personal-care-7", "isController": false}, {"data": [[1.6854504E12, 415.6666666666667], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-48", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-47", "isController": false}, {"data": [[1.6854504E12, 104.5], [1.68545046E12, 328.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-11", "isController": false}, {"data": [[1.6854504E12, 164.88888888888889], [1.68545034E12, 186.0]], "isOverall": false, "label": "https://chaldal.com/-49", "isController": false}, {"data": [[1.6854504E12, 106.0], [1.68545046E12, 266.87500000000006]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-10", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-44", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 50.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-2", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 90.375]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-13", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-43", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-1", "isController": false}, {"data": [[1.6854504E12, 109.0], [1.68545046E12, 126.37499999999999]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-12", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-46", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 51.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-0", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 164.125]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-15", "isController": false}, {"data": [[1.6854504E12, 19.0], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-45", "isController": false}, {"data": [[1.6854504E12, 102.0], [1.68545046E12, 21.875]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-14", "isController": false}, {"data": [[1.6854504E12, 16.22222222222222], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-40", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-42", "isController": false}, {"data": [[1.6854504E12, 58.22222222222221], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-41", "isController": false}, {"data": [[1.6854504E12, 674.375], [1.68545034E12, 229.5]], "isOverall": false, "label": "https://chaldal.com/-9", "isController": false}, {"data": [[1.6854504E12, 351.875], [1.68545034E12, 269.5]], "isOverall": false, "label": "https://chaldal.com/-5", "isController": false}, {"data": [[1.6854504E12, 454.6666666666667]], "isOverall": false, "label": "https://chaldal.com/", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 223.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-17", "isController": false}, {"data": [[1.6854504E12, 561.0], [1.68545034E12, 266.5]], "isOverall": false, "label": "https://chaldal.com/-6", "isController": false}, {"data": [[1.6854504E12, 31.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-16", "isController": false}, {"data": [[1.6854504E12, 488.125], [1.68545034E12, 852.0]], "isOverall": false, "label": "https://chaldal.com/-7", "isController": false}, {"data": [[1.6854504E12, 24.0], [1.68545046E12, 69.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-15", "isController": false}, {"data": [[1.6854504E12, 243.125], [1.68545034E12, 239.0]], "isOverall": false, "label": "https://chaldal.com/-8", "isController": false}, {"data": [[1.6854504E12, 28.571428571428573], [1.68545046E12, 243.66666666666669]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-14", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-1", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-13", "isController": false}, {"data": [[1.6854504E12, 451.2222222222222], [1.68545034E12, 257.0]], "isOverall": false, "label": "https://chaldal.com/-2", "isController": false}, {"data": [[1.6854504E12, 592.8571428571429], [1.68545046E12, 520.3333333333333]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-12", "isController": false}, {"data": [[1.6854504E12, 380.0], [1.68545034E12, 251.0]], "isOverall": false, "label": "https://chaldal.com/-3", "isController": false}, {"data": [[1.6854504E12, 197.83333333333331], [1.68545046E12, 410.25]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-11", "isController": false}, {"data": [[1.6854504E12, 231.375], [1.68545034E12, 274.5]], "isOverall": false, "label": "https://chaldal.com/-4", "isController": false}, {"data": [[1.6854504E12, 198.85714285714286], [1.68545046E12, 405.6666666666667]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-10", "isController": false}, {"data": [[1.6854504E12, 355.87500000000006], [1.68545034E12, 751.0]], "isOverall": false, "label": "https://chaldal.com/-0", "isController": false}, {"data": [[1.6854504E12, 627.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.6854504E12, 53.88888888888889], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-37", "isController": false}, {"data": [[1.6854504E12, 23.444444444444443], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-36", "isController": false}, {"data": [[1.6854504E12, 24.111111111111114], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-39", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-38", "isController": false}, {"data": [[1.6854504E12, 169.11111111111111], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-33", "isController": false}, {"data": [[1.6854504E12, 27.111111111111107], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-32", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-35", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle", "isController": false}, {"data": [[1.6854504E12, 72.55555555555556], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-34", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 178.66666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-20", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 223.8571428571429]], "isOverall": false, "label": "https://chaldal.com/personal-care-12", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-13", "isController": false}, {"data": [[1.6854504E12, 54.333333333333336], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-31", "isController": false}, {"data": [[1.6854504E12, 169.66666666666669], [1.68545046E12, 52.857142857142854]], "isOverall": false, "label": "https://chaldal.com/personal-care-14", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-30", "isController": false}, {"data": [[1.6854504E12, 334.33333333333337], [1.68545046E12, 116.42857142857144]], "isOverall": false, "label": "https://chaldal.com/personal-care-15", "isController": false}, {"data": [[1.6854504E12, 270.3333333333333], [1.68545046E12, 418.2857142857143]], "isOverall": false, "label": "https://chaldal.com/personal-care-10", "isController": false}, {"data": [[1.6854504E12, 192.0], [1.68545046E12, 208.71428571428572]], "isOverall": false, "label": "https://chaldal.com/personal-care-11", "isController": false}, {"data": [[1.6854504E12, 159.85714285714283], [1.68545046E12, 123.33333333333334]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-28", "isController": false}, {"data": [[1.6854504E12, 57.42857142857143], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-27", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 74.33333333333333]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-26", "isController": false}, {"data": [[1.6854504E12, 65.85714285714285], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-25", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 494.3333333333333]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-24", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 148.66666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-23", "isController": false}, {"data": [[1.6854504E12, 92.71428571428571], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-22", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 519.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-21", "isController": false}, {"data": [[1.6854504E12, 75.55555555555556], [1.68545034E12, 170.0]], "isOverall": false, "label": "https://chaldal.com/-29", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-19", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 200.66666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-18", "isController": false}, {"data": [[1.6854504E12, 49.44444444444445], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-26", "isController": false}, {"data": [[1.6854504E12, 65.77777777777777], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-25", "isController": false}, {"data": [[1.6854504E12, 83.66666666666667], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-28", "isController": false}, {"data": [[1.6854504E12, 84.66666666666667], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-27", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-22", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-21", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 51.0]], "isOverall": false, "label": "https://chaldal.com/personal-care", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-24", "isController": false}, {"data": [[1.6854504E12, 71.22222222222223], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-23", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-23", "isController": false}, {"data": [[1.6854504E12, 108.5], [1.68545046E12, 263.5]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-8", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-39", "isController": false}, {"data": [[1.6854504E12, 65.66666666666666], [1.68545046E12, 33.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-24", "isController": false}, {"data": [[1.6854504E12, 108.0], [1.68545046E12, 160.25]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-7", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 28.999999999999996]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-38", "isController": false}, {"data": [[1.6854504E12, 20.888888888888893], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-20", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-25", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-26", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 298.375]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-9", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 85.75]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-4", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 204.57142857142856]], "isOverall": false, "label": "https://chaldal.com/personal-care-20", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 124.00000000000003]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-3", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-21", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 80.75000000000001]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-6", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-22", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 78.87500000000001]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-5", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 195.5]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-0", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 79.37499999999999]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-2", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-1", "isController": false}, {"data": [[1.6854504E12, 15.666666666666666], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-19", "isController": false}, {"data": [[1.6854504E12, 55.99999999999999], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-18", "isController": false}, {"data": [[1.6854504E12, 107.5], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-40", "isController": false}, {"data": [[1.6854504E12, 105.71428571428571], [1.68545046E12, 109.66666666666667]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-29", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-15", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 68.12499999999999]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-42", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-14", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-41", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-17", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 195.5]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-16", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 89.25000000000001]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-43", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-11", "isController": false}, {"data": [[1.6854504E12, 184.66666666666666], [1.68545046E12, 49.714285714285715]], "isOverall": false, "label": "https://chaldal.com/personal-care-16", "isController": false}, {"data": [[1.6854504E12, 125.875], [1.68545034E12, 123.5]], "isOverall": false, "label": "https://chaldal.com/-10", "isController": false}, {"data": [[1.6854504E12, 80.0], [1.68545046E12, 54.42857142857143]], "isOverall": false, "label": "https://chaldal.com/personal-care-17", "isController": false}, {"data": [[1.6854504E12, 56.111111111111114], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-13", "isController": false}, {"data": [[1.6854504E12, 235.33333333333331], [1.68545046E12, 43.14285714285714]], "isOverall": false, "label": "https://chaldal.com/personal-care-18", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545034E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-12", "isController": false}, {"data": [[1.6854504E12, 124.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-19", "isController": false}, {"data": [[1.6854504E12, 70.66666666666667], [1.68545046E12, 74.85714285714285]], "isOverall": false, "label": "https://chaldal.com/personal-care-30", "isController": false}, {"data": [[1.6854504E12, 80.33333333333334], [1.68545046E12, 142.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-31", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-27", "isController": false}, {"data": [[1.6854504E12, 119.33333333333334], [1.68545046E12, 28.428571428571427]], "isOverall": false, "label": "https://chaldal.com/personal-care-28", "isController": false}, {"data": [[1.6854504E12, 0.0], [1.68545046E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-29", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68545046E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 63.0, "minX": 1.68545034E12, "maxY": 6770.0, "series": [{"data": [[1.6854504E12, 6770.0], [1.68545046E12, 5432.0], [1.68545034E12, 2564.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.6854504E12, 805.5000000000007], [1.68545046E12, 615.3999999999999], [1.68545034E12, 653.2000000000005]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.6854504E12, 4176.470000000003], [1.68545046E12, 3113.1599999999785], [1.68545034E12, 2564.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.6854504E12, 1820.6499999999992], [1.68545046E12, 1291.4999999999993], [1.68545034E12, 1819.1999999999957]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.6854504E12, 70.0], [1.68545046E12, 63.0], [1.68545034E12, 72.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.6854504E12, 114.5], [1.68545046E12, 136.0], [1.68545034E12, 102.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68545046E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 79.0, "minX": 1.0, "maxY": 2390.0, "series": [{"data": [[2.0, 1319.0], [33.0, 110.0], [32.0, 79.0], [34.0, 162.5], [39.0, 82.0], [41.0, 306.0], [42.0, 95.5], [45.0, 89.0], [3.0, 1296.0], [49.0, 188.0], [51.0, 159.0], [55.0, 155.0], [4.0, 439.0], [5.0, 353.0], [6.0, 343.0], [7.0, 195.0], [9.0, 319.0], [11.0, 285.0], [12.0, 106.0], [13.0, 131.0], [14.0, 135.5], [15.0, 139.0], [1.0, 2390.0], [16.0, 100.5], [17.0, 182.5], [18.0, 108.5], [19.0, 110.0], [20.0, 113.5], [21.0, 98.0], [22.0, 98.0], [23.0, 116.0], [24.0, 102.5], [25.0, 104.5], [26.0, 129.5], [27.0, 139.0], [28.0, 104.0], [29.0, 100.0], [30.0, 103.0], [31.0, 93.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 55.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 861.0, "series": [{"data": [[2.0, 745.5], [33.0, 0.0], [32.0, 70.5], [34.0, 104.5], [39.0, 71.0], [41.0, 0.0], [42.0, 0.0], [45.0, 0.0], [3.0, 491.0], [49.0, 88.0], [51.0, 93.0], [55.0, 79.0], [4.0, 418.0], [5.0, 349.0], [6.0, 38.0], [7.0, 83.0], [9.0, 269.0], [11.0, 118.0], [12.0, 105.5], [13.0, 74.0], [14.0, 114.0], [15.0, 102.0], [1.0, 861.0], [16.0, 89.0], [17.0, 87.0], [18.0, 84.5], [19.0, 100.0], [20.0, 91.5], [21.0, 93.0], [22.0, 0.0], [23.0, 86.0], [24.0, 0.0], [25.0, 84.5], [26.0, 93.5], [27.0, 96.0], [28.0, 76.0], [29.0, 0.0], [30.0, 99.0], [31.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 55.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 1.2333333333333334, "minX": 1.68545034E12, "maxY": 14.416666666666666, "series": [{"data": [[1.6854504E12, 14.416666666666666], [1.68545046E12, 11.166666666666666], [1.68545034E12, 1.2333333333333334]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68545046E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 1.1166666666666667, "minX": 1.68545034E12, "maxY": 10.716666666666667, "series": [{"data": [[1.6854504E12, 10.716666666666667], [1.68545046E12, 6.45], [1.68545034E12, 1.1166666666666667]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.6854504E12, 3.65], [1.68545046E12, 4.883333333333334]], "isOverall": false, "label": "304", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68545046E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.68545034E12, "maxY": 0.16666666666666666, "series": [{"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-13-success", "isController": false}, {"data": [[1.6854504E12, 0.11666666666666667], [1.68545046E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-22-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-1-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-14-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-32-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-13-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-42-success", "isController": false}, {"data": [[1.6854504E12, 0.1], [1.68545046E12, 0.06666666666666667]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-45-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-5-success", "isController": false}, {"data": [[1.6854504E12, 0.11666666666666667], [1.68545046E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-26-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-10-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-26-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-0-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-41-success", "isController": false}, {"data": [[1.6854504E12, 0.13333333333333333], [1.68545034E12, 0.03333333333333333]], "isOverall": false, "label": "https://chaldal.com/-1-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-26-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-27-success", "isController": false}, {"data": [[1.6854504E12, 0.13333333333333333], [1.68545046E12, 0.03333333333333333]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-2-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-22-success", "isController": false}, {"data": [[1.6854504E12, 0.11666666666666667], [1.68545046E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-17-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-3-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-20-success", "isController": false}, {"data": [[1.6854504E12, 0.13333333333333333], [1.68545034E12, 0.03333333333333333]], "isOverall": false, "label": "https://chaldal.com/-5-success", "isController": false}, {"data": [[1.6854504E12, 0.16666666666666666]], "isOverall": false, "label": "Test-success", "isController": true}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-36-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-23-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-7-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-24-success", "isController": false}, {"data": [[1.6854504E12, 0.13333333333333333], [1.68545046E12, 0.03333333333333333]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-6-success", "isController": false}, {"data": [[1.6854504E12, 0.11666666666666667], [1.68545046E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-13-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-17-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-48-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-8-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-36-success", "isController": false}, {"data": [[1.6854504E12, 0.13333333333333333], [1.68545034E12, 0.03333333333333333]], "isOverall": false, "label": "https://chaldal.com/-17-success", "isController": false}, {"data": [[1.6854504E12, 0.11666666666666667], [1.68545046E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-29-success", "isController": false}, {"data": [[1.6854504E12, 0.13333333333333333], [1.68545034E12, 0.03333333333333333]], "isOverall": false, "label": "https://chaldal.com/-16-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-46-success", "isController": false}, {"data": [[1.6854504E12, 0.13333333333333333], [1.68545046E12, 0.03333333333333333]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-1-success", "isController": false}, {"data": [[1.6854504E12, 0.11666666666666667], [1.68545046E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-25-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-29-success", "isController": false}, {"data": [[1.6854504E12, 0.11666666666666667], [1.68545046E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-21-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-16-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-41-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-0-success", "isController": false}, {"data": [[1.6854504E12, 0.13333333333333333], [1.68545046E12, 0.03333333333333333]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-5-success", "isController": false}, {"data": [[1.6854504E12, 0.13333333333333333], [1.68545034E12, 0.03333333333333333]], "isOverall": false, "label": "https://chaldal.com/-12-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-4-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-25-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-28-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-30-success", "isController": false}, {"data": [[1.6854504E12, 0.13333333333333333], [1.68545034E12, 0.03333333333333333]], "isOverall": false, "label": "https://chaldal.com/-0-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-13-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-42-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-27-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-12-success", "isController": false}, {"data": [[1.6854504E12, 0.13333333333333333], [1.68545034E12, 0.03333333333333333]], "isOverall": false, "label": "https://chaldal.com/-4-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-20-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-2-success", "isController": false}, {"data": [[1.6854504E12, 0.11666666666666667], [1.68545046E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-16-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-37-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-21-success", "isController": false}, {"data": [[1.6854504E12, 0.15]], "isOverall": false, "label": "https://chaldal.com/-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-6-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-24-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-37-success", "isController": false}, {"data": [[1.6854504E12, 0.11666666666666667], [1.68545046E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-12-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-33-success", "isController": false}, {"data": [[1.6854504E12, 0.13333333333333333], [1.68545034E12, 0.03333333333333333]], "isOverall": false, "label": "https://chaldal.com/-8-success", "isController": false}, {"data": [[1.6854504E12, 0.11666666666666667], [1.68545046E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-28-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-19-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-33-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-7-success", "isController": false}, {"data": [[1.6854504E12, 0.11666666666666667], [1.68545046E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-9-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-50-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-49-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-21-success", "isController": false}, {"data": [[1.6854504E12, 0.13333333333333333], [1.68545034E12, 0.03333333333333333]], "isOverall": false, "label": "https://chaldal.com/-15-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-30-success", "isController": false}, {"data": [[1.6854504E12, 0.11666666666666667], [1.68545046E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-24-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-47-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-28-success", "isController": false}, {"data": [[1.6854504E12, 0.13333333333333333], [1.68545046E12, 0.03333333333333333]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-4-success", "isController": false}, {"data": [[1.6854504E12, 0.13333333333333333], [1.68545046E12, 0.03333333333333333]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-0-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-16-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-29-success", "isController": false}, {"data": [[1.6854504E12, 0.11666666666666667], [1.68545046E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-20-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-15-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-28-success", "isController": false}, {"data": [[1.6854504E12, 0.13333333333333333], [1.68545034E12, 0.03333333333333333]], "isOverall": false, "label": "https://chaldal.com/-11-success", "isController": false}, {"data": [[1.6854504E12, 0.1], [1.68545046E12, 0.06666666666666667]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-11-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-9-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-25-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-11-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-31-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-30-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-12-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-43-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-3-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-21-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-38-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-5-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-22-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-24-success", "isController": false}, {"data": [[1.6854504E12, 0.11666666666666667], [1.68545046E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-19-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-1-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-3-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-38-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-6-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-19-success", "isController": false}, {"data": [[1.6854504E12, 0.13333333333333333], [1.68545034E12, 0.03333333333333333]], "isOverall": false, "label": "https://chaldal.com/-7-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-19-success", "isController": false}, {"data": [[1.6854504E12, 0.11666666666666667], [1.68545046E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-27-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-34-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-20-success", "isController": false}, {"data": [[1.6854504E12, 0.11666666666666667], [1.68545046E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-15-success", "isController": false}, {"data": [[1.6854504E12, 0.1], [1.68545046E12, 0.06666666666666667]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-8-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-18-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-34-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-14-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-2-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-15-success", "isController": false}, {"data": [[1.6854504E12, 0.13333333333333333], [1.68545046E12, 0.03333333333333333]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-3-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-44-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-29-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-32-success", "isController": false}, {"data": [[1.6854504E12, 0.13333333333333333], [1.68545034E12, 0.03333333333333333]], "isOverall": false, "label": "https://chaldal.com/-14-success", "isController": false}, {"data": [[1.6854504E12, 0.13333333333333333], [1.68545034E12, 0.03333333333333333]], "isOverall": false, "label": "https://chaldal.com/-9-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-31-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-8-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-26-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-10-success", "isController": false}, {"data": [[1.6854504E12, 0.13333333333333333], [1.68545034E12, 0.03333333333333333]], "isOverall": false, "label": "https://chaldal.com/-10-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-31-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-25-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-27-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-11-success", "isController": false}, {"data": [[1.6854504E12, 0.11666666666666667], [1.68545046E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-10-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-43-success", "isController": false}, {"data": [[1.6854504E12, 0.11666666666666667], [1.68545046E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-23-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-39-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-23-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-22-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-2-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-23-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-39-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-40-success", "isController": false}, {"data": [[1.6854504E12, 0.11666666666666667], [1.68545046E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-18-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-success", "isController": false}, {"data": [[1.6854504E12, 0.11666666666666667], [1.68545046E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-7-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-40-success", "isController": false}, {"data": [[1.6854504E12, 0.15], [1.68545034E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-35-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-17-success", "isController": false}, {"data": [[1.6854504E12, 0.13333333333333333], [1.68545034E12, 0.03333333333333333]], "isOverall": false, "label": "https://chaldal.com/-18-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-35-success", "isController": false}, {"data": [[1.6854504E12, 0.05], [1.68545046E12, 0.11666666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-9-success", "isController": false}, {"data": [[1.6854504E12, 0.11666666666666667], [1.68545046E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-14-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-18-success", "isController": false}, {"data": [[1.6854504E12, 0.03333333333333333], [1.68545046E12, 0.13333333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-4-success", "isController": false}, {"data": [[1.6854504E12, 0.13333333333333333], [1.68545034E12, 0.03333333333333333]], "isOverall": false, "label": "https://chaldal.com/-6-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68545046E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 1.1166666666666667, "minX": 1.68545034E12, "maxY": 14.533333333333333, "series": [{"data": [[1.6854504E12, 14.533333333333333], [1.68545046E12, 11.333333333333334], [1.68545034E12, 1.1166666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68545046E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
