<template>
  <div>
    <div class="card-light bg-light shadow-sm mb-3 d-flex align-items-center">
      <i class="bi bi-search me-3 ms-2"></i>
      <input class="border-0 w-50 bg-transparent" placeholder="Search..." type="text" v-model="filter.search" @keyup="searchAction">
      <!-- <p class="mb-0 ms-auto me-2"><b>FILTER</b></p> -->
      <!-- <DatePicker class="datepicker ms-auto" v-model="date" :enableTimePicker="false" locale="th" :dayNames="['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.']" :format="format" @update:modelValue="format"/> -->
    </div>
    <div class="card-light bg-light shadow-sm">
      <table class="table table-bordered mb-0 table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" class="text-primary-nt">หมายเลขเซอเวย์</th>
            <th scope="col" class="text-primary-nt">บริษัทประกันภัย</th>
            <th scope="col" class="text-primary-nt">พนักงานรับแจ้ง</th>
            <th scope="col" class="text-primary-nt">เจ้าหน้าที่ตรวจสอบอุบัติเหตุ</th>
            <th scope="col" class="text-primary-nt">วันที่ (ปี-เดือน-วัน)</th>
            <th scope="col" class="text-primary-nt">เวลารับเรื่อง</th>
            <th scope="col" class="text-primary-nt">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data_for_table.body" :key="index">
            <th scope="row"><a type="button" class="text-decoration" data-bs-toggle="modal" data-bs-target="#dataClaim" @click="showClaimdata(item['svh_code'])">{{item['svh_code']}}</a></th>
            <td>{{item['company']}}</td>
            <td>{{item['employee']}}</td>
            <td>{{item['inspector']}}</td>
            <td>{{item['date']}}</td>
            <td>{{item['time']}}</td>
            <td class="p-0 text-center">
              <a type="button" class="me-2 text-decoration-none py-1 px-2 text-dark fw-bold text-center mt-1 bg-warning rounded shadow-sm">
                แก้ไข
              </a>
              <a type="button" class="text-decoration-none py-1 px-2 text-dark fw-bold text-center mt-1 bg-danger rounded shadow-sm" @click="modaldelete(item['svh_code'])" data-bs-toggle="modal" data-bs-target="#delete_alert">
                ลบข้อมูล
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation example" class="mt-2">
        <ul class="pagination mb-0">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item" v-if="!(filter.page - 1 == 0)"><a class="page-link" type="button" @click="decreasePage">{{filter.page - 1}}</a></li>
          <li class="page-item"><a class="page-link bg-light" type="button">{{filter.page}}</a></li>
          <li class="page-item" v-if="!(filter.page == filter.lastpage)"><a class="page-link" type="button" @click="increasePage">{{filter.page + 1}}</a></li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <!-- {{filter}} -->
    <div class="modal fade" id="delete_alert" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="submitDelete">
            <div class="modal-body p-5">
              <div>
                <h2 class="text-center">ยืนยันการลบข้อมูล</h2>
              </div>
              <div class="d-flex justify-content-center mt-3">
                <input type="text" class="border-0 text-center" v-model="svhcode" readonly>
              </div>
              <div class="mt-4 d-flex justify-content-center">
                <button type="submit" class="btn btn-danger me-3" data-bs-dismiss="modal">ยืนยันการลบข้อมูล</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ยกเลิก</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- show data cialm -->
    <div class="modal fade" id="dataClaim" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">เลขเคลมที่ {{data_claim_modal.svh_code}}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="border p-2 mb-2 rounded">
              <h5 class="border-bottom pb-2">กลุ่ม Survey Hub อบ.</h5>
              {{data_claim_modal.date}} <br>
              <!-- <b>วันที่รับแจ้ง :</b> 5 ธันวาคม 2565 -->
              <b>รับแจ้งอุบัติเหตุ :</b> {{data_claim_modal.company}} <br>
              <b>ประเภท :</b> {{data_claim_modal.type}} {{data_claim_modal.date_dry}} {{data_claim_modal.time_dry}}<br>
              <b>จ่ายงานโดย :</b> {{data_claim_modal.source_employee}} <br>
              <b>สถานที่ :</b> {{data_claim_modal.location}} <br>
              <b>ลักษณะ อบ. :</b> {{data_claim_modal.accident}} <br>
              <b>พนักงานรับแจ้ง :</b> {{data_claim_modal.employee}} <br>
              <b>เวลารับเรื่อง :</b> {{data_claim_modal.time}} <br>
              <b>เจ้าหน้าที่ตรวจสอบอุบัติเหตุ :</b> {{data_claim_modal.inspector}} {{data_claim_modal.inspector_mobile}} <br>
              <b>เลขเซอร์เวย์ :</b> {{data_claim_modal.svh_code}}
            </div>
            <div class="border p-2 rounded">
              <h5 class="border-bottom pb-2">กลุ่มประกัน</h5>
              {{data_claim_modal.date}} <br>
              <!-- <b>วันที่รับแจ้ง :</b> 5 ธันวาคม 2565 -->
              <b>บริษัทประกันภัย :</b> {{data_claim_modal.company}} <br>
              <b>วันที่รับแจ้ง :</b> {{data_claim_modal.date}} <br>
              <b>ลักษณะ :</b> {{data_claim_modal.type}} {{data_claim_modal.date_dry}} {{data_claim_modal.time_dry}} <br>
              <b>สถานที่ :</b> {{data_claim_modal.location}} <br>
              <b>เจ้าหน้าที่ตรวจสอบอุบัติเหตุ :</b> {{data_claim_modal.inspector}} {{data_claim_modal.inspector_mobile}} <br>
              <b>เลขเซอร์เวย์ :</b> {{data_claim_modal.svh_code}} <br>
              <b>{{data_claim_modal.employee}} ;</b> รับแจ้งฯ
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
            <!-- <button type="button" class="btn btn-primary">Understood</button> -->
          </div>
        </div>
      </div>
    </div>
    {{filter.date}}
  </div>
</template>

<script setup lang="ts">
  import axios from "axios";
  import { response } from "express";
  import { onMounted, reactive, ref, computed } from "vue";
  import { useStore } from "vuex";
  import DatePicker from '@vuepic/vue-datepicker';
  import { apiUrl } from "@/services/constants";
  
  const store = useStore();

  // get data table
  // data initail state
  const data_for_table = reactive({body:[]});
    // filter data
    const filter = reactive({
    page: 1,
    search: "",
    lastpage: 0,
    date: ""
  });
  const getTable = () => {
    bufferSearch();
  }

  // buffer function
  const bufferSearch = () => {
    if(filter.search == ""){
      axios(apiUrl + '/claim/gettable/' + filter.page + '/' + 'svh').then(response => {
        data_for_table.body = response.data.body;
        filter.lastpage = response.data.lastpage;
      });
    }else{
      axios(apiUrl + '/claim/gettable/' + filter.page + '/' + filter.search).then(response => {
        data_for_table.body = response.data.body;
        filter.lastpage = response.data.lastpage;
      });
    }
  }

  // decreasePage
  const decreasePage = () => {
    filter.page = filter.page - 1
    bufferSearch();
  };

  const increasePage = () => {
    filter.page = filter.page + 1
    bufferSearch();
  };

  // on search
  const searchAction = () => {
    bufferSearch();
  };
  // oncreate
  onMounted(() => {
    store.dispatch({
    type : 'auth/restoreLogin',
  });
    getTable();
  });

  // svhcode
  const svhcode = ref("");
  // show modaldelete
  const modaldelete = (svh_code:string) => {
    svhcode.value = svh_code;
  };
  // submit delete
  const submitDelete = async () => {
    console.log(svhcode.value);
    axios(apiUrl + '/claim/page/delete/' + svhcode.value).then(response => {
      console.log(response.data.message);
      bufferSearch();
    });
  };

  const showClaimdata = async (svhcode:string) => {
    axios(apiUrl + '/claim/readdata/' + svhcode).then(response => {
      /* console.log(response.data.body[0]['accident']); */
      const month_th = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
      const dateArray = response.data.body[0].date.split("-");

      data_claim_modal.date = `วันที่ ${parseInt(dateArray[2])} ${month_th[parseInt(dateArray[1]) - 1]} ${dateArray[0]}`;
      data_claim_modal.company = response.data.body[0]['company'];
      data_claim_modal.type = response.data.body[0]['type'];
      data_claim_modal.source_employee = response.data.body[0]['source_employee'];
      data_claim_modal.location = response.data.body[0]['location'];
      data_claim_modal.accident = response.data.body[0]['accident'];
      data_claim_modal.employee = response.data.body[0]['employee'];
      data_claim_modal.time = response.data.body[0]['time'];
      data_claim_modal.inspector = response.data.body[0]['inspector'];
      data_claim_modal.inspector_mobile = response.data.body[0]['inspector_mobile'];
      data_claim_modal.svh_code = response.data.body[0]['svh_code'];
      data_claim_modal.date_dry = response.data.body[0]['date_dry'];
      data_claim_modal.time_dry = response.data.body[0]['time_dry'];
    });
  }

  // data claim modal
  const data_claim_modal = reactive({
    date: "",
    company: "",
    type: "",
    source_employee: "",
    location: "",
    accident: "",
    employee: "",
    time: "",
    inspector: "",
    inspector_mobile: "",
    svh_code: "",
    date_dry: "",
    time_dry: ""
  });

</script>

<style scoped>
  input:focus{
    border: 0;
    box-shadow: none;
    outline: 0;
  }
  a{
    color: var(--text-color);
  }
  a:hover{
    color: var(--text-color);
  }
  input{
    color: var(--text-color);
  }
  th a{
    color: var(--text-color);
  }
</style>