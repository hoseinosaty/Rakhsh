import Vue from 'vue'

//#region Error Events
export function ERR(msg)
{
    Vue.notify({
        group: 'notify',
        title: 'Error occurred',
        text: msg,
        type:"error"
      })
}

//#endregion


//#region Success Events
export function OK(msg)
{
    Vue.notify({
        group: 'notify',
        title: 'Successfull',
        text: msg,
        type:"success"
      })
}
//#endregion
export function resultChk(d)
{
    if(d.status)
    {
        OK(d.msg);
    }
    else
    {
        ERR(d.msg);
    }
    return d.status;
}