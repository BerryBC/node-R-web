library("rjson")
funLM<-function(objPara){
	list.input<-fromJSON(objPara)
	data.input.raw <- read.csv(list.input$df)
	
	sink(list.input$ds) 

	data.input<-na.omit(data.input.raw)
	text.fm<-paste(names(data.input)[1],'~',paste(names(data.input[2:ncol(data.input)]),collapse="+"))
	data.aflm <- lm(formula(text.fm), data = data.input)

	print(summary(data.aflm))


	data.output<-array(list('My Love'),dimnames =list('You'))
	data.output$ok<-'ok'
	data.output$pic<-0

	# 如果是二维的
	if (ncol(data.input)==2) {
		png(file = list.input$dp)
		plot(data.input[[2]],data.input[[1]],col = "purple",main = paste(names(data.input[1])," & ",names(data.input[2])," Regression"),
abline(lm(data.input[[1]]~data.input[[2]])),cex = 1.3,pch=15,xlab = names(data.input[2]),ylab = names(data.input[1]))
		dev.off()
		data.output$pic<-1
	}

	
	sink()
	return(toJSON(data.output))
}