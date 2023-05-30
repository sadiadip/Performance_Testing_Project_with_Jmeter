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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 1.0, "series": [{"data": [[100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-17", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-16", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-19", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-18", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-9", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-20", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-22", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-21", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-24", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-23", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-26", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-25", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-28", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-27", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-29", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-7", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-8", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-5", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-6", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-3", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-4", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-1", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-2", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-31", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-30", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-33", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-32", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-35", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-34", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-37", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-36", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-50", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-6", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-5", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-4", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-3", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-9", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-8", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-7", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-48", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-47", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-11", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-49", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-10", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-44", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-2", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-13", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-43", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-1", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-12", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-46", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-15", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-45", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-14", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-40", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-42", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-41", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-9", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-5", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-17", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-6", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-16", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-7", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-15", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-8", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-14", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-1", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-13", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-2", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-12", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-3", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-11", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-4", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-10", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-0", "isController": false}, {"data": [[8800.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-37", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-36", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-39", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-38", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-33", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-32", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-35", "isController": false}, {"data": [[1700.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-34", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-20", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-12", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-13", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-31", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-14", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-30", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-15", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-10", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-11", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-28", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-27", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-26", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-25", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-24", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-23", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-22", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-21", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-29", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-19", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-18", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-26", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-25", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-28", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-27", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-22", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-21", "isController": false}, {"data": [[2000.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-24", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-23", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-23", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-8", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-39", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-24", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-7", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-38", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-20", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-25", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-26", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-9", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-4", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-20", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-3", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-21", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-6", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-22", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-5", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-2", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-1", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-19", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-18", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-40", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-29", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-15", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-42", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-14", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-41", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-17", "isController": false}, {"data": [[1700.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-16", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-43", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-11", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-16", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-10", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-17", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-13", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-18", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/-12", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-19", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-30", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-31", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-27", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-28", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-29", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 8800.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 3.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 148.0, "series": [{"data": [[0.0, 148.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 9.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 3.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.68544968E12, "maxY": 1.0, "series": [{"data": [[1.68544968E12, 1.0], [1.68544974E12, 1.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68544974E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 55.0, "minX": 1.0, "maxY": 8805.0, "series": [{"data": [[1.0, 186.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-17", "isController": false}, {"data": [[1.0, 186.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-17-Aggregated", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-16", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-16-Aggregated", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-19", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-19-Aggregated", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-18", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-18-Aggregated", "isController": false}, {"data": [[1.0, 86.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-9", "isController": false}, {"data": [[1.0, 86.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-9-Aggregated", "isController": false}, {"data": [[1.0, 56.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-20", "isController": false}, {"data": [[1.0, 56.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-20-Aggregated", "isController": false}, {"data": [[1.0, 68.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-22", "isController": false}, {"data": [[1.0, 68.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-22-Aggregated", "isController": false}, {"data": [[1.0, 71.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-21", "isController": false}, {"data": [[1.0, 71.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-21-Aggregated", "isController": false}, {"data": [[1.0, 64.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-24", "isController": false}, {"data": [[1.0, 64.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-24-Aggregated", "isController": false}, {"data": [[1.0, 65.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-23", "isController": false}, {"data": [[1.0, 65.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-23-Aggregated", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-26", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-26-Aggregated", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-25", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-25-Aggregated", "isController": false}, {"data": [[1.0, 75.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-28", "isController": false}, {"data": [[1.0, 75.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-28-Aggregated", "isController": false}, {"data": [[1.0, 1023.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-0", "isController": false}, {"data": [[1.0, 1023.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-0-Aggregated", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-27", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-27-Aggregated", "isController": false}, {"data": [[1.0, 74.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-29", "isController": false}, {"data": [[1.0, 74.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-29-Aggregated", "isController": false}, {"data": [[1.0, 99.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-7", "isController": false}, {"data": [[1.0, 99.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-7-Aggregated", "isController": false}, {"data": [[1.0, 87.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-8", "isController": false}, {"data": [[1.0, 87.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-8-Aggregated", "isController": false}, {"data": [[1.0, 90.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-5", "isController": false}, {"data": [[1.0, 90.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-5-Aggregated", "isController": false}, {"data": [[1.0, 86.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-6", "isController": false}, {"data": [[1.0, 86.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-6-Aggregated", "isController": false}, {"data": [[1.0, 114.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-3", "isController": false}, {"data": [[1.0, 114.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-3-Aggregated", "isController": false}, {"data": [[1.0, 86.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-4", "isController": false}, {"data": [[1.0, 86.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-4-Aggregated", "isController": false}, {"data": [[1.0, 415.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-1", "isController": false}, {"data": [[1.0, 415.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-1-Aggregated", "isController": false}, {"data": [[1.0, 86.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-2", "isController": false}, {"data": [[1.0, 86.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-2-Aggregated", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-31", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-31-Aggregated", "isController": false}, {"data": [[1.0, 73.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-30", "isController": false}, {"data": [[1.0, 73.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-30-Aggregated", "isController": false}, {"data": [[1.0, 69.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-33", "isController": false}, {"data": [[1.0, 69.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-33-Aggregated", "isController": false}, {"data": [[1.0, 72.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-32", "isController": false}, {"data": [[1.0, 72.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-32-Aggregated", "isController": false}, {"data": [[1.0, 66.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-35", "isController": false}, {"data": [[1.0, 66.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-35-Aggregated", "isController": false}, {"data": [[1.0, 66.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-34", "isController": false}, {"data": [[1.0, 66.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-34-Aggregated", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-37", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-37-Aggregated", "isController": false}, {"data": [[1.0, 67.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-36", "isController": false}, {"data": [[1.0, 67.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-36-Aggregated", "isController": false}, {"data": [[1.0, 333.0]], "isOverall": false, "label": "https://chaldal.com/-50", "isController": false}, {"data": [[1.0, 333.0]], "isOverall": false, "label": "https://chaldal.com/-50-Aggregated", "isController": false}, {"data": [[1.0, 210.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-6", "isController": false}, {"data": [[1.0, 210.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-6-Aggregated", "isController": false}, {"data": [[1.0, 206.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-5", "isController": false}, {"data": [[1.0, 206.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-5-Aggregated", "isController": false}, {"data": [[1.0, 210.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-4", "isController": false}, {"data": [[1.0, 210.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-4-Aggregated", "isController": false}, {"data": [[1.0, 211.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-3", "isController": false}, {"data": [[1.0, 211.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-3-Aggregated", "isController": false}, {"data": [[1.0, 252.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-9", "isController": false}, {"data": [[1.0, 252.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-9-Aggregated", "isController": false}, {"data": [[1.0, 220.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-8", "isController": false}, {"data": [[1.0, 220.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-8-Aggregated", "isController": false}, {"data": [[1.0, 235.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-7", "isController": false}, {"data": [[1.0, 235.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-7-Aggregated", "isController": false}, {"data": [[1.0, 213.0]], "isOverall": false, "label": "https://chaldal.com/-48", "isController": false}, {"data": [[1.0, 213.0]], "isOverall": false, "label": "https://chaldal.com/-48-Aggregated", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "https://chaldal.com/-47", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "https://chaldal.com/-47-Aggregated", "isController": false}, {"data": [[1.0, 80.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-11", "isController": false}, {"data": [[1.0, 80.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-11-Aggregated", "isController": false}, {"data": [[1.0, 450.0]], "isOverall": false, "label": "https://chaldal.com/-49", "isController": false}, {"data": [[1.0, 450.0]], "isOverall": false, "label": "https://chaldal.com/-49-Aggregated", "isController": false}, {"data": [[1.0, 81.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-10", "isController": false}, {"data": [[1.0, 81.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-10-Aggregated", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://chaldal.com/-44", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://chaldal.com/-44-Aggregated", "isController": false}, {"data": [[1.0, 225.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-2", "isController": false}, {"data": [[1.0, 225.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-2-Aggregated", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-13", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-13-Aggregated", "isController": false}, {"data": [[1.0, 65.0]], "isOverall": false, "label": "https://chaldal.com/-43", "isController": false}, {"data": [[1.0, 65.0]], "isOverall": false, "label": "https://chaldal.com/-43-Aggregated", "isController": false}, {"data": [[1.0, 379.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-1", "isController": false}, {"data": [[1.0, 379.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-1-Aggregated", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-12", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-12-Aggregated", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "https://chaldal.com/-46", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "https://chaldal.com/-46-Aggregated", "isController": false}, {"data": [[1.0, 1041.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-0", "isController": false}, {"data": [[1.0, 1041.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-0-Aggregated", "isController": false}, {"data": [[1.0, 66.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-15", "isController": false}, {"data": [[1.0, 66.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-15-Aggregated", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://chaldal.com/-45", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://chaldal.com/-45-Aggregated", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-14", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-14-Aggregated", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://chaldal.com/-40", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://chaldal.com/-40-Aggregated", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "https://chaldal.com/-42", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "https://chaldal.com/-42-Aggregated", "isController": false}, {"data": [[1.0, 75.0]], "isOverall": false, "label": "https://chaldal.com/-41", "isController": false}, {"data": [[1.0, 75.0]], "isOverall": false, "label": "https://chaldal.com/-41-Aggregated", "isController": false}, {"data": [[1.0, 196.0]], "isOverall": false, "label": "https://chaldal.com/-9", "isController": false}, {"data": [[1.0, 196.0]], "isOverall": false, "label": "https://chaldal.com/-9-Aggregated", "isController": false}, {"data": [[1.0, 236.0]], "isOverall": false, "label": "https://chaldal.com/-5", "isController": false}, {"data": [[1.0, 236.0]], "isOverall": false, "label": "https://chaldal.com/-5-Aggregated", "isController": false}, {"data": [[1.0, 70.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-17", "isController": false}, {"data": [[1.0, 70.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-17-Aggregated", "isController": false}, {"data": [[1.0, 235.0]], "isOverall": false, "label": "https://chaldal.com/-6", "isController": false}, {"data": [[1.0, 235.0]], "isOverall": false, "label": "https://chaldal.com/-6-Aggregated", "isController": false}, {"data": [[1.0, 75.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-16", "isController": false}, {"data": [[1.0, 75.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-16-Aggregated", "isController": false}, {"data": [[1.0, 210.0]], "isOverall": false, "label": "https://chaldal.com/-7", "isController": false}, {"data": [[1.0, 210.0]], "isOverall": false, "label": "https://chaldal.com/-7-Aggregated", "isController": false}, {"data": [[1.0, 75.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-15", "isController": false}, {"data": [[1.0, 75.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-15-Aggregated", "isController": false}, {"data": [[1.0, 196.0]], "isOverall": false, "label": "https://chaldal.com/-8", "isController": false}, {"data": [[1.0, 196.0]], "isOverall": false, "label": "https://chaldal.com/-8-Aggregated", "isController": false}, {"data": [[1.0, 64.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-14", "isController": false}, {"data": [[1.0, 64.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-14-Aggregated", "isController": false}, {"data": [[1.0, 176.0]], "isOverall": false, "label": "https://chaldal.com/-1", "isController": false}, {"data": [[1.0, 176.0]], "isOverall": false, "label": "https://chaldal.com/-1-Aggregated", "isController": false}, {"data": [[1.0, 65.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-13", "isController": false}, {"data": [[1.0, 65.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-13-Aggregated", "isController": false}, {"data": [[1.0, 1499.0]], "isOverall": false, "label": "https://chaldal.com/-2", "isController": false}, {"data": [[1.0, 1499.0]], "isOverall": false, "label": "https://chaldal.com/-2-Aggregated", "isController": false}, {"data": [[1.0, 64.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-12", "isController": false}, {"data": [[1.0, 64.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-12-Aggregated", "isController": false}, {"data": [[1.0, 1284.0]], "isOverall": false, "label": "https://chaldal.com/-3", "isController": false}, {"data": [[1.0, 1284.0]], "isOverall": false, "label": "https://chaldal.com/-3-Aggregated", "isController": false}, {"data": [[1.0, 69.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-11", "isController": false}, {"data": [[1.0, 69.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-11-Aggregated", "isController": false}, {"data": [[1.0, 236.0]], "isOverall": false, "label": "https://chaldal.com/-4", "isController": false}, {"data": [[1.0, 236.0]], "isOverall": false, "label": "https://chaldal.com/-4-Aggregated", "isController": false}, {"data": [[1.0, 82.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-10", "isController": false}, {"data": [[1.0, 82.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-10-Aggregated", "isController": false}, {"data": [[1.0, 895.0]], "isOverall": false, "label": "https://chaldal.com/-0", "isController": false}, {"data": [[1.0, 895.0]], "isOverall": false, "label": "https://chaldal.com/-0-Aggregated", "isController": false}, {"data": [[1.0, 8805.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.0, 8805.0]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[1.0, 68.0]], "isOverall": false, "label": "https://chaldal.com/-37", "isController": false}, {"data": [[1.0, 68.0]], "isOverall": false, "label": "https://chaldal.com/-37-Aggregated", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://chaldal.com/-36", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://chaldal.com/-36-Aggregated", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "https://chaldal.com/-39", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "https://chaldal.com/-39-Aggregated", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://chaldal.com/-38", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://chaldal.com/-38-Aggregated", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://chaldal.com/-33", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://chaldal.com/-33-Aggregated", "isController": false}, {"data": [[1.0, 228.0]], "isOverall": false, "label": "https://chaldal.com/-32", "isController": false}, {"data": [[1.0, 228.0]], "isOverall": false, "label": "https://chaldal.com/-32-Aggregated", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "https://chaldal.com/-35", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "https://chaldal.com/-35-Aggregated", "isController": false}, {"data": [[1.0, 1777.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle", "isController": false}, {"data": [[1.0, 1777.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-Aggregated", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "https://chaldal.com/-34", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "https://chaldal.com/-34-Aggregated", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-20", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-20-Aggregated", "isController": false}, {"data": [[1.0, 214.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-12", "isController": false}, {"data": [[1.0, 214.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-12-Aggregated", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-13", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-13-Aggregated", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "https://chaldal.com/-31", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "https://chaldal.com/-31-Aggregated", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-14", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-14-Aggregated", "isController": false}, {"data": [[1.0, 200.0]], "isOverall": false, "label": "https://chaldal.com/-30", "isController": false}, {"data": [[1.0, 200.0]], "isOverall": false, "label": "https://chaldal.com/-30-Aggregated", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-15", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-15-Aggregated", "isController": false}, {"data": [[1.0, 222.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-10", "isController": false}, {"data": [[1.0, 222.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-10-Aggregated", "isController": false}, {"data": [[1.0, 226.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-11", "isController": false}, {"data": [[1.0, 226.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-11-Aggregated", "isController": false}, {"data": [[1.0, 87.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-28", "isController": false}, {"data": [[1.0, 87.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-28-Aggregated", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-27", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-27-Aggregated", "isController": false}, {"data": [[1.0, 88.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-26", "isController": false}, {"data": [[1.0, 88.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-26-Aggregated", "isController": false}, {"data": [[1.0, 81.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-25", "isController": false}, {"data": [[1.0, 81.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-25-Aggregated", "isController": false}, {"data": [[1.0, 68.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-24", "isController": false}, {"data": [[1.0, 68.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-24-Aggregated", "isController": false}, {"data": [[1.0, 101.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-23", "isController": false}, {"data": [[1.0, 101.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-23-Aggregated", "isController": false}, {"data": [[1.0, 81.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-22", "isController": false}, {"data": [[1.0, 81.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-22-Aggregated", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-21", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-21-Aggregated", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://chaldal.com/-29", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://chaldal.com/-29-Aggregated", "isController": false}, {"data": [[1.0, 70.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-19", "isController": false}, {"data": [[1.0, 70.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-19-Aggregated", "isController": false}, {"data": [[1.0, 70.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-18", "isController": false}, {"data": [[1.0, 70.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-18-Aggregated", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://chaldal.com/-26", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://chaldal.com/-26-Aggregated", "isController": false}, {"data": [[1.0, 171.0]], "isOverall": false, "label": "https://chaldal.com/-25", "isController": false}, {"data": [[1.0, 171.0]], "isOverall": false, "label": "https://chaldal.com/-25-Aggregated", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "https://chaldal.com/-28", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "https://chaldal.com/-28-Aggregated", "isController": false}, {"data": [[1.0, 76.0]], "isOverall": false, "label": "https://chaldal.com/-27", "isController": false}, {"data": [[1.0, 76.0]], "isOverall": false, "label": "https://chaldal.com/-27-Aggregated", "isController": false}, {"data": [[1.0, 180.0]], "isOverall": false, "label": "https://chaldal.com/-22", "isController": false}, {"data": [[1.0, 180.0]], "isOverall": false, "label": "https://chaldal.com/-22-Aggregated", "isController": false}, {"data": [[1.0, 88.0]], "isOverall": false, "label": "https://chaldal.com/-21", "isController": false}, {"data": [[1.0, 88.0]], "isOverall": false, "label": "https://chaldal.com/-21-Aggregated", "isController": false}, {"data": [[1.0, 2065.0]], "isOverall": false, "label": "https://chaldal.com/personal-care", "isController": false}, {"data": [[1.0, 2065.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-Aggregated", "isController": false}, {"data": [[1.0, 76.0]], "isOverall": false, "label": "https://chaldal.com/-24", "isController": false}, {"data": [[1.0, 76.0]], "isOverall": false, "label": "https://chaldal.com/-24-Aggregated", "isController": false}, {"data": [[1.0, 245.0]], "isOverall": false, "label": "https://chaldal.com/-23", "isController": false}, {"data": [[1.0, 245.0]], "isOverall": false, "label": "https://chaldal.com/-23-Aggregated", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-23", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-23-Aggregated", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-8", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-8-Aggregated", "isController": false}, {"data": [[1.0, 107.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-39", "isController": false}, {"data": [[1.0, 107.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-39-Aggregated", "isController": false}, {"data": [[1.0, 76.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-24", "isController": false}, {"data": [[1.0, 76.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-24-Aggregated", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-7", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-7-Aggregated", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-38", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-38-Aggregated", "isController": false}, {"data": [[1.0, 320.0]], "isOverall": false, "label": "https://chaldal.com/-20", "isController": false}, {"data": [[1.0, 320.0]], "isOverall": false, "label": "https://chaldal.com/-20-Aggregated", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-25", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-25-Aggregated", "isController": false}, {"data": [[1.0, 66.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-26", "isController": false}, {"data": [[1.0, 66.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-26-Aggregated", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-9", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-9-Aggregated", "isController": false}, {"data": [[1.0, 78.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-4", "isController": false}, {"data": [[1.0, 78.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-4-Aggregated", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-20", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-20-Aggregated", "isController": false}, {"data": [[1.0, 81.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-3", "isController": false}, {"data": [[1.0, 81.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-3-Aggregated", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-21", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-21-Aggregated", "isController": false}, {"data": [[1.0, 80.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-6", "isController": false}, {"data": [[1.0, 80.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-6-Aggregated", "isController": false}, {"data": [[1.0, 65.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-22", "isController": false}, {"data": [[1.0, 65.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-22-Aggregated", "isController": false}, {"data": [[1.0, 79.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-5", "isController": false}, {"data": [[1.0, 79.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-5-Aggregated", "isController": false}, {"data": [[1.0, 1123.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-0", "isController": false}, {"data": [[1.0, 1123.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-0-Aggregated", "isController": false}, {"data": [[1.0, 82.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-2", "isController": false}, {"data": [[1.0, 82.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-2-Aggregated", "isController": false}, {"data": [[1.0, 171.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-1", "isController": false}, {"data": [[1.0, 171.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-1-Aggregated", "isController": false}, {"data": [[1.0, 1137.0]], "isOverall": false, "label": "https://chaldal.com/-19", "isController": false}, {"data": [[1.0, 1137.0]], "isOverall": false, "label": "https://chaldal.com/-19-Aggregated", "isController": false}, {"data": [[1.0, 74.0]], "isOverall": false, "label": "https://chaldal.com/-18", "isController": false}, {"data": [[1.0, 74.0]], "isOverall": false, "label": "https://chaldal.com/-18-Aggregated", "isController": false}, {"data": [[1.0, 69.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-40", "isController": false}, {"data": [[1.0, 69.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-40-Aggregated", "isController": false}, {"data": [[1.0, 332.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-29", "isController": false}, {"data": [[1.0, 332.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-29-Aggregated", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://chaldal.com/-15", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://chaldal.com/-15-Aggregated", "isController": false}, {"data": [[1.0, 84.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-42", "isController": false}, {"data": [[1.0, 84.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-42-Aggregated", "isController": false}, {"data": [[1.0, 471.0]], "isOverall": false, "label": "https://chaldal.com/-14", "isController": false}, {"data": [[1.0, 471.0]], "isOverall": false, "label": "https://chaldal.com/-14-Aggregated", "isController": false}, {"data": [[1.0, 71.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-41", "isController": false}, {"data": [[1.0, 71.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-41-Aggregated", "isController": false}, {"data": [[1.0, 1096.0]], "isOverall": false, "label": "https://chaldal.com/-17", "isController": false}, {"data": [[1.0, 1096.0]], "isOverall": false, "label": "https://chaldal.com/-17-Aggregated", "isController": false}, {"data": [[1.0, 1726.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials", "isController": false}, {"data": [[1.0, 1726.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-Aggregated", "isController": false}, {"data": [[1.0, 1071.0]], "isOverall": false, "label": "https://chaldal.com/-16", "isController": false}, {"data": [[1.0, 1071.0]], "isOverall": false, "label": "https://chaldal.com/-16-Aggregated", "isController": false}, {"data": [[1.0, 99.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-43", "isController": false}, {"data": [[1.0, 99.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-43-Aggregated", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://chaldal.com/-11", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://chaldal.com/-11-Aggregated", "isController": false}, {"data": [[1.0, 65.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-16", "isController": false}, {"data": [[1.0, 65.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-16-Aggregated", "isController": false}, {"data": [[1.0, 195.0]], "isOverall": false, "label": "https://chaldal.com/-10", "isController": false}, {"data": [[1.0, 195.0]], "isOverall": false, "label": "https://chaldal.com/-10-Aggregated", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-17", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-17-Aggregated", "isController": false}, {"data": [[1.0, 73.0]], "isOverall": false, "label": "https://chaldal.com/-13", "isController": false}, {"data": [[1.0, 73.0]], "isOverall": false, "label": "https://chaldal.com/-13-Aggregated", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-18", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-18-Aggregated", "isController": false}, {"data": [[1.0, 65.0]], "isOverall": false, "label": "https://chaldal.com/-12", "isController": false}, {"data": [[1.0, 65.0]], "isOverall": false, "label": "https://chaldal.com/-12-Aggregated", "isController": false}, {"data": [[1.0, 67.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-19", "isController": false}, {"data": [[1.0, 67.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-19-Aggregated", "isController": false}, {"data": [[1.0, 380.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-30", "isController": false}, {"data": [[1.0, 380.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-30-Aggregated", "isController": false}, {"data": [[1.0, 333.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-31", "isController": false}, {"data": [[1.0, 333.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-31-Aggregated", "isController": false}, {"data": [[1.0, 65.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-27", "isController": false}, {"data": [[1.0, 65.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-27-Aggregated", "isController": false}, {"data": [[1.0, 102.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-28", "isController": false}, {"data": [[1.0, 102.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-28-Aggregated", "isController": false}, {"data": [[1.0, 64.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-29", "isController": false}, {"data": [[1.0, 64.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-29-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 535.3833333333333, "minX": 1.68544968E12, "maxY": 192850.63333333333, "series": [{"data": [[1.68544968E12, 116328.45], [1.68544974E12, 192850.63333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.68544968E12, 535.3833333333333], [1.68544974E12, 2303.7]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68544974E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 55.0, "minX": 1.68544968E12, "maxY": 8805.0, "series": [{"data": [[1.68544974E12, 186.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-17", "isController": false}, {"data": [[1.68544974E12, 61.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-16", "isController": false}, {"data": [[1.68544974E12, 63.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-19", "isController": false}, {"data": [[1.68544974E12, 57.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-18", "isController": false}, {"data": [[1.68544974E12, 86.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-9", "isController": false}, {"data": [[1.68544974E12, 56.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-20", "isController": false}, {"data": [[1.68544974E12, 68.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-22", "isController": false}, {"data": [[1.68544974E12, 71.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-21", "isController": false}, {"data": [[1.68544974E12, 64.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-24", "isController": false}, {"data": [[1.68544974E12, 65.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-23", "isController": false}, {"data": [[1.68544974E12, 63.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-26", "isController": false}, {"data": [[1.68544974E12, 60.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-25", "isController": false}, {"data": [[1.68544974E12, 75.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-28", "isController": false}, {"data": [[1.68544974E12, 1023.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-0", "isController": false}, {"data": [[1.68544974E12, 60.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-27", "isController": false}, {"data": [[1.68544974E12, 74.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-29", "isController": false}, {"data": [[1.68544974E12, 99.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-7", "isController": false}, {"data": [[1.68544974E12, 87.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-8", "isController": false}, {"data": [[1.68544974E12, 90.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-5", "isController": false}, {"data": [[1.68544974E12, 86.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-6", "isController": false}, {"data": [[1.68544974E12, 114.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-3", "isController": false}, {"data": [[1.68544974E12, 86.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-4", "isController": false}, {"data": [[1.68544974E12, 415.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-1", "isController": false}, {"data": [[1.68544974E12, 86.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-2", "isController": false}, {"data": [[1.68544974E12, 63.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-31", "isController": false}, {"data": [[1.68544974E12, 73.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-30", "isController": false}, {"data": [[1.68544974E12, 69.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-33", "isController": false}, {"data": [[1.68544974E12, 72.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-32", "isController": false}, {"data": [[1.68544974E12, 66.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-35", "isController": false}, {"data": [[1.68544974E12, 66.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-34", "isController": false}, {"data": [[1.68544974E12, 61.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-37", "isController": false}, {"data": [[1.68544974E12, 67.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-36", "isController": false}, {"data": [[1.68544968E12, 333.0]], "isOverall": false, "label": "https://chaldal.com/-50", "isController": false}, {"data": [[1.68544974E12, 210.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-6", "isController": false}, {"data": [[1.68544974E12, 206.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-5", "isController": false}, {"data": [[1.68544974E12, 210.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-4", "isController": false}, {"data": [[1.68544974E12, 211.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-3", "isController": false}, {"data": [[1.68544974E12, 252.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-9", "isController": false}, {"data": [[1.68544974E12, 220.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-8", "isController": false}, {"data": [[1.68544974E12, 235.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-7", "isController": false}, {"data": [[1.68544968E12, 213.0]], "isOverall": false, "label": "https://chaldal.com/-48", "isController": false}, {"data": [[1.68544968E12, 61.0]], "isOverall": false, "label": "https://chaldal.com/-47", "isController": false}, {"data": [[1.68544974E12, 80.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-11", "isController": false}, {"data": [[1.68544968E12, 450.0]], "isOverall": false, "label": "https://chaldal.com/-49", "isController": false}, {"data": [[1.68544974E12, 81.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-10", "isController": false}, {"data": [[1.68544968E12, 58.0]], "isOverall": false, "label": "https://chaldal.com/-44", "isController": false}, {"data": [[1.68544974E12, 225.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-2", "isController": false}, {"data": [[1.68544974E12, 59.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-13", "isController": false}, {"data": [[1.68544968E12, 65.0]], "isOverall": false, "label": "https://chaldal.com/-43", "isController": false}, {"data": [[1.68544974E12, 379.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-1", "isController": false}, {"data": [[1.68544974E12, 61.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-12", "isController": false}, {"data": [[1.68544968E12, 62.0]], "isOverall": false, "label": "https://chaldal.com/-46", "isController": false}, {"data": [[1.68544974E12, 1041.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-0", "isController": false}, {"data": [[1.68544974E12, 66.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-15", "isController": false}, {"data": [[1.68544968E12, 57.0]], "isOverall": false, "label": "https://chaldal.com/-45", "isController": false}, {"data": [[1.68544974E12, 59.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-14", "isController": false}, {"data": [[1.68544968E12, 58.0]], "isOverall": false, "label": "https://chaldal.com/-40", "isController": false}, {"data": [[1.68544968E12, 62.0]], "isOverall": false, "label": "https://chaldal.com/-42", "isController": false}, {"data": [[1.68544968E12, 75.0]], "isOverall": false, "label": "https://chaldal.com/-41", "isController": false}, {"data": [[1.68544968E12, 196.0]], "isOverall": false, "label": "https://chaldal.com/-9", "isController": false}, {"data": [[1.68544968E12, 236.0]], "isOverall": false, "label": "https://chaldal.com/-5", "isController": false}, {"data": [[1.68544974E12, 70.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-17", "isController": false}, {"data": [[1.68544968E12, 235.0]], "isOverall": false, "label": "https://chaldal.com/-6", "isController": false}, {"data": [[1.68544974E12, 75.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-16", "isController": false}, {"data": [[1.68544968E12, 210.0]], "isOverall": false, "label": "https://chaldal.com/-7", "isController": false}, {"data": [[1.68544974E12, 75.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-15", "isController": false}, {"data": [[1.68544968E12, 196.0]], "isOverall": false, "label": "https://chaldal.com/-8", "isController": false}, {"data": [[1.68544974E12, 64.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-14", "isController": false}, {"data": [[1.68544968E12, 176.0]], "isOverall": false, "label": "https://chaldal.com/-1", "isController": false}, {"data": [[1.68544974E12, 65.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-13", "isController": false}, {"data": [[1.68544968E12, 1499.0]], "isOverall": false, "label": "https://chaldal.com/-2", "isController": false}, {"data": [[1.68544974E12, 64.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-12", "isController": false}, {"data": [[1.68544968E12, 1284.0]], "isOverall": false, "label": "https://chaldal.com/-3", "isController": false}, {"data": [[1.68544974E12, 69.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-11", "isController": false}, {"data": [[1.68544968E12, 236.0]], "isOverall": false, "label": "https://chaldal.com/-4", "isController": false}, {"data": [[1.68544974E12, 82.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-10", "isController": false}, {"data": [[1.68544968E12, 895.0]], "isOverall": false, "label": "https://chaldal.com/-0", "isController": false}, {"data": [[1.68544968E12, 8805.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.68544968E12, 68.0]], "isOverall": false, "label": "https://chaldal.com/-37", "isController": false}, {"data": [[1.68544968E12, 59.0]], "isOverall": false, "label": "https://chaldal.com/-36", "isController": false}, {"data": [[1.68544968E12, 62.0]], "isOverall": false, "label": "https://chaldal.com/-39", "isController": false}, {"data": [[1.68544968E12, 59.0]], "isOverall": false, "label": "https://chaldal.com/-38", "isController": false}, {"data": [[1.68544968E12, 57.0]], "isOverall": false, "label": "https://chaldal.com/-33", "isController": false}, {"data": [[1.68544968E12, 228.0]], "isOverall": false, "label": "https://chaldal.com/-32", "isController": false}, {"data": [[1.68544968E12, 55.0]], "isOverall": false, "label": "https://chaldal.com/-35", "isController": false}, {"data": [[1.68544974E12, 1777.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle", "isController": false}, {"data": [[1.68544968E12, 62.0]], "isOverall": false, "label": "https://chaldal.com/-34", "isController": false}, {"data": [[1.68544974E12, 58.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-20", "isController": false}, {"data": [[1.68544974E12, 214.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-12", "isController": false}, {"data": [[1.68544974E12, 55.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-13", "isController": false}, {"data": [[1.68544968E12, 61.0]], "isOverall": false, "label": "https://chaldal.com/-31", "isController": false}, {"data": [[1.68544974E12, 55.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-14", "isController": false}, {"data": [[1.68544968E12, 200.0]], "isOverall": false, "label": "https://chaldal.com/-30", "isController": false}, {"data": [[1.68544974E12, 63.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-15", "isController": false}, {"data": [[1.68544974E12, 222.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-10", "isController": false}, {"data": [[1.68544974E12, 226.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-11", "isController": false}, {"data": [[1.68544974E12, 87.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-28", "isController": false}, {"data": [[1.68544974E12, 62.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-27", "isController": false}, {"data": [[1.68544974E12, 88.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-26", "isController": false}, {"data": [[1.68544974E12, 81.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-25", "isController": false}, {"data": [[1.68544974E12, 68.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-24", "isController": false}, {"data": [[1.68544974E12, 101.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-23", "isController": false}, {"data": [[1.68544974E12, 81.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-22", "isController": false}, {"data": [[1.68544974E12, 58.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-21", "isController": false}, {"data": [[1.68544968E12, 60.0]], "isOverall": false, "label": "https://chaldal.com/-29", "isController": false}, {"data": [[1.68544974E12, 70.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-19", "isController": false}, {"data": [[1.68544974E12, 70.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-18", "isController": false}, {"data": [[1.68544968E12, 57.0]], "isOverall": false, "label": "https://chaldal.com/-26", "isController": false}, {"data": [[1.68544968E12, 171.0]], "isOverall": false, "label": "https://chaldal.com/-25", "isController": false}, {"data": [[1.68544968E12, 55.0]], "isOverall": false, "label": "https://chaldal.com/-28", "isController": false}, {"data": [[1.68544968E12, 76.0]], "isOverall": false, "label": "https://chaldal.com/-27", "isController": false}, {"data": [[1.68544968E12, 180.0]], "isOverall": false, "label": "https://chaldal.com/-22", "isController": false}, {"data": [[1.68544968E12, 88.0]], "isOverall": false, "label": "https://chaldal.com/-21", "isController": false}, {"data": [[1.68544974E12, 2065.0]], "isOverall": false, "label": "https://chaldal.com/personal-care", "isController": false}, {"data": [[1.68544968E12, 76.0]], "isOverall": false, "label": "https://chaldal.com/-24", "isController": false}, {"data": [[1.68544968E12, 245.0]], "isOverall": false, "label": "https://chaldal.com/-23", "isController": false}, {"data": [[1.68544974E12, 62.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-23", "isController": false}, {"data": [[1.68544974E12, 60.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-8", "isController": false}, {"data": [[1.68544974E12, 107.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-39", "isController": false}, {"data": [[1.68544974E12, 76.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-24", "isController": false}, {"data": [[1.68544974E12, 57.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-7", "isController": false}, {"data": [[1.68544974E12, 63.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-38", "isController": false}, {"data": [[1.68544968E12, 320.0]], "isOverall": false, "label": "https://chaldal.com/-20", "isController": false}, {"data": [[1.68544974E12, 61.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-25", "isController": false}, {"data": [[1.68544974E12, 66.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-26", "isController": false}, {"data": [[1.68544974E12, 58.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-9", "isController": false}, {"data": [[1.68544974E12, 78.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-4", "isController": false}, {"data": [[1.68544974E12, 57.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-20", "isController": false}, {"data": [[1.68544974E12, 81.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-3", "isController": false}, {"data": [[1.68544974E12, 57.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-21", "isController": false}, {"data": [[1.68544974E12, 80.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-6", "isController": false}, {"data": [[1.68544974E12, 65.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-22", "isController": false}, {"data": [[1.68544974E12, 79.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-5", "isController": false}, {"data": [[1.68544974E12, 1123.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-0", "isController": false}, {"data": [[1.68544974E12, 82.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-2", "isController": false}, {"data": [[1.68544974E12, 171.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-1", "isController": false}, {"data": [[1.68544968E12, 1137.0]], "isOverall": false, "label": "https://chaldal.com/-19", "isController": false}, {"data": [[1.68544968E12, 74.0]], "isOverall": false, "label": "https://chaldal.com/-18", "isController": false}, {"data": [[1.68544974E12, 69.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-40", "isController": false}, {"data": [[1.68544974E12, 332.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-29", "isController": false}, {"data": [[1.68544968E12, 58.0]], "isOverall": false, "label": "https://chaldal.com/-15", "isController": false}, {"data": [[1.68544974E12, 84.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-42", "isController": false}, {"data": [[1.68544968E12, 471.0]], "isOverall": false, "label": "https://chaldal.com/-14", "isController": false}, {"data": [[1.68544974E12, 71.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-41", "isController": false}, {"data": [[1.68544968E12, 1096.0]], "isOverall": false, "label": "https://chaldal.com/-17", "isController": false}, {"data": [[1.68544974E12, 1726.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials", "isController": false}, {"data": [[1.68544968E12, 1071.0]], "isOverall": false, "label": "https://chaldal.com/-16", "isController": false}, {"data": [[1.68544974E12, 99.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-43", "isController": false}, {"data": [[1.68544968E12, 57.0]], "isOverall": false, "label": "https://chaldal.com/-11", "isController": false}, {"data": [[1.68544974E12, 65.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-16", "isController": false}, {"data": [[1.68544968E12, 195.0]], "isOverall": false, "label": "https://chaldal.com/-10", "isController": false}, {"data": [[1.68544974E12, 57.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-17", "isController": false}, {"data": [[1.68544968E12, 73.0]], "isOverall": false, "label": "https://chaldal.com/-13", "isController": false}, {"data": [[1.68544974E12, 58.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-18", "isController": false}, {"data": [[1.68544968E12, 65.0]], "isOverall": false, "label": "https://chaldal.com/-12", "isController": false}, {"data": [[1.68544974E12, 67.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-19", "isController": false}, {"data": [[1.68544974E12, 380.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-30", "isController": false}, {"data": [[1.68544974E12, 333.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-31", "isController": false}, {"data": [[1.68544974E12, 65.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-27", "isController": false}, {"data": [[1.68544974E12, 102.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-28", "isController": false}, {"data": [[1.68544974E12, 64.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-29", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68544974E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.68544968E12, "maxY": 1978.0, "series": [{"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-17", "isController": false}, {"data": [[1.68544974E12, 61.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-16", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-19", "isController": false}, {"data": [[1.68544974E12, 57.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-18", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-9", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-20", "isController": false}, {"data": [[1.68544974E12, 65.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-22", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-21", "isController": false}, {"data": [[1.68544974E12, 62.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-24", "isController": false}, {"data": [[1.68544974E12, 64.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-23", "isController": false}, {"data": [[1.68544974E12, 58.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-26", "isController": false}, {"data": [[1.68544974E12, 57.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-25", "isController": false}, {"data": [[1.68544974E12, 71.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-28", "isController": false}, {"data": [[1.68544974E12, 367.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-0", "isController": false}, {"data": [[1.68544974E12, 56.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-27", "isController": false}, {"data": [[1.68544974E12, 70.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-29", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-7", "isController": false}, {"data": [[1.68544974E12, 87.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-8", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-5", "isController": false}, {"data": [[1.68544974E12, 86.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-6", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-3", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-4", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-1", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-2", "isController": false}, {"data": [[1.68544974E12, 56.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-31", "isController": false}, {"data": [[1.68544974E12, 58.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-30", "isController": false}, {"data": [[1.68544974E12, 63.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-33", "isController": false}, {"data": [[1.68544974E12, 63.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-32", "isController": false}, {"data": [[1.68544974E12, 59.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-35", "isController": false}, {"data": [[1.68544974E12, 60.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-34", "isController": false}, {"data": [[1.68544974E12, 55.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-37", "isController": false}, {"data": [[1.68544974E12, 60.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-36", "isController": false}, {"data": [[1.68544968E12, 326.0]], "isOverall": false, "label": "https://chaldal.com/-50", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-6", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-5", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-4", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-3", "isController": false}, {"data": [[1.68544974E12, 251.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-9", "isController": false}, {"data": [[1.68544974E12, 220.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-8", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-7", "isController": false}, {"data": [[1.68544968E12, 213.0]], "isOverall": false, "label": "https://chaldal.com/-48", "isController": false}, {"data": [[1.68544968E12, 60.0]], "isOverall": false, "label": "https://chaldal.com/-47", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-11", "isController": false}, {"data": [[1.68544968E12, 361.0]], "isOverall": false, "label": "https://chaldal.com/-49", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-10", "isController": false}, {"data": [[1.68544968E12, 57.0]], "isOverall": false, "label": "https://chaldal.com/-44", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-2", "isController": false}, {"data": [[1.68544974E12, 58.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-13", "isController": false}, {"data": [[1.68544968E12, 64.0]], "isOverall": false, "label": "https://chaldal.com/-43", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-1", "isController": false}, {"data": [[1.68544974E12, 60.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-12", "isController": false}, {"data": [[1.68544968E12, 61.0]], "isOverall": false, "label": "https://chaldal.com/-46", "isController": false}, {"data": [[1.68544974E12, 586.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-0", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-15", "isController": false}, {"data": [[1.68544968E12, 57.0]], "isOverall": false, "label": "https://chaldal.com/-45", "isController": false}, {"data": [[1.68544974E12, 59.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-14", "isController": false}, {"data": [[1.68544968E12, 58.0]], "isOverall": false, "label": "https://chaldal.com/-40", "isController": false}, {"data": [[1.68544968E12, 61.0]], "isOverall": false, "label": "https://chaldal.com/-42", "isController": false}, {"data": [[1.68544968E12, 74.0]], "isOverall": false, "label": "https://chaldal.com/-41", "isController": false}, {"data": [[1.68544968E12, 196.0]], "isOverall": false, "label": "https://chaldal.com/-9", "isController": false}, {"data": [[1.68544968E12, 236.0]], "isOverall": false, "label": "https://chaldal.com/-5", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-17", "isController": false}, {"data": [[1.68544968E12, 235.0]], "isOverall": false, "label": "https://chaldal.com/-6", "isController": false}, {"data": [[1.68544974E12, 75.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-16", "isController": false}, {"data": [[1.68544968E12, 210.0]], "isOverall": false, "label": "https://chaldal.com/-7", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-15", "isController": false}, {"data": [[1.68544968E12, 195.0]], "isOverall": false, "label": "https://chaldal.com/-8", "isController": false}, {"data": [[1.68544974E12, 64.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-14", "isController": false}, {"data": [[1.68544968E12, 176.0]], "isOverall": false, "label": "https://chaldal.com/-1", "isController": false}, {"data": [[1.68544974E12, 65.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-13", "isController": false}, {"data": [[1.68544968E12, 237.0]], "isOverall": false, "label": "https://chaldal.com/-2", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-12", "isController": false}, {"data": [[1.68544968E12, 257.0]], "isOverall": false, "label": "https://chaldal.com/-3", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-11", "isController": false}, {"data": [[1.68544968E12, 236.0]], "isOverall": false, "label": "https://chaldal.com/-4", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-10", "isController": false}, {"data": [[1.68544968E12, 373.0]], "isOverall": false, "label": "https://chaldal.com/-0", "isController": false}, {"data": [[1.68544968E12, 1978.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.68544968E12, 66.0]], "isOverall": false, "label": "https://chaldal.com/-37", "isController": false}, {"data": [[1.68544968E12, 58.0]], "isOverall": false, "label": "https://chaldal.com/-36", "isController": false}, {"data": [[1.68544968E12, 60.0]], "isOverall": false, "label": "https://chaldal.com/-39", "isController": false}, {"data": [[1.68544968E12, 59.0]], "isOverall": false, "label": "https://chaldal.com/-38", "isController": false}, {"data": [[1.68544968E12, 57.0]], "isOverall": false, "label": "https://chaldal.com/-33", "isController": false}, {"data": [[1.68544968E12, 71.0]], "isOverall": false, "label": "https://chaldal.com/-32", "isController": false}, {"data": [[1.68544968E12, 54.0]], "isOverall": false, "label": "https://chaldal.com/-35", "isController": false}, {"data": [[1.68544974E12, 367.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle", "isController": false}, {"data": [[1.68544968E12, 60.0]], "isOverall": false, "label": "https://chaldal.com/-34", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-20", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-12", "isController": false}, {"data": [[1.68544974E12, 55.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-13", "isController": false}, {"data": [[1.68544968E12, 55.0]], "isOverall": false, "label": "https://chaldal.com/-31", "isController": false}, {"data": [[1.68544974E12, 55.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-14", "isController": false}, {"data": [[1.68544968E12, 198.0]], "isOverall": false, "label": "https://chaldal.com/-30", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-15", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-10", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-11", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-28", "isController": false}, {"data": [[1.68544974E12, 58.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-27", "isController": false}, {"data": [[1.68544974E12, 62.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-26", "isController": false}, {"data": [[1.68544974E12, 64.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-25", "isController": false}, {"data": [[1.68544974E12, 61.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-24", "isController": false}, {"data": [[1.68544974E12, 81.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-23", "isController": false}, {"data": [[1.68544974E12, 63.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-22", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-21", "isController": false}, {"data": [[1.68544968E12, 59.0]], "isOverall": false, "label": "https://chaldal.com/-29", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-19", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-18", "isController": false}, {"data": [[1.68544968E12, 56.0]], "isOverall": false, "label": "https://chaldal.com/-26", "isController": false}, {"data": [[1.68544968E12, 170.0]], "isOverall": false, "label": "https://chaldal.com/-25", "isController": false}, {"data": [[1.68544968E12, 54.0]], "isOverall": false, "label": "https://chaldal.com/-28", "isController": false}, {"data": [[1.68544968E12, 63.0]], "isOverall": false, "label": "https://chaldal.com/-27", "isController": false}, {"data": [[1.68544968E12, 175.0]], "isOverall": false, "label": "https://chaldal.com/-22", "isController": false}, {"data": [[1.68544968E12, 74.0]], "isOverall": false, "label": "https://chaldal.com/-21", "isController": false}, {"data": [[1.68544974E12, 586.0]], "isOverall": false, "label": "https://chaldal.com/personal-care", "isController": false}, {"data": [[1.68544968E12, 57.0]], "isOverall": false, "label": "https://chaldal.com/-24", "isController": false}, {"data": [[1.68544968E12, 68.0]], "isOverall": false, "label": "https://chaldal.com/-23", "isController": false}, {"data": [[1.68544974E12, 57.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-23", "isController": false}, {"data": [[1.68544974E12, 59.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-8", "isController": false}, {"data": [[1.68544974E12, 105.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-39", "isController": false}, {"data": [[1.68544974E12, 63.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-24", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-7", "isController": false}, {"data": [[1.68544974E12, 60.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-38", "isController": false}, {"data": [[1.68544968E12, 203.0]], "isOverall": false, "label": "https://chaldal.com/-20", "isController": false}, {"data": [[1.68544974E12, 56.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-25", "isController": false}, {"data": [[1.68544974E12, 59.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-26", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-9", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-4", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-20", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-3", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-21", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-6", "isController": false}, {"data": [[1.68544974E12, 61.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-22", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-5", "isController": false}, {"data": [[1.68544974E12, 652.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-0", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-2", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-1", "isController": false}, {"data": [[1.68544968E12, 68.0]], "isOverall": false, "label": "https://chaldal.com/-19", "isController": false}, {"data": [[1.68544968E12, 74.0]], "isOverall": false, "label": "https://chaldal.com/-18", "isController": false}, {"data": [[1.68544974E12, 68.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-40", "isController": false}, {"data": [[1.68544974E12, 320.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-29", "isController": false}, {"data": [[1.68544968E12, 58.0]], "isOverall": false, "label": "https://chaldal.com/-15", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-42", "isController": false}, {"data": [[1.68544968E12, 471.0]], "isOverall": false, "label": "https://chaldal.com/-14", "isController": false}, {"data": [[1.68544974E12, 68.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-41", "isController": false}, {"data": [[1.68544968E12, 1095.0]], "isOverall": false, "label": "https://chaldal.com/-17", "isController": false}, {"data": [[1.68544974E12, 652.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials", "isController": false}, {"data": [[1.68544968E12, 1071.0]], "isOverall": false, "label": "https://chaldal.com/-16", "isController": false}, {"data": [[1.68544974E12, 85.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-43", "isController": false}, {"data": [[1.68544968E12, 56.0]], "isOverall": false, "label": "https://chaldal.com/-11", "isController": false}, {"data": [[1.68544974E12, 65.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-16", "isController": false}, {"data": [[1.68544968E12, 194.0]], "isOverall": false, "label": "https://chaldal.com/-10", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-17", "isController": false}, {"data": [[1.68544968E12, 73.0]], "isOverall": false, "label": "https://chaldal.com/-13", "isController": false}, {"data": [[1.68544974E12, 57.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-18", "isController": false}, {"data": [[1.68544968E12, 64.0]], "isOverall": false, "label": "https://chaldal.com/-12", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-19", "isController": false}, {"data": [[1.68544974E12, 314.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-30", "isController": false}, {"data": [[1.68544974E12, 321.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-31", "isController": false}, {"data": [[1.68544974E12, 58.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-27", "isController": false}, {"data": [[1.68544974E12, 56.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-28", "isController": false}, {"data": [[1.68544974E12, 61.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-29", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68544974E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.68544968E12, "maxY": 404.0, "series": [{"data": [[1.68544974E12, 129.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-17", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-16", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-19", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-18", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-9", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-20", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-22", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-21", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-24", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-23", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-26", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-25", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-28", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-0", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-27", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-29", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-7", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-8", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-5", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-6", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-3", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-4", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-1", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-2", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-31", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-30", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-33", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-32", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-35", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-34", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-37", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-36", "isController": false}, {"data": [[1.68544968E12, 247.0]], "isOverall": false, "label": "https://chaldal.com/-50", "isController": false}, {"data": [[1.68544974E12, 153.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-6", "isController": false}, {"data": [[1.68544974E12, 151.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-5", "isController": false}, {"data": [[1.68544974E12, 153.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-4", "isController": false}, {"data": [[1.68544974E12, 154.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-3", "isController": false}, {"data": [[1.68544974E12, 175.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-9", "isController": false}, {"data": [[1.68544974E12, 163.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-8", "isController": false}, {"data": [[1.68544974E12, 178.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-7", "isController": false}, {"data": [[1.68544968E12, 159.0]], "isOverall": false, "label": "https://chaldal.com/-48", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-47", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-11", "isController": false}, {"data": [[1.68544968E12, 276.0]], "isOverall": false, "label": "https://chaldal.com/-49", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-10", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-44", "isController": false}, {"data": [[1.68544974E12, 170.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-2", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-13", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-43", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-1", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-12", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-46", "isController": false}, {"data": [[1.68544974E12, 145.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-0", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-15", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-45", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-14", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-40", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-42", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-41", "isController": false}, {"data": [[1.68544968E12, 133.0]], "isOverall": false, "label": "https://chaldal.com/-9", "isController": false}, {"data": [[1.68544968E12, 172.0]], "isOverall": false, "label": "https://chaldal.com/-5", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-17", "isController": false}, {"data": [[1.68544968E12, 172.0]], "isOverall": false, "label": "https://chaldal.com/-6", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-16", "isController": false}, {"data": [[1.68544968E12, 142.0]], "isOverall": false, "label": "https://chaldal.com/-7", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-15", "isController": false}, {"data": [[1.68544968E12, 131.0]], "isOverall": false, "label": "https://chaldal.com/-8", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-14", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-1", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-13", "isController": false}, {"data": [[1.68544968E12, 172.0]], "isOverall": false, "label": "https://chaldal.com/-2", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-12", "isController": false}, {"data": [[1.68544968E12, 188.0]], "isOverall": false, "label": "https://chaldal.com/-3", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-11", "isController": false}, {"data": [[1.68544968E12, 174.0]], "isOverall": false, "label": "https://chaldal.com/-4", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-10", "isController": false}, {"data": [[1.68544968E12, 166.0]], "isOverall": false, "label": "https://chaldal.com/-0", "isController": false}, {"data": [[1.68544968E12, 311.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-37", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-36", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-39", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-38", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-33", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-32", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-35", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-34", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-20", "isController": false}, {"data": [[1.68544974E12, 154.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-12", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-13", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-31", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-14", "isController": false}, {"data": [[1.68544968E12, 138.0]], "isOverall": false, "label": "https://chaldal.com/-30", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-15", "isController": false}, {"data": [[1.68544974E12, 162.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-10", "isController": false}, {"data": [[1.68544974E12, 152.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-11", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-28", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-27", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-26", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-25", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-24", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-23", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-22", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-21", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-29", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-19", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-18", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-26", "isController": false}, {"data": [[1.68544968E12, 114.0]], "isOverall": false, "label": "https://chaldal.com/-25", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-28", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-27", "isController": false}, {"data": [[1.68544968E12, 118.0]], "isOverall": false, "label": "https://chaldal.com/-22", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-21", "isController": false}, {"data": [[1.68544974E12, 145.0]], "isOverall": false, "label": "https://chaldal.com/personal-care", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-24", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-23", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-23", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-8", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-39", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-24", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-7", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-38", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-20", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-25", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-26", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-9", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-4", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-20", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-3", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-21", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-6", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-22", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-5", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-0", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-2", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-1", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-19", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-18", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-40", "isController": false}, {"data": [[1.68544974E12, 239.0]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-29", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-15", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-42", "isController": false}, {"data": [[1.68544968E12, 404.0]], "isOverall": false, "label": "https://chaldal.com/-14", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-41", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-17", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-16", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-43", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-11", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-16", "isController": false}, {"data": [[1.68544968E12, 128.0]], "isOverall": false, "label": "https://chaldal.com/-10", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-17", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-13", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-18", "isController": false}, {"data": [[1.68544968E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/-12", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-19", "isController": false}, {"data": [[1.68544974E12, 234.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-30", "isController": false}, {"data": [[1.68544974E12, 240.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-31", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-27", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-28", "isController": false}, {"data": [[1.68544974E12, 0.0]], "isOverall": false, "label": "https://chaldal.com/personal-care-29", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68544974E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 55.0, "minX": 1.68544968E12, "maxY": 2065.0, "series": [{"data": [[1.68544968E12, 1499.0], [1.68544974E12, 2065.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.68544968E12, 1035.8000000000006], [1.68544974E12, 332.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.68544968E12, 1499.0], [1.68544974E12, 2036.2000000000016]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.68544968E12, 1195.7999999999997], [1.68544974E12, 1032.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.68544968E12, 55.0], [1.68544974E12, 55.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.68544968E12, 76.0], [1.68544974E12, 73.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68544974E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 62.0, "minX": 3.0, "maxY": 380.0, "series": [{"data": [[39.0, 66.0], [20.0, 72.5], [11.0, 86.0], [3.0, 380.0], [6.0, 91.5], [13.0, 196.0], [7.0, 320.0], [30.0, 71.5], [31.0, 62.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 39.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 3.0, "maxY": 321.0, "series": [{"data": [[39.0, 57.0], [20.0, 59.5], [11.0, 0.0], [3.0, 321.0], [6.0, 76.5], [13.0, 195.0], [7.0, 203.0], [30.0, 27.5], [31.0, 61.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 39.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.85, "minX": 1.68544968E12, "maxY": 1.8166666666666667, "series": [{"data": [[1.68544968E12, 0.85], [1.68544974E12, 1.8166666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68544974E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.8, "minX": 1.68544968E12, "maxY": 1.0166666666666666, "series": [{"data": [[1.68544968E12, 0.85], [1.68544974E12, 1.0166666666666666]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.68544974E12, 0.8]], "isOverall": false, "label": "304", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68544974E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.68544968E12, "maxY": 0.016666666666666666, "series": [{"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-13-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-22-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-1-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-14-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-32-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-13-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-42-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-45-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-5-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-26-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-10-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-26-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-0-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-41-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-1-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-26-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-27-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-2-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-22-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-17-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-3-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-20-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-5-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "Test-success", "isController": true}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-36-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-23-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-7-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-24-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-6-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-13-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-17-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-48-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-8-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-36-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-17-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-29-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-16-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-46-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-1-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-25-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-29-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-21-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-16-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-41-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-0-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-5-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-12-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-4-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-25-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-28-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-30-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-0-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-13-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-42-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-27-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-12-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-4-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-20-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-2-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-16-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-37-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-21-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-6-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-24-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-37-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-12-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-33-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-8-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-28-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-19-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-33-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-7-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-9-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-50-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-49-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-21-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-15-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-30-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-24-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-47-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-28-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-4-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-0-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-16-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-29-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-20-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-15-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-28-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-11-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-11-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-9-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-25-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-11-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-31-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-30-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-12-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-43-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-3-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-21-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-38-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-5-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-22-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-24-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-19-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-1-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-3-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-38-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-6-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-19-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-7-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-19-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-27-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-34-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-20-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-15-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-8-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-18-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-34-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-14-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-2-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-15-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-3-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-44-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-29-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-32-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-14-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-9-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-31-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-8-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-26-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-10-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-10-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-31-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-25-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-27-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-11-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-10-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-43-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-23-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-39-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-23-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-22-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-2-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-23-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-39-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-40-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-18-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-7-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-40-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-35-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-17-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-18-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-35-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/personal-care-9-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/fashion-lifestyle-14-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-18-success", "isController": false}, {"data": [[1.68544974E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/vehicle-essentials-4-success", "isController": false}, {"data": [[1.68544968E12, 0.016666666666666666]], "isOverall": false, "label": "https://chaldal.com/-6-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68544974E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.8666666666666667, "minX": 1.68544968E12, "maxY": 1.8166666666666667, "series": [{"data": [[1.68544968E12, 0.8666666666666667], [1.68544974E12, 1.8166666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68544974E12, "title": "Total Transactions Per Second"}},
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
