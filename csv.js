class CSV{
    ln = true
    th = false

    static parse(str){
        let csv = []
        let lines = str.split("\n")
        for(let i in lines){
            csv[i] = lines[i].split(", ")
        }
        csv = csv.filter(
            function(e){
                return e != ""
            }
        )
        return csv
    }

    static req(uri){
        let req = new XMLHttpRequest
        let csv = new CSV
        req.open("GET", uri)
        req.responseType = "text/csv"
        req.send()
        csv.req = req
        return csv
    }

    display(id){
        if(!this.ln){
            let e = document.createElement("style");
            e.innerHTML = `#${id} .csv tr::before{display:none;}`
            document.body.append(e)
        }
        this.req.th = this.th
        this.req.onload = function(){
            console.log(this.ln)
            let e = document.getElementById(id)
            let ary = CSV.parse(this.response)
            let str = "<table class='csv'>"
            let i = 0
            if(this.th){
                str += "<tr>"
                for(let j = 0; j < ary[0].length; j++){
                    str += `<th>${ary[i][j]}</th>`
                }
                str += "</tr>"
                i++
            }
            for(; i < ary.length; i++){
                str += "<tr>"
                for(let j = 0; j < ary[0].length; j++){
                    str += `<td>${ary[i][j]}</td>`
                }
                str += "</tr>"
            }
            str += "</table>"
            e.innerHTML = str
        }
        return this
    }

    setLineNumber(ln){
        this.ln = ln
        return this
    }

    setTh(th){
        this.th = th
        return this
    }
}

csv = CSV
.req("https://himeyama.github.io/sarscov2/data.csv")
.setTh(true)
// .setLineNumber(false)
.display("hoge")

CSV
.req("https://himeyama.github.io/sarscov2/data.csv")
.display("hoge2")