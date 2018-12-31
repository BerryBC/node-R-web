library("rjson")
funHC<-function(objPara){
	list.input<-fromJSON(objPara)
	data.input.raw <- read.csv(list.input$df)
	
	sink(list.input$ds) 

	data.input<-na.omit(data.input.raw)

	data.afinput<-data.frame(data.input[,2:ncol(data.input)],row.names=data.input[[1]])

	dist.data <- dist(data.afinput)
	hc.data <- hclust(dist.data,method=list.input$para$method)

	num.k<-as.numeric(list.input$para$k)

	png(filename  = list.input$dp, width=nrow(data.input)*20)

	plot(hc.data,hang=-1)
	rh.data <- rect.hclust(hc.data, k = num.k)

	dev.off()

	for (int.i in 1:num.k) {
		cat(paste("The ",int.i ," Class\n"))
		cat(paste(data.input[rh.data[[int.i]],1],",",int.i,"\n"))
		
	}

	# print(list.input$para)

	data.output<-array(list('My Love'),dimnames =list('You'))
	data.output$ok<-'ok'
	data.output$pic<-1



	
	sink()
	return(toJSON(data.output))
}