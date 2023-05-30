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

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9166666666666666, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-19"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.daraz.com.bd/womens-lawn/"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-15"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-14"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-17"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-16"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-19"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-18"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-10"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-12"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-11"], "isController": false}, {"data": [0.5, 500, 1500, "https://my.daraz.com.bd/api/recentOrders/"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-14"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-13"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-11"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-16"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-10"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-15"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-13"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-18"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-12"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-17"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-7"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-8"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-8"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-9"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-9"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-3"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-4"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-6"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-16"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-17"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-1"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-18"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-2"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-19"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-3"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-2"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-10"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-11"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-4"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-12"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-7"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-13"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-6"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-14"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-9"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-21"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-15"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-8"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-20"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-1"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-20"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-2"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-3"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-22"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-4"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-21"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-24"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-6"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-23"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-7"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-20"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-21"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-6"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-7"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-8"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-9"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-1"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-20"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-21"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-1"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-2"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-3"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-4"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-15"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-16"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-13"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-14"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-11"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-12"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-10"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-19"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-17"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-18"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 95, 0, 0.0, 285.6842105263159, 53, 2679, 154.0, 562.8000000000002, 1197.6, 2679.0, 1.8825674256385865, 384.4172880996968, 1.3502892899252918], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://www.daraz.com.bd/womens-lawn/-19", 1, 0, 0.0, 230.0, 230, 230, 230.0, 230.0, 230.0, 230.0, 4.3478260869565215, 829.3096127717391, 5.838145380434782], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/", 1, 0, 0.0, 1197.0, 1197, 1197, 1197.0, 1197.0, 1197.0, 1197.0, 0.835421888053467, 2393.743962771512, 7.656674237677526], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-15", 1, 0, 0.0, 196.0, 196, 196, 196.0, 196.0, 196.0, 196.0, 5.1020408163265305, 82.51953125, 1.8484933035714286], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-14", 1, 0, 0.0, 196.0, 196, 196, 196.0, 196.0, 196.0, 196.0, 5.1020408163265305, 7.254464285714286, 1.8534757653061225], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-17", 1, 0, 0.0, 56.0, 56, 56, 56.0, 56.0, 56.0, 56.0, 17.857142857142858, 49.78724888392857, 6.208147321428571], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-16", 1, 0, 0.0, 214.0, 214, 214, 214.0, 214.0, 214.0, 214.0, 4.672897196261682, 15.707140771028037, 1.5880549065420562], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/", 1, 0, 0.0, 1707.0, 1707, 1707, 1707.0, 1707.0, 1707.0, 1707.0, 0.5858230814294083, 1688.889041446983, 5.315886789689514], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-19", 1, 0, 0.0, 250.0, 250, 250, 250.0, 250.0, 250.0, 250.0, 4.0, 70.30078125, 1.2421875], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-18", 1, 0, 0.0, 366.0, 366, 366, 366.0, 366.0, 366.0, 366.0, 2.73224043715847, 184.64235399590163, 0.9738942964480874], "isController": false}, {"data": ["Test", 1, 0, 0.0, 9993.0, 9993, 9993, 9993.0, 9993.0, 9993.0, 9993.0, 0.10007004903432402, 1077.4815808565995, 4.0761931789752825], "isController": true}, {"data": ["https://www.daraz.com.bd/womens-lawn/-10", 1, 0, 0.0, 72.0, 72, 72, 72.0, 72.0, 72.0, 72.0, 13.888888888888888, 3.431532118055556, 6.198459201388889], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-12", 1, 0, 0.0, 74.0, 74, 74, 74.0, 74.0, 74.0, 74.0, 13.513513513513514, 239.56133868243245, 4.2097761824324325], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-11", 1, 0, 0.0, 57.0, 57, 57, 57.0, 57.0, 57.0, 57.0, 17.543859649122805, 4.334566885964912, 7.829632675438596], "isController": false}, {"data": ["https://my.daraz.com.bd/api/recentOrders/", 1, 0, 0.0, 1200.0, 1200, 1200, 1200.0, 1200.0, 1200.0, 1200.0, 0.8333333333333334, 1.0693359375, 0.21402994791666669], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-14", 1, 0, 0.0, 333.0, 333, 333, 333.0, 333.0, 333.0, 333.0, 3.003003003003003, 1403.2821884384384, 1.0058887012012012], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-13", 1, 0, 0.0, 231.0, 231, 231, 231.0, 231.0, 231.0, 231.0, 4.329004329004329, 938.5230654761905, 1.3359036796536796], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-11", 1, 0, 0.0, 79.0, 79, 79, 79.0, 79.0, 79.0, 79.0, 12.658227848101266, 396.1629746835443, 4.400712025316456], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-16", 1, 0, 0.0, 82.0, 82, 82, 82.0, 82.0, 82.0, 82.0, 12.195121951219512, 4.311166158536585, 4.739900914634146], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-10", 1, 0, 0.0, 298.0, 298, 298, 298.0, 298.0, 298.0, 298.0, 3.3557046979865772, 259.59194106543623, 1.166631711409396], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-15", 1, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 60.0, 16.666666666666668, 154.13411458333334, 5.680338541666667], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-13", 1, 0, 0.0, 203.0, 203, 203, 203.0, 203.0, 203.0, 203.0, 4.926108374384237, 41.09740609605911, 1.7125923645320196], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-18", 1, 0, 0.0, 96.0, 96, 96, 96.0, 96.0, 96.0, 96.0, 10.416666666666666, 703.948974609375, 3.712972005208333], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-12", 1, 0, 0.0, 252.0, 252, 252, 252.0, 252.0, 252.0, 252.0, 3.968253968253968, 167.47659350198413, 1.3795882936507937], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-17", 1, 0, 0.0, 336.0, 336, 336, 336.0, 336.0, 336.0, 336.0, 2.976190476190476, 0.7353283110119048, 1.328241257440476], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-7", 1, 0, 0.0, 87.0, 87, 87, 87.0, 87.0, 87.0, 87.0, 11.494252873563218, 504.71443965517244, 4.781788793103448], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-8", 1, 0, 0.0, 99.0, 99, 99, 99.0, 99.0, 99.0, 99.0, 10.101010101010102, 91.47135416666666, 3.4327651515151514], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-8", 1, 0, 0.0, 77.0, 77, 77, 77.0, 77.0, 77.0, 77.0, 12.987012987012989, 117.60602678571429, 4.413555194805195], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-9", 1, 0, 0.0, 100.0, 100, 100, 100.0, 100.0, 100.0, 100.0, 10.0, 750.52734375, 3.388671875], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-9", 1, 0, 0.0, 75.0, 75, 75, 75.0, 75.0, 75.0, 75.0, 13.333333333333334, 1000.703125, 4.518229166666667], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-3", 1, 0, 0.0, 134.0, 134, 134, 134.0, 134.0, 134.0, 134.0, 7.462686567164179, 225.30900186567163, 2.776644123134328], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-4", 1, 0, 0.0, 280.0, 280, 280, 280.0, 280.0, 280.0, 280.0, 3.571428571428571, 5.740792410714286, 1.0916573660714284], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-5", 1, 0, 0.0, 175.0, 175, 175, 175.0, 175.0, 175.0, 175.0, 5.714285714285714, 1152.9129464285716, 2.444196428571429], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-6", 1, 0, 0.0, 444.0, 444, 444, 444.0, 444.0, 444.0, 444.0, 2.2522522522522523, 2051.375105574324, 0.7500175957207207], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-16", 1, 0, 0.0, 64.0, 64, 64, 64.0, 64.0, 64.0, 64.0, 15.625, 5.523681640625, 6.072998046875], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-0", 1, 0, 0.0, 841.0, 841, 841, 841.0, 841.0, 841.0, 841.0, 1.1890606420927465, 485.02758992271106, 0.5016349583828775], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-17", 1, 0, 0.0, 58.0, 58, 58, 58.0, 58.0, 58.0, 58.0, 17.241379310344826, 4.259832974137931, 7.6946390086206895], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-1", 1, 0, 0.0, 65.0, 65, 65, 65.0, 65.0, 65.0, 65.0, 15.384615384615385, 5.483774038461538, 6.310096153846153], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-18", 1, 0, 0.0, 83.0, 83, 83, 83.0, 83.0, 83.0, 83.0, 12.048192771084338, 814.2060429216867, 4.294521837349397], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-2", 1, 0, 0.0, 202.0, 202, 202, 202.0, 202.0, 202.0, 202.0, 4.9504950495049505, 1085.66676980198, 1.6678913985148514], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-19", 1, 0, 0.0, 122.0, 122, 122, 122.0, 122.0, 122.0, 122.0, 8.196721311475411, 1563.452548668033, 11.006339651639344], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-3", 1, 0, 0.0, 96.0, 96, 96, 96.0, 96.0, 96.0, 96.0, 10.416666666666666, 314.4938151041667, 3.875732421875], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-2", 1, 0, 0.0, 154.0, 154, 154, 154.0, 154.0, 154.0, 154.0, 6.493506493506494, 1424.0564123376623, 2.1877536525974026], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-10", 1, 0, 0.0, 70.0, 70, 70, 70.0, 70.0, 70.0, 70.0, 14.285714285714285, 3.5295758928571423, 6.375558035714285], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-5", 1, 0, 0.0, 156.0, 156, 156, 156.0, 156.0, 156.0, 156.0, 6.41025641025641, 1293.9327924679487, 2.741887019230769], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-11", 1, 0, 0.0, 71.0, 71, 71, 71.0, 71.0, 71.0, 71.0, 14.084507042253522, 3.4798635563380285, 6.285761443661972], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-4", 1, 0, 0.0, 63.0, 63, 63, 63.0, 63.0, 63.0, 63.0, 15.873015873015872, 4.324776785714286, 5.626860119047619], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-12", 1, 0, 0.0, 58.0, 58, 58, 58.0, 58.0, 58.0, 58.0, 17.241379310344826, 305.6472252155172, 5.37109375], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-7", 1, 0, 0.0, 81.0, 81, 81, 81.0, 81.0, 81.0, 81.0, 12.345679012345679, 542.1006944444445, 5.13599537037037], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-13", 1, 0, 0.0, 579.0, 579, 579, 579.0, 579.0, 579.0, 579.0, 1.7271157167530224, 374.2747463298791, 0.5329771157167531], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-6", 1, 0, 0.0, 552.0, 552, 552, 552.0, 552.0, 552.0, 552.0, 1.8115942028985508, 1650.0191066576085, 0.6032750226449275], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-14", 1, 0, 0.0, 314.0, 314, 314, 314.0, 314.0, 314.0, 314.0, 3.1847133757961785, 1487.4104299363057, 1.0667545780254777], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-9", 1, 0, 0.0, 86.0, 86, 86, 86.0, 86.0, 86.0, 86.0, 11.627906976744185, 872.7062136627908, 3.9403161337209305], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-21", 1, 0, 0.0, 72.0, 72, 72, 72.0, 72.0, 72.0, 72.0, 13.888888888888888, 39.754231770833336, 4.543728298611112], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-15", 1, 0, 0.0, 68.0, 68, 68, 68.0, 68.0, 68.0, 68.0, 14.705882352941176, 136.00068933823528, 5.012063419117647], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-8", 1, 0, 0.0, 80.0, 80, 80, 80.0, 80.0, 80.0, 80.0, 12.5, 113.19580078125, 4.248046875], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-20", 1, 0, 0.0, 59.0, 59, 59, 59.0, 59.0, 59.0, 59.0, 16.949152542372882, 169.01152012711864, 5.462129237288136], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-0", 1, 0, 0.0, 514.0, 514, 514, 514.0, 514.0, 514.0, 514.0, 1.9455252918287937, 760.3584022373541, 0.9024653453307393], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-1", 1, 0, 0.0, 68.0, 68, 68, 68.0, 68.0, 68.0, 68.0, 14.705882352941176, 5.241842830882352, 6.031709558823529], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-20", 1, 0, 0.0, 343.0, 343, 343, 343.0, 343.0, 343.0, 343.0, 2.9154518950437316, 15.143836552478133, 0.8911488702623906], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-2", 1, 0, 0.0, 202.0, 202, 202, 202.0, 202.0, 202.0, 202.0, 4.9504950495049505, 1085.66676980198, 1.6678913985148514], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-3", 1, 0, 0.0, 96.0, 96, 96, 96.0, 96.0, 96.0, 96.0, 10.416666666666666, 314.4938151041667, 3.875732421875], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-22", 1, 0, 0.0, 406.0, 406, 406, 406.0, 406.0, 406.0, 406.0, 2.4630541871921183, 391.4692695504926, 3.1413562192118225], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/", 1, 0, 0.0, 1731.0, 1731, 1731, 1731.0, 1731.0, 1731.0, 1731.0, 0.5777007510109763, 1665.7025157062392, 5.295778271230502], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-4", 1, 0, 0.0, 55.0, 55, 55, 55.0, 55.0, 55.0, 55.0, 18.18181818181818, 4.9538352272727275, 6.4453125], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-21", 1, 0, 0.0, 419.0, 419, 419, 419.0, 419.0, 419.0, 419.0, 2.3866348448687353, 505.4421800417661, 5.309330250596659], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-5", 1, 0, 0.0, 121.0, 121, 121, 121.0, 121.0, 121.0, 121.0, 8.264462809917356, 1668.2108729338843, 3.534994834710744], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-24", 1, 0, 0.0, 221.0, 221, 221, 221.0, 221.0, 221.0, 221.0, 4.524886877828055, 45.593537895927604, 1.4582154977375565], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-6", 1, 0, 0.0, 253.0, 253, 253, 253.0, 253.0, 253.0, 253.0, 3.952569169960474, 3601.477581521739, 1.3162364130434783], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-23", 1, 0, 0.0, 439.0, 439, 439, 439.0, 439.0, 439.0, 439.0, 2.277904328018223, 476.71376708428244, 2.6471739749430525], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-7", 1, 0, 0.0, 117.0, 117, 117, 117.0, 117.0, 117.0, 117.0, 8.547008547008549, 375.3004807692308, 3.555689102564102], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-20", 1, 0, 0.0, 146.0, 146, 146, 146.0, 146.0, 146.0, 146.0, 6.8493150684931505, 68.29917594178083, 2.207298801369863], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-21", 1, 0, 0.0, 53.0, 53, 53, 53.0, 53.0, 53.0, 53.0, 18.867924528301884, 54.00574882075472, 6.172612028301887], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-5", 1, 0, 0.0, 425.0, 425, 425, 425.0, 425.0, 425.0, 425.0, 2.352941176470588, 176.59466911764707, 0.7973345588235294], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-6", 1, 0, 0.0, 313.0, 313, 313, 313.0, 313.0, 313.0, 313.0, 3.1948881789137378, 12.13995107827476, 1.1107228434504792], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-7", 1, 0, 0.0, 276.0, 276, 276, 276.0, 276.0, 276.0, 276.0, 3.6231884057971016, 94.18874547101449, 1.2596240942028984], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-8", 1, 0, 0.0, 348.0, 348, 348, 348.0, 348.0, 348.0, 348.0, 2.8735632183908044, 307.0110452586207, 1.038299209770115], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-9", 1, 0, 0.0, 292.0, 292, 292, 292.0, 292.0, 292.0, 292.0, 3.4246575342465753, 214.24510380993152, 1.190603595890411], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-1", 1, 0, 0.0, 71.0, 71, 71, 71.0, 71.0, 71.0, 71.0, 14.084507042253522, 5.020356514084508, 5.776848591549296], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-0", 1, 0, 0.0, 723.0, 723, 723, 723.0, 723.0, 723.0, 723.0, 1.3831258644536653, 566.2117479253112, 0.644288122406639], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-20", 1, 0, 0.0, 72.0, 72, 72, 72.0, 72.0, 72.0, 72.0, 13.888888888888888, 138.4955512152778, 4.475911458333334], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-21", 1, 0, 0.0, 59.0, 59, 59, 59.0, 59.0, 59.0, 59.0, 16.949152542372882, 48.51363877118644, 5.544888771186441], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-0", 1, 0, 0.0, 2679.0, 2679, 2679, 2679.0, 2679.0, 2679.0, 2679.0, 0.3732736095558044, 275.7186975083987, 0.12357397816349384], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-1", 1, 0, 0.0, 327.0, 327, 327, 327.0, 327.0, 327.0, 327.0, 3.058103975535168, 52.60595852446483, 1.1049789755351682], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-2", 1, 0, 0.0, 460.0, 460, 460, 460.0, 460.0, 460.0, 460.0, 2.1739130434782608, 166.80324388586956, 2.5093410326086953], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-3", 1, 0, 0.0, 492.0, 492, 492, 492.0, 492.0, 492.0, 492.0, 2.032520325203252, 315.3701410060976, 0.772119537601626], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-4", 1, 0, 0.0, 319.0, 319, 319, 319.0, 319.0, 319.0, 319.0, 3.134796238244514, 28.387661637931036, 1.0653409090909092], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-15", 1, 0, 0.0, 786.0, 786, 786, 786.0, 786.0, 786.0, 786.0, 1.272264631043257, 11.765962945292621, 0.43361362913486], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-16", 1, 0, 0.0, 66.0, 66, 66, 66.0, 66.0, 66.0, 66.0, 15.151515151515152, 5.356297348484849, 5.888967803030303], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-13", 1, 0, 0.0, 144.0, 144, 144, 144.0, 144.0, 144.0, 144.0, 6.944444444444444, 1505.5474175347224, 2.143012152777778], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-14", 1, 0, 0.0, 324.0, 324, 324, 324.0, 324.0, 324.0, 324.0, 3.0864197530864197, 1441.7558834876543, 1.0338300540123457], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-11", 1, 0, 0.0, 56.0, 56, 56, 56.0, 56.0, 56.0, 56.0, 17.857142857142858, 4.411969866071429, 7.969447544642857], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-12", 1, 0, 0.0, 61.0, 61, 61, 61.0, 61.0, 61.0, 61.0, 16.393442622950822, 290.6153944672131, 5.106941598360656], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-10", 1, 0, 0.0, 63.0, 63, 63, 63.0, 63.0, 63.0, 63.0, 15.873015873015872, 3.921750992063492, 7.083953373015873], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-19", 1, 0, 0.0, 210.0, 210, 210, 210.0, 210.0, 210.0, 210.0, 4.761904761904763, 908.2914806547619, 6.394159226190476], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-17", 1, 0, 0.0, 59.0, 59, 59, 59.0, 59.0, 59.0, 59.0, 16.949152542372882, 4.187632415254238, 7.564221398305085], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-18", 1, 0, 0.0, 81.0, 81, 81, 81.0, 81.0, 81.0, 81.0, 12.345679012345679, 834.3098958333333, 4.400559413580247], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 95, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
