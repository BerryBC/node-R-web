library("rjson")
# library("MASS")
funCSQ<-function(objPara){
	list.input<-fromJSON(objPara)
	data.input.raw <- read.csv(list.input$df)
	
	sink(list.input$ds) 

	data.input<-na.omit(data.input.raw)
	table.input<-table(data.input[[1]], data.input[[2]],dnn = list(names(data.input[1]),names(data.input[2])))


	# data.afcsq <- chisq.test(table.input)

	print(table.input)
	print(summary(table.input))

	# print(text.fm)

	data.output<-array(list('My Love'),dimnames =list('You'))
	data.output$ok<-'ok'
	data.output$pic<-0

	
	sink()
	return(toJSON(data.output))
}