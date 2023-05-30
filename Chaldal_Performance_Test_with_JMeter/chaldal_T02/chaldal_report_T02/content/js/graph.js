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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 5.0, "series": [{"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-17", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-16", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-19", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-18", "isController": false}, {"data": [[100.0, 1.0], [200.0, 2.0], [400.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-9", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-20", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-22", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-21", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-24", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-23", "isController": false}, {"data": [[0.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-26", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-25", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-28", "isController": false}, {"data": [[700.0, 1.0], [800.0, 1.0], [900.0, 3.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-0", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-27", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-29", "isController": false}, {"data": [[100.0, 2.0], [200.0, 3.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-7", "isController": false}, {"data": [[100.0, 2.0], [200.0, 3.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-8", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-5", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-6", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-3", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-4", "isController": false}, {"data": [[300.0, 1.0], [400.0, 1.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-1", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-2", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-31", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-30", "isController": false}, {"data": [[0.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-33", "isController": false}, {"data": [[0.0, 3.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-32", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-35", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-34", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-37", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-36", "isController": false}, {"data": [[300.0, 2.0], [200.0, 3.0]], "isOverall": false, "label": "https://chaldal.com/-50", "isController": false}, {"data": [[0.0, 3.0], [200.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-6", "isController": false}, {"data": [[0.0, 3.0], [200.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-5", "isController": false}, {"data": [[0.0, 3.0], [200.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-4", "isController": false}, {"data": [[0.0, 3.0], [200.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-3", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [200.0, 3.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-9", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-8", "isController": false}, {"data": [[0.0, 2.0], [600.0, 1.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-7", "isController": false}, {"data": [[0.0, 2.0], [1200.0, 1.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-48", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/-47", "isController": false}, {"data": [[0.0, 3.0], [200.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-11", "isController": false}, {"data": [[300.0, 2.0], [400.0, 3.0]], "isOverall": false, "label": "https://chaldal.com/-49", "isController": false}, {"data": [[0.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-10", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-44", "isController": false}, {"data": [[0.0, 3.0], [200.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-2", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-13", "isController": false}, {"data": [[0.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-43", "isController": false}, {"data": [[300.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-1", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-12", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/-46", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [1300.0, 1.0], [1800.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-15", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/-45", "isController": false}, {"data": [[0.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-14", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/-40", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/-42", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/-41", "isController": false}, {"data": [[100.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-9", "isController": false}, {"data": [[300.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "https://chaldal.com/-5", "isController": false}, {"data": [[4100.0, 1.0], [3000.0, 1.0], [3100.0, 1.0], [3700.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-17", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/-6", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-16", "isController": false}, {"data": [[1200.0, 1.0], [100.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-7", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-15", "isController": false}, {"data": [[100.0, 3.0], [200.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/-8", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-14", "isController": false}, {"data": [[1500.0, 1.0], [400.0, 1.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-1", "isController": false}, {"data": [[0.0, 3.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-13", "isController": false}, {"data": [[1400.0, 4.0], [1500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-2", "isController": false}, {"data": [[0.0, 3.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-12", "isController": false}, {"data": [[1200.0, 1.0], [1300.0, 2.0], [1400.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-3", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0], [200.0, 3.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-11", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/-4", "isController": false}, {"data": [[100.0, 2.0], [200.0, 3.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-10", "isController": false}, {"data": [[1400.0, 2.0], [800.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-0", "isController": false}, {"data": [[8400.0, 1.0], [9200.0, 2.0], [10100.0, 1.0], [10600.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/-37", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/-36", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/-39", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/-38", "isController": false}, {"data": [[0.0, 3.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-33", "isController": false}, {"data": [[0.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/-32", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/-35", "isController": false}, {"data": [[1400.0, 1.0], [1500.0, 1.0], [1600.0, 1.0], [1700.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/-34", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-20", "isController": false}, {"data": [[0.0, 1.0], [200.0, 2.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-12", "isController": false}, {"data": [[0.0, 3.0], [200.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-13", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/-31", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-14", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-30", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-15", "isController": false}, {"data": [[0.0, 2.0], [200.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-10", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-11", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-28", "isController": false}, {"data": [[0.0, 3.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-27", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-26", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-25", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-24", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-23", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-22", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-21", "isController": false}, {"data": [[0.0, 3.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-29", "isController": false}, {"data": [[0.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-19", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-18", "isController": false}, {"data": [[0.0, 3.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-26", "isController": false}, {"data": [[0.0, 3.0], [1100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-25", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-28", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/-27", "isController": false}, {"data": [[700.0, 1.0], [200.0, 1.0], [100.0, 1.0], [400.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-22", "isController": false}, {"data": [[300.0, 2.0], [400.0, 1.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-21", "isController": false}, {"data": [[2200.0, 1.0], [2300.0, 1.0], [2600.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/personal-care", "isController": false}, {"data": [[0.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "https://chaldal.com/-24", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-23", "isController": false}, {"data": [[0.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-23", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-8", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-39", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-24", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-7", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-38", "isController": false}, {"data": [[0.0, 1.0], [100.0, 2.0], [1000.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/-20", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-25", "isController": false}, {"data": [[0.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-26", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0], [200.0, 3.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-9", "isController": false}, {"data": [[0.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-4", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-20", "isController": false}, {"data": [[0.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-3", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-21", "isController": false}, {"data": [[0.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-6", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-22", "isController": false}, {"data": [[0.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-5", "isController": false}, {"data": [[1100.0, 1.0], [800.0, 1.0], [1600.0, 1.0], [1700.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-0", "isController": false}, {"data": [[0.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-2", "isController": false}, {"data": [[300.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-1", "isController": false}, {"data": [[1200.0, 1.0], [600.0, 1.0], [200.0, 1.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-19", "isController": false}, {"data": [[0.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-18", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-40", "isController": false}, {"data": [[0.0, 2.0], [300.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-29", "isController": false}, {"data": [[0.0, 3.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-15", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-42", "isController": false}, {"data": [[0.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-14", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-41", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/-17", "isController": false}, {"data": [[2400.0, 1.0], [2500.0, 1.0], [1400.0, 1.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials", "isController": false}, {"data": [[0.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-16", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-43", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/-11", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-16", "isController": false}, {"data": [[0.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "https://chaldal.com/-10", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-17", "isController": false}, {"data": [[0.0, 3.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-13", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-18", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/-12", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-19", "isController": false}, {"data": [[200.0, 1.0], [400.0, 2.0], [100.0, 2.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-30", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-31", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-27", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-28", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-29", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 10600.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 23.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 733.0, "series": [{"data": [[0.0, 733.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 48.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 23.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 2.2905198776758424, "minX": 1.68544998E12, "maxY": 3.6182572614107866, "series": [{"data": [[1.68544998E12, 3.6182572614107866], [1.68545004E12, 2.2905198776758424]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68545004E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 52.0, "minX": 1.0, "maxY": 10602.0, "series": [{"data": [[4.0, 58.0], [2.0, 63.0], [1.0, 74.0], [5.0, 57.0], [3.0, 60.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-17", "isController": false}, {"data": [[3.0, 62.4]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-17-Aggregated", "isController": false}, {"data": [[4.0, 62.0], [2.0, 55.0], [1.0, 55.0], [5.0, 56.0], [3.0, 66.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-16", "isController": false}, {"data": [[3.0, 58.8]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-16-Aggregated", "isController": false}, {"data": [[4.0, 60.0], [2.0, 58.0], [1.0, 69.0], [5.0, 58.0], [3.0, 60.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-19", "isController": false}, {"data": [[3.0, 61.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-19-Aggregated", "isController": false}, {"data": [[4.0, 63.0], [2.0, 56.0], [1.0, 64.0], [5.0, 61.0], [3.0, 58.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-18", "isController": false}, {"data": [[3.0, 60.4]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-18-Aggregated", "isController": false}, {"data": [[2.0, 475.0], [5.0, 212.0], [3.0, 321.3333333333333]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-9", "isController": false}, {"data": [[3.2, 330.2]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-9-Aggregated", "isController": false}, {"data": [[4.0, 54.0], [2.0, 62.0], [1.0, 56.0], [5.0, 56.0], [3.0, 58.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-20", "isController": false}, {"data": [[3.0, 57.2]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-20-Aggregated", "isController": false}, {"data": [[4.0, 70.0], [2.0, 69.0], [1.0, 66.0], [5.0, 63.0], [3.0, 85.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-22", "isController": false}, {"data": [[3.0, 70.6]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-22-Aggregated", "isController": false}, {"data": [[4.0, 56.0], [2.0, 62.0], [1.0, 56.0], [5.0, 61.0], [3.0, 61.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-21", "isController": false}, {"data": [[3.0, 59.2]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-21-Aggregated", "isController": false}, {"data": [[4.0, 70.0], [2.0, 60.0], [1.0, 68.0], [5.0, 62.0], [3.0, 66.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-24", "isController": false}, {"data": [[3.0, 65.2]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-24-Aggregated", "isController": false}, {"data": [[4.0, 69.0], [2.0, 64.0], [1.0, 80.0], [5.0, 66.0], [3.0, 83.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-23", "isController": false}, {"data": [[3.0, 72.4]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-23-Aggregated", "isController": false}, {"data": [[4.0, 69.0], [2.0, 539.0], [1.0, 74.0], [5.0, 68.0], [3.0, 88.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-26", "isController": false}, {"data": [[3.0, 167.6]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-26-Aggregated", "isController": false}, {"data": [[4.0, 69.0], [2.0, 63.0], [1.0, 73.0], [5.0, 70.0], [3.0, 126.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-25", "isController": false}, {"data": [[3.0, 80.2]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-25-Aggregated", "isController": false}, {"data": [[4.0, 63.0], [2.0, 71.0], [1.0, 74.0], [5.0, 64.0], [3.0, 69.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-28", "isController": false}, {"data": [[3.0, 68.2]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-28-Aggregated", "isController": false}, {"data": [[2.0, 882.0], [5.0, 966.0], [3.0, 869.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-0", "isController": false}, {"data": [[3.2, 891.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-0-Aggregated", "isController": false}, {"data": [[4.0, 67.0], [2.0, 121.0], [1.0, 70.0], [5.0, 368.0], [3.0, 71.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-27", "isController": false}, {"data": [[3.0, 139.4]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-27-Aggregated", "isController": false}, {"data": [[4.0, 62.0], [2.0, 64.0], [1.0, 84.0], [5.0, 59.0], [3.0, 61.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-29", "isController": false}, {"data": [[3.0, 66.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-29-Aggregated", "isController": false}, {"data": [[2.0, 219.0], [5.0, 181.0], [3.0, 213.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-7", "isController": false}, {"data": [[3.2, 207.8]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-7-Aggregated", "isController": false}, {"data": [[2.0, 215.0], [5.0, 181.0], [3.0, 208.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-8", "isController": false}, {"data": [[3.2, 204.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-8-Aggregated", "isController": false}, {"data": [[2.0, 63.0], [5.0, 66.0], [3.0, 65.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-5", "isController": false}, {"data": [[3.2, 64.8]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-5-Aggregated", "isController": false}, {"data": [[2.0, 65.0], [5.0, 57.0], [3.0, 62.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-6", "isController": false}, {"data": [[3.2, 61.6]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-6-Aggregated", "isController": false}, {"data": [[2.0, 65.0], [5.0, 54.0], [3.0, 69.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-3", "isController": false}, {"data": [[3.2, 65.2]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-3-Aggregated", "isController": false}, {"data": [[2.0, 69.0], [5.0, 57.0], [3.0, 66.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-4", "isController": false}, {"data": [[3.2, 64.8]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-4-Aggregated", "isController": false}, {"data": [[2.0, 324.0], [5.0, 133.0], [3.0, 287.6666666666667]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-1", "isController": false}, {"data": [[3.2, 264.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-1-Aggregated", "isController": false}, {"data": [[2.0, 68.0], [5.0, 56.0], [3.0, 148.66666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-2", "isController": false}, {"data": [[3.2, 114.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-2-Aggregated", "isController": false}, {"data": [[4.0, 164.0], [2.0, 69.0], [1.0, 83.0], [5.0, 65.0], [3.0, 66.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-31", "isController": false}, {"data": [[3.0, 89.4]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-31-Aggregated", "isController": false}, {"data": [[4.0, 77.0], [2.0, 68.0], [1.0, 95.0], [5.0, 68.0], [3.0, 67.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-30", "isController": false}, {"data": [[3.0, 75.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-30-Aggregated", "isController": false}, {"data": [[4.0, 215.0], [2.0, 72.0], [1.0, 80.0], [5.0, 68.0], [3.0, 74.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-33", "isController": false}, {"data": [[3.0, 101.8]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-33-Aggregated", "isController": false}, {"data": [[4.0, 69.0], [2.0, 117.0], [1.0, 256.0], [5.0, 66.0], [3.0, 66.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-32", "isController": false}, {"data": [[3.0, 114.8]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-32-Aggregated", "isController": false}, {"data": [[4.0, 82.0], [2.0, 69.0], [1.0, 80.0], [5.0, 70.0], [3.0, 71.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-35", "isController": false}, {"data": [[3.0, 74.4]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-35-Aggregated", "isController": false}, {"data": [[4.0, 63.0], [2.0, 124.0], [1.0, 76.0], [5.0, 65.0], [3.0, 68.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-34", "isController": false}, {"data": [[3.0, 79.2]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-34-Aggregated", "isController": false}, {"data": [[4.0, 73.0], [2.0, 67.0], [1.0, 134.0], [5.0, 72.0], [3.0, 71.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-37", "isController": false}, {"data": [[3.0, 83.4]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-37-Aggregated", "isController": false}, {"data": [[4.0, 80.0], [2.0, 71.0], [1.0, 85.0], [5.0, 71.0], [3.0, 71.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-36", "isController": false}, {"data": [[3.0, 75.6]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-36-Aggregated", "isController": false}, {"data": [[1.0, 330.0], [2.0, 282.0], [4.0, 296.0], [5.0, 291.0], [3.0, 330.0]], "isOverall": false, "label": "https://chaldal.com/-50", "isController": false}, {"data": [[3.0, 305.8]], "isOverall": false, "label": "https://chaldal.com/-50-Aggregated", "isController": false}, {"data": [[4.0, 64.0], [2.0, 224.0], [5.0, 62.0], [3.0, 69.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-6", "isController": false}, {"data": [[3.2, 128.6]], "isOverall": false, "label": "https://chaldal.com/personal-care-6-Aggregated", "isController": false}, {"data": [[4.0, 78.0], [2.0, 222.0], [5.0, 68.0], [3.0, 70.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-5", "isController": false}, {"data": [[3.2, 132.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-5-Aggregated", "isController": false}, {"data": [[4.0, 65.0], [2.0, 255.0], [5.0, 69.0], [3.0, 70.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-4", "isController": false}, {"data": [[3.2, 142.8]], "isOverall": false, "label": "https://chaldal.com/personal-care-4-Aggregated", "isController": false}, {"data": [[4.0, 60.0], [2.0, 224.0], [5.0, 62.0], [3.0, 70.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-3", "isController": false}, {"data": [[3.2, 128.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-3-Aggregated", "isController": false}, {"data": [[4.0, 207.0], [2.0, 238.5], [5.0, 302.0], [3.0, 61.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-9", "isController": false}, {"data": [[3.2, 209.4]], "isOverall": false, "label": "https://chaldal.com/personal-care-9-Aggregated", "isController": false}, {"data": [[4.0, 198.0], [2.0, 277.5], [5.0, 283.0], [3.0, 70.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-8", "isController": false}, {"data": [[3.2, 221.2]], "isOverall": false, "label": "https://chaldal.com/personal-care-8-Aggregated", "isController": false}, {"data": [[4.0, 205.0], [2.0, 301.0], [5.0, 642.0], [3.0, 72.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-7", "isController": false}, {"data": [[3.2, 304.2]], "isOverall": false, "label": "https://chaldal.com/personal-care-7-Aggregated", "isController": false}, {"data": [[1.0, 52.0], [2.0, 183.0], [4.0, 1213.0], [5.0, 206.0], [3.0, 52.0]], "isOverall": false, "label": "https://chaldal.com/-48", "isController": false}, {"data": [[3.0, 341.2]], "isOverall": false, "label": "https://chaldal.com/-48-Aggregated", "isController": false}, {"data": [[1.0, 58.0], [2.0, 60.0], [4.0, 60.0], [5.0, 56.0], [3.0, 59.0]], "isOverall": false, "label": "https://chaldal.com/-47", "isController": false}, {"data": [[3.0, 58.6]], "isOverall": false, "label": "https://chaldal.com/-47-Aggregated", "isController": false}, {"data": [[4.0, 62.0], [2.0, 59.0], [1.0, 246.0], [5.0, 61.0], [3.0, 208.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-11", "isController": false}, {"data": [[3.0, 127.2]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-11-Aggregated", "isController": false}, {"data": [[1.0, 471.0], [2.0, 390.0], [4.0, 409.0], [5.0, 359.0], [3.0, 409.0]], "isOverall": false, "label": "https://chaldal.com/-49", "isController": false}, {"data": [[3.0, 407.6]], "isOverall": false, "label": "https://chaldal.com/-49-Aggregated", "isController": false}, {"data": [[4.0, 65.0], [2.0, 227.0], [1.0, 245.0], [5.0, 203.0], [3.0, 202.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-10", "isController": false}, {"data": [[3.0, 188.4]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-10-Aggregated", "isController": false}, {"data": [[1.0, 61.0], [2.0, 123.0], [4.0, 58.0], [5.0, 62.0], [3.0, 58.0]], "isOverall": false, "label": "https://chaldal.com/-44", "isController": false}, {"data": [[3.0, 72.4]], "isOverall": false, "label": "https://chaldal.com/-44-Aggregated", "isController": false}, {"data": [[4.0, 68.0], [2.0, 223.5], [5.0, 61.0], [3.0, 71.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-2", "isController": false}, {"data": [[3.2, 129.4]], "isOverall": false, "label": "https://chaldal.com/personal-care-2-Aggregated", "isController": false}, {"data": [[4.0, 57.0], [2.0, 63.0], [1.0, 61.0], [5.0, 183.0], [3.0, 57.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-13", "isController": false}, {"data": [[3.0, 84.2]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-13-Aggregated", "isController": false}, {"data": [[1.0, 71.0], [2.0, 60.0], [4.0, 57.0], [5.0, 200.0], [3.0, 61.0]], "isOverall": false, "label": "https://chaldal.com/-43", "isController": false}, {"data": [[3.0, 89.8]], "isOverall": false, "label": "https://chaldal.com/-43-Aggregated", "isController": false}, {"data": [[4.0, 141.0], [2.0, 155.0], [5.0, 396.0], [3.0, 316.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-1", "isController": false}, {"data": [[3.2, 232.6]], "isOverall": false, "label": "https://chaldal.com/personal-care-1-Aggregated", "isController": false}, {"data": [[4.0, 57.0], [2.0, 83.0], [1.0, 316.0], [5.0, 56.0], [3.0, 58.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-12", "isController": false}, {"data": [[3.0, 114.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-12-Aggregated", "isController": false}, {"data": [[1.0, 58.0], [2.0, 61.0], [4.0, 62.0], [5.0, 61.0], [3.0, 73.0]], "isOverall": false, "label": "https://chaldal.com/-46", "isController": false}, {"data": [[3.0, 63.0]], "isOverall": false, "label": "https://chaldal.com/-46-Aggregated", "isController": false}, {"data": [[4.0, 1369.0], [2.0, 1214.0], [5.0, 1095.0], [3.0, 1849.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-0", "isController": false}, {"data": [[3.2, 1348.2]], "isOverall": false, "label": "https://chaldal.com/personal-care-0-Aggregated", "isController": false}, {"data": [[4.0, 58.0], [2.0, 68.0], [1.0, 58.0], [5.0, 54.0], [3.0, 66.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-15", "isController": false}, {"data": [[3.0, 60.8]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-15-Aggregated", "isController": false}, {"data": [[1.0, 58.0], [2.0, 60.0], [4.0, 64.0], [5.0, 59.0], [3.0, 59.0]], "isOverall": false, "label": "https://chaldal.com/-45", "isController": false}, {"data": [[3.0, 60.0]], "isOverall": false, "label": "https://chaldal.com/-45-Aggregated", "isController": false}, {"data": [[4.0, 60.0], [2.0, 80.0], [1.0, 57.0], [5.0, 58.0], [3.0, 213.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-14", "isController": false}, {"data": [[3.0, 93.6]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-14-Aggregated", "isController": false}, {"data": [[1.0, 56.0], [2.0, 62.0], [4.0, 81.0], [5.0, 60.0], [3.0, 61.0]], "isOverall": false, "label": "https://chaldal.com/-40", "isController": false}, {"data": [[3.0, 64.0]], "isOverall": false, "label": "https://chaldal.com/-40-Aggregated", "isController": false}, {"data": [[1.0, 57.0], [2.0, 58.0], [4.0, 58.0], [5.0, 65.0], [3.0, 61.0]], "isOverall": false, "label": "https://chaldal.com/-42", "isController": false}, {"data": [[3.0, 59.8]], "isOverall": false, "label": "https://chaldal.com/-42-Aggregated", "isController": false}, {"data": [[1.0, 64.0], [2.0, 64.0], [4.0, 66.0], [5.0, 57.0], [3.0, 63.0]], "isOverall": false, "label": "https://chaldal.com/-41", "isController": false}, {"data": [[3.0, 62.8]], "isOverall": false, "label": "https://chaldal.com/-41-Aggregated", "isController": false}, {"data": [[1.0, 185.0], [2.0, 187.0], [4.0, 187.0], [5.0, 210.0], [3.0, 178.0]], "isOverall": false, "label": "https://chaldal.com/-9", "isController": false}, {"data": [[3.0, 189.4]], "isOverall": false, "label": "https://chaldal.com/-9-Aggregated", "isController": false}, {"data": [[1.0, 301.0], [2.0, 220.0], [4.0, 223.0], [5.0, 224.0], [3.0, 242.0]], "isOverall": false, "label": "https://chaldal.com/-5", "isController": false}, {"data": [[3.0, 242.0]], "isOverall": false, "label": "https://chaldal.com/-5-Aggregated", "isController": false}, {"data": [[2.0, 3199.0], [4.0, 4122.0], [5.0, 3040.0], [3.0, 3721.0]], "isOverall": false, "label": "https://chaldal.com/", "isController": false}, {"data": [[3.5, 3520.5]], "isOverall": false, "label": "https://chaldal.com/-Aggregated", "isController": false}, {"data": [[2.0, 59.0], [5.0, 56.0], [3.0, 60.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-17", "isController": false}, {"data": [[3.2, 59.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-17-Aggregated", "isController": false}, {"data": [[1.0, 253.0], [2.0, 227.0], [4.0, 218.0], [5.0, 230.0], [3.0, 280.0]], "isOverall": false, "label": "https://chaldal.com/-6", "isController": false}, {"data": [[3.0, 241.6]], "isOverall": false, "label": "https://chaldal.com/-6-Aggregated", "isController": false}, {"data": [[2.0, 60.0], [5.0, 56.0], [3.0, 61.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-16", "isController": false}, {"data": [[3.2, 59.8]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-16-Aggregated", "isController": false}, {"data": [[1.0, 1212.0], [2.0, 191.0], [4.0, 197.0], [5.0, 203.0], [3.0, 179.0]], "isOverall": false, "label": "https://chaldal.com/-7", "isController": false}, {"data": [[3.0, 396.4]], "isOverall": false, "label": "https://chaldal.com/-7-Aggregated", "isController": false}, {"data": [[2.0, 62.0], [5.0, 55.0], [3.0, 65.66666666666667]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-15", "isController": false}, {"data": [[3.2, 62.8]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-15-Aggregated", "isController": false}, {"data": [[1.0, 185.0], [2.0, 176.0], [4.0, 203.0], [5.0, 201.0], [3.0, 196.0]], "isOverall": false, "label": "https://chaldal.com/-8", "isController": false}, {"data": [[3.0, 192.2]], "isOverall": false, "label": "https://chaldal.com/-8-Aggregated", "isController": false}, {"data": [[2.0, 60.0], [5.0, 55.0], [3.0, 59.666666666666664]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-14", "isController": false}, {"data": [[3.2, 58.8]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-14-Aggregated", "isController": false}, {"data": [[1.0, 418.0], [2.0, 153.0], [4.0, 1530.0], [5.0, 289.0], [3.0, 198.0]], "isOverall": false, "label": "https://chaldal.com/-1", "isController": false}, {"data": [[3.0, 517.6]], "isOverall": false, "label": "https://chaldal.com/-1-Aggregated", "isController": false}, {"data": [[2.0, 201.0], [5.0, 55.0], [3.0, 103.33333333333333]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-13", "isController": false}, {"data": [[3.2, 113.2]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-13-Aggregated", "isController": false}, {"data": [[1.0, 1496.0], [2.0, 1541.0], [4.0, 1461.0], [5.0, 1422.0], [3.0, 1412.0]], "isOverall": false, "label": "https://chaldal.com/-2", "isController": false}, {"data": [[3.0, 1466.4]], "isOverall": false, "label": "https://chaldal.com/-2-Aggregated", "isController": false}, {"data": [[2.0, 62.0], [5.0, 181.0], [3.0, 106.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-12", "isController": false}, {"data": [[3.2, 112.2]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-12-Aggregated", "isController": false}, {"data": [[1.0, 1242.0], [2.0, 1449.0], [4.0, 1311.0], [5.0, 1730.0], [3.0, 1330.0]], "isOverall": false, "label": "https://chaldal.com/-3", "isController": false}, {"data": [[3.0, 1412.4]], "isOverall": false, "label": "https://chaldal.com/-3-Aggregated", "isController": false}, {"data": [[2.0, 212.0], [5.0, 190.0], [3.0, 163.66666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-11", "isController": false}, {"data": [[3.2, 178.6]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-11-Aggregated", "isController": false}, {"data": [[1.0, 238.0], [2.0, 219.0], [4.0, 235.0], [5.0, 225.0], [3.0, 236.0]], "isOverall": false, "label": "https://chaldal.com/-4", "isController": false}, {"data": [[3.0, 230.6]], "isOverall": false, "label": "https://chaldal.com/-4-Aggregated", "isController": false}, {"data": [[2.0, 214.0], [5.0, 193.0], [3.0, 201.33333333333334]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-10", "isController": false}, {"data": [[3.2, 202.2]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-10-Aggregated", "isController": false}, {"data": [[1.0, 1421.0], [2.0, 994.0], [4.0, 1064.0], [5.0, 834.0], [3.0, 1466.0]], "isOverall": false, "label": "https://chaldal.com/-0", "isController": false}, {"data": [[3.0, 1155.8]], "isOverall": false, "label": "https://chaldal.com/-0-Aggregated", "isController": false}, {"data": [[4.0, 8481.0], [2.0, 10144.0], [1.0, 9285.0], [5.0, 9219.0], [3.0, 10602.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[3.0, 9546.2]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[1.0, 60.0], [2.0, 65.0], [4.0, 64.0], [5.0, 54.0], [3.0, 61.0]], "isOverall": false, "label": "https://chaldal.com/-37", "isController": false}, {"data": [[3.0, 60.8]], "isOverall": false, "label": "https://chaldal.com/-37-Aggregated", "isController": false}, {"data": [[1.0, 56.0], [2.0, 81.0], [4.0, 61.0], [5.0, 58.0], [3.0, 59.0]], "isOverall": false, "label": "https://chaldal.com/-36", "isController": false}, {"data": [[3.0, 63.0]], "isOverall": false, "label": "https://chaldal.com/-36-Aggregated", "isController": false}, {"data": [[1.0, 58.0], [2.0, 57.0], [4.0, 81.0], [5.0, 57.0], [3.0, 64.0]], "isOverall": false, "label": "https://chaldal.com/-39", "isController": false}, {"data": [[3.0, 63.4]], "isOverall": false, "label": "https://chaldal.com/-39-Aggregated", "isController": false}, {"data": [[1.0, 61.0], [2.0, 55.0], [4.0, 83.0], [5.0, 57.0], [3.0, 59.0]], "isOverall": false, "label": "https://chaldal.com/-38", "isController": false}, {"data": [[3.0, 63.0]], "isOverall": false, "label": "https://chaldal.com/-38-Aggregated", "isController": false}, {"data": [[1.0, 185.0], [2.0, 56.0], [4.0, 72.0], [5.0, 58.0], [3.0, 224.0]], "isOverall": false, "label": "https://chaldal.com/-33", "isController": false}, {"data": [[3.0, 119.0]], "isOverall": false, "label": "https://chaldal.com/-33-Aggregated", "isController": false}, {"data": [[1.0, 70.0], [2.0, 184.0], [4.0, 103.0], [5.0, 73.0], [3.0, 77.0]], "isOverall": false, "label": "https://chaldal.com/-32", "isController": false}, {"data": [[3.0, 101.4]], "isOverall": false, "label": "https://chaldal.com/-32-Aggregated", "isController": false}, {"data": [[1.0, 63.0], [2.0, 56.0], [4.0, 60.0], [5.0, 55.0], [3.0, 56.0]], "isOverall": false, "label": "https://chaldal.com/-35", "isController": false}, {"data": [[3.0, 58.0]], "isOverall": false, "label": "https://chaldal.com/-35-Aggregated", "isController": false}, {"data": [[2.0, 1616.0], [5.0, 1556.0], [3.0, 1640.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle", "isController": false}, {"data": [[3.2, 1618.4]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-Aggregated", "isController": false}, {"data": [[1.0, 60.0], [2.0, 63.0], [4.0, 89.0], [5.0, 56.0], [3.0, 61.0]], "isOverall": false, "label": "https://chaldal.com/-34", "isController": false}, {"data": [[3.0, 65.8]], "isOverall": false, "label": "https://chaldal.com/-34-Aggregated", "isController": false}, {"data": [[2.0, 59.0], [5.0, 58.0], [3.0, 59.333333333333336]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-20", "isController": false}, {"data": [[3.2, 59.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-20-Aggregated", "isController": false}, {"data": [[4.0, 195.0], [2.0, 369.0], [5.0, 254.0], [3.0, 60.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-12", "isController": false}, {"data": [[3.2, 249.4]], "isOverall": false, "label": "https://chaldal.com/personal-care-12-Aggregated", "isController": false}, {"data": [[4.0, 72.0], [2.0, 155.5], [5.0, 57.0], [3.0, 200.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-13", "isController": false}, {"data": [[3.2, 128.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-13-Aggregated", "isController": false}, {"data": [[1.0, 190.0], [2.0, 198.0], [4.0, 64.0], [5.0, 67.0], [3.0, 354.0]], "isOverall": false, "label": "https://chaldal.com/-31", "isController": false}, {"data": [[3.0, 174.6]], "isOverall": false, "label": "https://chaldal.com/-31-Aggregated", "isController": false}, {"data": [[4.0, 57.0], [2.0, 63.0], [5.0, 56.0], [3.0, 56.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-14", "isController": false}, {"data": [[3.2, 59.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-14-Aggregated", "isController": false}, {"data": [[1.0, 186.0], [2.0, 71.0], [4.0, 66.0], [5.0, 62.0], [3.0, 59.0]], "isOverall": false, "label": "https://chaldal.com/-30", "isController": false}, {"data": [[3.0, 88.8]], "isOverall": false, "label": "https://chaldal.com/-30-Aggregated", "isController": false}, {"data": [[4.0, 69.0], [2.0, 75.0], [5.0, 129.0], [3.0, 60.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-15", "isController": false}, {"data": [[3.2, 81.6]], "isOverall": false, "label": "https://chaldal.com/personal-care-15-Aggregated", "isController": false}, {"data": [[4.0, 201.0], [2.0, 289.0], [5.0, 295.0], [3.0, 75.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-10", "isController": false}, {"data": [[3.2, 229.8]], "isOverall": false, "label": "https://chaldal.com/personal-care-10-Aggregated", "isController": false}, {"data": [[4.0, 195.0], [2.0, 248.5], [5.0, 74.0], [3.0, 60.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-11", "isController": false}, {"data": [[3.2, 165.2]], "isOverall": false, "label": "https://chaldal.com/personal-care-11-Aggregated", "isController": false}, {"data": [[2.0, 173.0], [5.0, 182.0], [3.0, 160.33333333333331]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-28", "isController": false}, {"data": [[3.2, 167.2]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-28-Aggregated", "isController": false}, {"data": [[2.0, 63.0], [5.0, 66.0], [3.0, 138.33333333333334]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-27", "isController": false}, {"data": [[3.2, 108.8]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-27-Aggregated", "isController": false}, {"data": [[2.0, 81.0], [5.0, 83.0], [3.0, 77.66666666666667]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-26", "isController": false}, {"data": [[3.2, 79.4]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-26-Aggregated", "isController": false}, {"data": [[2.0, 70.0], [5.0, 86.0], [3.0, 71.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-25", "isController": false}, {"data": [[3.2, 73.8]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-25-Aggregated", "isController": false}, {"data": [[2.0, 62.0], [5.0, 64.0], [3.0, 71.33333333333333]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-24", "isController": false}, {"data": [[3.2, 68.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-24-Aggregated", "isController": false}, {"data": [[2.0, 67.0], [5.0, 61.0], [3.0, 62.666666666666664]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-23", "isController": false}, {"data": [[3.2, 63.2]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-23-Aggregated", "isController": false}, {"data": [[2.0, 74.0], [5.0, 79.0], [3.0, 78.66666666666667]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-22", "isController": false}, {"data": [[3.2, 77.8]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-22-Aggregated", "isController": false}, {"data": [[2.0, 58.0], [5.0, 56.0], [3.0, 63.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-21", "isController": false}, {"data": [[3.2, 60.6]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-21-Aggregated", "isController": false}, {"data": [[1.0, 59.0], [2.0, 199.0], [4.0, 232.0], [5.0, 60.0], [3.0, 76.0]], "isOverall": false, "label": "https://chaldal.com/-29", "isController": false}, {"data": [[3.0, 125.2]], "isOverall": false, "label": "https://chaldal.com/-29-Aggregated", "isController": false}, {"data": [[2.0, 60.0], [5.0, 62.0], [3.0, 106.33333333333333]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-19", "isController": false}, {"data": [[3.2, 88.2]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-19-Aggregated", "isController": false}, {"data": [[2.0, 58.0], [5.0, 63.0], [3.0, 57.666666666666664]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-18", "isController": false}, {"data": [[3.2, 58.8]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-18-Aggregated", "isController": false}, {"data": [[1.0, 59.0], [2.0, 79.0], [4.0, 220.0], [5.0, 538.0], [3.0, 72.0]], "isOverall": false, "label": "https://chaldal.com/-26", "isController": false}, {"data": [[3.0, 193.6]], "isOverall": false, "label": "https://chaldal.com/-26-Aggregated", "isController": false}, {"data": [[1.0, 67.0], [2.0, 91.0], [4.0, 57.0], [5.0, 1164.0], [3.0, 207.0]], "isOverall": false, "label": "https://chaldal.com/-25", "isController": false}, {"data": [[3.0, 317.2]], "isOverall": false, "label": "https://chaldal.com/-25-Aggregated", "isController": false}, {"data": [[1.0, 56.0], [2.0, 92.0], [4.0, 60.0], [5.0, 173.0], [3.0, 57.0]], "isOverall": false, "label": "https://chaldal.com/-28", "isController": false}, {"data": [[3.0, 87.6]], "isOverall": false, "label": "https://chaldal.com/-28-Aggregated", "isController": false}, {"data": [[1.0, 80.0], [2.0, 62.0], [4.0, 56.0], [5.0, 56.0], [3.0, 65.0]], "isOverall": false, "label": "https://chaldal.com/-27", "isController": false}, {"data": [[3.0, 63.8]], "isOverall": false, "label": "https://chaldal.com/-27-Aggregated", "isController": false}, {"data": [[1.0, 269.0], [2.0, 726.0], [4.0, 472.0], [5.0, 1049.0], [3.0, 167.0]], "isOverall": false, "label": "https://chaldal.com/-22", "isController": false}, {"data": [[3.0, 536.6]], "isOverall": false, "label": "https://chaldal.com/-22-Aggregated", "isController": false}, {"data": [[1.0, 419.0], [2.0, 296.0], [4.0, 392.0], [5.0, 103.0], [3.0, 376.0]], "isOverall": false, "label": "https://chaldal.com/-21", "isController": false}, {"data": [[3.0, 317.2]], "isOverall": false, "label": "https://chaldal.com/-21-Aggregated", "isController": false}, {"data": [[4.0, 2271.0], [2.0, 2212.0], [5.0, 2037.0], [3.0, 2667.0]], "isOverall": false, "label": "https://chaldal.com/personal-care", "isController": false}, {"data": [[3.2, 2279.8]], "isOverall": false, "label": "https://chaldal.com/personal-care-Aggregated", "isController": false}, {"data": [[1.0, 242.0], [2.0, 243.0], [4.0, 215.0], [5.0, 254.0], [3.0, 68.0]], "isOverall": false, "label": "https://chaldal.com/-24", "isController": false}, {"data": [[3.0, 204.4]], "isOverall": false, "label": "https://chaldal.com/-24-Aggregated", "isController": false}, {"data": [[1.0, 137.0], [2.0, 339.0], [4.0, 241.0], [5.0, 737.0], [3.0, 170.0]], "isOverall": false, "label": "https://chaldal.com/-23", "isController": false}, {"data": [[3.0, 324.8]], "isOverall": false, "label": "https://chaldal.com/-23-Aggregated", "isController": false}, {"data": [[4.0, 78.0], [2.0, 131.0], [5.0, 59.0], [3.0, 68.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-23", "isController": false}, {"data": [[3.2, 93.4]], "isOverall": false, "label": "https://chaldal.com/personal-care-23-Aggregated", "isController": false}, {"data": [[4.0, 57.0], [2.0, 221.0], [1.0, 255.0], [5.0, 194.0], [3.0, 58.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-8", "isController": false}, {"data": [[3.0, 157.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-8-Aggregated", "isController": false}, {"data": [[4.0, 61.0], [2.0, 62.0], [1.0, 59.0], [5.0, 56.0], [3.0, 57.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-39", "isController": false}, {"data": [[3.0, 59.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-39-Aggregated", "isController": false}, {"data": [[4.0, 368.0], [2.0, 106.0], [5.0, 123.0], [3.0, 69.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-24", "isController": false}, {"data": [[3.2, 154.4]], "isOverall": false, "label": "https://chaldal.com/personal-care-24-Aggregated", "isController": false}, {"data": [[4.0, 65.0], [2.0, 61.0], [1.0, 70.0], [5.0, 193.0], [3.0, 58.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-7", "isController": false}, {"data": [[3.0, 89.4]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-7-Aggregated", "isController": false}, {"data": [[4.0, 65.0], [2.0, 129.0], [1.0, 76.0], [5.0, 61.0], [3.0, 69.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-38", "isController": false}, {"data": [[3.0, 80.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-38-Aggregated", "isController": false}, {"data": [[1.0, 72.0], [2.0, 1095.0], [4.0, 1057.0], [5.0, 105.0], [3.0, 193.0]], "isOverall": false, "label": "https://chaldal.com/-20", "isController": false}, {"data": [[3.0, 504.4]], "isOverall": false, "label": "https://chaldal.com/-20-Aggregated", "isController": false}, {"data": [[4.0, 71.0], [2.0, 88.0], [5.0, 71.0], [3.0, 63.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-25", "isController": false}, {"data": [[3.2, 76.2]], "isOverall": false, "label": "https://chaldal.com/personal-care-25-Aggregated", "isController": false}, {"data": [[4.0, 67.0], [2.0, 145.5], [5.0, 72.0], [3.0, 67.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-26", "isController": false}, {"data": [[3.2, 99.4]], "isOverall": false, "label": "https://chaldal.com/personal-care-26-Aggregated", "isController": false}, {"data": [[4.0, 64.0], [2.0, 208.0], [1.0, 247.0], [5.0, 196.0], [3.0, 204.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-9", "isController": false}, {"data": [[3.0, 183.8]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-9-Aggregated", "isController": false}, {"data": [[4.0, 55.0], [2.0, 63.0], [1.0, 75.0], [5.0, 62.0], [3.0, 230.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-4", "isController": false}, {"data": [[3.0, 97.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-4-Aggregated", "isController": false}, {"data": [[4.0, 59.0], [2.0, 61.5], [5.0, 55.0], [3.0, 59.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-20", "isController": false}, {"data": [[3.2, 59.2]], "isOverall": false, "label": "https://chaldal.com/personal-care-20-Aggregated", "isController": false}, {"data": [[4.0, 56.0], [2.0, 63.0], [1.0, 73.0], [5.0, 60.0], [3.0, 220.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-3", "isController": false}, {"data": [[3.0, 94.4]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-3-Aggregated", "isController": false}, {"data": [[4.0, 55.0], [2.0, 63.0], [5.0, 57.0], [3.0, 55.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-21", "isController": false}, {"data": [[3.2, 58.6]], "isOverall": false, "label": "https://chaldal.com/personal-care-21-Aggregated", "isController": false}, {"data": [[4.0, 55.0], [2.0, 63.0], [1.0, 84.0], [5.0, 63.0], [3.0, 216.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-6", "isController": false}, {"data": [[3.0, 96.2]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-6-Aggregated", "isController": false}, {"data": [[4.0, 73.0], [2.0, 95.5], [5.0, 73.0], [3.0, 62.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-22", "isController": false}, {"data": [[3.2, 79.8]], "isOverall": false, "label": "https://chaldal.com/personal-care-22-Aggregated", "isController": false}, {"data": [[4.0, 58.0], [2.0, 57.0], [1.0, 73.0], [5.0, 60.0], [3.0, 226.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-5", "isController": false}, {"data": [[3.0, 94.8]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-5-Aggregated", "isController": false}, {"data": [[4.0, 842.0], [2.0, 920.0], [1.0, 1744.0], [5.0, 1176.0], [3.0, 1616.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-0", "isController": false}, {"data": [[3.0, 1259.6]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-0-Aggregated", "isController": false}, {"data": [[4.0, 59.0], [2.0, 61.0], [1.0, 74.0], [5.0, 59.0], [3.0, 218.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-2", "isController": false}, {"data": [[3.0, 94.2]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-2-Aggregated", "isController": false}, {"data": [[4.0, 162.0], [2.0, 383.0], [1.0, 383.0], [5.0, 169.0], [3.0, 326.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-1", "isController": false}, {"data": [[3.0, 284.6]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-1-Aggregated", "isController": false}, {"data": [[1.0, 208.0], [2.0, 1235.0], [4.0, 534.0], [5.0, 117.0], [3.0, 691.0]], "isOverall": false, "label": "https://chaldal.com/-19", "isController": false}, {"data": [[3.0, 557.0]], "isOverall": false, "label": "https://chaldal.com/-19-Aggregated", "isController": false}, {"data": [[1.0, 61.0], [2.0, 62.0], [4.0, 73.0], [5.0, 90.0], [3.0, 548.0]], "isOverall": false, "label": "https://chaldal.com/-18", "isController": false}, {"data": [[3.0, 166.8]], "isOverall": false, "label": "https://chaldal.com/-18-Aggregated", "isController": false}, {"data": [[4.0, 63.0], [2.0, 65.0], [1.0, 61.0], [5.0, 62.0], [3.0, 63.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-40", "isController": false}, {"data": [[3.0, 62.8]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-40-Aggregated", "isController": false}, {"data": [[2.0, 205.0], [5.0, 95.0], [3.0, 239.66666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-29", "isController": false}, {"data": [[3.2, 203.8]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-29-Aggregated", "isController": false}, {"data": [[1.0, 550.0], [2.0, 60.0], [4.0, 85.0], [5.0, 76.0], [3.0, 1070.0]], "isOverall": false, "label": "https://chaldal.com/-15", "isController": false}, {"data": [[3.0, 368.2]], "isOverall": false, "label": "https://chaldal.com/-15-Aggregated", "isController": false}, {"data": [[4.0, 79.0], [2.0, 76.0], [1.0, 83.0], [5.0, 314.0], [3.0, 78.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-42", "isController": false}, {"data": [[3.0, 126.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-42-Aggregated", "isController": false}, {"data": [[1.0, 74.0], [2.0, 63.0], [4.0, 71.0], [5.0, 61.0], [3.0, 545.0]], "isOverall": false, "label": "https://chaldal.com/-14", "isController": false}, {"data": [[3.0, 162.8]], "isOverall": false, "label": "https://chaldal.com/-14-Aggregated", "isController": false}, {"data": [[4.0, 66.0], [2.0, 65.0], [1.0, 70.0], [5.0, 69.0], [3.0, 61.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-41", "isController": false}, {"data": [[3.0, 66.2]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-41-Aggregated", "isController": false}, {"data": [[1.0, 68.0], [2.0, 64.0], [4.0, 70.0], [5.0, 59.0], [3.0, 77.0]], "isOverall": false, "label": "https://chaldal.com/-17", "isController": false}, {"data": [[3.0, 67.6]], "isOverall": false, "label": "https://chaldal.com/-17-Aggregated", "isController": false}, {"data": [[4.0, 1455.0], [2.0, 1903.0], [1.0, 2591.0], [5.0, 2081.0], [3.0, 2463.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials", "isController": false}, {"data": [[3.0, 2098.6]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-Aggregated", "isController": false}, {"data": [[1.0, 584.0], [2.0, 76.0], [4.0, 71.0], [5.0, 58.0], [3.0, 80.0]], "isOverall": false, "label": "https://chaldal.com/-16", "isController": false}, {"data": [[3.0, 173.8]], "isOverall": false, "label": "https://chaldal.com/-16-Aggregated", "isController": false}, {"data": [[4.0, 94.0], [2.0, 323.0], [1.0, 104.0], [5.0, 93.0], [3.0, 94.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-43", "isController": false}, {"data": [[3.0, 141.6]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-43-Aggregated", "isController": false}, {"data": [[1.0, 68.0], [2.0, 62.0], [4.0, 86.0], [5.0, 58.0], [3.0, 62.0]], "isOverall": false, "label": "https://chaldal.com/-11", "isController": false}, {"data": [[3.0, 67.2]], "isOverall": false, "label": "https://chaldal.com/-11-Aggregated", "isController": false}, {"data": [[4.0, 60.0], [2.0, 59.5], [5.0, 171.0], [3.0, 68.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-16", "isController": false}, {"data": [[3.2, 83.6]], "isOverall": false, "label": "https://chaldal.com/personal-care-16-Aggregated", "isController": false}, {"data": [[1.0, 191.0], [2.0, 181.0], [4.0, 79.0], [5.0, 196.0], [3.0, 174.0]], "isOverall": false, "label": "https://chaldal.com/-10", "isController": false}, {"data": [[3.0, 164.2]], "isOverall": false, "label": "https://chaldal.com/-10-Aggregated", "isController": false}, {"data": [[4.0, 63.0], [2.0, 59.0], [5.0, 56.0], [3.0, 66.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-17", "isController": false}, {"data": [[3.2, 60.6]], "isOverall": false, "label": "https://chaldal.com/personal-care-17-Aggregated", "isController": false}, {"data": [[1.0, 73.0], [2.0, 61.0], [4.0, 140.0], [5.0, 56.0], [3.0, 299.0]], "isOverall": false, "label": "https://chaldal.com/-13", "isController": false}, {"data": [[3.0, 125.8]], "isOverall": false, "label": "https://chaldal.com/-13-Aggregated", "isController": false}, {"data": [[4.0, 56.0], [2.0, 61.5], [5.0, 67.0], [3.0, 58.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-18", "isController": false}, {"data": [[3.2, 60.8]], "isOverall": false, "label": "https://chaldal.com/personal-care-18-Aggregated", "isController": false}, {"data": [[1.0, 63.0], [2.0, 62.0], [4.0, 84.0], [5.0, 57.0], [3.0, 89.0]], "isOverall": false, "label": "https://chaldal.com/-12", "isController": false}, {"data": [[3.0, 71.0]], "isOverall": false, "label": "https://chaldal.com/-12-Aggregated", "isController": false}, {"data": [[4.0, 57.0], [2.0, 65.0], [5.0, 56.0], [3.0, 58.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-19", "isController": false}, {"data": [[3.2, 60.2]], "isOverall": false, "label": "https://chaldal.com/personal-care-19-Aggregated", "isController": false}, {"data": [[4.0, 415.0], [2.0, 174.5], [5.0, 280.0], [3.0, 448.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-30", "isController": false}, {"data": [[3.2, 298.4]], "isOverall": false, "label": "https://chaldal.com/personal-care-30-Aggregated", "isController": false}, {"data": [[4.0, 352.0], [2.0, 99.0], [5.0, 286.0], [3.0, 89.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-31", "isController": false}, {"data": [[3.2, 185.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-31-Aggregated", "isController": false}, {"data": [[4.0, 69.0], [2.0, 82.0], [5.0, 67.0], [3.0, 64.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-27", "isController": false}, {"data": [[3.2, 72.8]], "isOverall": false, "label": "https://chaldal.com/personal-care-27-Aggregated", "isController": false}, {"data": [[4.0, 64.0], [2.0, 70.0], [5.0, 61.0], [3.0, 68.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-28", "isController": false}, {"data": [[3.2, 66.6]], "isOverall": false, "label": "https://chaldal.com/personal-care-28-Aggregated", "isController": false}, {"data": [[4.0, 71.0], [2.0, 233.5], [5.0, 63.0], [3.0, 68.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-29", "isController": false}, {"data": [[3.2, 133.8]], "isOverall": false, "label": "https://chaldal.com/personal-care-29-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 5.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 6911.1, "minX": 1.68544998E12, "maxY": 1438139.1, "series": [{"data": [[1.68544998E12, 1438139.1], [1.68545004E12, 578250.9666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.68544998E12, 9425.85], [1.68545004E12, 6911.1]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68545004E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 54.5, "minX": 1.68544998E12, "maxY": 9546.2, "series": [{"data": [[1.68544998E12, 57.5], [1.68545004E12, 65.66666666666667]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-17", "isController": false}, {"data": [[1.68544998E12, 59.0], [1.68545004E12, 58.666666666666664]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-16", "isController": false}, {"data": [[1.68544998E12, 59.0], [1.68545004E12, 62.333333333333336]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-19", "isController": false}, {"data": [[1.68544998E12, 62.0], [1.68545004E12, 59.333333333333336]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-18", "isController": false}, {"data": [[1.68544998E12, 200.5], [1.68545004E12, 416.6666666666667]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-9", "isController": false}, {"data": [[1.68544998E12, 55.0], [1.68545004E12, 58.666666666666664]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-20", "isController": false}, {"data": [[1.68544998E12, 66.5], [1.68545004E12, 73.33333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-22", "isController": false}, {"data": [[1.68544998E12, 58.5], [1.68545004E12, 59.666666666666664]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-21", "isController": false}, {"data": [[1.68544998E12, 66.0], [1.68545004E12, 64.66666666666667]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-24", "isController": false}, {"data": [[1.68544998E12, 67.5], [1.68545004E12, 75.66666666666667]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-23", "isController": false}, {"data": [[1.68544998E12, 68.5], [1.68545004E12, 233.66666666666669]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-26", "isController": false}, {"data": [[1.68544998E12, 69.5], [1.68545004E12, 87.33333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-25", "isController": false}, {"data": [[1.68544998E12, 63.5], [1.68545004E12, 71.33333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-28", "isController": false}, {"data": [[1.68544998E12, 850.5], [1.68545004E12, 918.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-0", "isController": false}, {"data": [[1.68544998E12, 217.5], [1.68545004E12, 87.33333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-27", "isController": false}, {"data": [[1.68544998E12, 60.5], [1.68545004E12, 69.66666666666667]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-29", "isController": false}, {"data": [[1.68544998E12, 188.5], [1.68545004E12, 220.66666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-7", "isController": false}, {"data": [[1.68544998E12, 183.5], [1.68545004E12, 217.66666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-8", "isController": false}, {"data": [[1.68544998E12, 62.5], [1.68545004E12, 66.33333333333333]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-5", "isController": false}, {"data": [[1.68544998E12, 56.0], [1.68545004E12, 65.33333333333333]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-6", "isController": false}, {"data": [[1.68544998E12, 60.5], [1.68545004E12, 68.33333333333333]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-3", "isController": false}, {"data": [[1.68544998E12, 60.0], [1.68545004E12, 68.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-4", "isController": false}, {"data": [[1.68544998E12, 278.0], [1.68545004E12, 254.66666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-1", "isController": false}, {"data": [[1.68544998E12, 184.0], [1.68545004E12, 67.33333333333333]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-2", "isController": false}, {"data": [[1.68544998E12, 114.5], [1.68545004E12, 72.66666666666667]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-31", "isController": false}, {"data": [[1.68544998E12, 72.5], [1.68545004E12, 76.66666666666667]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-30", "isController": false}, {"data": [[1.68544998E12, 141.5], [1.68545004E12, 75.33333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-33", "isController": false}, {"data": [[1.68544998E12, 67.5], [1.68545004E12, 146.33333333333334]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-32", "isController": false}, {"data": [[1.68544998E12, 76.0], [1.68545004E12, 73.33333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-35", "isController": false}, {"data": [[1.68544998E12, 64.0], [1.68545004E12, 89.33333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-34", "isController": false}, {"data": [[1.68544998E12, 72.5], [1.68545004E12, 90.66666666666667]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-37", "isController": false}, {"data": [[1.68544998E12, 75.5], [1.68545004E12, 75.66666666666667]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-36", "isController": false}, {"data": [[1.68544998E12, 305.8]], "isOverall": false, "label": "https://chaldal.com/-50", "isController": false}, {"data": [[1.68544998E12, 63.0], [1.68545004E12, 172.33333333333334]], "isOverall": false, "label": "https://chaldal.com/personal-care-6", "isController": false}, {"data": [[1.68544998E12, 73.0], [1.68545004E12, 171.33333333333334]], "isOverall": false, "label": "https://chaldal.com/personal-care-5", "isController": false}, {"data": [[1.68544998E12, 67.0], [1.68545004E12, 193.33333333333334]], "isOverall": false, "label": "https://chaldal.com/personal-care-4", "isController": false}, {"data": [[1.68544998E12, 61.0], [1.68545004E12, 172.66666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-3", "isController": false}, {"data": [[1.68544998E12, 254.5], [1.68545004E12, 179.33333333333334]], "isOverall": false, "label": "https://chaldal.com/personal-care-9", "isController": false}, {"data": [[1.68544998E12, 240.5], [1.68545004E12, 208.33333333333334]], "isOverall": false, "label": "https://chaldal.com/personal-care-8", "isController": false}, {"data": [[1.68544998E12, 423.5], [1.68545004E12, 224.66666666666669]], "isOverall": false, "label": "https://chaldal.com/personal-care-7", "isController": false}, {"data": [[1.68544998E12, 341.2]], "isOverall": false, "label": "https://chaldal.com/-48", "isController": false}, {"data": [[1.68544998E12, 58.6]], "isOverall": false, "label": "https://chaldal.com/-47", "isController": false}, {"data": [[1.68544998E12, 61.5], [1.68545004E12, 171.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-11", "isController": false}, {"data": [[1.68544998E12, 407.6]], "isOverall": false, "label": "https://chaldal.com/-49", "isController": false}, {"data": [[1.68544998E12, 134.0], [1.68545004E12, 224.66666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-10", "isController": false}, {"data": [[1.68544998E12, 72.4]], "isOverall": false, "label": "https://chaldal.com/-44", "isController": false}, {"data": [[1.68544998E12, 64.5], [1.68545004E12, 172.66666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-2", "isController": false}, {"data": [[1.68544998E12, 120.0], [1.68545004E12, 60.333333333333336]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-13", "isController": false}, {"data": [[1.68544998E12, 89.8]], "isOverall": false, "label": "https://chaldal.com/-43", "isController": false}, {"data": [[1.68544998E12, 268.5], [1.68545004E12, 208.66666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-1", "isController": false}, {"data": [[1.68544998E12, 56.5], [1.68545004E12, 152.33333333333331]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-12", "isController": false}, {"data": [[1.68544998E12, 63.0]], "isOverall": false, "label": "https://chaldal.com/-46", "isController": false}, {"data": [[1.68544998E12, 1232.0], [1.68545004E12, 1425.6666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-0", "isController": false}, {"data": [[1.68544998E12, 56.0], [1.68545004E12, 64.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-15", "isController": false}, {"data": [[1.68544998E12, 60.0]], "isOverall": false, "label": "https://chaldal.com/-45", "isController": false}, {"data": [[1.68544998E12, 59.0], [1.68545004E12, 116.66666666666667]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-14", "isController": false}, {"data": [[1.68544998E12, 64.0]], "isOverall": false, "label": "https://chaldal.com/-40", "isController": false}, {"data": [[1.68544998E12, 59.8]], "isOverall": false, "label": "https://chaldal.com/-42", "isController": false}, {"data": [[1.68544998E12, 62.8]], "isOverall": false, "label": "https://chaldal.com/-41", "isController": false}, {"data": [[1.68544998E12, 189.4]], "isOverall": false, "label": "https://chaldal.com/-9", "isController": false}, {"data": [[1.68544998E12, 242.0]], "isOverall": false, "label": "https://chaldal.com/-5", "isController": false}, {"data": [[1.68544998E12, 3520.5]], "isOverall": false, "label": "https://chaldal.com/", "isController": false}, {"data": [[1.68544998E12, 55.5], [1.68545004E12, 61.333333333333336]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-17", "isController": false}, {"data": [[1.68544998E12, 241.6]], "isOverall": false, "label": "https://chaldal.com/-6", "isController": false}, {"data": [[1.68544998E12, 55.5], [1.68545004E12, 62.666666666666664]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-16", "isController": false}, {"data": [[1.68544998E12, 396.4]], "isOverall": false, "label": "https://chaldal.com/-7", "isController": false}, {"data": [[1.68544998E12, 59.0], [1.68545004E12, 65.33333333333333]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-15", "isController": false}, {"data": [[1.68544998E12, 192.2]], "isOverall": false, "label": "https://chaldal.com/-8", "isController": false}, {"data": [[1.68544998E12, 55.0], [1.68545004E12, 61.333333333333336]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-14", "isController": false}, {"data": [[1.68544998E12, 517.6]], "isOverall": false, "label": "https://chaldal.com/-1", "isController": false}, {"data": [[1.68544998E12, 54.5], [1.68545004E12, 152.33333333333334]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-13", "isController": false}, {"data": [[1.68544998E12, 1466.4]], "isOverall": false, "label": "https://chaldal.com/-2", "isController": false}, {"data": [[1.68544998E12, 118.5], [1.68545004E12, 108.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-12", "isController": false}, {"data": [[1.68544998E12, 1412.4]], "isOverall": false, "label": "https://chaldal.com/-3", "isController": false}, {"data": [[1.68544998E12, 122.5], [1.68545004E12, 216.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-11", "isController": false}, {"data": [[1.68544998E12, 230.6]], "isOverall": false, "label": "https://chaldal.com/-4", "isController": false}, {"data": [[1.68544998E12, 189.5], [1.68545004E12, 210.66666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-10", "isController": false}, {"data": [[1.68544998E12, 1155.8]], "isOverall": false, "label": "https://chaldal.com/-0", "isController": false}, {"data": [[1.68544998E12, 9546.2]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.68544998E12, 60.8]], "isOverall": false, "label": "https://chaldal.com/-37", "isController": false}, {"data": [[1.68544998E12, 63.0]], "isOverall": false, "label": "https://chaldal.com/-36", "isController": false}, {"data": [[1.68544998E12, 63.4]], "isOverall": false, "label": "https://chaldal.com/-39", "isController": false}, {"data": [[1.68544998E12, 63.0]], "isOverall": false, "label": "https://chaldal.com/-38", "isController": false}, {"data": [[1.68544998E12, 119.0]], "isOverall": false, "label": "https://chaldal.com/-33", "isController": false}, {"data": [[1.68544998E12, 101.4]], "isOverall": false, "label": "https://chaldal.com/-32", "isController": false}, {"data": [[1.68544998E12, 58.0]], "isOverall": false, "label": "https://chaldal.com/-35", "isController": false}, {"data": [[1.68544998E12, 1496.0], [1.68545004E12, 1700.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle", "isController": false}, {"data": [[1.68544998E12, 65.8]], "isOverall": false, "label": "https://chaldal.com/-34", "isController": false}, {"data": [[1.68544998E12, 58.0], [1.68545004E12, 59.666666666666664]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-20", "isController": false}, {"data": [[1.68544998E12, 224.5], [1.68545004E12, 266.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-12", "isController": false}, {"data": [[1.68544998E12, 64.5], [1.68545004E12, 170.33333333333334]], "isOverall": false, "label": "https://chaldal.com/personal-care-13", "isController": false}, {"data": [[1.68544998E12, 174.6]], "isOverall": false, "label": "https://chaldal.com/-31", "isController": false}, {"data": [[1.68544998E12, 56.5], [1.68545004E12, 60.666666666666664]], "isOverall": false, "label": "https://chaldal.com/personal-care-14", "isController": false}, {"data": [[1.68544998E12, 88.8]], "isOverall": false, "label": "https://chaldal.com/-30", "isController": false}, {"data": [[1.68544998E12, 99.0], [1.68545004E12, 70.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-15", "isController": false}, {"data": [[1.68544998E12, 248.0], [1.68545004E12, 217.66666666666669]], "isOverall": false, "label": "https://chaldal.com/personal-care-10", "isController": false}, {"data": [[1.68544998E12, 134.5], [1.68545004E12, 185.66666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-11", "isController": false}, {"data": [[1.68544998E12, 131.0], [1.68545004E12, 191.33333333333334]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-28", "isController": false}, {"data": [[1.68544998E12, 150.5], [1.68545004E12, 81.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-27", "isController": false}, {"data": [[1.68544998E12, 75.5], [1.68545004E12, 82.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-26", "isController": false}, {"data": [[1.68544998E12, 76.5], [1.68545004E12, 72.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-25", "isController": false}, {"data": [[1.68544998E12, 63.5], [1.68545004E12, 71.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-24", "isController": false}, {"data": [[1.68544998E12, 64.0], [1.68545004E12, 62.666666666666664]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-23", "isController": false}, {"data": [[1.68544998E12, 84.0], [1.68545004E12, 73.66666666666667]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-22", "isController": false}, {"data": [[1.68544998E12, 57.5], [1.68545004E12, 62.666666666666664]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-21", "isController": false}, {"data": [[1.68544998E12, 125.2]], "isOverall": false, "label": "https://chaldal.com/-29", "isController": false}, {"data": [[1.68544998E12, 134.5], [1.68545004E12, 57.333333333333336]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-19", "isController": false}, {"data": [[1.68544998E12, 60.5], [1.68545004E12, 57.666666666666664]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-18", "isController": false}, {"data": [[1.68544998E12, 193.6]], "isOverall": false, "label": "https://chaldal.com/-26", "isController": false}, {"data": [[1.68544998E12, 317.2]], "isOverall": false, "label": "https://chaldal.com/-25", "isController": false}, {"data": [[1.68544998E12, 87.6]], "isOverall": false, "label": "https://chaldal.com/-28", "isController": false}, {"data": [[1.68544998E12, 63.8]], "isOverall": false, "label": "https://chaldal.com/-27", "isController": false}, {"data": [[1.68544998E12, 536.6]], "isOverall": false, "label": "https://chaldal.com/-22", "isController": false}, {"data": [[1.68544998E12, 317.2]], "isOverall": false, "label": "https://chaldal.com/-21", "isController": false}, {"data": [[1.68544998E12, 2154.0], [1.68545004E12, 2363.6666666666665]], "isOverall": false, "label": "https://chaldal.com/personal-care", "isController": false}, {"data": [[1.68544998E12, 204.4]], "isOverall": false, "label": "https://chaldal.com/-24", "isController": false}, {"data": [[1.68544998E12, 324.8]], "isOverall": false, "label": "https://chaldal.com/-23", "isController": false}, {"data": [[1.68544998E12, 68.5], [1.68545004E12, 110.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-23", "isController": false}, {"data": [[1.68544998E12, 125.5], [1.68545004E12, 178.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-8", "isController": false}, {"data": [[1.68544998E12, 58.5], [1.68545004E12, 59.333333333333336]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-39", "isController": false}, {"data": [[1.68544998E12, 245.5], [1.68545004E12, 93.66666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-24", "isController": false}, {"data": [[1.68544998E12, 129.0], [1.68545004E12, 63.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-7", "isController": false}, {"data": [[1.68544998E12, 63.0], [1.68545004E12, 91.33333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-38", "isController": false}, {"data": [[1.68544998E12, 504.4]], "isOverall": false, "label": "https://chaldal.com/-20", "isController": false}, {"data": [[1.68544998E12, 71.0], [1.68545004E12, 79.66666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-25", "isController": false}, {"data": [[1.68544998E12, 69.5], [1.68545004E12, 119.33333333333334]], "isOverall": false, "label": "https://chaldal.com/personal-care-26", "isController": false}, {"data": [[1.68544998E12, 130.0], [1.68545004E12, 219.66666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-9", "isController": false}, {"data": [[1.68544998E12, 58.5], [1.68545004E12, 122.66666666666667]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-4", "isController": false}, {"data": [[1.68544998E12, 57.0], [1.68545004E12, 60.666666666666664]], "isOverall": false, "label": "https://chaldal.com/personal-care-20", "isController": false}, {"data": [[1.68544998E12, 58.0], [1.68545004E12, 118.66666666666667]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-3", "isController": false}, {"data": [[1.68544998E12, 56.0], [1.68545004E12, 60.333333333333336]], "isOverall": false, "label": "https://chaldal.com/personal-care-21", "isController": false}, {"data": [[1.68544998E12, 59.0], [1.68545004E12, 121.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-6", "isController": false}, {"data": [[1.68544998E12, 73.0], [1.68545004E12, 84.33333333333333]], "isOverall": false, "label": "https://chaldal.com/personal-care-22", "isController": false}, {"data": [[1.68544998E12, 59.0], [1.68545004E12, 118.66666666666667]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-5", "isController": false}, {"data": [[1.68544998E12, 1009.0], [1.68545004E12, 1426.6666666666667]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-0", "isController": false}, {"data": [[1.68544998E12, 59.0], [1.68545004E12, 117.66666666666667]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-2", "isController": false}, {"data": [[1.68544998E12, 165.5], [1.68545004E12, 364.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-1", "isController": false}, {"data": [[1.68544998E12, 557.0]], "isOverall": false, "label": "https://chaldal.com/-19", "isController": false}, {"data": [[1.68544998E12, 166.8]], "isOverall": false, "label": "https://chaldal.com/-18", "isController": false}, {"data": [[1.68544998E12, 62.5], [1.68545004E12, 63.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-40", "isController": false}, {"data": [[1.68544998E12, 94.0], [1.68545004E12, 277.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-29", "isController": false}, {"data": [[1.68544998E12, 368.2]], "isOverall": false, "label": "https://chaldal.com/-15", "isController": false}, {"data": [[1.68544998E12, 196.5], [1.68545004E12, 79.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-42", "isController": false}, {"data": [[1.68544998E12, 162.8]], "isOverall": false, "label": "https://chaldal.com/-14", "isController": false}, {"data": [[1.68544998E12, 67.5], [1.68545004E12, 65.33333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-41", "isController": false}, {"data": [[1.68544998E12, 67.6]], "isOverall": false, "label": "https://chaldal.com/-17", "isController": false}, {"data": [[1.68544998E12, 1768.0], [1.68545004E12, 2319.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials", "isController": false}, {"data": [[1.68544998E12, 173.8]], "isOverall": false, "label": "https://chaldal.com/-16", "isController": false}, {"data": [[1.68544998E12, 93.5], [1.68545004E12, 173.66666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-43", "isController": false}, {"data": [[1.68544998E12, 67.2]], "isOverall": false, "label": "https://chaldal.com/-11", "isController": false}, {"data": [[1.68544998E12, 115.5], [1.68545004E12, 62.333333333333336]], "isOverall": false, "label": "https://chaldal.com/personal-care-16", "isController": false}, {"data": [[1.68544998E12, 164.2]], "isOverall": false, "label": "https://chaldal.com/-10", "isController": false}, {"data": [[1.68544998E12, 59.5], [1.68545004E12, 61.333333333333336]], "isOverall": false, "label": "https://chaldal.com/personal-care-17", "isController": false}, {"data": [[1.68544998E12, 125.8]], "isOverall": false, "label": "https://chaldal.com/-13", "isController": false}, {"data": [[1.68544998E12, 61.5], [1.68545004E12, 60.333333333333336]], "isOverall": false, "label": "https://chaldal.com/personal-care-18", "isController": false}, {"data": [[1.68544998E12, 71.0]], "isOverall": false, "label": "https://chaldal.com/-12", "isController": false}, {"data": [[1.68544998E12, 56.5], [1.68545004E12, 62.666666666666664]], "isOverall": false, "label": "https://chaldal.com/personal-care-19", "isController": false}, {"data": [[1.68544998E12, 347.5], [1.68545004E12, 265.6666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-30", "isController": false}, {"data": [[1.68544998E12, 319.0], [1.68545004E12, 95.66666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-31", "isController": false}, {"data": [[1.68544998E12, 68.0], [1.68545004E12, 76.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-27", "isController": false}, {"data": [[1.68544998E12, 62.5], [1.68545004E12, 69.33333333333333]], "isOverall": false, "label": "https://chaldal.com/personal-care-28", "isController": false}, {"data": [[1.68544998E12, 67.0], [1.68545004E12, 178.33333333333334]], "isOverall": false, "label": "https://chaldal.com/personal-care-29", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68545004E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.68544998E12, "maxY": 2695.6, "series": [{"data": [[1.68544998E12, 28.5], [1.68545004E12, 65.33333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-17", "isController": false}, {"data": [[1.68544998E12, 59.0], [1.68545004E12, 18.333333333333332]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-16", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-19", "isController": false}, {"data": [[1.68544998E12, 31.0], [1.68545004E12, 39.666666666666664]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-18", "isController": false}, {"data": [[1.68544998E12, 200.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-9", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-20", "isController": false}, {"data": [[1.68544998E12, 61.5], [1.68545004E12, 67.66666666666667]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-22", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-21", "isController": false}, {"data": [[1.68544998E12, 61.5], [1.68545004E12, 60.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-24", "isController": false}, {"data": [[1.68544998E12, 58.5], [1.68545004E12, 69.66666666666667]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-23", "isController": false}, {"data": [[1.68544998E12, 61.5], [1.68545004E12, 117.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-26", "isController": false}, {"data": [[1.68544998E12, 61.0], [1.68545004E12, 79.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-25", "isController": false}, {"data": [[1.68544998E12, 58.0], [1.68545004E12, 61.333333333333336]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-28", "isController": false}, {"data": [[1.68544998E12, 408.5], [1.68545004E12, 450.6666666666667]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-0", "isController": false}, {"data": [[1.68544998E12, 62.0], [1.68545004E12, 63.333333333333336]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-27", "isController": false}, {"data": [[1.68544998E12, 58.0], [1.68545004E12, 62.333333333333336]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-29", "isController": false}, {"data": [[1.68544998E12, 90.0], [1.68545004E12, 144.33333333333334]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-7", "isController": false}, {"data": [[1.68544998E12, 183.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-8", "isController": false}, {"data": [[1.68544998E12, 29.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-5", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 21.666666666666668]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-6", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-3", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-4", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-1", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-2", "isController": false}, {"data": [[1.68544998E12, 56.5], [1.68545004E12, 64.33333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-31", "isController": false}, {"data": [[1.68544998E12, 61.0], [1.68545004E12, 67.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-30", "isController": false}, {"data": [[1.68544998E12, 135.5], [1.68545004E12, 65.66666666666667]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-33", "isController": false}, {"data": [[1.68544998E12, 58.0], [1.68545004E12, 140.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-32", "isController": false}, {"data": [[1.68544998E12, 67.0], [1.68545004E12, 64.33333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-35", "isController": false}, {"data": [[1.68544998E12, 58.0], [1.68545004E12, 65.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-34", "isController": false}, {"data": [[1.68544998E12, 61.0], [1.68545004E12, 64.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-37", "isController": false}, {"data": [[1.68544998E12, 65.5], [1.68545004E12, 64.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-36", "isController": false}, {"data": [[1.68544998E12, 302.6]], "isOverall": false, "label": "https://chaldal.com/-50", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 77.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-6", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 77.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-5", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-4", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-3", "isController": false}, {"data": [[1.68544998E12, 103.5], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-9", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-8", "isController": false}, {"data": [[1.68544998E12, 102.0], [1.68545004E12, 73.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-7", "isController": false}, {"data": [[1.68544998E12, 341.0]], "isOverall": false, "label": "https://chaldal.com/-48", "isController": false}, {"data": [[1.68544998E12, 58.4]], "isOverall": false, "label": "https://chaldal.com/-47", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-11", "isController": false}, {"data": [[1.68544998E12, 345.8]], "isOverall": false, "label": "https://chaldal.com/-49", "isController": false}, {"data": [[1.68544998E12, 31.0], [1.68545004E12, 67.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-10", "isController": false}, {"data": [[1.68544998E12, 72.2]], "isOverall": false, "label": "https://chaldal.com/-44", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-2", "isController": false}, {"data": [[1.68544998E12, 91.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-13", "isController": false}, {"data": [[1.68544998E12, 89.2]], "isOverall": false, "label": "https://chaldal.com/-43", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-1", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-12", "isController": false}, {"data": [[1.68544998E12, 62.6]], "isOverall": false, "label": "https://chaldal.com/-46", "isController": false}, {"data": [[1.68544998E12, 859.0], [1.68545004E12, 852.3333333333334]], "isOverall": false, "label": "https://chaldal.com/personal-care-0", "isController": false}, {"data": [[1.68544998E12, 28.5], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-15", "isController": false}, {"data": [[1.68544998E12, 59.4]], "isOverall": false, "label": "https://chaldal.com/-45", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-14", "isController": false}, {"data": [[1.68544998E12, 63.8]], "isOverall": false, "label": "https://chaldal.com/-40", "isController": false}, {"data": [[1.68544998E12, 59.2]], "isOverall": false, "label": "https://chaldal.com/-42", "isController": false}, {"data": [[1.68544998E12, 62.2]], "isOverall": false, "label": "https://chaldal.com/-41", "isController": false}, {"data": [[1.68544998E12, 189.0]], "isOverall": false, "label": "https://chaldal.com/-9", "isController": false}, {"data": [[1.68544998E12, 241.6]], "isOverall": false, "label": "https://chaldal.com/-5", "isController": false}, {"data": [[1.68544998E12, 528.75]], "isOverall": false, "label": "https://chaldal.com/", "isController": false}, {"data": [[1.68544998E12, 28.0], [1.68545004E12, 22.333333333333336]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-17", "isController": false}, {"data": [[1.68544998E12, 241.2]], "isOverall": false, "label": "https://chaldal.com/-6", "isController": false}, {"data": [[1.68544998E12, 28.0], [1.68545004E12, 20.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-16", "isController": false}, {"data": [[1.68544998E12, 395.8]], "isOverall": false, "label": "https://chaldal.com/-7", "isController": false}, {"data": [[1.68544998E12, 27.5], [1.68545004E12, 20.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-15", "isController": false}, {"data": [[1.68544998E12, 191.4]], "isOverall": false, "label": "https://chaldal.com/-8", "isController": false}, {"data": [[1.68544998E12, 54.5], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-14", "isController": false}, {"data": [[1.68544998E12, 517.2]], "isOverall": false, "label": "https://chaldal.com/-1", "isController": false}, {"data": [[1.68544998E12, 27.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-13", "isController": false}, {"data": [[1.68544998E12, 231.4]], "isOverall": false, "label": "https://chaldal.com/-2", "isController": false}, {"data": [[1.68544998E12, 28.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-12", "isController": false}, {"data": [[1.68544998E12, 283.0]], "isOverall": false, "label": "https://chaldal.com/-3", "isController": false}, {"data": [[1.68544998E12, 121.5], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-11", "isController": false}, {"data": [[1.68544998E12, 230.4]], "isOverall": false, "label": "https://chaldal.com/-4", "isController": false}, {"data": [[1.68544998E12, 96.5], [1.68545004E12, 70.66666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-10", "isController": false}, {"data": [[1.68544998E12, 611.4]], "isOverall": false, "label": "https://chaldal.com/-0", "isController": false}, {"data": [[1.68544998E12, 2695.6]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.68544998E12, 60.2]], "isOverall": false, "label": "https://chaldal.com/-37", "isController": false}, {"data": [[1.68544998E12, 62.6]], "isOverall": false, "label": "https://chaldal.com/-36", "isController": false}, {"data": [[1.68544998E12, 62.4]], "isOverall": false, "label": "https://chaldal.com/-39", "isController": false}, {"data": [[1.68544998E12, 62.2]], "isOverall": false, "label": "https://chaldal.com/-38", "isController": false}, {"data": [[1.68544998E12, 118.6]], "isOverall": false, "label": "https://chaldal.com/-33", "isController": false}, {"data": [[1.68544998E12, 90.6]], "isOverall": false, "label": "https://chaldal.com/-32", "isController": false}, {"data": [[1.68544998E12, 57.8]], "isOverall": false, "label": "https://chaldal.com/-35", "isController": false}, {"data": [[1.68544998E12, 408.5], [1.68545004E12, 450.6666666666667]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle", "isController": false}, {"data": [[1.68544998E12, 64.8]], "isOverall": false, "label": "https://chaldal.com/-34", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-20", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-12", "isController": false}, {"data": [[1.68544998E12, 28.5], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-13", "isController": false}, {"data": [[1.68544998E12, 61.8]], "isOverall": false, "label": "https://chaldal.com/-31", "isController": false}, {"data": [[1.68544998E12, 28.5], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-14", "isController": false}, {"data": [[1.68544998E12, 87.0]], "isOverall": false, "label": "https://chaldal.com/-30", "isController": false}, {"data": [[1.68544998E12, 69.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-15", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 25.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-10", "isController": false}, {"data": [[1.68544998E12, 36.5], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-11", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-28", "isController": false}, {"data": [[1.68544998E12, 144.5], [1.68545004E12, 60.333333333333336]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-27", "isController": false}, {"data": [[1.68544998E12, 57.5], [1.68545004E12, 64.33333333333333]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-26", "isController": false}, {"data": [[1.68544998E12, 66.0], [1.68545004E12, 61.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-25", "isController": false}, {"data": [[1.68544998E12, 57.0], [1.68545004E12, 61.333333333333336]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-24", "isController": false}, {"data": [[1.68544998E12, 60.5], [1.68545004E12, 60.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-23", "isController": false}, {"data": [[1.68544998E12, 63.5], [1.68545004E12, 60.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-22", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-21", "isController": false}, {"data": [[1.68544998E12, 123.4]], "isOverall": false, "label": "https://chaldal.com/-29", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-19", "isController": false}, {"data": [[1.68544998E12, 60.5], [1.68545004E12, 18.333333333333336]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-18", "isController": false}, {"data": [[1.68544998E12, 189.6]], "isOverall": false, "label": "https://chaldal.com/-26", "isController": false}, {"data": [[1.68544998E12, 301.8]], "isOverall": false, "label": "https://chaldal.com/-25", "isController": false}, {"data": [[1.68544998E12, 83.4]], "isOverall": false, "label": "https://chaldal.com/-28", "isController": false}, {"data": [[1.68544998E12, 60.6]], "isOverall": false, "label": "https://chaldal.com/-27", "isController": false}, {"data": [[1.68544998E12, 146.8]], "isOverall": false, "label": "https://chaldal.com/-22", "isController": false}, {"data": [[1.68544998E12, 192.0]], "isOverall": false, "label": "https://chaldal.com/-21", "isController": false}, {"data": [[1.68544998E12, 859.0], [1.68545004E12, 852.3333333333334]], "isOverall": false, "label": "https://chaldal.com/personal-care", "isController": false}, {"data": [[1.68544998E12, 111.0]], "isOverall": false, "label": "https://chaldal.com/-24", "isController": false}, {"data": [[1.68544998E12, 166.0]], "isOverall": false, "label": "https://chaldal.com/-23", "isController": false}, {"data": [[1.68544998E12, 65.0], [1.68545004E12, 62.333333333333336]], "isOverall": false, "label": "https://chaldal.com/personal-care-23", "isController": false}, {"data": [[1.68544998E12, 97.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-8", "isController": false}, {"data": [[1.68544998E12, 56.5], [1.68545004E12, 59.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-39", "isController": false}, {"data": [[1.68544998E12, 58.5], [1.68545004E12, 86.33333333333333]], "isOverall": false, "label": "https://chaldal.com/personal-care-24", "isController": false}, {"data": [[1.68544998E12, 32.5], [1.68545004E12, 20.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-7", "isController": false}, {"data": [[1.68544998E12, 57.5], [1.68545004E12, 65.66666666666667]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-38", "isController": false}, {"data": [[1.68544998E12, 197.4]], "isOverall": false, "label": "https://chaldal.com/-20", "isController": false}, {"data": [[1.68544998E12, 58.5], [1.68545004E12, 67.33333333333333]], "isOverall": false, "label": "https://chaldal.com/personal-care-25", "isController": false}, {"data": [[1.68544998E12, 62.5], [1.68545004E12, 112.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-26", "isController": false}, {"data": [[1.68544998E12, 32.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-9", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-4", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-20", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-3", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-21", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 28.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-6", "isController": false}, {"data": [[1.68544998E12, 66.0], [1.68545004E12, 80.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-22", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 24.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-5", "isController": false}, {"data": [[1.68544998E12, 527.5], [1.68545004E12, 974.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-0", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-2", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-1", "isController": false}, {"data": [[1.68544998E12, 88.6]], "isOverall": false, "label": "https://chaldal.com/-19", "isController": false}, {"data": [[1.68544998E12, 166.6]], "isOverall": false, "label": "https://chaldal.com/-18", "isController": false}, {"data": [[1.68544998E12, 60.5], [1.68545004E12, 60.666666666666664]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-40", "isController": false}, {"data": [[1.68544998E12, 80.0], [1.68545004E12, 264.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-29", "isController": false}, {"data": [[1.68544998E12, 357.2]], "isOverall": false, "label": "https://chaldal.com/-15", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-42", "isController": false}, {"data": [[1.68544998E12, 162.8]], "isOverall": false, "label": "https://chaldal.com/-14", "isController": false}, {"data": [[1.68544998E12, 64.0], [1.68545004E12, 60.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-41", "isController": false}, {"data": [[1.68544998E12, 67.2]], "isOverall": false, "label": "https://chaldal.com/-17", "isController": false}, {"data": [[1.68544998E12, 527.5], [1.68545004E12, 974.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials", "isController": false}, {"data": [[1.68544998E12, 173.6]], "isOverall": false, "label": "https://chaldal.com/-16", "isController": false}, {"data": [[1.68544998E12, 80.5], [1.68545004E12, 160.66666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-43", "isController": false}, {"data": [[1.68544998E12, 67.0]], "isOverall": false, "label": "https://chaldal.com/-11", "isController": false}, {"data": [[1.68544998E12, 30.0], [1.68545004E12, 22.666666666666664]], "isOverall": false, "label": "https://chaldal.com/personal-care-16", "isController": false}, {"data": [[1.68544998E12, 164.0]], "isOverall": false, "label": "https://chaldal.com/-10", "isController": false}, {"data": [[1.68544998E12, 31.5], [1.68545004E12, 22.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-17", "isController": false}, {"data": [[1.68544998E12, 125.6]], "isOverall": false, "label": "https://chaldal.com/-13", "isController": false}, {"data": [[1.68544998E12, 28.0], [1.68545004E12, 20.333333333333336]], "isOverall": false, "label": "https://chaldal.com/personal-care-18", "isController": false}, {"data": [[1.68544998E12, 70.6]], "isOverall": false, "label": "https://chaldal.com/-12", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-19", "isController": false}, {"data": [[1.68544998E12, 260.5], [1.68545004E12, 180.66666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-30", "isController": false}, {"data": [[1.68544998E12, 312.5], [1.68545004E12, 84.66666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-31", "isController": false}, {"data": [[1.68544998E12, 60.0], [1.68545004E12, 70.33333333333333]], "isOverall": false, "label": "https://chaldal.com/personal-care-27", "isController": false}, {"data": [[1.68544998E12, 59.0], [1.68545004E12, 62.666666666666664]], "isOverall": false, "label": "https://chaldal.com/personal-care-28", "isController": false}, {"data": [[1.68544998E12, 62.5], [1.68545004E12, 173.33333333333334]], "isOverall": false, "label": "https://chaldal.com/personal-care-29", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68545004E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.68544998E12, "maxY": 333.2, "series": [{"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-17", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-16", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-19", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-18", "isController": false}, {"data": [[1.68544998E12, 124.0], [1.68545004E12, 240.66666666666669]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-9", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-20", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-22", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-21", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-24", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-23", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 49.33333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-26", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-25", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-28", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-0", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-27", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-29", "isController": false}, {"data": [[1.68544998E12, 121.5], [1.68545004E12, 161.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-7", "isController": false}, {"data": [[1.68544998E12, 120.5], [1.68545004E12, 156.66666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-8", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-5", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-6", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-3", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-4", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-1", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-2", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-31", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-30", "isController": false}, {"data": [[1.68544998E12, 72.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-33", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 62.333333333333336]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-32", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-35", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-34", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-37", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-36", "isController": false}, {"data": [[1.68544998E12, 222.8]], "isOverall": false, "label": "https://chaldal.com/-50", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 103.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-6", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 103.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-5", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 105.66666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-4", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 106.33333333333333]], "isOverall": false, "label": "https://chaldal.com/personal-care-3", "isController": false}, {"data": [[1.68544998E12, 192.0], [1.68545004E12, 115.66666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-9", "isController": false}, {"data": [[1.68544998E12, 181.5], [1.68545004E12, 54.66666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-8", "isController": false}, {"data": [[1.68544998E12, 192.0], [1.68545004E12, 49.33333333333333]], "isOverall": false, "label": "https://chaldal.com/personal-care-7", "isController": false}, {"data": [[1.68544998E12, 290.0]], "isOverall": false, "label": "https://chaldal.com/-48", "isController": false}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-47", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 109.66666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-11", "isController": false}, {"data": [[1.68544998E12, 233.0]], "isOverall": false, "label": "https://chaldal.com/-49", "isController": false}, {"data": [[1.68544998E12, 71.5], [1.68545004E12, 160.66666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-10", "isController": false}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-44", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 103.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-2", "isController": false}, {"data": [[1.68544998E12, 62.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-13", "isController": false}, {"data": [[1.68544998E12, 27.6]], "isOverall": false, "label": "https://chaldal.com/-43", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-1", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-12", "isController": false}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-46", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 176.66666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-0", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-15", "isController": false}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-45", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 47.33333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-14", "isController": false}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-40", "isController": false}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-42", "isController": false}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-41", "isController": false}, {"data": [[1.68544998E12, 126.8]], "isOverall": false, "label": "https://chaldal.com/-9", "isController": false}, {"data": [[1.68544998E12, 168.0]], "isOverall": false, "label": "https://chaldal.com/-5", "isController": false}, {"data": [[1.68544998E12, 158.25]], "isOverall": false, "label": "https://chaldal.com/", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-17", "isController": false}, {"data": [[1.68544998E12, 175.8]], "isOverall": false, "label": "https://chaldal.com/-6", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-16", "isController": false}, {"data": [[1.68544998E12, 333.2]], "isOverall": false, "label": "https://chaldal.com/-7", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-15", "isController": false}, {"data": [[1.68544998E12, 131.4]], "isOverall": false, "label": "https://chaldal.com/-8", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-14", "isController": false}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-1", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 95.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-13", "isController": false}, {"data": [[1.68544998E12, 168.4]], "isOverall": false, "label": "https://chaldal.com/-2", "isController": false}, {"data": [[1.68544998E12, 58.0], [1.68545004E12, 45.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-12", "isController": false}, {"data": [[1.68544998E12, 223.2]], "isOverall": false, "label": "https://chaldal.com/-3", "isController": false}, {"data": [[1.68544998E12, 66.0], [1.68545004E12, 153.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-11", "isController": false}, {"data": [[1.68544998E12, 165.4]], "isOverall": false, "label": "https://chaldal.com/-4", "isController": false}, {"data": [[1.68544998E12, 124.0], [1.68545004E12, 153.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-10", "isController": false}, {"data": [[1.68544998E12, 159.2]], "isOverall": false, "label": "https://chaldal.com/-0", "isController": false}, {"data": [[1.68544998E12, 293.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-37", "isController": false}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-36", "isController": false}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-39", "isController": false}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-38", "isController": false}, {"data": [[1.68544998E12, 52.6]], "isOverall": false, "label": "https://chaldal.com/-33", "isController": false}, {"data": [[1.68544998E12, 24.0]], "isOverall": false, "label": "https://chaldal.com/-32", "isController": false}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-35", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle", "isController": false}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-34", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-20", "isController": false}, {"data": [[1.68544998E12, 163.0], [1.68545004E12, 113.66666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-12", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 106.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-13", "isController": false}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-31", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-14", "isController": false}, {"data": [[1.68544998E12, 24.6]], "isOverall": false, "label": "https://chaldal.com/-30", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-15", "isController": false}, {"data": [[1.68544998E12, 184.5], [1.68545004E12, 55.66666666666667]], "isOverall": false, "label": "https://chaldal.com/personal-care-10", "isController": false}, {"data": [[1.68544998E12, 69.0], [1.68545004E12, 115.33333333333334]], "isOverall": false, "label": "https://chaldal.com/personal-care-11", "isController": false}, {"data": [[1.68544998E12, 52.0], [1.68545004E12, 108.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-28", "isController": false}, {"data": [[1.68544998E12, 58.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-27", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-26", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-25", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-24", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-23", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-22", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-21", "isController": false}, {"data": [[1.68544998E12, 55.4]], "isOverall": false, "label": "https://chaldal.com/-29", "isController": false}, {"data": [[1.68544998E12, 74.5], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-19", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-18", "isController": false}, {"data": [[1.68544998E12, 28.6]], "isOverall": false, "label": "https://chaldal.com/-26", "isController": false}, {"data": [[1.68544998E12, 26.4]], "isOverall": false, "label": "https://chaldal.com/-25", "isController": false}, {"data": [[1.68544998E12, 22.6]], "isOverall": false, "label": "https://chaldal.com/-28", "isController": false}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-27", "isController": false}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-22", "isController": false}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-21", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 176.66666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care", "isController": false}, {"data": [[1.68544998E12, 51.0]], "isOverall": false, "label": "https://chaldal.com/-24", "isController": false}, {"data": [[1.68544998E12, 21.8]], "isOverall": false, "label": "https://chaldal.com/-23", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-23", "isController": false}, {"data": [[1.68544998E12, 70.0], [1.68545004E12, 117.66666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-8", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-39", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-24", "isController": false}, {"data": [[1.68544998E12, 69.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-7", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-38", "isController": false}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-20", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-25", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-26", "isController": false}, {"data": [[1.68544998E12, 71.0], [1.68545004E12, 156.33333333333334]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-9", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 52.66666666666667]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-4", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-20", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 54.66666666666667]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-3", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-21", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 52.66666666666667]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-6", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-22", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 55.33333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-5", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 46.33333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-0", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 52.33333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-2", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-1", "isController": false}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-19", "isController": false}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-18", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-40", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 184.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-29", "isController": false}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-15", "isController": false}, {"data": [[1.68544998E12, 118.5], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-42", "isController": false}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-14", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-41", "isController": false}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-17", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 46.33333333333333]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials", "isController": false}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-16", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 73.33333333333334]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-43", "isController": false}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-11", "isController": false}, {"data": [[1.68544998E12, 58.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-16", "isController": false}, {"data": [[1.68544998E12, 97.0]], "isOverall": false, "label": "https://chaldal.com/-10", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-17", "isController": false}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-13", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-18", "isController": false}, {"data": [[1.68544998E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-12", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-19", "isController": false}, {"data": [[1.68544998E12, 178.0], [1.68545004E12, 74.33333333333334]], "isOverall": false, "label": "https://chaldal.com/personal-care-30", "isController": false}, {"data": [[1.68544998E12, 228.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-31", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-27", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-28", "isController": false}, {"data": [[1.68544998E12, 0.0], [1.68545004E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-29", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68545004E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 52.0, "minX": 1.68544998E12, "maxY": 4122.0, "series": [{"data": [[1.68544998E12, 4122.0], [1.68545004E12, 2667.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.68544998E12, 545.5999999999999], [1.68545004E12, 322.2]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.68544998E12, 2440.179999999977], [1.68545004E12, 2441.439999999998]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.68544998E12, 1248.8999999999976], [1.68545004E12, 922.9999999999998]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.68544998E12, 52.0], [1.68545004E12, 55.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.68544998E12, 71.0], [1.68545004E12, 73.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68545004E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 58.5, "minX": 1.0, "maxY": 2667.5, "series": [{"data": [[2.0, 2667.5], [32.0, 68.0], [33.0, 74.0], [35.0, 68.0], [36.0, 67.5], [39.0, 65.5], [44.0, 70.0], [4.0, 296.0], [6.0, 66.5], [7.0, 78.5], [10.0, 214.5], [11.0, 221.0], [12.0, 96.5], [16.0, 138.5], [1.0, 1616.0], [17.0, 81.0], [18.0, 58.5], [21.0, 117.0], [22.0, 97.5], [23.0, 82.0], [24.0, 68.0], [25.0, 80.0], [26.0, 71.5], [27.0, 65.5], [28.0, 84.5], [30.0, 67.5], [31.0, 63.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 44.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 1124.0, "series": [{"data": [[2.0, 910.0], [32.0, 0.0], [33.0, 55.0], [35.0, 62.0], [36.0, 27.0], [39.0, 57.0], [44.0, 57.0], [4.0, 293.0], [6.0, 0.0], [7.0, 0.0], [10.0, 59.0], [11.0, 0.0], [12.0, 84.0], [16.0, 85.5], [1.0, 1124.0], [17.0, 76.0], [18.0, 0.0], [21.0, 102.0], [22.0, 31.0], [23.0, 63.0], [24.0, 0.0], [25.0, 61.5], [26.0, 60.0], [27.0, 60.0], [28.0, 59.0], [30.0, 0.0], [31.0, 61.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 44.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 5.45, "minX": 1.68544998E12, "maxY": 7.95, "series": [{"data": [[1.68544998E12, 7.95], [1.68545004E12, 5.45]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68545004E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 1.5333333333333334, "minX": 1.68544998E12, "maxY": 6.416666666666667, "series": [{"data": [[1.68544998E12, 6.416666666666667], [1.68545004E12, 2.6166666666666667]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.68544998E12, 1.5333333333333334], [1.68545004E12, 2.8333333333333335]], "isOverall": false, "label": "304", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68545004E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.68544998E12, "maxY": 0.08333333333333333, "series": [{"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-13-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-22-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-1-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-14-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-32-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-13-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-42-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-45-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-5-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-26-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-10-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-26-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-0-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-41-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-1-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-26-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-27-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-2-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-22-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-17-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-3-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-20-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-5-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "Test-success", "isController": true}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-36-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-23-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-7-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-24-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-6-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-13-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-17-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-48-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-8-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-36-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-17-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-29-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-16-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-46-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-1-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-25-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-29-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-21-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-16-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-41-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-0-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-5-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-12-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-4-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-25-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-28-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-30-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-0-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-13-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-42-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-27-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-12-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-4-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-20-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-2-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-16-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-37-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-21-success", "isController": false}, {"data": [[1.68544998E12, 0.06666666666666667]], "isOverall": false, "label": "https://chaldal.com/-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-6-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-24-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-37-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-12-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-33-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-8-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-28-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-19-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-33-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-7-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-9-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-50-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-49-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-21-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-15-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-30-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-24-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-47-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-28-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-4-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-0-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-16-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-29-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-20-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-15-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-28-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-11-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-11-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-9-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-25-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-11-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-31-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-30-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-12-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-43-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-3-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-21-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-38-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-5-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-22-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-24-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-19-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-1-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-3-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-38-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-6-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-19-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-7-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-19-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-27-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-34-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-20-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-15-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-8-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-18-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-34-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-14-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-2-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-15-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-3-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-44-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-29-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-32-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-14-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-9-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-31-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-8-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-26-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-10-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-10-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-31-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-25-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-27-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-11-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-10-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-43-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-23-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-39-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-23-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-22-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-2-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-23-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-39-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-40-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-18-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-7-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-40-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-35-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-17-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-18-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-35-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/personal-care-9-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-14-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-18-success", "isController": false}, {"data": [[1.68544998E12, 0.03333333333333333], [1.68545004E12, 0.05]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-4-success", "isController": false}, {"data": [[1.68544998E12, 0.08333333333333333]], "isOverall": false, "label": "https://chaldal.com/-6-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68545004E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 5.45, "minX": 1.68544998E12, "maxY": 8.033333333333333, "series": [{"data": [[1.68544998E12, 8.033333333333333], [1.68545004E12, 5.45]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68545004E12, "title": "Total Transactions Per Second"}},
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
