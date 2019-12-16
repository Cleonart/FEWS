function createLine(x1,y1,x2,y2,lineId) {
			
	x1 = x1 + 35;
	x2 = x2 + 35;
	y1 = y1 + 35;
	y2 = y2 + 35;
	
	var distance = Math.sqrt( ((x1-x2) * (x1-x2)) + ((y1-y2) * (y1-y2)));
	var xMid = (x1 + x2)/2;
	var yMid = (y1 + y2)/2;
			
	var salopeInRadian = Math.atan2(y1-y2,x1-x2);
	var salopeInDegres = (salopeInRadian * 180) / Math.PI;

	var line = document.getElementById(lineId);
	line.style.width = distance + "px";
	line.style.top = yMid + "px";
	line.style.left = xMid - (distance/2)  + "px";
	line.style.transform = "rotate(" + salopeInDegres + "deg)";
}
