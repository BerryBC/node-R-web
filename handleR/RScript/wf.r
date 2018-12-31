library("rjson")
library("Cairo")
funWF<-function(objPara){	
	list.input<-fromJSON(objPara)
	data.input.raw <- read.csv(list.input$df)
	sink(list.input$ds) 
	data.input<-na.omit(data.input.raw[,1])

	# data.output$doutput<-paste(names(summary(data.input)),summary(data.input),collapse = "<br>")
	# data.output$doutput<-paste(c(data.output$doutput,paste("Std.",sd(data.input))),collapse = "<br>")

	print(summary(data.input))
	print(paste("Std.",sd(data.input)))

	print(t.test(data.input,conf.level =as.numeric(list.input$para$CL) ,alternative=list.input$para$alternative) )


	CairoPNG(file  = list.input$dp)

	hist(data.input,xlab = names(data.input.raw[1]),col = "purple",breaks = 10)

	dev.off()


	data.output<-array(list('My Love'),dimnames =list('You'))
	data.output$ok<-'ok'
	data.output$pic<-1
	
	sink()
	return(toJSON(data.output))
}