<template>
    <div class="content">
        <div class="page-title">ویرایش کاربر</div>
        <form class="form-container">
            <div class="form-row">
                <label for="name">نام</label>
                <input type="text" v-model="form.name" id="name"/>
            </div>
            <div class="form-row">
                <label for="family">نام خانوادگی</label>
                <input type="text" v-model="form.family" id="family"/>
            </div>
            <div class="form-row">
                <label for="birthday">تاریخ تولد</label>
                <date-picker v-model="form.birth"></date-picker>
            </div>
            <div class="form-row">
                <label for="country">کشور محل تولد</label>
                <select v-model="form.country" id="country">
                    <option selected value="0">انتخاب نمایید</option>
                    <option v-for="(item,index) in countryList" :key="index" :value="item.alpha2Code">{{item.name}}</option>
                </select>
            </div>
            <div class="form-row col-3">
                <button type="button" @click="updateUser">بروزرسانی</button>
            </div>
        </form>
    </div>
</template>
<script>
const axios = require("axios");
const MSGHNDL = require("../../components/notify.js");
const defultForm = Object.freeze({
    id:Date.now(),
    name:"",
    family:"",
    birth:"",
    country:""
});
export default {
    name:"editUser",
    data:()=>({
        countryList:[],
        country:null,
        form:Object.assign({},defultForm),
        id:0
    }),
    async created(){
        let vm = this;
        await vm.LoadCountries();
        vm.id = vm.$route.params.id;
        var lstorage = window.localStorage.getItem("repo");
        if(lstorage == null)
        {
            vm.$router.push('/user/add');
        }
        else
        {
            var storage = JSON.parse(lstorage);
            var requiredIndex = storage.findIndex(el => {
                return el.id == vm.id;
            });
            vm.form = storage[requiredIndex];
        }
    },
    methods:{
        updateUser()
        {
            let vm = this;
            var lstorage = window.localStorage.getItem("repo");
            if(lstorage == null)
            {
             vm.$router.push('/user/add');            
            }
            else
            {
                var storage = JSON.parse(lstorage);
                var requiredIndex = storage.findIndex(el => {
                    return el.id == vm.id;
                });
                storage[requiredIndex].name = vm.form.name;
                storage[requiredIndex].family = vm.form.family;
                storage[requiredIndex].birth = vm.form.birth;
                storage[requiredIndex].country = vm.form.country;
                window.localStorage.setItem("repo",JSON.stringify(storage));
            }
            vm.form = Object.assign({},defultForm);
            MSGHNDL.OK("کاربر با موفقیت بروزرسانی گردید");
            var to = window.setTimeout(function(){
                window.clearTimeout(to);
                vm.$router.push('/user/list');
            },1500);
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