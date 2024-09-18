class Cache{
    map = {}
    list = []

    put(key, value, count) {
        if (count != null){
            const c = parseInt(count)
            if (c > 0)
                this.map[key] = {value: value, count: c}
        }
        else {
            this.map[key] = {value: value, count: 1}
        }
    }

    get(key){
        if (this.map[key] != null && this.map[key].count > 0){
            const value = this.map[key].value
            const count = this.map[key].count
            this.map[key].count-=1;
            this.list.push({key:key, value:value, count:count-1})
            return value;
        }
        return null;
    }

    stats(){
        return this.list;
    }
}
export {Cache}