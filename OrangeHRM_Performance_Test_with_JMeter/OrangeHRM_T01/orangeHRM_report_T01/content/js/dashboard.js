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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.765625, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-6"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-4"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-3"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-2"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-1"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-6"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-1"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-2"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-3"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-3"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-4"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-2"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-6"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-4"], "isController": false}, {"data": [0.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-5"], "isController": false}, {"data": [0.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-6"], "isController": false}, {"data": [0.5, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-1"], "isController": false}, {"data": [0.5, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-2"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [0.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-3"], "isController": false}, {"data": [0.5, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-4"], "isController": false}, {"data": [0.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-1"], "isController": false}, {"data": [0.5, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule"], "isController": false}, {"data": [1.0, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-0"], "isController": false}, {"data": [0.5, 500, 1500, "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 31, 0, 0.0, 649.9354838709678, 211, 2640, 351.0, 2332.8000000000006, 2550.0, 2640.0, 2.268901412574105, 250.29940864469737, 2.295561575971602], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-6", 1, 0, 0.0, 216.0, 216, 216, 216.0, 216.0, 216.0, 216.0, 4.62962962962963, 4.493995949074074, 3.1150535300925926], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-5", 1, 0, 0.0, 215.0, 215, 215, 215.0, 215.0, 215.0, 215.0, 4.651162790697675, 4.514898255813954, 3.174963662790698], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-4", 1, 0, 0.0, 215.0, 215, 215, 215.0, 215.0, 215.0, 215.0, 4.651162790697675, 4.510356104651163, 3.1340843023255816], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-3", 1, 0, 0.0, 212.0, 212, 212, 212.0, 212.0, 212.0, 212.0, 4.716981132075471, 4.574181898584905, 3.224498820754717], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-2", 1, 0, 0.0, 211.0, 211, 211, 211.0, 211.0, 211.0, 211.0, 4.739336492890995, 4.586603969194313, 3.1842417061611377], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-1", 1, 0, 0.0, 407.0, 407, 407, 407.0, 407.0, 407.0, 407.0, 2.457002457002457, 10.770980497542999, 1.4156557125307125], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule-0", 1, 0, 0.0, 417.0, 417, 417, 417.0, 417.0, 417.0, 417.0, 2.398081534772182, 3.8851731115107917, 1.3981002697841727], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-0", 1, 0, 0.0, 392.0, 392, 392, 392.0, 392.0, 392.0, 392.0, 2.5510204081632653, 4.132952008928571, 1.5271245216836735], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-6", 1, 0, 0.0, 213.0, 213, 213, 213.0, 213.0, 213.0, 213.0, 4.694835680751174, 4.557291666666667, 3.1589275234741785], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-1", 1, 0, 0.0, 388.0, 388, 388, 388.0, 388.0, 388.0, 388.0, 2.577319587628866, 11.341212951030927, 1.4849790592783505], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-2", 1, 0, 0.0, 214.0, 214, 214, 214.0, 214.0, 214.0, 214.0, 4.672897196261682, 4.522305782710281, 3.1396028037383177], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-3", 1, 0, 0.0, 216.0, 216, 216, 216.0, 216.0, 216.0, 216.0, 4.62962962962963, 4.489474826388889, 3.1647858796296298], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-3", 1, 0, 0.0, 215.0, 215, 215, 215.0, 215.0, 215.0, 215.0, 4.651162790697675, 4.510356104651163, 3.1795058139534884], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-4", 1, 0, 0.0, 216.0, 216, 216, 216.0, 216.0, 216.0, 216.0, 4.62962962962963, 4.489474826388889, 3.1195746527777777], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-2", 1, 0, 0.0, 217.0, 217, 217, 217.0, 217.0, 217.0, 217.0, 4.608294930875576, 4.459785426267281, 3.0961981566820276], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-5", 1, 0, 0.0, 216.0, 216, 216, 216.0, 216.0, 216.0, 216.0, 4.62962962962963, 4.493995949074074, 3.1602647569444446], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-5", 1, 0, 0.0, 215.0, 215, 215, 215.0, 215.0, 215.0, 215.0, 4.651162790697675, 4.514898255813954, 3.174963662790698], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule-6", 1, 0, 0.0, 214.0, 214, 214, 214.0, 214.0, 214.0, 214.0, 4.672897196261682, 4.535995911214953, 3.144166179906542], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-4", 1, 0, 0.0, 218.0, 218, 218, 218.0, 218.0, 218.0, 218.0, 4.587155963302752, 4.448286983944954, 3.090954701834862], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-5", 1, 0, 0.0, 2490.0, 2490, 2490, 2490.0, 2490.0, 2490.0, 2490.0, 0.40160642570281124, 636.8897464859438, 0.23923820281124497], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-6", 1, 0, 0.0, 2640.0, 2640, 2640, 2640.0, 2640.0, 2640.0, 2640.0, 0.3787878787878788, 513.7288411458333, 0.2219460227272727], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewRecruitmentModule", 1, 0, 0.0, 1000.0, 1000, 1000, 1000.0, 1000.0, 1000.0, 1000.0, 1.0, 10.869140625, 4.5595703125], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-1", 1, 0, 0.0, 392.0, 392, 392, 392.0, 392.0, 392.0, 392.0, 2.5510204081632653, 11.19060905612245, 1.4698262117346939], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-2", 1, 0, 0.0, 912.0, 912, 912, 912.0, 912.0, 912.0, 912.0, 1.0964912280701753, 1.7925061677631577, 0.644616913377193], "isController": false}, {"data": ["Test", 1, 0, 0.0, 8596.0, 8596, 8596, 8596.0, 8596.0, 8596.0, 8596.0, 0.11633317822242904, 394.05035318025824, 2.0605968619125172], "isController": true}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-3", 1, 0, 0.0, 1760.0, 1760, 1760, 1760.0, 1760.0, 1760.0, 1760.0, 0.5681818181818181, 139.30886008522728, 0.3395774147727273], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-4", 1, 0, 0.0, 879.0, 879, 879, 879.0, 879.0, 879.0, 879.0, 1.1376564277588168, 181.62507110352672, 0.6688175483503982], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index-0", 1, 0, 0.0, 2476.0, 2476, 2476, 2476.0, 2476.0, 2476.0, 2476.0, 0.4038772213247173, 0.6945583855008077, 0.21416536247980614], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-1", 1, 0, 0.0, 401.0, 401, 401, 401.0, 401.0, 401.0, 401.0, 2.493765586034913, 10.956495480049874, 1.4368375935162094], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule", 1, 0, 0.0, 1045.0, 1045, 1045, 1045.0, 1045.0, 1045.0, 1045.0, 0.9569377990430622, 10.385204844497608, 4.348273026315789], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule-0", 1, 0, 0.0, 351.0, 351, 351, 351.0, 351.0, 351.0, 351.0, 2.849002849002849, 4.615718482905983, 1.6721198361823364], "isController": false}, {"data": ["https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewAdminModule", 1, 0, 0.0, 975.0, 975, 975, 975.0, 975.0, 975.0, 975.0, 1.0256410256410255, 11.140825320512821, 4.664463141025641], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 31, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
