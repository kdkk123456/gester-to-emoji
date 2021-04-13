//set up the web cam//
Webcam.set({
    height: 300,
    width: 350,
    image_type: "png",
    png_quality: 90
})
//attach the webcam in the div//
Webcam.attach("#camera")

//code for taking snapshot//
function capture() {
    Webcam.snap(
        function (pic) {
         //pic is a picture taken by webcam.snap//
         document.getElementById("snapshot").innerHTML=`<img src=${pic} id="captureimg">`   
        }
    )
}
//check ml5 version//
console.log(ml5.version)

//import the model using the var classifier//

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/vhM99l-FO/model.json",modelloaded)

//check if the model has loaded//

function modelloaded() {
    console.log("hi")    
}
function speak() {
    speech=window.speechSynthesis;
    speakdata1="The first prediction is  "+prediction1
    speakdata2="The second prediction is  "+prediction2
    saythis=new SpeechSynthesisUtterance(speakdata1+speakdata2);
    speech.speak(saythis);
}
function identify() {
    img=document.getElementById("captureimg")
    classifier.classify(img,gotresults)
}
function gotresults(error,results) {
    if (error) {
        console.log(error)
    }
    else  {
        console.log(results)
        prediction1=results[0].label
        prediction2=results[1].label
        document.getElementById("emotion1").innerHTML=prediction1
        document.getElementById("emotion2").innerHTML=prediction2
        if (prediction1=="Thumbs up") {
            document.getElementById("emoji1").innerHTML="&#x1F44D;"
        }
        if (prediction1=="Thumbs down") {
            document.getElementById("emoji1").innerHTML="&#x1F44E;"
        }
        if (prediction1=="Peace") {
            document.getElementById("emoji1").innerHTML="&#x270C;"
        }
        if (prediction1=="Swag") {
            document.getElementById("emoji1").innerHTML="&#x1F918;"
        }
        if (prediction1=="Good") {
            document.getElementById("emoji1").innerHTML="&#x1F44C;"
        }
        if (prediction2=="Thumbs up") {
            document.getElementById("emoji2").innerHTML="&#x1F44D;"
        }
        if (prediction2=="Thumbs down") {
            document.getElementById("emoji2").innerHTML="&#x1F44E;"
        }
        if (prediction2=="Peace") {
            document.getElementById("emoji2").innerHTML="&#x270C;"
        }
        if (prediction2=="Swag") {
            document.getElementById("emoji2").innerHTML="&#x1F918;"
        }
        if (prediction2=="Good") {
            document.getElementById("emoji2").innerHTML="&#x1F44C;"
        }
        speak()
    }
}