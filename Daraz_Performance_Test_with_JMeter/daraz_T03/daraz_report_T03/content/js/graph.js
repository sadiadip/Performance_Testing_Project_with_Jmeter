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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 10.0, "series": [{"data": [[600.0, 1.0], [300.0, 2.0], [400.0, 3.0], [800.0, 1.0], [100.0, 1.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-19", "isController": false}, {"data": [[2300.0, 1.0], [2400.0, 1.0], [2600.0, 1.0], [2800.0, 2.0], [2900.0, 2.0], [3000.0, 1.0], [3200.0, 1.0], [3900.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/", "isController": false}, {"data": [[0.0, 3.0], [300.0, 4.0], [1200.0, 1.0], [100.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-10", "isController": false}, {"data": [[300.0, 4.0], [100.0, 5.0], [800.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-12", "isController": false}, {"data": [[1200.0, 1.0], [300.0, 5.0], [200.0, 2.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-11", "isController": false}, {"data": [[600.0, 1.0], [1300.0, 1.0], [700.0, 3.0], [1500.0, 1.0], [900.0, 2.0], [1900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-14", "isController": false}, {"data": [[700.0, 2.0], [100.0, 5.0], [200.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-13", "isController": false}, {"data": [[1300.0, 1.0], [200.0, 2.0], [400.0, 3.0], [100.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-16", "isController": false}, {"data": [[300.0, 3.0], [1300.0, 1.0], [100.0, 6.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-15", "isController": false}, {"data": [[600.0, 1.0], [300.0, 4.0], [700.0, 1.0], [200.0, 3.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-18", "isController": false}, {"data": [[0.0, 2.0], [600.0, 1.0], [300.0, 2.0], [400.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-17", "isController": false}, {"data": [[0.0, 5.0], [300.0, 2.0], [200.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-16", "isController": false}, {"data": [[300.0, 2.0], [100.0, 6.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-17", "isController": false}, {"data": [[600.0, 1.0], [200.0, 5.0], [100.0, 3.0], [800.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-18", "isController": false}, {"data": [[300.0, 2.0], [600.0, 1.0], [100.0, 1.0], [400.0, 5.0], [1900.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-19", "isController": false}, {"data": [[0.0, 4.0], [200.0, 2.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-3", "isController": false}, {"data": [[300.0, 3.0], [400.0, 2.0], [200.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-2", "isController": false}, {"data": [[300.0, 7.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-10", "isController": false}, {"data": [[300.0, 3.0], [200.0, 7.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-5", "isController": false}, {"data": [[0.0, 1.0], [300.0, 7.0], [400.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-11", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-4", "isController": false}, {"data": [[0.0, 5.0], [600.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-12", "isController": false}, {"data": [[300.0, 2.0], [600.0, 1.0], [400.0, 3.0], [1800.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-7", "isController": false}, {"data": [[700.0, 9.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-13", "isController": false}, {"data": [[600.0, 2.0], [1200.0, 1.0], [700.0, 1.0], [800.0, 2.0], [900.0, 1.0], [1000.0, 3.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-6", "isController": false}, {"data": [[300.0, 1.0], [600.0, 2.0], [1200.0, 1.0], [200.0, 1.0], [400.0, 1.0], [800.0, 2.0], [900.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-14", "isController": false}, {"data": [[300.0, 1.0], [600.0, 2.0], [1400.0, 1.0], [700.0, 1.0], [400.0, 2.0], [200.0, 1.0], [800.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-9", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [100.0, 5.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-21", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [100.0, 6.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-15", "isController": false}, {"data": [[300.0, 4.0], [1300.0, 1.0], [200.0, 4.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-8", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [1300.0, 1.0], [200.0, 1.0], [100.0, 5.0], [800.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-20", "isController": false}, {"data": [[0.0, 1.0], [300.0, 2.0], [800.0, 1.0], [100.0, 3.0], [200.0, 1.0], [1800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-20", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [1300.0, 1.0], [400.0, 1.0], [200.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-21", "isController": false}, {"data": [[300.0, 2.0], [600.0, 1.0], [700.0, 1.0], [400.0, 2.0], [200.0, 1.0], [800.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-5", "isController": false}, {"data": [[300.0, 8.0], [600.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-6", "isController": false}, {"data": [[300.0, 1.0], [400.0, 8.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-7", "isController": false}, {"data": [[600.0, 1.0], [900.0, 1.0], [500.0, 8.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-8", "isController": false}, {"data": [[400.0, 2.0], [800.0, 1.0], [500.0, 7.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-9", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0], [100.0, 6.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-1", "isController": false}, {"data": [[600.0, 5.0], [700.0, 1.0], [3300.0, 1.0], [800.0, 1.0], [900.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-0", "isController": false}, {"data": [[1500.0, 1.0], [1600.0, 1.0], [1700.0, 3.0], [1800.0, 2.0], [1900.0, 1.0], [2000.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-0", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 2.0], [700.0, 1.0], [200.0, 5.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-1", "isController": false}, {"data": [[300.0, 3.0], [1300.0, 1.0], [400.0, 2.0], [900.0, 1.0], [500.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-2", "isController": false}, {"data": [[300.0, 3.0], [600.0, 1.0], [1300.0, 1.0], [700.0, 2.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-3", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 3.0], [200.0, 4.0], [400.0, 1.0], [3300.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-4", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [1300.0, 1.0], [100.0, 4.0], [400.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-15", "isController": false}, {"data": [[0.0, 1.0], [600.0, 1.0], [300.0, 3.0], [1300.0, 1.0], [1400.0, 1.0], [200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-16", "isController": false}, {"data": [[1100.0, 1.0], [1300.0, 1.0], [700.0, 5.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-13", "isController": false}, {"data": [[1100.0, 1.0], [700.0, 2.0], [1500.0, 1.0], [800.0, 2.0], [900.0, 2.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-14", "isController": false}, {"data": [[300.0, 10.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-11", "isController": false}, {"data": [[0.0, 1.0], [300.0, 3.0], [600.0, 1.0], [100.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-12", "isController": false}, {"data": [[300.0, 9.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-10", "isController": false}, {"data": [[300.0, 1.0], [1300.0, 1.0], [800.0, 2.0], [400.0, 1.0], [900.0, 1.0], [500.0, 3.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-19", "isController": false}, {"data": [[0.0, 5.0], [300.0, 2.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-17", "isController": false}, {"data": [[300.0, 1.0], [1200.0, 1.0], [100.0, 3.0], [200.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-18", "isController": false}, {"data": [[300.0, 3.0], [700.0, 1.0], [100.0, 2.0], [200.0, 4.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-15", "isController": false}, {"data": [[200.0, 7.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-14", "isController": false}, {"data": [[0.0, 3.0], [100.0, 6.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-17", "isController": false}, {"data": [[300.0, 2.0], [100.0, 2.0], [200.0, 4.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-16", "isController": false}, {"data": [[4300.0, 1.0], [2100.0, 1.0], [2400.0, 1.0], [2500.0, 2.0], [2800.0, 1.0], [2900.0, 1.0], [1700.0, 1.0], [1800.0, 1.0], [3700.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/", "isController": false}, {"data": [[300.0, 9.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-19", "isController": false}, {"data": [[300.0, 2.0], [600.0, 1.0], [1300.0, 2.0], [700.0, 1.0], [400.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-18", "isController": false}, {"data": [[10500.0, 1.0], [11100.0, 1.0], [12000.0, 1.0], [13200.0, 1.0], [12900.0, 1.0], [13000.0, 1.0], [14000.0, 1.0], [14300.0, 1.0], [14200.0, 1.0], [15900.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[400.0, 2.0], [200.0, 8.0]], "isOverall": false, "label": "https://my.daraz.com.bd/api/recentOrders/", "isController": false}, {"data": [[600.0, 1.0], [400.0, 7.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-11", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [200.0, 1.0], [500.0, 7.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-10", "isController": false}, {"data": [[300.0, 1.0], [100.0, 8.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-13", "isController": false}, {"data": [[400.0, 4.0], [100.0, 5.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-12", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [1300.0, 2.0], [100.0, 2.0], [400.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-7", "isController": false}, {"data": [[300.0, 2.0], [1300.0, 1.0], [1400.0, 1.0], [200.0, 1.0], [100.0, 2.0], [800.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-8", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 3.0], [100.0, 3.0], [200.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-8", "isController": false}, {"data": [[1200.0, 1.0], [600.0, 2.0], [1500.0, 1.0], [200.0, 2.0], [800.0, 1.0], [1800.0, 1.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-9", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [600.0, 1.0], [100.0, 1.0], [400.0, 1.0], [800.0, 1.0], [500.0, 3.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-9", "isController": false}, {"data": [[0.0, 3.0], [700.0, 1.0], [100.0, 4.0], [200.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-3", "isController": false}, {"data": [[200.0, 7.0], [100.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-4", "isController": false}, {"data": [[300.0, 3.0], [600.0, 1.0], [200.0, 3.0], [400.0, 3.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-5", "isController": false}, {"data": [[1100.0, 1.0], [1300.0, 2.0], [700.0, 1.0], [1400.0, 1.0], [900.0, 1.0], [500.0, 3.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-6", "isController": false}, {"data": [[1100.0, 1.0], [700.0, 3.0], [800.0, 5.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-0", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0], [600.0, 1.0], [100.0, 3.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-1", "isController": false}, {"data": [[600.0, 1.0], [200.0, 4.0], [400.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-2", "isController": false}, {"data": [[700.0, 3.0], [1400.0, 1.0], [400.0, 1.0], [900.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-0", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [100.0, 6.0], [400.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-1", "isController": false}, {"data": [[300.0, 3.0], [200.0, 7.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-20", "isController": false}, {"data": [[300.0, 5.0], [1500.0, 1.0], [200.0, 2.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-2", "isController": false}, {"data": [[300.0, 1.0], [100.0, 4.0], [200.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-3", "isController": false}, {"data": [[600.0, 1.0], [300.0, 1.0], [2600.0, 1.0], [700.0, 2.0], [400.0, 2.0], [800.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-22", "isController": false}, {"data": [[4500.0, 1.0], [2500.0, 1.0], [2600.0, 1.0], [2900.0, 3.0], [3000.0, 1.0], [3600.0, 1.0], [1900.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-4", "isController": false}, {"data": [[300.0, 1.0], [700.0, 2.0], [400.0, 3.0], [1700.0, 1.0], [500.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-21", "isController": false}, {"data": [[300.0, 1.0], [200.0, 5.0], [1600.0, 1.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-5", "isController": false}, {"data": [[300.0, 3.0], [100.0, 2.0], [200.0, 4.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-24", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 2.0], [700.0, 1.0], [800.0, 1.0], [400.0, 1.0], [1700.0, 1.0], [500.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-6", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [700.0, 2.0], [400.0, 3.0], [900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-23", "isController": false}, {"data": [[600.0, 2.0], [2500.0, 1.0], [1500.0, 2.0], [100.0, 1.0], [900.0, 2.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-7", "isController": false}, {"data": [[4300.0, 1.0], [4600.0, 1.0], [4400.0, 1.0], [6100.0, 1.0], [3300.0, 1.0], [3400.0, 1.0], [3600.0, 2.0], [3800.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD", "isController": false}, {"data": [[0.0, 5.0], [2200.0, 1.0], [300.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-20", "isController": false}, {"data": [[0.0, 5.0], [300.0, 1.0], [100.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-21", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 15900.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 2.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 624.0, "series": [{"data": [[0.0, 624.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 266.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 67.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 2.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 2.2980769230769234, "minX": 1.68545322E12, "maxY": 6.761363636363639, "series": [{"data": [[1.68545334E12, 3.285714285714287], [1.68545328E12, 6.761363636363639], [1.68545322E12, 2.2980769230769234]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68545334E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 43.0, "minX": 1.0, "maxY": 15933.0, "series": [{"data": [[8.0, 477.0], [4.0, 857.0], [2.0, 1016.0], [1.0, 385.0], [9.0, 536.0], [5.0, 430.0], [6.0, 512.0], [3.0, 167.0], [7.0, 388.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-19", "isController": false}, {"data": [[5.4, 530.4000000000001]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-19-Aggregated", "isController": false}, {"data": [[8.0, 2682.0], [4.0, 3900.0], [2.0, 2477.0], [1.0, 2309.0], [9.0, 2974.0], [5.0, 2877.0], [6.0, 3287.0], [3.0, 2913.0], [7.0, 2938.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/", "isController": false}, {"data": [[5.4, 2933.1]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-Aggregated", "isController": false}, {"data": [[8.0, 963.0], [4.0, 300.0], [2.0, 96.0], [1.0, 330.0], [9.0, 783.0], [5.0, 96.0], [6.0, 100.0], [3.0, 95.0], [7.0, 344.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-10", "isController": false}, {"data": [[5.4, 389.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-10-Aggregated", "isController": false}, {"data": [[8.0, 109.0], [4.0, 124.0], [2.0, 157.0], [1.0, 326.0], [9.0, 119.0], [5.0, 352.0], [6.0, 828.0], [3.0, 378.0], [7.0, 346.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-12", "isController": false}, {"data": [[5.4, 285.79999999999995]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-12-Aggregated", "isController": false}, {"data": [[8.0, 103.0], [4.0, 295.0], [2.0, 332.0], [1.0, 334.0], [9.0, 762.0], [5.0, 325.0], [6.0, 104.0], [3.0, 301.0], [7.0, 319.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-11", "isController": false}, {"data": [[5.4, 363.69999999999993]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-11-Aggregated", "isController": false}, {"data": [[8.0, 616.0], [4.0, 909.0], [2.0, 1053.0], [1.0, 970.0], [9.0, 750.0], [5.0, 751.0], [6.0, 1907.0], [3.0, 1575.0], [7.0, 1307.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-14", "isController": false}, {"data": [[5.4, 1058.8000000000002]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-14-Aggregated", "isController": false}, {"data": [[8.0, 513.0], [4.0, 199.0], [2.0, 198.0], [1.0, 206.0], [9.0, 532.0], [5.0, 190.0], [6.0, 742.0], [3.0, 140.0], [7.0, 725.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-13", "isController": false}, {"data": [[5.4, 397.7]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-13-Aggregated", "isController": false}, {"data": [[8.0, 430.0], [4.0, 116.0], [2.0, 131.0], [1.0, 492.0], [9.0, 296.5], [5.0, 1382.0], [6.0, 114.0], [3.0, 505.0], [7.0, 483.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-16", "isController": false}, {"data": [[5.4, 424.59999999999997]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-16-Aggregated", "isController": false}, {"data": [[8.0, 101.0], [4.0, 1364.0], [2.0, 137.0], [1.0, 162.0], [9.0, 215.0], [5.0, 338.0], [6.0, 117.0], [3.0, 358.0], [7.0, 124.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-15", "isController": false}, {"data": [[5.4, 313.1]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-15-Aggregated", "isController": false}, {"data": [[8.0, 228.0], [4.0, 1061.0], [2.0, 313.0], [1.0, 723.0], [9.0, 510.0], [5.0, 323.0], [6.0, 225.0], [3.0, 296.0], [7.0, 320.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-18", "isController": false}, {"data": [[5.4, 450.90000000000003]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-18-Aggregated", "isController": false}, {"data": [[8.0, 492.0], [4.0, 101.0], [2.0, 97.0], [1.0, 480.0], [9.0, 350.0], [5.0, 104.0], [6.0, 124.0], [3.0, 305.0], [7.0, 328.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-17", "isController": false}, {"data": [[5.4, 273.1]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-17-Aggregated", "isController": false}, {"data": [[4.0, 72.0], [8.0, 194.5], [5.0, 60.0], [3.0, 52.0], [6.0, 96.0], [7.0, 249.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-16", "isController": false}, {"data": [[6.1, 151.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-16-Aggregated", "isController": false}, {"data": [[4.0, 107.0], [8.0, 289.0], [5.0, 105.0], [3.0, 104.0], [6.0, 101.5], [7.0, 238.33333333333334]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-17", "isController": false}, {"data": [[6.1, 181.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-17-Aggregated", "isController": false}, {"data": [[4.0, 152.0], [8.0, 229.5], [5.0, 134.0], [3.0, 293.0], [6.0, 395.0], [7.0, 454.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-18", "isController": false}, {"data": [[6.1, 319.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-18-Aggregated", "isController": false}, {"data": [[4.0, 436.0], [8.0, 1155.5], [5.0, 335.0], [3.0, 122.0], [6.0, 511.0], [7.0, 394.6666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-19", "isController": false}, {"data": [[6.1, 541.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-19-Aggregated", "isController": false}, {"data": [[8.0, 94.0], [4.0, 192.5], [6.0, 117.66666666666667], [7.0, 138.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-3", "isController": false}, {"data": [[6.2, 138.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-3-Aggregated", "isController": false}, {"data": [[8.0, 287.0], [4.0, 346.0], [6.0, 435.6666666666667], [7.0, 304.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-2", "isController": false}, {"data": [[6.2, 350.40000000000003]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-2-Aggregated", "isController": false}, {"data": [[4.0, 101.0], [8.0, 356.0], [5.0, 110.0], [3.0, 349.0], [6.0, 333.0], [7.0, 247.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-10", "isController": false}, {"data": [[6.1, 267.9]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-10-Aggregated", "isController": false}, {"data": [[8.0, 304.0], [4.0, 317.0], [6.0, 307.3333333333333], [7.0, 262.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-5", "isController": false}, {"data": [[6.2, 290.99999999999994]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-5-Aggregated", "isController": false}, {"data": [[4.0, 100.0], [8.0, 233.5], [5.0, 308.0], [3.0, 423.0], [6.0, 332.0], [7.0, 318.3333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-11", "isController": false}, {"data": [[6.1, 291.7]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-11-Aggregated", "isController": false}, {"data": [[8.0, 47.0], [4.0, 46.5], [6.0, 46.0], [7.0, 44.75]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-4", "isController": false}, {"data": [[6.2, 45.699999999999996]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-4-Aggregated", "isController": false}, {"data": [[4.0, 61.0], [8.0, 107.5], [5.0, 72.0], [3.0, 63.0], [6.0, 341.5], [7.0, 122.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-12", "isController": false}, {"data": [[6.1, 146.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-12-Aggregated", "isController": false}, {"data": [[8.0, 447.0], [4.0, 582.5], [6.0, 449.0], [7.0, 812.75]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-7", "isController": false}, {"data": [[6.2, 621.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-7-Aggregated", "isController": false}, {"data": [[4.0, 727.0], [8.0, 734.0], [5.0, 490.0], [3.0, 739.0], [6.0, 757.5], [7.0, 716.6666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-13", "isController": false}, {"data": [[6.1, 708.9000000000001]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-13-Aggregated", "isController": false}, {"data": [[8.0, 834.0], [4.0, 1031.5], [6.0, 908.0], [7.0, 892.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-6", "isController": false}, {"data": [[6.2, 918.9]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-6-Aggregated", "isController": false}, {"data": [[4.0, 293.0], [8.0, 808.5], [5.0, 485.0], [3.0, 320.0], [6.0, 984.0], [7.0, 892.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-14", "isController": false}, {"data": [[6.1, 735.9]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-14-Aggregated", "isController": false}, {"data": [[8.0, 493.0], [4.0, 1297.5], [6.0, 644.6666666666666], [7.0, 723.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-9", "isController": false}, {"data": [[6.2, 791.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-9-Aggregated", "isController": false}, {"data": [[8.0, 91.0], [4.0, 378.0], [2.0, 290.0], [1.0, 138.0], [9.0, 308.0], [5.0, 106.0], [6.0, 112.0], [3.0, 137.0], [7.0, 119.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-21", "isController": false}, {"data": [[5.4, 198.70000000000002]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-21-Aggregated", "isController": false}, {"data": [[4.0, 62.0], [8.0, 225.0], [5.0, 199.0], [3.0, 108.0], [6.0, 309.5], [7.0, 115.33333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-15", "isController": false}, {"data": [[6.1, 178.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-15-Aggregated", "isController": false}, {"data": [[8.0, 273.0], [4.0, 364.0], [6.0, 643.0], [7.0, 343.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-8", "isController": false}, {"data": [[6.2, 430.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-8-Aggregated", "isController": false}, {"data": [[8.0, 92.0], [4.0, 127.0], [2.0, 826.0], [1.0, 159.0], [9.0, 305.5], [5.0, 1389.0], [6.0, 117.0], [3.0, 137.0], [7.0, 120.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-20", "isController": false}, {"data": [[5.4, 357.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-20-Aggregated", "isController": false}, {"data": [[8.0, 259.0], [4.0, 244.0], [6.0, 247.0], [7.0, 797.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-20", "isController": false}, {"data": [[6.2, 467.59999999999997]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-20-Aggregated", "isController": false}, {"data": [[8.0, 277.0], [4.0, 117.0], [6.0, 580.3333333333334], [7.0, 190.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-21", "isController": false}, {"data": [[6.2, 301.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-21-Aggregated", "isController": false}, {"data": [[1.0, 315.0], [2.0, 323.0], [4.0, 285.0], [8.0, 523.3333333333334], [5.0, 805.0], [3.0, 435.0], [6.0, 721.0], [7.0, 661.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-5", "isController": false}, {"data": [[5.2, 511.5]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-5-Aggregated", "isController": false}, {"data": [[1.0, 324.0], [2.0, 338.0], [4.0, 354.0], [8.0, 375.0], [5.0, 310.0], [3.0, 329.0], [6.0, 306.0], [7.0, 638.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-6", "isController": false}, {"data": [[5.2, 372.40000000000003]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-6-Aggregated", "isController": false}, {"data": [[1.0, 396.0], [2.0, 416.0], [4.0, 440.0], [8.0, 435.3333333333333], [5.0, 442.0], [3.0, 404.0], [6.0, 403.0], [7.0, 901.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-7", "isController": false}, {"data": [[5.2, 470.80000000000007]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-7-Aggregated", "isController": false}, {"data": [[1.0, 574.0], [2.0, 642.0], [4.0, 578.0], [8.0, 577.0], [5.0, 562.0], [3.0, 572.0], [6.0, 561.0], [7.0, 997.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-8", "isController": false}, {"data": [[5.2, 621.7]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-8-Aggregated", "isController": false}, {"data": [[1.0, 510.0], [2.0, 569.0], [4.0, 502.0], [8.0, 505.0], [5.0, 495.0], [3.0, 505.0], [6.0, 534.0], [7.0, 816.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-9", "isController": false}, {"data": [[5.2, 544.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-9-Aggregated", "isController": false}, {"data": [[8.0, 83.0], [4.0, 120.5], [6.0, 181.66666666666666], [7.0, 98.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-1", "isController": false}, {"data": [[6.2, 126.1]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-1-Aggregated", "isController": false}, {"data": [[8.0, 3353.0], [4.0, 658.0], [6.0, 758.6666666666666], [7.0, 807.75]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-0", "isController": false}, {"data": [[6.2, 1017.6000000000003]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-0-Aggregated", "isController": false}, {"data": [[1.0, 1543.0], [2.0, 2015.0], [4.0, 1781.0], [8.0, 1851.6666666666667], [5.0, 1650.0], [3.0, 1076.0], [6.0, 1838.0], [7.0, 1786.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-0", "isController": false}, {"data": [[5.2, 1724.4]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-0-Aggregated", "isController": false}, {"data": [[1.0, 248.0], [2.0, 224.0], [4.0, 1183.0], [8.0, 387.0], [5.0, 216.0], [3.0, 278.0], [6.0, 235.0], [7.0, 741.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-1", "isController": false}, {"data": [[5.2, 428.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-1-Aggregated", "isController": false}, {"data": [[1.0, 302.0], [2.0, 344.0], [4.0, 1342.0], [8.0, 683.6666666666666], [5.0, 329.0], [3.0, 408.0], [6.0, 464.0], [7.0, 1078.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-2", "isController": false}, {"data": [[5.2, 631.8]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-2-Aggregated", "isController": false}, {"data": [[1.0, 350.0], [2.0, 386.0], [4.0, 342.0], [8.0, 911.6666666666666], [5.0, 483.0], [3.0, 537.0], [6.0, 458.0], [7.0, 728.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-3", "isController": false}, {"data": [[5.2, 601.9]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-3-Aggregated", "isController": false}, {"data": [[1.0, 254.0], [2.0, 202.0], [4.0, 1168.0], [8.0, 1353.3333333333333], [5.0, 213.0], [3.0, 496.0], [6.0, 227.0], [7.0, 342.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-4", "isController": false}, {"data": [[5.2, 696.2]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-4-Aggregated", "isController": false}, {"data": [[8.0, 91.0], [4.0, 473.0], [6.0, 106.0], [7.0, 490.25]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-15", "isController": false}, {"data": [[6.2, 331.59999999999997]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-15-Aggregated", "isController": false}, {"data": [[8.0, 627.0], [4.0, 1390.5], [6.0, 174.0], [7.0, 312.75]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-16", "isController": false}, {"data": [[6.2, 518.1]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-16-Aggregated", "isController": false}, {"data": [[8.0, 198.0], [4.0, 718.5], [6.0, 371.3333333333333], [7.0, 985.25]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-13", "isController": false}, {"data": [[6.2, 669.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-13-Aggregated", "isController": false}, {"data": [[8.0, 720.0], [4.0, 982.0], [6.0, 855.3333333333334], [7.0, 1064.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-14", "isController": false}, {"data": [[6.2, 950.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-14-Aggregated", "isController": false}, {"data": [[8.0, 307.0], [4.0, 306.0], [6.0, 314.6666666666667], [7.0, 333.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-11", "isController": false}, {"data": [[6.2, 319.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-11-Aggregated", "isController": false}, {"data": [[8.0, 104.0], [4.0, 513.0], [6.0, 191.66666666666666], [7.0, 211.75]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-12", "isController": false}, {"data": [[6.2, 255.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-12-Aggregated", "isController": false}, {"data": [[8.0, 309.0], [4.0, 302.5], [6.0, 308.3333333333333], [7.0, 324.25]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-10", "isController": false}, {"data": [[6.2, 313.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-10-Aggregated", "isController": false}, {"data": [[8.0, 303.0], [4.0, 742.0], [6.0, 514.6666666666666], [7.0, 1045.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-19", "isController": false}, {"data": [[6.2, 751.3000000000001]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-19-Aggregated", "isController": false}, {"data": [[8.0, 100.0], [4.0, 97.5], [6.0, 106.0], [7.0, 257.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-17", "isController": false}, {"data": [[6.2, 164.10000000000002]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-17-Aggregated", "isController": false}, {"data": [[8.0, 207.0], [4.0, 221.0], [6.0, 538.0], [7.0, 318.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-18", "isController": false}, {"data": [[6.2, 353.70000000000005]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-18-Aggregated", "isController": false}, {"data": [[1.0, 171.0], [2.0, 220.0], [4.0, 168.0], [8.0, 304.6666666666667], [5.0, 358.0], [3.0, 231.0], [6.0, 358.0], [7.0, 759.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-15", "isController": false}, {"data": [[5.2, 317.90000000000003]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-15-Aggregated", "isController": false}, {"data": [[1.0, 213.0], [2.0, 223.0], [4.0, 212.0], [8.0, 201.66666666666666], [5.0, 203.0], [3.0, 208.0], [6.0, 261.0], [7.0, 198.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-14", "isController": false}, {"data": [[5.2, 212.3]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-14-Aggregated", "isController": false}, {"data": [[1.0, 99.0], [2.0, 109.0], [4.0, 96.0], [8.0, 111.0], [5.0, 100.0], [3.0, 100.0], [6.0, 111.0], [7.0, 258.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-17", "isController": false}, {"data": [[5.2, 120.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-17-Aggregated", "isController": false}, {"data": [[1.0, 184.0], [2.0, 202.0], [4.0, 168.0], [8.0, 477.0], [5.0, 227.0], [3.0, 544.0], [6.0, 299.0], [7.0, 323.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-16", "isController": false}, {"data": [[5.2, 337.8]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-16-Aggregated", "isController": false}, {"data": [[4.0, 1787.0], [8.0, 3135.5], [5.0, 4337.0], [3.0, 1821.0], [6.0, 2565.0], [7.0, 2594.3333333333335]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/", "isController": false}, {"data": [[6.1, 2712.8999999999996]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-Aggregated", "isController": false}, {"data": [[1.0, 308.0], [2.0, 357.0], [4.0, 313.0], [8.0, 433.6666666666667], [5.0, 370.0], [3.0, 317.0], [6.0, 359.0], [7.0, 335.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-19", "isController": false}, {"data": [[5.2, 366.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-19-Aggregated", "isController": false}, {"data": [[1.0, 338.0], [2.0, 364.0], [4.0, 1370.0], [8.0, 667.3333333333334], [5.0, 451.0], [3.0, 1371.0], [6.0, 493.0], [7.0, 558.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-18", "isController": false}, {"data": [[5.2, 694.7]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-18-Aggregated", "isController": false}, {"data": [[8.0, 11106.0], [4.0, 14243.0], [2.0, 12069.0], [1.0, 13029.0], [9.0, 12295.5], [5.0, 13221.0], [6.0, 15933.0], [3.0, 12906.0], [7.0, 14337.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[5.4, 13143.5]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[1.0, 467.0], [2.0, 263.0], [4.0, 286.0], [8.0, 259.6666666666667], [5.0, 282.0], [3.0, 256.0], [6.0, 488.0], [7.0, 267.0]], "isOverall": false, "label": "https://my.daraz.com.bd/api/recentOrders/", "isController": false}, {"data": [[5.2, 308.8]], "isOverall": false, "label": "https://my.daraz.com.bd/api/recentOrders/-Aggregated", "isController": false}, {"data": [[1.0, 434.0], [2.0, 428.0], [4.0, 126.0], [8.0, 334.0], [5.0, 440.0], [3.0, 446.0], [6.0, 465.0], [7.0, 662.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-11", "isController": false}, {"data": [[5.2, 400.3]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-11-Aggregated", "isController": false}, {"data": [[1.0, 521.0], [2.0, 550.0], [4.0, 253.0], [8.0, 538.3333333333334], [5.0, 532.0], [3.0, 518.0], [6.0, 698.0], [7.0, 759.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-10", "isController": false}, {"data": [[5.2, 544.6]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-10-Aggregated", "isController": false}, {"data": [[1.0, 121.0], [2.0, 514.0], [4.0, 110.0], [8.0, 138.0], [5.0, 104.0], [3.0, 110.0], [6.0, 348.0], [7.0, 118.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-13", "isController": false}, {"data": [[5.2, 183.9]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-13-Aggregated", "isController": false}, {"data": [[1.0, 429.0], [2.0, 583.0], [4.0, 128.0], [8.0, 272.3333333333333], [5.0, 174.0], [3.0, 435.0], [6.0, 154.0], [7.0, 447.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-12", "isController": false}, {"data": [[5.2, 316.7]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-12-Aggregated", "isController": false}, {"data": [[4.0, 137.0], [8.0, 309.0], [5.0, 1359.0], [3.0, 66.0], [6.0, 904.5], [7.0, 460.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-7", "isController": false}, {"data": [[6.1, 536.9]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-7-Aggregated", "isController": false}, {"data": [[8.0, 952.0], [4.0, 133.0], [2.0, 803.0], [1.0, 515.0], [9.0, 287.0], [5.0, 114.0], [6.0, 350.0], [3.0, 1384.0], [7.0, 1470.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-8", "isController": false}, {"data": [[5.4, 629.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-8-Aggregated", "isController": false}, {"data": [[4.0, 109.0], [8.0, 325.0], [5.0, 198.0], [3.0, 111.0], [6.0, 771.5], [7.0, 445.6666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-8", "isController": false}, {"data": [[6.1, 394.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-8-Aggregated", "isController": false}, {"data": [[8.0, 1555.0], [4.0, 254.0], [2.0, 670.0], [1.0, 818.0], [9.0, 891.5], [5.0, 297.0], [6.0, 1881.0], [3.0, 1061.0], [7.0, 627.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-9", "isController": false}, {"data": [[5.4, 894.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-9-Aggregated", "isController": false}, {"data": [[4.0, 186.0], [8.0, 539.0], [5.0, 458.0], [3.0, 88.0], [6.0, 702.0], [7.0, 657.3333333333334]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-9", "isController": false}, {"data": [[6.1, 518.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-9-Aggregated", "isController": false}, {"data": [[4.0, 93.0], [8.0, 112.5], [5.0, 152.0], [3.0, 72.0], [6.0, 107.0], [7.0, 411.3333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-3", "isController": false}, {"data": [[6.1, 199.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-3-Aggregated", "isController": false}, {"data": [[4.0, 148.0], [8.0, 248.5], [5.0, 230.0], [3.0, 253.0], [6.0, 256.0], [7.0, 315.6666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-4", "isController": false}, {"data": [[6.1, 258.7]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-4-Aggregated", "isController": false}, {"data": [[4.0, 215.0], [8.0, 326.5], [5.0, 323.0], [3.0, 301.0], [6.0, 349.0], [7.0, 490.6666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-5", "isController": false}, {"data": [[6.1, 366.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-5-Aggregated", "isController": false}, {"data": [[4.0, 581.0], [8.0, 991.0], [5.0, 789.0], [3.0, 588.0], [6.0, 1025.0], [7.0, 1264.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-6", "isController": false}, {"data": [[6.1, 978.1999999999999]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-6-Aggregated", "isController": false}, {"data": [[4.0, 784.0], [8.0, 964.5], [5.0, 1139.0], [3.0, 760.0], [6.0, 816.0], [7.0, 851.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-0", "isController": false}, {"data": [[6.1, 879.7]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-0-Aggregated", "isController": false}, {"data": [[4.0, 57.0], [8.0, 99.5], [5.0, 342.0], [3.0, 66.0], [6.0, 90.0], [7.0, 387.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-1", "isController": false}, {"data": [[6.1, 200.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-1-Aggregated", "isController": false}, {"data": [[4.0, 264.0], [8.0, 569.0], [5.0, 286.0], [3.0, 268.0], [6.0, 382.0], [7.0, 529.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-2", "isController": false}, {"data": [[6.1, 430.70000000000005]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-2-Aggregated", "isController": false}, {"data": [[8.0, 787.0], [4.0, 1491.0], [2.0, 577.0], [1.0, 561.0], [9.0, 590.0], [5.0, 730.0], [6.0, 921.0], [3.0, 527.0], [7.0, 926.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-0", "isController": false}, {"data": [[5.4, 770.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-0-Aggregated", "isController": false}, {"data": [[8.0, 102.0], [4.0, 403.0], [2.0, 445.0], [1.0, 135.0], [9.0, 226.5], [5.0, 111.0], [6.0, 114.0], [3.0, 120.0], [7.0, 118.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-1", "isController": false}, {"data": [[5.4, 200.10000000000002]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-1-Aggregated", "isController": false}, {"data": [[1.0, 286.0], [2.0, 304.0], [4.0, 284.0], [8.0, 297.3333333333333], [5.0, 308.0], [3.0, 292.0], [6.0, 296.0], [7.0, 297.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-20", "isController": false}, {"data": [[5.2, 295.9]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-20-Aggregated", "isController": false}, {"data": [[8.0, 443.0], [4.0, 1544.0], [2.0, 375.0], [1.0, 306.0], [9.0, 246.5], [5.0, 368.0], [6.0, 342.0], [3.0, 500.0], [7.0, 324.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-2", "isController": false}, {"data": [[5.4, 469.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-2-Aggregated", "isController": false}, {"data": [[8.0, 205.0], [4.0, 555.0], [2.0, 339.0], [1.0, 166.0], [9.0, 106.5], [5.0, 231.0], [6.0, 264.0], [3.0, 142.0], [7.0, 242.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-3", "isController": false}, {"data": [[5.4, 235.70000000000002]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-3-Aggregated", "isController": false}, {"data": [[1.0, 613.0], [2.0, 442.0], [4.0, 412.0], [8.0, 1372.3333333333333], [5.0, 515.0], [3.0, 359.0], [6.0, 528.0], [7.0, 856.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-22", "isController": false}, {"data": [[5.2, 784.1999999999999]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-22-Aggregated", "isController": false}, {"data": [[8.0, 4588.0], [4.0, 2972.0], [6.0, 2765.3333333333335], [7.0, 3088.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/", "isController": false}, {"data": [[6.2, 3118.2000000000003]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-Aggregated", "isController": false}, {"data": [[8.0, 46.0], [4.0, 45.0], [2.0, 50.0], [1.0, 60.0], [9.0, 45.0], [5.0, 43.0], [6.0, 53.0], [3.0, 46.0], [7.0, 49.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-4", "isController": false}, {"data": [[5.4, 48.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-4-Aggregated", "isController": false}, {"data": [[1.0, 457.0], [2.0, 477.0], [4.0, 423.0], [8.0, 1173.3333333333333], [5.0, 573.0], [3.0, 357.0], [6.0, 598.0], [7.0, 773.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-21", "isController": false}, {"data": [[5.2, 717.8]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-21-Aggregated", "isController": false}, {"data": [[8.0, 517.0], [4.0, 1680.0], [2.0, 471.0], [1.0, 317.0], [9.0, 265.5], [5.0, 265.0], [6.0, 280.0], [3.0, 441.0], [7.0, 281.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-5", "isController": false}, {"data": [[5.4, 478.3]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-5-Aggregated", "isController": false}, {"data": [[1.0, 161.0], [2.0, 221.0], [4.0, 492.0], [8.0, 285.3333333333333], [5.0, 225.0], [3.0, 187.0], [6.0, 360.0], [7.0, 337.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-24", "isController": false}, {"data": [[5.2, 283.9]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-24-Aggregated", "isController": false}, {"data": [[8.0, 547.0], [4.0, 1718.0], [2.0, 546.0], [1.0, 1013.0], [9.0, 1021.5], [5.0, 751.0], [6.0, 400.0], [3.0, 676.0], [7.0, 689.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-6", "isController": false}, {"data": [[5.4, 838.3000000000001]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-6-Aggregated", "isController": false}, {"data": [[1.0, 398.0], [2.0, 420.0], [4.0, 453.0], [8.0, 803.3333333333334], [5.0, 514.0], [3.0, 453.0], [6.0, 592.0], [7.0, 719.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-23", "isController": false}, {"data": [[5.2, 595.9]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-23-Aggregated", "isController": false}, {"data": [[8.0, 1539.0], [4.0, 186.0], [2.0, 615.0], [1.0, 1031.0], [9.0, 1764.0], [5.0, 581.0], [6.0, 657.0], [3.0, 1534.0], [7.0, 982.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-7", "isController": false}, {"data": [[5.4, 1065.3]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-7-Aggregated", "isController": false}, {"data": [[2.0, 3632.0], [4.0, 4353.0], [8.0, 4884.0], [5.0, 3354.0], [3.0, 3424.0], [6.0, 3649.0], [7.0, 4466.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD", "isController": false}, {"data": [[5.666666666666667, 4170.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-Aggregated", "isController": false}, {"data": [[4.0, 64.0], [8.0, 100.0], [5.0, 2284.0], [3.0, 62.0], [6.0, 91.5], [7.0, 189.66666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-20", "isController": false}, {"data": [[6.1, 336.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-20-Aggregated", "isController": false}, {"data": [[4.0, 50.0], [8.0, 98.5], [5.0, 62.0], [3.0, 89.0], [6.0, 245.5], [7.0, 149.33333333333334]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-21", "isController": false}, {"data": [[6.1, 133.7]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-21-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 9.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 1438.2166666666667, "minX": 1.68545322E12, "maxY": 2672386.0166666666, "series": [{"data": [[1.68545334E12, 679428.6333333333], [1.68545328E12, 2672386.0166666666], [1.68545322E12, 280672.68333333335]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.68545334E12, 2144.1], [1.68545328E12, 10008.416666666666], [1.68545322E12, 1438.2166666666667]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68545334E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 45.5, "minX": 1.68545322E12, "maxY": 13433.444444444445, "series": [{"data": [[1.68545334E12, 571.0], [1.68545328E12, 489.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-19", "isController": false}, {"data": [[1.68545334E12, 2895.2], [1.68545328E12, 2971.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/", "isController": false}, {"data": [[1.68545334E12, 183.4], [1.68545328E12, 594.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-10", "isController": false}, {"data": [[1.68545334E12, 267.4], [1.68545328E12, 304.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-12", "isController": false}, {"data": [[1.68545334E12, 317.4], [1.68545328E12, 410.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-11", "isController": false}, {"data": [[1.68545334E12, 1051.6], [1.68545328E12, 1066.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-14", "isController": false}, {"data": [[1.68545334E12, 186.6], [1.68545328E12, 608.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-13", "isController": false}, {"data": [[1.68545334E12, 525.2], [1.68545328E12, 324.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-16", "isController": false}, {"data": [[1.68545334E12, 471.8], [1.68545328E12, 154.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-15", "isController": false}, {"data": [[1.68545334E12, 543.2], [1.68545328E12, 358.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-18", "isController": false}, {"data": [[1.68545334E12, 217.4], [1.68545328E12, 328.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-17", "isController": false}, {"data": [[1.68545328E12, 162.22222222222226], [1.68545322E12, 52.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-16", "isController": false}, {"data": [[1.68545328E12, 189.7777777777778], [1.68545322E12, 104.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-17", "isController": false}, {"data": [[1.68545328E12, 321.8888888888889], [1.68545322E12, 293.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-18", "isController": false}, {"data": [[1.68545328E12, 587.5555555555555], [1.68545322E12, 122.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-19", "isController": false}, {"data": [[1.68545334E12, 192.5], [1.68545328E12, 125.125]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-3", "isController": false}, {"data": [[1.68545334E12, 346.0], [1.68545328E12, 351.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-2", "isController": false}, {"data": [[1.68545328E12, 258.8888888888889], [1.68545322E12, 349.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-10", "isController": false}, {"data": [[1.68545334E12, 317.0], [1.68545328E12, 284.49999999999994]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-5", "isController": false}, {"data": [[1.68545328E12, 277.1111111111111], [1.68545322E12, 423.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-11", "isController": false}, {"data": [[1.68545334E12, 46.5], [1.68545328E12, 45.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-4", "isController": false}, {"data": [[1.68545328E12, 155.22222222222223], [1.68545322E12, 63.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-12", "isController": false}, {"data": [[1.68545334E12, 582.5], [1.68545328E12, 630.625]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-7", "isController": false}, {"data": [[1.68545328E12, 705.5555555555555], [1.68545322E12, 739.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-13", "isController": false}, {"data": [[1.68545334E12, 1031.5], [1.68545328E12, 890.75]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-6", "isController": false}, {"data": [[1.68545328E12, 782.1111111111111], [1.68545322E12, 320.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-14", "isController": false}, {"data": [[1.68545334E12, 1297.5], [1.68545328E12, 665.125]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-9", "isController": false}, {"data": [[1.68545334E12, 209.8], [1.68545328E12, 187.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-21", "isController": false}, {"data": [[1.68545328E12, 186.22222222222223], [1.68545322E12, 108.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-15", "isController": false}, {"data": [[1.68545334E12, 364.0], [1.68545328E12, 446.75]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-8", "isController": false}, {"data": [[1.68545334E12, 527.6], [1.68545328E12, 188.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-20", "isController": false}, {"data": [[1.68545334E12, 244.0], [1.68545328E12, 523.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-20", "isController": false}, {"data": [[1.68545334E12, 117.0], [1.68545328E12, 347.49999999999994]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-21", "isController": false}, {"data": [[1.68545328E12, 577.4285714285714], [1.68545322E12, 357.6666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-5", "isController": false}, {"data": [[1.68545328E12, 390.42857142857144], [1.68545322E12, 330.3333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-6", "isController": false}, {"data": [[1.68545328E12, 498.85714285714283], [1.68545322E12, 405.3333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-7", "isController": false}, {"data": [[1.68545328E12, 632.7142857142857], [1.68545322E12, 596.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-8", "isController": false}, {"data": [[1.68545328E12, 551.7142857142858], [1.68545322E12, 528.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-9", "isController": false}, {"data": [[1.68545334E12, 120.5], [1.68545328E12, 127.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-1", "isController": false}, {"data": [[1.68545334E12, 658.0], [1.68545328E12, 1107.5000000000002]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-0", "isController": false}, {"data": [[1.68545328E12, 1801.4285714285713], [1.68545322E12, 1544.6666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-0", "isController": false}, {"data": [[1.68545328E12, 505.14285714285717], [1.68545322E12, 250.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-1", "isController": false}, {"data": [[1.68545328E12, 752.0], [1.68545322E12, 351.3333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-2", "isController": false}, {"data": [[1.68545328E12, 678.0], [1.68545322E12, 424.3333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-3", "isController": false}, {"data": [[1.68545328E12, 858.5714285714287], [1.68545322E12, 317.3333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-4", "isController": false}, {"data": [[1.68545334E12, 473.0], [1.68545328E12, 296.25]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-15", "isController": false}, {"data": [[1.68545334E12, 1390.5], [1.68545328E12, 300.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-16", "isController": false}, {"data": [[1.68545334E12, 718.5], [1.68545328E12, 656.625]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-13", "isController": false}, {"data": [[1.68545334E12, 982.0], [1.68545328E12, 942.75]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-14", "isController": false}, {"data": [[1.68545334E12, 306.0], [1.68545328E12, 322.875]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-11", "isController": false}, {"data": [[1.68545334E12, 513.0], [1.68545328E12, 190.75]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-12", "isController": false}, {"data": [[1.68545334E12, 302.5], [1.68545328E12, 316.375]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-10", "isController": false}, {"data": [[1.68545334E12, 742.0], [1.68545328E12, 753.625]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-19", "isController": false}, {"data": [[1.68545334E12, 97.5], [1.68545328E12, 180.75]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-17", "isController": false}, {"data": [[1.68545334E12, 221.0], [1.68545328E12, 386.875]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-18", "isController": false}, {"data": [[1.68545328E12, 365.2857142857142], [1.68545322E12, 207.33333333333334]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-15", "isController": false}, {"data": [[1.68545328E12, 211.28571428571428], [1.68545322E12, 214.66666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-14", "isController": false}, {"data": [[1.68545328E12, 128.28571428571428], [1.68545322E12, 102.66666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-17", "isController": false}, {"data": [[1.68545328E12, 349.7142857142857], [1.68545322E12, 310.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-16", "isController": false}, {"data": [[1.68545328E12, 2812.0], [1.68545322E12, 1821.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/", "isController": false}, {"data": [[1.68545328E12, 382.57142857142856], [1.68545322E12, 327.3333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-19", "isController": false}, {"data": [[1.68545328E12, 696.2857142857143], [1.68545322E12, 691.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-18", "isController": false}, {"data": [[1.68545328E12, 13433.444444444445], [1.68545322E12, 10534.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.68545328E12, 300.2857142857143], [1.68545322E12, 328.6666666666667]], "isOverall": false, "label": "https://my.daraz.com.bd/api/recentOrders/", "isController": false}, {"data": [[1.68545328E12, 385.00000000000006], [1.68545322E12, 436.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-11", "isController": false}, {"data": [[1.68545328E12, 551.0], [1.68545322E12, 529.6666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-10", "isController": false}, {"data": [[1.68545328E12, 156.28571428571428], [1.68545322E12, 248.33333333333331]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-13", "isController": false}, {"data": [[1.68545328E12, 245.71428571428572], [1.68545322E12, 482.3333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-12", "isController": false}, {"data": [[1.68545328E12, 589.2222222222222], [1.68545322E12, 66.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-7", "isController": false}, {"data": [[1.68545334E12, 589.8], [1.68545328E12, 669.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-8", "isController": false}, {"data": [[1.68545328E12, 426.3333333333333], [1.68545322E12, 111.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-8", "isController": false}, {"data": [[1.68545334E12, 620.0], [1.68545328E12, 1169.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-9", "isController": false}, {"data": [[1.68545328E12, 566.4444444444445], [1.68545322E12, 88.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-9", "isController": false}, {"data": [[1.68545328E12, 213.11111111111114], [1.68545322E12, 72.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-3", "isController": false}, {"data": [[1.68545328E12, 259.3333333333333], [1.68545322E12, 253.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-4", "isController": false}, {"data": [[1.68545328E12, 373.44444444444446], [1.68545322E12, 301.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-5", "isController": false}, {"data": [[1.68545328E12, 1021.5555555555555], [1.68545322E12, 588.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-6", "isController": false}, {"data": [[1.68545328E12, 893.0], [1.68545322E12, 760.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-0", "isController": false}, {"data": [[1.68545328E12, 215.44444444444446], [1.68545322E12, 66.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-1", "isController": false}, {"data": [[1.68545328E12, 448.77777777777777], [1.68545322E12, 268.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-2", "isController": false}, {"data": [[1.68545334E12, 777.2], [1.68545328E12, 762.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-0", "isController": false}, {"data": [[1.68545334E12, 242.8], [1.68545328E12, 157.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-1", "isController": false}, {"data": [[1.68545328E12, 296.7142857142857], [1.68545322E12, 294.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-20", "isController": false}, {"data": [[1.68545334E12, 618.6], [1.68545328E12, 320.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-2", "isController": false}, {"data": [[1.68545334E12, 286.6], [1.68545328E12, 184.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-3", "isController": false}, {"data": [[1.68545328E12, 918.2857142857142], [1.68545322E12, 471.3333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-22", "isController": false}, {"data": [[1.68545334E12, 2972.0], [1.68545328E12, 3154.75]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/", "isController": false}, {"data": [[1.68545334E12, 48.8], [1.68545328E12, 47.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-4", "isController": false}, {"data": [[1.68545328E12, 841.0], [1.68545322E12, 430.3333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-21", "isController": false}, {"data": [[1.68545334E12, 634.8], [1.68545328E12, 321.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-5", "isController": false}, {"data": [[1.68545328E12, 324.2857142857143], [1.68545322E12, 189.66666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-24", "isController": false}, {"data": [[1.68545334E12, 940.8], [1.68545328E12, 735.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-6", "isController": false}, {"data": [[1.68545328E12, 669.7142857142857], [1.68545322E12, 423.6666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-23", "isController": false}, {"data": [[1.68545334E12, 789.4], [1.68545328E12, 1341.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-7", "isController": false}, {"data": [[1.68545328E12, 4353.428571428572], [1.68545322E12, 3528.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD", "isController": false}, {"data": [[1.68545328E12, 366.6666666666667], [1.68545322E12, 62.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-20", "isController": false}, {"data": [[1.68545328E12, 138.66666666666666], [1.68545322E12, 89.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-21", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68545334E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.68545322E12, "maxY": 2011.0, "series": [{"data": [[1.68545334E12, 217.6], [1.68545328E12, 188.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-19", "isController": false}, {"data": [[1.68545334E12, 349.4], [1.68545328E12, 291.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-10", "isController": false}, {"data": [[1.68545334E12, 266.6], [1.68545328E12, 303.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-12", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-11", "isController": false}, {"data": [[1.68545334E12, 217.0], [1.68545328E12, 307.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-14", "isController": false}, {"data": [[1.68545334E12, 91.4], [1.68545328E12, 390.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-13", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-16", "isController": false}, {"data": [[1.68545334E12, 471.8], [1.68545328E12, 154.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-15", "isController": false}, {"data": [[1.68545334E12, 352.2], [1.68545328E12, 195.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-18", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-17", "isController": false}, {"data": [[1.68545328E12, 0.0], [1.68545322E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-16", "isController": false}, {"data": [[1.68545328E12, 0.0], [1.68545322E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-17", "isController": false}, {"data": [[1.68545328E12, 150.44444444444446], [1.68545322E12, 201.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-18", "isController": false}, {"data": [[1.68545328E12, 281.1111111111111], [1.68545322E12, 83.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-19", "isController": false}, {"data": [[1.68545334E12, 188.5], [1.68545328E12, 119.99999999999999]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-3", "isController": false}, {"data": [[1.68545334E12, 138.0], [1.68545328E12, 105.875]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-2", "isController": false}, {"data": [[1.68545328E12, 0.0], [1.68545322E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-10", "isController": false}, {"data": [[1.68545334E12, 131.0], [1.68545328E12, 107.625]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-5", "isController": false}, {"data": [[1.68545328E12, 0.0], [1.68545322E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-11", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-4", "isController": false}, {"data": [[1.68545328E12, 99.88888888888889], [1.68545322E12, 62.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-12", "isController": false}, {"data": [[1.68545334E12, 422.5], [1.68545328E12, 494.87499999999994]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-7", "isController": false}, {"data": [[1.68545328E12, 424.77777777777777], [1.68545322E12, 457.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-13", "isController": false}, {"data": [[1.68545334E12, 137.5], [1.68545328E12, 129.125]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-6", "isController": false}, {"data": [[1.68545328E12, 215.33333333333337], [1.68545322E12, 111.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-14", "isController": false}, {"data": [[1.68545334E12, 872.5], [1.68545328E12, 504.625]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-9", "isController": false}, {"data": [[1.68545334E12, 209.8], [1.68545328E12, 187.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-21", "isController": false}, {"data": [[1.68545328E12, 186.22222222222223], [1.68545322E12, 108.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-15", "isController": false}, {"data": [[1.68545334E12, 364.0], [1.68545328E12, 446.75]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-8", "isController": false}, {"data": [[1.68545334E12, 527.6], [1.68545328E12, 187.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-20", "isController": false}, {"data": [[1.68545334E12, 244.0], [1.68545328E12, 523.375]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-20", "isController": false}, {"data": [[1.68545334E12, 117.0], [1.68545328E12, 347.49999999999994]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-21", "isController": false}, {"data": [[1.68545328E12, 315.42857142857144], [1.68545322E12, 247.66666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-5", "isController": false}, {"data": [[1.68545328E12, 390.2857142857143], [1.68545322E12, 330.3333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-6", "isController": false}, {"data": [[1.68545328E12, 396.14285714285717], [1.68545322E12, 306.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-7", "isController": false}, {"data": [[1.68545328E12, 384.0], [1.68545322E12, 335.6666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-8", "isController": false}, {"data": [[1.68545328E12, 358.85714285714283], [1.68545322E12, 332.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-9", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-1", "isController": false}, {"data": [[1.68545334E12, 383.5], [1.68545328E12, 385.875]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-0", "isController": false}, {"data": [[1.68545328E12, 304.14285714285717], [1.68545322E12, 331.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-0", "isController": false}, {"data": [[1.68545328E12, 504.7142857142857], [1.68545322E12, 249.66666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-1", "isController": false}, {"data": [[1.68545328E12, 581.1428571428571], [1.68545322E12, 239.66666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-2", "isController": false}, {"data": [[1.68545328E12, 395.0], [1.68545322E12, 254.66666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-3", "isController": false}, {"data": [[1.68545328E12, 858.5714285714287], [1.68545322E12, 317.3333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-4", "isController": false}, {"data": [[1.68545334E12, 473.0], [1.68545328E12, 296.125]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-15", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-16", "isController": false}, {"data": [[1.68545334E12, 438.0], [1.68545328E12, 416.875]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-13", "isController": false}, {"data": [[1.68545334E12, 277.5], [1.68545328E12, 216.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-14", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-11", "isController": false}, {"data": [[1.68545334E12, 253.0], [1.68545328E12, 190.375]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-12", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-10", "isController": false}, {"data": [[1.68545334E12, 201.5], [1.68545328E12, 361.375]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-19", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-17", "isController": false}, {"data": [[1.68545334E12, 141.0], [1.68545328E12, 272.75]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-18", "isController": false}, {"data": [[1.68545328E12, 365.1428571428571], [1.68545322E12, 207.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-15", "isController": false}, {"data": [[1.68545328E12, 211.28571428571428], [1.68545322E12, 214.66666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-14", "isController": false}, {"data": [[1.68545328E12, 128.28571428571428], [1.68545322E12, 102.66666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-17", "isController": false}, {"data": [[1.68545328E12, 349.5714285714286], [1.68545322E12, 310.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-16", "isController": false}, {"data": [[1.68545328E12, 452.11111111111114], [1.68545322E12, 429.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/", "isController": false}, {"data": [[1.68545328E12, 382.14285714285717], [1.68545322E12, 326.6666666666667]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-19", "isController": false}, {"data": [[1.68545328E12, 492.85714285714283], [1.68545322E12, 589.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-18", "isController": false}, {"data": [[1.68545328E12, 1750.3333333333333], [1.68545322E12, 2011.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.68545328E12, 300.2857142857143], [1.68545322E12, 328.6666666666667]], "isOverall": false, "label": "https://my.daraz.com.bd/api/recentOrders/", "isController": false}, {"data": [[1.68545328E12, 302.85714285714283], [1.68545322E12, 326.3333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-11", "isController": false}, {"data": [[1.68545328E12, 334.85714285714283], [1.68545322E12, 321.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-10", "isController": false}, {"data": [[1.68545328E12, 156.28571428571428], [1.68545322E12, 110.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-13", "isController": false}, {"data": [[1.68545328E12, 186.85714285714283], [1.68545322E12, 328.3333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-12", "isController": false}, {"data": [[1.68545328E12, 514.4444444444445], [1.68545322E12, 62.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-7", "isController": false}, {"data": [[1.68545334E12, 589.8], [1.68545328E12, 669.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-8", "isController": false}, {"data": [[1.68545328E12, 426.22222222222223], [1.68545322E12, 111.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-8", "isController": false}, {"data": [[1.68545334E12, 391.6], [1.68545328E12, 804.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-9", "isController": false}, {"data": [[1.68545328E12, 296.6666666666667], [1.68545322E12, 72.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-9", "isController": false}, {"data": [[1.68545328E12, 171.33333333333334], [1.68545322E12, 67.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-3", "isController": false}, {"data": [[1.68545328E12, 259.2222222222223], [1.68545322E12, 253.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-4", "isController": false}, {"data": [[1.68545328E12, 148.88888888888886], [1.68545322E12, 70.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-5", "isController": false}, {"data": [[1.68545328E12, 120.33333333333334], [1.68545322E12, 77.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-6", "isController": false}, {"data": [[1.68545328E12, 452.11111111111114], [1.68545322E12, 429.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-0", "isController": false}, {"data": [[1.68545328E12, 0.0], [1.68545322E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-1", "isController": false}, {"data": [[1.68545328E12, 171.55555555555554], [1.68545322E12, 75.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-2", "isController": false}, {"data": [[1.68545334E12, 349.4], [1.68545328E12, 291.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-0", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-1", "isController": false}, {"data": [[1.68545328E12, 294.0], [1.68545322E12, 293.3333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-20", "isController": false}, {"data": [[1.68545334E12, 305.2], [1.68545328E12, 136.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-2", "isController": false}, {"data": [[1.68545334E12, 238.0], [1.68545328E12, 181.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-3", "isController": false}, {"data": [[1.68545328E12, 627.7142857142857], [1.68545322E12, 274.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-22", "isController": false}, {"data": [[1.68545334E12, 383.5], [1.68545328E12, 385.875]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-4", "isController": false}, {"data": [[1.68545328E12, 425.42857142857144], [1.68545322E12, 212.33333333333334]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-21", "isController": false}, {"data": [[1.68545334E12, 381.4], [1.68545328E12, 137.4]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-5", "isController": false}, {"data": [[1.68545328E12, 324.2857142857143], [1.68545322E12, 189.66666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-24", "isController": false}, {"data": [[1.68545334E12, 214.0], [1.68545328E12, 130.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-6", "isController": false}, {"data": [[1.68545328E12, 282.99999999999994], [1.68545322E12, 192.33333333333334]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-23", "isController": false}, {"data": [[1.68545334E12, 571.8], [1.68545328E12, 1064.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-7", "isController": false}, {"data": [[1.68545328E12, 304.14285714285717], [1.68545322E12, 276.5]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD", "isController": false}, {"data": [[1.68545328E12, 366.6666666666667], [1.68545322E12, 62.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-20", "isController": false}, {"data": [[1.68545328E12, 138.55555555555554], [1.68545322E12, 89.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-21", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68545334E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.68545322E12, "maxY": 1269.0, "series": [{"data": [[1.68545334E12, 103.2], [1.68545328E12, 39.99999999999999]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-19", "isController": false}, {"data": [[1.68545334E12, 37.0], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/", "isController": false}, {"data": [[1.68545334E12, 87.2], [1.68545328E12, 492.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-10", "isController": false}, {"data": [[1.68545334E12, 99.2], [1.68545328E12, 167.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-12", "isController": false}, {"data": [[1.68545334E12, 214.2], [1.68545328E12, 308.8]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-11", "isController": false}, {"data": [[1.68545334E12, 48.6], [1.68545328E12, 171.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-14", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 303.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-13", "isController": false}, {"data": [[1.68545334E12, 301.8], [1.68545328E12, 170.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-16", "isController": false}, {"data": [[1.68545334E12, 343.2], [1.68545328E12, 41.60000000000001]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-15", "isController": false}, {"data": [[1.68545334E12, 186.6], [1.68545328E12, 41.00000000000001]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-18", "isController": false}, {"data": [[1.68545334E12, 110.2], [1.68545328E12, 220.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-17", "isController": false}, {"data": [[1.68545328E12, 70.33333333333333], [1.68545322E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-16", "isController": false}, {"data": [[1.68545328E12, 70.77777777777777], [1.68545322E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-17", "isController": false}, {"data": [[1.68545328E12, 26.444444444444443], [1.68545322E12, 139.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-18", "isController": false}, {"data": [[1.68545328E12, 162.66666666666666], [1.68545322E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-19", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-3", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-2", "isController": false}, {"data": [[1.68545328E12, 147.77777777777777], [1.68545322E12, 229.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-10", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-5", "isController": false}, {"data": [[1.68545328E12, 170.11111111111114], [1.68545322E12, 327.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-11", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-4", "isController": false}, {"data": [[1.68545328E12, 0.0], [1.68545322E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-12", "isController": false}, {"data": [[1.68545334E12, 244.5], [1.68545328E12, 331.12499999999994]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-7", "isController": false}, {"data": [[1.68545328E12, 333.3333333333333], [1.68545322E12, 363.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-13", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-6", "isController": false}, {"data": [[1.68545328E12, 60.888888888888886], [1.68545322E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-14", "isController": false}, {"data": [[1.68545334E12, 750.5], [1.68545328E12, 336.375]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-9", "isController": false}, {"data": [[1.68545334E12, 52.6], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-21", "isController": false}, {"data": [[1.68545328E12, 61.66666666666667], [1.68545322E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-15", "isController": false}, {"data": [[1.68545334E12, 244.0], [1.68545328E12, 328.375]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-8", "isController": false}, {"data": [[1.68545334E12, 392.2], [1.68545328E12, 82.39999999999999]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-20", "isController": false}, {"data": [[1.68545334E12, 119.5], [1.68545328E12, 231.24999999999997]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-20", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 253.375]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-21", "isController": false}, {"data": [[1.68545328E12, 189.85714285714286], [1.68545322E12, 163.66666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-5", "isController": false}, {"data": [[1.68545328E12, 268.0], [1.68545322E12, 231.33333333333334]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-6", "isController": false}, {"data": [[1.68545328E12, 287.7142857142857], [1.68545322E12, 205.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-7", "isController": false}, {"data": [[1.68545328E12, 263.0], [1.68545322E12, 229.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-8", "isController": false}, {"data": [[1.68545328E12, 253.57142857142856], [1.68545322E12, 226.66666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-9", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-1", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-0", "isController": false}, {"data": [[1.68545328E12, 244.85714285714286], [1.68545322E12, 267.3333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-0", "isController": false}, {"data": [[1.68545328E12, 393.8571428571429], [1.68545322E12, 158.33333333333334]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-1", "isController": false}, {"data": [[1.68545328E12, 431.57142857142856], [1.68545322E12, 157.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-2", "isController": false}, {"data": [[1.68545328E12, 242.0], [1.68545322E12, 155.66666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-3", "isController": false}, {"data": [[1.68545328E12, 774.8571428571429], [1.68545322E12, 247.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-4", "isController": false}, {"data": [[1.68545334E12, 245.5], [1.68545328E12, 179.50000000000003]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-15", "isController": false}, {"data": [[1.68545334E12, 1269.0], [1.68545328E12, 160.74999999999997]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-16", "isController": false}, {"data": [[1.68545334E12, 348.0], [1.68545328E12, 265.25]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-13", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 56.62499999999999]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-14", "isController": false}, {"data": [[1.68545334E12, 208.0], [1.68545328E12, 220.125]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-11", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 30.875]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-12", "isController": false}, {"data": [[1.68545334E12, 204.5], [1.68545328E12, 216.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-10", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 252.5]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-19", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 80.375]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-17", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 122.625]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-18", "isController": false}, {"data": [[1.68545328E12, 217.0], [1.68545322E12, 131.33333333333334]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-15", "isController": false}, {"data": [[1.68545328E12, 145.85714285714286], [1.68545322E12, 151.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-14", "isController": false}, {"data": [[1.68545328E12, 0.0], [1.68545322E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-17", "isController": false}, {"data": [[1.68545328E12, 181.85714285714286], [1.68545322E12, 130.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-16", "isController": false}, {"data": [[1.68545328E12, 0.0], [1.68545322E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/", "isController": false}, {"data": [[1.68545328E12, 231.57142857142856], [1.68545322E12, 221.33333333333334]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-19", "isController": false}, {"data": [[1.68545328E12, 369.0], [1.68545322E12, 474.3333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-18", "isController": false}, {"data": [[1.68545328E12, 489.1111111111111], [1.68545322E12, 778.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.68545328E12, 239.7142857142857], [1.68545322E12, 267.0]], "isOverall": false, "label": "https://my.daraz.com.bd/api/recentOrders/", "isController": false}, {"data": [[1.68545328E12, 184.42857142857142], [1.68545322E12, 221.33333333333334]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-11", "isController": false}, {"data": [[1.68545328E12, 223.14285714285714], [1.68545322E12, 219.33333333333334]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-10", "isController": false}, {"data": [[1.68545328E12, 34.14285714285714], [1.68545322E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-13", "isController": false}, {"data": [[1.68545328E12, 61.85714285714286], [1.68545322E12, 217.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-12", "isController": false}, {"data": [[1.68545328E12, 369.66666666666674], [1.68545322E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-7", "isController": false}, {"data": [[1.68545334E12, 439.2], [1.68545328E12, 415.2]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-8", "isController": false}, {"data": [[1.68545328E12, 308.1111111111111], [1.68545322E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-8", "isController": false}, {"data": [[1.68545334E12, 237.8], [1.68545328E12, 629.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-9", "isController": false}, {"data": [[1.68545328E12, 167.11111111111111], [1.68545322E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-9", "isController": false}, {"data": [[1.68545328E12, 0.0], [1.68545322E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-3", "isController": false}, {"data": [[1.68545328E12, 204.22222222222223], [1.68545322E12, 208.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-4", "isController": false}, {"data": [[1.68545328E12, 0.0], [1.68545322E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-5", "isController": false}, {"data": [[1.68545328E12, 0.0], [1.68545322E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-6", "isController": false}, {"data": [[1.68545328E12, 0.0], [1.68545322E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-0", "isController": false}, {"data": [[1.68545328E12, 0.0], [1.68545322E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-1", "isController": false}, {"data": [[1.68545328E12, 0.0], [1.68545322E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-2", "isController": false}, {"data": [[1.68545334E12, 37.0], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-0", "isController": false}, {"data": [[1.68545334E12, 56.0], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-1", "isController": false}, {"data": [[1.68545328E12, 194.2857142857143], [1.68545322E12, 196.33333333333334]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-20", "isController": false}, {"data": [[1.68545334E12, 52.2], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-2", "isController": false}, {"data": [[1.68545334E12, 55.2], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-3", "isController": false}, {"data": [[1.68545328E12, 484.0], [1.68545322E12, 216.33333333333334]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-22", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/", "isController": false}, {"data": [[1.68545334E12, 0.0], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-4", "isController": false}, {"data": [[1.68545328E12, 330.2857142857143], [1.68545322E12, 134.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-21", "isController": false}, {"data": [[1.68545334E12, 136.4], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-5", "isController": false}, {"data": [[1.68545328E12, 226.71428571428572], [1.68545322E12, 117.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-24", "isController": false}, {"data": [[1.68545334E12, 55.4], [1.68545328E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-6", "isController": false}, {"data": [[1.68545328E12, 182.85714285714286], [1.68545322E12, 133.66666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-23", "isController": false}, {"data": [[1.68545334E12, 391.0], [1.68545328E12, 942.6]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-7", "isController": false}, {"data": [[1.68545328E12, 244.85714285714286], [1.68545322E12, 214.0]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD", "isController": false}, {"data": [[1.68545328E12, 268.0], [1.68545322E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-20", "isController": false}, {"data": [[1.68545328E12, 0.0], [1.68545322E12, 0.0]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-21", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68545334E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 43.0, "minX": 1.68545322E12, "maxY": 6101.0, "series": [{"data": [[1.68545334E12, 3900.0], [1.68545328E12, 6101.0], [1.68545322E12, 3632.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.68545334E12, 1384.0], [1.68545328E12, 1234.8], [1.68545322E12, 630.4000000000002]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.68545334E12, 3377.400000000005], [1.68545328E12, 3892.519999999983], [1.68545322E12, 3623.6799999999985]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.68545334E12, 1718.0], [1.68545328E12, 1925.799999999995], [1.68545322E12, 1508.5999999999995]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.68545334E12, 43.0], [1.68545328E12, 44.0], [1.68545322E12, 52.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.68545334E12, 363.0], [1.68545328E12, 350.0], [1.68545322E12, 338.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68545334E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 109.0, "minX": 1.0, "maxY": 2913.0, "series": [{"data": [[2.0, 1746.5], [34.0, 559.5], [36.0, 324.0], [3.0, 1382.0], [4.0, 491.0], [5.0, 338.0], [6.0, 560.0], [7.0, 651.5], [8.0, 486.0], [9.0, 455.0], [10.0, 589.5], [11.0, 342.0], [13.0, 321.0], [14.0, 318.0], [15.0, 319.5], [1.0, 467.0], [16.0, 343.0], [17.0, 348.0], [20.0, 360.0], [21.0, 109.0], [24.0, 346.5], [25.0, 292.0], [26.0, 340.0], [27.0, 604.0], [30.0, 307.5]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[20.0, 167.0], [3.0, 2913.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 36.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 393.0, "series": [{"data": [[2.0, 342.5], [34.0, 258.0], [36.0, 134.0], [3.0, 303.0], [4.0, 327.0], [5.0, 140.0], [6.0, 279.0], [7.0, 317.0], [8.0, 164.5], [9.0, 341.0], [10.0, 283.0], [11.0, 281.0], [13.0, 137.5], [14.0, 239.5], [15.0, 223.0], [1.0, 393.0], [16.0, 240.5], [17.0, 212.0], [20.0, 137.0], [21.0, 67.0], [24.0, 142.5], [25.0, 85.0], [26.0, 216.0], [27.0, 119.0], [30.0, 132.5]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[20.0, 0.0], [3.0, 300.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 36.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 1.75, "minX": 1.68545322E12, "maxY": 11.55, "series": [{"data": [[1.68545334E12, 2.683333333333333], [1.68545328E12, 11.55], [1.68545322E12, 1.75]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68545334E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.68545322E12, "maxY": 9.533333333333333, "series": [{"data": [[1.68545334E12, 1.9666666666666666], [1.68545328E12, 9.533333333333333], [1.68545322E12, 1.6333333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.68545334E12, 0.7], [1.68545328E12, 2.05], [1.68545322E12, 0.08333333333333333]], "isOverall": false, "label": "304", "isController": false}, {"data": [[1.68545334E12, 0.016666666666666666]], "isOverall": false, "label": "Non HTTP response code: org.apache.http.ConnectionClosedException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68545334E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.68545322E12, "maxY": 0.15, "series": [{"data": [[1.68545334E12, 0.08333333333333333], [1.68545328E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-16-success", "isController": false}, {"data": [[1.68545328E12, 0.11666666666666667], [1.68545322E12, 0.05]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-14-success", "isController": false}, {"data": [[1.68545334E12, 0.03333333333333333], [1.68545328E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-6-success", "isController": false}, {"data": [[1.68545328E12, 0.11666666666666667], [1.68545322E12, 0.05]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-18-success", "isController": false}, {"data": [[1.68545328E12, 0.11666666666666667], [1.68545322E12, 0.05]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-1-success", "isController": false}, {"data": [[1.68545334E12, 0.08333333333333333], [1.68545328E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-12-success", "isController": false}, {"data": [[1.68545334E12, 0.03333333333333333], [1.68545328E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-14-success", "isController": false}, {"data": [[1.68545334E12, 0.06666666666666667], [1.68545328E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-success", "isController": false}, {"data": [[1.68545334E12, 0.08333333333333333], [1.68545328E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-6-success", "isController": false}, {"data": [[1.68545328E12, 0.15], [1.68545322E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-13-success", "isController": false}, {"data": [[1.68545334E12, 0.03333333333333333], [1.68545328E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-18-success", "isController": false}, {"data": [[1.68545334E12, 0.03333333333333333], [1.68545328E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-2-success", "isController": false}, {"data": [[1.68545334E12, 0.03333333333333333], [1.68545328E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-20-success", "isController": false}, {"data": [[1.68545328E12, 0.11666666666666667], [1.68545322E12, 0.05]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-10-success", "isController": false}, {"data": [[1.68545328E12, 0.15], [1.68545322E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-16-success", "isController": false}, {"data": [[1.68545328E12, 0.15], [1.68545322E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-8-success", "isController": false}, {"data": [[1.68545328E12, 0.11666666666666667], [1.68545322E12, 0.05]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-8-success", "isController": false}, {"data": [[1.68545328E12, 0.13333333333333333], [1.68545322E12, 0.016666666666666666]], "isOverall": false, "label": "Test-success", "isController": true}, {"data": [[1.68545328E12, 0.15], [1.68545322E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-3-success", "isController": false}, {"data": [[1.68545334E12, 0.03333333333333333], [1.68545328E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-success", "isController": false}, {"data": [[1.68545328E12, 0.11666666666666667], [1.68545322E12, 0.05]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-20-success", "isController": false}, {"data": [[1.68545334E12, 0.03333333333333333], [1.68545328E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-9-success", "isController": false}, {"data": [[1.68545334E12, 0.08333333333333333], [1.68545328E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-13-success", "isController": false}, {"data": [[1.68545328E12, 0.11666666666666667], [1.68545322E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-success", "isController": false}, {"data": [[1.68545334E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-failure", "isController": false}, {"data": [[1.68545328E12, 0.016666666666666666]], "isOverall": false, "label": "Test-failure", "isController": true}, {"data": [[1.68545334E12, 0.03333333333333333], [1.68545328E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-11-success", "isController": false}, {"data": [[1.68545334E12, 0.08333333333333333], [1.68545328E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-3-success", "isController": false}, {"data": [[1.68545334E12, 0.03333333333333333], [1.68545328E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-5-success", "isController": false}, {"data": [[1.68545334E12, 0.03333333333333333], [1.68545328E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-15-success", "isController": false}, {"data": [[1.68545328E12, 0.15], [1.68545322E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-10-success", "isController": false}, {"data": [[1.68545334E12, 0.03333333333333333], [1.68545328E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-19-success", "isController": false}, {"data": [[1.68545334E12, 0.08333333333333333], [1.68545328E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-1-success", "isController": false}, {"data": [[1.68545328E12, 0.11666666666666667], [1.68545322E12, 0.05]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-19-success", "isController": false}, {"data": [[1.68545328E12, 0.11666666666666667], [1.68545322E12, 0.05]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-13-success", "isController": false}, {"data": [[1.68545328E12, 0.11666666666666667], [1.68545322E12, 0.05]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-2-success", "isController": false}, {"data": [[1.68545334E12, 0.03333333333333333], [1.68545328E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-1-success", "isController": false}, {"data": [[1.68545334E12, 0.08333333333333333], [1.68545328E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-7-success", "isController": false}, {"data": [[1.68545334E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-19-failure", "isController": false}, {"data": [[1.68545334E12, 0.06666666666666667], [1.68545328E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-19-success", "isController": false}, {"data": [[1.68545328E12, 0.15], [1.68545322E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-14-success", "isController": false}, {"data": [[1.68545328E12, 0.11666666666666667], [1.68545322E12, 0.05]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-24-success", "isController": false}, {"data": [[1.68545328E12, 0.15], [1.68545322E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-7-success", "isController": false}, {"data": [[1.68545328E12, 0.11666666666666667], [1.68545322E12, 0.05]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-5-success", "isController": false}, {"data": [[1.68545334E12, 0.08333333333333333], [1.68545328E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-21-success", "isController": false}, {"data": [[1.68545328E12, 0.15], [1.68545322E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-4-success", "isController": false}, {"data": [[1.68545328E12, 0.11666666666666667], [1.68545322E12, 0.05]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-21-success", "isController": false}, {"data": [[1.68545328E12, 0.15], [1.68545322E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-17-success", "isController": false}, {"data": [[1.68545334E12, 0.03333333333333333], [1.68545328E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-12-success", "isController": false}, {"data": [[1.68545328E12, 0.11666666666666667], [1.68545322E12, 0.05]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-9-success", "isController": false}, {"data": [[1.68545328E12, 0.15], [1.68545322E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-0-success", "isController": false}, {"data": [[1.68545334E12, 0.03333333333333333], [1.68545328E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-8-success", "isController": false}, {"data": [[1.68545328E12, 0.11666666666666667], [1.68545322E12, 0.05]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-16-success", "isController": false}, {"data": [[1.68545334E12, 0.03333333333333333], [1.68545328E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-16-success", "isController": false}, {"data": [[1.68545334E12, 0.08333333333333333], [1.68545328E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-4-success", "isController": false}, {"data": [[1.68545334E12, 0.08333333333333333], [1.68545328E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-18-success", "isController": false}, {"data": [[1.68545328E12, 0.15], [1.68545322E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-20-success", "isController": false}, {"data": [[1.68545334E12, 0.03333333333333333], [1.68545328E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-4-success", "isController": false}, {"data": [[1.68545328E12, 0.15], [1.68545322E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-11-success", "isController": false}, {"data": [[1.68545334E12, 0.08333333333333333], [1.68545328E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-0-success", "isController": false}, {"data": [[1.68545334E12, 0.08333333333333333], [1.68545328E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-8-success", "isController": false}, {"data": [[1.68545328E12, 0.11666666666666667], [1.68545322E12, 0.05]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-12-success", "isController": false}, {"data": [[1.68545334E12, 0.08333333333333333], [1.68545328E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-10-success", "isController": false}, {"data": [[1.68545334E12, 0.03333333333333333], [1.68545328E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-0-success", "isController": false}, {"data": [[1.68545328E12, 0.11666666666666667], [1.68545322E12, 0.05]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-3-success", "isController": false}, {"data": [[1.68545328E12, 0.15], [1.68545322E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-6-success", "isController": false}, {"data": [[1.68545328E12, 0.11666666666666667], [1.68545322E12, 0.05]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-6-success", "isController": false}, {"data": [[1.68545328E12, 0.11666666666666667], [1.68545322E12, 0.05]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-22-success", "isController": false}, {"data": [[1.68545328E12, 0.15], [1.68545322E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-18-success", "isController": false}, {"data": [[1.68545334E12, 0.03333333333333333], [1.68545328E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-21-success", "isController": false}, {"data": [[1.68545328E12, 0.15], [1.68545322E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-success", "isController": false}, {"data": [[1.68545334E12, 0.08333333333333333], [1.68545328E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-20-success", "isController": false}, {"data": [[1.68545328E12, 0.15], [1.68545322E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-21-success", "isController": false}, {"data": [[1.68545334E12, 0.03333333333333333], [1.68545328E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-7-success", "isController": false}, {"data": [[1.68545328E12, 0.15], [1.68545322E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-1-success", "isController": false}, {"data": [[1.68545334E12, 0.08333333333333333], [1.68545328E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-15-success", "isController": false}, {"data": [[1.68545328E12, 0.11666666666666667], [1.68545322E12, 0.05]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-15-success", "isController": false}, {"data": [[1.68545328E12, 0.11666666666666667], [1.68545322E12, 0.05]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-17-success", "isController": false}, {"data": [[1.68545334E12, 0.08333333333333333], [1.68545328E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-5-success", "isController": false}, {"data": [[1.68545334E12, 0.03333333333333333], [1.68545328E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-3-success", "isController": false}, {"data": [[1.68545328E12, 0.11666666666666667], [1.68545322E12, 0.05]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-0-success", "isController": false}, {"data": [[1.68545334E12, 0.03333333333333333], [1.68545328E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-13-success", "isController": false}, {"data": [[1.68545334E12, 0.08333333333333333], [1.68545328E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-17-success", "isController": false}, {"data": [[1.68545328E12, 0.11666666666666667], [1.68545322E12, 0.05]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-11-success", "isController": false}, {"data": [[1.68545328E12, 0.15], [1.68545322E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-12-success", "isController": false}, {"data": [[1.68545334E12, 0.08333333333333333], [1.68545328E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-11-success", "isController": false}, {"data": [[1.68545328E12, 0.15], [1.68545322E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-5-success", "isController": false}, {"data": [[1.68545328E12, 0.11666666666666667], [1.68545322E12, 0.05]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-4-success", "isController": false}, {"data": [[1.68545334E12, 0.08333333333333333], [1.68545328E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-9-success", "isController": false}, {"data": [[1.68545334E12, 0.03333333333333333], [1.68545328E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-17-success", "isController": false}, {"data": [[1.68545328E12, 0.11666666666666667], [1.68545322E12, 0.05]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-23-success", "isController": false}, {"data": [[1.68545328E12, 0.11666666666666667], [1.68545322E12, 0.05]], "isOverall": false, "label": "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-7-success", "isController": false}, {"data": [[1.68545328E12, 0.15], [1.68545322E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-15-success", "isController": false}, {"data": [[1.68545328E12, 0.11666666666666667], [1.68545322E12, 0.05]], "isOverall": false, "label": "https://my.daraz.com.bd/api/recentOrders/-success", "isController": false}, {"data": [[1.68545328E12, 0.15], [1.68545322E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-9-success", "isController": false}, {"data": [[1.68545334E12, 0.03333333333333333], [1.68545328E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-kurtis/-10-success", "isController": false}, {"data": [[1.68545328E12, 0.15], [1.68545322E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-2-success", "isController": false}, {"data": [[1.68545334E12, 0.08333333333333333], [1.68545328E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-2-success", "isController": false}, {"data": [[1.68545328E12, 0.15], [1.68545322E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-sarees/-19-success", "isController": false}, {"data": [[1.68545334E12, 0.08333333333333333], [1.68545328E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.daraz.com.bd/womens-lawn/-14-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68545334E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.68545322E12, "maxY": 11.716666666666667, "series": [{"data": [[1.68545334E12, 2.65], [1.68545328E12, 11.716666666666667], [1.68545322E12, 1.7333333333333334]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.68545334E12, 0.03333333333333333], [1.68545328E12, 0.016666666666666666]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68545334E12, "title": "Total Transactions Per Second"}},
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
