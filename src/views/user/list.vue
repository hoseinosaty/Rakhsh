<template>
    <div class="content">
        <div class="page-title">لیست کاربران</div>
        <div class="TableContainer">
            <a href="/user/add" class="page-link">اضافه کردن کاربر جدید</a>
            <table>
                <thead>
                    <th>#</th>
                    <th>نام</th>
                    <th>نام خانوادگی</th>
                    <th>سن</th>
                    <th>کشور</th>
                    <th>عملیات</th>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in userList" :key="index">
                        <td>{{index+1}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.family}}</td>
                        <td>{{item.birth}}</td>
                        <td><img width="40px" height="20px" :src="getCountryInfo(item.country,false)" v-title="getCountryInfo(item.country)"/></td>
                        <td><button class="edit-button" type="button" @click="EditUser(item.id)">ویرایش</button></td>
                        <td><button class="delete-button" type="button" @click="deleteItem(item.id)">حذف</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
const axios = require("axios");
const MSGHNDL = require("../../components/notify.js");

export default {
    name:"userList",
    data:()=>({
        countryList:[],
       userList:[]
    }),
    async created(){
        await this.LoadCountries();
        this.loadUsers()
    },
    methods:{
        getCountryInfo(code,name=true)
        {
            let vm = this;
            var requiredIndex = vm.countryList.findIndex(el => {
                return el.alpha2Code == code;
            });
            if(name)
            {
                return vm.countryList[requiredIndex].name;
            }
            else
            {
                return vm.countryList[requiredIndex].flag;
            }
        },
        EditUser(id)
        {
            this.$router.push(`/user/edit/${id}`);
        },
        deleteItem(id)
        {
            let vm = this;
            var requiredIndex = vm.userList.findIndex(el => {
                return el.id == id;
            });
            vm.userList.splice(requiredIndex, 1);
            if(vm.userList.length < 1)
            {
                window.localStorage.removeItem("repo");
            }
            else
            {
                window.localStorage.setItem("repo",JSON.stringify(vm.userList));
            }
            
        },
        loadUsers()
        {
            let vm = this;
            var lstorage = window.localStorage.getItem("repo");
            if(lstorage == null)
            {
               MSGHNDL.ERR("لیست کاربران خالی است");        }
            else
            {
                vm.userList = JSON.parse(lstorage);
                
            }
           
        },
        async LoadCountries()
        {
            let vm = this;
            await axios.get('https://restcountries.eu/rest/v2/all').then((res)=>{
                if(res.status == 200)
                {
                    
                    vm.countryList = res.data;
                    console.warn(vm.countryList);
                }
            }).catch(()=>{});
        }
    }
}
</script>