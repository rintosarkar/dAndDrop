
let dropArea = document.getElementById('drop-area')
let filesDone = 0
let filesToDo = 0
let progressBar = document.getElementById('progress-bar')


    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false)
    })

    function preventDefaults(e) {
        e.preventDefault()
        e.stopPropagation()
    }

    ;['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false)
    })

    ;['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false)
    })

    function highlight(e) {
        dropArea.classList.add('highlight')
    }

    function unhighlight(e) {
        dropArea.classList.remove('highlight')
    }
    dropArea.addEventListener('drop', handleDrop, false)

    function handleDrop(e) {
        let dt = e.dataTransfer
        let files = dt.files

        handleFiles(files)
    }
    function handleFiles(files) {
        files = [...files]
        initializeProgress(files.length)
        files.forEach(uploadFile)
        files.forEach(previewFile)
    }


    
    function uploadFile(file) {
        console.log(file);
        // return
            var url = 'https://api.cloudinary.com/v1_1/dgjvys7hh/image/upload'
            var xhr = new XMLHttpRequest()
            var formData = new FormData()
            xhr.open('POST', url, true)

            xhr.addEventListener('readystatechange', function (e) {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    // Done. Inform the user
                    alert('Thank you konkoni begum!');
                    fetchImage();
                    // location.reload();
                }
                else if (xhr.readyState == 4 && xhr.status != 200) {
                    // Error. Inform the user
                    alert('Error');
                }
            })

            formData.append('file', file);
            formData.append("upload_preset", "dimage");
            formData.append("tags", "fphoto");
            xhr.send(formData)
        }


    function previewFile(file) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function () {
            let img = document.createElement('img')
            img.src = reader.result
            document.getElementById('gallery').appendChild(img)
        }
    }

    function initializeProgress(numfiles) {
            progressBar.value = 0
            filesDone = 0
            filesToDo = numfiles
        }

    function progressDone() {
        filesDone++
        progressBar.value = filesDone / filesToDo * 100;
    }

    fetchImage();
    function fetchImage(){
        let url = "https://res.cloudinary.com/dgjvys7hh/image/list/fphoto.json";

        fetch(url)           //api for the get request
            .then(response => response.json())
            .then(data => 
                {
                    // console.log(data.resources)
                    let images = data.resources;
                    let rootPath = "https://res.cloudinary.com/dgjvys7hh/image/upload/w_300,h_100,c_fit/";
                    let rootPath2 = "https://res.cloudinary.com/dgjvys7hh/image/upload/";
                    var elm = document.querySelector("#main");

                    let item = "<div class='image-container '>";
                        images.forEach(function(i,j){
                            console.log(j);
                            let imgPath = rootPath+i.public_id+'.'+i.format;
                            let fullImg = rootPath2+i.public_id+'.'+i.format;
                            let imgName = (fullImg.slice('8'));
                            console.log(imgName)
                            item += '<img id="'+j+'" @click="showImg('+j+')" class="single-image cursor-pointer" src="'+imgPath+'"/></div><input type="hidden" id="img_'+j+'" value="'+fullImg+'"/>'

                            document.getElementById("main").innerHTML = (item)
                        })

                        document.getElementById('gallery').innerHTML=("");
                        // document.getElementById('img').innerHTML=(item);
                }
            );
    }
