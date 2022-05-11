function opensenha() {
    const visual = document.getElementById("senha")

    if (visual.type == "password") {
        visual.type = "text"
    } else {
        visual.type = "password"
    } 

}
