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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7621951219512195, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-6"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-4"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-3"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-2"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-1"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-6"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-1"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-2"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-3"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-3"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-4"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-2"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-6"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-4"], "isController": false}, {"data": [0.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-5"], "isController": false}, {"data": [0.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-6"], "isController": false}, {"data": [0.5, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule"], "isController": false}, {"data": [0.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-1"], "isController": false}, {"data": [0.6, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-2"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [0.2, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-3"], "isController": false}, {"data": [0.2, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-4"], "isController": false}, {"data": [0.5, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-1"], "isController": false}, {"data": [0.5, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-0"], "isController": false}, {"data": [0.5, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 159, 0, 0.0, 782.930817610063, 208, 8050, 346.0, 1930.0, 2958.0, 7672.000000000004, 3.690893474778895, 708.4150403546391, 4.017441974337844], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-6", 5, 0, 0.0, 215.2, 211, 227, 212.0, 227.0, 227.0, 227.0, 0.17972035512742174, 0.17445511034829803, 0.12092512176054059], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-5", 5, 0, 0.0, 214.8, 210, 227, 212.0, 227.0, 227.0, 227.0, 0.17972035512742174, 0.17445511034829803, 0.12268020335358182], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-4", 5, 0, 0.0, 217.2, 213, 227, 215.0, 227.0, 227.0, 227.0, 0.17970743629371383, 0.17426707445279085, 0.12109192484635015], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-3", 5, 0, 0.0, 214.6, 208, 222, 214.0, 222.0, 222.0, 222.0, 0.17973973686102523, 0.17429839717089654, 0.12286896074484147], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-2", 5, 0, 0.0, 216.2, 210, 227, 215.0, 227.0, 227.0, 227.0, 0.17970743629371383, 0.1739160833662797, 0.12074093375983898], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-1", 5, 0, 0.0, 409.0, 378, 492, 388.0, 492.0, 492.0, 492.0, 0.1785586743804014, 0.7834261838440112, 0.10288048621527034], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-0", 5, 0, 0.0, 352.6, 346, 360, 351.0, 360.0, 360.0, 360.0, 0.17877574370709381, 0.2896376550879577, 0.10422765526673342], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-0", 5, 0, 0.0, 357.6, 334, 412, 343.0, 412.0, 412.0, 412.0, 0.1621060822202049, 0.2626308500032421, 0.09704201992283751], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-6", 5, 0, 0.0, 218.4, 213, 224, 218.0, 224.0, 224.0, 224.0, 0.19612457833215657, 0.19037874107633168, 0.1319627289754452], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-1", 5, 0, 0.0, 404.4, 359, 439, 402.0, 439.0, 439.0, 439.0, 0.16202203499675957, 0.7106501640473104, 0.09335253969539857], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-2", 5, 0, 0.0, 214.6, 212, 217, 215.0, 217.0, 217.0, 217.0, 0.16321734021022394, 0.1579574063948554, 0.10966165045374421], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-3", 5, 0, 0.0, 215.2, 212, 218, 216.0, 218.0, 218.0, 218.0, 0.16321734021022394, 0.1582761902624535, 0.11157435365933277], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-3", 5, 0, 0.0, 217.6, 209, 225, 218.0, 225.0, 225.0, 225.0, 0.19617074701820464, 0.1902319841690207, 0.13410109659447583], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-4", 5, 0, 0.0, 213.8, 212, 216, 214.0, 216.0, 216.0, 216.0, 0.16321734021022394, 0.1582761902624535, 0.1099804343213423], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-2", 5, 0, 0.0, 217.6, 213, 225, 216.0, 225.0, 225.0, 225.0, 0.19613996547936607, 0.18981904862309742, 0.13178153930644906], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-5", 5, 0, 0.0, 214.4, 212, 217, 214.0, 217.0, 217.0, 217.0, 0.16321734021022394, 0.15843558219625253, 0.11141496172553372], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-5", 5, 0, 0.0, 222.2, 215, 228, 223.0, 228.0, 228.0, 228.0, 0.19607074232383043, 0.19032648229481197, 0.13384125867613034], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-6", 5, 0, 0.0, 213.8, 211, 218, 213.0, 218.0, 218.0, 218.0, 0.16322266836418242, 0.1584407542519505, 0.10982462744425946], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-4", 5, 0, 0.0, 219.8, 214, 225, 221.0, 225.0, 225.0, 225.0, 0.19610150213750638, 0.19016483556889047, 0.13213870749499942], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-5", 5, 0, 0.0, 4010.6, 2380, 6621, 2602.0, 6621.0, 6621.0, 6621.0, 0.19086154903233196, 302.6788313070199, 0.11369682120090087], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-6", 5, 0, 0.0, 2375.8, 1930, 2958, 2377.0, 2958.0, 2958.0, 2958.0, 0.1925891687851475, 261.1979317126955, 0.11284521608504738], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule", 5, 0, 0.0, 983.4, 911, 1033, 996.0, 1033.0, 1033.0, 1033.0, 0.1591292447726043, 1.727329304048248, 0.7255609803157125], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index", 4, 0, 0.0, 5787.75, 3796, 8050, 5652.5, 8050.0, 8050.0, 8050.0, 0.18277358921635825, 613.146847155586, 0.7423392163582362], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-1", 5, 0, 0.0, 388.0, 382, 398, 387.0, 398.0, 398.0, 398.0, 0.20712510356255176, 0.9097322908036454, 0.11933965927920463], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-2", 5, 0, 0.0, 643.0, 214, 1035, 654.0, 1035.0, 1035.0, 1035.0, 0.2086463027875146, 0.34108780358037055, 0.12266120534969122], "isController": false}, {"data": ["Test", 5, 0, 0.0, 8515.4, 6695, 11145, 7649.0, 11145.0, 11145.0, 11145.0, 0.16251178210420256, 550.4677800078006, 2.8785534216855724], "isController": true}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-3", 5, 0, 0.0, 1637.0, 1083, 2574, 1509.0, 2574.0, 2574.0, 2574.0, 0.19794924581337345, 48.533907468625046, 0.11830560394314897], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-4", 5, 0, 0.0, 1646.4, 863, 3269, 1574.0, 3269.0, 3269.0, 3269.0, 0.19744895944398372, 31.52241786123287, 0.11607839217312324], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-0", 5, 0, 0.0, 1084.4, 1022, 1296, 1026.0, 1296.0, 1296.0, 1296.0, 0.19956893110880497, 0.3432039918775445, 0.10582610311726671], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-1", 5, 0, 0.0, 387.0, 374, 422, 378.0, 422.0, 422.0, 422.0, 0.194916575705598, 0.8557294509200062, 0.11230544889287385], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule", 5, 0, 0.0, 984.2, 943, 1072, 967.0, 1072.0, 1072.0, 1072.0, 0.17492303386509936, 1.8990081863979849, 0.794840699779597], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-0", 5, 0, 0.0, 370.4, 346, 413, 369.0, 413.0, 413.0, 413.0, 0.19497738262361566, 0.31588620876228357, 0.11443496773124319], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule", 5, 0, 0.0, 987.8, 945, 1023, 990.0, 1023.0, 1023.0, 1023.0, 0.1901285268841737, 2.0646027026770097, 0.8646763180660126], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 159, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
