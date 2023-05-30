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

    var data = {"OkPercent": 99.79144942648593, "KoPercent": 0.20855057351407716};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7812177502579979, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.7, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-19"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/"], "isController": false}, {"data": [0.9, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-10"], "isController": false}, {"data": [0.95, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-12"], "isController": false}, {"data": [0.95, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-11"], "isController": false}, {"data": [0.4, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-14"], "isController": false}, {"data": [0.8, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-13"], "isController": false}, {"data": [0.9, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-16"], "isController": false}, {"data": [0.95, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-15"], "isController": false}, {"data": [0.85, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-18"], "isController": false}, {"data": [0.95, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-17"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-16"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-17"], "isController": false}, {"data": [0.9, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-18"], "isController": false}, {"data": [0.85, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-19"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-3"], "isController": false}, {"data": [0.95, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-2"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-10"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-11"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-4"], "isController": false}, {"data": [0.95, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-12"], "isController": false}, {"data": [0.7, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-7"], "isController": false}, {"data": [0.55, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-13"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-6"], "isController": false}, {"data": [0.65, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-14"], "isController": false}, {"data": [0.65, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-9"], "isController": false}, {"data": [0.95, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-21"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-15"], "isController": false}, {"data": [0.95, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-8"], "isController": false}, {"data": [0.9, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-20"], "isController": false}, {"data": [0.8, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-20"], "isController": false}, {"data": [0.95, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-21"], "isController": false}, {"data": [0.75, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-5"], "isController": false}, {"data": [0.95, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-6"], "isController": false}, {"data": [0.95, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-7"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-8"], "isController": false}, {"data": [0.6, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-9"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-1"], "isController": false}, {"data": [0.45, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-0"], "isController": false}, {"data": [0.05, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-0"], "isController": false}, {"data": [0.9, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-1"], "isController": false}, {"data": [0.75, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-2"], "isController": false}, {"data": [0.75, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-3"], "isController": false}, {"data": [0.85, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-4"], "isController": false}, {"data": [0.95, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-15"], "isController": false}, {"data": [0.85, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-16"], "isController": false}, {"data": [0.65, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-13"], "isController": false}, {"data": [0.45, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-14"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-11"], "isController": false}, {"data": [0.95, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-12"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-10"], "isController": false}, {"data": [0.6, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-19"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-17"], "isController": false}, {"data": [0.9, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/-18"], "isController": false}, {"data": [0.95, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-15"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-14"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-17"], "isController": false}, {"data": [0.9, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-16"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/"], "isController": false}, {"data": [0.95, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-19"], "isController": false}, {"data": [0.7, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-18"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [1.0, 500, 1500, "https://my.daraz.com.bd/api/recentOrders/"], "isController": false}, {"data": [0.95, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-11"], "isController": false}, {"data": [0.55, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-10"], "isController": false}, {"data": [0.95, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-13"], "isController": false}, {"data": [0.95, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-12"], "isController": false}, {"data": [0.85, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-7"], "isController": false}, {"data": [0.75, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-8"], "isController": false}, {"data": [0.9, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-8"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-9"], "isController": false}, {"data": [0.7, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-9"], "isController": false}, {"data": [0.95, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-3"], "isController": false}, {"data": [0.95, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-4"], "isController": false}, {"data": [0.95, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-5"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-6"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-0"], "isController": false}, {"data": [0.95, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-1"], "isController": false}, {"data": [0.85, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-2"], "isController": false}, {"data": [0.55, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-1"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-20"], "isController": false}, {"data": [0.9, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-2"], "isController": false}, {"data": [0.95, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-3"], "isController": false}, {"data": [0.6, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-22"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.daraz.com.bd/womens-kurtis/"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-4"], "isController": false}, {"data": [0.65, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-21"], "isController": false}, {"data": [0.85, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-24"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-6"], "isController": false}, {"data": [0.7, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-23"], "isController": false}, {"data": [0.4, 500, 1500, "https://www.daraz.com.bd/womens-lawn/-7"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD"], "isController": false}, {"data": [0.9, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-20"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.daraz.com.bd/womens-sarees/-21"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 959, 2, 0.20855057351407716, 575.1480709071956, 43, 6101, 350.0, 1234.0, 1881.0, 3785.5999999999967, 8.398504208009667, 1863.969231939713, 6.973929004615236], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://www.daraz.com.bd/womens-lawn/-19", 10, 1, 10.0, 530.4000000000001, 167, 1016, 453.5, 1000.1, 1016.0, 1016.0, 0.15129966411474569, 25.996370344698462, 0.18284505306835722], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/", 10, 1, 10.0, 2933.1, 2309, 3900, 2895.0, 3838.7000000000003, 3900.0, 3900.0, 0.14748609943512825, 419.78166238496084, 1.3318830149477163], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-10", 10, 0, 0.0, 389.0, 95, 1234, 315.0, 1206.9, 1234.0, 1234.0, 0.15167602002123465, 0.037474641665402694, 0.06769134877900804], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-12", 10, 0, 0.0, 285.79999999999995, 109, 828, 241.5, 783.0000000000002, 828.0, 828.0, 0.1511875784285563, 2.6803165820646178, 0.04709847413936471], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-11", 10, 0, 0.0, 363.69999999999993, 103, 1227, 310.0, 1137.7000000000003, 1227.0, 1227.0, 0.15179574364734813, 0.03750422181912019, 0.06774478012386533], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-14", 10, 0, 0.0, 1058.8000000000002, 616, 1907, 939.5, 1873.8000000000002, 1907.0, 1907.0, 0.15019525382997898, 70.1728800174602, 0.05030954303094022], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-13", 10, 0, 0.0, 397.7, 132, 932, 202.5, 913.0, 932.0, 932.0, 0.1516944267467613, 32.88295198776584, 0.04681195200388338], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-16", 10, 0, 0.0, 424.59999999999997, 114, 1382, 364.0, 1294.3000000000002, 1382.0, 1382.0, 0.15063416985508993, 0.05353102969752659, 0.05854726523664629], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-15", 10, 0, 0.0, 313.1, 101, 1364, 149.5, 1263.4000000000003, 1364.0, 1364.0, 0.15162542455118874, 1.4020761548171399, 0.05167702457848132], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-18", 10, 0, 0.0, 450.90000000000003, 225, 1061, 321.5, 1027.2, 1061.0, 1061.0, 0.15049361907055142, 10.172281097625211, 0.05364274507885866], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-17", 10, 0, 0.0, 273.1, 96, 604, 214.5, 592.8000000000001, 604.0, 604.0, 0.15094111786991893, 0.037160406069342344, 0.06736336998686812], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-16", 10, 0, 0.0, 151.2, 52, 360, 100.0, 354.40000000000003, 360.0, 360.0, 0.18496596626220774, 0.0656593054065552, 0.07189106891831903], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-17", 10, 0, 0.0, 181.2, 101, 335, 106.0, 333.1, 335.0, 335.0, 0.18479506227593598, 0.045476909856968624, 0.08247201509775659], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-18", 10, 0, 0.0, 319.0, 134, 815, 253.5, 798.7, 815.0, 815.0, 0.18268176835951772, 12.347967379886736, 0.0651160600109609], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-19", 10, 0, 0.0, 541.0, 122, 1911, 418.5, 1781.3000000000004, 1911.0, 1911.0, 0.18295248723906402, 34.89025423535008, 0.24566374018917286], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-3", 10, 0, 0.0, 138.6, 89, 241, 131.0, 240.5, 241.0, 241.0, 0.1817586971536588, 5.487621664727907, 0.0676270152495547], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-2", 10, 0, 0.0, 350.40000000000003, 214, 516, 333.0, 513.1, 516.0, 516.0, 0.18117583114412536, 39.72717113755775, 0.061040685297581304], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-10", 10, 0, 0.0, 267.9, 101, 398, 314.0, 393.40000000000003, 398.0, 398.0, 0.18521262409245814, 0.045760540913468664, 0.08265836836938806], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-5", 10, 0, 0.0, 290.99999999999994, 222, 363, 291.0, 360.8, 363.0, 363.0, 0.18134010336385892, 36.60243732432677, 0.07756539577477559], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-11", 10, 0, 0.0, 291.7, 98, 423, 321.0, 417.6, 423.0, 423.0, 0.18540836191712246, 0.04580890191897655, 0.08274572401965329], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-4", 10, 0, 0.0, 45.699999999999996, 44, 49, 45.0, 48.9, 49.0, 49.0, 0.18209297667388968, 0.04979104830926671, 0.06455053762951363], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-12", 10, 0, 0.0, 146.0, 61, 617, 99.5, 568.7000000000002, 617.0, 617.0, 0.18447121326716964, 3.2702926981682006, 0.057467106476784297], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-7", 10, 0, 0.0, 621.0, 300, 1805, 505.5, 1686.8000000000004, 1805.0, 1805.0, 0.1804598115999567, 7.924159508427473, 0.07507410131013822], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-13", 10, 0, 0.0, 708.9000000000001, 490, 792, 723.0, 788.6, 792.0, 792.0, 0.18371546149323928, 39.819662463027264, 0.056693443195179306], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-6", 10, 0, 0.0, 918.9, 641, 1294, 919.5, 1271.4, 1294.0, 1294.0, 0.17899013764341584, 163.0763062923983, 0.05960511419570782], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-14", 10, 0, 0.0, 735.9, 293, 1283, 775.5, 1250.8000000000002, 1283.0, 1283.0, 0.18139931431059192, 84.74513608916683, 0.06076168438333303], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-9", 10, 0, 0.0, 791.6, 279, 1882, 688.5, 1841.9, 1882.0, 1882.0, 0.17665659724062396, 13.256852757830304, 0.0598631242602505], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-21", 10, 0, 0.0, 198.70000000000002, 91, 525, 128.0, 510.30000000000007, 525.0, 525.0, 0.15151515151515152, 0.43394886363636365, 0.049567945075757576], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-15", 10, 0, 0.0, 178.4, 62, 494, 120.0, 480.30000000000007, 494.0, 494.0, 0.1846040243677312, 1.7069742823518552, 0.06291680127376777], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-8", 10, 0, 0.0, 430.2, 218, 1372, 346.0, 1282.5000000000005, 1372.0, 1372.0, 0.1808972503617945, 1.6384273810600578, 0.0614767999276411], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-20", 10, 0, 0.0, 357.8, 92, 1389, 148.0, 1332.7000000000003, 1389.0, 1389.0, 0.15178422354780444, 1.5141069206016728, 0.04891483766677292], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-20", 10, 0, 0.0, 467.59999999999997, 84, 1811, 305.5, 1716.5000000000005, 1811.0, 1811.0, 0.17939794051164293, 1.7894944566036384, 0.05781378942269743], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-21", 10, 0, 0.0, 301.4, 72, 1358, 117.0, 1268.1000000000004, 1358.0, 1358.0, 0.17991436076427622, 0.5152684041146415, 0.058858702007844266], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-5", 10, 0, 0.0, 511.5, 285, 805, 502.0, 796.6, 805.0, 805.0, 0.18220910316679423, 13.67691066173791, 0.061744686327028904], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-6", 10, 0, 0.0, 372.40000000000003, 306, 638, 334.0, 618.8000000000001, 638.0, 638.0, 0.18228881840387912, 0.692305873801451, 0.0633738470232236], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-7", 10, 0, 0.0, 470.80000000000007, 396, 901, 430.0, 855.5000000000002, 901.0, 901.0, 0.18110364561638626, 4.707969664007462, 0.06296181429632179], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-8", 10, 0, 0.0, 621.7, 561, 997, 576.0, 961.5000000000001, 997.0, 997.0, 0.17991436076427622, 19.2220221924364, 0.0650081186355295], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-9", 10, 0, 0.0, 544.6, 489, 816, 509.5, 791.3000000000001, 816.0, 816.0, 0.18056082191286135, 11.295983763068088, 0.0627730982431432], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-1", 10, 0, 0.0, 126.1, 83, 332, 110.0, 311.1000000000001, 332.0, 332.0, 0.18182809971452987, 0.06507812357946798, 0.07457793152353764], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-0", 10, 0, 0.0, 1017.6000000000003, 648, 3353, 717.5, 3112.000000000001, 3353.0, 3353.0, 0.18007635237340633, 73.73032806534971, 0.08384805157386732], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-0", 10, 0, 0.0, 1724.4, 1076, 2015, 1783.5, 2012.4, 2015.0, 2015.0, 0.1792692983399663, 132.41259291191605, 0.059347941540281814], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-1", 10, 0, 0.0, 428.6, 216, 1183, 302.5, 1138.8000000000002, 1183.0, 1183.0, 0.1819505094614265, 3.1302062011008007, 0.065743836426492], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-2", 10, 0, 0.0, 631.8, 302, 1342, 514.0, 1315.6000000000001, 1342.0, 1342.0, 0.18083509647552398, 13.87769853998264, 0.20873738675202083], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-3", 10, 0, 0.0, 601.9, 342, 1304, 510.0, 1248.4, 1304.0, 1304.0, 0.1819869333381863, 28.243785572758377, 0.06913370807476023], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-4", 10, 0, 0.0, 696.2, 202, 3399, 330.5, 3175.9000000000005, 3399.0, 3399.0, 0.18327773908581066, 1.659970108546241, 0.06228579414244346], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-15", 10, 0, 0.0, 331.59999999999997, 81, 1365, 128.5, 1276.5000000000005, 1365.0, 1365.0, 0.1807141824490386, 1.671023807964074, 0.06159106413546335], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-16", 10, 0, 0.0, 518.1, 69, 1403, 352.0, 1400.5, 1403.0, 1403.0, 0.17673465059559576, 0.0627718675992365, 0.06869178802446008], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-13", 10, 0, 0.0, 669.0, 197, 1362, 718.0, 1339.2, 1362.0, 1362.0, 0.179620282722325, 38.93539760072207, 0.05542969662134248], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-14", 10, 0, 0.0, 950.6, 518, 1518, 933.5, 1485.6000000000001, 1518.0, 1518.0, 0.1794945433658817, 83.85510036549576, 0.06012366052197013], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-11", 10, 0, 0.0, 319.5, 306, 364, 311.0, 361.0, 364.0, 364.0, 0.1812677869015897, 0.04478588875595918, 0.08089783067776025], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-12", 10, 0, 0.0, 255.2, 87, 661, 202.0, 631.4000000000001, 661.0, 661.0, 0.17979790715236077, 3.187479772735445, 0.056011262091409254], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-10", 10, 0, 0.0, 313.6, 299, 341, 309.0, 339.6, 341.0, 341.0, 0.18144868631151112, 0.04483058362969952, 0.08097856410582087], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-19", 10, 0, 0.0, 751.3000000000001, 303, 1362, 733.5, 1330.3000000000002, 1362.0, 1362.0, 0.1777303830089754, 33.88740433106727, 0.23865163734115347], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-17", 10, 0, 0.0, 164.10000000000002, 96, 320, 99.5, 319.0, 320.0, 320.0, 0.1804272517321016, 0.04440201898094688, 0.08052270902497113], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/-18", 10, 0, 0.0, 353.70000000000005, 130, 1200, 273.0, 1130.1000000000004, 1200.0, 1200.0, 0.1798690553277214, 12.157848305183826, 0.06411348163536945], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-15", 10, 0, 0.0, 317.90000000000003, 168, 759, 280.5, 718.9000000000001, 759.0, 759.0, 0.1798690553277214, 2.9043055874073676, 0.06516740188143032], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-14", 10, 0, 0.0, 212.3, 193, 261, 210.0, 257.20000000000005, 261.0, 261.0, 0.18176860856130145, 0.32697048532218487, 0.0660331273289103], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-17", 10, 0, 0.0, 120.6, 96, 258, 100.0, 245.90000000000003, 258.0, 258.0, 0.18136970400464306, 0.5047887269660476, 0.06305431115786418], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-16", 10, 0, 0.0, 337.8, 168, 816, 286.5, 788.8000000000001, 816.0, 816.0, 0.1811725487354156, 0.6044333771921878, 0.0615703583593014], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/", 10, 0, 0.0, 2712.8999999999996, 1787, 4337, 2535.5, 4276.3, 4337.0, 4337.0, 0.17780306532484622, 512.6757958354077, 1.613389182016998], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-19", 10, 0, 0.0, 366.0, 308, 587, 355.5, 565.3000000000001, 587.0, 587.0, 0.1809332537227017, 3.1799372727026003, 0.05618825652716713], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-18", 10, 0, 0.0, 694.7, 338, 1371, 548.0, 1370.9, 1371.0, 1371.0, 0.18031663601283854, 12.188066306934978, 0.06427301967254499], "isController": false}, {"data": ["Test", 10, 1, 10.0, 13143.5, 10534, 15933, 13125.0, 15773.400000000001, 15933.0, 15933.0, 0.14919583445230208, 1603.7719824909364, 6.057132330177842], "isController": true}, {"data": ["https://my.daraz.com.bd/api/recentOrders/", 10, 0, 0.0, 308.8, 250, 488, 270.0, 485.9, 488.0, 488.0, 0.1800082803808975, 0.23137392445052474, 0.04623259544939067], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-11", 10, 0, 0.0, 400.3, 126, 662, 431.0, 642.3000000000001, 662.0, 662.0, 0.18092343320306845, 5.6625147565675205, 0.06289916232450427], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-10", 10, 0, 0.0, 544.6, 253, 759, 541.0, 752.9, 759.0, 759.0, 0.18056082191286135, 13.968248661592908, 0.0627730982431432], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-13", 10, 0, 0.0, 183.9, 104, 514, 119.5, 497.4000000000001, 514.0, 514.0, 0.18202005861045886, 1.5190853719579898, 0.06328041100129234], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-12", 10, 0, 0.0, 316.7, 128, 583, 304.0, 572.5, 583.0, 583.0, 0.18068479537446924, 7.625110104797182, 0.06281619839190532], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-7", 10, 0, 0.0, 536.9, 66, 1359, 438.0, 1354.2, 1359.0, 1359.0, 0.1853911753800519, 8.14071841977197, 0.07712562569521692], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-8", 10, 0, 0.0, 629.5, 114, 1470, 432.5, 1461.4, 1470.0, 1470.0, 0.15121272606302547, 1.369612219689409, 0.05138869987298131], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-8", 10, 0, 0.0, 394.8, 109, 1193, 346.0, 1127.6000000000004, 1193.0, 1193.0, 0.18590470524808983, 1.6837447249539887, 0.06317855217415554], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-9", 10, 0, 0.0, 894.6, 254, 1881, 744.0, 1848.4, 1881.0, 1881.0, 0.15078862450616726, 11.318939263284479, 0.05109731709339847], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-9", 10, 0, 0.0, 518.6, 88, 1053, 520.5, 1030.0, 1053.0, 1053.0, 0.18350644107608177, 13.770814361443461, 0.0621843115755863], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-3", 10, 0, 0.0, 199.0, 72, 707, 123.5, 662.9000000000001, 707.0, 707.0, 0.1869333582577811, 5.643872236891299, 0.06955235302364707], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-4", 10, 0, 0.0, 258.7, 148, 580, 246.5, 548.6000000000001, 580.0, 580.0, 0.18653932248918073, 0.2999749046317714, 0.05701836712804059], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-5", 10, 0, 0.0, 366.2, 206, 648, 339.0, 632.4000000000001, 648.0, 648.0, 0.1856872284324284, 37.47661501466929, 0.07942481059902701], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-6", 10, 0, 0.0, 978.1999999999999, 581, 1455, 991.0, 1444.2, 1455.0, 1455.0, 0.18242516007807796, 166.20357279676014, 0.06074900350256307], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-0", 10, 0, 0.0, 879.7, 760, 1139, 844.5, 1132.3, 1139.0, 1139.0, 0.18474385264830315, 75.36315156847532, 0.07790273005228252], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-1", 10, 0, 0.0, 200.5, 57, 628, 105.5, 607.8000000000001, 628.0, 628.0, 0.18699278207861175, 0.06692661585137813, 0.0766962582744306], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-2", 10, 0, 0.0, 430.70000000000005, 264, 676, 455.5, 668.2, 676.0, 676.0, 0.18578037044605866, 40.73356177545656, 0.06259201933973657], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-0", 10, 0, 0.0, 770.0, 465, 1491, 722.5, 1434.5000000000002, 1491.0, 1491.0, 0.15138899402013473, 59.16830375728559, 0.07019481871167965], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-1", 10, 0, 0.0, 200.10000000000002, 90, 445, 119.0, 440.8, 445.0, 445.0, 0.1521491061240015, 0.05445571034613922, 0.06240490680867251], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-20", 10, 0, 0.0, 295.9, 284, 315, 294.0, 314.3, 315.0, 315.0, 0.18108396863625664, 0.9421494723665864, 0.055350861506980785], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-2", 10, 0, 0.0, 469.5, 239, 1544, 355.0, 1439.6000000000004, 1544.0, 1544.0, 0.1517565824417634, 33.276291235108886, 0.05112892670157068], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-3", 10, 0, 0.0, 235.70000000000002, 104, 555, 218.0, 533.4000000000001, 555.0, 555.0, 0.15207737696940204, 4.591504126049334, 0.056583477173185716], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-22", 10, 0, 0.0, 784.1999999999999, 359, 2632, 570.5, 2454.4000000000005, 2632.0, 2632.0, 0.17889087656529518, 28.43870541703936, 0.22815574686940968], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-kurtis/", 10, 0, 0.0, 3118.2000000000003, 1985, 4588, 2960.0, 4516.1, 4588.0, 4588.0, 0.17267280230690865, 497.91774137499357, 1.582856504584463], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-4", 10, 0, 0.0, 48.2, 43, 60, 46.0, 59.300000000000004, 60.0, 60.0, 0.15232292460015232, 0.041650799695354145, 0.053997286747905555], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-21", 10, 0, 0.0, 717.8, 357, 1711, 585.5, 1647.2000000000003, 1711.0, 1711.0, 0.17926608464944516, 37.97526170047326, 0.3987970125306993], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-5", 10, 0, 0.0, 478.3, 234, 1680, 307.0, 1563.7000000000005, 1680.0, 1680.0, 0.15173125360361728, 30.625708869450428, 0.06490067292810972], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-24", 10, 0, 0.0, 283.9, 161, 492, 269.0, 478.80000000000007, 492.0, 492.0, 0.18072398026494135, 1.8207235058644933, 0.05824112645256899], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-6", 10, 0, 0.0, 838.3000000000001, 400, 1718, 720.0, 1662.3000000000002, 1718.0, 1718.0, 0.15014564127203386, 136.80232716359868, 0.04999967155640971], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD-23", 10, 0, 0.0, 595.9, 398, 957, 553.0, 939.3000000000001, 957.0, 957.0, 0.17912800487228173, 37.495829676136566, 0.20816633378712426], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/-7", 10, 0, 0.0, 1065.3, 186, 2569, 970.5, 2466.0000000000005, 2569.0, 2569.0, 0.15006903175460712, 6.589701184419834, 0.06243106203853773], "isController": false}, {"data": ["https://www.daraz.com.bd/?spm=a2a0e.home.header.dhome.163012f7TuEosD", 9, 0, 0.0, 4170.0, 3354, 6101, 3874.0, 6101.0, 6101.0, 6101.0, 0.17160835160644486, 366.3715410191629, 2.2429747831061113], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-20", 10, 0, 0.0, 336.2, 62, 2284, 100.5, 2090.2000000000007, 2284.0, 2284.0, 0.18461084034854527, 1.8413669336600946, 0.05949372784669916], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-sarees/-21", 10, 0, 0.0, 133.7, 50, 372, 99.5, 360.1, 372.0, 372.0, 0.18458017239788102, 0.5285770483784632, 0.060385114993447404], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Connection is closed", 1, 50.0, 0.10427528675703858], "isController": false}, {"data": ["Assertion failed", 1, 50.0, 0.10427528675703858], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 959, 2, "Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Connection is closed", 1, "Assertion failed", 1, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["https://www.daraz.com.bd/womens-lawn/-19", 10, 1, "Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Connection is closed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://www.daraz.com.bd/womens-lawn/", 10, 1, "Assertion failed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
