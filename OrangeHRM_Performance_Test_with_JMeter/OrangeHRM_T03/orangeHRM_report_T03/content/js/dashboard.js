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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7507598784194529, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.95, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-6"], "isController": false}, {"data": [0.95, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-5"], "isController": false}, {"data": [0.95, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-4"], "isController": false}, {"data": [0.95, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-3"], "isController": false}, {"data": [0.95, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-2"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-1"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-6"], "isController": false}, {"data": [0.95, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-1"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-2"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-3"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-3"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-4"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-2"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-6"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-4"], "isController": false}, {"data": [0.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-5"], "isController": false}, {"data": [0.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-6"], "isController": false}, {"data": [0.45, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule"], "isController": false}, {"data": [0.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"], "isController": false}, {"data": [0.95, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-1"], "isController": false}, {"data": [0.8, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-2"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [0.1, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-3"], "isController": false}, {"data": [0.25, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-4"], "isController": false}, {"data": [0.45, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-1"], "isController": false}, {"data": [0.5, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-0"], "isController": false}, {"data": [0.5, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 319, 0, 0.0, 968.1410658307215, 209, 16268, 348.0, 2302.0, 3718.0, 14331.600000000004, 4.388438733818492, 885.8069414757329, 4.817601753483925], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-6", 10, 0, 0.0, 265.7, 211, 656, 224.0, 614.0000000000002, 656.0, 656.0, 0.16291951775822744, 0.15814648501140435, 0.10962065208536982], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-5", 10, 0, 0.0, 264.9, 211, 669, 218.0, 625.7000000000002, 669.0, 669.0, 0.1629115553166186, 0.15813875584445203, 0.11120622770148086], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-4", 10, 0, 0.0, 264.5, 210, 663, 218.5, 620.1000000000001, 663.0, 663.0, 0.16295934164425976, 0.1580260021999511, 0.10980658763138597], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-3", 10, 0, 0.0, 268.59999999999997, 211, 685, 224.5, 640.1000000000001, 685.0, 685.0, 0.1629115553166186, 0.15797966252871315, 0.11136532101721974], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-2", 10, 0, 0.0, 275.3, 212, 686, 230.5, 644.5000000000002, 686.0, 686.0, 0.16290624745458987, 0.1576563390893541, 0.10945263500855258], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-1", 10, 0, 0.0, 384.80000000000007, 372, 407, 385.0, 406.1, 407.0, 407.0, 0.16249593760155998, 0.7132841698488788, 0.09362558904777381], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-0", 10, 0, 0.0, 379.3, 331, 447, 352.5, 445.6, 447.0, 447.0, 0.1625725479995448, 0.26338657922973124, 0.09478106558176586], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-0", 10, 0, 0.0, 367.2, 343, 436, 354.0, 432.1, 436.0, 436.0, 0.15853136543065044, 0.25683938989204014, 0.09490207715721555], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-6", 10, 0, 0.0, 218.6, 212, 234, 216.0, 233.0, 234.0, 234.0, 0.17202229408931397, 0.1669825784421661, 0.11574546936282942], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-1", 10, 0, 0.0, 482.7, 383, 1236, 398.0, 1155.2000000000003, 1236.0, 1236.0, 0.15840078566789692, 0.6951381353851515, 0.09126607767974529], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-2", 10, 0, 0.0, 217.4, 209, 234, 216.0, 232.6, 234.0, 234.0, 0.15893450309127607, 0.15381259039399864, 0.10678411926445112], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-3", 10, 0, 0.0, 218.5, 213, 232, 217.0, 231.2, 232.0, 232.0, 0.15892945121660496, 0.15411811040828977, 0.10864317954260104], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-3", 10, 0, 0.0, 222.1, 211, 240, 221.0, 238.6, 240.0, 240.0, 0.17199566570922414, 0.16678876567310505, 0.11757516210591494], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-4", 10, 0, 0.0, 217.60000000000002, 210, 235, 217.0, 233.6, 235.0, 235.0, 0.1589395552871243, 0.15412790859386175, 0.1070979425274568], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-2", 10, 0, 0.0, 217.8, 212, 223, 217.5, 222.9, 223.0, 223.0, 0.17199566570922414, 0.1664528366385167, 0.11555958789838497], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-5", 10, 0, 0.0, 218.1, 213, 232, 217.0, 230.8, 232.0, 232.0, 0.1589319771137953, 0.15427576684678956, 0.1084896992212333], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-5", 10, 0, 0.0, 218.2, 214, 223, 217.5, 223.0, 223.0, 223.0, 0.1719986240110079, 0.16695960182318542, 0.11740921697626419], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-6", 10, 0, 0.0, 217.5, 212, 233, 216.5, 231.70000000000002, 233.0, 233.0, 0.15891934843067143, 0.15426350814461662, 0.10692913190305921], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-4", 10, 0, 0.0, 218.10000000000002, 212, 224, 217.0, 223.9, 224.0, 224.0, 0.1720163759589913, 0.16680884895242026, 0.11590947208174218], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-5", 10, 0, 0.0, 5141.7, 2300, 14415, 3010.0, 14373.3, 14415.0, 14415.0, 0.17639484221481364, 279.7367251856556, 0.1050789587412464], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-6", 10, 0, 0.0, 4204.900000000001, 2234, 11931, 2785.5, 11568.900000000001, 11931.0, 11931.0, 0.17723268879712173, 240.37079570831042, 0.10384727859206351], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule", 10, 0, 0.0, 1074.8000000000002, 952, 1808, 994.0, 1732.2000000000003, 1808.0, 1808.0, 0.15697601406505085, 1.7043241495824437, 0.7157431735055884], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index", 9, 0, 0.0, 7197.555555555556, 3710, 16268, 5097.0, 16268.0, 16268.0, 16268.0, 0.171696745392804, 575.9865222526137, 0.6973503555553436], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-1", 10, 0, 0.0, 445.09999999999997, 386, 858, 392.5, 817.9000000000001, 858.0, 858.0, 0.18471996453376682, 0.8106031568641938, 0.10643044831535392], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-2", 10, 0, 0.0, 416.8, 211, 874, 223.0, 854.5, 874.0, 874.0, 0.18533619986655794, 0.3029812486099785, 0.10895741437467565], "isController": false}, {"data": ["Test", 10, 0, 0.0, 10016.8, 6730, 19336, 7862.5, 19334.2, 19336.0, 19336.0, 0.1628346251546929, 551.5605663388263, 2.884271905327949], "isController": true}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-3", 10, 0, 0.0, 2148.7, 1065, 4522, 1755.5, 4506.2, 4522.0, 4522.0, 0.18090379536162668, 44.354642669778215, 0.1081182839465972], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-4", 10, 0, 0.0, 1838.6000000000001, 1292, 2845, 1477.5, 2839.8, 2845.0, 2845.0, 0.17688157778367383, 28.238867515698242, 0.10398702131423013], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-0", 10, 0, 0.0, 1181.2000000000003, 1010, 1751, 1071.0, 1714.9, 1751.0, 1751.0, 0.18154751098362443, 0.3122120769942994, 0.09626982271885552], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-1", 10, 0, 0.0, 403.90000000000003, 365, 448, 404.0, 445.7, 448.0, 448.0, 0.17149422921918678, 0.7520122436161273, 0.09881015160089864], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule", 10, 0, 0.0, 1044.0, 947, 1428, 1006.0, 1392.5, 1428.0, 1428.0, 0.16096061293801406, 1.747758749215317, 0.7313962226568158], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-0", 10, 0, 0.0, 369.1, 340, 427, 357.0, 425.8, 427.0, 427.0, 0.17162078670968628, 0.2780457862806343, 0.10072665313722798], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule", 10, 0, 0.0, 1000.2, 956, 1064, 996.5, 1061.4, 1064.0, 1064.0, 0.1698052333972933, 1.8430335015112667, 0.7722489960265576], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 319, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
