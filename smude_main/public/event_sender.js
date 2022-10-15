

(function send_coords(){
    const events_service_url = "http://localhost:3007/"
    const body = document.getElementsByTagName("BODY")[0]
    const script_tag = document.getElementById('smudge_event_sender')
    const public_key = script_tag.getAttribute('public-key')
    console.log("public key", public_key)
    let xhr = new XMLHttpRequest()
    body.addEventListener('click', (event) => {
        var cursorX = event.pageX;
        var cursorY = event.pageY;
        console.log(cursorX, cursorY)
        xhr.open('POST', events_service_url+"send_events", true)
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
 
        xhr.send(JSON.stringify({
            params: {
                public_key: public_key,
                x_coord: cursorX,
                y_coord: cursorY
            }
        }));
        
        xhr.onload = function () {
            if(xhr.status === 201) {
                console.log("Post successfully created!") 
            }
        }

    })
    
})()