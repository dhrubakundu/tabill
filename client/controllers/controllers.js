myApp.controller('empController',function($scope,$http,$route,$routeParams){
  
   
     //Passowrd Check 
     $scope.bill={
         uname:"",
         dt:new Date(),
         pur:"",
         nr:1,
         fdt:[],
         ftm:[],
         f:[],
         tdt:[],
         ttm:[],
         t:[],
         mot:[],
         fp:[],
         km:[],
         th:[],
         tm:[],
         hd:[],
         hh:[]
    };

     $scope.getPass = function(N, P){
        var N = N , P = P;
         $http.get('/api/pass/' + N + '/'+ P).then(function(response){
             $scope.pbss = response.data;
         });
     };

     // List The bill
     $scope.getBill = function(){
        var A = $routeParams.A;
         $http.get('/api/tabill/'+ A).then(function(response){
             $scope.subs = response.data;
         });
     };

     $scope.getUser = function(){
        var U = $routeParams.U;
         $http.get('/api/tauser/'+ U).then(function(response){
             $scope.susr = response.data;
         });
     };
    $scope.deleteTabill = function(id){
        var id = id;
        $http.delete('/api/tabill/'+ id).then(function(response){
        $route.reload();
        });
    };

      //Add TA Bill
      $scope.addBill = function(){
        //var a = JSON.stringify($scope.bill);
        $http.post('/api/tabill',$scope.bill).then(function(response){
        window.location.href = '/';
        });
     };

     $scope.showTabill = function(){
        var B = $routeParams.B;
         $http.get('/api/tabill1/'+ B).then(function(response){
             $scope.bills = response.data;
             $http.get('/api/tamast/'+ $scope.bills.uname).then(function(response){
                $scope.mast = response.data;
             });
         });     
     };
     
     $scope.setTimeD= function (j){
     
        var input1 = $scope.bill.fdt[j];//from date
        var input2 = $scope.bill.ftm[j];//from time
        var input5 = (!$scope.bill.th[j])? "0" :$scope.bill.th[j] ;// travel hour
        var input6 = (!$scope.bill.tm[j])? "0" :$scope.bill.tm[j] ;// travel minute
        
        var fYear = input1.getFullYear();
        var fMonth = input1.getMonth();
        var fDay = input1.getDate();
        var fHour = input2.getHours();
        var fMinute = input2.getMinutes();
        var fromDate = new Date(fYear, fMonth, fDay, fHour, fMinute);
        var travelHour = parseInt(input5);
        var travelMinute = parseInt(input6);
        var toDate = new Date(fromDate);
        toDate.setHours(toDate.getHours()+travelHour);
        toDate.setMinutes(toDate.getMinutes()+travelMinute);
        var temp = toDate.getFullYear();
        var tYear = temp.toString();
        temp = toDate.getMonth();
        var tMonth = (temp <=9) ? "0"+temp.toString(): temp.toString();
        temp = toDate.getDate();
        var tDay = (temp <=9) ? "0"+temp.toString(): temp.toString();
        temp = toDate.getHours();
        var tHour = (temp <=9) ? "0"+temp.toString(): temp.toString();
        temp = toDate.getMinutes();
        var tMinute = (temp <=9) ? "0"+temp.toString(): temp.toString();
       

        $scope.bill.tdt[j] = toDate ;
        $scope.bill.ttm[j] = toDate ;
     };

     $scope.setTimeHd= function (j){
        var input1 = $scope.bill.tdt[j-1];//from date
        var input2 = $scope.bill.ttm[j-1];//from time
        var input3 = (!$scope.bill.hd[j-1])? "0" :$scope.bill.hd[j-1] ;// travel hour
        var input4 = (!$scope.bill.hh[j-1])? "0" :$scope.bill.hh[j-1] ;// travel minute

        var tYear = input1.getFullYear();
        var tMonth = input1.getMonth();
        var tDay = input1.getDate();
        var tHour = input2.getHours();
        var tMinute = input2.getMinutes();
        var toDate = new Date(tYear, tMonth, tDay, tHour, tMinute);
        var haltDays = parseInt(input3);
        var haltHour = parseInt(input4);
        var fromDate = new Date(toDate);
        fromDate.setDate(fromDate.getDate()+haltDays);
        fromDate.setHours(fromDate.getHours()+haltHour);
        
        return fromDate ;
     };

     $scope.setTimeHh= function (j){
        var input1 = $scope.bill.tdt[j-1];//from date
        var input2 = $scope.bill.ttm[j-1];//from time
        var input3 = (!$scope.bill.hd[j-1])? "0" :$scope.bill.hd[j-1] ;// travel hour
        var input4 = (!$scope.bill.hh[j-1])? "0" :$scope.bill.hh[j-1] ;// travel minute

        var tYear = input1.getFullYear();
        var tMonth = input1.getMonth();
        var tDay = input1.getDate();
        var tHour = input2.getHours();
        var tMinute = input2.getMinutes();
        var toDate = new Date(tYear, tMonth, tDay, tHour, tMinute);
        var haltDays = parseInt(input3);
        var haltHour = parseInt(input4);
        var fromDate = new Date(toDate);
        fromDate.setDate(fromDate.getDate()+haltDays);
        fromDate.setHours(fromDate.getHours()+haltHour);
        
        return fromDate ;
     };
 


    $scope.printDiv = function(divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var popupWin = window.open('', '_blank', 'width=300,height=300');
        popupWin.document.open();
        popupWin.document.write('<html><body onload="window.print()">' + printContents + '</body></html>');
        popupWin.document.close();
    } 
  
  
     /* $scope.getSdrShow = function(){
        var B = $routeParams.B;
         $http.get('/api/sdrn/'+ B).then(function(response){
             $scope.sdrs = response.data;
         });
     };*/
   // $scope.addEmployee = function(){
     //   $http.post('/api/employees',$scope.employee).then(function(response){
       //     window.location.href = '/';
        //});
    //};
    //$scope.deleteEmployee = function(id){
      //  var id = id;
        // $http.delete('/api/employees/'+ id).then(function(response){
          //   $route.reload();
         //});
     //};
     //$scope.updateEmployee = function(){
       // var id = $routeParams.id;
        // $http.put('/api/employees/'+ id, $scope.employee).then(function(response){
         //   window.location.href = '/';
        // });
    // };
});