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
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 97.7035490605428, "KoPercent": 2.2964509394572024};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.856404958677686, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.8, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-19"], "isController": false}, {"data": [0.1, 500, 1500, "https://www.daraz.com.bd/womens-lawn/"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-10"], "isController": false}, {"data": [0.7, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-12"], "isController": false}, {"data": [0.9, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-11"], "isController": false}, {"data": [0.6, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-14"], "isController": false}, {"data": [0.8, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-13"], "isController": false}, {"data": [0.8, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-16"], "isController": false}, {"data": [0.7, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-15"], "isController": false}, {"data": [0.8, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-18"], "isController": false}, {"data": [0.7, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-17"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-16"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-17"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-18"], "isController": false}, {"data": [0.9, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-19"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-3"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-2"], "isController": false}, {"data": [0.9, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-10"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-11"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-4"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-12"], "isController": false}, {"data": [0.8, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-7"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-13"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-6"], "isController": false}, {"data": [0.9, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-14"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-9"], "isController": false}, {"data": [0.8, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-21"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-15"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-8"], "isController": false}, {"data": [0.8, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-20"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-20"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-21"], "isController": false}, {"data": [0.9, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-6"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-7"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-8"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-9"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-1"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-0"], "isController": false}, {"data": [0.1, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-1"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-2"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-3"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-4"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-15"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-16"], "isController": false}, {"data": [0.9, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-13"], "isController": false}, {"data": [0.9, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-14"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-11"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-12"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-10"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-19"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-17"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-18"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-15"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-14"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-17"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-16"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-19"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-18"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [1.0, 500, 1500, "https://my.daraz.com.bd/api/recentOrders/"], "isController": false}, {"data": [0.8, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-11"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-10"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-13"], "isController": false}, {"data": [0.9, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-12"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-7"], "isController": false}, {"data": [0.8, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-8"], "isController": false}, {"data": [0.8, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-8"], "isController": false}, {"data": [0.9, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-9"], "isController": false}, {"data": [0.9, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-9"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-3"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-4"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-5"], "isController": false}, {"data": [0.8, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-6"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-1"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-2"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-1"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-20"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-2"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-3"], "isController": false}, {"data": [0.9, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-22"], "isController": false}, {"data": [0.3, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-4"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-21"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-24"], "isController": false}, {"data": [0.7, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-6"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-23"], "isController": false}, {"data": [0.9, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-7"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-20"], "isController": false}, {"data": [0.9, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-21"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 479, 11, 2.2964509394572024, 371.97912317327757, 0, 4212, 238.0, 638.0, 1359.0, 2563.9999999999977, 7.141366252199063, 1550.9681209140278, 5.7243067125488265], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://www.daraz.com.bd/womens-lawn/-19", 5, 1, 20.0, 140.2, 0, 343, 121.0, 343.0, 343.0, 343.0, 0.29761904761904767, 45.501883370535715, 0.3197079613095238], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/", 5, 1, 20.0, 1993.4, 1155, 2502, 2133.0, 2502.0, 2502.0, 2502.0, 0.27526976436908174, 746.9843444622604, 2.2744701917253907], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-10", 5, 0, 0.0, 258.8, 105, 441, 307.0, 441.0, 441.0, 441.0, 0.29244896765514417, 0.07225545782885885, 0.13051677560390712], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-12", 5, 1, 20.0, 351.6, 64, 1229, 166.0, 1229.0, 1229.0, 1229.0, 0.29515938606847697, 4.295837330283352, 0.07355925324675325], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-11", 5, 0, 0.0, 437.2, 102, 1344, 308.0, 1344.0, 1344.0, 1344.0, 0.29180040852057193, 0.07209521812080537, 0.13022733075576304], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-14", 5, 1, 20.0, 365.0, 0, 616, 401.0, 616.0, 616.0, 616.0, 0.295630580027198, 110.5982292652102, 0.07921975699166321], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-13", 5, 0, 0.0, 395.6, 130, 800, 355.0, 800.0, 800.0, 800.0, 0.2869605142332415, 62.20059705721993, 0.08855422118916437], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-16", 5, 1, 20.0, 83.2, 0, 152, 75.0, 152.0, 152.0, 152.0, 0.29684160531940157, 0.17700340254690097, 0.09229918665400141], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-15", 5, 1, 20.0, 178.6, 0, 613, 71.0, 613.0, 613.0, 613.0, 0.2961734391659756, 2.2836591858192157, 0.08075353927259803], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-18", 5, 1, 20.0, 167.2, 0, 318, 154.0, 318.0, 318.0, 318.0, 0.2976367640931008, 16.187428846211084, 0.08487298351092327], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-17", 5, 1, 20.0, 332.2, 0, 1359, 101.0, 1359.0, 1359.0, 1359.0, 0.29761904761904767, 0.15165783110119047, 0.1062593005952381], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-16", 5, 0, 0.0, 103.4, 50, 210, 51.0, 210.0, 210.0, 210.0, 0.28320589068252616, 0.10011770744831491, 0.11007416454262248], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-17", 5, 0, 0.0, 108.4, 103, 127, 103.0, 127.0, 127.0, 127.0, 0.2820715333408553, 0.06941604140810109, 0.1258854401726278], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-18", 5, 0, 0.0, 143.2, 95, 300, 101.0, 300.0, 300.0, 300.0, 0.28246991695384444, 19.09264925004237, 0.10068507782046211], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-19", 5, 0, 0.0, 333.6, 166, 637, 290.0, 637.0, 637.0, 637.0, 0.2795951462282615, 53.316391614941566, 0.37543293560923785], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-3", 5, 0, 0.0, 106.6, 60, 194, 88.0, 194.0, 194.0, 194.0, 0.21959682023804294, 6.630151261034741, 0.08170545752997498], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-2", 5, 0, 0.0, 136.6, 100, 171, 129.0, 171.0, 171.0, 171.0, 0.21891418563922943, 48.00719680385289, 0.07375526762259195], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-10", 5, 0, 0.0, 398.6, 100, 1371, 113.0, 1371.0, 1371.0, 1371.0, 0.26682320294572814, 0.06592409213405197, 0.11908027709589625], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-5", 5, 0, 0.0, 188.0, 118, 268, 177.0, 268.0, 268.0, 268.0, 0.2187322280064745, 44.14768253204427, 0.09355929283870684], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-11", 5, 0, 0.0, 241.2, 107, 338, 315.0, 338.0, 338.0, 338.0, 0.2815156804233996, 0.06955416713585948, 0.12563736909520862], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-4", 5, 0, 0.0, 46.2, 45, 48, 46.0, 48.0, 48.0, 48.0, 0.21998328127062342, 0.059936851049320256, 0.07798235459105109], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-12", 5, 0, 0.0, 92.4, 58, 198, 73.0, 198.0, 198.0, 198.0, 0.27998656064508903, 4.964292963937731, 0.08722237582596035], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-7", 5, 0, 0.0, 368.4, 236, 548, 278.0, 548.0, 548.0, 548.0, 0.21524818115286926, 9.45174942959232, 0.08954660661242413], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-13", 5, 0, 0.0, 640.6, 556, 745, 620.0, 745.0, 745.0, 745.0, 0.27258354685711167, 59.07023881725999, 0.08411757891293682], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-6", 5, 0, 0.0, 326.8, 273, 431, 287.0, 431.0, 431.0, 431.0, 0.21630975556997623, 197.09853416342204, 0.07203283852476747], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-14", 5, 0, 0.0, 416.6, 325, 575, 359.0, 575.0, 575.0, 575.0, 0.27467999780256, 128.3310851061638, 0.09200706957644345], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-9", 5, 0, 0.0, 218.8, 122, 289, 259.0, 289.0, 289.0, 289.0, 0.21915406530791148, 16.450680062458908, 0.07426412174008327], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-21", 5, 1, 20.0, 107.6, 0, 395, 47.0, 395.0, 395.0, 395.0, 0.29882859191967487, 0.7775963535441072, 0.07820904554147741], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-15", 5, 0, 0.0, 148.8, 49, 222, 185.0, 222.0, 222.0, 222.0, 0.2815949538184276, 2.6042033326762786, 0.09597328015881955], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-8", 5, 0, 0.0, 146.0, 59, 238, 167.0, 238.0, 238.0, 238.0, 0.21871309216569704, 1.9808913105288481, 0.0743282774156861], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-20", 5, 1, 20.0, 115.2, 0, 414, 53.0, 414.0, 414.0, 414.0, 0.29843619434164975, 2.4738145554792883, 0.07694058135370657], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-20", 5, 0, 0.0, 77.4, 52, 172, 53.0, 172.0, 172.0, 172.0, 0.21806445985433293, 2.174043037746958, 0.07027467944524401], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-21", 5, 0, 0.0, 71.6, 48, 162, 49.0, 162.0, 162.0, 162.0, 0.21867483052700634, 0.6256150229608572, 0.07153912912748743], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-5", 5, 0, 0.0, 534.6, 323, 1269, 364.0, 1269.0, 1269.0, 1269.0, 0.20930135208673448, 15.711091532713802, 0.07092536052157897], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-6", 5, 0, 0.0, 349.6, 336, 377, 340.0, 377.0, 377.0, 377.0, 0.20883802522763345, 0.793135820420182, 0.07260384470804444], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-7", 5, 0, 0.0, 453.0, 430, 484, 450.0, 484.0, 484.0, 484.0, 0.20815120103242996, 5.410914863556887, 0.07236506598393072], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-8", 5, 0, 0.0, 598.8, 574, 638, 586.0, 638.0, 638.0, 638.0, 0.2067568126369764, 22.089865556382584, 0.07470705144109499], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-9", 5, 0, 0.0, 549.6, 540, 565, 542.0, 565.0, 565.0, 565.0, 0.20757223513782797, 12.985832546288608, 0.0721637848721355], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-1", 5, 0, 0.0, 48.0, 46, 49, 49.0, 49.0, 49.0, 49.0, 0.2199736031676199, 0.07840855972283325, 0.0902235481742191], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-0", 5, 0, 0.0, 740.0, 616, 987, 677.0, 987.0, 987.0, 987.0, 0.2141235921373817, 87.68566020994818, 0.09970129758896835], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-0", 5, 0, 0.0, 1812.2, 1275, 2342, 1797.0, 2342.0, 2342.0, 2342.0, 0.1951524140353616, 144.14433746975138, 0.06460612144334726], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-1", 5, 0, 0.0, 265.6, 182, 450, 228.0, 450.0, 450.0, 450.0, 0.209881207236704, 3.610612643243924, 0.0758359830835747], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-2", 5, 0, 0.0, 342.2, 310, 371, 349.0, 371.0, 371.0, 371.0, 0.20927507115352417, 16.06157559277164, 0.24156556064791562], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-3", 5, 0, 0.0, 395.8, 344, 450, 390.0, 450.0, 450.0, 450.0, 0.20874211998497058, 32.39559469325346, 0.07929754362710308], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-4", 5, 0, 0.0, 215.2, 189, 273, 204.0, 273.0, 273.0, 273.0, 0.2104111433741531, 1.9056181090350544, 0.07150691200605984], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-15", 5, 0, 0.0, 135.2, 54, 163, 151.0, 163.0, 163.0, 163.0, 0.21852191774835017, 2.0208582584895765, 0.074476708295092], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-16", 5, 0, 0.0, 94.4, 46, 184, 53.0, 184.0, 184.0, 184.0, 0.21891418563922943, 0.07747509851138354, 0.08508578699649737], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-13", 5, 0, 0.0, 431.8, 163, 540, 485.0, 540.0, 540.0, 540.0, 0.21922132585057874, 47.510484944975445, 0.06765033102420204], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-14", 5, 0, 0.0, 330.2, 181, 538, 301.0, 538.0, 538.0, 538.0, 0.2155636990730761, 100.71468628745419, 0.07220541873248545], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-11", 5, 0, 0.0, 322.6, 307, 335, 325.0, 335.0, 335.0, 335.0, 0.2176657524705063, 0.053778745483435635, 0.0971418446084193], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-12", 5, 0, 0.0, 96.2, 60, 190, 62.0, 190.0, 190.0, 190.0, 0.21938484489491464, 3.889624742222807, 0.06834352101706814], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-10", 5, 0, 0.0, 143.4, 98, 312, 103.0, 312.0, 312.0, 312.0, 0.2191636714298238, 0.05414883678881389, 0.0978103494564741], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-19", 5, 0, 0.0, 206.0, 163, 233, 216.0, 233.0, 233.0, 233.0, 0.2176657524705063, 41.50711596959209, 0.29227579067084586], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-17", 5, 0, 0.0, 183.6, 95, 312, 104.0, 312.0, 312.0, 312.0, 0.2166190104843601, 0.0533085846113855, 0.09667469510874274], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-18", 5, 0, 0.0, 129.8, 63, 249, 128.0, 249.0, 249.0, 249.0, 0.21839783349349176, 14.76194465525902, 0.07784688400891064], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-15", 5, 0, 0.0, 191.2, 163, 221, 185.0, 221.0, 221.0, 221.0, 0.21005755577028104, 3.391691042095534, 0.0761048371003655], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-14", 5, 0, 0.0, 245.2, 208, 272, 245.0, 272.0, 272.0, 272.0, 0.20955574182732606, 0.376954762154233, 0.0761276718357083], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-17", 5, 0, 0.0, 109.6, 98, 125, 109.0, 125.0, 125.0, 125.0, 0.2113360666131282, 0.5881912010228666, 0.07347230440847036], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-16", 5, 0, 0.0, 184.2, 171, 208, 172.0, 208.0, 208.0, 208.0, 0.21076592336551025, 0.703101947477132, 0.07162748176874763], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/", 5, 0, 0.0, 2117.0, 1647, 2526, 2211.0, 2526.0, 2526.0, 2526.0, 0.2513826043237808, 724.8464209401709, 2.2810516434137758], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-19", 5, 0, 0.0, 389.4, 365, 459, 370.0, 459.0, 459.0, 459.0, 0.21006638097638852, 3.6919576742500633, 0.06523545815477691], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-18", 5, 0, 0.0, 303.4, 275, 389, 284.0, 389.0, 389.0, 389.0, 0.21027840861300362, 14.213095482168391, 0.07495275307006477], "isController": false}, {"data": ["Test", 5, 1, 20.0, 9468.6, 8842, 10559, 9190.0, 10559.0, 10559.0, 10559.0, 0.15063416985508993, 1599.2964854694515, 5.999859015831651], "isController": true}, {"data": ["https://my.daraz.com.bd/api/recentOrders/", 5, 0, 0.0, 322.4, 286, 424, 299.0, 424.0, 424.0, 424.0, 0.20956452491722202, 0.26559847698981515, 0.053823701223856824], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-11", 5, 0, 0.0, 485.4, 450, 529, 475.0, 529.0, 529.0, 529.0, 0.20815120103242996, 6.514685392469089, 0.07236506598393072], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-10", 5, 0, 0.0, 570.6, 550, 598, 568.0, 598.0, 598.0, 598.0, 0.20760670984886231, 16.06052806064192, 0.07217577022089354], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-13", 5, 0, 0.0, 120.2, 103, 142, 115.0, 142.0, 142.0, 142.0, 0.2107570392851121, 1.758915681377508, 0.07327100193896476], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-12", 5, 0, 0.0, 435.0, 193, 524, 484.0, 524.0, 524.0, 524.0, 0.20890782986546336, 8.816155234185677, 0.07262811272666499], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-7", 5, 0, 0.0, 282.8, 74, 494, 265.0, 494.0, 494.0, 494.0, 0.2788311398616998, 12.24351891869284, 0.11599811091902745], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-8", 5, 1, 20.0, 217.2, 63, 417, 184.0, 417.0, 417.0, 417.0, 0.29226093055880287, 2.2666205137947157, 0.07945844049567453], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-8", 5, 0, 0.0, 520.4, 164, 1198, 257.0, 1198.0, 1198.0, 1198.0, 0.2750426316078992, 2.4909622710270094, 0.09347151933549701], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-9", 5, 0, 0.0, 411.4, 160, 1027, 272.0, 1027.0, 1027.0, 1027.0, 0.29356505401596994, 22.036300236319867, 0.09947956420267731], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-9", 5, 0, 0.0, 378.8, 292, 542, 332.0, 542.0, 542.0, 542.0, 0.2782879723938331, 20.889534459008182, 0.09430266252017588], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-3", 5, 0, 0.0, 84.2, 65, 105, 78.0, 105.0, 105.0, 105.0, 0.28560004569600733, 8.622945910921345, 0.10626329825212771], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-4", 5, 0, 0.0, 237.8, 135, 334, 255.0, 334.0, 334.0, 334.0, 0.2840424927569164, 0.4565761162869965, 0.0868215822587059], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-5", 5, 0, 0.0, 278.0, 156, 470, 234.0, 470.0, 470.0, 470.0, 0.27922041659686153, 56.352351733958784, 0.11943217038029821], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-6", 5, 0, 0.0, 477.2, 398, 538, 483.0, 538.0, 538.0, 538.0, 0.2781641168289291, 253.443095879694, 0.0926308240611961], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-0", 5, 0, 0.0, 888.8, 655, 1202, 865.0, 1202.0, 1202.0, 1202.0, 0.2727173557325188, 111.24769468610232, 0.11499936934111488], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-1", 5, 0, 0.0, 52.6, 47, 67, 50.0, 67.0, 67.0, 67.0, 0.2859103385178408, 0.10191139995997256, 0.11726791228270815], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-2", 5, 0, 0.0, 169.8, 133, 227, 162.0, 227.0, 227.0, 227.0, 0.28418779129248606, 62.318830283051035, 0.0957468632772536], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-0", 5, 0, 0.0, 676.6, 507, 1224, 524.0, 1224.0, 1224.0, 1224.0, 0.28977108084613157, 113.25131076137352, 0.13435870037670242], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-1", 5, 0, 0.0, 54.2, 50, 65, 52.0, 65.0, 65.0, 65.0, 0.29730051135687957, 0.10597137367701272, 0.12193966286122011], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-20", 5, 0, 0.0, 337.6, 331, 345, 336.0, 345.0, 345.0, 345.0, 0.20927507115352417, 1.0880259998116524, 0.06396786842876277], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-2", 5, 0, 0.0, 214.6, 112, 422, 187.0, 422.0, 422.0, 422.0, 0.29508970727101036, 64.71225064919736, 0.0994198720786119], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-3", 5, 0, 0.0, 144.0, 72, 384, 88.0, 384.0, 384.0, 384.0, 0.2968944837004928, 8.963951906804821, 0.11046562332996852], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-22", 5, 0, 0.0, 573.0, 341, 1355, 374.0, 1355.0, 1355.0, 1355.0, 0.20858537399357557, 33.160348702598974, 0.2660278305035251], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/", 5, 0, 0.0, 1531.0, 1383, 1746, 1480.0, 1746.0, 1746.0, 1746.0, 0.2068166776968895, 596.4193085342903, 1.8958464748097288], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-4", 5, 0, 0.0, 49.8, 46, 58, 48.0, 58.0, 58.0, 58.0, 0.29742430551424665, 0.08103650511569806, 0.1054345926774136], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-21", 5, 0, 0.0, 410.6, 327, 450, 433.0, 450.0, 450.0, 450.0, 0.20828126301757893, 44.121578654815465, 0.4633444503457469], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-5", 5, 0, 0.0, 196.0, 117, 398, 151.0, 398.0, 398.0, 398.0, 0.29580547831745846, 59.706487014139505, 0.12652617138969416], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-24", 5, 0, 0.0, 104.6, 58, 183, 69.0, 183.0, 183.0, 183.0, 0.21217907914279652, 2.1371240451941436, 0.06837802355187778], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-6", 5, 0, 0.0, 533.0, 267, 937, 516.0, 937.0, 937.0, 937.0, 0.291579192908794, 265.69464870174363, 0.09709814920107301], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-23", 5, 0, 0.0, 355.0, 186, 413, 395.0, 413.0, 413.0, 413.0, 0.20861148197596796, 43.66763920904957, 0.2424293589369159], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-7", 5, 0, 0.0, 305.4, 93, 506, 258.0, 506.0, 506.0, 506.0, 0.2942907592701589, 12.922583137139496, 0.12242955414949971], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD", 4, 0, 0.0, 3482.5, 2716, 4212, 3501.0, 4212.0, 4212.0, 4212.0, 0.18918791089249398, 403.9036726842217, 2.47274511658705], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-20", 5, 0, 0.0, 77.8, 52, 171, 55.0, 171.0, 171.0, 171.0, 0.282933454051607, 2.82076917227818, 0.09117972640334993], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-21", 5, 0, 0.0, 197.0, 51, 552, 148.0, 552.0, 552.0, 552.0, 0.28352707683583783, 0.8109871172384462, 0.09275544017578678], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.lang.IllegalStateException/Non HTTP response message: Connection pool shut down", 8, 72.72727272727273, 1.6701461377870563], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket operation on nonsocket: connect", 1, 9.090909090909092, 0.20876826722338204], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Connection is closed", 1, 9.090909090909092, 0.20876826722338204], "isController": false}, {"data": ["Assertion failed", 1, 9.090909090909092, 0.20876826722338204], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 479, 11, "Non HTTP response code: java.lang.IllegalStateException/Non HTTP response message: Connection pool shut down", 8, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket operation on nonsocket: connect", 1, "Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Connection is closed", 1, "Assertion failed", 1, "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["https://www.daraz.com.bd/womens-lawn/-19", 5, 1, "Non HTTP response code: java.lang.IllegalStateException/Non HTTP response message: Connection pool shut down", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/", 5, 1, "Assertion failed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-12", 5, 1, "Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Connection is closed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-14", 5, 1, "Non HTTP response code: java.lang.IllegalStateException/Non HTTP response message: Connection pool shut down", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-16", 5, 1, "Non HTTP response code: java.lang.IllegalStateException/Non HTTP response message: Connection pool shut down", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-15", 5, 1, "Non HTTP response code: java.lang.IllegalStateException/Non HTTP response message: Connection pool shut down", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-18", 5, 1, "Non HTTP response code: java.lang.IllegalStateException/Non HTTP response message: Connection pool shut down", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-17", 5, 1, "Non HTTP response code: java.lang.IllegalStateException/Non HTTP response message: Connection pool shut down", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-21", 5, 1, "Non HTTP response code: java.lang.IllegalStateException/Non HTTP response message: Connection pool shut down", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-20", 5, 1, "Non HTTP response code: java.lang.IllegalStateException/Non HTTP response message: Connection pool shut down", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-8", 5, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket operation on nonsocket: connect", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
