<template>
  <section class="monaco-wrapper">
    <Monaco
      v-model:value="activeTab.value"
      ref="monacoEl"
      :language="activeTab.language"
    />
    <section class="operator-wrapper">
      <a-button ghost @click="exportValue">
        <template #icon>
          <i class="iconfont icondaochu"></i>
        </template>
        导出
      </a-button>
      <ul class="tab-wrapper">
        <li
          v-for="item in tabList"
          :key="item.title"
          :class="item.title === activeTab.title && 'active'"
          @click="changeTab(item, index)"
        >
          <i :class="['iconfont', item.icon]"></i>
          <span>{{ item.title }}</span>
        </li>
      </ul>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref, toRefs } from "vue";
import Monaco from "@/components/common/Monaco.vue";
import { exportFile, exportZipFile, IFileObj } from "@/utils";

interface ITabObj {
  value: string;
  language: string;
  title: string;
  icon: string;
}

export default defineComponent({
  name: "MonacoWrapper",
  props: {
    tabList: {
      type: Array as PropType<ITabObj[]>,
      required: true,
    },
  },
  components: { Monaco },
  setup(prop) {
    const activeTab = ref<ITabObj>(prop.tabList[1]);

    // dev ComponentRenderContext
    const monacoEl = ref<any>();

    const changeTab = (item: ITabObj) => {
      activeTab.value.value = monacoEl.value.getMonacoValue();
      activeTab.value = item;
    };

    const exportValue = () => {
      // let value = monacoEl.value.getMonacoValue();
      // const blob = new Blob([value], {
      //   type: "text/plain;charset=utf-8",
      // });
      // exportFile(blob, "component.vue");
      activeTab.value.value = monacoEl.value.getMonacoValue();
      const fileList: IFileObj[] = [];
      prop.tabList.forEach((tab) => {
        const { title, value } = tab;
        fileList.push({
          title,
          content: value,
        });
      });
      exportZipFile(fileList);
    };

    return {
      exportValue,
      activeTab,
      changeTab,
      monacoEl,
    };
  },
});
</script>

<style lang="less" scoped>
.monaco-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  #monaco {
    flex: 1;
  }
  .operator-wrapper {
    width: 135px;
    padding: 20px 0;
    //display: flex;
    //justify-content: center;
    //flex-wrap: wrap;
    background: rgba(0, 0, 0, 0.8);
    .iconfont {
      margin-right: 7px;
    }
    .tab-wrapper {
      margin-top: 105px;
      li {
        width: 100px;
        height: 40px;
        line-height: 40px;
        padding-left: 7px;
        //text-align: center;
        transition: all 0.3s;
        background: #262b2d;
        color: #baacc3;
        cursor: pointer;
        i {
          color: #12a943;
        }
        margin: 10px 0;
        &:hover,
        &.active {
          width: 120px;
          color: #fff;
          background: #1e1e1e;
          padding-left: 20px;
          i {
            color: #f1fa8c;
          }
        }
      }
    }
  }
}
</style>