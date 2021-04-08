function sliderController(){
    let slider = document.getElementById("slider");
    
    setInterval(function () {
        slider.src = "../images/img-1.png";
    }, 5000);

    setInterval(function () {
        slider.src = "../images/img-2.png";
    }, 10000);

    setInterval(function () {
        slider.src = "../images/img-3.png";
    }, 15000);
}

sliderController();
