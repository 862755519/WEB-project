<template>
  <div class="app-container">
    <el-tree
      :data="data"
      :props="defaultProps"
      :expand-on-click-node="true"
      :render-content="renderContent"
      @node-click="handleNodeClick"
      node-key="id"
      show-checkbox="true"
      check-on-click-node="true"
      highlight-current="true"
      default-expand-all
    />
  </div>
</template>

<script>
/* eslint-disable */
import { tops, next } from "@/api/user";
import { Loading } from "element-ui";
export default {
  name: "Tops",
  data() {
    return {
      data: [
        {
          id: 0,
          label: "会员等级图(手机号|真实姓名)",
          children: []
        }
      ],
      flag: false,
      expanded:true,
      snum: 1,
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    append(data) {
      var that = this;
      // if(!that.expanded){
      //   return;
      // }
      that.flag = true;
      // var loadingInstance1 = Loading.service({ fullscreen: true });
     //// let loadingInstance1 = Loading.service({ fullscreen: true });
      if (data.id === 0 && data.children.length === 0) {
        tops()
          .then(response => {
            this.list = response.data.data.list;
            const tmp = response.data.data.list;
            for (let i = 0; i < tmp.length; i++) {
              const newChild = {
                id: tmp[i].id,
                label: tmp[i].mobile + "|" + tmp[i].realName,
                children: [],
                num: tmp[i].num
              };
              if (!data.children) {
                this.$set(data, "children", []);
              }
              data.children.push(newChild);
            }
            if(tmp.length>5){
              that.snum=tmp.length
            }
          })
          .catch(() => {});
      } else if (data.id > 0 && data.children.length === 0) {
        const par = { pid: data.id };
        next(par)
          .then(response => {
            this.list = response.data.data.list;
            const tmp = response.data.data.list;
            for (let i = 0; i < tmp.length; i++) {
              const newChild = {
                id: tmp[i].id,
                label: tmp[i].mobile + "|" + tmp[i].realName,
                children: [],
                num: tmp[i].num
              };
              if (!data.children) {
                this.$set(data, "children", []);
              }
              data.children.push(newChild);
            }
            if(tmp.length>5){
              that.snum=tmp.length
            }
          })
          .catch(() => {});
      }
      //loadingInstance1.close();
      //that.flag = false;
            this.$nextTick(() => {
        setTimeout(() => {
          that.flag=false;
          that.snum=1;
        }, that.snum*1000);
      });
    },
    renderContent(h, { node, data, store }) {
      var that = this;
      var xx = {};
      var flsg = data.num + " 人";
      if (data.id === 0) {
        xx = { fontSize: "16px" };
        flsg = "查看更多";
      }
      var child = { color: "blue" };
      if (data.num === 0) {
        child = { display: "none" };
      }
      return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span style={xx}>{node.label}</span>
          </span>
          <span>
            <el-button
              disabled={that.flag}
              loading={that.flag}
              style="font-size: 12px;"
              type="text"
              on-click={() => this.append(data)}
            >
              <span style={child}>{flsg}</span>
            </el-button>
          </span>
        </span>
      );
    },
    handleNodeClick(a,b,c){
      this.expanded=c.expanded;
    }
  }
};
</script>
