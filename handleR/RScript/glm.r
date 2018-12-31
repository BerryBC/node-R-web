library("rjson")
funGLM<-function(objPara){
	list.input<-fromJSON(objPara)
	data.input.raw <- read.csv(list.input$df)
	
	sink(list.input$ds) 

	# print(list.input$para$family)
	data.input<-na.omit(data.input.raw)
	text.fm<-paste(names(data.input)[1],'~',paste(names(data.input[2:ncol(data.input)]),collapse="+"))

	data.afglm <- glm(formula(text.fm), data = data.input,family = list.input$para$family)

	print(summary(data.afglm))

	# print(text.fm)

	data.output<-array(list('My Love'),dimnames =list('You'))
	data.output$ok<-'ok'
	data.output$pic<-0

	
	sink()
	return(toJSON(data.output))
}