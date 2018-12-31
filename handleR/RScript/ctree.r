library("rjson")
library("party")
library("Cairo")

funCTREE<-function(objPara){
	list.input<-fromJSON(objPara)
	data.input.raw <- read.csv(list.input$df)
	
	sink(list.input$ds) 

	data.input<-na.omit(data.input.raw)
	text.fm<-paste(names(data.input)[1],'~',paste(names(data.input[2:ncol(data.input)]),collapse="+"))
	data.afct <- ctree(formula(text.fm), data = data.input)

	print(data.afct)


	data.output<-array(list('My Love'),dimnames =list('You'))
	data.output$ok<-'ok'
	data.output$pic<-0

	int.tw=max(where(data.afct))


	CairoPNG(filename  = list.input$dp, width=int.tw*40)
	plot(data.afct)
	dev.off()
	data.output$pic<-1


	
	sink()
	return(toJSON(data.output))
}