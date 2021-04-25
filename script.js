class SortUtils{
    static less(first,second,d){
        return first.substring(d).localeCompare(second.substring(d))
    }

    static exchange(array,firstInd,secondInd){
        let temp = array[secondInd]
        array[secondInd] = array[firstInd]
        array[firstInd] = temp

    }

    static charAt(string, d){
        if(d<string.length) return string.charCodeAt(d)
        else return -1
    }

    static isStringLess(first,second){
        if(first<second) return true
        return false
    }
}
//Сортировка вставками
class Insertion{
    static sort(array){
        this.insSort(array,0,array.length)
    }

    static insSort(a, lo, hi) {
        for(let i = lo; i<hi ; i++){
            for(let j=i;j>lo && SortUtils.isStringLess(a[j],a[j-1]);j--)
                SortUtils.exchange(a,j,j-1)
        }
    }
}

//MD сортировка (по старшему символу)
class MSDSort{
    static sort(array){
        this.R = 255
        let N = array.length
        this.aux = Array(N)
        this.sortRec(array,0,N-1,0)
        this.r = 0
    }

    static sortRec(array,lo,hi,d){
        if(hi == -1) return
        let count = new Array(this.R+2)
        for(let i=0;i<count.length;i++)
            count[i]=0

        for(let i = lo; i<= hi; i++)
            count[SortUtils.charAt(array[i], d) + 2]++

        for(let r = 0; r < this.R+1; r++)
            count[r+1] += count[r]

        for( let i = lo; i <= hi; i++)
            this.aux[count[SortUtils.charAt(array[i],d) + 1]++] = array[i]
        
        for(let i = lo; i <= hi; i++)
            array[i] = this.aux[i - lo]

        for(; this.r < this.R;  this.r++)
            this.sortRec(array, lo+count[r], lo + count[r+1] - 1, d+1)
    }
}
// Развитие быстрой сортировки, применимой для строк
class Quick3Sort{
    static sort(array){
        this.sortRec(array,0,array.length-1,0)
    }

    static sortRec(array,lo,hi,d){
        if( hi<=lo ) return
        let lt = lo
        let gt = hi
        let v = SortUtils.charAt(array[lo], d)
        let i = lo + 1
        while( i <= gt ){
            let t = SortUtils.charAt(array[i], d)
            if (t < v) SortUtils.exchange(array,lt++,i++)
            else if (t > v) SortUtils.exchange(array,i,gt--)
            else i++
        }

        this.sortRec(array, lo, lt-1,d)
        if(v >= 0) this.sortRec(array, lt, gt, d+1)
        this.sortRec(array, gt+1, hi, d)
    }
}

function execitionTimer(functionToExecute){
    let msdBegin = Date.now()
    functionToExecute()
    let msdEnd = Date.now()
    return msdEnd - msdBegin + ' ms'
}

let obj = {
    name:"Gedeon",
    surname:"Grayjoy",
    array:[
        "consequat",
        "id",
        "eiusmod",
        "do",
        "ullamco",
        "incididunt",
      ]
}

const infoBlock = document.getElementById("info")
const resultBlock = document.getElementById("result")
infoBlock.innerHTML = obj.array
infoBlock.style.color = "red"
let MSDSortedArray = [...obj.array]
let quick3SortedArray = [...obj.array]
let insertSortedArray = [...obj.array]
let msdSortFunc = function(){MSDSort.sort(MSDSortedArray)}
let quick3SortFunc = function(){Quick3Sort.sort(quick3SortedArray)}
let insetSortFunc = function(){Insertion.sort(insertSortedArray)}
let msdTime = execitionTimer(msdSortFunc)
let quickTime = execitionTimer(quick3SortFunc)
let insertTime = execitionTimer(insetSortFunc)

resultBlock.innerHTML = MSDSortedArray +' <b>'
+ msdTime+'</b><br />' 
+ quick3SortedArray+' <b>'+quickTime
+'</b><br />' 
+ insertSortedArray +' <b>'+insertTime+'</b>'



