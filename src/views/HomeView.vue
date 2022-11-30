<template>
  <div id="homeview">
    <div>
      <div class="card-light bg-light shadow-sm mb-3">
        <div class="">
          <h3 class="mb-3 text-center">ออกเลขการทำเคลม</h3>
          <div class="form-center">
            <div class="row">
              <div class="col-md-6">
                <label for="">วันที่</label>
                <label for="date" class="col-1 col-form-label">Date</label>
                <div class="col-5">
                  <div class="input-group date" id="datepicker">
                    <input type="text" class="form-control" id="date" />
                    <span class="input-group-append">
                      <span class="input-group-text bg-light d-block">
                        <i class="fa fa-calendar"></i>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const state = reactive({ loginState: store.getters["auth/myAccount"] });

// when create element
onMounted(() => {
  store.dispatch({
    type: "auth/restoreLogin",
  });
});

// logout
const logout = () => {
  store.dispatch({
    type: "auth/logout",
  });
};

// componets
</script>

<style scoped>
.fs-14 {
  font-size: 14px;
}
label {
  color: var(--text-color);
  font-weight: 600;
}
.form-center {
  padding-left: 100px;
  padding-right: 100px;
}
</style>
