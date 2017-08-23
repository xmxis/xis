import layer from 'vue-layer-mobile'

export default {
  alert(msg,callback){
    layer.dialog({
      title: ['提示', 'background:#47b34f;color:#fff'],
      content: msg,
      btn: ['我知道了']
    })
    .then((res) => {
      if (res===0&&callback){
        callback();
      }
    })
  },
  loading(msg){
    layer.loading(msg)
  },
  confirm(msg,callback){
    layer.dialog({
      title: ['提示', 'background:#47b34f;color:#fff'],
      content: msg,
      btn: ['确定', '取消']
    })
    .then((res) => {
      if (res===0&&callback){
        callback();
      }
    })
  },
  close(el){
    layer.close(el)
  },
  closeLoading(){
    layer.close('loading');
  }

}
