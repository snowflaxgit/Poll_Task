
var myApp = angular.module('myApp', []);

var socket = io.connect();

 var id1=0;

function ChartCtrl($scope, $http){
	
	 $http({method: 'GET', url: '/user'}).
     success(function(data, status, headers, config) {
     $scope.users = data;
	 console.log(data);
	 $.chartBar($scope.users);	
  }).
  error(function(data, status, headers, config) {
	  console.log("err : "+data);
  }); 
	
	
	 $scope.voting = function(id){

		if(id!=1){
		   id1=id;
		}
		
		if(id==1){
		   socket.emit('id', { user_id : id1 });
		   id1=1;
		 }
     };
	
socket.on('update', function(data) 
{ 

 $http({method: 'GET', url: '/user'}).
     success(function(data, status, headers, config) {
     $scope.users = data;
	 console.log(data);
	  $.chartBar($scope.users);		

	 
  }).
  error(function(data, status, headers, config) {
	  console.log("err : "+data);
  }); 

});



}





$(document).ready(function(e) {	
      


var a=new Array();
var y1=0;
var x=130;

$('#tabs div').hide(); 
$('#tabs div:first').show(); 
$('#tabs ul li:first').addClass('active'); 

	  /*$('#tabs ul li a').click(function(){
		  
	  $('#tabs ul li').removeClass('active'); 
	  $(this).parent().addClass('active'); 
	  var currentTab = $(this).attr('href'); 
	  $('#tabs div').hide(); 
	  $(currentTab).show(); 
	  return false;
	  });
*/





$('#tabs ul li a').hammer().on("tap", function() {
       
	   
	  $('#tabs ul li').removeClass('active'); 
	  $(this).parent().addClass('active'); 
	  var currentTab = $(this).attr('href'); 
	  $('#tabs div').hide(); 
	  $(currentTab).show(); 
	  return false;
    
});


$.chartBar = function (data){
	
	   
   
   		if(data)
		{
			    $.each(data, function (index, item){
				a[index]=item.voting;
				
				});
		 };	
	
		
 <!--Horizontal Graph-->
 
	
var ctx1 = $("#myChart1").get(0).getContext("2d");	
ctx1.clearRect(0, 0, 460, 350);	

for(var j=0;j<a.length;j++){

		a[j]+=40;
		
		}
    
	    
	ctx1.font="15px Arial";
	
    ctx1.fillText("Rahul Gandhi",0,20);
	ctx1.fillText("Narendra Modi",0,80);
	ctx1.fillText("Priyanka Vadra",0,140);
    ctx1.fillText("Mulayam Singh Yadav",0,200);
    ctx1.fillText("None of this",0,260);
	
	ctx1.font=" italic 10px Arial";
	ctx1.fillText("Total Vote:",0,330);	
	

	roundRect(0, 35, a[0], 20, 7);
	roundRect(0, 95, a[1], 20, 7);
	roundRect(0, 155, a[2], 20, 7);
	roundRect(0, 215, a[3], 20, 7);
	roundRect(0, 275, a[4], 20, 7);
	
	
	ctx1.fillStyle='black';
	ctx1.font="12px Arial";
	
	  y1=40;
	
	ctx1.fillText(a[0]-y1+'%',3,50);
	ctx1.fillText(a[1]-y1+'%',3,110);
	ctx1.fillText(a[2]-y1+'%',3,170);
	ctx1.fillText(a[3]-y1+'%',3,230);
	ctx1.fillText(a[4]-y1+'%',3,290);
	
	var result=a[0]+a[1]+a[2]+a[3]+a[4]-200;
	ctx1.font=" italic 10px Arial";
	ctx1.fillText( result+'%',80,330);	
	
	
	
		
function roundRect(x, y, w, h, radius)
     {
  var canvas = document.getElementById("myChart1");
  var context = canvas.getContext("2d");
 
 
context.fillStyle="lightgray";
context.fillRect(x,y,w,h);
 
  
  var r = x + w;
  var b = y + h;
  context.beginPath();
  context.lineWidth="1";
  context.moveTo(x+radius, y);
  context.lineTo(r-radius, y);
  context.quadraticCurveTo(r, y, r, y+radius);
  context.lineTo(r, y+h-radius);
  context.quadraticCurveTo(r, b, r-radius, b);
  context.lineTo(x+radius, b);
  context.quadraticCurveTo(x, b, x, b-radius);
  context.lineTo(x, y+radius);
  context.quadraticCurveTo(x, y, x+radius, y);
  context.stroke();
}
	
};
	


				
});
