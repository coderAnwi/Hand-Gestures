Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90

});

camera = document.getElementById('camera');

Webcam.attach(camera);
function take_snapshot() {
    Webcam.snap(function(data_uri){
       document.getElementById('result').innerHTML=
       "<img id='cap_img' src='"+data_uri+"'>"
    })
}

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/CpgAdZwzo/model.json',modelLoaded);
function modelLoaded() {
   console.log('Model Loaded!');

}

function speak() {
    var synth = window.speechSynthesis;
    sd_1 = "The First Prediction is " + prediction_1;
    sd_2 = "The Second Prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(sd_1 + sd_2);
    synth.speak(utterThis);
}

function check() {
    img=document.getElementById('cap_img');
     classifier.classify(img,gotResults);
}

function gotResults(error,results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        document.getElementById('result_gesture_name').innerHTML=results[0].label;
        document.getElementById('result_gesture_name2').innerHTML=results[1].label;

        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label=="super")
        {
            document.getElementById("update_gesture").innerHTML="&#128076;";
        }

        if(results[0].label=="good")
        {
            document.getElementById("update_gesture").innerHTML="&#128077;";
        }

        if(results[0].label=="rocking!")
        {
            document.getElementById("update_gesture").innerHTML="&#129304;";
        }

        if(results[1].label=="super")
        {
            document.getElementById("update_gesture2").innerHTML="&#128076;";
        }

        if(results[1].label=="good")
        {
            document.getElementById("update_gesture2").innerHTML="&#128077;";
        }

        if(results[1].label=="rocking!")
        {
            document.getElementById("update_gesture2").innerHTML="&#129304;";
        }
  
    }
}