<template>
    <div>
        <table>
            <thead>
            <tr>
                <th v-for="key in columns"
                @click="sortBy(key)"
                :class="{ active: sortKey == key }"
                :key='key'>
                {{ key | capitalize }}
                <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
                </span>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(entry, index) in filteredData" :key='index'>
                <td v-for="key in columns" :key='key'>
                {{entry[key]}}
                </td>
            </tr>
            </tbody>
        </table>
        <input type="text" name="" id="" v-model="text">
    </div>
</template>

<script>
export default {
    data(){
        return {
            data:[
                { name: 'Chuck Norris', power: Infinity },
                { name: 'Bruce Lee', power: 9000 },
                { name: 'Jackie Chan', power: 7000 },
                { name: 'Jet Li', power: 8000 }
            ],
            columns:['name', 'power'],
            filterKey:'',
            // 存放欄位名稱
            sortKey:'',
            //物件部分：一開始沒有被註冊到的物件不會響應式更新
            sortOrders:{},
            text:'',
        }
    },
    created(){
        const vm = this;
        // 一開始沒有被註冊到的物件，後來在created階段才被建立的物件，這個物件不會響應式更新
        this.columns.forEach(function(key){
            // 解決方法：在created階段，動態添加新的響應式屬性
            vm.$set(vm.sortOrders, key, 1);    
            //vm.sortOrders[key] = 1;
        })
    },
    computed:{
        filteredData(){
            var text = this.text;
            var sortKey = this.sortKey
            var filterKey = this.filterKey && this.filterKey.toLowerCase()
            var order = this.sortOrders[sortKey] || 1
            var data = this.data
                if (filterKey) {
                    data = data.filter(function (row) {
                    return Object.keys(row).some(function (key) {
                        return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                        })
                    })
                }
                if (sortKey) {
                    data = data.slice().sort(function (a, b) {
                        a = a[sortKey]
                        b = b[sortKey]
                        return (a === b ? 0 : a > b ? 1 : -1) * order
                    })
                }
                if(text){
                    
                    data = data.filter(function(row){
                        console.log(
                            Object.keys(row).some(function (key) {
                                console.log(key)
                                String(row[key]).toLowerCase().indexOf(filterKey) > -1
                            })
                        );
                    })
                }
            return data
        },
        
    },
    filters: {
        capitalize: function (str) {
            return str.charAt(0).toUpperCase() + str.slice(1)
        }
    },
    methods: {
        sortBy: function (key) {
            this.sortKey = key;
            this.sortOrders[key] = this.sortOrders[key] * -1;
            console.log(this)
            
        }
    }
}
</script>

<style>
body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
}

table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th, td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}

</style>

