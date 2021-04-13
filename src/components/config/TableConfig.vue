<template>
  <section class="TableConfig-wrapper">
    <a-divider>列属性</a-divider>

    <ChangeList :list="columns" @addColumn="addColumn">
      <template #default="scope">
        <a-input v-model:value="scope.item.title" placeholder="列名" />
        <a-input v-model:value="scope.item.dataIndex" placeholder="列值" />
      </template>
      <template #footer>
        <i class="iconfont icongengduo" @click="visibleColumn = true"></i>
      </template>
    </ChangeList>
    <a-divider>表格属性</a-divider>
    <a-form
      :model="tableConfig"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 15 }"
    >
      <a-form-item label="边框">
        <a-switch v-model:checked="tableConfig.bordered" />
      </a-form-item>
      <a-form-item label="行样式">
        <a-select v-model:value="tableConfig.rowClassNameConfig">
          <a-select-option value="null">空</a-select-option>
          <a-select-option value="striped">斑马条纹</a-select-option>
          <a-select-option value="custom">自定义</a-select-option>
        </a-select>
        <a-textarea
          v-if="tableConfig.rowClassNameConfig !== 'null'"
          :disabled="tableConfig.rowClassNameConfig === 'striped'"
          v-model:value="tableConfig.rowClassNameStr"
          placeholder="(record, index) => (index % 2 === 1 ? 'table-striped' : null)"
        />
      </a-form-item>
      <a-form-item label="树形结构列名">
        <a-input v-model:value="tableConfig.childrenColumnName" />
      </a-form-item>
      <a-form-item label="初始展开行">
        <a-switch v-model:checked="tableConfig.defaultExpandAllRows" />
      </a-form-item>
      <a-form-item label="显示表头">
        <a-switch v-model:checked="tableConfig.showHeader" />
      </a-form-item>
      <a-form-item label="滚动设置">
        <a-input-group>
          <a-row :gutter="8">
            <a-col :span="12">
              <a-input-number
                placeholder="横向滚动"
                v-model:value="tableConfig.scroll.x"
              />
            </a-col>
            <a-col :span="12">
              <a-input-number
                placeholder="纵向滚动"
                v-model:value="tableConfig.scroll.y"
              />
            </a-col>
          </a-row>
        </a-input-group>
      </a-form-item>
      <a-form-item label="表格大小">
        <a-select v-model:value="tableConfig.size">
          <a-select-option value="small">small</a-select-option>
          <a-select-option value="middle">middle</a-select-option>
          <a-select-option value="default">default</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="选择框">
        <a-switch v-model:checked="showSelectionSwitch" />
        <RightFadeAnimation>
          <i
            class="iconfont icongengduo"
            v-show="showSelectionSwitch"
            @click="visibleSelection = true"
          ></i
        ></RightFadeAnimation>
      </a-form-item>
    </a-form>
    <a-divider>测试数据</a-divider>
    <a-textarea
      v-model:value="dataSourceStr"
      auto-size
      placeholder="测试数据"
    />
  </section>
  <a-modal
    v-model:visible="visibleColumn"
    width="1200px"
    centered
    title="表格列配置"
    :footer="null"
  >
    <ColumnConfig />
  </a-modal>
  <a-modal
    v-model:visible="visibleSelection"
    width="500px"
    centered
    :footer="null"
  >
    <template #title>
      <span>选择项配置</span>
      <a-tooltip color="blue">
        <template #title>
          <p>除固定列外其它元素改变后需刷新表格才有效果</p>
        </template>
        <i
          class="iconfont iconV"
          style="font-size: 26px; position: absolute"
        ></i>
      </a-tooltip>
    </template>
    <SelectionConfig />
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch, watchEffect } from "vue";
import { useTableConfig } from "@/hooks/useTableConfig";
import { useRowSelection } from "@/hooks/useRowSelection";
import ChangeList from "@/components/common/ChangeList.vue";

import ColumnConfig from "./table/ColumnConfig.vue";
import SelectionConfig from "./table/SelectionConfig.vue";
import RightFadeAnimation from "@/animation/RightFadeAnimation.vue";

export default defineComponent({
  name: "TableConfig",
  components: { ChangeList, ColumnConfig, SelectionConfig, RightFadeAnimation },
  props: ["componentProp", "formAttribute"],
  setup() {
    const {
      columns,
      dataSource,
      tableConfig,
      changeData,
      addColumn,
    } = useTableConfig();

    const dataSourceStr = ref(JSON.stringify(dataSource.value, null, 2));

    watch(dataSource, () => {
      dataSourceStr.value = JSON.stringify(dataSource.value, null, 2);
    });

    watch(dataSourceStr, () => {
      try {
        changeData("dataSource", JSON.parse(dataSourceStr.value || "[]"));
      } catch (error) {
        console.log("异常:::", dataSourceStr.value);
      }
    });

    const visibleColumn = ref<boolean>(false);
    const visibleSelection = ref<boolean>(false);

    const { showSelectionSwitch } = useRowSelection();

    watchEffect(() => {
      if (tableConfig.value.rowClassNameConfig === "striped") {
        tableConfig.value.rowClassNameStr = `(record, index) => (index % 2 === 1 ? 'table-striped' : null)`;
      } else {
        tableConfig.value.rowClassNameStr = "";
      }
    });

    watchEffect(() => {
      let evalStr = tableConfig.value.rowClassNameStr;
      evalStr = evalStr || `()=>{}`;
      try {
        let rowClassNameFun = eval(`(${evalStr})`);
        if (typeof rowClassNameFun === "function") {
          tableConfig.value.rowClassName = rowClassNameFun;
        }
      } catch (error) {}
    });

    return {
      columns,
      dataSourceStr,
      tableConfig,
      addColumn,
      visibleColumn,
      visibleSelection,
      showSelectionSwitch,
    };
  },
});
</script>

<style lang="less" scoped>
.TableConfig-wrapper {
  .col-edit-wrapper {
    display: flex;
    align-items: center;
    height: 32px;
    margin: 5px 0;
    .iconpaixu {
      font-size: 20px;
      cursor: move;
      &:hover {
        color: @mainThemeColor;
      }
    }
    .iconjian {
      color: red;
      font-size: 24px;
      cursor: pointer;
    }
    input {
      margin: 0 5px;
    }
  }
  .ant-form-item-control-wrapper .icongengduo {
    margin-left: 20px;
    position: absolute;
  }
  .icongengduo {
    cursor: pointer;
    &:hover {
      color: @mainThemeColor;
    }
  }
}
</style>
