let columns = document.getElementsByClassName("fc-event-container")
console.log(columns)
let org_node = columns[1].childNodes[0].cloneNode(true)

for (let c of columns) {
    while (c.firstChild) {
        c.removeChild(c.firstChild)
    }
}

let first_column = columns[1]
let tmp = document.querySelector('.col-md-12')
let input = document.createElement("input");
input.type = 'file';
input.addEventListener('change', function() {
    var fr=new FileReader();
    fr.onload=function(){
        let frames = fr['result'].split(/\r?\n/).map(element => JSON.parse(element));
        let h = frames[0].length, w = frames[0][0].length, total_frame
        for (let i = 0; i < h; i++) {
            for (let j = 0; j < w; j++) {       
                let newNode = org_node.cloneNode(true)
                newNode.setAttribute('style', `background-color: #000000; border-color: rgb(20, 20, 20);\
                left: ${10.5*j}%; top: ${18*i}px; height: 17px; width:10.1%; margin:0px; padding: 0px`)
                first_column.appendChild(newNode)
            }
        }

        let childs = first_column.children
        let no_frame = 0
        function changeFrame() {
            let frame = frames[no_frame]
            for (let i = 0; i < h; i++) {
                for (let j = 0; j < w; j++) {
                    if (frame[i][j] === 0) {
                        childs[i*w+j].style['background-color'] = '#000000'
                    } else {
                        childs[i*w+j].style['background-color'] = '#969696'
                    }
                }
            }
            no_frame++
        }
        setInterval(changeFrame, 33.3);
    }
      
    fr.readAsText(this.files[0]);
})
tmp.appendChild(input);