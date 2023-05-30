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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 5.0, "series": [{"data": [[0.0, 2.0], [300.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-19", "isController": false}, {"data": [[2100.0, 2.0], [1100.0, 1.0], [2500.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/", "isController": false}, {"data": [[300.0, 2.0], [100.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-10", "isController": false}, {"data": [[0.0, 1.0], [1200.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-12", "isController": false}, {"data": [[300.0, 2.0], [1300.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-11", "isController": false}, {"data": [[0.0, 1.0], [600.0, 1.0], [400.0, 1.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-14", "isController": false}, {"data": [[300.0, 1.0], [100.0, 2.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-13", "isController": false}, {"data": [[0.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-16", "isController": false}, {"data": [[0.0, 3.0], [600.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-15", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-18", "isController": false}, {"data": [[0.0, 2.0], [1300.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-17", "isController": false}, {"data": [[0.0, 3.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-16", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-17", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-18", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-19", "isController": false}, {"data": [[0.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-3", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-2", "isController": false}, {"data": [[300.0, 1.0], [1300.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-10", "isController": false}, {"data": [[200.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-5", "isController": false}, {"data": [[300.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-11", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-4", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-12", "isController": false}, {"data": [[200.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-7", "isController": false}, {"data": [[600.0, 2.0], [700.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-13", "isController": false}, {"data": [[300.0, 1.0], [200.0, 3.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-6", "isController": false}, {"data": [[300.0, 3.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-14", "isController": false}, {"data": [[200.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-9", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-21", "isController": false}, {"data": [[0.0, 2.0], [200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-15", "isController": false}, {"data": [[0.0, 2.0], [200.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-8", "isController": false}, {"data": [[0.0, 4.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-20", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-20", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-21", "isController": false}, {"data": [[300.0, 4.0], [1200.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-5", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-6", "isController": false}, {"data": [[400.0, 5.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-7", "isController": false}, {"data": [[600.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-8", "isController": false}, {"data": [[500.0, 5.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-9", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-1", "isController": false}, {"data": [[600.0, 3.0], [700.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-0", "isController": false}, {"data": [[2300.0, 1.0], [1200.0, 1.0], [1600.0, 1.0], [1700.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-0", "isController": false}, {"data": [[200.0, 3.0], [400.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-1", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-2", "isController": false}, {"data": [[300.0, 3.0], [400.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-3", "isController": false}, {"data": [[200.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-4", "isController": false}, {"data": [[0.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-15", "isController": false}, {"data": [[0.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-16", "isController": false}, {"data": [[400.0, 3.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-13", "isController": false}, {"data": [[300.0, 2.0], [200.0, 1.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-14", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-11", "isController": false}, {"data": [[0.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-12", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-10", "isController": false}, {"data": [[100.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-19", "isController": false}, {"data": [[0.0, 1.0], [300.0, 2.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-17", "isController": false}, {"data": [[0.0, 2.0], [200.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-18", "isController": false}, {"data": [[100.0, 3.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-15", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-14", "isController": false}, {"data": [[0.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-17", "isController": false}, {"data": [[100.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-16", "isController": false}, {"data": [[2200.0, 2.0], [2500.0, 1.0], [1600.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/", "isController": false}, {"data": [[300.0, 4.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-19", "isController": false}, {"data": [[300.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-18", "isController": false}, {"data": [[8800.0, 1.0], [9100.0, 2.0], [9600.0, 1.0], [10500.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[300.0, 1.0], [400.0, 1.0], [200.0, 3.0]], "isOverall": false, "label": "https://my.daraz.com.bd/api/recentOrders/", "isController": false}, {"data": [[400.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-11", "isController": false}, {"data": [[500.0, 5.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-10", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-13", "isController": false}, {"data": [[400.0, 3.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-12", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [200.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-7", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [100.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-8", "isController": false}, {"data": [[1100.0, 1.0], [700.0, 1.0], [200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-8", "isController": false}, {"data": [[300.0, 1.0], [200.0, 2.0], [100.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-9", "isController": false}, {"data": [[300.0, 1.0], [400.0, 1.0], [200.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-9", "isController": false}, {"data": [[0.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-3", "isController": false}, {"data": [[300.0, 1.0], [200.0, 2.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-4", "isController": false}, {"data": [[200.0, 3.0], [100.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-5", "isController": false}, {"data": [[300.0, 1.0], [400.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-6", "isController": false}, {"data": [[1200.0, 1.0], [600.0, 1.0], [800.0, 3.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-1", "isController": false}, {"data": [[100.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-2", "isController": false}, {"data": [[600.0, 1.0], [1200.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-1", "isController": false}, {"data": [[300.0, 5.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-20", "isController": false}, {"data": [[100.0, 4.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-2", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-3", "isController": false}, {"data": [[300.0, 3.0], [1300.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-22", "isController": false}, {"data": [[1300.0, 1.0], [1400.0, 2.0], [1500.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-4", "isController": false}, {"data": [[300.0, 2.0], [400.0, 3.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-21", "isController": false}, {"data": [[300.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-5", "isController": false}, {"data": [[0.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-24", "isController": false}, {"data": [[300.0, 1.0], [200.0, 1.0], [900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-6", "isController": false}, {"data": [[300.0, 3.0], [400.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-23", "isController": false}, {"data": [[0.0, 1.0], [200.0, 2.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-7", "isController": false}, {"data": [[4200.0, 1.0], [2700.0, 1.0], [3100.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-20", "isController": false}, {"data": [[0.0, 2.0], [100.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-21", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 10500.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 11.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 379.0, "series": [{"data": [[0.0, 379.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 71.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 18.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 11.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 3.260869565217389, "minX": 1.68545262E12, "maxY": 4.0733333333333395, "series": [{"data": [[1.68545268E12, 4.0733333333333395], [1.68545262E12, 3.260869565217389]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68545268E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 10559.0, "series": [{"data": [[4.0, 79.0], [2.0, 343.0], [1.0, 0.0], [5.0, 121.0], [3.0, 158.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-19", "isController": false}, {"data": [[3.0, 140.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-19-Aggregated", "isController": false}, {"data": [[4.0, 2016.0], [2.0, 2502.0], [1.0, 2133.0], [5.0, 1155.0], [3.0, 2161.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/", "isController": false}, {"data": [[3.0, 1993.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-Aggregated", "isController": false}, {"data": [[4.0, 441.0], [2.0, 332.0], [1.0, 307.0], [5.0, 109.0], [3.0, 105.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-10", "isController": false}, {"data": [[3.0, 258.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-10-Aggregated", "isController": false}, {"data": [[4.0, 64.0], [2.0, 166.0], [1.0, 121.0], [5.0, 178.0], [3.0, 1229.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-12", "isController": false}, {"data": [[3.0, 351.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-12-Aggregated", "isController": false}, {"data": [[4.0, 1344.0], [2.0, 323.0], [1.0, 308.0], [5.0, 102.0], [3.0, 109.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-11", "isController": false}, {"data": [[3.0, 437.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-11-Aggregated", "isController": false}, {"data": [[4.0, 267.0], [2.0, 616.0], [1.0, 0.0], [5.0, 401.0], [3.0, 541.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-14", "isController": false}, {"data": [[3.0, 365.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-14-Aggregated", "isController": false}, {"data": [[4.0, 164.0], [2.0, 355.0], [1.0, 529.0], [5.0, 130.0], [3.0, 800.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-13", "isController": false}, {"data": [[3.0, 395.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-13-Aggregated", "isController": false}, {"data": [[4.0, 143.0], [2.0, 75.0], [1.0, 0.0], [5.0, 46.0], [3.0, 152.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-16", "isController": false}, {"data": [[3.0, 83.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-16-Aggregated", "isController": false}, {"data": [[4.0, 57.0], [2.0, 71.0], [1.0, 0.0], [5.0, 152.0], [3.0, 613.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-15", "isController": false}, {"data": [[3.0, 178.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-15-Aggregated", "isController": false}, {"data": [[4.0, 93.0], [2.0, 318.0], [1.0, 0.0], [5.0, 154.0], [3.0, 271.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-18", "isController": false}, {"data": [[3.0, 167.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-18-Aggregated", "isController": false}, {"data": [[4.0, 105.0], [2.0, 1359.0], [1.0, 0.0], [5.0, 101.0], [3.0, 96.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-17", "isController": false}, {"data": [[3.0, 332.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-17-Aggregated", "isController": false}, {"data": [[4.0, 130.0], [5.0, 85.66666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-16", "isController": false}, {"data": [[4.6, 103.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-16-Aggregated", "isController": false}, {"data": [[4.0, 103.0], [5.0, 112.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-17", "isController": false}, {"data": [[4.6, 108.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-17-Aggregated", "isController": false}, {"data": [[4.0, 112.5], [5.0, 163.66666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-18", "isController": false}, {"data": [[4.6, 143.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-18-Aggregated", "isController": false}, {"data": [[4.0, 296.0], [5.0, 358.6666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-19", "isController": false}, {"data": [[4.6, 333.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-19-Aggregated", "isController": false}, {"data": [[4.0, 73.0], [5.0, 129.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-3", "isController": false}, {"data": [[4.6, 106.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-3-Aggregated", "isController": false}, {"data": [[4.0, 128.5], [5.0, 142.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-2", "isController": false}, {"data": [[4.6, 136.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-2-Aggregated", "isController": false}, {"data": [[4.0, 203.0], [5.0, 529.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-10", "isController": false}, {"data": [[4.6, 398.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-10-Aggregated", "isController": false}, {"data": [[4.0, 147.5], [5.0, 215.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-5", "isController": false}, {"data": [[4.6, 188.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-5-Aggregated", "isController": false}, {"data": [[4.0, 325.0], [5.0, 185.33333333333334]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-11", "isController": false}, {"data": [[4.6, 241.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-11-Aggregated", "isController": false}, {"data": [[4.0, 45.5], [5.0, 46.666666666666664]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-4", "isController": false}, {"data": [[4.6, 46.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-4-Aggregated", "isController": false}, {"data": [[4.0, 74.0], [5.0, 104.66666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-12", "isController": false}, {"data": [[4.6, 92.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-12-Aggregated", "isController": false}, {"data": [[4.0, 392.0], [5.0, 352.6666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-7", "isController": false}, {"data": [[4.6, 368.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-7-Aggregated", "isController": false}, {"data": [[4.0, 602.5], [5.0, 666.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-13", "isController": false}, {"data": [[4.6, 640.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-13-Aggregated", "isController": false}, {"data": [[4.0, 359.0], [5.0, 305.3333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-6", "isController": false}, {"data": [[4.6, 326.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-6-Aggregated", "isController": false}, {"data": [[4.0, 412.0], [5.0, 419.6666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-14", "isController": false}, {"data": [[4.6, 416.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-14-Aggregated", "isController": false}, {"data": [[4.0, 212.0], [5.0, 223.33333333333334]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-9", "isController": false}, {"data": [[4.6, 218.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-9-Aggregated", "isController": false}, {"data": [[4.0, 46.0], [2.0, 395.0], [1.0, 0.0], [5.0, 50.0], [3.0, 47.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-21", "isController": false}, {"data": [[3.0, 107.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-21-Aggregated", "isController": false}, {"data": [[4.0, 195.0], [5.0, 118.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-15", "isController": false}, {"data": [[4.6, 148.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-15-Aggregated", "isController": false}, {"data": [[4.0, 172.5], [5.0, 128.33333333333334]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-8", "isController": false}, {"data": [[4.6, 146.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-8-Aggregated", "isController": false}, {"data": [[4.0, 50.0], [2.0, 414.0], [1.0, 0.0], [5.0, 59.0], [3.0, 53.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-20", "isController": false}, {"data": [[3.0, 115.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-20-Aggregated", "isController": false}, {"data": [[4.0, 114.5], [5.0, 52.666666666666664]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-20", "isController": false}, {"data": [[4.6, 77.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-20-Aggregated", "isController": false}, {"data": [[4.0, 105.5], [5.0, 49.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-21", "isController": false}, {"data": [[4.6, 71.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-21-Aggregated", "isController": false}, {"data": [[1.0, 387.0], [2.0, 364.0], [4.0, 1269.0], [5.0, 323.0], [3.0, 330.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-5", "isController": false}, {"data": [[3.0, 534.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-5-Aggregated", "isController": false}, {"data": [[1.0, 358.0], [2.0, 337.0], [4.0, 336.0], [5.0, 377.0], [3.0, 340.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-6", "isController": false}, {"data": [[3.0, 349.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-6-Aggregated", "isController": false}, {"data": [[1.0, 438.0], [2.0, 430.0], [4.0, 450.0], [5.0, 484.0], [3.0, 463.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-7", "isController": false}, {"data": [[3.0, 453.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-7-Aggregated", "isController": false}, {"data": [[1.0, 586.0], [2.0, 574.0], [4.0, 581.0], [5.0, 638.0], [3.0, 615.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-8", "isController": false}, {"data": [[3.0, 598.8]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-8-Aggregated", "isController": false}, {"data": [[1.0, 565.0], [2.0, 541.0], [4.0, 540.0], [5.0, 560.0], [3.0, 542.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-9", "isController": false}, {"data": [[3.0, 549.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-9-Aggregated", "isController": false}, {"data": [[4.0, 49.0], [5.0, 47.333333333333336]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-1", "isController": false}, {"data": [[4.6, 48.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-1-Aggregated", "isController": false}, {"data": [[4.0, 710.0], [5.0, 760.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-0", "isController": false}, {"data": [[4.6, 740.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-0-Aggregated", "isController": false}, {"data": [[1.0, 2030.0], [2.0, 2342.0], [4.0, 1275.0], [5.0, 1617.0], [3.0, 1797.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-0", "isController": false}, {"data": [[3.0, 1812.2]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-0-Aggregated", "isController": false}, {"data": [[1.0, 228.0], [2.0, 450.0], [4.0, 182.0], [5.0, 257.0], [3.0, 211.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-1", "isController": false}, {"data": [[3.0, 265.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-1-Aggregated", "isController": false}, {"data": [[1.0, 371.0], [2.0, 349.0], [4.0, 310.0], [5.0, 327.0], [3.0, 354.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-2", "isController": false}, {"data": [[3.0, 342.2]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-2-Aggregated", "isController": false}, {"data": [[1.0, 450.0], [2.0, 406.0], [4.0, 344.0], [5.0, 389.0], [3.0, 390.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-3", "isController": false}, {"data": [[3.0, 395.8]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-3-Aggregated", "isController": false}, {"data": [[1.0, 273.0], [2.0, 211.0], [4.0, 189.0], [5.0, 199.0], [3.0, 204.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-4", "isController": false}, {"data": [[3.0, 215.2]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-4-Aggregated", "isController": false}, {"data": [[4.0, 157.0], [5.0, 120.66666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-15", "isController": false}, {"data": [[4.6, 135.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-15-Aggregated", "isController": false}, {"data": [[4.0, 115.5], [5.0, 80.33333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-16", "isController": false}, {"data": [[4.6, 94.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-16-Aggregated", "isController": false}, {"data": [[4.0, 351.5], [5.0, 485.3333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-13", "isController": false}, {"data": [[4.6, 431.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-13-Aggregated", "isController": false}, {"data": [[4.0, 446.0], [5.0, 253.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-14", "isController": false}, {"data": [[4.6, 330.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-14-Aggregated", "isController": false}, {"data": [[4.0, 330.0], [5.0, 317.6666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-11", "isController": false}, {"data": [[4.6, 322.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-11-Aggregated", "isController": false}, {"data": [[4.0, 84.5], [5.0, 104.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-12", "isController": false}, {"data": [[4.6, 96.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-12-Aggregated", "isController": false}, {"data": [[4.0, 207.5], [5.0, 100.66666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-10", "isController": false}, {"data": [[4.6, 143.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-10-Aggregated", "isController": false}, {"data": [[4.0, 224.5], [5.0, 193.66666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-19", "isController": false}, {"data": [[4.6, 206.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-19-Aggregated", "isController": false}, {"data": [[4.0, 207.5], [5.0, 167.66666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-17", "isController": false}, {"data": [[4.6, 183.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-17-Aggregated", "isController": false}, {"data": [[4.0, 129.0], [5.0, 130.33333333333334]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-18", "isController": false}, {"data": [[4.6, 129.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-18-Aggregated", "isController": false}, {"data": [[1.0, 185.0], [2.0, 183.0], [4.0, 163.0], [5.0, 221.0], [3.0, 204.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-15", "isController": false}, {"data": [[3.0, 191.2]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-15-Aggregated", "isController": false}, {"data": [[1.0, 245.0], [2.0, 272.0], [4.0, 208.0], [5.0, 264.0], [3.0, 237.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-14", "isController": false}, {"data": [[3.0, 245.2]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-14-Aggregated", "isController": false}, {"data": [[1.0, 107.0], [2.0, 109.0], [4.0, 98.0], [5.0, 125.0], [3.0, 109.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-17", "isController": false}, {"data": [[3.0, 109.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-17-Aggregated", "isController": false}, {"data": [[1.0, 171.0], [2.0, 172.0], [4.0, 172.0], [5.0, 198.0], [3.0, 208.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-16", "isController": false}, {"data": [[3.0, 184.2]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-16-Aggregated", "isController": false}, {"data": [[4.0, 2371.0], [5.0, 1947.6666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/", "isController": false}, {"data": [[4.6, 2117.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-Aggregated", "isController": false}, {"data": [[1.0, 370.0], [2.0, 369.0], [4.0, 384.0], [5.0, 365.0], [3.0, 459.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-19", "isController": false}, {"data": [[3.0, 389.4]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-19-Aggregated", "isController": false}, {"data": [[1.0, 275.0], [2.0, 276.0], [4.0, 284.0], [5.0, 293.0], [3.0, 389.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-18", "isController": false}, {"data": [[3.0, 303.4]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-18-Aggregated", "isController": false}, {"data": [[4.0, 9641.0], [2.0, 9111.0], [1.0, 10559.0], [5.0, 8842.0], [3.0, 9190.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[3.0, 9468.6]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[1.0, 424.0], [2.0, 298.0], [4.0, 299.0], [5.0, 305.0], [3.0, 286.0]], "isOverall": false, "label": "https://my.daraz.com.bd/api/recentOrders/", "isController": false}, {"data": [[3.0, 322.4]], "isOverall": false, "label": "https://my.daraz.com.bd/api/recentOrders/-Aggregated", "isController": false}, {"data": [[1.0, 475.0], [2.0, 472.0], [4.0, 450.0], [5.0, 529.0], [3.0, 501.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-11", "isController": false}, {"data": [[3.0, 485.4]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-11-Aggregated", "isController": false}, {"data": [[1.0, 598.0], [2.0, 568.0], [4.0, 550.0], [5.0, 580.0], [3.0, 557.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-10", "isController": false}, {"data": [[3.0, 570.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-10-Aggregated", "isController": false}, {"data": [[1.0, 127.0], [2.0, 115.0], [4.0, 103.0], [5.0, 142.0], [3.0, 114.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-13", "isController": false}, {"data": [[3.0, 120.2]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-13-Aggregated", "isController": false}, {"data": [[1.0, 524.0], [2.0, 478.0], [4.0, 193.0], [5.0, 496.0], [3.0, 484.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-12", "isController": false}, {"data": [[3.0, 435.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-12-Aggregated", "isController": false}, {"data": [[4.0, 302.5], [5.0, 269.6666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-7", "isController": false}, {"data": [[4.6, 282.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-7-Aggregated", "isController": false}, {"data": [[4.0, 80.0], [2.0, 63.0], [1.0, 342.0], [5.0, 184.0], [3.0, 417.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-8", "isController": false}, {"data": [[3.0, 217.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-8-Aggregated", "isController": false}, {"data": [[4.0, 727.5], [5.0, 382.33333333333337]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-8", "isController": false}, {"data": [[4.6, 520.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-8-Aggregated", "isController": false}, {"data": [[4.0, 160.0], [2.0, 332.0], [1.0, 272.0], [5.0, 266.0], [3.0, 1027.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-9", "isController": false}, {"data": [[3.0, 411.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-9-Aggregated", "isController": false}, {"data": [[4.0, 364.0], [5.0, 388.6666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-9", "isController": false}, {"data": [[4.6, 378.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-9-Aggregated", "isController": false}, {"data": [[4.0, 103.0], [5.0, 71.66666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-3", "isController": false}, {"data": [[4.6, 84.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-3-Aggregated", "isController": false}, {"data": [[4.0, 294.5], [5.0, 200.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-4", "isController": false}, {"data": [[4.6, 237.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-4-Aggregated", "isController": false}, {"data": [[4.0, 265.0], [5.0, 286.6666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-5", "isController": false}, {"data": [[4.6, 278.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-5-Aggregated", "isController": false}, {"data": [[4.0, 474.0], [5.0, 479.3333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-6", "isController": false}, {"data": [[4.6, 477.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-6-Aggregated", "isController": false}, {"data": [[4.0, 1046.5], [5.0, 783.6666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-0", "isController": false}, {"data": [[4.6, 888.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-0-Aggregated", "isController": false}, {"data": [[4.0, 58.5], [5.0, 48.666666666666664]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-1", "isController": false}, {"data": [[4.6, 52.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-1-Aggregated", "isController": false}, {"data": [[4.0, 198.5], [5.0, 150.66666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-2", "isController": false}, {"data": [[4.6, 169.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-2-Aggregated", "isController": false}, {"data": [[4.0, 524.0], [2.0, 509.0], [1.0, 1224.0], [5.0, 507.0], [3.0, 619.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-0", "isController": false}, {"data": [[3.0, 676.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-0-Aggregated", "isController": false}, {"data": [[4.0, 54.0], [2.0, 50.0], [1.0, 65.0], [5.0, 52.0], [3.0, 50.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-1", "isController": false}, {"data": [[3.0, 54.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-1-Aggregated", "isController": false}, {"data": [[1.0, 331.0], [2.0, 336.0], [4.0, 334.0], [5.0, 345.0], [3.0, 342.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-20", "isController": false}, {"data": [[3.0, 337.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-20-Aggregated", "isController": false}, {"data": [[4.0, 161.0], [2.0, 422.0], [1.0, 191.0], [5.0, 112.0], [3.0, 187.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-2", "isController": false}, {"data": [[3.0, 214.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-2-Aggregated", "isController": false}, {"data": [[4.0, 72.0], [2.0, 384.0], [1.0, 88.0], [5.0, 84.0], [3.0, 92.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-3", "isController": false}, {"data": [[3.0, 144.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-3-Aggregated", "isController": false}, {"data": [[1.0, 429.0], [2.0, 374.0], [4.0, 341.0], [5.0, 366.0], [3.0, 1355.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-22", "isController": false}, {"data": [[3.0, 573.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-22-Aggregated", "isController": false}, {"data": [[4.0, 1536.5], [5.0, 1527.3333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/", "isController": false}, {"data": [[4.6, 1531.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-Aggregated", "isController": false}, {"data": [[4.0, 47.0], [2.0, 46.0], [1.0, 58.0], [5.0, 48.0], [3.0, 50.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-4", "isController": false}, {"data": [[3.0, 49.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-4-Aggregated", "isController": false}, {"data": [[1.0, 450.0], [2.0, 433.0], [4.0, 327.0], [5.0, 399.0], [3.0, 444.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-21", "isController": false}, {"data": [[3.0, 410.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-21-Aggregated", "isController": false}, {"data": [[4.0, 121.0], [2.0, 398.0], [1.0, 151.0], [5.0, 117.0], [3.0, 193.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-5", "isController": false}, {"data": [[3.0, 196.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-5-Aggregated", "isController": false}, {"data": [[1.0, 58.0], [2.0, 69.0], [4.0, 151.0], [5.0, 62.0], [3.0, 183.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-24", "isController": false}, {"data": [[3.0, 104.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-24-Aggregated", "isController": false}, {"data": [[4.0, 549.0], [2.0, 516.0], [1.0, 396.0], [5.0, 267.0], [3.0, 937.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-6", "isController": false}, {"data": [[3.0, 533.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-6-Aggregated", "isController": false}, {"data": [[1.0, 413.0], [2.0, 385.0], [4.0, 186.0], [5.0, 395.0], [3.0, 396.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-23", "isController": false}, {"data": [[3.0, 355.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-23-Aggregated", "isController": false}, {"data": [[4.0, 93.0], [2.0, 506.0], [1.0, 227.0], [5.0, 258.0], [3.0, 443.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-7", "isController": false}, {"data": [[3.0, 305.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-7-Aggregated", "isController": false}, {"data": [[2.0, 3856.0], [4.0, 2716.0], [5.0, 3146.0], [3.0, 4212.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD", "isController": false}, {"data": [[3.5, 3482.5]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-Aggregated", "isController": false}, {"data": [[4.0, 114.5], [5.0, 53.333333333333336]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-20", "isController": false}, {"data": [[4.6, 77.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-20-Aggregated", "isController": false}, {"data": [[4.0, 302.5], [5.0, 126.66666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-21", "isController": false}, {"data": [[4.6, 197.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-21-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 5.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 2648.983333333333, "minX": 1.68545262E12, "maxY": 1250564.0333333334, "series": [{"data": [[1.68545268E12, 1250564.0333333334], [1.68545262E12, 524875.0833333334]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.68545268E12, 3903.8], [1.68545262E12, 2648.983333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68545268E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 46.2, "minX": 1.68545262E12, "maxY": 9538.25, "series": [{"data": [[1.68545268E12, 140.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-19", "isController": false}, {"data": [[1.68545268E12, 1993.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/", "isController": false}, {"data": [[1.68545268E12, 258.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-10", "isController": false}, {"data": [[1.68545268E12, 351.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-12", "isController": false}, {"data": [[1.68545268E12, 437.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-11", "isController": false}, {"data": [[1.68545268E12, 365.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-14", "isController": false}, {"data": [[1.68545268E12, 395.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-13", "isController": false}, {"data": [[1.68545268E12, 83.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-16", "isController": false}, {"data": [[1.68545268E12, 178.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-15", "isController": false}, {"data": [[1.68545268E12, 167.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-18", "isController": false}, {"data": [[1.68545268E12, 332.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-17", "isController": false}, {"data": [[1.68545268E12, 85.66666666666667], [1.68545262E12, 130.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-16", "isController": false}, {"data": [[1.68545268E12, 112.0], [1.68545262E12, 103.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-17", "isController": false}, {"data": [[1.68545268E12, 163.66666666666666], [1.68545262E12, 112.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-18", "isController": false}, {"data": [[1.68545268E12, 358.6666666666667], [1.68545262E12, 296.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-19", "isController": false}, {"data": [[1.68545268E12, 106.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-3", "isController": false}, {"data": [[1.68545268E12, 136.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-2", "isController": false}, {"data": [[1.68545268E12, 529.0], [1.68545262E12, 203.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-10", "isController": false}, {"data": [[1.68545268E12, 188.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-5", "isController": false}, {"data": [[1.68545268E12, 185.33333333333334], [1.68545262E12, 325.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-11", "isController": false}, {"data": [[1.68545268E12, 46.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-4", "isController": false}, {"data": [[1.68545268E12, 104.66666666666666], [1.68545262E12, 74.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-12", "isController": false}, {"data": [[1.68545268E12, 368.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-7", "isController": false}, {"data": [[1.68545268E12, 666.0], [1.68545262E12, 602.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-13", "isController": false}, {"data": [[1.68545268E12, 326.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-6", "isController": false}, {"data": [[1.68545268E12, 419.6666666666667], [1.68545262E12, 412.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-14", "isController": false}, {"data": [[1.68545268E12, 218.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-9", "isController": false}, {"data": [[1.68545268E12, 107.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-21", "isController": false}, {"data": [[1.68545268E12, 118.0], [1.68545262E12, 195.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-15", "isController": false}, {"data": [[1.68545268E12, 146.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-8", "isController": false}, {"data": [[1.68545268E12, 115.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-20", "isController": false}, {"data": [[1.68545268E12, 77.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-20", "isController": false}, {"data": [[1.68545268E12, 71.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-21", "isController": false}, {"data": [[1.68545262E12, 534.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-5", "isController": false}, {"data": [[1.68545262E12, 349.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-6", "isController": false}, {"data": [[1.68545262E12, 453.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-7", "isController": false}, {"data": [[1.68545262E12, 598.8]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-8", "isController": false}, {"data": [[1.68545262E12, 549.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-9", "isController": false}, {"data": [[1.68545268E12, 48.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-1", "isController": false}, {"data": [[1.68545268E12, 740.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-0", "isController": false}, {"data": [[1.68545262E12, 1812.2]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-0", "isController": false}, {"data": [[1.68545262E12, 265.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-1", "isController": false}, {"data": [[1.68545262E12, 342.2]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-2", "isController": false}, {"data": [[1.68545262E12, 395.8]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-3", "isController": false}, {"data": [[1.68545262E12, 215.2]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-4", "isController": false}, {"data": [[1.68545268E12, 135.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-15", "isController": false}, {"data": [[1.68545268E12, 94.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-16", "isController": false}, {"data": [[1.68545268E12, 431.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-13", "isController": false}, {"data": [[1.68545268E12, 330.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-14", "isController": false}, {"data": [[1.68545268E12, 322.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-11", "isController": false}, {"data": [[1.68545268E12, 96.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-12", "isController": false}, {"data": [[1.68545268E12, 143.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-10", "isController": false}, {"data": [[1.68545268E12, 206.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-19", "isController": false}, {"data": [[1.68545268E12, 183.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-17", "isController": false}, {"data": [[1.68545268E12, 129.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-18", "isController": false}, {"data": [[1.68545262E12, 191.2]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-15", "isController": false}, {"data": [[1.68545262E12, 245.2]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-14", "isController": false}, {"data": [[1.68545262E12, 109.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-17", "isController": false}, {"data": [[1.68545262E12, 184.2]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-16", "isController": false}, {"data": [[1.68545268E12, 1947.6666666666667], [1.68545262E12, 2371.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/", "isController": false}, {"data": [[1.68545262E12, 389.4]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-19", "isController": false}, {"data": [[1.68545262E12, 303.4]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-18", "isController": false}, {"data": [[1.68545268E12, 9190.0], [1.68545262E12, 9538.25]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.68545262E12, 322.4]], "isOverall": false, "label": "https://my.daraz.com.bd/api/recentOrders/", "isController": false}, {"data": [[1.68545262E12, 485.4]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-11", "isController": false}, {"data": [[1.68545262E12, 570.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-10", "isController": false}, {"data": [[1.68545262E12, 120.2]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-13", "isController": false}, {"data": [[1.68545262E12, 435.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-12", "isController": false}, {"data": [[1.68545268E12, 269.6666666666667], [1.68545262E12, 302.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-7", "isController": false}, {"data": [[1.68545268E12, 217.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-8", "isController": false}, {"data": [[1.68545268E12, 382.33333333333337], [1.68545262E12, 727.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-8", "isController": false}, {"data": [[1.68545268E12, 411.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-9", "isController": false}, {"data": [[1.68545268E12, 388.6666666666667], [1.68545262E12, 364.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-9", "isController": false}, {"data": [[1.68545268E12, 71.66666666666667], [1.68545262E12, 103.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-3", "isController": false}, {"data": [[1.68545268E12, 200.0], [1.68545262E12, 294.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-4", "isController": false}, {"data": [[1.68545268E12, 286.6666666666667], [1.68545262E12, 265.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-5", "isController": false}, {"data": [[1.68545268E12, 479.3333333333333], [1.68545262E12, 474.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-6", "isController": false}, {"data": [[1.68545268E12, 783.6666666666666], [1.68545262E12, 1046.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-0", "isController": false}, {"data": [[1.68545268E12, 48.666666666666664], [1.68545262E12, 58.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-1", "isController": false}, {"data": [[1.68545268E12, 150.66666666666666], [1.68545262E12, 198.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-2", "isController": false}, {"data": [[1.68545268E12, 676.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-0", "isController": false}, {"data": [[1.68545268E12, 54.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-1", "isController": false}, {"data": [[1.68545262E12, 337.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-20", "isController": false}, {"data": [[1.68545268E12, 214.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-2", "isController": false}, {"data": [[1.68545268E12, 144.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-3", "isController": false}, {"data": [[1.68545262E12, 573.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-22", "isController": false}, {"data": [[1.68545268E12, 1531.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/", "isController": false}, {"data": [[1.68545268E12, 49.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-4", "isController": false}, {"data": [[1.68545262E12, 410.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-21", "isController": false}, {"data": [[1.68545268E12, 196.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-5", "isController": false}, {"data": [[1.68545262E12, 104.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-24", "isController": false}, {"data": [[1.68545268E12, 533.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-6", "isController": false}, {"data": [[1.68545262E12, 355.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-23", "isController": false}, {"data": [[1.68545268E12, 305.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-7", "isController": false}, {"data": [[1.68545262E12, 3482.5]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD", "isController": false}, {"data": [[1.68545268E12, 53.333333333333336], [1.68545262E12, 114.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-20", "isController": false}, {"data": [[1.68545268E12, 126.66666666666666], [1.68545262E12, 302.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-21", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68545268E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.68545262E12, "maxY": 1827.5, "series": [{"data": [[1.68545268E12, 72.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-19", "isController": false}, {"data": [[1.68545268E12, 291.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-10", "isController": false}, {"data": [[1.68545268E12, 326.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-12", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-11", "isController": false}, {"data": [[1.68545268E12, 61.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-14", "isController": false}, {"data": [[1.68545268E12, 227.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-13", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-16", "isController": false}, {"data": [[1.68545268E12, 178.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-15", "isController": false}, {"data": [[1.68545268E12, 89.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-18", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-17", "isController": false}, {"data": [[1.68545268E12, 0.0], [1.68545262E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-16", "isController": false}, {"data": [[1.68545268E12, 0.0], [1.68545262E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-17", "isController": false}, {"data": [[1.68545268E12, 108.33333333333333], [1.68545262E12, 69.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-18", "isController": false}, {"data": [[1.68545268E12, 125.66666666666667], [1.68545262E12, 77.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-19", "isController": false}, {"data": [[1.68545268E12, 100.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-3", "isController": false}, {"data": [[1.68545268E12, 62.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-2", "isController": false}, {"data": [[1.68545268E12, 0.0], [1.68545262E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-10", "isController": false}, {"data": [[1.68545268E12, 69.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-5", "isController": false}, {"data": [[1.68545268E12, 0.0], [1.68545262E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-11", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-4", "isController": false}, {"data": [[1.68545268E12, 103.66666666666666], [1.68545262E12, 73.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-12", "isController": false}, {"data": [[1.68545268E12, 183.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-7", "isController": false}, {"data": [[1.68545268E12, 386.0], [1.68545262E12, 385.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-13", "isController": false}, {"data": [[1.68545268E12, 70.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-6", "isController": false}, {"data": [[1.68545268E12, 140.0], [1.68545262E12, 66.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-14", "isController": false}, {"data": [[1.68545268E12, 141.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-9", "isController": false}, {"data": [[1.68545268E12, 107.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-21", "isController": false}, {"data": [[1.68545268E12, 118.0], [1.68545262E12, 195.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-15", "isController": false}, {"data": [[1.68545268E12, 146.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-8", "isController": false}, {"data": [[1.68545268E12, 115.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-20", "isController": false}, {"data": [[1.68545268E12, 77.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-20", "isController": false}, {"data": [[1.68545268E12, 71.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-21", "isController": false}, {"data": [[1.68545262E12, 411.8]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-5", "isController": false}, {"data": [[1.68545262E12, 349.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-6", "isController": false}, {"data": [[1.68545262E12, 354.2]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-7", "isController": false}, {"data": [[1.68545262E12, 349.2]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-8", "isController": false}, {"data": [[1.68545262E12, 355.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-9", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-1", "isController": false}, {"data": [[1.68545268E12, 384.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-0", "isController": false}, {"data": [[1.68545262E12, 386.2]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-0", "isController": false}, {"data": [[1.68545262E12, 265.4]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-1", "isController": false}, {"data": [[1.68545262E12, 217.8]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-2", "isController": false}, {"data": [[1.68545262E12, 238.2]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-3", "isController": false}, {"data": [[1.68545262E12, 215.2]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-4", "isController": false}, {"data": [[1.68545268E12, 135.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-15", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-16", "isController": false}, {"data": [[1.68545268E12, 260.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-13", "isController": false}, {"data": [[1.68545268E12, 73.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-14", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-11", "isController": false}, {"data": [[1.68545268E12, 95.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-12", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-10", "isController": false}, {"data": [[1.68545268E12, 63.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-19", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-17", "isController": false}, {"data": [[1.68545268E12, 81.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-18", "isController": false}, {"data": [[1.68545262E12, 190.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-15", "isController": false}, {"data": [[1.68545262E12, 245.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-14", "isController": false}, {"data": [[1.68545262E12, 109.4]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-17", "isController": false}, {"data": [[1.68545262E12, 184.2]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-16", "isController": false}, {"data": [[1.68545268E12, 399.3333333333333], [1.68545262E12, 480.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/", "isController": false}, {"data": [[1.68545262E12, 388.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-19", "isController": false}, {"data": [[1.68545262E12, 207.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-18", "isController": false}, {"data": [[1.68545268E12, 1766.0], [1.68545262E12, 1827.5]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.68545262E12, 322.4]], "isOverall": false, "label": "https://my.daraz.com.bd/api/recentOrders/", "isController": false}, {"data": [[1.68545262E12, 376.2]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-11", "isController": false}, {"data": [[1.68545262E12, 353.2]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-10", "isController": false}, {"data": [[1.68545262E12, 120.2]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-13", "isController": false}, {"data": [[1.68545262E12, 327.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-12", "isController": false}, {"data": [[1.68545268E12, 161.0], [1.68545262E12, 199.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-7", "isController": false}, {"data": [[1.68545268E12, 148.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-8", "isController": false}, {"data": [[1.68545268E12, 382.33333333333337], [1.68545262E12, 727.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-8", "isController": false}, {"data": [[1.68545268E12, 143.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-9", "isController": false}, {"data": [[1.68545268E12, 266.6666666666667], [1.68545262E12, 218.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-9", "isController": false}, {"data": [[1.68545268E12, 64.66666666666667], [1.68545262E12, 80.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-3", "isController": false}, {"data": [[1.68545268E12, 200.0], [1.68545262E12, 294.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-4", "isController": false}, {"data": [[1.68545268E12, 89.66666666666667], [1.68545262E12, 85.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-5", "isController": false}, {"data": [[1.68545268E12, 68.33333333333333], [1.68545262E12, 77.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-6", "isController": false}, {"data": [[1.68545268E12, 399.3333333333333], [1.68545262E12, 480.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-0", "isController": false}, {"data": [[1.68545268E12, 0.0], [1.68545262E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-1", "isController": false}, {"data": [[1.68545268E12, 67.66666666666667], [1.68545262E12, 79.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-2", "isController": false}, {"data": [[1.68545268E12, 291.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-0", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-1", "isController": false}, {"data": [[1.68545262E12, 334.4]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-20", "isController": false}, {"data": [[1.68545268E12, 82.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-2", "isController": false}, {"data": [[1.68545268E12, 72.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-3", "isController": false}, {"data": [[1.68545262E12, 406.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-22", "isController": false}, {"data": [[1.68545268E12, 384.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-4", "isController": false}, {"data": [[1.68545262E12, 214.2]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-21", "isController": false}, {"data": [[1.68545268E12, 77.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-5", "isController": false}, {"data": [[1.68545262E12, 104.4]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-24", "isController": false}, {"data": [[1.68545268E12, 77.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-6", "isController": false}, {"data": [[1.68545262E12, 178.8]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-23", "isController": false}, {"data": [[1.68545268E12, 198.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-7", "isController": false}, {"data": [[1.68545262E12, 361.75]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD", "isController": false}, {"data": [[1.68545268E12, 53.333333333333336], [1.68545262E12, 114.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-20", "isController": false}, {"data": [[1.68545268E12, 126.66666666666666], [1.68545262E12, 302.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-21", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68545268E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.68545262E12, "maxY": 668.5, "series": [{"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-19", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/", "isController": false}, {"data": [[1.68545268E12, 85.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-10", "isController": false}, {"data": [[1.68545268E12, 272.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-12", "isController": false}, {"data": [[1.68545268E12, 333.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-11", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-14", "isController": false}, {"data": [[1.68545268E12, 120.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-13", "isController": false}, {"data": [[1.68545268E12, 40.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-16", "isController": false}, {"data": [[1.68545268E12, 19.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-15", "isController": false}, {"data": [[1.68545268E12, 24.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-18", "isController": false}, {"data": [[1.68545268E12, 250.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-17", "isController": false}, {"data": [[1.68545268E12, 34.0], [1.68545262E12, 66.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-16", "isController": false}, {"data": [[1.68545268E12, 0.0], [1.68545262E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-17", "isController": false}, {"data": [[1.68545268E12, 34.66666666666667], [1.68545262E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-18", "isController": false}, {"data": [[1.68545268E12, 52.66666666666667], [1.68545262E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-19", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-3", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-2", "isController": false}, {"data": [[1.68545268E12, 419.3333333333333], [1.68545262E12, 105.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-10", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-5", "isController": false}, {"data": [[1.68545268E12, 78.0], [1.68545262E12, 219.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-11", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-4", "isController": false}, {"data": [[1.68545268E12, 42.0], [1.68545262E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-12", "isController": false}, {"data": [[1.68545268E12, 127.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-7", "isController": false}, {"data": [[1.68545268E12, 310.6666666666667], [1.68545262E12, 309.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-13", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-6", "isController": false}, {"data": [[1.68545268E12, 50.333333333333336], [1.68545262E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-14", "isController": false}, {"data": [[1.68545268E12, 69.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-9", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-21", "isController": false}, {"data": [[1.68545268E12, 0.0], [1.68545262E12, 139.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-15", "isController": false}, {"data": [[1.68545268E12, 72.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-8", "isController": false}, {"data": [[1.68545268E12, 73.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-20", "isController": false}, {"data": [[1.68545268E12, 24.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-20", "isController": false}, {"data": [[1.68545268E12, 22.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-21", "isController": false}, {"data": [[1.68545262E12, 351.8]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-5", "isController": false}, {"data": [[1.68545262E12, 237.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-6", "isController": false}, {"data": [[1.68545262E12, 239.8]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-7", "isController": false}, {"data": [[1.68545262E12, 236.8]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-8", "isController": false}, {"data": [[1.68545262E12, 242.2]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-9", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-1", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-0", "isController": false}, {"data": [[1.68545262E12, 278.4]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-0", "isController": false}, {"data": [[1.68545262E12, 201.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-1", "isController": false}, {"data": [[1.68545262E12, 161.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-2", "isController": false}, {"data": [[1.68545262E12, 153.8]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-3", "isController": false}, {"data": [[1.68545262E12, 151.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-4", "isController": false}, {"data": [[1.68545268E12, 63.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-15", "isController": false}, {"data": [[1.68545268E12, 44.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-16", "isController": false}, {"data": [[1.68545268E12, 194.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-13", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-14", "isController": false}, {"data": [[1.68545268E12, 217.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-11", "isController": false}, {"data": [[1.68545268E12, 26.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-12", "isController": false}, {"data": [[1.68545268E12, 42.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-10", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-19", "isController": false}, {"data": [[1.68545268E12, 84.20000000000002]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-17", "isController": false}, {"data": [[1.68545268E12, 21.400000000000002]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-18", "isController": false}, {"data": [[1.68545262E12, 132.8]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-15", "isController": false}, {"data": [[1.68545262E12, 177.4]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-14", "isController": false}, {"data": [[1.68545262E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-17", "isController": false}, {"data": [[1.68545262E12, 134.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-16", "isController": false}, {"data": [[1.68545268E12, 0.0], [1.68545262E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/", "isController": false}, {"data": [[1.68545262E12, 266.8]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-19", "isController": false}, {"data": [[1.68545262E12, 130.2]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-18", "isController": false}, {"data": [[1.68545268E12, 535.0], [1.68545262E12, 542.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.68545262E12, 262.2]], "isOverall": false, "label": "https://my.daraz.com.bd/api/recentOrders/", "isController": false}, {"data": [[1.68545262E12, 251.8]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-11", "isController": false}, {"data": [[1.68545262E12, 238.4]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-10", "isController": false}, {"data": [[1.68545262E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-13", "isController": false}, {"data": [[1.68545262E12, 201.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-12", "isController": false}, {"data": [[1.68545268E12, 82.33333333333333], [1.68545262E12, 132.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-7", "isController": false}, {"data": [[1.68545268E12, 95.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-8", "isController": false}, {"data": [[1.68545268E12, 123.66666666666667], [1.68545262E12, 668.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-8", "isController": false}, {"data": [[1.68545268E12, 47.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-9", "isController": false}, {"data": [[1.68545268E12, 206.33333333333331], [1.68545262E12, 129.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-9", "isController": false}, {"data": [[1.68545268E12, 0.0], [1.68545262E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-3", "isController": false}, {"data": [[1.68545268E12, 146.0], [1.68545262E12, 247.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-4", "isController": false}, {"data": [[1.68545268E12, 0.0], [1.68545262E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-5", "isController": false}, {"data": [[1.68545268E12, 0.0], [1.68545262E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-6", "isController": false}, {"data": [[1.68545268E12, 0.0], [1.68545262E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-0", "isController": false}, {"data": [[1.68545268E12, 0.0], [1.68545262E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-1", "isController": false}, {"data": [[1.68545268E12, 0.0], [1.68545262E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-2", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-0", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-1", "isController": false}, {"data": [[1.68545262E12, 233.4]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-20", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-2", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-3", "isController": false}, {"data": [[1.68545262E12, 343.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-22", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-4", "isController": false}, {"data": [[1.68545262E12, 140.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-21", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-5", "isController": false}, {"data": [[1.68545262E12, 45.8]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-24", "isController": false}, {"data": [[1.68545268E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-6", "isController": false}, {"data": [[1.68545262E12, 114.8]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-23", "isController": false}, {"data": [[1.68545268E12, 127.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-7", "isController": false}, {"data": [[1.68545262E12, 244.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD", "isController": false}, {"data": [[1.68545268E12, 0.0], [1.68545262E12, 57.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-20", "isController": false}, {"data": [[1.68545268E12, 72.66666666666666], [1.68545262E12, 71.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-21", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68545268E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 45.0, "minX": 1.68545262E12, "maxY": 4212.0, "series": [{"data": [[1.68545268E12, 2502.0], [1.68545262E12, 4212.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.68545268E12, 657.2000000000005], [1.68545262E12, 619.5]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.68545268E12, 2166.500000000001], [1.68545262E12, 3923.6399999999994]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.68545268E12, 1292.2500000000014], [1.68545262E12, 1787.999999999998]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.68545268E12, 45.0], [1.68545262E12, 50.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.68545268E12, 165.0], [1.68545262E12, 336.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68545268E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 1363.0, "series": [{"data": [[2.0, 1363.0], [8.0, 324.0], [33.0, 163.0], [9.0, 312.0], [10.0, 330.5], [11.0, 298.0], [3.0, 495.5], [12.0, 298.0], [14.0, 165.0], [15.0, 406.0], [1.0, 305.0], [17.0, 289.0], [18.0, 365.5], [19.0, 352.0], [20.0, 244.5], [5.0, 105.0], [21.0, 104.5], [22.0, 119.0], [23.0, 157.0], [6.0, 391.5], [24.0, 173.5], [26.0, 258.0], [7.0, 340.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[19.0, 0.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 33.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 324.0, "series": [{"data": [[2.0, 297.5], [8.0, 213.0], [33.0, 61.0], [9.0, 69.0], [10.0, 241.5], [11.0, 203.5], [3.0, 289.0], [12.0, 74.0], [14.0, 59.5], [15.0, 324.0], [1.0, 305.0], [17.0, 204.0], [18.0, 212.0], [19.0, 132.0], [20.0, 171.5], [5.0, 64.0], [21.0, 58.0], [22.0, 59.5], [23.0, 73.0], [6.0, 202.5], [24.0, 76.0], [26.0, 71.0], [7.0, 214.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[19.0, 0.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 33.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 3.0, "minX": 1.68545262E12, "maxY": 4.983333333333333, "series": [{"data": [[1.68545268E12, 4.983333333333333], [1.68545262E12, 3.0]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68545268E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.68545262E12, "maxY": 3.6, "series": [{"data": [[1.68545268E12, 3.6], [1.68545262E12, 2.8333333333333335]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.68545268E12, 1.2166666666666666], [1.68545262E12, 0.16666666666666666]], "isOverall": false, "label": "304", "isController": false}, {"data": [[1.68545268E12, 0.13333333333333333]], "isOverall": false, "label": "Non HTTP response code: java.lang.IllegalStateException", "isController": false}, {"data": [[1.68545268E12, 0.016666666666666666]], "isOverall": false, "label": "Non HTTP response code: org.apache.http.ConnectionClosedException", "isController": false}, {"data": [[1.68545268E12, 0.016666666666666666]], "isOverall": false, "label": "Non HTTP response code: java.net.SocketException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68545268E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.68545262E12, "maxY": 0.08333333333333333, "series": [{"data": [[1.68545268E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-16-success", "isController": false}, {"data": [[1.68545268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-16-failure", "isController": false}, {"data": [[1.68545262E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-14-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-6-success", "isController": false}, {"data": [[1.68545262E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-18-success", "isController": false}, {"data": [[1.68545262E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-1-success", "isController": false}, {"data": [[1.68545268E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-12-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-14-success", "isController": false}, {"data": [[1.68545268E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-6-success", "isController": false}, {"data": [[1.68545268E12, 0.05], [1.68545262E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-13-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-18-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-2-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-20-success", "isController": false}, {"data": [[1.68545262E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-10-success", "isController": false}, {"data": [[1.68545268E12, 0.05], [1.68545262E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-16-success", "isController": false}, {"data": [[1.68545268E12, 0.05], [1.68545262E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-8-success", "isController": false}, {"data": [[1.68545262E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-8-success", "isController": false}, {"data": [[1.68545268E12, 0.016666666666666666], [1.68545262E12, 0.05]], "isOverall": false, "label": "Test-success", "isController": true}, {"data": [[1.68545268E12, 0.05], [1.68545262E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-3-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-success", "isController": false}, {"data": [[1.68545262E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-20-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-9-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-13-success", "isController": false}, {"data": [[1.68545262E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-success", "isController": false}, {"data": [[1.68545268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-failure", "isController": false}, {"data": [[1.68545262E12, 0.016666666666666666]], "isOverall": false, "label": "Test-failure", "isController": true}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-11-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-3-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-5-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-15-success", "isController": false}, {"data": [[1.68545268E12, 0.05], [1.68545262E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-10-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-19-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-1-success", "isController": false}, {"data": [[1.68545262E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-19-success", "isController": false}, {"data": [[1.68545262E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-13-success", "isController": false}, {"data": [[1.68545268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-15-failure", "isController": false}, {"data": [[1.68545262E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-2-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-1-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-7-success", "isController": false}, {"data": [[1.68545268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-19-failure", "isController": false}, {"data": [[1.68545268E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-19-success", "isController": false}, {"data": [[1.68545268E12, 0.05], [1.68545262E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-14-success", "isController": false}, {"data": [[1.68545268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-21-failure", "isController": false}, {"data": [[1.68545262E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-24-success", "isController": false}, {"data": [[1.68545268E12, 0.05], [1.68545262E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-7-success", "isController": false}, {"data": [[1.68545262E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-5-success", "isController": false}, {"data": [[1.68545268E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-21-success", "isController": false}, {"data": [[1.68545268E12, 0.05], [1.68545262E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-4-success", "isController": false}, {"data": [[1.68545262E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-21-success", "isController": false}, {"data": [[1.68545268E12, 0.05], [1.68545262E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-17-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-12-success", "isController": false}, {"data": [[1.68545262E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-9-success", "isController": false}, {"data": [[1.68545268E12, 0.05], [1.68545262E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-0-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-8-success", "isController": false}, {"data": [[1.68545268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-12-failure", "isController": false}, {"data": [[1.68545262E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-16-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-16-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-4-success", "isController": false}, {"data": [[1.68545268E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-18-success", "isController": false}, {"data": [[1.68545268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-14-failure", "isController": false}, {"data": [[1.68545268E12, 0.05], [1.68545262E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-20-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-4-success", "isController": false}, {"data": [[1.68545268E12, 0.05], [1.68545262E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-11-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-0-success", "isController": false}, {"data": [[1.68545268E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-8-success", "isController": false}, {"data": [[1.68545262E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-12-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-10-success", "isController": false}, {"data": [[1.68545268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-8-failure", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-0-success", "isController": false}, {"data": [[1.68545268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-20-failure", "isController": false}, {"data": [[1.68545262E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-3-success", "isController": false}, {"data": [[1.68545268E12, 0.05], [1.68545262E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-6-success", "isController": false}, {"data": [[1.68545268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-18-failure", "isController": false}, {"data": [[1.68545262E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-6-success", "isController": false}, {"data": [[1.68545262E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-22-success", "isController": false}, {"data": [[1.68545268E12, 0.05], [1.68545262E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-18-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-21-success", "isController": false}, {"data": [[1.68545268E12, 0.05], [1.68545262E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-success", "isController": false}, {"data": [[1.68545268E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-20-success", "isController": false}, {"data": [[1.68545268E12, 0.05], [1.68545262E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-21-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-7-success", "isController": false}, {"data": [[1.68545268E12, 0.05], [1.68545262E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-1-success", "isController": false}, {"data": [[1.68545268E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-15-success", "isController": false}, {"data": [[1.68545262E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-15-success", "isController": false}, {"data": [[1.68545262E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-17-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-5-success", "isController": false}, {"data": [[1.68545268E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-17-failure", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-3-success", "isController": false}, {"data": [[1.68545262E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-0-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-13-success", "isController": false}, {"data": [[1.68545268E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-17-success", "isController": false}, {"data": [[1.68545262E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-11-success", "isController": false}, {"data": [[1.68545268E12, 0.05], [1.68545262E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-12-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-11-success", "isController": false}, {"data": [[1.68545268E12, 0.05], [1.68545262E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-5-success", "isController": false}, {"data": [[1.68545262E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-4-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-9-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-17-success", "isController": false}, {"data": [[1.68545262E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-23-success", "isController": false}, {"data": [[1.68545262E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-7-success", "isController": false}, {"data": [[1.68545268E12, 0.05], [1.68545262E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-15-success", "isController": false}, {"data": [[1.68545262E12, 0.08333333333333333]], "isOverall": false, "label": "https://my.daraz.com.bd/api/recentOrders/-success", "isController": false}, {"data": [[1.68545268E12, 0.05], [1.68545262E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-9-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-10-success", "isController": false}, {"data": [[1.68545268E12, 0.05], [1.68545262E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-2-success", "isController": false}, {"data": [[1.68545268E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-2-success", "isController": false}, {"data": [[1.68545268E12, 0.05], [1.68545262E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-19-success", "isController": false}, {"data": [[1.68545268E12, 0.06666666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-14-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68545268E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.68545262E12, "maxY": 4.816666666666666, "series": [{"data": [[1.68545268E12, 4.816666666666666], [1.68545262E12, 3.05]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.68545268E12, 0.18333333333333332], [1.68545262E12, 0.016666666666666666]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68545268E12, "title": "Total Transactions Per Second"}},
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
