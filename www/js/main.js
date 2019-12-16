var day,month,date,year,hours,minutes,seconds;

var app = new Vue({

	el: '#app',
				
	data : {

		//NODE DATA
		beacons_data : [
		{
			id         : 0,  //NODE NUMBER
			x    	   : 30, //POSITION X OF NODE
			y          : 0,	 //POSITION Y OF NODE
			dataSensor : 743   //SENSOR DATA OF NODE
		},
		{
			id 		   : 1,
			x  		   : 60,
			y  		   : 140,
			dataSensor : 450
		},
		{
			id 		   : 2,
			x  		   : 320,
			y  		   : 65,
			dataSensor : 100
		},
		{
			id 		   : 3,
			x  		   : 540,
			y  		   : -30,
			dataSensor : 341
		},
		{
			id 		   : 4,
			x  		   : 350,
			y  		   : 250,
			dataSensor : 520
		},],

		//EDGES DATA
		edges : [{ from : 0, to   : 1 },
				 { from : 0, to   : 2 },
				 { from : 1, to   : 0 },
				 { from : 1, to   : 4 },
				 { from : 2, to   : 0 },
				 { from : 2, to   : 3 },
				 { from : 2, to   : 4 },
				 { from : 3, to   : 2 },
				 { from : 3, to   : 4 },
				 { from : 4, to   : 3 }],
					
		beaconsConnector  : [],	//BEACONS EDGES CONNECTOR
		line_connection   : [], //LINE CONNECTION
		dataLength        : 0,  //DATA LENGTH
				
	},	

	methods : {
					
		dataCheck : function () {

			//Count all the nodes and Push data to Beacons Connector
			for (var i = 0; i <  this.beacons_data.length; i++) {
				this.beaconsConnector.push({x : this.beacons_data[i].x , y : this.beacons_data[i].y});
				this.dataLength++;
			}	


			//Draw Line
			for (var j = 0; j < this.edges.length; j++) {
							
				var fr = this.edges[j].from  //FROM VARIABLE 
				var tr = this.edges[j].to    //TO VARIABLE

				this.line_connection.push({x1 : this.beaconsConnector[fr].x,
										   y1 : this.beaconsConnector[fr].y,
										   x2 : this.beaconsConnector[tr].x,
										   y2 : this.beaconsConnector[tr].y,
										   id : "line" + j });

			}
						
			for (var k = 0; k < this.line_connection.length; k++) {

				var lcx1 = this.line_connection[k].x1;
				var lcy1 = this.line_connection[k].y1;
				var lcx2 = this.line_connection[k].x2;
				var lcy2 = this.line_connection[k].y2;
				var lcid = this.line_connection[k].id;
				createLine(lcx1,lcy1,lcx2,lcy2,lcid);	
			}
											
		},

		getData : function () {

			//Read all the data from sensor
			setInterval(() => {
				for (var i = 0; i < this.dataLength; i++) {
					this.beacons_data[i].dataSensor = document.getElementById('beacon' + i).innerHTML;
				}
			}, 100);

			setInterval(() => {
				this.getDateAndTime();
			}, 1000)
						
		},

		getDateAndTime : function () {

			var dates 	   = document.getElementById("date_and_time");
			var time       = document.getElementById("times");
			var dateTime   = new Date;
			day 	       = dateTime.getDay();
			month          = dateTime.getMonth(); 
		    date           = dateTime.getDate();
		    year           = dateTime.getFullYear();
			hours          = dateTime.getHours(); 
			minutes        = dateTime.getMinutes();
			seconds        = dateTime.getSeconds();

			var finalDay   = "";
			var finalMonth = "";
			month++;

			if (hours   < 10) { hours   = "0" + hours; }
	        if (minutes < 10) { minutes = "0" + minutes; }
	        if (seconds < 10) { seconds = "0" + seconds; }

			switch(day){
				case 1:	finalDay = "Mon";  break;
				case 2: finalDay = "Tue"; break;
				case 3: finalDay = "Wed";   break;
				case 4: finalDay = "Thu";  break;
				case 5: finalDay = "Fri";  break;
				case 6: finalDay = "Sat";  break;
				case 0: finalDay = "Sun"; break;
			}

			switch(month){
				case 1 : finalMonth = "January";   break;
				case 2 : finalMonth = "February";  break;
				case 3 : finalMonth = "March";     break;
				case 4 : finalMonth = "April";     break;
				case 5 : finalMonth = "May";       break;
				case 6 : finalMonth = "June";      break;
				case 7 : finalMonth = "Juli";      break;
				case 8 : finalMonth = "August";   break;
				case 9 : finalMonth = "September"; break;
				case 10: finalMonth = "October";   break;
				case 11: finalMonth = "November";  break;
				case 12: finalMonth = "Desember";  break;
			}

			if (date < 10)  { date = "0" + date; }
			if (month < 10) { month = "0" + month; }

			time.textContent  = hours    + " : " + minutes + " : " + seconds;
			dates.textContent = finalDay + ", "  + date    +  " "  + finalMonth + " " + year ;
		} 
		
	},

	beforeDestroy : function () {
		clearInterval(this.getData);
	},

	created : function () {
		this.dataCheck();
		//this.getData();
		setInterval(() => {
				this.getDateAndTime();
			}, 1000)
	}

})